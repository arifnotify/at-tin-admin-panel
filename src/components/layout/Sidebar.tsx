"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Image,
  MapPin,
  Layers,
  LogOut,
} from "lucide-react";

import Cookies from "js-cookie";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Products",
    href: "/products",
    icon: Package,
  },

  {
    title: "Categories",
    href: "/categories",
    icon: Layers,
  },

  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },

  {
    title: "Users",
    href: "/users",
    icon: Users,
  },

  {
    title: "Banners",
    href: "/banners",
    icon: Image,
  },

  {
    title: "Locations",
    href: "/locations",
    icon: MapPin,
  },
];

export default function Sidebar() {

  const logout = () => {
    Cookies.remove("token");

    window.location.href = "/login";
  };

  return (
    <div className="w-[250px] h-screen bg-black text-white fixed left-0 top-0 p-5 flex flex-col justify-between">

      <div>

        <h1 className="text-2xl font-bold mb-10">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-3">

          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <item.icon size={20} />

              <span>{item.title}</span>
            </Link>
          ))}

        </div>

      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition"
      >
        <LogOut size={20} />

        <span>Logout</span>
      </button>

    </div>
  );
}