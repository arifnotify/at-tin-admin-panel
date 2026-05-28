import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";

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
      <div className="ml-[250px] w-full">

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