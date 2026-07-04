"use client";

import { Order } from "@/src/types/order";

interface Props {
  order: Order;
}

export default function OrderSummary({
  order,
}: Props) {
  const total =
    order.items?.reduce(
      (sum, item) =>
        sum + item.totalPrice,
      0
    ) || 0;

  const totalItems =
    order.items?.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    ) || 0;

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">

      <h2 className="text-xl font-bold mb-5">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-600">
            Products
          </span>

          <span className="font-semibold">
            {order.items?.length || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Total Quantity
          </span>

          <span className="font-semibold">
            {totalItems}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Payment Method
          </span>

          <span className="font-semibold">
            {order.paymentMethod}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Payment Status
          </span>

          <span
            className={`font-semibold ${
              order.isPaid
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {order.isPaid
              ? "Paid"
              : "Unpaid"}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">

          <span>
            Total Amount
          </span>

          <span className="text-green-600">
            ৳{total}
          </span>

        </div>

      </div>

    </div>
  );
}