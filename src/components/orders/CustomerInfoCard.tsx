"use client";

import { Order } from "@/src/types/order";

interface Props {
  order: Order;
}

export default function CustomerInfoCard({
  order,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl p-5">

      <h2 className="font-bold text-xl mb-4">
        Customer Information
      </h2>

      <div className="space-y-2">

        <p>
          <b>Phone:</b>{" "}
          {order.customerPhone}
        </p>

        <p>
          <b>Area:</b>{" "}
          {
            order.shippingAddress
              ?.areaOrVillage
          }
        </p>

        <p>
          <b>Landmark:</b>{" "}
          {
            order.shippingAddress
              ?.landmark
          }
        </p>

      </div>

    </div>
  );
}