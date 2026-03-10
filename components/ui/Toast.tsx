"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, ShoppingBag } from "lucide-react";

type ToastType = "success" | "error" | "info" | "cart";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  description?: string;
  productImage?: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, description?: string, productImage?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}

const ToastItem = ({ toast, onRemove, index }: { toast: Toast; onRemove: (id: string) => void, index: number }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Stacking logic for bottom-right:
  // index 0 is the newest (top of stack). 
  // Older toasts (index > 0) move down, scale down, and fade.
  const translateY = index * -12; // Slide upwards
  const scale = 1 - index * 0.04;
  const opacity = 1 - index * 0.15;

  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => onRemove(toast.id), 5000);
      return () => clearTimeout(timer);
    }
  }, [isPaused, onRemove, toast.id]);

  const config = {
    success: { icon: <CheckCircle2 size={16} strokeWidth={3} />, color: "text-emerald-400", glow: "bg-emerald-500/20", bar: "bg-emerald-400" },
    error: { icon: <AlertCircle size={16} strokeWidth={3} />, color: "text-rose-400", glow: "bg-rose-500/20", bar: "bg-rose-400" },
    info: { icon: <Info size={16} strokeWidth={3} />, color: "text-sky-400", glow: "bg-sky-500/20", bar: "bg-sky-400" },
    cart: { icon: <ShoppingBag size={16} strokeWidth={3} />, color: "text-white", glow: "bg-white/10", bar: "bg-white" },
  };

  const theme = config[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.8, filter: "blur(10px)" }}
      animate={{ 
        opacity, 
        y: translateY,
        x: 0,
        scale, 
        filter: "blur(0px)",
      }}
      exit={{ opacity: 0, scale: 0.7, x: 20, filter: "blur(10px)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="absolute bottom-0 right-0 w-full sm:w-[380px] pointer-events-auto group"
    >
      <div className="relative overflow-hidden bg-[#0A0A0A]/90 backdrop-blur-3xl rounded-[22px] p-4 border border-white/10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]">
        
        {/* Shimmer Effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        
        {/* Subtle radial glow */}
        <div className={`absolute -right-8 -bottom-8 w-24 h-24 blur-[30px] rounded-full pointer-events-none opacity-50 ${theme.glow}`} />

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {toast.type === 'cart' && toast.productImage ? (
              <div className="w-11 h-11 rounded-xl overflow-hidden ring-1 ring-white/20">
                <img src={toast.productImage} alt="product" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/5 ${theme.color}`}>
                {theme.icon}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-[13.5px] font-semibold text-white/95 tracking-tight leading-tight">
              {toast.message}
            </h4>
            {toast.description && (
              <p className="text-[12px] text-white/40 mt-0.5 font-medium line-clamp-1">
                {toast.description}
              </p>
            )}
          </div>

          <button 
            onClick={() => onRemove(toast.id)}
            className="p-1.5 rounded-lg text-white/10 group-hover:text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* The Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/[0.02]">
          {!isPaused && (
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className={`h-full ${theme.bar}`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success", description?: string, productImage?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    // Add new toasts to the START of the array to make them "top" of stack
    setToasts((prev) => [ { id, message, type, description, productImage }, ...prev]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      {/* Container: Locked to Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-[99999] w-[calc(100%-48px)] sm:w-[380px] pointer-events-none flex flex-col items-end">
        <div className="relative w-full h-0">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast, index) => (
              <ToastItem 
                key={toast.id} 
                toast={toast} 
                onRemove={removeToast} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}