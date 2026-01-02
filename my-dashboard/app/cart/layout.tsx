import Link from "next/link";
import Image from "next/image";
import { LogOut, Package, ShieldCheck } from "lucide-react";
import { auth } from "@/auth"; 
import { handleLogout } from "@/lib/actions";
import { CartNavButton } from "@/components/CartNavButton";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); 
  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN';

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. Modern Sticky Header with Blur */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all">
               <Image 
                 src="/logo.png" 
                 alt="AethelNova Logo" 
                 fill
                 className="object-cover"
               />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Aethel<span className="text-blue-600">Nova</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-6">
            
            {/* Admin Link (Only for Admins) */}
            {isAdmin && (
              <Link 
                href="/dashboard" 
                className="hidden md:flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Panel
              </Link>
            )}

            {/* User Actions */}
            <div className="flex items-center gap-4 border-l border-slate-200 pl-4 md:pl-6">
              {session?.user ? (
                <>
                  <Link 
                    href="/orders" 
                    className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                  
                  <form action={handleLogout}>
                      <button className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
                          <LogOut className="h-4 w-4" />
                          <span className="hidden md:inline">Logout</span>
                      </button>
                  </form>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    href="/login" 
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register" 
                    className="hidden md:flex items-center justify-center rounded-lg bg-white border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}

              <CartNavButton />
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
    </div>
  );
}