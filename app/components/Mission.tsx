// app/components/Mission.tsx
'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import { Brain, Shield, Globe, Award, Zap, Users, Rocket, Target } from "lucide-react";

const Mission = () => {
  const ref = useRef(null);
  const coreValuesRef = useRef(null);
  const visionRef = useRef(null);
  
  // Separate useInView for each section
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isCoreValuesInView = useInView(coreValuesRef, { once: true, margin: "-100px" });
  const isVisionInView = useInView(visionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      y: 80, 
      opacity: 0,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 88, 255, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const statsVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Core values data
  const values = [
    { 
      icon: Brain, 
      title: "Innovation", 
      desc: "Pioneering cutting-edge solutions that redefine industry standards and push technological boundaries.", 
      color: "from-[#0058FF] to-[#00C6FF]",
      stats: "150+ Projects"
    },
    { 
      icon: Shield, 
      title: "Integrity", 
      desc: "Upholding the highest ethical standards in every decision, fostering trust and transparency.", 
      color: "from-[#4ECDC4] to-[#44A08D]",
      stats: "100% Trust"
    },
    { 
      icon: Globe, 
      title: "Global Impact", 
      desc: "Creating scalable solutions that bridge continents and empower diverse communities worldwide.", 
      color: "from-[#FF7A00] to-[#FFB199]",
      stats: "50+ Countries"
    },
    { 
      icon: Award, 
      title: "Excellence", 
      desc: "Delivering unparalleled quality through meticulous craftsmanship and relentless pursuit of perfection.", 
      color: "from-[#6A11CB] to-[#2575FC]",
      stats: "Award Winning"
    }
  ];

  const missionStats = [
    { number: "5M+", label: "Users Empowered", icon: Users },
    { number: "150+", label: "Projects Delivered", icon: Target },
    { number: "98%", label: "Client Satisfaction", icon: Award },
    { number: "24/7", label: "Support Available", icon: Shield }
  ];

  return (
    <div 
      ref={ref}
      className="min-h-screen bg-white overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,88,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,88,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full opacity-5 ${
              i % 2 === 0 ? 'bg-[#0058FF]' : 'bg-[#FF7A00]'
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center min-h-screen">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 font-['Poppins']"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#0058FF] via-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">
              Our Mission
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed max-w-5xl mx-auto font-['Inter'] mb-12 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            To revolutionize the digital landscape through innovative solutions that empower businesses 
            and individuals to achieve their full potential in an ever-evolving technological world.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {missionStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100"
                variants={statsVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  borderColor: "#0058FF"
                }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#0058FF]" />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 font-['Poppins']">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-['Inter'] mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 font-['Inter'] group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF7A00] to-[#0058FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Zap className="w-5 h-5 ml-2 relative z-10 inline" />
            </motion.button>
            
            <motion.button
              className="px-12 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg hover:border-[#0058FF] hover:text-[#0058FF] transition-all duration-300 font-['Inter']"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section ref={coreValuesRef} className="relative z-10 py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isCoreValuesInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={isCoreValuesInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-['Poppins']"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-[#0058FF] via-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">
                Core Values
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']"
              variants={itemVariants}
            >
              Our foundation is built on principles that guide every decision and innovation
            </motion.p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                animate={isCoreValuesInView ? "visible" : "hidden"}
                whileHover="hover"
              >
                <motion.div
                  className="h-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#0058FF]/30 transition-all duration-500 relative overflow-hidden"
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: 2
                  }}
                  style={{ perspective: 1000 }}
                >
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-500"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <value.icon className="w-8 h-8 text-[#0058FF]" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center font-['Poppins']">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center leading-relaxed font-['Inter'] mb-6">
                    {value.desc}
                  </p>

                  {/* Stats */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-sm font-semibold text-[#0058FF] font-['Inter']">
                      {value.stats}
                    </div>
                  </motion.div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#0058FF]/20 transition-all duration-500"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section ref={visionRef} className="relative z-10 py-24 px-6 md:px-12 lg:px-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisionInView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisionInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black font-['Poppins']"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-[#0058FF] via-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">
                Our Vision
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-700 leading-relaxed font-['Inter']"
              variants={itemVariants}
            >
              We envision a future where technology seamlessly integrates with human potential, 
              creating opportunities for growth, innovation, and positive change across all industries.
            </motion.p>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
            >
              {[
                "Empowering businesses with cutting-edge AI solutions",
                "Fostering global collaboration and innovation",
                "Creating sustainable technological advancements",
                "Building trust through transparency and excellence"
              ].map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  variants={itemVariants}
                  whileHover={{ 
                    x: 10,
                    borderColor: "#0058FF"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full" />
                  <span className="text-gray-700 font-['Inter'] font-medium">{point}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-4 pt-8"
              variants={itemVariants}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-['Inter']"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Our Mission <Rocket className="w-5 h-5 ml-2 inline" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,88,255,0.03)_25%,rgba(0,88,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,122,0,0.03)_75%)] bg-[size:50px_50px] animate-pulse" />
              
              {/* Floating Elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-20 h-20 rounded-2xl ${
                    i % 2 === 0 ? 'bg-[#0058FF]/10' : 'bg-[#FF7A00]/10'
                  } border ${
                    i % 2 === 0 ? 'border-[#0058FF]/20' : 'border-[#FF7A00]/20'
                  }`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 12}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
              
              {/* Central Focus */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-3xl shadow-2xl flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <Target className="w-12 h-12 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Mission;