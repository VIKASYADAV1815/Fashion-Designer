"use client";

import { motion } from "framer-motion";

export default function BelowBentoText() {
  return (
    <section className="bg-white text-black py-8 md:py-12 border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: The Title with a subtle dot */}
        <div className="flex items-center gap-4">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-1.5 h-1.5 bg-black rounded-full"
          />
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] font-medium whitespace-nowrap"
          >
            The Story Continues
          </motion.h2>
        </div>

        {/* Right: The Content - condensed and sleek */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[11px] md:text-xs text-gray-500 uppercase tracking-[0.15em] leading-relaxed max-w-xl md:text-right"
        >
          A celebration of <span className="text-black">material and restraint</span>. 
          Quiet statements crafted for those who value 
          <span className="text-black italic ml-1">permanence</span>.
        </motion.p>

      </div>
    </section>
  );
}