'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Mission', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-100/50 py-3'
          : 'bg-white/95 backdrop-blur-md shadow-md py-4'
      }`}
    >
      {/* Gradient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white to-orange-50/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            {/* Textile Icon SVG */}
            <div className="relative">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="text-[#0058FF]"
              >
                <motion.path
                  d="M10 8 L30 8 M10 14 L30 14 M10 20 L30 20 M10 26 L30 26 M10 32 L30 32"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                />
                <motion.path
                  d="M14 6 L14 34 M20 6 L20 34 M26 6 L26 34"
                  stroke="#FF7A00"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                />
              </svg>
            </div>

            {/* Logo Text */}
            <a href="/" className="flex flex-col leading-tight">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-[#0058FF] to-[#0073FF] bg-clip-text text-transparent">
                  WINGS EXP
                </span>
              </span>
              <span className="text-xs md:text-sm font-semibold text-gray-500 tracking-wide">
                TEXTILE TRADING CO LLC
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden lg:flex items-center space-x-1"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 group"
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] group-hover:w-full transition-all duration-300"
                ></motion.span>
                <span className="absolute inset-0 rounded-lg bg-[#0058FF]/0 group-hover:bg-[#0058FF]/5 transition-all duration-300"></span>
              </motion.a>
            ))}
          </motion.div>

          {/* Desktop Auth Buttons */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden lg:flex items-center space-x-3"
          >
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 text-sm font-semibold text-[#FF7A00] border-2 border-[#FF7A00] rounded-xl overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <motion.span
                className="absolute inset-0 bg-[#FF7A00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              ></motion.span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </motion.a>

            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 122, 0, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#FF7A00] to-[#ff8c1a] rounded-xl shadow-lg shadow-orange-200/50 overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#ff8c1a] to-[#FF7A00]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-[#0058FF]/10 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-xl"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-[#0058FF]/10 hover:to-[#FF7A00]/10 hover:text-[#0058FF] transition-all duration-300"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Auth Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="pt-4 space-y-3 border-t border-gray-200"
              >
                <motion.a
                  href="/login"
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                  className="block w-full px-6 py-3 text-center text-base font-semibold text-[#FF7A00] border-2 border-[#FF7A00] rounded-xl hover:bg-[#FF7A00] hover:text-white transition-all duration-300"
                >
                  Login
                </motion.a>

                <motion.a
                  href="/signup"
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                  className="block w-full px-6 py-3 text-center text-base font-semibold text-white bg-gradient-to-r from-[#FF7A00] to-[#ff8c1a] rounded-xl shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 transition-all duration-300"
                >
                  Sign Up
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;