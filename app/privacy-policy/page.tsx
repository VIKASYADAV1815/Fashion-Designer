import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-zinc-700 min-h-screen flex font-sans selection:bg-zinc-100 relative">

      {/* LEFT SIDE: Branded Ticker - Refined weight and subtle border */}
      <aside className="hidden md:flex w-14 border-r border-zinc-200 flex-col overflow-hidden sticky top-0 h-screen bg-white z-20">
        <div className="flex flex-col items-center pt-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center py-16 gap-20">
              <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] uppercase tracking-[0.6em] font-semibold text-zinc-400 whitespace-nowrap">
                khushi chauhan designer studio
              </span>
              <div className="h-12 w-px bg-zinc-100"></div>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT SIDE: Content Area */}
      <div className="flex-1 overflow-visible">
        <div className="max-w-5xl w-full mx-auto px-8 md:px-16 pt-32 pb-32">
          
          {/* Header - Sophisticated balance */}
          <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-12 gap-8">
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-zinc-900 mb-4 uppercase">
                Privacy <span className="font-bold">Policy</span>
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-400 font-semibold">
                Ethical data handling & user sovereignty
              </p>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="text-[11px] md:text-[12px] uppercase tracking-widest font-bold text-zinc-800">Effective Date</span>
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 font-medium">March 1, 2025</span>
            </div>
          </header>

          <div className="space-y-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  Introduction
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  At Khushi Chauhan Designer Studio, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website and make purchases. By using our website khushichauhandesignerstudio.com, you consent to the practices described in this policy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  1. Information We Collect
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-8">
                <div>
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800">Personal Information</h3>
                  <p className="text-base md:text-lg leading-relaxed text-zinc-500 max-w-2xl">
                    When you create an account, place an order, or sign up for our newsletter, we collect personal information such as:
                  </p>
                  <ul className="mt-4 space-y-2 text-base md:text-lg text-zinc-600">
                    <li>Name : Khushi Chauhan</li> 
                    <li>Email address : khushichauhan2003@gmail.com</li>
                    <li>Phone number : +91 9810088228</li>
                    <li>Billing and shipping addresses : Dehradun, Uttarakhand, India</li>
                    <li>Payment information (credit/debit card details, etc.) : 1234 5678 9012 3456</li>
                  </ul>
                </div>
                {/* <div className="pt-6 border-t border-zinc-100">
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-800">Non‑Personal Information</h3>
                  <p className="text-base md:text-lg leading-relaxed text-zinc-500 max-w-2xl">
                    We also collect non‑personal information such as:
                  </p>
                  <ul className="mt-4 space-y-2 text-base md:text-lg text-zinc-600">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Operating system</li>
                    <li>Device type</li>
                    <li>Browsing activity on our site (pages visited, time spent, etc.)</li>
                  </ul>
                </div> */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  2. How We Use Your Information
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <ul className="space-y-3 text-base md:text-lg text-zinc-600 max-w-2xl">
                  <li>Order processing: To fulfill your orders and provide customer support.</li>
                  <li>Payment processing: To process payments and prevent fraud.</li>
                  <li>Shipping: To deliver products to your shipping address.</li>
                  <li>Account management: To create and maintain your account on our website.</li>
                  <li>Communication: To send order confirmations, updates, and promotional emails if you opt in to receive them.</li>
                  <li>Improvement of services: To analyze and improve our website, products, and customer service.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  3. How We Protect Your Information
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <ul className="space-y-3 text-base md:text-lg text-zinc-600 max-w-2xl">
                  <li>Encryption: All sensitive payment information is transmitted via secure socket layer (SSL) technology and is encrypted into our payment gateway provider&#39;s database.</li>
                  <li>Access control: Only authorized personnel have access to personal information, and we ensure that they are trained on the importance of privacy and data protection.</li>
                  <li>Data retention: We store personal information only as long as necessary to provide services or as required by law.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  4. Sharing Your Information
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-6">
                <p className="text-base md:text-lg text-zinc-600 max-w-2xl">
                  We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following situations:
                </p>
                <ul className="space-y-3 text-base md:text-lg text-zinc-600 max-w-2xl">
                  <li>Service Providers: We may share your information with trusted third‑party service providers who assist us in operating our website, processing payments, shipping orders, and providing customer service. These parties are obligated to keep your information confidential and are not allowed to use it for any other purposes.</li>
                  <li>Legal Requirements: We may disclose your information if required to do so by law, in response to a court order or legal process, or to protect our rights, property, or safety.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  5. Cookies and Tracking Technologies
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-6">
                <p className="text-base md:text-lg text-zinc-600 max-w-2xl">
                  We use cookies and similar tracking technologies to enhance your browsing experience on our website. Cookies are small files that are stored on your device and help us recognize you when you return to our site.
                </p>
                <div>
                  <p className="text-base md:text-lg text-zinc-600 max-w-2xl">Types of Cookies We Use:</p>
                  <ul className="mt-3 space-y-2 text-base md:text-lg text-zinc-600">
                    <li>Necessary Cookies: Essential for website functionality (e.g., shopping cart).</li>
                    <li>Performance Cookies: Collect information about how you use our website to improve functionality and performance.</li>
                    <li>Targeting/Advertising Cookies: Used to deliver personalized ads and measure their effectiveness.</li>
                  </ul>
                </div>
                <p className="text-base md:text-lg text-zinc-600 max-w-2xl">
                  You can control the use of cookies through your browser settings. However, disabling cookies may affect your experience on our website.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  6. Third‑Party Links
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Our website may contain links to third‑party websites. These websites have their own privacy policies, which we encourage you to review. We are not responsible for the content or practices of these third‑party sites.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  7. Your Rights and Choices
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8 space-y-6">
                <ul className="space-y-3 text-base md:text-lg text-zinc-600 max-w-2xl">
                  <li>Access: You can request access to the personal information we hold about you.</li>
                  <li>Correction: You can request corrections to any inaccurate or incomplete personal information.</li>
                  <li>Deletion: You can request the deletion of your personal information, subject to certain limitations.</li>
                  <li>Opt‑out of Marketing Communications: If you no longer wish to receive promotional emails from us, you can unsubscribe at any time by clicking the &quot;unsubscribe&quot; link in any of our marketing emails or by contacting us directly.</li>
                </ul>
                <p className="text-base md:text-lg text-zinc-600">
                  To exercise any of these rights, please contact us at <a className="underline font-semibold" href="mailto:support@khushichauhan.com">support@khushichauhan.com</a>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  8. Children&#8217;s Privacy
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  Our website is not intended for use by individuals under the age of 18, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 18, we will take steps to remove that information as quickly as possible.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  9. International Data Transfers
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  If you are located outside of India, please note that your personal information may be transferred to and processed in India, where our servers are located. By using our website and providing your information, you consent to the transfer of your data to a country with different data protection laws.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 text-zinc-400">
                <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold md:sticky md:top-24">
                  10. Changes to This Privacy Policy
                </h2>
              </div>
              <div className="md:col-span-8 border-l border-zinc-200 pl-8">
                <p className="text-base md:text-lg leading-relaxed max-w-2xl text-zinc-600">
                  We reserve the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page, and the &quot;Effective Date&quot; at the top will be updated accordingly. We encourage you to review this policy periodically for any updates.
                </p>
              </div>
            </div>

          </div>

          <footer className="mt-40 border-t border-zinc-200 pt-8 flex justify-between items-center">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-zinc-300 font-medium">© 2026 Studio Khushi Chauhan</p>
            <div className="flex gap-2">
               <div className="w-1 h-1 rounded-full bg-zinc-200"></div>
               <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
