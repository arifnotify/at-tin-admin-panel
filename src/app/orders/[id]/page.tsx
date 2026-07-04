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

import CustomerInfoCard from "@/src/components/orders/CustomerInfoCard";
import StatusCard from "@/src/components/orders/StatusCard";
import RiderCard from "@/src/components/orders/RiderCard";
import OrderSummary from "@/src/components/orders/OrderSummary";
import OrderTimeline from "@/src/components/orders/OrderTimeline";
import EditableOrderItems from "@/src/components/orders/EditableOrderItems";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);

  const [items, setItems] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [riders, setRiders] =
    useState<any[]>([]);

  const [selectedRider, setSelectedRider] =
    useState("");

  useEffect(() => {
    if (!id) return;

    loadOrder();
    loadRiders();
  }, [id]);

  // =========================
  // LOAD ORDER
  // =========================

  const loadOrder = async () => {
    try {
      setLoading(true);

      const data =
        await getOrder(id);

      setOrder(data);

      setItems(
        data.items || []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD RIDERS
  // =========================

  const loadRiders = async () => {
    try {
      const data =
        await getRiders();

      setRiders(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // STATUS UPDATE
  // =========================

  const handleStatusChange =
    async (status: string) => {
      try {
        await updateOrderStatus(
          order._id,
          status
        );

        setOrder({
          ...order,
          orderStatus: status,
        });

        alert(
          "Status Updated"
        );
      } catch (err) {
        console.log(err);

        alert(
          "Status Update Failed"
        );
      }
    };

  // =========================
  // ASSIGN RIDER
  // =========================

  const handleAssignRider =
    async () => {
      try {
        if (!selectedRider) {
          alert(
            "Select Rider"
          );
          return;
        }

        await assignRider(
          order._id,
          selectedRider
        );

        alert(
          "Rider Assigned"
        );

        loadOrder();
      } catch (err) {
        console.log(err);

        alert(
          "Assign Failed"
        );
      }
    };

  // =========================
  // SAVE EDITED ITEMS
  // =========================

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload =
        items.map(
          (item) => ({
            product:
              item.product,
            quantity:
              item.quantity,
          })
        );

      await adminEditOrder(
        order._id,
        payload
      );

      alert(
        "Order Updated Successfully"
      );

      loadOrder();
    } catch (err) {
      console.log(err);

      alert(
        "Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-5">
        Order Not Found
      </div>
    );
  }

  // =========================
  // LOCK SYSTEM
  // =========================

  const locked =
    order.orderStatus ===
      "Delivered" ||
    order.orderStatus ===
      "Cancelled";

  return (
    <div className="bg-gray-50 min-h-screen p-5">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Order #
          {order.orderNumber}
        </h1>

        <p className="text-gray-500">
          Manage Order
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-6">

          <CustomerInfoCard
            order={order}
          />

          <StatusCard
            order={order}
            onChange={
              handleStatusChange
            }
          />

          <RiderCard
            riders={riders}
            selectedRider={
              selectedRider
            }
            setSelectedRider={
              setSelectedRider
            }
            assign={
              handleAssignRider
            }
            locked={locked}
          />

          {/* EDIT ITEMS */}

          <EditableOrderItems
            items={items}
            setItems={setItems}
            locked={locked}
          />

          {/* SAVE BUTTON */}

          {!locked && (
            <button
              onClick={
                handleSave
              }
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
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          )}

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">

          <OrderSummary
            order={{
              ...order,
              items,
            }}
          />

          <OrderTimeline
            order={order}
          />

          {locked && (
            <div
              className="
              bg-red-50
              border
              border-red-200
              rounded-2xl
              p-5
            "
            >
              <h3 className="font-bold text-red-600">
                Order Locked
              </h3>

              <p className="text-sm mt-2">
                Delivered /
                Cancelled
                orders cannot
                be edited.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}