"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";

import Cookies from "js-cookie";

const menus = [
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
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },

  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const logout = () => {
    Cookies.remove("token");

    window.location.href =
      "/login";
  };

  return (
    <div className="w-[250px] h-screen bg-black text-white fixed left-0 top-0 p-5 flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-bold mb-10">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-3">

          {menus.map((menu) => {
            const active =
              pathname === menu.href;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition ${
                  active
                    ? "bg-white text-black"
                    : "hover:bg-gray-800"
                }`}
              >
                <menu.icon size={20} />

                <span>
                  {menu.title}
                </span>
              </Link>
            );
          })}

        </div>

      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500"
      >
        <LogOut size={20} />

        Logout
      </button>

    </div>
  );
}