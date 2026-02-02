"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = {
    company: ["About Us", "Careers", "Sustainability", "Press"],
    support: ["Contact Us", "Shipping", "Returns", "Size Guide"],
    legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"]
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-1 md:col-span-4">
            <Link href="/" className="text-3xl font-bold tracking-[0.3em] uppercase mb-8 block">
              LUXE
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm uppercase tracking-wider">
              Redefining modern luxury through sustainable craftsmanship and timeless design. 
              Designed for the contemporary aesthete.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-xs uppercase tracking-wider hover:text-gray-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-xs uppercase tracking-wider hover:text-gray-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-xs uppercase tracking-wider hover:text-gray-400 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600">
            © 2026 Luxe Fashion. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             {["Instagram", "Twitter", "Pinterest"].map(social => (
               <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                 {social}
               </a>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
