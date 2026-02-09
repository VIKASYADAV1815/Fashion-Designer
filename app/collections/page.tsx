import CollectionHero from "./components/CollectionHero";
import CollectionList from "./components/CollectionList";
import Image from "next/image";
import Link from "next/link";

export default function CollectionsPage() {
  return (
    <main className="bg-white">
      <CollectionHero />
      <section className="py-16 md:py-24 text-black">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter">Studio Overview</h2>
              <p className="mt-5 text-sm md:text-base text-neutral-600 leading-relaxed">
                Crafting luxury ethnic wear where traditional hand‑craft meets modern silhouettes.
                Explore lookbooks, campaign stories, and shop curated pieces across our core lines.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/shop" className="text-[11px] uppercase tracking-[0.3em] border border-black px-5 py-3 hover:bg-black hover:text-white transition-colors">Shop</Link>
                <Link href="/about" className="text-[11px] uppercase tracking-[0.3em] border border-black/30 px-5 py-3 hover:bg-black hover:text-white transition-colors">About</Link>
                <Link href="/collections" className="text-[11px] uppercase tracking-[0.3em] border border-black/30 px-5 py-3 hover:bg-black hover:text-white transition-colors">Lookbook</Link>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              <div className="relative aspect-4/5 overflow-hidden bg-neutral-100">
                <Image src="/images/img7.png" alt="Studio Visual 1" fill sizes="(max-width:1024px) 90vw, 35vw" className="object-cover" />
              </div>
              <div className="relative aspect-4/5 overflow-hidden bg-neutral-100">
                <Image src="/images/4.jpg" alt="Studio Visual 2" fill sizes="(max-width:1024px) 90vw, 35vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <CollectionList />
    </main>
  );
}
