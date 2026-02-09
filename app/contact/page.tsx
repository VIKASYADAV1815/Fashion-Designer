"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/images/4.jpg"
          alt="Khushi Chauhan Studio"
          fill
          priority
          className="object-cover transition-scale duration-[10s] hover:scale-105"
        />
        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 text-white">
          <span className="text-xs uppercase tracking-[0.5em] mb-4 block opacity-80">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-light uppercase tracking-tighter leading-none">
            Contact <br /> <span className="italic">the Studio</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Info Column */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-black/40">Inquiries</h2>
              <div className="space-y-10">
                <ContactItem 
                  icon={<Mail className="w-4 h-4" />} 
                  title="Email" 
                  value="support@khushichauhan.com" 
                />
                <ContactItem 
                  icon={<Phone className="w-4 h-4" />} 
                  title="Phone" 
                  value="+91 98765 43210" 
                />
                <ContactItem 
                  icon={<MapPin className="w-4 h-4" />} 
                  title="Studio" 
                  value="Khushi Chauhan Designer Studio, Dehradun" 
                />
              </div>
            </div>

            <div className="pt-10 border-t border-black/5">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Hours</h3>
              <p className="text-sm text-gray-500 font-light italic">Monday — Saturday: 11:00 AM to 7:00 PM</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="group">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-black transition-colors">Full Name</label>
                <input 
                  className="mt-2 w-full border-b border-black/10 py-3 text-base outline-none focus:border-black transition-colors bg-transparent font-light" 
                  placeholder="e.g. Ananya Sharma" 
                />
              </div>
              <div className="group">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-black transition-colors">Email Address</label>
                <input 
                  type="email" 
                  className="mt-2 w-full border-b border-black/10 py-3 text-base outline-none focus:border-black transition-colors bg-transparent font-light" 
                  placeholder="you@domain.com" 
                />
              </div>
              <div className="md:col-span-2 group">
                <label className="text-xs uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-black transition-colors">Message</label>
                <textarea 
                  className="mt-2 w-full border-b border-black/10 py-3 text-base outline-none focus:border-black transition-colors bg-transparent font-light h-32 resize-none" 
                  placeholder="How can we assist with your bespoke order?" 
                />
              </div>
              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit" 
                  className="group flex items-center gap-4 bg-black text-white px-10 py-5 text-xs uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all rounded-full md:rounded-none"
                >
                  Send Inquiry
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}

function ContactItem({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="mt-1 text-black/40">{icon}</div>
      <div>
        <h3 className="text-xs uppercase tracking-widest font-bold mb-1">{title}</h3>
        <p className="text-base text-gray-600 font-light hover:text-black transition-colors cursor-default">
          {value}
        </p>
      </div>
    </div>
  );
}