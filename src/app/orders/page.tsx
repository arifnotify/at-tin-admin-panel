"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders } from "@/src/services/order.service";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Orders</h1>

      <div className="border rounded">
        {orders.map((order) => (
          <div key={order._id} className="p-3 border-b">
            <p>📞 {order.customerPhone}</p>
            <p>💰 {order.totalAmount}</p>
            <p>📦 {order.orderStatus}</p>

            <Link
              className="text-blue-500"
              href={`/orders/${order._id}`}
            >
              View Order
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
