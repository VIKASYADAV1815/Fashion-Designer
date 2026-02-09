"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white">
      <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-end">
        <Image
          src="/images/4.jpg"
          alt="Studio Contact"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16 md:py-24 text-white">
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">Contact Us</h1>
          <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl">
            We’re here to help with orders, shipping, sizing, and bespoke inquiries. Reach out anytime.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-gray-600 mt-[2px]" />
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-semibold">Email</h3>
                  <p className="text-sm text-gray-600">
                    support@khushichauhan.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-gray-600 mt-[2px]" />
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-semibold">Phone</h3>
                  <p className="text-sm text-gray-600">
                    +91 98765 43210
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-600 mt-[2px]" />
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-semibold">Studio</h3>
                  <p className="text-sm text-gray-600">
                    Khushi Chauhan Designer Studio, Dehradun
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Name</label>
                  <input className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Email</label>
                  <input type="email" className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Message</label>
                <textarea className="mt-2 w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none h-32" placeholder="How can we help?" />
              </div>
              <button type="submit" className="px-6 py-3 bg-black text-white text-[10px] uppercase tracking-[0.3em] rounded-sm">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
