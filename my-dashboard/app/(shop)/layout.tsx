import Link from "next/link";
import Image from "next/image";
import { LogOut, Package, ShieldCheck, Layers, User } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
               <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-cover" />
               <Layers className="h-6 w-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Aethel<span className="text-violet-600">Nova</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-8">
            
            {isAdmin && (
              <Link 
                href="/dashboard" 
                className="hidden md:flex items-center gap-2 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-bold text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Dashboard
              </Link>
            )}

            <div className="flex items-center gap-5">
              {session?.user ? (
                <div className="flex items-center gap-5 border-r border-gray-100 pr-5 mr-1">
                  <Link 
                    href="/orders" 
                    className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-violet-600"
                  >
                    <Package className="h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                  
                  <form action={handleLogout}>
                      <button 
                        className="group flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-red-500"
                        title="Sign Out"
                      >
                          <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                          <span className="hidden lg:inline">Sign Out</span>
                      </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center gap-4 border-r border-gray-100 pr-5 mr-1">
                  <Link 
                    href="/login" 
                    className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register" 
                    className="hidden md:flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              <CartNavButton />
            </div>

          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>
      
    </div>
  );
}