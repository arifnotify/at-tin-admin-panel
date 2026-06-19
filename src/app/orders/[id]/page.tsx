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
  const [riders, setRiders] = useState<any[]>([]);
  const [selectedRider, setSelectedRider] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD ORDER
  // =========================
  const loadOrder = async () => {
    try {
      if (!id) return;

      const data = await getOrder(id);
      setOrder(data);
    } catch (err) {
      console.log(err);
      setError("Order not found");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD RIDERS
  // =========================
  const loadRiders = async () => {
    try {
      const data = await getRiders();
      setRiders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrder();
    loadRiders();
  }, [id]);

  // =========================
  // STATUS UPDATE
  // =========================
  const handleStatusUpdate = async (status: string) => {
    try {
      setActionLoading(true);

      await updateOrderStatus(order._id, status);

      setOrder((prev: any) => ({
        ...prev,
        orderStatus: status,
      }));
    } catch (err) {
      console.log(err);
      alert("Status update failed");
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // ASSIGN RIDER
  // =========================
  const handleAssignRider = async () => {
    try {
      if (!selectedRider) {
        alert("Select a rider first");
        return;
      }

      setActionLoading(true);

      await assignRider(order._id, selectedRider);

      await loadOrder(); // refresh order after assign

      alert("Rider assigned successfully");
    } catch (err) {
      console.log(err);
      alert("Assign failed");
    } finally {
      setActionLoading(false);
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

  if (!order) return null;

  return (
    <div className="p-5">

      {/* =========================
          HEADER
      ========================= */}
      <h1 className="text-3xl font-bold mb-5">
        Order Details
      </h1>

      {/* =========================
          ORDER INFO
      ========================= */}
      <div className="border rounded p-5 mb-5">

        <p><strong>Order Number:</strong> {order.orderNumber}</p>
        <p><strong>Customer Phone:</strong> {order.customerPhone}</p>
        <p><strong>Shipping Address ID:</strong> {order.shippingAddress}</p>
        <p><strong>Total:</strong> ৳{order.totalAmount}</p>

        <p className="mt-2">
          <strong>Status:</strong> {order.orderStatus}
        </p>

        {/* =========================
            STATUS UPDATE
        ========================= */}
        <div className="mt-4">
          <label className="font-semibold block mb-2">
            Update Status
          </label>

          <select
            value={order.orderStatus}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="border rounded px-3 py-2"
            disabled={actionLoading}
          >
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* =========================
            ASSIGN RIDER
        ========================= */}
        <div className="mt-6">

          <label className="font-semibold block mb-2">
            Assign Rider
          </label>

          <select
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            disabled={actionLoading}
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
            disabled={actionLoading}
          >
            {actionLoading ? "Processing..." : "Assign Rider"}
          </button>
        </div>

        {/* =========================
            CURRENT RIDER
        ========================= */}
        {order.assignedRider && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p>
              <strong>Assigned Rider:</strong>{" "}
              {typeof order.assignedRider === "object"
                ? order.assignedRider.name
                : order.assignedRider}
            </p>
          </div>
        )}
      </div>

      {/* =========================
          ORDER ITEMS
      ========================= */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Ordered Products
        </h2>

        {order.items?.map((item: any, index: number) => (
          <div
            key={index}
            className="border rounded p-4 mb-4 flex gap-4"
          >
            <img
              src={item.productImage}
              className="w-24 h-24 object-cover rounded"
            />

            <div>
              <h3 className="font-bold">
                {item.productName}
              </h3>

              <p>Qty: {item.quantity}</p>
              <p>Price: ৳{item.price}</p>
              <p>Total: ৳{item.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}