"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getOrder,
  updateOrderStatus,
  assignRider,
} from "@/src/services/order.service";

import { getRiders } from "@/src/services/rider.service";

export default function OrderDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [riders, setRiders] = useState<any[]>([]);
  const [selectedRider, setSelectedRider] = useState("");

  useEffect(() => {
    if (!id) return;

    loadOrder();
    loadRiders();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getOrder(id);

      if (!data) {
        setError("Order not found");
        return;
      }

      setOrder(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const loadRiders = async () => {
    try {
      const data = await getRiders();
      setRiders(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusUpdate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const newStatus = e.target.value;

      await updateOrderStatus(order._id, newStatus);

      setOrder((prev: any) => ({
        ...prev,
        orderStatus: newStatus,
      }));
    } catch (err) {
      console.log(err);
      alert("Status update failed");
    }
  };

  const handleAssignRider = async () => {
    try {
      if (!selectedRider) return alert("Select rider first");

      await assignRider(order._id, selectedRider);

      alert("Rider assigned");

      loadOrder();
    } catch (err) {
      console.log(err);
      alert("Assign failed");
    }
  };

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

  // =========================
  // ERROR UI
  // =========================
  if (error) {
    return <p className="p-5 text-red-500">{error}</p>;
  }

  // =========================
  // NULL CHECK (IMPORTANT)
  // =========================
  if (!order) {
    return <p className="p-5">No order found</p>;
  }

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Order Details
      </h1>

      {/* ORDER INFO */}
      <div className="border p-5 rounded mb-5">

        <p><b>Order:</b> {order.orderNumber}</p>
        <p><b>Phone:</b> {order.customerPhone}</p>
        <p><b>Address:</b> {order.shippingAddress}</p>
        <p><b>Total:</b> ৳{order.totalAmount}</p>
        <p><b>Status:</b> {order.orderStatus}</p>

        {/* STATUS UPDATE */}
        <div className="mt-4">
          <select
            value={order.orderStatus}
            onChange={handleStatusUpdate}
            className="border p-2"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="OutForDelivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* RIDER ASSIGN */}
        <div className="mt-5">

          <select
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Rider</option>

            {riders.map((r: any) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAssignRider}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Assign Rider
          </button>

        </div>

      </div>

      {/* ITEMS */}
      <div>
        <h2 className="text-xl font-bold mb-3">
          Products
        </h2>

        {order.items?.map((item: any, i: number) => (
          <div key={i} className="border p-3 mb-3 flex gap-3">
            <img
              src={item.productImage}
              className="w-20 h-20 object-cover"
            />

            <div>
              <p>{item.productName}</p>
              <p>Qty: {item.quantity}</p>
              <p>৳{item.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}