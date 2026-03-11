import React from 'react';

export default function ReturnPolicyPage() {
  return (
    <main className="bg-white text-zinc-700 min-h-screen flex font-sans selection:bg-zinc-100 relative">

      {/* LEFT SIDE: Branded Ticker */}
      <aside className="hidden md:flex w-14 border-r border-zinc-200 flex-col overflow-hidden sticky top-0 h-screen bg-white z-20">
        <div className="flex flex-col items-center pt-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center py-16 gap-20">
              <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] uppercase tracking-[0.6em] font-semibold text-zinc-400 whitespace-nowrap">
                khushi chauhan designer studio
              </span>
              <div className="h-12 w-px bg-zinc-100"></div>
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
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-zinc-900 mb-4 uppercase">
                Return <span className="font-bold">Policy</span>
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Simple, transparent returns & exchanges
              </p>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="text-[11px] md:text-[12px] uppercase tracking-widest font-bold text-zinc-800">Effective Date</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 font-medium">March 1, 2025</span>
            </div>
          </header>

          <div className="space-y-32">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  2‑Day Window
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  We offer refund or exchange within the first 2 days from the date of your purchase. If 2 days have passed since your purchase, you will not be offered a return, exchange, or refund of any kind.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Eligibility
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-6">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  To be eligible for a return or exchange:
                </p>
                <ul className="space-y-2 text-base md:text-lg text-zinc-600">
                  <li>The purchased item should be unused and in the same condition as received</li>
                  <li>The item must have original packaging</li>
                  <li>Items purchased on sale may not be eligible for return/exchange</li>
                </ul>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Only such items are replaced by us (based on an exchange request) if found defective or damaged.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Exempted Categories
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  There may be certain categories of products/items that are exempted from returns or refunds. Such categories will be identified at the time of purchase.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Processing
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  For exchange/return accepted requests, once your returned item is received and inspected, we will email you to notify receipt. If approved after quality check, your request (return or exchange) will be processed in accordance with our policies.
                </p>
              </div>
            </div>

          </div>

          <footer className="mt-40 border-t border-zinc-200 pt-8 flex justify-between items-center">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-zinc-300 font-medium">© 2026 Studio Khushi Chauhan</p>
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
