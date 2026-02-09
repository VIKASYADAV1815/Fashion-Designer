"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about", internal: true },
      { label: "Careers", href: "/careers", internal: true },
    ],
    support: [
      { label: "Contact Us", href: "/contact", internal: true },
      { label: "FAQ", href: "/faq", internal: true },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy", internal: true },
      { label: "Refund Policy", href: "/refund-policy", internal: true },
      { label: "Return Policy", href: "/return-policy", internal: true },
      { label: "Shipping Policy", href: "/shipping-policy", internal: true },
      { label: "Terms & Conditions", href: "/terms-and-conditions", internal: true },
    ],
  } as const;

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-14">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16 mb-24">
          
          {/* Brand Column - Large Logo Display */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left pl-0 md:pl-4">
            <Link href="/" aria-label="Home" className="inline-block mb-8 group">
              <div className="relative w-[260px] h-[110px] md:w-[340px] md:h-[130px] transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="/images/logo.png"
                  alt="Khushi Desinger logo"
                  fill
                  className="object-contain object-center md:object-left"
                  priority
                  sizes="(max-width: 768px) 260px, 340px"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm font-light leading-relaxed">
              Crafting luxury ethnic wear where traditional hand‑craft meets modern silhouettes.
              From bespoke bridal lehengas to effortless casual‑fit sarees, we design for elegance.
            </p>
          </div>

          {/* Navigation Links - Balanced for Large Logo */}
          <div className="col-span-1 md:col-span-2 md:col-start-7 text-center md:text-left">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-8 text-white">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  {item.internal ? (
                    <Link href={item.href} className="text-sm md:text-base uppercase tracking-widest font-semibold text-white/80 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-sm md:text-base uppercase tracking-widest font-semibold text-white/80 hover:text-white transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-8 text-white">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((item) => (
                <li key={item.label}>
                  {item.internal ? (
                    <Link href={item.href} className="text-sm md:text-base uppercase tracking-widest font-semibold text-white/80 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-sm md:text-base uppercase tracking-widest font-semibold text-white/80 hover:text-white transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-8 text-white">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  {item.internal ? (
                    <Link href={item.href} className="text-sm md:text-base uppercase tracking-widest font-semibold text-white/80 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-sm md:text-base uppercase tracking-widest font-semibold text-white/80 hover:text-white transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 order-2 md:order-1">
            © 2026 Khushi Desinger. All rights reserved.
          </p>
          
          <div className="flex space-x-10 order-1 md:order-2">
            {["Instagram", "Twitter", "Pinterest"].map(social => (
              <a 
                key={social} 
                href="#" 
                className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-white transition-all hover:-translate-y-1"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
