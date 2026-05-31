"use client";

import { useEffect, useState } from "react";
import { getOrder, updateStatus } from "@/src/services/order.service";

export default function Page({ params }: any) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    getOrder(params.id).then(setOrder);
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1>Order Details</h1>

      <p>Phone: {order.customerPhone}</p>
      <p>Address: {order.shippingAddress}</p>

      {order.items.map((item: any) => (
        <div key={item.product}>
          <p>{item.productName}</p>
          <p>{item.quantity}</p>
        </div>
      ))}

      <select
        value={order.orderStatus}
        onChange={(e) =>
          updateStatus(order._id, {
            orderStatus: e.target.value,
          })
        }
      >
        <option>Pending</option>
        <option>Processing</option>
        <option>Shipped</option>
        <option>Delivered</option>
      </select>
    </div>
  );
}
