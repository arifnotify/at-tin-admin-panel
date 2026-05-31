"use client";

import { useEffect, useState } from "react";
import {
  getOrder,
  updateOrderStatus,
} from "@/src/services/order.service";

export default function OrderDetails({
  params,
}: any) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrder(params.id);
        setOrder(data);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  const handleStatus = async (status: string) => {
    try {
      await updateOrderStatus(order._id, {
        orderStatus: status,
      });

      const updated = await getOrder(order._id);
      setOrder(updated);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;
  if (!order) return <p className="p-5">Order not found</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">
        Order Details
      </h1>

      <div className="border p-4 rounded">
        <p>📞 {order.customerPhone}</p>
        <p>🏠 {order.shippingAddress}</p>
        <p>💰 {order.totalAmount}</p>

        <hr className="my-3" />

        <h2 className="font-bold">Products</h2>

        {order.items.map((item: any, i: number) => (
          <div key={i} className="border p-2 my-2">
            <p>{item.productName}</p>
            <p>Qty: {item.quantity}</p>
            <p>Price: {item.price}</p>
          </div>
        ))}

        <hr className="my-3" />

        <select
          value={order.orderStatus}
          onChange={(e) =>
            handleStatus(e.target.value)
          }
          className="border p-2"
        >
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>
    </div>
  );
}
