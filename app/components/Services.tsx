"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { products } from "../services/data";

// Enhanced product interface
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

// Cart utility functions
const cartUtils = {
  getCartItems: (): number[] => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('cartItems') || '[]');
    }
    return [];
  },

  addToCart: (id: number): void => {
    if (typeof window !== 'undefined') {
      const currentItems = cartUtils.getCartItems();
      const updatedItems = [...currentItems, id];
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  },

  removeFromCart: (id: number): void => {
    if (typeof window !== 'undefined') {
      const currentItems = cartUtils.getCartItems();
      const updatedItems = currentItems.filter(itemId => itemId !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  },

  clearCart: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  }
};

const Services = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Initialize cart items from localStorage
  useEffect(() => {
    setCartItems(cartUtils.getCartItems());
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product: Product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a: Product, b: Product) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case "price-high":
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.id - b.id;
      }
    });

  // Categories
  const categories = ["all", "premium", "luxury", "basic", "exclusive"];

  // Animation variants with proper TypeScript typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Handlers
  const handleViewDetails = (id: number) => {
    router.push(`/services/${id}`);
  };

  const handleAddToCart = (id: number) => {
    cartUtils.addToCart(id);
    setCartItems(prev => [...prev, id]);
    showNotification("Product added to cart!", "success");
    // Redirect to cart page after a short delay to show notification
    setTimeout(() => {
      router.push('/cart');
    }, 500);
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    showNotification(
      favorites.includes(id) ? "Removed from favorites" : "Added to favorites", 
      "success"
    );
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loading skeleton
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
            Loading Premium Collection...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section - White Theme */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Geometric Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-[#0058FF]/10"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-[#FF7A00]/5 to-[#0058FF]/5"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute top-40 right-1/4 w-16 h-16 border border-[#0058FF]/20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-8xl font-black mb-8 text-gray-900 font-['Poppins'] tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">
              PREMIUM
            </span>
            <br />
            <span className="text-gray-800">COLLECTION</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-light text-gray-600 mb-12 font-['Inter'] tracking-wide max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover unparalleled quality in textile excellence. Where innovation meets timeless elegance.
          </motion.p>
          
          <motion.div
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              className="px-12 py-4 bg-gray-900 text-white font-bold text-lg border-2 border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-300 group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                y: -3
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore Collection</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
            
            <motion.button
              className="px-12 py-4 bg-transparent text-gray-900 border-2 border-gray-300 font-bold text-lg hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              View Lookbook
            </motion.button>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-400 mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Advanced Filter Section */}
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-center">
            {/* Category Filters */}
            <motion.div
              className="flex gap-3 flex-wrap justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-6 py-3 font-semibold text-sm tracking-wide transition-all border-2 ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Sort and View Options */}
            <motion.div
              className="flex gap-4 items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <select
                className="px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 focus:outline-none focus:border-[#0058FF] focus:ring-1 focus:ring-[#0058FF] transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid - Sharp White Design */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <AnimatePresence>
              {filteredProducts.map((item: Product, index) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={itemVariants}
                  className="group relative bg-white border-2 border-gray-100 hover:border-gray-300 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  whileHover={{ 
                    scale: 1.02,
                    y: -8,
                    rotateY: 3
                  }}
                  style={{ perspective: 1000 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  {/* Favorite & Badge Container */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <motion.button
                      className="p-2 bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-red-400 transition-colors"
                      onClick={() => handleToggleFavorite(item.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <motion.span
                        animate={{ 
                          scale: favorites.includes(item.id) ? [1, 1.3, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {favorites.includes(item.id) ? "❤️" : "🤍"}
                      </motion.span>
                    </motion.button>
                    
                    {item.inStock === false && (
                      <motion.div
                        className="px-3 py-1 bg-red-500 text-white text-xs font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        SOLD OUT
                      </motion.div>
                    )}
                  </div>

                  {/* Image Container with 3D Effect */}
                  <div className="relative h-64 overflow-hidden bg-gray-50 border-b border-gray-100">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ 
                        scale: 1.08,
                        rotateZ: 0.3
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Price Tag */}
                    <motion.div
                      className="absolute bottom-4 left-4 bg-white text-gray-900 px-4 py-2 border-2 border-gray-900 font-bold shadow-lg"
                      initial={{ scale: 0, x: -20 }}
                      whileInView={{ scale: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {item.price}
                    </motion.div>
                    
                    {/* Rating */}
                    {item.rating && (
                      <motion.div
                        className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-gray-900 text-sm font-semibold">({item.rating})</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 bg-white relative z-10">
                    <motion.h3 
                      className="text-lg font-bold text-gray-900 mb-3 font-['Poppins'] group-hover:text-[#0058FF] transition-colors duration-300 border-b border-gray-100 pb-3"
                      whileHover={{ x: 3 }}
                    >
                      {item.title}
                    </motion.h3>
                    
                    <p className="text-gray-600 text-sm mb-4 font-['Inter'] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Features with Minimal Design */}
                    <div className="space-y-2 mb-6">
                      {item.features?.slice(0, 3).map((feature, fIndex) => (
                        <motion.div
                          key={fIndex}
                          className="flex items-center text-xs text-gray-500"
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: fIndex * 0.1 }}
                          whileHover={{ x: 3, color: "#0058FF" }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:bg-[#0058FF] transition-colors"
                            whileHover={{ scale: 1.3 }}
                          />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Action Buttons - Sharp Design */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleAddToCart(item.id)}
                        className="flex-1 py-3 bg-gray-900 text-white font-semibold text-sm border-2 border-gray-900 hover:bg-white hover:text-gray-900 transition-all duration-300 group relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.02,
                          y: -2
                        }}
                        whileTap={{ scale: 0.98 }}
                        disabled={item.inStock === false}
                      >
                        <span className="relative z-10">
                          {item.inStock === false ? "Out of Stock" : "Add to Cart"}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleViewDetails(item.id)}
                        className="px-4 py-3 bg-transparent text-gray-700 border-2 border-gray-300 font-semibold text-sm hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-[#0058FF] opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"
                    animate={{ 
                      borderColor: [
                        "transparent",
                        "rgba(0, 88, 255, 0.3)",
                        "transparent"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or browse different categories to find what you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Notification System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed top-8 right-8 z-50"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
          >
            <div className={`px-6 py-4 border-2 ${
              notification.type === 'success' 
                ? 'bg-white border-green-500 text-green-700' 
                : 'bg-white border-red-500 text-red-700'
            } font-semibold shadow-xl`}>
              {notification.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;