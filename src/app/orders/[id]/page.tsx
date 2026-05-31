"use client";

import { useEffect, useState } from "react";
import { getOrder } from "@/src/services/order.service";

export default function OrderDetails({ params }: any) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        console.log("ORDER ID:", params?.id);

        if (!params?.id) {
          setError("Invalid Order ID");
          setLoading(false);
          return;
        }

        const data = await getOrder(params.id);

        if (!data) {
          setError("Order not found");
        } else {
          setOrder(data);
        }
      } catch (err: any) {
        console.log("ERROR:", err);
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [params?.id]);

  // LOADING UI
  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

  // ERROR UI
  if (error) {
    return <p className="p-5 text-red-500">{error}</p>;
  }

  // NO ORDER
  if (!order) {
    return <p className="p-5">Order not found</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Order Details
      </h1>

      {/* CUSTOMER INFO */}
      <div className="border p-3 rounded mb-4">
        <p>📞 {order.customerPhone}</p>
        <p>🏠 {order.shippingAddress}</p>
        <p>💰 Total: {order.totalAmount}</p>
        <p>📦 Status: {order.orderStatus}</p>
      </div>

      {/* ITEMS */}
      <div>
        <h2 className="font-bold mb-2">Products</h2>

        {order.items?.map((item: any) => (
          <div
            key={item._id}
            className="border p-2 mb-2 flex gap-3"
          >
            <img
              src={item.productImage}
              alt=""
              width={70}
              height={70}
            />

            <div>
              <p className="font-semibold">
                {item.productName}
              </p>
              <p>Qty: {item.quantity}</p>
              <p>Price: {item.price}</p>
              <p>Total: {item.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
