export default function ShippingPolicyPage() {
  return (
    <main className="bg-black text-white pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-light uppercase tracking-tighter mb-6">Shipping Policy</h1>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-10">Reliable and secure delivery</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Methods</h2>
            <p className="text-sm leading-loose">We ship via trusted carriers with tracking. Express and standard options available.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Processing</h2>
            <p className="text-sm leading-loose">Orders processed within 1–2 business days. Made-to-order items have bespoke timelines.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">International</h2>
            <p className="text-sm leading-loose">International duties and taxes may apply. We provide transparent estimates at checkout.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
