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
  Barcode,
  Pencil,
  Box
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
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
                href="/dashboard/products"
                className="mb-6 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-gray-200 transition-all hover:text-violet-600 hover:ring-violet-200"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Inventory
            </Link>
            
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-sm border border-gray-100">
                    <Box className="h-7 w-7" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Product Details
                    </h1>
                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-500">
                        <span>UUID:</span>
                        <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                            {product.id}
                        </span>
                    </div>
                </div>
            </div>
          </div>

          <Link
            href={`/dashboard/products/${product.id}/edit`}
            className="group flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95"
          >
            <Pencil className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Edit Product
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                <Layers className="h-4 w-4" /> 
                Visuals
              </h3>
              
              {product.images && product.images.length > 0 ? (
                <div className="space-y-4">
                  {product.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                      <Image 
                        src={img} 
                        alt={`${product.name} - View ${idx + 1}`} 
                        fill 
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                    <div className="rounded-full bg-gray-100 p-4 mb-3">
                        <Layers className="h-8 w-8 text-gray-300" />
                    </div>
                    <span className="text-sm font-medium">No Images Uploaded</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600">
                      <Tag className="h-3 w-3" />
                      {product.category?.name || "Uncategorized"}
                    </span>
                    
                    {product.stock > 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 leading-tight">{product.name}</h2>
                </div>
                
                <div className="text-left md:text-right">
                  <p className="text-4xl font-extrabold text-violet-600">₹{product.price.toLocaleString("en-IN")}</p>
                  <p className="text-sm font-medium text-gray-400">Unit Price</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">About this item</h3>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-600">
                  {product.description || "No description provided for this product."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Inventory</p>
                    <p className="text-xl font-bold text-gray-900">{product.stock} units</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Created On</p>
                    <p className="text-xl font-bold text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <IndianRupee className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Listing Price</p>
                    <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
                    <Barcode className="h-6 w-6" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">System ID</p>
                    <p className="text-sm font-mono font-bold text-gray-900 truncate" title={product.id}>
                      {product.id}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}