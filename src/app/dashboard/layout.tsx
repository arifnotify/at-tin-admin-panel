import Navbar from "@/src/components/layout/Navbar";
import { Sidebar } from "lucide-react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-[250px] w-full bg-gray-100 min-h-screen">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}