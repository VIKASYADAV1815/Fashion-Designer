"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { ShoppingBag, ArrowRight, Plus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const bentoProducts = [
  { type: "video", name: "Heritage Lehenga", price: "₹84,500", src: "https://res.cloudinary.com/dzq7axes2/video/upload/v1770113143/video1_em8fnl.mp4", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Evening Drape", price: "₹22,000", src: "/images/img1.jpg", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Silk Saree", price: "₹18,500", src: "/images/img8.png", span: "md:col-span-4 md:row-span-1", mobileRatio: "aspect-square" },
  { type: "video", name: "Bridal Couture", price: "Custom", src: "https://res.cloudinary.com/dzq7axes2/video/upload/v1770112837/video2_gnoyzr.mov", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Floral Organza", price: "₹34,000", src: "/images/img21.png", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Banarasi Work", price: "₹1,10,000", src: "/images/img13.png", span: "md:col-span-4 md:row-span-2", mobileRatio: "aspect-[9/15]" },
  { type: "image", name: "Chic Casuals", price: "₹12,500", src: "/images/img7.png", span: "md:col-span-4 md:row-span-1", mobileRatio: "aspect-square" },
];

const sliderProducts = [
  { name: "Mehendi Fit", price: "₹15,000", img: "/images/img21.png" },
  { name: "Reception Gown", price: "₹45,000", img: "/images/img17.png" },
  { name: "Cocktail Saree", price: "₹28,000", img: "/images/img6.jpg" },
  { name: "Haldi Special", price: "₹12,000", img: "/images/img14.png" },
  { name: "Modern Drape", price: "₹22,500", img: "/images/img1.jpg" },
    { name: "Modern Drape", price: "₹22,500", img: "/images/img20.png" },
      { name: "Modern Drape", price: "₹22,500", img: "/images/img10.png" },
        { name: "Modern Drape", price: "₹22,500", img: "/images/img16.png" },
];

export default function BentoWithCompactSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    // Smooth InMotion Dragging using GSAP
    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth - slider.offsetWidth;

    const drag = Draggable.create(proxyRef.current, {
      type: "x",
      trigger: slider,
      inertia: true, // Requires GSAP Inertia plugin (optional, but smooths motion)
      onDrag: function() {
        // Map the drag movement to the slider's scroll position
        const percent = this.x / -totalWidth;
        gsap.to(slider, {
          scrollLeft: -this.x,
          duration: 0.1,
          ease: "power2.out"
        });
      },
      onThrowUpdate: function() {
        gsap.to(slider, {
          scrollLeft: -this.x,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    });

    return () => {
        if(drag[0]) drag[0].kill();
    };
  }, []);

  return (
    <section className="bg-[#fcfaf8] text-stone-900 py-10 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* BENTO GRID AS PRODUCT CARDS */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-4xl font-serif tracking-tight text-stone-800">
              Atelier <span className="italic font-light">Archive</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-stone-400 mt-2">Curated Masterpieces</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:gap-4 transition-all duration-300">
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 grid-flow-dense md:auto-rows-[300px] gap-6 mb-24">
          {bentoProducts.map((p, i) => (
            <div key={i} className={`relative overflow-hidden bg-white rounded-lg shadow-sm border border-stone-100 group transition-all duration-500 hover:shadow-xl ${p.span} ${p.mobileRatio} md:aspect-auto`}>
              {/* Media Container */}
              <div className="w-full h-full relative overflow-hidden">
                {p.type === "video" ? (
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline preload="auto">
                    <source src={p.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={p.src} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
                
                {/* Product Card Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end">
                    <div className="text-white">
                      <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1">New Collection</p>
                      <h3 className="text-lg font-serif">{p.name}</h3>
                      <p className="text-sm font-light italic">{p.price}</p>
                    </div>
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-stone-900 transition-colors">
                        <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INMOTION COMPACT SLIDER */}
        <div className="mt-16 border-t border-stone-200 pt-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-stone-500">InMotion / <span className="text-stone-300">Spring 26</span></h3>
            <div className="flex gap-2">
                 <span className="w-8 h-[1px] bg-stone-300 self-center"></span>
                 <p className="text-[10px] uppercase tracking-widest text-stone-400">Swipe to Explore</p>
            </div>
          </div>

          {/* Hidden proxy for GSAP Draggable */}
          <div ref={proxyRef} className="hidden" />

          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-8 pb-10 cursor-grab active:cursor-grabbing no-scrollbar select-none"
            style={{ scrollSnapType: 'none' }} // Disabled native snap for smoother GSAP motion
          >
            {sliderProducts.map((item, idx) => (
              <div key={idx} className="min-w-[280px] md:min-w-[340px] group">
                <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-md bg-stone-100">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    draggable="false"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
                    Quick Ship
                  </div>
                  <div className="absolute bottom-4 right-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <button className="bg-stone-900 text-white p-3.5 rounded-full shadow-2xl border border-white/40">
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-md font-serif text-stone-800 group-hover:text-stone-500 transition-colors">{item.name}</h4>
                  <p className="text-xs text-stone-400 tracking-wider">{item.price}</p>
                </div>
              </div>
            ))}
            {/* Spacer for the end of the list */}
            <div className="min-w-[10vw]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </section>
  );
}