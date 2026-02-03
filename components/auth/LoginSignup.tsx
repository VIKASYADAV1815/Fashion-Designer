"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BridalLogin() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <section className="min-h-screen bg-[#fffcf9] text-stone-900 pt-16 pb-24 relative overflow-hidden">
      {/* 1. REDESIGNED BACK BUTTON: The "Floating Minimalist" Style */}
      <div className="fixed top-12 left-6 md:left-12 z-50">
        <Link href="/" className="group flex flex-col items-center gap-4">
          <div className="relative">
             {/* Circular hover ring */}
            <div className="w-10 h-10 rounded-full border border-stone-200 group-hover:border-amber-700 group-hover:scale-110 transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
          {/* Vertical text for a unique "Editorial" look */}
          <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] uppercase tracking-[0.4em] text-stone-400 group-hover:text-stone-900 transition-colors font-bold">
            Return to Studio
          </span>
        </Link>
      </div>

      {/* Delicate Silk Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]" />
      
      {/* Soft Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-50/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <Link href="/" className="text-4xl md:text-5xl font-serif tracking-widest uppercase text-stone-800">
            Maison <span className="italic text-amber-700">Luxe</span>
          </Link>
          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">
            The Bridal & Couture House
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Aesthetic Bridal Imagery */}
          <div className="hidden lg:block relative group">
            <div className="aspect-[4/5] overflow-hidden border border-stone-200 p-3 bg-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=800" 
                alt="Lehenga Detail" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white p-8 max-w-xs shadow-xl">
              <p className="font-serif italic text-xl">"Every stitch tells a story of heritage and grace."</p>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/60 backdrop-blur-md border border-stone-100 p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
              
              <div className="flex justify-center gap-8 mb-10">
                {["login", "signup"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setMode(t as any)}
                    className={cn(
                      "text-xs uppercase tracking-[0.3em] font-bold transition-all pb-2 relative",
                      mode === t ? "text-amber-800" : "text-stone-300"
                    )}
                  >
                    {t}
                    {mode === t && (
                      <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-700" />
                    )}
                  </button>
                ))}
              </div>

              <form className="space-y-6">
                <AnimatePresence mode="wait">
                  {mode === "signup" && (
                    <motion.div 
                      key="name"
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <label className="text-[9px] uppercase font-black tracking-widest text-stone-400 mb-2 block">Full Name</label>
                      <input
                        type="text"
                        className="w-full border-b border-stone-200 bg-transparent py-3 outline-none focus:border-amber-700 transition-colors placeholder:text-stone-300 italic"
                        placeholder="Enter your name"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="text-[9px] uppercase font-black tracking-widest text-stone-400 mb-2 block">Email Contact</label>
                  <input
                    type="email"
                    className="w-full border-b border-stone-200 bg-transparent py-3 outline-none focus:border-amber-700 transition-colors placeholder:text-stone-300 italic"
                    placeholder="example@boutique.com"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase font-black tracking-widest text-stone-400 mb-2 block">Secure Password</label>
                  <input
                    type="password"
                    className="w-full border-b border-stone-200 bg-transparent py-3 outline-none focus:border-amber-700 transition-colors placeholder:text-stone-300"
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-6">
                  <button className="w-full py-5 bg-stone-900 text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-amber-800 transition-colors duration-500 shadow-lg active:scale-[0.98]">
                    {mode === "login" ? "Enter Boutique" : "Join the Maison"}
                  </button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-stone-100 flex justify-between items-center text-[9px]">
                <span className="uppercase tracking-widest text-stone-400 font-medium">Bespoke Support</span>
                <button className="uppercase tracking-widest font-bold border-b border-stone-900 hover:text-amber-700 hover:border-amber-700 transition-colors">
                  Contact Concierge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
