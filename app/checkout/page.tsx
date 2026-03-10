"use client";

import React, { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Lock, Truck } from "lucide-react";

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function CheckoutPage() {
  const { items } = useCart();
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order Finalized:", { formData, items, total: cartTotal });
    alert("Thank you for your order! This is a demo checkout.");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex flex-col items-center justify-center space-y-6">
        <h1 className="text-2xl font-serif text-stone-800">Your cart is empty</h1>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-[0.2em] border-b border-stone-800 pb-1 hover:text-stone-500 transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-stone-800">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Column - Form */}
        <div className="p-6 md:p-12 lg:p-20 lg:border-r border-stone-200">
          <div className="max-w-xl mx-auto space-y-12">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link href="/shop" className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors">
                <ChevronLeft size={14} />
                Return to Shop
              </Link>
              <div className="flex items-center gap-2 text-stone-400">
                <Lock size={14} />
                <span className="text-[10px] uppercase tracking-widest">Secure Checkout</span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-serif text-stone-900">Checkout</h1>
              <p className="text-sm text-stone-500 font-light">Please provide your details to finalize the order.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Contact */}
              <div className="space-y-6">
                <h2 className="text-sm uppercase tracking-[0.2em] font-medium text-stone-900 border-b border-stone-200 pb-2">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="newsletter" className="rounded-sm border-stone-300 text-stone-900 focus:ring-stone-900" />
                    <label htmlFor="newsletter" className="text-xs text-stone-500">Email me with news and offers</label>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-6">
                <h2 className="text-sm uppercase tracking-[0.2em] font-medium text-stone-900 border-b border-stone-200 pb-2">
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                />

                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                />

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                  <div className="relative">
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors text-stone-800 appearance-none"
                    >
                      <option value="" disabled className="text-stone-400">State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="PIN Code"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:border-stone-900 focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-5 text-xs uppercase tracking-[0.25em] hover:bg-stone-800 transition-all duration-300"
                >
                  Complete Order
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-stone-50 p-6 md:p-12 lg:p-20">
          <div className="max-w-xl mx-auto space-y-10 lg:sticky lg:top-20">
            <h2 className="text-2xl font-serif text-stone-900">Order Summary</h2>
            
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 items-start group">
                  <div className="relative w-20 h-24 bg-stone-200 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-stone-900 text-white text-[10px] flex items-center justify-center rounded-full z-10">
                      {item.qty}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-medium text-stone-900">{item.name}</h3>
                    <p className="text-xs text-stone-500 uppercase tracking-wider">{item.id.split('-')[0]}</p>
                  </div>
                  <div className="text-sm font-medium text-stone-900">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-8 space-y-4">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600">
                <span className="flex items-center gap-2">
                  Shipping <Truck size={14} />
                </span>
                <span className="text-stone-900 font-medium">Calculated at next step</span>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-8 flex justify-between items-center">
              <span className="text-lg font-serif text-stone-900">Total</span>
              <div className="text-right">
                <span className="text-xs text-stone-500 block mb-1">INR</span>
                <span className="text-2xl font-medium text-stone-900">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="bg-stone-100 p-4 rounded-sm">
               <p className="text-xs text-stone-500 leading-relaxed text-center">
                 By proceeding, you agree to our Terms of Service and Privacy Policy. All orders are subject to availability.
               </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
