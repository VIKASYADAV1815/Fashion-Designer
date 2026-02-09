"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1, image: item.image || p.image } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear, open, openCart, closeCart }),
    [items, open]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
