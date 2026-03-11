"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

import { cn } from "@/lib/utils";

import OtpForm from "./OtpForm";

type Mode = "login" | "signup";

export default function LoginSignup() {
  const [mode, setMode] = useState<Mode>("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();
        if (!trimmedName) {
          throw new Error("Please enter your full name to continue.");
        }
        if (!trimmedEmail) {
          throw new Error("Please enter your email to continue.");
        }
        // This now only sends the OTP
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail, name: trimmedName }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to send OTP");

        showToast("OTP sent to your email!", "info");
        setShowOtpForm(true);
      } else {
        // Login
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "An error occurred");

        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("kc_user_updated"));
        showToast("Login successful!", "success");
        const nextFromSession =
          typeof window !== "undefined"
            ? window.sessionStorage.getItem("kc_last_path")
            : null;
        const nextFromQuery =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("next")
            : null;
        const next = nextFromQuery || nextFromSession || "/";
        router.push(next);
      }
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, otp }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to verify OTP");

      setShowOtpForm(false);
      setMode("login");
      showToast("Account created! Please sign in.", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center p-4 md:p-8 pt-24 md:pt-28 font-sans selection:bg-[#C5A059]/20">
      
      {/* Main Card */}
      <div className="w-full max-w-250 flex flex-col md:flex-row min-h-[550px] bg-white rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-stone-100 overflow-hidden">
        
        {/* LEFT PANEL */}
        <div className="w-full md:w-[45%] bg-stone-900 p-8 md:p-12 flex flex-col relative overflow-hidden order-2 md:order-1">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C5A059] opacity-[0.03] blur-[120px]" />
          </div>

          {/* TOP NAVIGATION */}
          <div className="relative z-10 flex justify-start items-center">
            {/* Back Link - Increased size and visibility */}
            <Link 
              href="/" 
              className="group inline-flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-[#C5A059] transition-colors font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Store</span>
            </Link>
          </div>

          {/* CENTERED LOGO & DESCRIPTION */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center py-12 md:py-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-32 w-64 mb-8"
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
              className="max-w-72 space-y-5"
            >
              <div className="h-px w-10 bg-stone-800 mx-auto" />
              <p className="text-[11px] leading-relaxed text-stone-300 font-light tracking-[0.05em] uppercase">
                A designer studio dedicated to the art of bespoke tailoring and contemporary silhouettes. We craft pieces that bridge traditional heritage and modern minimalism.
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 pt-8 flex justify-center opacity-50">
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Khushi Chauhan Designer Studio</p>
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="flex-1 bg-white p-6 md:p-12 lg:p-16 flex flex-col justify-center order-1 md:order-2">
          {showOtpForm ? (
            <AnimatePresence mode="wait">
              <OtpForm
                email={formData.email}
                name={formData.name}
                onVerify={handleOtpVerification}
                isLoading={isLoading}
              />
            </AnimatePresence>
          ) : (
            <div className="w-full max-w-[380px] mx-auto">
              {/* MODE TOGGLE - CENTERED & MORE VISIBLE */}
              <div className="flex justify-center mb-8">
                <div className="flex p-1 bg-stone-50 border border-stone-100 rounded-xl shadow-sm">
                  {(["login", "signup"] as const).map((m) => {
                    const isActive = mode === m;
                    return (
                      <button 
                        key={m}
                        onClick={() => setMode(m)}
                        className="group relative px-6 py-2 rounded-lg transition-colors min-w-[90px]"
                      >
                        {/* Framer Motion Sliding Pill */}
                        {isActive && (
                          <motion.div 
                            layoutId="activeTabPill" 
                            className="absolute inset-0 bg-white shadow-md border border-stone-100 rounded-lg" 
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}

                        {/* Text Label */}
                        <span className={cn(
                          "relative z-10 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
                          isActive ? "text-[#C5A059] font-black" : "text-stone-400 group-hover:text-stone-600 font-bold"
                        )}>
                          {m === "login" ? "Sign In" : "Sign Up"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === 'signup' ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 text-center">
                    <h2 className="text-3xl font-serif text-stone-900 tracking-tight">
                      {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-[11px] uppercase tracking-widest text-stone-400 mt-2 font-medium">
                      {mode === "login" ? "Sign in to access your orders" : "Join our exclusive designer community"}
                    </p>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {mode === "signup" && (
                      <LuxeInput id="name" label="Full Name" type="text" value={formData.name} onChange={handleInputChange} />
                    )}
                    <LuxeInput id="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} />
                    <LuxeInput id="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
                    
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="h-3.5 w-3.5 border border-stone-300 rounded-sm peer-checked:bg-stone-900 peer-checked:border-stone-900 transition-all flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 group-hover:text-stone-800">Remember Me</span>
                      </label>
                      {mode === "login" && (
                        <button type="button" className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:text-stone-900 font-bold transition-colors">
                          Forgot Password?
                        </button>
                      )}
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={isLoading}
                        className="group relative w-full overflow-hidden rounded-lg bg-stone-900 px-6 py-4 text-white transition-all duration-500 disabled:opacity-50 hover:shadow-lg hover:shadow-stone-900/20"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em]">
                          {isLoading ? "Processing..." : (mode === "login" ? "Sign In" : "Create Account")}
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-[#C5A059] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </button>
                    </div>
                  </form>

                  {/* BOTTOM TOGGLE - "Don't have an account?" */}
                  <div className="mt-8 text-center border-t border-stone-100 pt-6">
                    <p className="text-[13px] text-stone-500 font-medium">
                      {mode === "login" ? (
                        <>
                          New to Khushi Chauhan?{" "}
                          <button 
                            onClick={() => setMode("signup")}
                            className="text-[#C5A059] font-bold hover:underline ml-1 uppercase tracking-wider text-[11px]"
                          >
                            Create Account
                          </button>
                        </>
                      ) : (
                        <>
                          Already have an account?{" "}
                          <button 
                            onClick={() => setMode("login")}
                            className="text-[#C5A059] font-bold hover:underline ml-1 uppercase tracking-wider text-[11px]"
                          >
                            Sign In
                          </button>
                        </>
                      )}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function LuxeInput({ label, type, id, value, onChange }: { label: string; type: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [focused, setFocused] = useState(false);
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 pointer-events-none z-10 font-semibold",
          focused || value ? "top-2 text-[#C5A059] text-[9px]" : "top-4 text-stone-400 group-hover:text-stone-500"
        )}
      >
        {label}
      </label>
      <input
        id={id}
        type={isPassword && reveal ? "text" : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={type === "email" ? "email" : "current-password"}
        className={cn(
          "w-full rounded-lg border bg-stone-50/30 px-4 pt-6 pb-2.5 text-[14px] text-stone-900 outline-none transition-all duration-300 font-medium",
          "border-stone-200 hover:border-stone-300 focus:border-[#C5A059] focus:bg-white focus:ring-4 focus:ring-[#C5A059]/10 shadow-sm"
        )}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setReveal(!reveal)}
          className="absolute right-4 bottom-2.5 text-stone-400 hover:text-stone-800 transition-colors p-1"
          aria-label={reveal ? "Hide password" : "Show password"}
        >
          {reveal ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      )}
    </div>
  )}
