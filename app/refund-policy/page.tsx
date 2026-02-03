export default function RefundPolicyPage() {
  return (
    <main className="bg-black text-white pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-[clamp(2rem,4vw,4rem)] font-light uppercase tracking-tighter mb-6">Refund Policy</h1>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-10">Confidence in every purchase</p>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Eligibility</h2>
            <p className="text-sm leading-loose">Refunds are accepted within 14 days of delivery for unworn items with tags attached.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Process</h2>
            <p className="text-sm leading-loose">Initiate a request via your account or contact support with order details. Approved refunds are issued to the original payment method.</p>
          </section>
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-3">Exceptions</h2>
            <p className="text-sm leading-loose">Made-to-order and final sale items are non-refundable unless defective.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
