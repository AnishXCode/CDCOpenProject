import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Package, 
  ShoppingBag, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Truck 
} from "lucide-react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session?.user?.email) {
    return redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      customerEmail: session.user.email,
    },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Helper for Status Badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "COMPLETED": return { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle };
      case "CANCELLED": return { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle };
      case "SHIPPED":   return { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Truck };
      default:          return { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock }; // PENDING
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* 1. Header & Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Shop
          </Link>
        </div>
        
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
            <p className="mt-2 text-slate-500">View your order history and status.</p>
          </div>
        </div>

        {/* 2. Success Message (Conditional) */}
        {params.success && (
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Order Placed Successfully!</h3>
                <p className="text-sm text-green-700">Thank you for shopping with AethelNova. You will receive an email confirmation shortly.</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Orders List or Empty State */}
        {orders.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No orders yet</h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              It looks like you haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              const StatusIcon = statusStyle.icon;

              return (
                <div key={order.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                  
                  {/* Card Header */}
                  <div className="border-b border-slate-100 bg-slate-50/50 p-4 md:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div>
                          <p className="font-medium text-slate-500 text-xs uppercase tracking-wider">Order ID</p>
                          <p className="font-mono font-bold text-slate-700">#{order.id.slice(-6).toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-500 text-xs uppercase tracking-wider">Date Placed</p>
                          <div className="flex items-center gap-1.5 font-medium text-slate-900 mt-0.5">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-slate-500 text-xs uppercase tracking-wider">Total Amount</p>
                          <p className="font-bold text-slate-900 mt-0.5">₹{order.total.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusStyle.color}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Card Body (Items) */}
                  <div className="p-4 md:p-6 bg-white">
                    <div className="divide-y divide-slate-100">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                          {/* Item Image */}
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                            {item.product.images[0] ? (
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-slate-300">
                                <ShoppingBag className="h-6 w-6 opacity-30" />
                              </div>
                            )}
                          </div>

                          {/* Item Info */}
                          <div className="flex flex-1 flex-col justify-center">
                            <p className="font-semibold text-slate-900">{item.product.name}</p>
                            <p className="text-sm text-slate-500">
                              Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          
                          {/* Item Total */}
                          <div className="flex items-center text-right">
                             <p className="font-medium text-slate-900">
                               ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                             </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}