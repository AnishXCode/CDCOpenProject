"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  ArrowLeft
} from "lucide-react";
import { handleLogout } from "@/lib/actions";

interface SidebarProps {
  userRole?: string;
  onClose?: () => void;
}

export function Sidebar({ userRole, onClose }: SidebarProps) {
  const pathname = usePathname();

  const allLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Products", href: "/dashboard/products", icon: Package },
    // Only show Admins link to Super Admins
    { name: "Admins", href: "/dashboard/admins", icon: Users, requiredRole: "SUPER_ADMIN" },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Filter links based on role
  const visibleLinks = allLinks.filter(
    (link) => !link.requiredRole || link.requiredRole === userRole
  );

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      
      {/* Sidebar Header */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <span className="text-xl font-bold tracking-tight text-white">
          Aethel<span className="text-blue-500">Nova</span>
        </span>
      </div>

      <div className="flex-1 flex flex-col p-4">
        
        {/* Back to Home Button */}
        <Link
          href="/"
          className="mb-6 flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Store
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="border-t border-slate-800 p-4">
        <form action={handleLogout}>
          <button 
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/20 hover:text-red-300"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}