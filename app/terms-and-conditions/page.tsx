export default function TermsAndConditionsPage() {
  return (
    <main className="bg-black text-white pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-light uppercase tracking-tighter mb-6">Terms & Conditions</h1>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-10">Please read carefully</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Use of Service</h2>
            <p className="text-sm leading-loose">By using our website, you agree to our policies and guidelines. We reserve the right to update terms at any time.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Orders & Payments</h2>
            <p className="text-sm leading-loose">All orders are subject to acceptance. Payments are processed securely. Pricing may change without notice.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Liability</h2>
            <p className="text-sm leading-loose">We are not liable for indirect or incidental damages beyond statutory rights.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
