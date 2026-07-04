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
  const [status, setStatus] = useState<OrderStatus | "All">("All");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const ordersData = await getOrders();
      const ridersData = await getRiders();

      setOrders(ordersData || []);
      setRiders(ridersData || []);

      if (ordersData?.length > 0) {
        await loadSingleOrder(ordersData[0]._id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSingleOrder = async (id: string) => {
    try {
      const data = await getOrder(id);
      setSelectedOrder(data);
      setItems(data.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!selectedOrder) return;
    await updateOrderStatus(selectedOrder._id, newStatus);
    setSelectedOrder((prev: any) => ({ ...prev, orderStatus: newStatus }));
  };

  const handleAssignRider = async () => {
    if (!selectedOrder || !selectedRider) return;
    await assignRider(selectedOrder._id, selectedRider);
    loadSingleOrder(selectedOrder._id);
  };

  const handleSaveItems = async () => {
    if (!selectedOrder) return;
    setSaving(true);
    try {
      await adminEditOrder(
        selectedOrder._id,
        items.map((i) => ({ product: i.product!, quantity: i.quantity }))
      );
      loadSingleOrder(selectedOrder._id);
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const searchedOrders = useMemo(() => {
    return orders.filter((o) =>
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone?.includes(search)
    );
  }, [orders, search]);

  const filteredOrders = searchedOrders.filter((o) =>
    status === "All" ? true : o.orderStatus === status
  );

  const activeOrders = filteredOrders.filter(
    (o) => !["Delivered", "Cancelled"].includes(o.orderStatus)
  );

  const completedOrders = filteredOrders.filter(
    (o) => ["Delivered", "Cancelled"].includes(o.orderStatus)
  );

  if (loading) return <div className="p-12 text-center text-xl">Loading Orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Pending" value={orders.filter(o => o.orderStatus === "Pending").length} />
        <StatCard title="Delivered" value={orders.filter(o => o.orderStatus === "Delivered").length} />
        <StatCard title="Total Revenue" value={`৳${orders.filter(o => o.orderStatus === "Delivered").reduce((sum, o) => sum + (o.totalAmount || 0), 0)}`} />
      </div>

      {/* Search + Tabs */}
      <div className="bg-white rounded-3xl shadow p-6 mb-8">
        <OrderSearch value={search} onChange={setSearch} />
        <div className="mt-5">
          <OrderTabs active={status} onChange={setStatus} />
        </div>
      </div>

      {/* Main Content - Like your Image */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left - Orders List (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl shadow p-5 h-full">
            <OrdersSidebar
              activeOrders={activeOrders}
              completedOrders={completedOrders}
              selectedId={selectedOrder?._id}
              onSelect={loadSingleOrder}
            />
          </div>
        </div>

        {/* Right - Order Details (Big Card Style) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <OrderDetailsPanel
              order={selectedOrder}
              items={items}
              setItems={setItems}
              riders={riders}
              selectedRider={selectedRider}
              setSelectedRider={setSelectedRider}
              updateStatus={handleStatusChange}
              assignRider={handleAssignRider}
              saveItems={handleSaveItems}
              saving={saving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}