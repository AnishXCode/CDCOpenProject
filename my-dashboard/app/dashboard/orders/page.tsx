import { prisma } from "@/lib/prisma";
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ShoppingBag, 
  Truck,
  Calendar,
  CreditCard,
  User
} from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Completed
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
            <Truck className="h-3.5 w-3.5" />
            Shipped
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
            <XCircle className="h-3.5 w-3.5" />
            Cancelled
          </span>
        );
      default: 
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
            <Clock className="h-3.5 w-3.5" />
            Processing
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Order History
            </h1>
            <p className="mt-2 text-sm font-medium text-gray-500">
                Track status and view details of customer transactions.
            </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm border border-gray-100">
            <span className="text-sm font-medium text-gray-500">Total Orders:</span>
            <span className="text-lg font-bold text-violet-600">{orders.length}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50/50">
              <tr className="border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Order Ref</th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Customer</th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Timeline</th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Fulfillment</th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Cart Summary</th>
                <th className="px-8 py-5 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                        <ShoppingBag className="h-8 w-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
                    <p className="text-gray-400 mt-1">Transactions will appear here once the store goes live.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="group transition-all hover:bg-gray-50/50">
                    
                    <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-1 rounded-md border border-violet-100">
                                #{order.id.slice(-6).toUpperCase()}
                            </span>
                        </div>
                    </td>
                    
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 text-xs">{order.customerEmail.split('@')[0]}</span>
                            <span className="text-[10px] text-gray-400">{order.customerEmail}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-500">
                        <div className="flex items-center gap-2 text-xs font-medium">
                            <Calendar className="h-3.5 w-3.5 text-gray-300" />
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                day: '2-digit', month: 'short', year: 'numeric'
                            })}
                        </div>
                    </td>

                    <td className="px-6 py-5">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        {order.items.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex items-center gap-2 text-xs text-gray-600">
                            <Package className="h-3 w-3 text-gray-300" />
                            <span className="font-medium text-gray-900">{item.quantity}x</span>
                            <span className="truncate max-w-[140px] text-gray-500">{item.product.name}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-[10px] font-bold text-violet-500 pl-5">
                            +{order.items.length - 2} more products
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 text-gray-900">
                            <CreditCard className="h-3.5 w-3.5 text-gray-300" />
                            <span className="font-bold text-sm">
                                ₹{order.total.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}