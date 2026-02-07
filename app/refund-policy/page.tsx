"use client";

import React from 'react';

export default function RefundPolicyPage() {
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
                Refund <span className="font-bold">Policy</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Confidence in every studio purchase
              </p>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-800">Code / RET-026</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium">Valid from February 2026</span>
            </div>
          </header>

          <div className="space-y-32">
            
            {/* Section 01: Eligibility */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  01 / Eligibility
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-[15px] leading-relaxed max-w-lg text-zinc-600 mb-6">
                  We accept returns for store credit or refunds within <span className="text-zinc-900 font-semibold">14 days</span> of the delivery date. Items must be in their original, unused condition.
                </p>
                <ul className="text-sm space-y-2 text-zinc-500 italic">
                  <li>— Unworn, unwashed, and unaltered</li>
                  <li>— Original tags and packaging intact</li>
                  <li>— No traces of perfume, makeup, or smoke</li>
                </ul>
              </div>
            </div>

            {/* Section 02: The Process */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  02 / Process
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Initiating a Return</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    Please log into your studio account to request a Return Authorization (RA) number, or contact our support desk with your order ID and reason for return.
                  </p>
                </div>
                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">Inspection & Approval</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 max-w-md">
                    Upon receipt at our studio, items undergo a quality check. Approved returns are processed within 5-7 business days to your original payment method.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 03: Exceptions */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  03 / Exceptions
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <div className="space-y-6">
                   <div className="p-6 bg-zinc-50 border border-zinc-100 max-w-md">
                      <h4 className="text-[10px] font-bold uppercase mb-2 text-zinc-900">Non-Refundable Items:</h4>
                      <ul className="text-xs space-y-2 text-zinc-500">
                        <li>• Bespoke / Made-to-order pieces</li>
                        <li>• Final sale or archive collection items</li>
                        <li>• Intimates or jewelry (for hygiene reasons)</li>
                      </ul>
                   </div>
                   <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                     If a piece arrives defective or damaged, please notify us within 48 hours for an immediate exchange or full reimbursement.
                   </p>
                </div>
              </div>
            </div>

            {/* Section 04: Shipping */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  04 / Shipping
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <div className="bg-zinc-50/50 p-10 max-w-lg border border-zinc-100">
                  <p className="text-sm leading-relaxed text-zinc-500 mb-8 font-light italic">
                    Return shipping costs are the responsibility of the client unless the item is faulty. We recommend using a trackable service as we are not liable for lost packages.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-zinc-300">Support Desk</p>
                  <a href="mailto:support@khushichauhan.studio" className="text-sm font-semibold border-b border-zinc-800 pb-1 hover:text-zinc-400 transition-colors">
                    support@khushichauhan.studio
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