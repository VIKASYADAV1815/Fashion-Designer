"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom when image changes
  useEffect(() => {
    setIsZoomed(false);
  }, [index]);

  useEffect(() => {
    const container = containerRef.current;
    
    // 1. Handle Keypress
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!isZoomed) {
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      } else if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        setIsZoomed(false);
      }
    };

    // 2. Handle Wheel (Scroll to Zoom Out)
    const handleWheel = (e: WheelEvent) => {
      if (isZoomed) {
        e.preventDefault(); // Stop page from scrolling
        setIsZoomed(false); // Snap out
      }
    };

    window.addEventListener("keydown", onKey);
    if (container) {
      // Must be non-passive to prevent default scroll behavior
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    
    return () => {
      window.removeEventListener("keydown", onKey);
      if (container) container.removeEventListener("wheel", handleWheel);
    };
  }, [onClose, onPrev, onNext, isZoomed]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-500 transition-colors"
      onClick={onClose}
    >
      {/* Premium Header */}
      <div className="absolute top-0 w-full p-6 md:p-12 flex justify-between items-center z-[1010] pointer-events-none">
        <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-light">
          {index + 1} <span className="mx-3 text-white/10">|</span> {images.length}
        </span>
        <button
          className="p-2 text-white/30 hover:text-white transition-all pointer-events-auto"
          onClick={onClose}
        >
          <X size={32} strokeWidth={1} />
        </button>
      </div>

      {/* Navigation Arrows */}
      {!isZoomed && (
        <>
          <button
            className="hidden lg:flex absolute left-8 z-[1010] p-6 text-white/10 hover:text-white transition-all hover:scale-125"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
          >
            <ChevronLeft size={80} strokeWidth={0.5} />
          </button>
          <button
            className="hidden lg:flex absolute right-8 z-[1010] p-6 text-white/10 hover:text-white transition-all hover:scale-125"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
          >
            <ChevronRight size={80} strokeWidth={0.5} />
          </button>
        </>
      )}

      {/* Image Container */}
      <div 
        className={`
          relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          /* Mobile: Small aspect ratio */
          w-[85vw] aspect-[4/5]
          /* Big Devices: Increased to 85% height */
          md:w-auto md:h-[85vh] md:max-w-[90vw] md:aspect-auto
          ${isZoomed ? "scale-110 md:scale-[1.15] cursor-zoom-out" : "scale-100 cursor-zoom-in"}
        `}
        onDoubleClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full overflow-hidden shadow-2xl bg-neutral-900 border border-white/5">
          <img 
            src={images[index]} 
            alt="" 
            className={`
              w-full h-full object-contain select-none transition-transform duration-700 ease-out
              ${isZoomed ? "scale-125" : "scale-100"}
            `}
          />
        </div>
      </div>

      {/* Subtle Hint */}
      <div className={`mt-8 transition-opacity duration-500 md:block hidden ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-light">
          Double Click to Zoom • Scroll to Reset
        </p>
      </div>
    </div>
  );
}