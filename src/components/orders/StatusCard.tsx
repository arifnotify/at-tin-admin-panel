"use client";

import { Order } from "@/src/types/order";

interface Props {
  order: Order;
  onChange: (
    status: string
  ) => void;
}

export default function StatusCard({
  order,
  onChange,
}: Props) {
  const isLocked =
    order.orderStatus ===
      "Delivered" ||
    order.orderStatus ===
      "Cancelled";

  return (
    <div className="bg-white border rounded-2xl p-5">

      <h2 className="font-bold text-xl mb-4">
        Status
      </h2>

      <select
        disabled={isLocked}
        value={order.orderStatus}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
        border
        rounded-xl
        p-3
        w-full
      "
      >
        <option value="Pending">
          Pending
        </option>

        <option value="Processing">
          Processing
        </option>

        <option value="OutForDelivery">
          Out For Delivery
        </option>

        <option value="Delivered">
          Delivered
        </option>

        <option value="Cancelled">
          Cancelled
        </option>
      </select>

    </div>
  );
}