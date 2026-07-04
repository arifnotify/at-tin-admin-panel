"use client";

import CustomerInfoCard from "./CustomerInfoCard";
import StatusCard from "./StatusCard";
import RiderCard from "./RiderCard";
import OrderSummary from "./OrderSummary";
import OrderTimeline from "./OrderTimeline";
import EditableOrderItems from "./EditableOrderItems";

import { generateInvoice } from "@/src/utils/generateInvoice";

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
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled";

  const buildInvoice = () => {
    const subtotal =
      items?.reduce((sum: number, i: any) => sum + (i.totalPrice || 0), 0) || 0;

    const deliveryCharge = order.deliveryCharge || 0;
    const discount = order.discount || 0;

    return {
      invoiceNumber: order.orderNumber,
      orderNumber: order.orderNumber,
      invoiceDate: new Date().toISOString(),

      customer: {
        name: order.shippingAddress?.fullName || "Customer",
        phone: order.customerPhone,
        address: `${order.shippingAddress?.areaOrVillage || ""} ${order.shippingAddress?.landmark || ""}`,
      },

      items,

      subtotal,
      deliveryCharge,
      discount,
      total: subtotal + deliveryCharge - discount,

      paymentMethod: order.paymentMethod,
      paymentStatus: order.isPaid,
      orderStatus: order.orderStatus,
    };
  };

  return (
    <div className="space-y-5">

      {/* ✅ INVOICE BUTTON (NOW FIXED) */}
      <div>
        <button
          type="button"
          onClick={() => generateInvoice(buildInvoice())}
          className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
        >
          📄 Download Invoice
        </button>
      </div>

      <CustomerInfoCard order={order} />

      <StatusCard order={order} onChange={updateStatus} />

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
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}

      <OrderSummary order={{ ...order, items }} />

      <OrderTimeline order={order} />
    </div>
  );
}