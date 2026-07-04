"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  getOrder, 
  updateOrderStatus, 
  assignRider, 
  adminEditOrder 
} from "@/src/services/order.service";
import { getRiders } from "@/src/services/rider.service";

import CustomerInfoCard from "@/src/components/orders/CustomerInfoCard";
import OrderSummary from "@/src/components/orders/OrderSummary";
import EditableOrderItems from "@/src/components/orders/EditableOrderItems";
import OrderTimeline from "@/src/components/orders/OrderTimeline";

export default function OrderDetailsPage({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [riders, setRiders] = useState<any[]>([]);
  const [selectedRider, setSelectedRider] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadOrder();
    loadRiders();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrder(orderId);
      setOrder(data);
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadRiders = async () => {
    try {
      const data = await getRiders();
      setRiders(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = items.map(item => ({
        product: item.product,
        quantity: item.quantity,
      }));
      await adminEditOrder(order._id, payload);
      alert("✅ Order updated successfully");
      loadOrder();
    } catch (err) {
      alert("❌ Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading order...</div>;
  if (!order) return <div className="p-10 text-red-500 text-center">Order not found</div>;

  const isLocked = ["Delivered", "Cancelled"].includes(order.orderStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-purple-600">FoodMart</div>
          <div className="text-lg font-medium">Order Details</div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <span>🖨️</span> Print
          </button>
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700">
            Update Status
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</div>
              <span className="text-2xl">🛎️</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                <Image src="/admin-avatar.jpg" alt="Admin" width={32} height={32} />
              </div>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Orders List */}
        <div className="w-96 border-r bg-white overflow-y-auto">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">All Orders (32)</h2>
            
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search by order number, phone..."
                className="w-full border rounded-lg pl-10 py-2.5 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Order List Items */}
            <div className="space-y-3">
              {/* Selected Order */}
              <div className="border-2 border-purple-500 rounded-xl p-4 bg-purple-50">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">#{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    <p className="text-sm text-gray-500">{order.items?.length} Items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">৳{order.totalAmount}</p>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      Processing
                    </span>
                  </div>
                </div>
              </div>

              {/* Other orders (sample) */}
              {/* You can map real orders here */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
                <p className="text-gray-500">10 May 2024, 10:30 AM • Via Website</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2 border rounded-lg">Print</button>
                <button className="bg-purple-600 text-white px-5 py-2 rounded-lg">Update Status</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <CustomerInfoCard order={order} />
                
                <div className="bg-white rounded-2xl p-6 border">
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <EditableOrderItems 
                    items={items} 
                    setItems={setItems} 
                    locked={isLocked} 
                  />
                </div>

                {!isLocked && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
                  >
                    {saving ? "Saving..." : "💾 Save Changes"}
                  </button>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <OrderSummary order={order} />
                
                <div className="bg-white rounded-2xl p-6 border">
                  <h3 className="font-semibold mb-4">Order Status</h3>
                  <select className="w-full border rounded-lg p-3">
                    <option>Processing</option>
                    <option>Out For Delivery</option>
                    <option>Delivered</option>
                  </select>
                </div>

                <div className="bg-white rounded-2xl p-6 border">
                  <h3 className="font-semibold mb-4">Assign Rider</h3>
                  <select 
                    className="w-full border rounded-lg p-3 mb-4"
                    value={selectedRider}
                    onChange={(e) => setSelectedRider(e.target.value)}
                  >
                    <option value="">Select Rider</option>
                    {riders.map(r => (
                      <option key={r._id} value={r._id}>{r.name}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => assignRider(order._id, selectedRider)}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium"
                  >
                    Assign Rider
                  </button>
                </div>

                <OrderTimeline order={order} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}