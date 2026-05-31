"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrder } from "@/src/services/order.service";

export default function OrderDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        console.log("ORDER ID:", id);

        if (!id) {
          setError("Invalid Order ID");
          return;
        }

        const data = await getOrder(id);

        console.log("ORDER DATA:", data);

        setOrder(data);
      } catch (error) {
        console.error(error);
        setError("Order not found");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

  if (error) {
    return (
      <p className="p-5 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">
        Order Details
      </h1>

      <div className="border p-4 rounded mb-4">
        <p>
          <strong>Phone:</strong>{" "}
          {order.customerPhone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {order.shippingAddress}
        </p>

        <p>
          <strong>Total:</strong>{" "}
          {order.totalAmount}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {order.orderStatus}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-3">
        Ordered Products
      </h2>

      {order.items?.map((item: any) => (
        <div
          key={item._id}
          className="border p-3 rounded mb-3 flex gap-4"
        >
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-20 h-20 object-cover rounded"
          />

          <div>
            <p className="font-bold">
              {item.productName}
            </p>

            <p>Qty: {item.quantity}</p>

            <p>Price: {item.price}</p>

            <p>Total: {item.totalPrice}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
