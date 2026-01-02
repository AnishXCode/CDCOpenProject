"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag, CreditCard, Loader2 } from "lucide-react";
import { checkoutCart } from "@/lib/actions"; // Import the server action
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleCheckout() {
    startTransition(async () => {
      // 1. Call the Server Action
      const result = await checkoutCart(items);

      // 2. If successful, clear cart and redirect
      if (result.success) {
        clearCart();
        router.push("/orders"); // Or a success page
      } else {
        alert("Checkout failed. Please try again.");
      }
    });
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-slate-100 p-6">
          <ShoppingBag className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="mt-2 text-slate-500">Looks like you haven't added anything yet.</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <button 
            onClick={clearCart}
            disabled={isPending}
            className="text-sm font-medium text-red-500 hover:text-red-700 hover:underline disabled:opacity-50"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                {/* Image */}
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isPending}
                      className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={isPending}
                        className="p-1 hover:text-blue-600 disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isPending}
                        className="p-1 hover:text-blue-600 disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="ml-auto font-bold text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold text-slate-900">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 text-right">
                    Including all taxes
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                disabled={isPending}
                className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Checkout
                  </>
                )}
              </button>
              
              <Link 
                href="/"
                className={`mt-4 flex justify-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
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