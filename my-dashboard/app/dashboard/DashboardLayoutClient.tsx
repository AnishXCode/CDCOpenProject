"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayoutClient({
  children,
  userRole
}: {
  children: React.ReactNode;
  userRole?: string;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden md:flex h-full shrink-0">
        <Sidebar userRole={userRole} />
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="relative flex h-full w-64 flex-col bg-slate-900 shadow-xl">
             <Sidebar onClose={() => setIsMobileOpen(false)} userRole={userRole} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b bg-white px-4 md:hidden">
          <button onClick={() => setIsMobileOpen(true)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-4 text-lg font-semibold">Dashboard</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}