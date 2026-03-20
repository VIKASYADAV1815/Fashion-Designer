"use client";

import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Hardcoded credentials check
    setTimeout(() => {
      if (
        email === "admin@gmail.com" &&
        password === "123456"
      ) {
        onLogin();
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6 relative overflow-hidden font-josefin">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] bg-size-[24px_24px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#C5A059] rounded-full blur-[120px]" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#C5A059] rounded-full blur-[120px]" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-white border border-[#F0E6D2] rounded-[2.5rem] p-12 shadow-[0_20px_50px_rgba(197,160,89,0.08)] relative z-10 backdrop-blur-sm"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FDFBF7] rounded-3xl border border-[#F0E6D2] mb-8 shadow-sm">
            <ShieldCheck size={40} className="text-[#C5A059]" />
          </div>
          <h1 className="text-4xl font-playfair font-bold text-slate-900 mb-3 tracking-tight">Admin Portal</h1>
          <p className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase">Khushi Chauhan Designer Studio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.15em] text-slate-400 font-bold ml-1">Secure Email</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#C5A059] transition-colors duration-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 pl-14 pr-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all focus:bg-white font-medium"
                placeholder="admin@gmail.com"
                required
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">💡 Use: admin@gmail.com</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.15em] text-slate-400 font-bold ml-1">Access Token</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#C5A059] transition-colors duration-300" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4.5 pl-14 pr-14 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all focus:bg-white font-medium"
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#C5A059] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">💡 Use: 123456</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-red-600 text-sm bg-red-50/50 border border-red-100 rounded-2xl p-4 text-center font-bold"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C5A059] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#B38F4D] active:scale-[0.98] transition-all shadow-xl shadow-[#C5A059]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group overflow-hidden relative"
          >
            <span className="relative z-10">{loading ? "Authenticating..." : "Authorize Access"}</span>
            {!loading && <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-xs font-medium tracking-wide">
            © 2026 Khushi Chauhan Designer Studio. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
