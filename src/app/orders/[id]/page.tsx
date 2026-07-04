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

// Components
import CustomerInfoCard from "@/src/components/orders/CustomerInfoCard";
import StatusCard from "@/src/components/orders/StatusCard";
import RiderCard from "@/src/components/orders/RiderCard";
import OrderSummary from "@/src/components/orders/OrderSummary";
import OrderTimeline from "@/src/components/orders/OrderTimeline";
import EditableOrderItems from "@/src/components/orders/EditableOrderItems";

import InvoiceActions from "@/src/components/invoice/InvoiceActions";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [riders, setRiders] = useState<any[]>([]);

  const [selectedRider, setSelectedRider] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    if (!id) return;

    loadOrder();
    loadRiders();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);

      const data = await getOrder(id);

      setOrder(data);
      setItems(data?.items || []);
    } catch (err) {
      console.log(err);
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

  // =========================
  // STATUS UPDATE
  // =========================
  const handleStatusChange = async (status: string) => {
    if (!order) return;

    try {
      await updateOrderStatus(order._id, status);

      setOrder({
        ...order,
        orderStatus: status,
      });
    } catch (err) {
      console.log(err);
      alert("Status Update Failed");
    }
  };

  // =========================
  // ASSIGN RIDER
  // =========================
  const handleAssignRider = async () => {
    if (!order) return;

    try {
      if (!selectedRider) {
        alert("Select Rider");
        return;
      }

      await assignRider(order._id, selectedRider);

      alert("Rider Assigned");

      loadOrder();
    } catch (err) {
      console.log(err);
      alert("Assign Failed");
    }
  };

  // =========================
  // SAVE ITEMS
  // =========================
  const handleSave = async () => {
    if (!order) return;

    try {
      setSaving(true);

      const payload = items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }));

      await adminEditOrder(order._id, payload);

      alert("Order Updated Successfully");

      loadOrder();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  if (!order) {
    return <div className="p-5">Order Not Found</div>;
  }

  // =========================
  // LOCK SYSTEM
  // =========================
  const locked =
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled";

  return (
    <div className="bg-gray-50 min-h-screen p-5">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Order #{order.orderNumber}
        </h1>

        <p className="text-gray-500">
          Manage order, rider, status & invoice
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          <CustomerInfoCard order={order} />

          <StatusCard
            order={order}
            onChange={handleStatusChange}
          />

          <RiderCard
            riders={riders}
            selectedRider={selectedRider}
            setSelectedRider={setSelectedRider}
            assign={handleAssignRider}
            locked={locked}
          />

          <EditableOrderItems
            items={items}
            setItems={setItems}
            locked={locked}
          />

          {!locked && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ORDER SUMMARY */}
          <OrderSummary
            order={{
              ...order,
              items,
            }}
          />

          {/* TIMELINE */}
          <OrderTimeline order={order} />

          {/* 🧾 INVOICE */}
          <InvoiceActions order={order} />

          {/* LOCK INFO */}
          {locked && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-bold text-red-600">
                Order Locked
              </h3>

              <p className="text-sm mt-2">
                Delivered / Cancelled orders cannot be edited.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}