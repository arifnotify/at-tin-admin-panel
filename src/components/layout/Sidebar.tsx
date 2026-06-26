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
  Zap,
  Phone,
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
    title: "Flash Sale",
    href: "/flash-sale",
    icon: Zap,
  },

  {
    title: "Locations",
    href: "/locations",
    icon: MapPin,
  },

  {
    title: "Support Links",
    href: "/support-links",
    icon: Phone,
},
];

export default function Sidebar() {
  const logout = () => {
    Cookies.remove("token");

    localStorage.removeItem(
      "token",
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="w-[260px] h-screen bg-black text-white fixed left-0 top-0 flex flex-col justify-between p-5">

      {/* TOP */}
      <div>

        <h1 className="text-2xl font-bold mb-10">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-2">

          {menuItems.map(
            (item) => (
              <Link
                key={
                  item.title
                }
                href={
                  item.href
                }
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition-all"
              >
                <item.icon
                  size={20}
                />

                <span>
                  {
                    item.title
                  }
                </span>
              </Link>
            ),
          )}

        </div>

      </div>

      {/* BOTTOM */}
      <div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
        >
          <LogOut
            size={20}
          />

          <span>
            Logout
          </span>
        </button>

      </div>

    </div>
  );
}