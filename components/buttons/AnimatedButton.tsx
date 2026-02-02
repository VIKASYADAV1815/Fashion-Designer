"use client";

import React, { useRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "text" | "solid";
}

export default function AnimatedButton({
  children,
  className,
  variant = "primary",
  ...props
}: AnimatedButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2; // Magnetic strength
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-3 uppercase tracking-[0.25em] text-xs font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-white/30 text-white hover:border-white",
    text: "text-white p-0 hover:text-gray-300",
    solid: "bg-black text-white hover:bg-stone-800",
  } as const;

  return (
    <motion.button
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      aria-pressed="false"
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          variant !== "text" && "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25)_0,transparent_60%)] group-hover:opacity-100"
        )}
      />
      {variant === "text" && (
        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-current scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100" />
      )}
    </motion.button>
  );
}
