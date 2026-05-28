"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full h-[70px] bg-white border-b flex items-center justify-between px-6">

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl w-[300px]">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>

        </button>

        {/* ADMIN */}
        <div className="flex items-center gap-3">

          <div className="w-[40px] h-[40px] rounded-full bg-black text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <h1 className="font-semibold">
              Admin
            </h1>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}