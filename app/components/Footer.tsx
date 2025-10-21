// app/components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp, Shield, Award, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    products: [
      { name: 'Ladies Garments', href: '/services/ladies' },
      { name: 'Men\'s Garments', href: '/services/mens' },
      { name: 'Shoes & Slippers', href: '/services/shoes' },
      { name: 'Bags & Wallets', href: '/services/bags' },
      { name: 'Gifts & Cosmetics', href: '/services/gifts' },
      { name: 'Blankets & Towels', href: '/services/home' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'Quality Standards', href: '/quality' },
      { name: 'Global Partners', href: '/partners' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Return Policy', href: '/returns' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Phone, text: '+971 50 803 3127' },
    { icon: Mail, text: 'wingsexptextiletrading@gmail.com' },
    { icon: MapPin, text: 'Warsan-Nursery 3, Dubai, UAE' }
  ];

  const certifications = [
    { icon: Shield, text: 'ISO 9001 Certified' },
    { icon: Award, text: 'Quality Excellence Award' },
    { icon: Globe, text: 'Global Export Standards' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,88,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,88,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-16 h-16 rounded-full opacity-5 ${
              i % 2 === 0 ? 'bg-[#0058FF]' : 'bg-[#FF7A00]'
            }`}
            style={{
              left: `${5 + i * 12}%`,
              bottom: `${5 + (i * 6)}%`,
            }}
            animate={{
              y: [0, -25, 0],
              scale: [1, 1.15, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certifications Banner */}
        <motion.div 
          className="py-8 border-b border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <cert.icon className="w-6 h-6 text-[#0058FF]" />
                <span className="text-sm font-semibold text-gray-700 font-['Inter']">{cert.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-['Poppins']">W</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent font-['Poppins'] leading-tight">
                  WINGS EXP
                </span>
                <span className="text-sm font-medium text-gray-600 font-['Inter'] leading-tight">
                  TEXTILE TRADING CO LLC
                </span>
              </div>
            </motion.div>
            
            <p className="text-gray-600 mb-6 leading-relaxed font-['Inter'] max-w-md text-sm">
              Leading global textile trading company based in Dubai, specializing in premium quality garments, 
              accessories, and home textiles. We bridge international markets with exceptional 
              products and unparalleled service from the heart of UAE.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 text-gray-600 hover:text-[#0058FF] transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#0058FF] group-hover:text-white transition-all duration-300">
                    <item.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-['Inter'] font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-[#0058FF] hover:to-[#FF7A00] hover:text-white transition-all duration-300 shadow-sm"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 font-['Poppins'] flex items-center">
              <div className="w-2 h-2 bg-[#0058FF] rounded-full mr-2"></div>
              Our Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-[#0058FF] transition-colors duration-300 font-['Inter'] text-sm flex items-center group"
                  >
                    <div className="w-1 h-1 bg-gray-300 rounded-full mr-3 group-hover:bg-[#0058FF] transition-colors duration-300"></div>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 font-['Poppins'] flex items-center">
              <div className="w-2 h-2 bg-[#FF7A00] rounded-full mr-2"></div>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-[#0058FF] transition-colors duration-300 font-['Inter'] text-sm flex items-center group"
                  >
                    <div className="w-1 h-1 bg-gray-300 rounded-full mr-3 group-hover:bg-[#FF7A00] transition-colors duration-300"></div>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 font-['Poppins'] flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full mr-2"></div>
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-[#0058FF] transition-colors duration-300 font-['Inter'] text-sm flex items-center group"
                  >
                    <div className="w-1 h-1 bg-gray-300 rounded-full mr-3 group-hover:bg-gradient-to-r group-hover:from-[#0058FF] group-hover:to-[#FF7A00] transition-colors duration-300"></div>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="lg:col-span-2 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 font-['Poppins']">Stay Updated</h3>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <p className="text-gray-600 mb-4 text-sm font-['Inter'] leading-relaxed">
                Subscribe to our newsletter for the latest textile trends, product launches, and industry insights from Dubai's premier textile trading company.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0058FF] focus:ring-2 focus:ring-[#0058FF]/20 transition-all duration-300 font-['Inter'] text-sm placeholder-gray-400"
                />
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-xl font-['Inter'] font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe to Updates
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-3 font-['Inter'] text-center">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              className="text-gray-600 text-sm font-['Inter'] text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © {currentYear} <span className="font-semibold text-gray-800">WINGS EXP TEXTILE TRADING CO LLC</span>. All rights reserved.
              <br className="md:hidden" />
              <span className="block md:inline mt-1 md:mt-0 md:ml-2 text-gray-500">Dubai, United Arab Emirates</span>
            </motion.div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              {footerLinks.support.slice(2).map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-600 hover:text-[#0058FF] transition-colors duration-300 font-['Inter']"
                  whileHover={{ scale: 1.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0058FF] via-[#FF7A00] to-[#0058FF]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </footer>
  );
}