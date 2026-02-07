"use client";

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-zinc-700 min-h-screen flex font-sans selection:bg-zinc-100 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tickerVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-ticker-studio {
          animation: tickerVertical 40s linear infinite;
        }
      `}} />

      {/* LEFT SIDE: Branded Ticker - Refined weight and subtle border */}
      <aside className="hidden md:flex w-14 border-r border-zinc-200 flex-col overflow-hidden sticky top-0 h-screen bg-white z-20">
        <div className="animate-ticker-studio flex flex-col items-center pt-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center py-16 gap-20">
              <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] uppercase tracking-[0.6em] font-semibold text-zinc-400 whitespace-nowrap">
                khushi chauhan designer studio
              </span>
              <div className="h-12 w-[1px] bg-zinc-100"></div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT SIDE: Content Area */}
      <div className="flex-1 overflow-visible">
        <div className="max-w-5xl w-full mx-auto px-8 md:px-16 pt-32 pb-32">
          
          {/* Header - Sophisticated balance */}
          <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-12 gap-8">
            <div className="max-w-xl">
              <h1 className="text-4xl font-light tracking-tight text-zinc-900 mb-4 uppercase">
                Privacy <span className="font-bold">Policy</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Ethical data handling & user sovereignty
              </p>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-800">Ref / Studio-026</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium">Updated February 2026</span>
            </div>
          </header>

          <div className="space-y-32">
            
            {/* Section 01 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  01 / Introduction
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-[15px] leading-relaxed max-w-lg text-zinc-600">
                  This document serves as a standard for how we handle your creative and personal data. We operate with high-level encryption and minimal footprint protocols.
                </p>
              </div>
            </div>

            {/* Section 02 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  02 / Collection
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Personal Details</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    Name, email, and shipping coordinates required for studio project delivery and transactional correspondence.
                  </p>
                </div>
                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Technical Data</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    Analytics regarding device type and IP sequences used to optimize the studio's digital experience and security infrastructure.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 03 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  03 / Core Usage
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <ul className="space-y-5 max-w-md">
                  {[
                    "Client project management",
                    "Security & fraud detection",
                    "Service improvement analysis",
                    "Legal compliance"
                  ].map((text, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-4 group cursor-default">
                      <span className="text-[13px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">{text}</span>
                      <div className="flex-1 border-b border-dashed border-zinc-200"></div>
                      <span className="text-[9px] font-bold uppercase text-zinc-300">Item.0{i+1}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 04 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  04 / Inquiry
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <div className="bg-zinc-50/50 p-10 max-w-lg border border-zinc-100">
                  <p className="text-sm leading-relaxed text-zinc-500 mb-8 font-light italic">
                    For all matters regarding data sovereignty, access requests, or deletion protocols, please contact our legal desk.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-zinc-300">Contact</p>
                  <a href="mailto:privacy@khushichauhan.studio" className="text-sm font-semibold border-b border-zinc-800 pb-1 hover:text-zinc-400 transition-colors">
                    privacy@khushichauhan.studio
                  </a>
                </div>
              </div>
            </div>

          </div>

          <footer className="mt-40 border-t border-zinc-200 pt-8 flex justify-between items-center">
            <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-300 font-medium">© 2026 Studio Khushi Chauhan</p>
            <div className="flex gap-2">
               <div className="w-1 h-1 rounded-full bg-zinc-200"></div>
               <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}