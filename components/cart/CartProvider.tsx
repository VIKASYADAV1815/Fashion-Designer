"use client";

import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/Toast";

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
  updateQty: (id: string, delta: number) => void;
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const fetchCart = useCallback(async () => {
    const visitorToken = localStorage.getItem("visitor_token");
    if (!visitorToken) return;

    try {
      const response = await fetch(`${API_URL}/cart`, {
        headers: { "x-visitor-token": visitorToken },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.cart && data.cart.items) {
          setItems(data.cart.items.map((i: any) => ({ ...i, id: i._id, qty: i.quantity })));
        }
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, []);

  const syncCart = useCallback(async (cartItems: CartItem[]) => {
    const visitorToken = localStorage.getItem("visitor_token");
    if (!visitorToken) return;

    try {
      await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-visitor-token": visitorToken,
        },
        body: JSON.stringify({ 
          items: cartItems.map(i => ({ 
            name: i.name, 
            price: i.price, 
            quantity: i.qty, 
            image: i.image 
          })) 
        }),
      });
    } catch (error) {
      console.error("Failed to sync cart:", error);
      showToast("Failed to sync cart with server", "error");
    }
  }, [showToast]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (items.length > 0) {
      syncCart(items);
    }
  }, [items, syncCart]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1, image: item.image || p.image } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`Added to cart`, "success", item.name, item.image);
    setOpen(true);
  }, [showToast]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      });
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    const visitorToken = localStorage.getItem("visitor_token");
    if (visitorToken) {
      fetch(`${API_URL}/cart`, { 
        method: "DELETE", 
        headers: { "x-visitor-token": visitorToken } 
      });
    }
  }, []);

  const contextValue = useMemo(() => ({ 
    items, 
    addItem, 
    removeItem, 
    clear, 
    updateQty,
    open, 
    openCart: () => setOpen(true), 
    closeCart: () => setOpen(false) 
  }), [items, addItem, removeItem, clear, updateQty, open]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
