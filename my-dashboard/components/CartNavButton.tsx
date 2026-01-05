"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function CartNavButton() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-24 rounded-xl bg-gray-100 animate-pulse" />
    );
  }

  return (
    <Link 
      href="/cart" 
      className="group relative flex items-center gap-2.5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-violet-300 active:scale-95"
    >
      <ShoppingBag className="h-4 w-4 transition-transform duration-300" />
      <span>Cart</span>
      
      {cartCount > 0 && (
        <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-extrabold text-violet-600 shadow-sm">
          {cartCount}
        </span>
      )}
    </Link>
  );
}