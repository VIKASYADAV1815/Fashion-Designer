"use client";

import { motion } from "framer-motion";
import { Sparkles, CalendarClock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

interface EmptyCategoryProps {
  category: string;
}

export default function EmptyCategory({ category }: EmptyCategoryProps) {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast("You're on the list! We'll notify you when new items arrive.", "success");
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8"
      >
        {/* Animated Background Blob */}
        <div className="absolute inset-0 bg-[#D7B63F]/10 blur-[60px] rounded-full scale-150 animate-pulse" />
        
        {/* Icon Container */}
        <div className="relative bg-white p-6 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-neutral-100">
          <Sparkles className="w-10 h-10 text-[#D7B63F] stroke-[1.5px]" />
        </div>
      </motion.div>

      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-4xl font-serif text-neutral-900 mb-4 capitalize"
      >
        {category} Collection
      </motion.h3>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-sm md:text-base text-neutral-500 max-w-md mx-auto leading-relaxed mb-10"
      >
        Our designers are currently curating an exclusive range of <span className="text-neutral-800 font-medium">{category}</span> pieces. 
        Expect timeless silhouettes and handcrafted details, coming soon to our atelier.
      </motion.p>

      {/* Notification Form */}
      <form onSubmit={handleNotify} className="w-full max-w-md bg-white p-1 rounded-full border border-neutral-200 shadow-sm flex items-center mb-12 focus-within:border-[#D7B63F] focus-within:ring-1 focus-within:ring-[#D7B63F]/20 transition-all">
        <div className="pl-4 text-neutral-400">
          <Mail size={16} />
        </div>
        <input 
          type="email" 
          placeholder="Notify me when available" 
          className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm px-4 py-3 placeholder:text-neutral-400 text-neutral-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-black text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors"
        >
          Notify Me
        </button>
      </form>

      {/* Alternative Links */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">While you wait, explore</span>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/shop?category=Lehenga" className="px-5 py-2.5 border border-neutral-200 text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:border-black hover:text-black transition-all bg-white hover:shadow-lg">
            Royal Lehengas
          </Link>
          <Link href="/shop?category=Saree" className="px-5 py-2.5 border border-neutral-200 text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:border-black hover:text-black transition-all bg-white hover:shadow-lg">
            Timeless Sarees
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
