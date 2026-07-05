"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getOrders,
  getOrder,
  updateOrderStatus,
  assignRider,
  adminEditOrder,
} from "@/src/services/order.service";

import { getRiders } from "@/src/services/rider.service";

import OrdersSidebar from "@/src/components/orders/OrdersSidebar";
import OrderDetailsPanel from "@/src/components/orders/OrderDetailsPanel";
import OrderSearch from "@/src/components/orders/OrderSearch";
import OrderTabs from "@/src/components/orders/OrderTabs";
import StatCard from "@/src/components/dashboard/StatCard";

import { Order, OrderItem, OrderStatus } from "@/src/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [items, setItems] = useState<OrderItem[]>([]);
  const [riders, setRiders] = useState<any[]>([]);

  const [selectedRider, setSelectedRider] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<OrderStatus | "All">("All");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const ordersData = await getOrders();
      const ridersData = await getRiders();

      setOrders(ordersData || []);
      setRiders(ridersData || []);

      if (ordersData.length > 0) {
        await loadSingleOrder(ordersData[0]._id);
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadSingleOrder(id: string) {
    const data = await getOrder(id);

    setSelectedOrder(data);
    setItems(data.items || []);
  }

  async function handleStatus(status: OrderStatus) {
    if (!selectedOrder) return;

    await updateOrderStatus(selectedOrder._id, status);

    setSelectedOrder({
      ...selectedOrder,
      orderStatus: status,
    });
  }

  async function handleAssign() {
    if (!selectedOrder || !selectedRider) return;

    await assignRider(
      selectedOrder._id,
      selectedRider
    );

    loadSingleOrder(selectedOrder._id);
  }

  async function saveItems() {
    if (!selectedOrder) return;

    setSaving(true);

    try {
      await adminEditOrder(
        selectedOrder._id,
        items.map((i) => ({
          product: i.product!,
          quantity: i.quantity,
        }))
      );

      loadSingleOrder(selectedOrder._id);
    } finally {
      setSaving(false);
    }
  }

  const searched = useMemo(() => {
    return orders.filter(
      (o) =>
        o.orderNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        o.customerPhone.includes(search)
    );
  }, [orders, search]);

  const filtered = searched.filter((o) =>
    status === "All"
      ? true
      : o.orderStatus === status
  );

  const activeOrders = filtered.filter(
    (o) =>
      o.orderStatus !== "Delivered" &&
      o.orderStatus !== "Cancelled"
  );

  const completedOrders = filtered.filter(
    (o) =>
      o.orderStatus === "Delivered" ||
      o.orderStatus === "Cancelled"
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb]">

      {/* HEADER */}

      <div className="bg-white border-b">

        <div className="max-w-[1700px] mx-auto px-8 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Orders Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Manage customer orders
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button className="w-11 h-11 rounded-full bg-gray-100">
              🔔
            </button>

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                A
              </div>

              <div>

                <p className="font-semibold">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Super Admin
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-[1700px] mx-auto p-8">

        {/* STATS */}

        <div className="grid grid-cols-5 gap-5 mb-7">

          <StatCard
            title="Total Orders"
            value={orders.length}
          />

          <StatCard
            title="Pending"
            value={
              orders.filter(
                (o) =>
                  o.orderStatus === "Pending"
              ).length
            }
          />

          <StatCard
            title="Processing"
            value={
              orders.filter(
                (o) =>
                  o.orderStatus ===
                  "Processing"
              ).length
            }
          />

          <StatCard
            title="Delivered"
            value={
              orders.filter(
                (o) =>
                  o.orderStatus ===
                  "Delivered"
              ).length
            }
          />

          <StatCard
            title="Revenue"
            value={`৳${orders
              .filter(
                (o) =>
                  o.orderStatus ===
                  "Delivered"
              )
              .reduce(
                (sum, o) =>
                  sum + o.totalAmount,
                0
              )}`}
          />

        </div>

        {/* SEARCH */}

        <div className="bg-white rounded-2xl border p-5 mb-6">

          <OrderSearch
            value={search}
            onChange={setSearch}
          />

          <div className="mt-5">

            <OrderTabs
              active={status}
              onChange={setStatus}
            />

          </div>

        </div>

        {/* MAIN */}

        <div className="grid grid-cols-12 gap-6">

          {/* LEFT */}

          <div className="col-span-4">

            <OrdersSidebar
              activeOrders={activeOrders}
              completedOrders={completedOrders}
              selectedId={
                selectedOrder?._id
              }
              onSelect={loadSingleOrder}
            />

          </div>

          {/* RIGHT */}

          <div className="col-span-8">

            <OrderDetailsPanel
              order={selectedOrder}
              items={items}
              setItems={setItems}
              riders={riders}
              selectedRider={
                selectedRider
              }
              setSelectedRider={
                setSelectedRider
              }
              updateStatus={
                handleStatus
              }
              assignRider={
                handleAssign
              }
              saveItems={
                saveItems
              }
              saving={saving}
            />

          </div>

        </div>

      </div>

    </div>
  );
}