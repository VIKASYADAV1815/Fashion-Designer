"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check, ArrowLeft, Eye, EyeOff, ChevronRight } from "lucide-react";

type Mode = "login" | "signup";

export default function LoginSignup() {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <main className="min-h-screen w-full bg-[#FAF9F6] flex items-start justify-center p-4 md:p-8 pt-32 md:pt-36 font-sans selection:bg-[#C5A059]/20">
      
      {/* Main Card */}
      <div className="w-full max-w-250 flex flex-col md:flex-row min-h-162.5 bg-white rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-stone-100 overflow-hidden">
        
        {/* LEFT PANEL */}
        <div className="w-full md:w-[45%] bg-stone-900 p-8 md:p-12 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C5A059] opacity-[0.03] blur-[120px]" />
          </div>

          {/* TOP NAVIGATION & MODE TOGGLE */}
          <div className="relative z-10 flex justify-between items-center">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.4em] text-stone-500 hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Store</span>
            </Link>

            <div className="flex gap-6">
              {(["login", "signup"] as const).map((m) => (
                <button 
                  key={m}
                  onClick={() => setMode(m)}
                  className="group relative pb-1"
                >
                  <span className={cn(
                    "text-[9px] uppercase tracking-[0.2em] transition-all duration-500",
                    mode === m ? "text-[#C5A059] font-bold" : "text-stone-600 group-hover:text-stone-400"
                  )}>
                    {m === "login" ? "Sign In" : "Sign Up"}
                  </span>
                  {mode === m && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute bottom-0 left-0 w-full h-px bg-[#C5A059]" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CENTERED LOGO & DESCRIPTION */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-24 w-48 mb-6"
            >
              <Image 
                src="/images/logo.png" 
                alt="Khushi Chauhan" 
                fill 
                className="object-contain" 
                priority 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="max-w-65 space-y-4"
            >
              <div className="h-px w-8 bg-stone-800 mx-auto" />
              <p className="text-[10px] leading-relaxed text-stone-400 font-light tracking-[0.05em] uppercase">
                A designer studio dedicated to the art of bespoke tailoring and contemporary silhouettes. We craft pieces that bridge traditional heritage and modern minimalism.
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 pt-8 flex justify-center opacity-40">
            <p className="text-[7px] uppercase tracking-[0.6em] text-stone-500 font-bold">Khushi Chauhan Designer Studio</p>
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="flex-1 bg-white p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[320px] mx-auto"
            >
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-serif text-stone-900 tracking-tight">
                  {mode === "login" ? "Sign In" : "Create Account"}
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-3">
                  {mode === "login" ? "Welcome back to your account" : "Join our designer community"}
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {mode === "signup" && (
                  <LuxeInput id="name" label="Full Name" type="text" />
                )}
                <LuxeInput id="email" label="Email" type="email" />
                <LuxeInput id="password" label="Password" type="password" />
                
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="h-3 w-3 border border-stone-200 rounded-sm peer-checked:bg-stone-900 peer-checked:border-stone-900 transition-all flex items-center justify-center">
                      <Check className="w-2 h-2 text-white stroke-3" />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 group-hover:text-stone-800">Remember Me</span>
                  </label>
                  {mode === "login" && (
                    <button className="text-[9px] uppercase tracking-widest text-[#C5A059] hover:text-stone-900 font-bold">
                      Forgot Password?
                    </button>
                  )}
                </div>

                <div className="pt-6">
                  <button className="group relative w-full overflow-hidden rounded-lg bg-stone-900 px-6 py-4 text-white transition-all duration-500">
                    <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.5em]">
                      {mode === "login" ? "Sign In" : "Register"}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-[#C5A059] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </button>
                </div>
              </form>

              <div className="mt-12 text-center">
                <p className="text-[7px] text-stone-300 uppercase tracking-[0.4em]">
                  Secure Checkout & Data Protection
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function LuxeInput({ label, type, id }: { label: string; type: string; id: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 pointer-events-none z-10",
          focused || value ? "top-2 text-[#C5A059] font-bold" : "top-4 text-stone-400"
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type={isPassword && reveal ? "text" : type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={type === "email" ? "email" : "current-password"}
        className={cn(
          "w-full rounded-lg border bg-stone-50/20 px-4 pt-7 pb-3 text-[14px] text-stone-900 outline-none transition-all duration-300",
          "border-stone-100 hover:border-stone-200 focus:border-[#C5A059] focus:bg-white focus:ring-4 focus:ring-[#C5A059]/5"
        )}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setReveal(!reveal)}
          className="absolute right-4 bottom-2 text-stone-300 hover:text-stone-600 transition-colors"
          aria-label={reveal ? "Hide password" : "Show password"}
        >
          {reveal ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
      )}
    </div>
  );
}