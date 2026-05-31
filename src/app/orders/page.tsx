"use client";

import { getOrders } from "@/src/services/order.service";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";



export default function OrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
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

  if (loading) {
    return (
      <div>
        Loading Orders...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4">
                Order No
              </th>

              <th className="p-4">
                Customer
              </th>

              <th className="p-4">
                Phone
              </th>

              <th className="p-4">
                Amount
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map(
              (order) => (
                <tr
                  key={order._id}
                  className="border-t"
                >

                  <td className="p-4">
                    {
                      order.orderNumber
                    }
                  </td>

                  <td className="p-4">
                    {
                      order.customerName
                    }
                  </td>

                  <td className="p-4">
                    {
                      order.customerPhone
                    }
                  </td>

                  <td className="p-4">
                    ৳
                    {
                      order.totalAmount
                    }
                  </td>

                  <td className="p-4 capitalize">
                    {order.status}
                  </td>

                  <td className="p-4">

                    <Link
                      href={`/orders/${order._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>

                  </td>

                </tr>
              ),
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}