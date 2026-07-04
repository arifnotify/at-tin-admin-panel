"use client";

import { Order } from "@/src/types/order";

interface Props {
  order: Order;
}

export default function OrderTimeline({
  order,
}: Props) {
  const steps = [
    "Pending",
    "Processing",
    "OutForDelivery",
    "Delivered",
  ];

  const currentIndex =
    steps.indexOf(
      order.orderStatus as any
    );

  return (
    <div className="bg-white border rounded-2xl p-5">

      <h2 className="font-bold text-xl mb-5">
        Timeline
      </h2>

      <div className="space-y-4">

        {steps.map(
          (step, index) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              <div
                className={`
                w-4 h-4 rounded-full
                ${
                  index <=
                  currentIndex
                    ? "bg-green-500"
                    : "bg-gray-300"
                }
              `}
              />

              <span>{step}</span>
            </div>
          )
        )}

      </div>

    </div>
  );
}