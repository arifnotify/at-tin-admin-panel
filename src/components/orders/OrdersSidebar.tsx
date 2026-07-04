"use client";

import { Order } from "@/src/types/order";

interface Props {
  activeOrders: Order[];
  completedOrders: Order[];
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
    <div className="bg-white rounded-3xl border shadow-sm h-[calc(100vh-180px)] overflow-hidden flex flex-col">

      {/* Header */}
      <div className="p-6 border-b sticky top-0 bg-white z-10">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <p className="text-gray-500 mt-1">
          {activeOrders.length} Active • {completedOrders.length} Completed
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-8">

        {/* Active Orders */}
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-blue-600 mb-4 px-1">
            Active Orders
          </h3>

          <div className="space-y-3">
            {activeOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-400 border border-dashed rounded-2xl">
                No Active Orders
              </div>
            ) : (
              activeOrders.map((order) => (
                <button
                  key={order._id}
                  onClick={() => onSelect(order._id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all hover:shadow-md ${
                    selectedId === order._id
                      ? "border-violet-500 bg-violet-50 shadow"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg text-gray-900">
                        #{order.orderNumber}
                      </p>
                      <p className="text-gray-600 mt-1">{order.customerPhone}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-xl text-violet-600">
                        ৳{order.totalAmount}
                      </p>
                      <span className="inline-block mt-2 px-4 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Completed Orders */}
        <div>
          <h3 className="uppercase text-xs font-bold tracking-widest text-emerald-600 mb-4 px-1">
            Completed Orders
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {completedOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-400 border border-dashed rounded-2xl">
                No Completed Orders
              </div>
            ) : (
              completedOrders.map((order) => (
                <button
                  key={order._id}
                  onClick={() => onSelect(order._id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all hover:shadow-md ${
                    selectedId === order._id
                      ? "border-emerald-500 bg-emerald-50 shadow"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">#{order.orderNumber}</p>
                      <p className="text-gray-600 mt-1">{order.customerPhone}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-xl">৳{order.totalAmount}</p>
                      <span
                        className={`inline-block mt-2 px-4 py-1 text-xs font-semibold rounded-full ${
                          order.orderStatus === "Delivered"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}