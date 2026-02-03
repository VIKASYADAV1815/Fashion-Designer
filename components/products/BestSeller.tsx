 "use client";
 
 import Image from "next/image";
 import { motion } from "framer-motion";
 import AnimatedButton from "@/components/buttons/AnimatedButton";
 
 const items = [
   {
     id: "bs-1",
     title: "Silk Evening Dress",
     price: 890,
     image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1170&auto=format&fit=crop",
   },
   {
     id: "bs-2",
     title: "Embroidered Lehenga",
     price: 1450,
     image: "https://images.unsplash.com/photo-1578736640905-5a2b1d027b49?q=80&w=1170&auto=format&fit=crop",
   },
   {
     id: "bs-3",
     title: "Handloom Saree",
     price: 620,
     image: "https://images.unsplash.com/photo-1663160288240-0f93eca3a3f7?q=80&w=1170&auto=format&fit=crop",
   },
   {
     id: "bs-4",
     title: "Drape Casual Fit",
     price: 480,
     image: "https://images.unsplash.com/photo-1520975940208-b8d4a7b8fd9e?q=80&w=1170&auto=format&fit=crop",
   },
 ];
 
 export default function BestSeller() {
   return (
     <section className="bg-black text-white py-24">
       <div className="container mx-auto px-6">
         <div className="flex items-end justify-between mb-10">
           <h2 className="text-[clamp(1.5rem,3vw,3rem)] font-light uppercase tracking-tighter">Best Sellers</h2>
           <AnimatedButton variant="text">View All</AnimatedButton>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {items.map((item, i) => (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group"
             >
               <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                 <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
               </div>
               <div className="mt-4 flex items-center justify-between">
                 <div>
                   <h3 className="text-sm uppercase tracking-[0.2em]">{item.title}</h3>
                   <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">${item.price}</p>
                 </div>
                 <AnimatedButton variant="solid" className="px-4 py-2">Add</AnimatedButton>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 }
