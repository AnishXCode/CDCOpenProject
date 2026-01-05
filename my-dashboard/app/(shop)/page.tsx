import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, Star, ArrowRight, Tag } from "lucide-react";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <div className="relative overflow-hidden bg-white pb-12 pt-16 shadow-sm lg:pb-16 lg:pt-24">
        <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-600 mb-6">
                New Arrivals 2026
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                Curated Quality for <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Every Lifestyle</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
                Discover our latest collection of premium products. Meticulously designed, ethically sourced, and built to perform.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-violet-100"
            >
              
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-600 shadow-sm backdrop-blur-sm">
                  <Tag className="h-3 w-3" /> New
                </div>

                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-300 bg-gray-50">
                    <ShoppingBag className="h-12 w-12 opacity-20" />
                    <span className="mt-2 text-xs font-medium uppercase tracking-wider opacity-40">No Image</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-400">4.9</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 transition-colors group-hover:text-violet-600">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2 h-10">
                    {product.description || "Experience premium quality with our latest addition."}
                  </p>
                </div>
                
                <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-4">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Price</p>
                    <p className="text-xl font-extrabold text-gray-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white group-hover:rotate-[-45deg]">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-gray-200 mb-6">
              <ShoppingBag className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Store is Empty</h3>
            <p className="mt-2 max-w-sm text-gray-500">We are currently restocking our shelves. Please check back later for new arrivals.</p>
          </div>
        )}
      </div>
    </div>
  );
}