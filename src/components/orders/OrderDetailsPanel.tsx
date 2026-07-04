"use client";

import CustomerInfoCard from "./CustomerInfoCard";
import StatusCard from "./StatusCard";
import RiderCard from "./RiderCard";
import OrderSummary from "./OrderSummary";
import OrderTimeline from "./OrderTimeline";
import EditableOrderItems from "./EditableOrderItems";

export default function OrderDetailsPanel({
  order,
  riders,
  selectedRider,
  setSelectedRider,
  assignRider,
  updateStatus,
  items,
  setItems,
  saveItems,
  saving,
}: any) {
  if (!order) {
    return (
      <div className="bg-white border rounded-2xl p-10">
        Select Order
      </div>
    );
  }

  const locked =
    order.orderStatus ===
      "Delivered" ||
    order.orderStatus ===
      "Cancelled";

  return (
    <div className="space-y-5">

      <CustomerInfoCard
        order={order}
      />

      <StatusCard
        order={order}
        onChange={updateStatus}
      />

      <RiderCard
        riders={riders}
        selectedRider={
          selectedRider
        }
        setSelectedRider={
          setSelectedRider
        }
        assign={assignRider}
        locked={locked}
      />

      <EditableOrderItems
        items={items}
        setItems={setItems}
        locked={locked}
      />

      {!locked && (
        <button
          onClick={saveItems}
          disabled={saving}
          className="
          bg-green-600
          text-white
          px-6
          py-3
          rounded-xl
        "
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>
      )}

      <OrderSummary
        order={{
          ...order,
          items,
        }}
      />

      <OrderTimeline
        order={order}
      />

    </div>
  );
}