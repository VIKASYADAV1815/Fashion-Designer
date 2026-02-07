"use client";

import React from 'react';

export default function TermsAndConditionsPage() {
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

      {/* LEFT SIDE: Branded Ticker */}
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
          
          {/* Header */}
          <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-12 gap-8">
            <div className="max-w-xl">
              <h1 className="text-4xl font-light tracking-tight text-zinc-900 mb-4 uppercase">
                Terms <span className="font-bold">& Conditions</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Framework for our digital and physical relationship
              </p>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-800">Legal / TOS-026</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium">Updated February 2026</span>
            </div>
          </header>

          <div className="space-y-32">
            
            {/* Section 01: Use of Service */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  01 / Usage
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-[15px] leading-relaxed max-w-lg text-zinc-600 mb-6">
                  By accessing this platform, you agree to comply with our guidelines. All content, including imagery and design patterns, is the <span className="text-zinc-900 font-semibold">Intellectual Property</span> of Khushi Chauhan Designer Studio.
                </p>
                <p className="text-sm text-zinc-500 leading-relaxed italic">
                  Unauthorized reproduction or commercial use of studio assets is strictly prohibited.
                </p>
              </div>
            </div>

            {/* Section 02: Commercial Terms */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  02 / Transactions
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Orders & Acceptance</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    All orders are subject to availability and credit verification. We reserve the right to refuse service or cancel orders at our discretion.
                  </p>
                </div>
                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Pricing Integrity</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    While we strive for accuracy, errors may occur. If a pricing error is discovered after an order is placed, we will notify you immediately for re-confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 03: Liability & Governance */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  03 / Liability
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <ul className="space-y-5 max-w-md">
                  {[
                    "Statutory rights compliance",
                    "Limitation of incidental damages",
                    "Governing law & jurisdiction",
                    "Force majeure clauses"
                  ].map((text, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-4 group cursor-default">
                      <span className="text-[13px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">{text}</span>
                      <div className="flex-1 border-b border-dashed border-zinc-200"></div>
                      <span className="text-[9px] font-bold uppercase text-zinc-300">Clause.{i+1}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 04: Legal Contact */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  04 / Agreement
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <div className="bg-zinc-50/50 p-10 max-w-lg border border-zinc-100">
                  <p className="text-sm leading-relaxed text-zinc-500 mb-8 font-light italic">
                    By continuing to use this site, you acknowledge that you have read and understood these Terms. We reserve the right to modify these conditions to reflect changes in law or studio policy.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-zinc-300">Legal Department</p>
                  <a href="mailto:legal@khushichauhan.studio" className="text-sm font-semibold border-b border-zinc-800 pb-1 hover:text-zinc-400 transition-colors">
                    legal@khushichauhan.studio
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