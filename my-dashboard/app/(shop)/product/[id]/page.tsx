import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { placeOrder } from "@/lib/actions"; 
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Star, CreditCard, Package } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm relative group">
              {product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-300">
                  <Package className="h-20 w-20 opacity-20" />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details */}
          <div className="space-y-8">
            
            {/* Header Info */}
            <div className="space-y-4 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  New Arrival
                </span>
                {product.stock > 0 && (
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                    In Stock
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                {product.name}
              </h1>

              {/* Mock Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-500 hover:text-blue-600 cursor-pointer underline decoration-slate-300 underline-offset-4">
                  128 Reviews
                </span>
              </div>
            </div>

            {/* Price & Description */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <span className="text-lg text-slate-400 line-through font-medium">
                  ₹{(product.price * 1.2).toLocaleString('en-IN')}
                </span>
              </div>
              
              <div className="prose prose-slate text-slate-600 leading-relaxed">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Action Area */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <AddToCart 
                    product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0]
                    }} 
                />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Free Delivery</h4>
                  <p className="text-xs text-slate-500">On all orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-lg bg-blue-50 p-2 text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Secure Payment</h4>
                  <p className="text-xs text-slate-500">100% protected payments</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}