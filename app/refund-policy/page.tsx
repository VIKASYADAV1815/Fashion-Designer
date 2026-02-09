import React from 'react';

export default function RefundPolicyPage() {
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
                Refund <span className="font-bold">& Cancellation</span> Policy
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Confidence in every studio purchase
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
                  Overview
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  This refund and cancellation policy outlines how you can cancel or seek a refund for a product or service purchased through the platform.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Cancellations
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Cancellations will only be considered if the request is made within 2 days of placing the order. Requests may not be entertained if the order has already been communicated to sellers/merchants and shipping has been initiated, or the product is out for delivery. In such cases, you may choose to reject the product at the doorstep.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Damaged or Defective Items
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  In case of receipt of damaged or defective items, please report to our customer service team. The request will be entertained once the seller/merchant has checked and determined the same at its end. This must be reported within 2 days of receipt of products.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  If the product received is not as shown on the site or as per your expectations, notify customer service within 2 days of receiving the product. The customer service team will review your complaint and take an appropriate decision.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Manufacturer Warranty
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  For products that come with a manufacturer warranty, please refer issues directly to the manufacturer.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Refunds Timeline
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  If any refunds are approved by our team, they will be processed and credited within 2–5 working days to the original payment method.
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
