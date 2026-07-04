"use client";

import { Order } from "@/src/types/order";

interface Props {
  activeOrders: Order[];
  completedOrders: Order[];

  // প্রথমে selectedOrder null থাকে, তাই optional
  selectedId?: string;

  onSelect: (id: string) => void;
}

export default function OrdersSidebar({
  activeOrders,
  completedOrders,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm h-[calc(100vh-180px)] overflow-hidden">

      {/* Header */}
      <div className="p-5 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold">
          Orders
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {activeOrders.length} Active • {completedOrders.length} Completed
        </p>
      </div>

      {/* Scroll Area */}
      <div className="overflow-y-auto h-full p-4">

        {/* ================= ACTIVE ================= */}

        <h3 className="text-sm font-bold uppercase tracking-wide text-blue-600 mb-3">
          Active Orders
        </h3>

        <div className="space-y-3">

          {activeOrders.length === 0 && (
            <div className="text-gray-400 text-sm text-center py-6 border rounded-xl">
              No Active Orders
            </div>
          )}

          {activeOrders.map((order) => (
            <button
              key={order._id}
              onClick={() => onSelect(order._id)}
              className={`
                w-full
                rounded-xl
                border
                p-4
                text-left
                transition
                hover:border-blue-500
                hover:bg-blue-50

                ${
                  selectedId === order._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }
              `}
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    #{order.orderNumber}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {order.customerPhone}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {order.orderStatus}
                </span>

              </div>

              <div className="mt-3 text-sm font-semibold text-green-600">
                ৳{order.totalAmount}
              </div>

            </button>
          ))}

        </div>

        {/* ================= COMPLETED ================= */}

        <h3 className="text-sm font-bold uppercase tracking-wide text-green-600 mt-8 mb-3">
          Completed Orders
        </h3>

        <div className="space-y-3">

          {completedOrders.length === 0 && (
            <div className="text-gray-400 text-sm text-center py-6 border rounded-xl">
              No Completed Orders
            </div>
          )}

          {completedOrders.map((order) => (
            <button
              key={order._id}
              onClick={() => onSelect(order._id)}
              className={`
                w-full
                rounded-xl
                border
                p-4
                text-left
                transition
                hover:border-green-500
                hover:bg-green-50

                ${
                  selectedId === order._id
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }
              `}
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    #{order.orderNumber}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {order.customerPhone}
                  </p>
                </div>

                <span
                  className={`
                    text-xs
                    px-2
                    py-1
                    rounded-full

                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {order.orderStatus}
                </span>

              </div>

              <div className="mt-3 text-sm font-semibold text-green-600">
                ৳{order.totalAmount}
              </div>

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}