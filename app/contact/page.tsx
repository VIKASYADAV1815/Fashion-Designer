"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#FFFDFB] text-[#1A1A1A] min-h-screen font-sans antialiased selection:bg-[#E29578] selection:text-white pt-32 pb-20 flex flex-col items-center">
      
      {/* Container: 6xl Panoramic Width - Preserved Scale */}
      <div className="max-w-6xl w-full px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#F5EBE0] shadow-[0_10px_40px_-15px_rgba(226,149,120,0.1)] overflow-hidden">
          
          {/* LEFT: Portrait Image with Gallery Frame Style */}
          <div className="lg:col-span-4 relative h-[400px] lg:h-auto bg-[#FDF8F5] p-6 flex items-center justify-center border-r border-[#F5EBE0]">
            <div className="relative w-full h-full border-[12px] border-white shadow-lg overflow-hidden outline outline-1 outline-[#E29578]/20">
              <Image
                src="/images/4.jpg"
                alt="Khushi Chauhan Studio"
                fill
                priority
                className="object-cover transition-transform duration-[10s] hover:scale-110"
              />
              {/* Warm Color Overlay */}
              <div className="absolute inset-0 bg-[#E29578]/5 mix-blend-multiply" />
            </div>
          </div>

          {/* RIGHT: Content Column */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Header Area */}
            <div className="px-10 py-12 md:px-16 md:py-14 border-b border-[#FDF8F5]">
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-[#1A1A1A]">
                  Contact <span className="italic font-serif text-[#E29578]">the Studio</span>
                </h1>
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#E29578]">Inquiry / 2026</span>
              </div>

              {/* Info Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StudioDetail label="Email" value="khushichauhan1991@icloud.com" color="#E29578" />
                <StudioDetail label="Connect" value="+91 98765 43210" color="#E29578" />
                <StudioDetail label="Presence" value="Dehradun, UK" color="#E29578" />
              </div>
            </div>

            {/* Form Area */}
            <div className="px-10 py-12 md:px-16 md:py-14 bg-[#FCFAFA]">
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
                  <StudioInput label="Full Identity" placeholder="Your Name" />
                  <StudioInput label="Electronic Mail" placeholder="you@domain.com" type="email" />
                </div>

                <div className="group space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#A5A5A5] group-focus-within:text-[#E29578] transition-colors">
                    Brief / Vision
                  </label>
                  <textarea 
                    className="w-full bg-transparent border-b border-[#F5EBE0] py-3 text-[15px] font-light outline-none focus:border-[#E29578] transition-all h-24 resize-none placeholder:text-neutral-200 text-[#1A1A1A]" 
                    placeholder="Describe your bespoke requirements..." 
                  />
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-[10px] uppercase tracking-widest text-[#B5B5B5] max-w-[220px] leading-relaxed">
                    Private consultations are strictly by appointment only.
                  </p>
                  <button 
                    type="submit" 
                    className="group flex items-center justify-between bg-[#1A1A1A] text-white px-10 py-5 min-w-[200px] transition-all hover:bg-[#E29578] text-[11px] uppercase tracking-[0.5em] font-bold shadow-md"
                  >
                    Send Message
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* Footer Metadata */}
        <div className="mt-8 flex justify-between items-center px-4">
           <p className="text-[10px] uppercase tracking-[0.6em] text-[#E29578]/60 font-medium">© Khushi Chauhan</p>
           <p className="text-[10px] uppercase tracking-[0.6em] text-neutral-300">Design Studio</p>
        </div>
      </div>
    </main>
  );
}

function StudioDetail({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#A5A5A5] flex items-center gap-2">
        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </h3>
      <p className="text-[14px] font-medium tracking-tight text-[#333]">{value}</p>
    </div>
  );
}

function StudioInput({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div className="group flex flex-col border-b border-[#F5EBE0] focus-within:border-[#E29578] transition-all pb-2">
      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#A5A5A5] group-focus-within:text-[#E29578] transition-colors">
        {label}
      </label>
      <input 
        type={type}
        className="mt-2 w-full bg-transparent text-[15px] font-light outline-none placeholder:text-neutral-100 text-[#1A1A1A]" 
        placeholder={placeholder}
      />
    </div>
  );
}