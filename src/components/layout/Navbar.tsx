"use client";

export default function Navbar() {
  return (
    <div className="w-full h-[70px] bg-white shadow flex items-center justify-between px-6">

      <h1 className="text-xl font-semibold">
        Ecommerce Admin
      </h1>

      <div className="flex items-center gap-3">

        <div className="w-[40px] h-[40px] rounded-full bg-black text-white flex items-center justify-center">
          A
        </div>

      </div>

    </div>
  );
}