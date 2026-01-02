import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions";
import { Plus, Pencil, Trash2, Eye, Package, Search } from "lucide-react"; 

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
    <div className="space-y-6 p-8 bg-slate-50/50 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
          <p className="text-sm text-slate-500">Manage your product catalog and inventory.</p>
        </div>
        <Link
          href="/dashboard/products/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        
        {/* Optional: Search/Filter Bar could go here */}
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Category</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Price</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-3">
                        <Package className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                    <p className="text-slate-500 mt-1 mb-4">Get started by adding your first product.</p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="group transition-colors hover:bg-slate-50/60">
                    
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{product.name}</div>
                    </td>
                    
                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    
                    {/* Price */}
                    <td className="px-6 py-4 font-mono font-medium text-slate-700">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>
                    
                    {/* Stock Status */}
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                           <span className="text-slate-600 font-medium">{product.stock} in stock</span>
                        </div>
                      ) : (
                         <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 border border-red-100">
                            Out of Stock
                         </span>
                      )}
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/dashboard/products/${product.id}`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <button
                            type="submit"
                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
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