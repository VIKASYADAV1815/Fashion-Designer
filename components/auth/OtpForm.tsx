'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/Toast";

export default function OtpForm({ email, onVerify }: { email: string; onVerify: (otp: string) => void }) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setIsLoading(true);
    onVerify(otp);
    // The loading state will be managed by the parent component now
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[320px] mx-auto"
    >
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-serif text-stone-900 tracking-tight">Verify Your Email</h2>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-3">
          An OTP has been sent to {email}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <LuxeInput id="otp" label="OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <div className="pt-6">
          <button
            disabled={isLoading}
            className="group relative w-full overflow-hidden rounded-lg bg-stone-900 px-6 py-4 text-white transition-all duration-500 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.5em]">
              {isLoading ? 'Verifying...' : 'Verify'}
            </span>
            <div className="absolute inset-0 bg-[#C5A059] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function LuxeInput({ label, type, id, value, onChange }: { label: string; type: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute left-4 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 pointer-events-none z-10 top-2 text-[#C5A059] font-bold"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border bg-stone-50/20 px-4 pt-7 pb-3 text-[14px] text-stone-900 outline-none transition-all duration-300 border-stone-100 hover:border-stone-200 focus:border-[#C5A059] focus:bg-white focus:ring-4 focus:ring-[#C5A059]/5"
      />
    </div>
  );
}
