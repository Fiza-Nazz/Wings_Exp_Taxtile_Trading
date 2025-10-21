"use client";
import React from "react";

export default function SuccessPage() {
  // Optionally: clear cart now
  React.useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("cartItems", JSON.stringify([]));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">Thank you — Payment successful!</h1>
        <p className="text-gray-600 mb-6">Your order is confirmed. We'll email you the receipt shortly.</p>
        <a href="/" className="px-6 py-3 bg-[#0058FF] text-white rounded-lg">Continue Shopping</a>
      </div>
    </div>
  );
}
