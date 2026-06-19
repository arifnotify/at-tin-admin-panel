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

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    if (!id) return;

    fetchOrder();
    fetchRiders();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const data = await getOrder(id);
      setOrder(data);
    } catch (err) {
      console.log(err);
      setError("Order Not Found");
    } finally {
      setLoading(false);
    }
  };

  const fetchRiders = async () => {
    try {
      const data = await getRiders();
      setRiders(data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // STATUS UPDATE
  // =========================
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const newStatus = e.target.value;

      await updateOrderStatus(order._id, newStatus);

      setOrder({ ...order, orderStatus: newStatus });

      alert("Status Updated");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  // =========================
  // ASSIGN RIDER
  // =========================
  const handleAssignRider = async () => {
    try {
      if (!selectedRider) {
        alert("Select Rider First");
        return;
      }

      await assignRider(order._id, selectedRider);

      alert("Rider Assigned");

      fetchOrder();
    } catch (err) {
      console.log(err);
      alert("Assign Failed");
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) return <p className="p-5">Loading...</p>;

  if (error) return <p className="p-5 text-red-500">{error}</p>;

  if (!order) return <p className="p-5">No Order Found</p>;

  // =========================
  // SAFE ADDRESS HANDLING
  // =========================
  const address =
    typeof order.shippingAddress === "object"
      ? order.shippingAddress
      : null;

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Order Details
      </h1>

      {/* =========================
          ORDER INFO
      ========================= */}
      <div className="border rounded p-5 mb-5">

        <p>
          <strong>Order Number:</strong>{" "}
          {order.orderNumber}
        </p>

        <p>
          <strong>Customer Phone:</strong>{" "}
          {order.customerPhone}
        </p>

        <p>
          <strong>Shipping Address:</strong>{" "}
          {address
            ? `${address.areaOrVillage || ""}, ${address.landmark || ""}`
            : "No Address"}
        </p>

        {address?.latitude && address?.longitude && (
          <p className="text-blue-500">
            Map:{" "}
            <a
              href={`https://www.google.com/maps?q=${address.latitude},${address.longitude}`}
              target="_blank"
            >
              Open Location
            </a>
          </p>
        )}

        <p>
          <strong>Total:</strong> ৳{order.totalAmount}
        </p>

        <p>
          <strong>Status:</strong> {order.orderStatus}
        </p>

        {/* =========================
            STATUS UPDATE
        ========================= */}
        <div className="mt-4">

          <label className="block mb-2 font-semibold">
            Update Status
          </label>

          <select
            value={order.orderStatus}
            onChange={handleStatusChange}
            className="border px-3 py-2 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="OutForDelivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>

        {/* =========================
            RIDER ASSIGN
        ========================= */}
        <div className="mt-6">

          <label className="block mb-2 font-semibold">
            Assign Rider
          </label>

          <select
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          >
            <option value="">Select Rider</option>

            {riders.map((rider: any) => (
              <option key={rider._id} value={rider._id}>
                {rider.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAssignRider}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Assign Rider
          </button>

        </div>

        {/* =========================
            ASSIGNED RIDER
        ========================= */}
        {order.assignedRider && (
          <p className="mt-4">
            <strong>Assigned Rider:</strong>{" "}
            {order.assignedRider}
          </p>
        )}

      </div>

      {/* =========================
          ITEMS
      ========================= */}
      <h2 className="text-2xl font-bold mb-4">
        Products
      </h2>

      {order.items?.map((item: any, index: number) => (
        <div
          key={index}
          className="border p-4 mb-3 rounded flex gap-4"
        >
          <img
            src={item.productImage}
            className="w-20 h-20 object-cover rounded"
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
  );
}