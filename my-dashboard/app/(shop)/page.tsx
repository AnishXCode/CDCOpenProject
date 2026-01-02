import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Latest Collection
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Explore our curated selection of premium products, designed for quality and performance.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                <div className="absolute top-3 left-3 z-10 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm backdrop-blur-sm">
                  New
                </div>

                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <ShoppingBag className="h-10 w-10 opacity-20" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-slate-900/0 transition-colors group-hover:bg-slate-900/5" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-slate-500">4.8 (120+ reviews)</span>
                  </div>


                  <p className="text-sm text-slate-500 line-clamp-2 mt-1 h-10">
                    {product.description || "Premium quality product."}
                  </p>
                </div>
                
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Price</p>
                    <p className="text-lg font-bold text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
              <ShoppingBag className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No products found</h3>
            <p className="mt-1 text-slate-500">Check back later for new arrivals.</p>
          </div>
        )}
      </div>
    </div>
  );
}