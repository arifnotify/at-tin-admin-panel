"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  getOrders,
} from "@/src/services/order.service";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadOrders =
    async () => {
      try {
        const data =
          await getOrders();

        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Orders
      </h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3">
                Order No
              </th>

              <th className="p-3">
                Phone
              </th>

              <th className="p-3">
                Amount
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map(
              (
                order,
                index
              ) => (
                <tr
                  key={
                    order._id
                  }
                  className="border-b"
                >
                  <td className="p-3">
                    {index + 1}
                  </td>

                  <td className="p-3">
                    {
                      order.customerPhone
                    }
                  </td>

                  <td className="p-3">
                    $
                    {
                      order.totalAmount
                    }
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded border">
                      {
                        order.orderStatus
                      }
                    </span>
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/orders/${order._id}`}
                      className="bg-blue-500 text-white px-3 py-2 rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
