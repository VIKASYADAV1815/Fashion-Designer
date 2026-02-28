import Hero from "@/components/hero/Hero";
import SignatureCollections from "@/components/home/SignatureCollections";
import ParallaxFeatures from "@/components/home/ParallaxFeatures";
import VideoSplit from "@/components/home/VideoSplit";
import OverlappingImageStory from "@/components/home/stories/OverlappingImageStory";
import BentoColorReveal from "@/components/home/stories/BentoColorReveal";
// import BelowBentoText from "@/components/home/BelowBentoText";
import InMotionSliderr from "@/components/home/stories/InMotionSlider";

import Continuum from "@/components/home/Continuum";


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
   
     
    </main>
  );
}
