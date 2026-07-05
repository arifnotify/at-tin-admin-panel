"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getOrders,
  getOrder,
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
  const [status, setStatus] = useState<OrderStatus | "All">("All");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const ordersData = await getOrders();
    const ridersData = await getRiders();

    setOrders(ordersData || []);
    setRiders(ridersData || []);

    if (ordersData?.length > 0) {
      loadSingleOrder(ordersData[0]._id);
    }

    setLoading(false);
  };

  const loadSingleOrder = async (id: string) => {
    const data = await getOrder(id);
    setSelectedOrder(data);
    setItems(data.items || []);
  };

  // FILTERS
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.customerPhone.includes(search);

      const matchStatus =
        status === "All" ? true : o.orderStatus === status;

      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  const activeOrders = filteredOrders.filter(
    (o) => o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled"
  );

  const completedOrders = filteredOrders.filter(
    (o) => o.orderStatus === "Delivered" || o.orderStatus === "Cancelled"
  );

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-5">

      {/* ================= TOP STATS (IMAGE STYLE) ================= */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Pending" value={orders.filter(o=>o.orderStatus==="Pending").length} />
        <StatCard title="Processing" value={orders.filter(o=>o.orderStatus==="Processing").length} />
        <StatCard title="Delivered" value={orders.filter(o=>o.orderStatus==="Delivered").length} />
        <StatCard title="Revenue" value={"৳125,430"} />
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid grid-cols-12 gap-5">

        {/* LEFT PANEL */}
        <div className="col-span-4 space-y-4">

          <div className="bg-white p-4 rounded-2xl border">
            <OrderSearch value={search} onChange={setSearch} />
          </div>

          <div className="bg-white p-4 rounded-2xl border">
            <OrderTabs active={status} onChange={setStatus} />
          </div>

          <OrdersSidebar
            activeOrders={activeOrders}
            completedOrders={completedOrders}
            selectedId={selectedOrder?._id}
            onSelect={loadSingleOrder}
          />

        </div>

        {/* RIGHT PANEL (MAIN DETAILS) */}
        <div className="col-span-8">

          <OrderDetailsPanel
            order={selectedOrder}
            items={items}
            setItems={setItems}
            riders={riders}
            selectedRider={selectedRider}
            setSelectedRider={setSelectedRider}
          />

        </div>

      </div>
    </div>
  );
}