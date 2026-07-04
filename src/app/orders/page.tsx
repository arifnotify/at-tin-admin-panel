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

  // =========================
  // LOAD DATA
  // =========================
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

  // =========================
  // LOAD SINGLE ORDER
  // =========================
  const loadSingleOrder = async (id: string) => {
    try {
      const data = await getOrder(id);

      setSelectedOrder(data);
      setItems(data.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // STATUS UPDATE (FIXED TYPE)
  // =========================
  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      if (!selectedOrder) return;

      await updateOrderStatus(selectedOrder._id, newStatus);

      setSelectedOrder({
        ...selectedOrder,
        orderStatus: newStatus,
      });

      loadData();
    } catch (err) {
      console.log(err);
    }
  };
    // =========================
  // ASSIGN RIDER
  // =========================
  const handleAssignRider = async () => {
    try {
      if (!selectedOrder) return;

      if (!selectedRider) {
        alert("Select Rider First");
        return;
      }

      await assignRider(selectedOrder._id, selectedRider);

      alert("Rider Assigned");

      loadSingleOrder(selectedOrder._id);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SAVE ITEMS
  // =========================
  const handleSaveItems = async () => {
    try {
      if (!selectedOrder) return;

      setSaving(true);

      const payload = items.map((item) => ({
        product: item.product!,
        quantity: item.quantity,
      }));

      await adminEditOrder(selectedOrder._id, payload);

      alert("Order Updated");

      loadSingleOrder(selectedOrder._id);
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // SEARCH
  // =========================
  const searchedOrders = useMemo(() => {
    return orders.filter((order) => {
      return (
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customerPhone.includes(search)
      );
    });
  }, [orders, search]);

  // =========================
  // FILTER BY STATUS (FIXED)
  // =========================
  const filteredOrders = searchedOrders.filter((order) => {
    if (status === "All") return true;
    return order.orderStatus === status;
  });

  // =========================
  // ACTIVE / COMPLETED
  // =========================
  const activeOrders = filteredOrders.filter(
    (o) => o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled"
  );

  const completedOrders = filteredOrders.filter(
    (o) => o.orderStatus === "Delivered" || o.orderStatus === "Cancelled"
  );

  // =========================
  // STATS
  // =========================
  const pendingCount = orders.filter((o) => o.orderStatus === "Pending").length;

  const deliveredCount = orders.filter((o) => o.orderStatus === "Delivered").length;

  const totalRevenue = orders
    .filter((o) => o.orderStatus === "Delivered")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-5 bg-gray-50 min-h-screen">

      {/* =========================
          STATS
      ========================= */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Pending" value={pendingCount} />
        <StatCard title="Delivered" value={deliveredCount} />
        <StatCard title="Revenue" value={`৳${totalRevenue}`} />

      </div>

      {/* SEARCH */}
      <div className="bg-white border rounded-2xl p-5 mb-5">
        <OrderSearch value={search} onChange={setSearch} />

        <div className="mt-4">
          <OrderTabs active={status} onChange={setStatus} />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid lg:grid-cols-12 gap-5">

        {/* LEFT */}
        <div className="lg:col-span-4">
          <OrdersSidebar
            activeOrders={activeOrders}
            completedOrders={completedOrders}
            selectedId={selectedOrder?._id}
            onSelect={loadSingleOrder}
          />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8">
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
  );
}