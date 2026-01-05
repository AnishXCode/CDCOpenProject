import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions";
import { Plus, Pencil, Trash2, Eye, Package, Search, Tag, Layers } from "lucide-react"; 

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Inventory
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Manage your product catalog, prices, and stock levels.
          </p>
        </div>
        
        <Link
          href="/dashboard/products/create"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50">
              <tr className="border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Product Name</th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Category</th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Unit Price</th>
                <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">Availability</th>
                <th className="px-8 py-5 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-24 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                        <Package className="h-8 w-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Inventory is empty</h3>
                    <p className="text-gray-400 mt-1 mb-6">Start by adding your first item to the store.</p>
                    <Link
                      href="/dashboard/products/create"
                      className="text-sm font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                    >
                      Create Product &rarr;
                    </Link>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="group transition-all hover:bg-gray-50/50">
                    
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                            <Layers className="h-5 w-5" />
                        </div>
                        <span className="font-semibold text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        <Tag className="h-3 w-3 text-gray-400" />
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    
                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </td>
                    
                    <td className="px-6 py-5">
                      {product.stock > 0 ? (
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                           <span className="text-sm font-medium text-gray-600">{product.stock} Units</span>
                        </div>
                      ) : (
                         <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-100">
                            Out of Stock
                         </span>
                      )}
                    </td>
                    
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          className="rounded-lg border border-gray-200 p-2 text-gray-400 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="rounded-lg border border-gray-200 p-2 text-gray-400 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <button
                            type="submit"
                            className="rounded-lg border border-gray-200 p-2 text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
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