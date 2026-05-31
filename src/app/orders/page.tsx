"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders } from "@/src/services/order.service";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Orders</h1>

      {orders.map((o: any, i) => (
        <div key={o._id} className="border p-3 mt-3">
          <p>Phone: {o.customerPhone}</p>
          <p>Total: {o.totalAmount}</p>
          <p>Status: {o.orderStatus}</p>

          <Link href={`/orders/${o._id}`}>
            View Order
          </Link>
        </div>
      ))}
    </div>
  );
}
