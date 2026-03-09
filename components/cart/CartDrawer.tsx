"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { X, ShoppingBag } from "lucide-react";

import Link from "next/link";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 h-[100dvh] w-full sm:w-[420px]
            bg-black/98 backdrop-blur-3xl text-white
            z-[60] border-l border-white/5
            flex flex-col overflow-hidden
            shadow-[0_0_80px_rgba(0,0,0,1)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 220 }}
            role="dialog"
            aria-label="Cart Drawer"
          >
            {/* Header */}
            <div className="px-6 py-8 flex items-center justify-between border-b border-white/5 bg-black/20">
              <div className="space-y-1">
                <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-white">
                  Your Selection
                </h3>
                <p className="text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">
                  {items.length}{" "}
                  {items.length === 1 ? "Creation" : "Creations"}
                </p>
              </div>

              <div className="flex items-center gap-5">
                {items.length > 0 && (
                  <button
                    className="text-[8px] uppercase tracking-[0.3em] hover:text-white text-gray-600 transition-all duration-300 font-bold"
                    onClick={clear}
                  >
                    Reset
                  </button>
                )}

                <button
                  className="p-2 -mr-1 rounded-full hover:bg-white/5 transition-all duration-500 group"
                  aria-label="Close cart"
                  onClick={onClose}
                >
                  <X
                    size={18}
                    className="group-hover:rotate-90 transition-transform duration-700 text-gray-400 group-hover:text-white"
                  />
                </button>
              </div>
            </div>

            {/* Scrollable Items Section */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-40">
                  <ShoppingBag size={20} className="text-gray-500 font-light" />
                  <div className="text-center space-y-1.5">
                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold">
                      The Bag is Empty
                    </p>
                    <button
                      onClick={onClose}
                      className="text-[8px] uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors underline underline-offset-4"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-5 py-6 group first:pt-2"
                    >
                      <div className="relative w-16 h-20 overflow-hidden bg-neutral-900 flex-shrink-0 ring-1 ring-white/5">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-900/50">
                            <span className="text-[7px] uppercase tracking-widest text-gray-700">
                              KCB
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-[9px] uppercase tracking-[0.25em] font-bold leading-tight text-gray-300 truncate pr-4">
                            {item.name}
                          </h4>
                          <button
                            className="text-gray-700 hover:text-white transition-colors"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                          >
                            <X size={12} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.1em]">
                          <span className="text-gray-600">
                            Qty: {item.qty}
                          </span>
                          <span className="text-white tracking-tighter">
                            ₹
                            {(item.price * item.qty).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Section */}
            {items.length > 0 && (
              <div className="px-6 py-8 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-gray-600 font-bold">
                      Investment
                    </span>
                    <span className="text-base font-light tracking-tighter text-white">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="relative w-full group/checkout overflow-hidden block"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover/checkout:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                  <div className="relative border border-white/10 py-4.5 flex items-center justify-center gap-3 transition-colors duration-500 group-hover/checkout:text-black">
                    <span className="text-[9px] uppercase tracking-[0.6em] font-black">
                      Finalize Order
                    </span>
                  </div>
                </Link>

                <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white" />
                  <p className="text-[7px] uppercase tracking-[0.3em] font-medium whitespace-nowrap">
                    Khushi Chauhan Atelier
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white" />
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}