"use client";
import React from "react";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Payment cancelled</h1>
        <p className="text-gray-600 mb-6">You cancelled the checkout. Your cart is safe.</p>
        <a href="/cart" className="px-6 py-3 bg-gray-800 text-white rounded-lg">Return to Cart</a>
      </div>
    </div>
  );
}
