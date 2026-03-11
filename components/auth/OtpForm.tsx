'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/Toast";

export default function OtpForm({
  email,
  name,
  onVerify,
  isLoading = false,
}: {
  email: string;
  name?: string;
  onVerify: (otp: string) => void;
  isLoading?: boolean;
}) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const { showToast } = useToast();
  const [resendCooldown, setResendCooldown] = useState(0);

  const otp = useMemo(() => digits.join(''), [digits]);
  const isComplete = otp.length === 6 && digits.every((d) => d.length === 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete || isLoading) return;
    onVerify(otp);
  };

  useEffect(() => {
    inputsRef.current?.[0]?.focus?.();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => {
      setResendCooldown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const focusIndex = (idx: number) => {
    inputsRef.current?.[idx]?.focus?.();
    inputsRef.current?.[idx]?.select?.();
  };

  const setAt = (idx: number, value: string) => {
    const next = [...digits];
    next[idx] = value;
    setDigits(next);
  };

  const handleChange = (idx: number, raw: string) => {
    if (isLoading) return;
    const onlyDigits = raw.replace(/\D/g, '');
    if (!onlyDigits) {
      setAt(idx, '');
      return;
    }

    // Single digit typed
    if (onlyDigits.length === 1) {
      setAt(idx, onlyDigits);
      if (idx < 5) focusIndex(idx + 1);
      return;
    }

    // Paste / fast input multiple digits
    const chunk = onlyDigits.slice(0, 6 - idx).split('');
    const next = [...digits];
    for (let i = 0; i < chunk.length; i++) next[idx + i] = chunk[i];
    setDigits(next);
    const nextFocus = Math.min(idx + chunk.length, 5);
    focusIndex(nextFocus);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoading) return;

    if (e.key === 'Backspace') {
      if (digits[idx]) {
        setAt(idx, '');
        return;
      }
      if (idx > 0) {
        e.preventDefault();
        setAt(idx - 1, '');
        focusIndex(idx - 1);
      }
      return;
    }

    if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      focusIndex(idx - 1);
      return;
    }

    if (e.key === 'ArrowRight' && idx < 5) {
      e.preventDefault();
      focusIndex(idx + 1);
      return;
    }
  };

  const handleResend = async () => {
    if (isLoading || resendCooldown > 0) return;
    try {
      setResendCooldown(30);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || "Guest" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to resend OTP");
      showToast("New OTP sent to your email.", "info");
      setDigits(Array(6).fill(''));
      focusIndex(0);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to resend OTP.", "error");
      setResendCooldown(0);
    }
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold">
              OTP Code
            </label>
            <span className="text-[9px] uppercase tracking-widest text-stone-400">
              6 digits
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {digits.map((d, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                value={d}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete={idx === 0 ? 'one-time-code' : 'off'}
                maxLength={6}
                aria-label={`OTP digit ${idx + 1}`}
                className={[
                  "h-12 w-full rounded-xl border bg-white px-0 text-center",
                  "text-[16px] font-extrabold tracking-[0.2em] text-stone-900",
                  "shadow-[0_18px_50px_-20px_rgba(0,0,0,0.18)]",
                  "border-stone-100 hover:border-stone-200",
                  "focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                ].join(" ")}
                disabled={isLoading}
              />
            ))}
          </div>

          <p className="text-[10px] leading-relaxed text-stone-400">
            Didn’t get it? Check spam/junk, or resend a fresh code.
          </p>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading || resendCooldown > 0}
              className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#C5A059] hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
            </button>
            <span className="text-[9px] uppercase tracking-widest text-stone-400">
              Tip: paste the full code
            </span>
          </div>
        </div>

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
