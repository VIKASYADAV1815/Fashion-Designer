export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-black pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-[clamp(2rem,4vw,4rem)] font-light uppercase tracking-tighter mb-6 text-black">
            Privacy Policy
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 border-b border-black/10 pb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Your privacy, our commitment
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Last Updated: February 3, 2026
            </p>
          </div>
        </header>

        <div className="space-y-16 text-gray-700">
          {/* Section 1: Overview */}
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-4 text-black font-medium">Introduction</h2>
            <p className="text-sm leading-loose">
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our platform. We operate on a principle of transparency and minimal data retention to ensure your digital footprint remains secure and private.
            </p>
          </section>

          {/* Section 2: Collection */}
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-4 text-black font-medium">Information We Collect</h2>
            <div className="space-y-4 text-sm leading-loose">
              <p>
                <strong className="text-black font-semibold uppercase tracking-wide text-[10px]">Direct Information /</strong> We collect personal information you provide such as name, email, shipping address, and payment details (processed via secure encryption) to fulfill purchases and provide customer support.
              </p>
              <p>
                <strong className="text-black font-semibold uppercase tracking-wide text-[10px]">Device Information /</strong> When you visit the site, we automatically collect certain information about your device, including your web browser, IP address, time zone, and some of the cookies that are installed on your device.
              </p>
            </div>
          </section>

          {/* Section 3: Usage */}
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-4 text-black font-medium">How We Use Your Data</h2>
            <ul className="text-sm leading-loose list-none space-y-3">
              <li className="flex gap-4 border-l border-black/10 pl-4">
                <span>To process transactions and deliver products effectively.</span>
              </li>
              <li className="flex gap-4 border-l border-black/10 pl-4">
                <span>To communicate with you regarding order updates or security alerts.</span>
              </li>
              <li className="flex gap-4 border-l border-black/10 pl-4">
                <span>To screen for potential risk or fraud.</span>
              </li>
              <li className="flex gap-4 border-l border-black/10 pl-4">
                <span>To optimize our interface based on how users interact with our content.</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Security */}
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-4 text-black font-medium">Data Security</h2>
            <p className="text-sm leading-loose">
              We do not sell, rent, or trade your personal information to third parties. We only share your Personal Information with trusted third-party service providers to help us use your Personal Information as described above. We employ Industry-standard SSL encryption to protect data in transit.
            </p>
          </section>

          {/* Section 5: Rights & Contact */}
          <section>
            <h2 className="text-lg uppercase tracking-[0.2em] mb-4 text-black font-medium">Your Rights</h2>
            <p className="text-sm leading-loose mb-8">
              You have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. To exercise these rights, please reach out through our dedicated channel.
            </p>
            <div className="p-8 bg-gray-50 border border-gray-100 inline-block min-w-[300px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Legal Inquiries</p>
              <p className="text-sm font-medium tracking-tight">privacy@yourdomain.com</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}