import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { placeOrder } from "@/lib/actions"; 
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Star, Package, Tag, CheckCircle2, RotateCcw } from "lucide-react";
import { AddToCart } from "@/components/AddToCart";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return notFound();

  async function buyNow(formData: FormData) {
    "use server";
    await placeOrder(product!.id, 1, product!.price);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans text-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="mb-8">
            <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-violet-600"
            >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-violet-200">
                <ArrowLeft className="h-4 w-4" />
            </div>
            Back to Collection
            </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          
          <div className="h-fit">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
         
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-600 shadow-sm backdrop-blur-md">
                <Tag className="h-3.5 w-3.5" />
                New Arrival
              </div>

              {product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105" 
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-gray-50 text-gray-300">
                  <Package className="h-24 w-24 opacity-20" />
                  <span className="mt-4 text-sm font-bold uppercase tracking-widest opacity-40">No Image</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    4.9 Rating
                 </div>
                 {product.stock > 0 ? (
                   <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                     <CheckCircle2 className="h-3 w-3" /> In Stock
                   </div>
                 ) : (
                    <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                        Out of Stock
                    </div>
                 )}
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <p className="text-4xl font-extrabold text-violet-600">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <div className="flex flex-col items-start">
                    <span className="text-lg font-medium text-gray-400 line-through decoration-gray-300">
                    ₹{(product.price * 1.2).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold uppercase text-emerald-500">20% Off Limited Time</span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-100" />

            <div className="prose prose-gray max-w-none">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Description</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-500">
                    {product.description || "This premium product features our signature design quality, ensuring durability and style for everyday use. Meticulously crafted to meet high standards."}
                </p>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/40">
                <AddToCart 
                    product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0]
                    }} 
                />
                
                <p className="mt-4 text-center text-xs font-medium text-gray-400">
                    Transaction secured by 256-bit SSL encryption.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Free Shipping</h4>
                  <p className="text-[10px] font-medium text-gray-500">On orders over ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Warranty</h4>
                  <p className="text-[10px] font-medium text-gray-500">1 Year Guarantee</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Easy Returns</h4>
                  <p className="text-[10px] font-medium text-gray-500">30 Day Policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Top Rated</h4>
                  <p className="text-[10px] font-medium text-gray-500">Trusted by thousands</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}