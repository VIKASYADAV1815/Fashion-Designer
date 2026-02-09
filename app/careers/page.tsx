 "use client";
 
 import Image from "next/image";
 import Link from "next/link";
 
 export default function CareersPage() {
   const openings = [
     {
       title: "Junior Fashion Designer",
       type: "Full-time • On-site • Dehradun",
       summary: "Assist in design development, fabric selection, and sample coordination across couture and casual-fit lines.",
     },
     {
       title: "Studio Production Assistant",
       type: "Full-time • On-site • Dehradun",
       summary: "Support daily atelier operations, manage materials, and coordinate with artisans to meet production timelines.",
     },
     {
       title: "Content & Visual Storyteller",
       type: "Contract • Hybrid",
       summary: "Shape brand narratives through photo/video shoots and editorial assets for campaigns and lookbooks.",
     },
   ];
 
   return (
     <main className="bg-white text-black min-h-screen font-sans">
       <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end">
         <Image
           src="/images/4.jpg"
           alt="Studio Hero"
           fill
           priority
           className="object-cover"
          sizes="100vw"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
         <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16 md:py-24 text-white">
           <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">Join the Studio</h1>
           <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl">
             Help craft luxury ethnic wear where traditional hand‑craft meets modern silhouettes.
             We value precision, empathy, and an eye for quiet elegance.
           </p>
         </div>
       </section>
 
       <section className="max-w-6xl mx-auto px-8 py-16 md:py-24">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
           <div className="md:col-span-4">
             <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gray-500">Studio Values</h2>
             <ul className="mt-6 space-y-3 text-sm text-gray-600">
               <li>Intentional design and material respect</li>
               <li>Collaborative craftsmanship and accountability</li>
               <li>Client empathy and consistency</li>
             </ul>
           </div>
           <div className="md:col-span-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image src="/images/img16.png" alt="Collection Visual" fill className="object-cover" sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 33vw" />
              </div>
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image src="/images/2.jpg" alt="Atelier" fill className="object-cover" sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 33vw" />
              </div>
             </div>
           </div>
         </div>
 
         <div className="mt-20">
           <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-4">Open Roles</h3>
           <div className="divide-y divide-neutral-200 border border-neutral-200">
             {openings.map((role, i) => (
               <div key={i} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                 <div className="flex-1">
                   <h4 className="text-xl md:text-2xl font-light tracking-tight">{role.title}</h4>
                   <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">{role.type}</p>
                   <p className="text-sm text-gray-600 mt-4">{role.summary}</p>
                 </div>
                <div />
               </div>
             ))}
           </div>
 
           <div className="mt-10 text-sm text-gray-500">
             Don’t see a role that fits? Send your portfolio to{" "}
             <a href="mailto:careers@khushichauhan.studio" className="underline font-semibold">
               careers@khushichauhan.studio
             </a>{" "}
             and we’ll reach out when there’s a match.
           </div>
         </div>
       </section>
     </main>
   );
 }
