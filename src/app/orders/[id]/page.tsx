"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getOrder,
  updateOrderStatus,
} from "@/src/services/order.service";

export default function OrderDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      if (!id) {
        setError("Invalid Order ID");
        return;
      }

      const data =
        await getOrder(id);

      setOrder(data);
    } catch (error) {
      console.error(error);
      setError("Order not found");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate =
    async (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      try {
        const newStatus =
          e.target.value;

        await updateOrderStatus(
          order._id,
          newStatus
        );

        setOrder({
          ...order,
          orderStatus: newStatus,
        });

        alert(
          "Order Status Updated Successfully"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed To Update Status"
        );
      }
    };

  if (loading) {
    return (
      <p className="p-5">
        Loading...
      </p>
    );
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

      {/* CUSTOMER INFO */}
      <div className="border rounded p-4 mb-5">
        <h2 className="font-bold text-lg mb-3">
          Customer Information
        </h2>

        <p>
          <strong>Phone:</strong>{" "}
          {order.customerPhone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {order.shippingAddress}
        </p>

        <p>
          <strong>Total Amount:</strong>{" "}
          ৳{order.totalAmount}
        </p>

        <div className="mt-4">
          <label className="font-semibold block mb-2">
            Order Status
          </label>

          <select
            value={order.orderStatus}
            onChange={
              handleStatusUpdate
            }
            className="border rounded px-3 py-2"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Ordered Products
        </h2>

        {order.items?.map(
          (
            item: any,
            index: number
          ) => (
            <div
              key={index}
              className="border rounded p-4 mb-3 flex gap-4"
            >
              <img
                src={
                  item.productImage
                }
                alt={
                  item.productName
                }
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <h3 className="font-bold">
                  {
                    item.productName
                  }
                </h3>

                <p>
                  Quantity:{" "}
                  {
                    item.quantity
                  }
                </p>

                <p>
                  Price: ৳
                  {item.price}
                </p>

                <p>
                  Total: ৳
                  {
                    item.totalPrice
                  }
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
