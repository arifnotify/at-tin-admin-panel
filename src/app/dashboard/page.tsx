"use client";

import { getDashboardSummary } from "@/src/services/analytics.service";
import { DashboardSummary } from "@/src/types/dashboard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data =
        await getDashboardSummary();

      setSummary(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // loading
  if (loading) {
    return (
      <div>
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value:
        summary?.totalUsers || 0,
    },

    {
      title: "Total Products",
      value:
        summary?.totalProducts || 0,
    },

    {
      title: "Total Orders",
      value:
        summary?.totalOrders || 0,
    },

    {
      title: "Revenue",
      value: `$${summary?.totalRevenue || 0}`,
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-gray-500">
              {card.title}
            </h2>

            <h1 className="text-4xl font-bold mt-3">
              {card.value}
            </h1>
          </div>
        ))}

      </div>

    </div>
  );
}