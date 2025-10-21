'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#0058FF]/5 via-white to-[#FF7A00]/5"
          style={{ y: backgroundY }}
        />
        
        {/* 3D Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 border-4 border-[#0058FF]/20 rounded-3xl"
          animate={{ 
            y: [0, -40, 0],
            rotateZ: [0, 5, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-[#FF7A00]/10 to-[#0058FF]/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Main Content */}
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="mb-8"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-black mb-6 font-['Poppins'] bg-gradient-to-r from-[#0058FF] via-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent"
              style={{ y: textY }}
              animate={{ 
                backgroundPosition: ['0%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              WINGS EXP
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-12 font-['Inter'] tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Premium Textile Trading Excellence
            </motion.p>
          </motion.div>

          {/* Animated CTA Buttons */}
          <motion.div 
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#0058FF] to-[#0045CC] text-white rounded-2xl font-['Inter'] font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(0, 88, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Collection
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-white text-[#0058FF] border-2 border-[#0058FF] rounded-2xl font-['Inter'] font-semibold text-lg shadow-xl hover:bg-[#0058FF] hover:text-white transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-3 border-[#0058FF] rounded-full flex justify-center mx-auto relative"
              animate={{ 
                borderColor: ['#0058FF', '#FF7A00', '#0058FF']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-[#0058FF] to-[#FF7A00] rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <motion.p 
              className="text-gray-600 text-sm mt-2 font-['Inter']"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to Explore
            </motion.p>
          </motion.div>
        </div>

        {/* Particle Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Enhanced About Overview */}
      <section className="py-32 px-4 md:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-16">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative"
            >
              <motion.div
                className="absolute -left-8 -top-8 w-24 h-24 bg-gradient-to-br from-[#0058FF] to-[#FF7A00] rounded-2xl opacity-10"
                animate={{ 
                  rotate: [0, 90, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <motion.h2 
                className="text-5xl md:text-6xl font-black text-gray-900 mb-8 font-['Poppins'] leading-tight"
                variants={fadeInUp}
              >
                Crafting Textile
                <span className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent block">Excellence</span>
              </motion.h2>
              
              <motion.div variants={fadeInUp}>
                <p className="text-xl text-gray-700 mb-6 font-['Inter'] leading-relaxed">
                  WINGS EXP TEXTILE TRADING CO LLC stands as a beacon of excellence in the global textile industry. 
                  With decades of combined expertise, we bridge traditional craftsmanship with innovative textile solutions.
                </p>
                <p className="text-xl text-gray-700 font-['Inter'] leading-relaxed">
                  Our commitment to quality, sustainability, and customer satisfaction has positioned us as a trusted 
                  partner for businesses worldwide seeking premium textile products and unparalleled service.
                </p>
              </motion.div>

              {/* Stats Mini */}
              <motion.div 
                className="grid grid-cols-3 gap-6 mt-12"
                variants={fadeInUp}
              >
                {[
                  { number: '25+', label: 'Years' },
                  { number: '50+', label: 'Countries' },
                  { number: '1K+', label: 'Clients' }
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center group cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-2xl font-bold text-[#0058FF] font-['Poppins'] mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-600 text-sm font-['Inter']">{stat.label}</div>
                    <motion.div 
                      className="h-0.5 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full mt-2 mx-auto"
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      whileHover={{ width: '80%' }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Vision & Mission Section */}
      <section className="py-32 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,88,255,0.1)_1px,transparent_0)] bg-[length:40px_40px]"
            animate={{ 
              x: [0, -40, 0],
              y: [0, -40, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-center text-gray-900 mb-20 font-['Poppins']"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">Philosophy</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Our Vision",
                description: "To revolutionize the textile industry through innovation, sustainability, and exceptional quality, creating fabrics that inspire and endure for generations to come.",
                icon: "👁️",
                gradient: "from-[#0058FF] to-[#0045CC]",
                delay: 0.2
              },
              {
                title: "Our Mission", 
                description: "To deliver superior textile solutions through ethical practices, cutting-edge technology, and unwavering commitment to our clients success across global markets.",
                icon: "🎯",
                gradient: "from-[#FF7A00] to-[#FF5500]",
                delay: 0.4
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: card.delay }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000
                }}
              >
                {/* Main Card */}
                <motion.div
                  className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 h-full overflow-hidden"
                  animate={{
                    rotateX: hoveredCard === index ? 5 : 0,
                    rotateY: hoveredCard === index ? 3 : 0,
                    y: hoveredCard === index ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Animated Icon Container */}
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                        whileHover={{ 
                          rotate: 360,
                          transition: { duration: 0.6 }
                        }}
                      >
                        {card.icon}
                      </motion.div>
                      <motion.div
                        className={`absolute -inset-2 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`}
                      />
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 font-['Poppins']">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg font-['Inter'] flex-grow">
                      {card.description}
                    </p>
                    
                    {/* Animated Progress Bar */}
                    <motion.div
                      className="w-full h-1 bg-gray-200 rounded-full mt-6 overflow-hidden"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: card.delay + 0.2 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${card.gradient} rounded-full`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: card.delay + 0.4 }}
                        whileHover={{ scaleX: 1.1 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500 -z-10`}
                  animate={{
                    scale: hoveredCard === index ? 1.02 : 1,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-32 px-4 md:px-8 bg-white relative overflow-hidden">
        {/* Background Animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#0058FF]/5 to-[#FF7A00]/5"
          animate={{ 
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-20 font-['Poppins']"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Global <span className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">Excellence</span>
          </motion.h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '50+', label: 'Countries Served', suffix: '' },
              { number: '1000', label: 'Happy Clients', suffix: '+' },
              { number: '25', label: 'Years Experience', suffix: '+' },
              { number: '50M', label: 'Meters Shipped', suffix: '+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer relative"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Background Card */}
                <motion.div 
                  className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 88, 255, 0.1)"
                  }}
                />
                
                <div className="relative z-10 p-6">
                  <motion.div
                    className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent font-['Poppins'] mb-3"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.15 }}
                  >
                    {stat.number}<span className="text-[#FF7A00]">{stat.suffix}</span>
                  </motion.div>
                  <div className="text-gray-600 font-['Inter'] font-medium text-sm md:text-base">{stat.label}</div>
                  
                  {/* Animated Underline */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full mt-4 mx-auto"
                    initial={{ width: 0 }}
                    whileInView={{ width: '40%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    whileHover={{ width: '60%' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}