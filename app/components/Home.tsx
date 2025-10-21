'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

const Home: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0058FF]/10 via-white to-[#FF7A00]/10"></div>
          
          {/* Animated Grid Pattern */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0058FF 1px, transparent 1px),
                linear-gradient(to bottom, #0058FF 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          ></motion.div>

          {/* Floating Orbs */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 left-10 w-64 h-64 bg-[#0058FF]/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-[#FF7A00]/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0058FF]/10 to-[#FF7A00]/10 rounded-full border border-[#0058FF]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#0058FF]" />
              <span className="text-sm font-semibold text-gray-700">Premium Textile Solutions</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#0058FF] to-[#0073FF] bg-clip-text text-transparent">
              We Weave Trust,
            </span>
            <br />
            <span className="text-gray-900">Trade, and Global</span>
            <br />
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#ff8c1a] bg-clip-text text-transparent">
              Textile Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Leading Exporters of Premium Fabrics, Garments & Textile Solutions Worldwide
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="/services"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 88, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-[#0058FF] to-[#0073FF] text-white rounded-xl font-semibold shadow-lg shadow-blue-200/50 flex items-center gap-2 transition-all duration-300"
            >
              Explore Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 122, 0, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border-2 border-[#FF7A00] text-[#FF7A00] rounded-xl font-semibold hover:bg-[#FF7A00] hover:text-white transition-all duration-300"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;