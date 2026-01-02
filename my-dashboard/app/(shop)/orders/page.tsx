import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <div className="container mx-auto px-4 py-12">

        <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {params.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
          <span className="text-xl">🎉</span>
          <strong>Success!</strong> Your order has been placed successfully.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Order ID</p>
                  <p className="font-mono text-xs text-gray-700 break-all">{order.id}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Total Amount</p>
                  <p className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                    <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                       {item.product.images[0] ? (
                         <img 
                           src={item.product.images[0]} 
                           alt={item.product.name}
                           className="w-full h-full object-cover"
                         />
                       ) : (
                         <div className="flex h-full items-center justify-center text-xs text-gray-400">No Img</div>
                       )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-6 py-2">
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Status: {order.status}
                 </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}