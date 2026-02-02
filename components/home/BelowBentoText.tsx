"use client";

import { motion } from "framer-motion";

export default function BelowBentoText() {
  return (
    <section className="bg-black text-white py-12 md:py-16 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(1.5rem,4vw,3rem)] font-light uppercase tracking-[0.2em]"
        >
          The Story Continues
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-[clamp(0.75rem,1.2vw,1rem)] text-gray-400 leading-loose tracking-[0.1em]"
        >
          A celebration of material, movement, and restraint. Each piece is a quiet statement, crafted for those who value permanence over spectacle.
        </motion.p>
      </div>
    </section>
  );
}
