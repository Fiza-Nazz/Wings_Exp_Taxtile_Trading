'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+971 50 803 3127',
      description: 'Mon to Fri 9am to 6pm'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'wingsexptextiletrading@gmail.com',
      description: 'Send us your query anytime!'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Warsan-Nursery 3',
      description: 'Dubai, United Arab Emirates'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: '24/7 Support',
      description: 'We are always here for you'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#0058FF]/5 via-white to-[#FF7A00]/5"
          style={{ y: backgroundY }}
        />
        
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 border-4 border-[#0058FF]/20 rounded-3xl"
          animate={{ 
            y: [0, -40, 0],
            rotateZ: [0, 5, 0]
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

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
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
              className="text-6xl md:text-8xl font-black mb-6 font-['Poppins'] bg-gradient-to-r from-[#0058FF] via-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent"
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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-semibold text-gray-700 mb-12 font-['Inter'] tracking-wide max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Get in touch with Wings Expert Textile Trading. We're here to help you with any questions or inquiries.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              { number: '24/7', label: 'Support' },
              { number: '1hr', label: 'Response Time' },
              { number: '100%', label: 'Quality' },
              { number: '50+', label: 'Products' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0058FF] font-['Poppins']">{stat.number}</div>
                <div className="text-gray-600 text-sm font-['Inter']">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-[#0058FF] rounded-full flex justify-center mx-auto relative"
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
          </motion.div>
        </div>

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

      {/* Contact Form & Info Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-black text-gray-900 mb-8 font-['Poppins']"
                variants={fadeInUp}
              >
                Get In Touch
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 mb-12 font-['Inter'] leading-relaxed"
                variants={fadeInUp}
              >
                Have a textile requirement? Want to learn more about our premium fabric collection? 
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </motion.p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#0058FF]/30 transition-all duration-300"
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5
                    }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">
                        {info.title}
                      </h3>
                      <p className="text-lg text-[#0058FF] font-semibold mb-1 font-['Inter']">
                        {info.details}
                      </p>
                      <p className="text-gray-600 font-['Inter']">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl border border-gray-100 p-8"
                variants={fadeInUp}
              >
                <motion.h3 
                  className="text-3xl font-black text-gray-900 mb-6 font-['Poppins']"
                  variants={fadeInUp}
                >
                  Send Message
                </motion.h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-['Inter']">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0058FF] focus:ring-2 focus:ring-[#0058FF]/20 transition-all duration-300 font-['Inter']"
                        placeholder="Enter your name"
                      />
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-['Inter']">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0058FF] focus:ring-2 focus:ring-[#0058FF]/20 transition-all duration-300 font-['Inter']"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-['Inter']">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0058FF] focus:ring-2 focus:ring-[#0058FF]/20 transition-all duration-300 font-['Inter']"
                      placeholder="Enter subject"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-['Inter']">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0058FF] focus:ring-2 focus:ring-[#0058FF]/20 transition-all duration-300 font-['Inter'] resize-none"
                      placeholder="Enter your message..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-xl font-['Inter'] font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    whileHover={{ 
                      scale: isSubmitting ? 1 : 1.02,
                      y: isSubmitting ? 0 : -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    variants={fadeInUp}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#FF7A00] to-[#0058FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-16 font-['Poppins']"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How quickly can you respond to my textile inquiry?",
                answer: "We typically respond within 1-2 hours during business hours. For urgent textile requirements, we provide quick turnaround support."
              },
              {
                question: "Do you offer custom textile solutions?",
                answer: "Yes, we specialize in providing custom textile solutions tailored to your specific requirements and business needs."
              },
              {
                question: "What are your working hours?",
                answer: "Our standard business hours are 9 AM to 6 PM GST, but we're flexible to accommodate international clients across different time zones."
              },
              {
                question: "Can I schedule a consultation for bulk orders?",
                answer: "Absolutely! You can schedule a free consultation call to discuss your bulk textile requirements and get customized pricing."
              },
              {
                question: "What types of textiles do you specialize in?",
                answer: "We specialize in a wide range of premium textiles including fabrics for fashion, home textiles, and industrial applications with global export quality standards."
              },
              {
                question: "Do you handle international shipping?",
                answer: "Yes, we have extensive experience in international textile export and can handle shipping to various global destinations with proper documentation."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:border-[#0058FF]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-[#0058FF] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Poppins']">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 font-['Inter'] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}