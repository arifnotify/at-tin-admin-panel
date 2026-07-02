"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getOrder,
  updateOrderStatus,
  assignRider,
  adminEditOrder,
} from "@/src/services/order.service";

import { getRiders } from "@/src/services/rider.service";

export default function OrderDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [riders, setRiders] = useState<any[]>([]);
  const [selectedRider, setSelectedRider] = useState("");

  const [saving, setSaving] = useState(false);

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
      setItems(data.items || []);
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
  // ITEM UPDATE (quantity only)
  // =========================
  const updateQty = (index: number, value: number) => {
    const updated = [...items];

    updated[index].quantity = value;

    updated[index].totalPrice =
      updated[index].price * value;

    setItems(updated);
  };

  // =========================
  // SAVE ORDER EDIT
  // =========================
  const handleSaveEdit = async () => {
    try {
      setSaving(true);

      const payload = items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }));

      await adminEditOrder(order._id, payload);

      alert("Order Updated Successfully");

      fetchOrder();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    } finally {
      setSaving(false);
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
  // LOADING STATES
  // =========================
  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">{error}</p>;
  if (!order) return <p className="p-5">No Order Found</p>;

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

        <p><strong>Order Number:</strong> {order.orderNumber}</p>
        <p><strong>Customer Phone:</strong> {order.customerPhone}</p>

        <p>
          <strong>Shipping Address:</strong>{" "}
          {address
            ? `${address.areaOrVillage || ""}, ${address.landmark || ""}`
            : "No Address"}
        </p>

        <p><strong>Total:</strong> ৳{order.totalAmount}</p>

        <p><strong>Status:</strong> {order.orderStatus}</p>

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
      </div>

      {/* =========================
          🔥 ORDER EDIT SECTION
      ========================= */}
      <h2 className="text-2xl font-bold mb-4">
        Edit Products
      </h2>

      {items.map((item: any, index: number) => (
        <div
          key={index}
          className="border p-4 mb-3 rounded flex gap-4"
        >

          <img
            src={item.productImage}
            className="w-20 h-20 object-cover rounded"
          />

          <div className="flex-1">

            <h3 className="font-bold">
              {item.productName}
            </h3>

            <p>Price: ৳{item.price}</p>

            {/* =========================
                EDIT QUANTITY
            ========================= */}
            <input
              type="number"
              value={item.quantity}
              min={1}
              onChange={(e) =>
                updateQty(index, Number(e.target.value))
              }
              className="border px-2 py-1 w-24 mt-2"
            />

            <p className="mt-1">
              Total: ৳{item.totalPrice}
            </p>

          </div>
        </div>
      ))}

      {/* =========================
          SAVE BUTTON
      ========================= */}
      <button
        onClick={handleSaveEdit}
        disabled={saving}
        className="bg-green-600 text-white px-5 py-2 rounded mt-4"
      >
        {saving ? "Saving..." : "Save Order Changes"}
      </button>

    </div>
  );
}