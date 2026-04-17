import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import SignatureCollections from "@/components/home/SignatureCollections";
import ParallaxFeatures from "@/components/home/ParallaxFeatures";
import VideoSplit from "@/components/home/VideoSplit";
import OverlappingImageStory from "@/components/home/stories/OverlappingImageStory";
import BentoColorReveal from "@/components/home/stories/BentoColorReveal";
// import BelowBentoText from "@/components/home/BelowBentoText";
import InMotionSliderr from "@/components/home/stories/InMotionSlider";

import Continuum from "@/components/home/Continuum";

export const metadata: Metadata = {
  title: "Designer Lehenga & Ready-to-Wear Saree for Women",
  description:
    "Shop luxurious designer lehenga for women and elegant designer ready to wear saree at Khushi Chauhan. Perfect for weddings, parties, and festive occasions.",
};

export default function Home() {
  return (
    <main className=" min-h-screen">
      <Hero />
      {/* <VideoSection /> */}
      <Continuum />
      <OverlappingImageStory />
  
      <BentoColorReveal />
         <InMotionSliderr />
      {/* <BelowBentoText /> */}
      <VideoSplit />
      
      {/* <ParallaxFeatures /> */}
      <SignatureCollections />
      <section className="bg-white text-black border-t border-zinc-200">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-sm md:text-base leading-relaxed text-zinc-700">
                Our{" "}
                <strong className="font-semibold">designer lehenga for women</strong>{" "}
                features delicate pastel beadwork and shimmering sequins, giving it a compelling wear appearance during weddings and other celebratory occasions. The{" "}
                <strong className="font-semibold">designer ready to wear saree</strong>{" "}
                provides the sophistication within a simply elegant draping. Each of the creations is a masterpiece of careful work and beautiful design.
              </p>
            </div>
          </div>
        </div>
      </section>
     
    </main>
  );
}
