"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "./CartProvider";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-[90vw] sm:w-[420px] bg-black text-white z-50 border-l border-white/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            role="dialog"
            aria-label="Cart Drawer"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <h3 className="text-xs uppercase tracking-[0.25em]">Your Cart</h3>
              <button className="text-xs uppercase tracking-[0.25em] hover:opacity-70" onClick={clear}>Clear</button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-140px)]">
              {items.length === 0 && <p className="text-sm text-gray-400">Your cart is empty.</p>}
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {item.image && (
                    <div className="relative w-16 h-20 overflow-hidden bg-white">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.25em]">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <div className="text-xs">${(item.price * item.qty).toLocaleString()}</div>
                  <button className="text-xs underline" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-gray-400">Total</span>
                <span className="text-sm">${total.toLocaleString()}</span>
              </div>
              <button className="mt-4 w-full bg-white text-black py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gray-200">
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
