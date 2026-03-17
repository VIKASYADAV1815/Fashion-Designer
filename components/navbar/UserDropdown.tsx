"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, ShoppingBag, Settings, ChevronDown } from "lucide-react";

export default function UserDropdown() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };

    syncUserFromStorage();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleUserUpdated = () => {
      syncUserFromStorage();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("kc_user_updated", handleUserUpdated as EventListener);
    window.addEventListener("storage", handleUserUpdated as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("kc_user_updated", handleUserUpdated as EventListener);
      window.removeEventListener("storage", handleUserUpdated as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    window.dispatchEvent(new Event("kc_user_updated"));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
      >
        {user ? (
          <>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-stone-700 flex items-center justify-center text-sm font-bold ring-2 ring-white/10 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline text-xs font-medium tracking-wider">{user.name.split(' ')[0]}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </>
        ) : (
          <User size={22} strokeWidth={1.5} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-4 w-64 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {user ? (
              <div className="p-2">
                <div className="flex items-center gap-3 p-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center text-lg font-bold ring-2 ring-white/10">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="border-t border-white/10 my-1"></div>
                <Link href="/account/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 rounded-md transition-colors">
                  <ShoppingBag size={16} />
                  <span>My Orders</span>
                </Link>
                <div className="border-t border-white/10 my-1"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="p-4">
                <Link href="/account" onClick={() => setIsOpen(false)} className="block w-full text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
                  Login or Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
