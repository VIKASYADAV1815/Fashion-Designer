 "use client";
 
 import Image from "next/image";
 import Link from "next/link";
 
 export default function CareersPage() {
  const studioEthos = [
    { title: "Craft & Heritage", copy: "Celebrating hand‑craft traditions through modern silhouettes and precise tailoring." },
    { title: "Material Intent", copy: "Selecting elevated fabrics and finishes designed for longevity and movement." },
    { title: "Client Care", copy: "Empathy and consistency guide fittings, alterations, and bespoke experiences." },
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
         <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
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
          <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-4">Studio Ethos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studioEthos.map((e, i) => (
              <div key={i} className="border border-neutral-200 p-6 rounded-sm bg-white">
                <h4 className="text-base uppercase tracking-[0.2em] font-semibold">{e.title}</h4>
                <p className="text-sm text-gray-600 mt-3">{e.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-sm text-gray-500">
            For collaborations and internships, send your portfolio to{" "}
            <a href="mailto:khushichauhan1991@icloud.com" className="underline font-semibold">
              khushichauhan1991@icloud.com
            </a>{" "}
            and we’ll reach out.
          </div>
        </div>
       </section>
     </main>
   );
 }
