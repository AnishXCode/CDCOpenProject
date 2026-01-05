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
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Inventory", href: "/dashboard/products", icon: Package },
    { name: "Add Admins", href: "/dashboard/admins", icon: Users, requiredRole: "SUPER_ADMIN" },
    { name: "Configuration", href: "/dashboard/settings", icon: Settings },
  ];

  const visibleLinks = allLinks.filter(
    (link) => !link.requiredRole || link.requiredRole === userRole
  );

  return (
    <aside className="flex h-full w-72 flex-col border-r border-gray-100 bg-white text-gray-900 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      
      <div className="flex h-24 flex-col justify-center px-8">
        <span className="text-2xl font-bold tracking-tight text-gray-900">
          Aethel<span className="text-violet-600">Nova</span>
        </span>
        <p className="mt-1 text-xs font-medium text-gray-400">Admin Workspace</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav className="space-y-1.5">
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>
          
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-50 text-violet-700 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive ? "text-violet-600" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  {link.name}
                </div>
                {isActive && (
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2 border-t border-gray-100 p-4">
        
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Shop</span>
        </Link>

        <div className="mt-2 rounded-xl bg-gray-50 p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                        {userRole?.charAt(0) || 'U'}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700">Current User</span>
                        <span className="text-[10px] font-medium text-gray-400 capitalize">
                            {userRole?.replace('_', ' ').toLowerCase() || 'Guest'}
                        </span>
                    </div>
                </div>
                
                <form action={handleLogout}>
                    <button 
                        type="submit"
                        className="rounded-full p-2 text-gray-400 hover:bg-white hover:text-red-500 hover:shadow-sm transition-all"
                        title="Sign Out"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
      </div>
    </aside>
  );
}