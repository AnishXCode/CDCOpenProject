"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aethelnova-cart");
    if (saved) setItems(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("aethelnova-cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (newItem: CartItem) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === newItem.id);
      if (existing) {
        return current.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};