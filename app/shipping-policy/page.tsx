"use client";

import React from 'react';

export default function ShippingPolicyPage() {
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
                Shipping <span className="font-bold">Policy</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Reliable and secure global delivery
              </p>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-800">Ref / SHP-026</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium">Updated February 2026</span>
            </div>
          </header>

          <div className="space-y-32">
            
            {/* Section 01: Methods */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  01 / Logistics
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-[15px] leading-relaxed max-w-lg text-zinc-600 mb-6">
                  To ensure the safety of our pieces, all shipments are dispatched via trusted premium carriers. Every package is fully insured and requires a <span className="text-zinc-900 font-semibold">signature upon delivery</span>.
                </p>
                <div className="flex gap-12 pt-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-800 mb-1">Standard</p>
                    <p className="text-xs text-zinc-500 italic">5—7 Business Days</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-800 mb-1">Express</p>
                    <p className="text-xs text-zinc-500 italic">1—2 Business Days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 02: Timelines */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  02 / Processing
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Ready-to-Wear</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    In-stock items are processed and dispatched within 48 hours of order confirmation, excluding weekends and public holidays.
                  </p>
                </div>
                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Bespoke Pieces</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    Made-to-order or tailored items follow a specialized crafting timeline. Estimated completion dates are provided at checkout and confirmed via email.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 03: International */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  03 / International
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <ul className="space-y-5 max-w-md">
                  {[
                    "Global white-glove delivery",
                    "Customs documentation handling",
                    "Duty estimates provided at checkout",
                    "Real-time waypoint tracking"
                  ].map((text, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-4 group cursor-default">
                      <span className="text-[13px] font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">{text}</span>
                      <div className="flex-1 border-b border-dashed border-zinc-200"></div>
                      <span className="text-[9px] font-bold uppercase text-zinc-300">Intl.{i+1}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 04: Support */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  04 / Tracking
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <div className="bg-zinc-50/50 p-10 max-w-lg border border-zinc-100">
                  <p className="text-sm leading-relaxed text-zinc-500 mb-8 font-light italic">
                    Once your order has been handed over to our carrier, you will receive a confirmation email containing your tracking information. For urgent logistics inquiries, contact us directly.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-zinc-300">Dispatch Desk</p>
                  <a href="mailto:shipping@khushichauhan.studio" className="text-sm font-semibold border-b border-zinc-800 pb-1 hover:text-zinc-400 transition-colors">
                    shipping@khushichauhan.studio
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