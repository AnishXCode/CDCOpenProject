import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Tag, 
  Package, 
  Layers, 
  IndianRupee, 
  Calendar, 
  Barcode 
} from "lucide-react";

export default async function ViewProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-8 bg-slate-50/50 min-h-screen">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/products"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-900" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Product Details
            </h1>
            <p className="text-sm text-slate-500">
              Viewing information for <span className="font-mono text-xs font-medium bg-slate-100 px-1.5 py-0.5 rounded">{product.id}</span>
            </p>
          </div>
        </div>

        <Link
          href={`/dashboard/products/${product.id}/edit`}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800"
        >
          Edit Product
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
              <Layers className="h-4 w-4 text-slate-500" /> 
              Product Images
            </h3>
            
            {product.images && product.images.length > 0 ? (
              <div className="space-y-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <Image 
                      src={img} 
                      alt={`${product.name} - View ${idx + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-square w-full rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <Layers className="mx-auto h-8 w-8 opacity-50 mb-2" />
                  <span className="text-sm">No Images</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-100">
                    <Tag className="h-3 w-3" />
                    {product.category?.name || "Uncategorized"}
                  </span>
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 border border-green-100">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 border border-red-100">
                      Out of Stock
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{product.name}</h2>
              </div>
              <div className="text-left md:text-right">
                <p className="text-3xl font-bold text-slate-900">₹{product.price.toLocaleString("en-IN")}</p>
                <p className="text-sm text-slate-500">per unit</p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Description</h3>
              <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-600">
                {product.description || "No description provided for this product."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Current Stock</p>
                  <p className="text-xl font-bold text-slate-900">{product.stock} units</p>
                </div>
              </div>
            </div>

            {/* Created At Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Date Added</p>
                  <p className="text-xl font-bold text-slate-900">
                    {new Date(product.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Info Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <IndianRupee className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Base Price</p>
                  <p className="text-xl font-bold text-slate-900">₹{product.price}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                  <Barcode className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">System ID</p>
                  <p className="text-sm font-mono font-bold text-slate-900 truncate max-w-[120px]">
                    {product.id}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}