"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Image,
  MapPin,
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
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove("token");

    window.location.href =
      "/login";
  };

  return (
    <div className="hidden md:flex flex-col justify-between w-[260px] h-screen bg-black text-white fixed left-0 top-0 p-5">

      <div>

        <h1 className="text-3xl font-bold mb-10">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-2">

          {menuItems.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition ${
                  active
                    ? "bg-white text-black"
                    : "hover:bg-gray-800"
                }`}
              >
                <item.icon size={20} />

                <span>
                  {item.title}
                </span>
              </Link>
            );
          })}

        </div>

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500 transition"
      >
        <LogOut size={20} />

        <span>Logout</span>
      </button>

    </div>
  );
}