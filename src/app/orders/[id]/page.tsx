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

import { generateInvoice } from "@/src/utils/generateInvoice";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [riders, setRiders] = useState<any[]>([]);
  const [selectedRider, setSelectedRider] = useState("");

  // LOAD DATA
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);

        const o = await getOrder(id);
        const r = await getRiders();

        setOrder(o);
        setItems(o?.items || []);
        setRiders(r || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // LOCK SYSTEM
  const locked =
    order?.orderStatus === "Delivered" ||
    order?.orderStatus === "Cancelled";

  // LOADING UI
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ERROR UI
  if (!order) {
    return <div className="p-10 text-center text-red-500">Order Not Found</div>;
  }

  // INVOICE BUILDER
  const buildInvoice = () => {
    const subtotal =
      items?.reduce((sum, i) => sum + (i.totalPrice || 0), 0) || 0;

    const deliveryCharge = order?.deliveryCharge || 0;
    const discount = order?.discount || 0;

    return {
      invoiceNumber: order.orderNumber,
      orderNumber: order.orderNumber,
      invoiceDate: new Date().toISOString(),

      customer: {
        name: order?.shippingAddress?.fullName || "Customer",
        phone: order?.customerPhone,
        address: `${order?.shippingAddress?.areaOrVillage || ""} ${
          order?.shippingAddress?.landmark || ""
        }`,
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
    <div className="bg-gray-50 min-h-screen p-5">

      {/* DEBUG (remove later if you want) */}
      <div className="bg-black text-white p-2 mb-3 text-sm">
        Order Page Loaded ✔
      </div>

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-1">
        Order #{order.orderNumber}
      </h1>

      <p className="text-gray-500 mb-5">
        Manage Order Details
      </p>

      {/* ✅ INVOICE BUTTON (FOR SURE VISIBLE) */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => {
            console.log("Invoice clicked");
            generateInvoice(buildInvoice());
          }}
          className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
        >
          📄 Download Invoice
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <CustomerInfoCard order={order} />

          <StatusCard
            order={order}
            onChange={(status: string) =>
              updateOrderStatus(order._id, status).then(() =>
                setOrder((prev: any) => ({
                  ...prev,
                  orderStatus: status,
                }))
              )
            }
          />

          <RiderCard
            riders={riders}
            selectedRider={selectedRider}
            setSelectedRider={setSelectedRider}
            assign={() => assignRider(order._id, selectedRider)}
            locked={locked}
          />

          <EditableOrderItems
            items={items}
            setItems={setItems}
            locked={locked}
          />

          {!locked && (
            <button
              onClick={async () => {
                setSaving(true);

                try {
                  await adminEditOrder(
                    order._id,
                    items.map((i) => ({
                      product: i.product,
                      quantity: i.quantity,
                    }))
                  );

                  const updated = await getOrder(id);
                  setOrder(updated);
                  setItems(updated.items || []);
                } catch (err) {
                  console.log(err);
                } finally {
                  setSaving(false);
                }
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <OrderSummary order={{ ...order, items }} />

          <OrderTimeline order={order} />

          {locked && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
              <p className="text-red-600 font-bold">
                Order Locked
              </p>
              <p className="text-sm text-red-500">
                Delivered / Cancelled orders cannot be edited.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}