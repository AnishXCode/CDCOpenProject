"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check, Plus } from "lucide-react";
import { useState } from "react";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export function AddToCart({ product }: AddToCartProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleAdd}
        disabled={isAdded}
        className={`group relative w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-out active:scale-[0.98] ${
          isAdded
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 cursor-default"
            : "bg-violet-600 text-white shadow-xl shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300"
        }`}
      >
        {isAdded ? (
          <>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <Check className="h-4 w-4" />
            </div>
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5 transition-transform" />
            <span>Add to Cart</span>
            <span className="ml-1 opacity-80 font-medium text-base">
                | ₹{product.price.toLocaleString("en-IN")}
            </span>
          </>
        )}
      </button>
      
      <p className="text-[11px] font-medium text-center text-gray-400 uppercase tracking-wide">
        Instant processing & Fast Dispatch
      </p>
    </div>
  );
}