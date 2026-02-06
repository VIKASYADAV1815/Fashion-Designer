"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check, ArrowLeft } from "lucide-react";

type Mode = "login" | "signup";

function LuxeInput({
  label,
  type,
  id,
  delay = 0,
}: {
  label: string;
  type: string;
  id: string;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative"
    >
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 pointer-events-none z-10",
          focused || value ? "top-2 text-[#C5A059] text-[9px]" : "top-4 text-stone-400"
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full rounded-lg border bg-stone-50/50 px-4 pt-7 pb-2.5 text-sm text-stone-900 outline-none transition-all duration-300",
          "border-stone-200 hover:border-stone-300 focus:border-[#C5A059] focus:bg-white focus:ring-1 focus:ring-[#C5A059]",
          "placeholder-transparent"
        )}
      />
    </motion.div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative w-full overflow-hidden rounded-lg bg-stone-900 px-6 py-4 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
      <span className="relative z-10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em]">
        {children}
      </span>
      <div className="absolute inset-0 bg-[#C5A059] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

function Checkbox({ id, label }: { id: string; label: string }) {
  const [checked, setChecked] = useState(false);
  
  return (
    <label className="flex items-center gap-3 cursor-pointer group" htmlFor={id}>
      <div className="relative">
        <input 
          type="checkbox" 
          id={id} 
          className="peer sr-only" 
          checked={checked} 
          onChange={(e) => setChecked(e.target.checked)} 
        />
        <div className={cn(
          "h-4 w-4 border rounded transition-all duration-300 flex items-center justify-center",
          checked ? "bg-stone-900 border-stone-900" : "border-stone-300 bg-white group-hover:border-[#C5A059]"
        )}>
          <Check className={cn("w-3 h-3 text-white transition-transform duration-200", checked ? "scale-100" : "scale-0")} />
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-stone-500 select-none group-hover:text-stone-800 transition-colors">
        {label}
      </span>
    </label>
  );
}

export default function LoginSignup() {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <main className="min-h-[100dvh] w-full bg-[#FAF9F6] flex items-center justify-center p-4 pt-28 md:p-8 md:pt-36">
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-fit md:min-h-[700px]">
        
        {/* Left Panel - Dark Side */}
        <div className="relative w-full md:w-[40%] bg-stone-900 text-white flex flex-col p-6 md:p-12 overflow-hidden shrink-0">
          {/* Abstract Pattern Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#C5A059] blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-stone-700 blur-[100px]" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between gap-6 md:gap-0">
            <div className="flex justify-between items-start">
              <Link 
                href="/" 
                className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                <span>Return</span>
              </Link>
            </div>

            <div className="flex flex-col items-center text-center my-10 md:my-0">
              <div className="relative h-24 w-40 mb-6 transform transition-transform duration-500 hover:scale-105">
                <Image 
                  src="/images/logo.png" 
                  alt="Khushi Chauhan Designer Studio" 
                  fill 
                  className="object-contain" 
                  priority 
                />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059]">Designer Studio</p>
                <div className="w-8 h-px bg-stone-700 mx-auto" />
                <p className="text-[9px] text-stone-500 font-light tracking-widest">Est. 2024</p>
              </div>
            </div>

            <div className="flex justify-center gap-12">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="group relative py-2"
                >
                  <span className={cn(
                    "text-[10px] uppercase tracking-[0.3em] transition-colors duration-300",
                    mode === m ? "text-[#C5A059]" : "text-stone-500 group-hover:text-stone-300"
                  )}>
                    {m}
                  </span>
                  <span className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[#C5A059] transition-all duration-300 ease-out",
                    mode === m ? "w-full" : "w-0 group-hover:w-1/2"
                  )} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Form Side */}
        <div className="w-full md:w-[60%] bg-white p-8 md:p-16 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md mx-auto"
            >
              <div className="mb-10 text-center md:text-left">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-serif text-stone-900 mb-3"
                >
                  {mode === "login" ? "Welcome Back" : "Join the Studio"}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[11px] uppercase tracking-[0.2em] text-stone-500 leading-relaxed"
                >
                  {mode === "login"
                    ? "Access your curated wishlist and orders"
                    : "Begin your bespoke fashion journey today"}
                </motion.p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {mode === "signup" && (
                  <LuxeInput id="name" label="Full Name" type="text" delay={0.1} />
                )}
                <LuxeInput id="email" label="Email Address" type="email" delay={0.2} />
                <LuxeInput id="password" label="Password" type="password" delay={0.3} />

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between pt-2"
                >
                  <Checkbox id="remember" label="Remember me" />
                  {mode === "login" && (
                    <button className="text-[9px] uppercase tracking-widest text-[#C5A059] hover:text-stone-900 transition-colors">
                      Forgot password?
                    </button>
                  )}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <PrimaryButton>{mode === "login" ? "Sign In" : "Create Account"}</PrimaryButton>
                </motion.div>
              </form>
              
              {/* Optional Footer Text */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <p className="text-[10px] text-stone-400">
                  By continuing, you agree to our <a href="#" className="underline hover:text-stone-900">Terms</a> and <a href="#" className="underline hover:text-stone-900">Privacy Policy</a>.
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
