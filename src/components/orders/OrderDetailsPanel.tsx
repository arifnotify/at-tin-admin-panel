"use client";

import CustomerInfoCard from "./CustomerInfoCard";
import StatusCard from "./StatusCard";
import RiderCard from "./RiderCard";
import OrderSummary from "./OrderSummary";
import OrderTimeline from "./OrderTimeline";
import EditableOrderItems from "./EditableOrderItems";

import InvoiceActions from "@/src/components/invoice/InvoiceActions";
import { Order } from "@/src/types/order";

type Props = {
  order: Order | null; // ✅ FIX HERE

  riders: any[];

  selectedRider: string;
  setSelectedRider: (v: string) => void;

  assignRider: () => void;
  updateStatus: (status: string) => void;

  items: any[];
  setItems: (items: any[]) => void;

  saveItems: () => void;
  saving: boolean;
};

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
}: Props) {

  // =========================
  // SAFE GUARD (IMPORTANT)
  // =========================
  if (!order) {
    return (
      <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
        Select an order to view details
      </div>
    );
  }

  // =========================
  // LOCK LOGIC
  // =========================
  const locked =
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled";

  return (
    <div className="space-y-5">

      <CustomerInfoCard order={order} />

      <StatusCard
        order={order}
        onChange={updateStatus}
      />

      <RiderCard
        riders={riders}
        selectedRider={selectedRider}
        setSelectedRider={setSelectedRider}
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
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}

      <OrderSummary
        order={{
          ...order,
          items,
        }}
      />

      <OrderTimeline order={order} />

      <div className="pt-4 border-t">
        <InvoiceActions order={order} />
      </div>

    </div>
  );
}