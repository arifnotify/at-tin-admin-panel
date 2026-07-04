"use client";

import { Order } from "@/src/types/order";

interface Props {
  activeOrders: Order[];
  completedOrders: Order[];

  selectedId: string;

  onSelect: (
    id: string
  ) => void;
}

export default function OrdersSidebar({
  activeOrders,
  completedOrders,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl">

      <div className="p-4 border-b">

        <h2 className="font-bold text-xl">
          Orders
        </h2>

      </div>

      <div className="p-3">

        {/* ACTIVE */}

        <h3 className="font-bold mb-3">
          Active Orders
        </h3>

        <div className="space-y-2">

          {activeOrders.map(
            (order) => (
              <button
                key={order._id}
                onClick={() =>
                  onSelect(order._id)
                }
                className={`
                w-full
                text-left
                p-3
                rounded-xl
                border

                ${
                  selectedId ===
                  order._id
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }
              `}
              >
                <p className="font-semibold">
                  #{order.orderNumber}
                </p>

                <p className="text-xs text-gray-500">
                  {
                    order.customerPhone
                  }
                </p>

              </button>
            )
          )}

        </div>

        {/* COMPLETED */}

        <h3 className="font-bold mt-6 mb-3">
          Completed Orders
        </h3>

        <div className="space-y-2">

          {completedOrders.map(
            (order) => (
              <button
                key={order._id}
                onClick={() =>
                  onSelect(order._id)
                }
                className={`
                w-full
                text-left
                p-3
                rounded-xl
                border

                ${
                  selectedId ===
                  order._id
                    ? "border-green-500 bg-green-50"
                    : ""
                }
              `}
              >
                <p className="font-semibold">
                  #{order.orderNumber}
                </p>

                <p className="text-xs text-gray-500">
                  {
                    order.customerPhone
                  }
                </p>

              </button>
            )
          )}

        </div>

      </div>

    </div>
  );
}