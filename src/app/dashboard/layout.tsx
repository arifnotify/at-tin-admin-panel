import Navbar from "@/src/components/layout/Navbar";
import { Sidebar } from "lucide-react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 md:ml-[260px]">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}