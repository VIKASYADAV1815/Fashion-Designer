export default function ReturnPolicyPage() {
  return (
    <main className="bg-black text-white pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-light uppercase tracking-tighter mb-6">Return Policy</h1>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-10">Simple, transparent returns</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Window</h2>
            <p className="text-sm leading-loose">Returns accepted within 14 days of delivery. Items must be in original condition with packaging.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Method</h2>
            <p className="text-sm leading-loose">Use prepaid return labels available in your account or contact support for assistance.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Inspection</h2>
            <p className="text-sm leading-loose">All returns are inspected upon receipt. Approved returns are processed within 5–7 business days.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
