import Link from "next/link";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { auth } from "@/auth"; // Import auth
import { handleLogout } from "@/lib/actions";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); 

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            MY STORE
          </Link>
          
          <div className="flex items-center gap-4">
            {session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN' ? (
              <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1">
                <User className="h-4 w-4" />
                Admin Panel
              </Link>
            ) : null}

            {session?.user ? (
              <>
                <Link href="/orders" className="text-sm font-medium hover:text-blue-600">
                  My Orders
                </Link>
                <form action={handleLogout}>
                    <button className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </form>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium hover:text-blue-600">
                  Log In
                </Link>
                <Link href="/register" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Register
                </Link>
              </div>
            )}

            <Link href="/cart" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
              <ShoppingBag className="h-4 w-4" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}