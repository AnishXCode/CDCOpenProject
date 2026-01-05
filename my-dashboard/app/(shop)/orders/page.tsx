import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Package, 
  ShoppingBag, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Truck,
  Receipt,
  Sparkles
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED": 
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="h-3.5 w-3.5" /> Delivered
          </span>
        );
      case "CANCELLED": 
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-100">
            <XCircle className="h-3.5 w-3.5" /> Cancelled
          </span>
        );
      case "SHIPPED":   
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-100">
            <Truck className="h-3.5 w-3.5" /> On the way
          </span>
        );
      default: 
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 border border-amber-100">
            <Clock className="h-3.5 w-3.5" /> Processing
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans text-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="mb-8">
            <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-violet-600"
            >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-violet-200">
                <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Shop
            </Link>
        </div>
        
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Your Orders</h1>
            <p className="mt-2 text-sm font-medium text-gray-500">
                Track your shipment history and download receipts.
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm border border-gray-100">
                <Receipt className="h-4 w-4 text-violet-500" />
                <span className="text-sm font-bold text-gray-900">{orders.length} Orders</span>
            </div>
          </div>
        </div>

        {params.success && (
          <div className="mb-10 overflow-hidden rounded-3xl bg-white shadow-lg shadow-emerald-100 border border-emerald-100 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="relative p-6">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500" />
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Order Confirmed!</h3>
                        <p className="text-sm text-gray-500">
                            Thank you for your purchase. We've sent a confirmation email to <span className="font-medium text-gray-900">{session.user.email}</span>.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50">
              <Package className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No orders found</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              It looks like you haven&apos;t placed any orders yet. Check out our latest collection.
            </p>
            <Link
              href="/"
              className="mt-8 rounded-xl bg-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
                <div key={order.id} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                  
                  <div className="border-b border-gray-50 bg-gray-50/30 p-6">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-x-8 gap-y-4">
                        
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order ID</span>
                          <span className="font-mono text-sm font-bold text-gray-900">
                            #{order.id.slice(-6).toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Date Placed</span>
                          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Amount</span>
                          <span className="text-sm font-extrabold text-gray-900">
                            ₹{order.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="divide-y divide-gray-50">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                          
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                            {item.product.images[0] ? (
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-gray-300">
                                <ShoppingBag className="h-8 w-8 opacity-20" />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col justify-center">
                            <h4 className="font-bold text-gray-900">{item.product.name}</h4>
                            <p className="mt-1 text-sm text-gray-500">
                                <span className="font-medium text-gray-900">{item.quantity}</span> × ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end justify-center">
                             <p className="text-sm font-bold text-gray-900">
                               ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                             </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-3 flex justify-end">
                      <button className="text-xs font-bold text-violet-600 hover:text-violet-700">View Invoice</button>
                  </div>
                  
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}