import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Tag, Package, Layers, IndianRupee } from "lucide-react";

export default async function ViewProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-6">
        <Link
          href="/dashboard/products"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-8 border-b bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <Tag className="h-4 w-4" />
                <span>{product.category?.name || "Uncategorized"}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">₹{product.price.toFixed(2)}</p>
              <span
                className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  product.stock > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Layers className="h-4 w-4" /> Product Images
            </h3>
            {product.images && product.images.length > 0 ? (
              <div className="space-y-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square w-full rounded-lg overflow-hidden border">
                    <Image 
                      src={img} 
                      alt={`${product.name} - ${idx + 1}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-square w-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                No Images
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-6">
              <div>
                <span className="text-sm text-gray-500 block mb-1">Stock Quantity</span>
                <div className="flex items-center gap-2 font-medium">
                  <Package className="h-4 w-4 text-gray-400" />
                  {product.stock} units
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500 block mb-1">Price per unit</span>
                <div className="flex items-center gap-2 font-medium">
                  <IndianRupee className="h-4 w-4 text-gray-400" />
                  {product.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}