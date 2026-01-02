"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check } from "lucide-react";
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
    
    // Visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleAdd}
        disabled={isAdded}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
          isAdded
            ? "bg-green-600 text-white shadow-green-200"
            : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98]"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="h-5 w-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            Add to Cart - ₹{product.price.toLocaleString("en-IN")}
          </>
        )}
      </button>
      
      <p className="text-xs text-center text-slate-400">
        Free shipping on orders over ₹999
      </p>
    </div>
  );
}