import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CartProvider from "@/components/cart/CartProvider";
import RouteTracker from "@/components/RouteTracker";
import FloatingContactButtons from "@/components/ui/FloatingContactButtons";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Khushi Chauhan Designer Studio | High-end Luxury Fashion",
  description:
    "Discover the epitome of high-end luxury fashion at Khushi Chauhan Designer Studio. Explore our exclusive collection of meticulously crafted garments, blending timeless elegance with contemporary design. Experience unparalleled craftsmanship and sophistication in every piece, tailored to elevate your style and make a statement. Shop now for a truly luxurious fashion experience.",
  icons: {
    icon: [{ url: "/images/logo.png" }],
    shortcut: [{ url: "/images/logo.png" }],
    apple: [{ url: "/images/logo.png" }],
  },
};

import Script from "next/script";

import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${playfairDisplay.variable} antialiased bg-black text-primary font-sans`}
        suppressHydrationWarning={true}
      >
        <ToastProvider>
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive"
          />
          <CartProvider>
            <RouteTracker />
            <SmoothScroll />
            <Navbar />
            {children}
            <Footer />
            <FloatingContactButtons />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
