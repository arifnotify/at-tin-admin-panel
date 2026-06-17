"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getOrders } from "@/src/services/order.service";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data =
        await getOrders();

      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="p-5">
        Loading...
      </p>
    );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">
        Orders
      </h1>

      <div className="border rounded">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 border-b"
          >
            <p>
              Order No :
              <strong>
                {order.orderNumber}
              </strong>
            </p>

            <p>
              Phone :
              {order.customerPhone}
            </p>

            <p>
              Amount :
              ৳
              {order.totalAmount}
            </p>

            <p>
              Status :
              {order.orderStatus}
            </p>

            <Link
              href={`/orders/${order._id}`}
              className="text-blue-500"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
