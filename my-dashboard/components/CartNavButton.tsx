"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export function CartNavButton() {
  const { cartCount } = useCart();

  return (
    <Link 
      href="/cart" 
      className="group relative flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
    >
      <ShoppingBag className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
      <span>Cart</span>
      {cartCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
          {cartCount}
        </span>
      )}
    </Link>
  );
}