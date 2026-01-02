import { prisma } from "@/lib/prisma";
import { 
  Package, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ShoppingBag, 
  MoreHorizontal,
  Truck
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

  // Helper to determine status styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 border border-green-100">
            <CheckCircle className="h-3.5 w-3.5" />
            Completed
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-100">
            <Truck className="h-3.5 w-3.5" />
            Shipped
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 border border-red-100">
            <XCircle className="h-3.5 w-3.5" />
            Cancelled
          </span>
        );
      default: // PENDING
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-100">
            <Clock className="h-3.5 w-3.5" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 p-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">All Orders</h1>
        <p className="text-sm text-slate-500">Manage customer orders and track status.</p>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Order ID</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Customer</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Items</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-3">
                        <ShoppingBag className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No orders found</h3>
                    <p className="text-slate-500 mt-1">Orders will appear here once customers start buying.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="group transition-colors hover:bg-slate-50/60">
                    
                    {/* ID */}
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        #{order.id.slice(-6).toUpperCase()}
                      </span>
                    </td>
                    
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-xs font-bold text-blue-600">
                          {order.customerEmail.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900">{order.customerEmail}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: '2-digit', month: 'short'
                      })}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Items Summary */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {order.items.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <span className="font-medium text-slate-900">{item.quantity}x</span>
                            <span className="truncate max-w-[150px]">{item.product.name}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <span className="text-xs text-slate-400 font-medium pl-0.5">
                            +{order.items.length - 2} more items
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-slate-900">
                        ₹{order.total.toLocaleString("en-IN")}
                      </span>
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