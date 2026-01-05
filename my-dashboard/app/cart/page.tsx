"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag, CreditCard, Loader2, ShieldCheck, Truck } from "lucide-react";
import { checkoutCart } from "@/lib/actions"; 
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleCheckout() {
    startTransition(async () => {
      const result = await checkoutCart(items);
      if (result.success) {
        clearCart();
        router.push("/orders"); 
      } else {
        alert("Checkout failed. Please try again.");
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-violet-100">
          <ShoppingBag className="h-10 w-10 text-violet-500" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Your cart is empty</h2>
        <p className="mt-3 max-w-sm text-gray-500">Looks like you haven't found anything yet. We have lots of great products waiting for you.</p>
        <Link
          href="/"
          className="mt-8 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-95"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans text-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Shopping Cart</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">
                You have <span className="font-bold text-violet-600">{items.length} items</span> in your cart
            </p>
          </div>
          <button 
            onClick={clearCart}
            disabled={isPending}
            className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-700 hover:underline disabled:opacity-50"
          >
            Clear All
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex gap-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-gray-300" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm font-medium text-gray-500">
                        Price: <span className="text-gray-900">₹{item.price.toLocaleString("en-IN")}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isPending}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                      title="Remove Item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between">
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center rounded-xl border border-gray-200 bg-white shadow-sm">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isPending}
                            className="p-2 text-gray-500 hover:text-violet-600 disabled:opacity-50 active:scale-90 transition-transform"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isPending}
                            className="p-2 text-gray-500 hover:text-violet-600 disabled:opacity-50 active:scale-90 transition-transform"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total</p>
                        <p className="text-xl font-bold text-violet-600">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Shipping Estimate</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <Truck className="h-3 w-3" /> Free
                  </span>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-gray-900">Total Due</span>
                    <span className="text-2xl font-extrabold text-violet-600">₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400 text-right">
                    Taxes calculated at checkout
                  </p>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isPending}
                className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Checkout <CreditCard className="h-5 w-5" />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Secure SSL Encryption</span>
              </div>
              
              <Link 
                href="/"
                className={`mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}