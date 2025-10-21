"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { products } from "../data"; // ✅ Correct relative path for your data file
import { ArrowLeft, ShoppingCart, Heart, Star, Eye } from "lucide-react";

interface EnhancedProduct {
  id: number;
  title: string;
  description?: string;
  image: string;
  price: string;
  features?: string[];
  rating?: number;
  inStock?: boolean;
}

const ProductDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<EnhancedProduct | null>(null);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(() => {
      const foundProduct = products.find(
        (p: EnhancedProduct) => p.id === Number(id)
      );
      if (foundProduct) {
        setProduct({
          ...foundProduct,
          rating: Math.floor(Math.random() * 5) + 1,
          inStock: Math.random() > 0.2,
        });
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = (productId: number, quantity = 1) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity,
    }));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleWishlist = () => {
    console.log("Added to wishlist:", product?.title);
  };

  // ✅ Animation Variants with proper TypeScript typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 0.46, 0.38, 0.98] },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-[#0058FF]/20 border-t-[#0058FF] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-['Inter']">Loading product details...</p>
        </motion.div>
      </div>
    );
  }

  // ✅ Product Not Found
  if (!product) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-500">
          <h1 className="text-4xl font-bold mb-4">Product Not Found 😢</h1>
          <motion.button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300 transition-all duration-300 border border-gray-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" /> Go Back
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ✅ Main Product Page
  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#0058FF]/20 to-[#FF7A00]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        onClick={handleBack}
        className="fixed top-6 left-6 z-30 p-3 bg-white shadow-md rounded-md border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
        <span className="text-gray-700 font-semibold">Back</span>
      </motion.button>

      <div className="max-w-6xl mx-auto p-6 md:p-10 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ✅ Image Section */}
          <motion.div
            className="relative group"
            variants={itemVariants}
            whileHover={{ y: -10 }}
          >
            <div className="relative overflow-hidden rounded-md border-2 border-gray-200 bg-gray-50 shadow-md">
              <AnimatePresence>
                {imageLoaded ? (
                  <motion.img
                    key="image"
                    src={product.image}
                    alt={product.title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                  />
                ) : (
                  <motion.div
                    key="loader"
                    className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    onAnimationComplete={() => setImageLoaded(true)}
                  >
                    <div className="w-24 h-24 border-4 border-[#0058FF]/20 border-t-[#0058FF] rounded-full animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ✅ Wishlist & Quick View */}
              <motion.div
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center gap-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <button
                  onClick={handleWishlist}
                  className="p-3 bg-white hover:bg-gray-100 rounded-md transition-all duration-300 border border-gray-300 shadow-md"
                  title="Wishlist"
                >
                  <Heart className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  className="p-3 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] hover:from-[#FF7A00] hover:to-[#0058FF] rounded-md transition-all duration-300 border border-transparent shadow-lg"
                  title="Quick View"
                >
                  <Eye className="w-6 h-6 text-white" />
                </button>
              </motion.div>
            </div>

            {/* ✅ Stock Badge */}
            <motion.div
              className={`absolute -top-2 -right-2 px-3 py-1 rounded-md text-xs font-bold shadow-lg border border-white ${
                product.inStock ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {product.inStock ? "In Stock" : "Low Stock"}
            </motion.div>
          </motion.div>

          {/* ✅ Details Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 bg-white p-6 rounded-md border border-gray-200 shadow-lg"
          >
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < (product.rating || 0)
                      ? "text-[#FF7A00] fill-[#FF7A00]"
                      : "text-gray-400"
                  }`}
                />
              ))}
              <span className="text-gray-600 text-sm font-semibold">
                ({product.rating}/5)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description ||
                "Premium quality textile product crafted for global export excellence."}
            </p>

            {/* Price */}
            <div className="text-4xl font-black text-[#0058FF] border-b border-gray-200 pb-4">
              {product.price}
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Key Features
              </h3>
              <ul className="space-y-2">
                {(product.features || []).slice(0, 5).map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600 text-sm border-l-2 border-gray-200 pl-4 py-1"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full mr-3 flex-shrink-0 -ml-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() =>
                  cart[product.id]
                    ? handleRemoveFromCart(product.id)
                    : handleAddToCart(product.id)
                }
                className={`flex-1 py-4 font-bold text-sm rounded-md shadow-lg transition-all duration-400 flex items-center justify-center gap-2 border-2 ${
                  cart[product.id]
                    ? "bg-gray-300 hover:bg-gray-400 text-gray-700 border-gray-400"
                    : "bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white border-transparent hover:from-[#FF7A00] hover:to-[#0058FF]"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cart[product.id]
                  ? `Remove (${cart[product.id]})`
                  : "Add to Cart"}
              </button>
              <button
                onClick={handleWishlist}
                className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-semibold transition-all duration-300 border-2 border-gray-300 flex items-center gap-2 shadow-md"
              >
                <Heart className="w-5 h-5 text-gray-700" />
                Wishlist
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;