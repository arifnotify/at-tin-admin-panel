"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    // IF NO TOKEN
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Admin Panel Started 🚀
      </p>
    </div>
  );
}