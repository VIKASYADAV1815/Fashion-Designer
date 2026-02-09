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
                Terms <span className="font-bold">& Conditions</span>
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Framework for our digital and physical relationship
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
                  Introduction
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-6">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Welcome to Khushi Chauhan Designer Studio. By accessing or using our website (khushichauhandesignerstudio.com), you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before making any purchases or using any services.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  1. Acceptance of Terms
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  By accessing and using the Khushi Chauhan Designer Studio website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using our website.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  2. Changes to Terms and Conditions
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  We reserve the right to update or modify these Terms and Conditions at any time, without prior notice. Any changes will be reflected on this page, and the &quot;Effective Date&quot; will be updated accordingly. Review these terms periodically to stay informed.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  3. Products and Availability
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Product Listings: We strive to ensure products are accurately described and depicted, but cannot guarantee exact matches for colors, features, or specifications on your screen.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Availability: Products are subject to availability. In case of inventory discrepancies or supply issues, we will inform you and cancel or refund affected orders.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  4. Ordering and Payment
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Placing an Order: Orders are offers to purchase items subject to availability and acceptance by Khushi Chauhan Designer Studio.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Order Confirmation: After placing an order, you will receive a confirmation email acknowledging receipt. This is not acceptance of the order.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Payment: Transactions are processed securely via trusted payment gateways. We accept multiple payment methods; payment is charged at order confirmation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  5. Pricing and Taxes
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Pricing: Prices are in rupees and may change without notice. Confirmed orders retain the price at the time of confirmation.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Taxes: Applicable taxes (VAT/GST) are added during checkout based on your shipping location.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  6. Shipping and Delivery
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Shipping Rates: Calculated at checkout based on location and order size/weight.</p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Delivery Times: Vary by location and method. Processing typically 1–2 business days; longer during peak times.</p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Tracking: Provided upon dispatch to monitor delivery status.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  7. Returns and Exchanges
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Returns: Unworn, unwashed, undamaged items accepted within 14 days with original packaging and tags. Sale items may be ineligible.</p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Exchange: Contact customer service within 14 days to exchange for size or color.</p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Refunds: Processed to original payment method within 7–10 business days after receipt.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  8. User Accounts
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-4">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Account Registration: Provide accurate, complete, and up‑to‑date information when creating your account.</p>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">Security: Maintain confidentiality of your credentials and follow these Terms.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  9. Privacy and Data Protection
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  10. Intellectual Property
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  All content on the Khushi Chauhan Designer Studio website, including text, images, logos, graphics, and videos, is our intellectual property and protected by copyright and trademark laws. You may not use any content for commercial purposes without express written consent.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  11. Prohibited Conduct
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <ul className="space-y-2 text-base md:text-lg text-zinc-600 max-w-2xl">
                  <li>Violating applicable laws or regulations</li>
                  <li>Harming, disabling, or overburdening the website or interfering with others&#39; enjoyment</li>
                  <li>Attempting unauthorized access to any portion of the website or related systems</li>
                  <li>Using the website for any fraudulent or illegal activities</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  12. Limitation of Liability
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  To the fullest extent permitted by law, Khushi Chauhan Designer Studio shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the website, or the purchase of any products.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  13. Governing Law
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be resolved exclusively in the courts located within Dehradun.
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
