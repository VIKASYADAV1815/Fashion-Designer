'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center p-4 font-sans">
      <Confetti width={dimensions.width} height={dimensions.height} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="bg-white text-center p-10 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h1 className="text-4xl font-serif text-stone-900 mb-4">Thank You!</h1>
        <p className="text-stone-600 mb-6">Your order has been placed successfully.</p>
        {orderId && (
          <p className="text-sm text-stone-500 mb-8">
            Your Order ID is: <span className="font-bold text-stone-700">{orderId}</span>
          </p>
        )}
        <Link
          href="/shop"
          className="inline-block text-white bg-stone-900 hover:bg-stone-800 px-6 py-3 rounded-md text-sm font-medium transition-colors"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </main>
  );
}

function OrderSuccessFallback() {
  return (
    <main className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center p-4 font-sans">
      <div className="bg-white text-center p-10 rounded-lg shadow-lg max-w-lg w-full animate-pulse">
        <div className="h-10 bg-stone-200 rounded mb-4 w-3/4 mx-auto" />
        <div className="h-4 bg-stone-100 rounded mb-6 w-full" />
        <div className="h-8 bg-stone-200 rounded w-1/2 mx-auto" />
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessFallback />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
