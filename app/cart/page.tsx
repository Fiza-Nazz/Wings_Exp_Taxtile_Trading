"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { products } from "../services/data";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  features?: string[];
  category?: string;
  rating?: number;
  inStock?: boolean;
}

// Complete cart utility functions (same as in services.tsx)
const cartUtils = {
  getCartItems: (): number[] => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('cartItems') || '[]');
      } catch {
        return [];
      }
    }
    return [];
  },

  addToCart: (id: number): void => {
    if (typeof window !== 'undefined') {
      try {
        const currentItems = cartUtils.getCartItems();
        if (!currentItems.includes(id)) {
          const updatedItems = [...currentItems, id];
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
          window.dispatchEvent(new Event('cartUpdated'));
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  },

  removeFromCart: (id: number): void => {
    if (typeof window !== 'undefined') {
      try {
        const currentItems = cartUtils.getCartItems();
        const updatedItems = currentItems.filter(itemId => itemId !== id);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        window.dispatchEvent(new Event('cartUpdated'));
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    }
  },

  clearCart: (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cartItems', JSON.stringify([]));
        window.dispatchEvent(new Event('cartUpdated'));
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  }
};

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Load cart items from localStorage with real-time updates
  useEffect(() => {
    const loadCartData = () => {
      try {
        const storedCartItems = cartUtils.getCartItems();
        setCartItems(storedCartItems);
        
        // Filter products to only show cart items
        const cartProductsData = products.filter((product: Product) => 
          storedCartItems.includes(product.id)
        );
        setCartProducts(cartProductsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading cart data:', error);
        setIsLoading(false);
      }
    };

    // Load immediately
    loadCartData();

    // Listen for cart updates
    window.addEventListener('cartUpdated', loadCartData);

    return () => {
      window.removeEventListener('cartUpdated', loadCartData);
    };
  }, []);

  const handleRemoveFromCart = (id: number) => {
    cartUtils.removeFromCart(id);
    // The cartUpdated event will trigger the state update
  };

  const handleContinueShopping = () => {
    router.push('/services');
  };

  const handleCheckout = async () => {
    if (cartProducts.length === 0) {
      console.log('No items in cart');
      return;
    }

    setIsCheckoutLoading(true);

    try {
      // Prepare cart items for Stripe
      const lineItems = cartProducts.map((product) => {
        const quantity = cartItems.filter((itemId) => itemId === product.id).length;
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
        };
      });

      const body = {
        items: lineItems,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cart`,
      };

      console.log('Sending checkout request with body:', body);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Stripe session created:', data);

      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error('No URL returned from Stripe');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      const price = parseFloat(product.price.replace('$', '').replace(',', ''));
      return total + price;
    }, 0);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] mx-auto mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.h2 
            className="text-2xl font-bold text-gray-800"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Your Cart...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#0058FF]/10 to-[#FF7A00]/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Shopping</span>
        </motion.button>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-['Poppins'] mb-4">
            Your <span className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">Cart</span>
          </h1>
          <p className="text-gray-600 text-lg font-['Inter'] max-w-2xl mx-auto">
            {cartProducts.length > 0 
              ? `You have ${cartProducts.length} item${cartProducts.length > 1 ? 's' : ''} in your cart`
              : "Review your selected premium products and proceed to checkout"
            }
          </p>
        </motion.div>

        {/* Cart Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartProducts.length === 0 ? (
              <motion.div
                className="text-center py-20 bg-white border-2 border-gray-100 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Discover our premium collection and add some exceptional products to your cart.
                </p>
                <motion.button
                  onClick={handleContinueShopping}
                  className="px-8 py-4 bg-gray-900 text-white font-semibold border-2 border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {cartProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="bg-white border-2 border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ y: -4 }}
                    layout
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="sm:w-48 h-48 flex-shrink-0 bg-gray-50">
                        <motion.img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <motion.h3 
                            className="text-xl font-bold text-gray-900 font-['Poppins']"
                            whileHover={{ color: "#0058FF" }}
                          >
                            {product.title}
                          </motion.h3>
                          <motion.button
                            onClick={() => handleRemoveFromCart(product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 font-['Inter'] line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Features */}
                        <div className="space-y-1 mb-4">
                          {product.features?.slice(0, 2).map((feature, fIndex) => (
                            <motion.div
                              key={fIndex}
                              className="flex items-center text-xs text-gray-500"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: fIndex * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full mr-3" />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <motion.div
                            className="text-2xl font-black text-[#0058FF]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            {product.price}
                          </motion.div>
                          
                          {product.rating && (
                            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                              <span className="text-yellow-400">⭐</span>
                              <span className="text-gray-900 text-sm font-semibold">({product.rating})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartProducts.length > 0 && (
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white border-2 border-gray-100 rounded-lg p-6 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-['Poppins'] border-b border-gray-200 pb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cartProducts.length})</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <motion.button
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading}
                    className="w-full py-4 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white font-bold border-2 border-transparent hover:from-[#FF7A00] hover:to-[#0058FF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCheckoutLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleContinueShopping}
                    className="w-full py-4 bg-transparent text-gray-700 border-2 border-gray-300 font-semibold hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
                
                <motion.p 
                  className="text-xs text-gray-500 text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Free shipping on all orders over $50. 30-day return policy.
                </motion.p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;