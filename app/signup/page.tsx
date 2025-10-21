// app/signup/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building, 
  CheckCircle, 
  X, 
  ArrowRight,
  Shield,
  BadgeCheck
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/services');
      }, 3000);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black text-gray-900 mb-4 font-['Poppins']"
          >
            Welcome Aboard!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6 font-['Inter'] leading-relaxed"
          >
            Your account has been created successfully. You're being redirected to our premium collection.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-gray-200 rounded-full h-2"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] h-2 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start space-x-3 mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl font-['Poppins']">W</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent font-['Poppins'] leading-tight">
                  WINGS EXP
                </span>
                <span className="text-base font-medium text-gray-600 font-['Inter'] leading-tight">
                  TEXTILE TRADING CO LLC
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 font-['Poppins'] leading-tight"
            >
              Join The{' '}
              <span className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">
                Premium
              </span>{' '}
              Collection
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-10 font-['Inter'] leading-relaxed max-w-lg"
            >
              Create your account to access our exclusive textile catalog, wholesale pricing, 
              and global shipping options. Start your journey with Dubai's premier textile trading company.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-5 max-w-md"
            >
              {[
                'Access to 1000+ premium textile products',
                'Wholesale pricing for bulk orders',
                'Global shipping from Dubai hub',
                '24/7 dedicated account manager',
                'Early access to new collections',
                'Quality assurance guarantee'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-4 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-['Inter'] text-base font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-10"
          >
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-10">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold font-['Inter'] border-2 ${
                      currentStep >= step
                        ? 'bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white border-transparent'
                        : 'bg-white text-gray-500 border-gray-300'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 2 && (
                    <div
                      className={`w-16 h-1 mx-4 ${
                        currentStep > step
                          ? 'bg-gradient-to-r from-[#0058FF] to-[#FF7A00]'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 font-['Poppins']">
                {currentStep === 1 ? 'Personal Information' : 'Account Setup'}
              </h2>
              <p className="text-gray-600 font-['Inter'] mt-2">
                {currentStep === 1 
                  ? 'Tell us about yourself to get started' 
                  : 'Complete your account details'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter']">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 font-['Inter'] text-base text-black placeholder-gray-500 ${
                              errors.firstName
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-[#0058FF] focus:ring-[#0058FF]/20'
                            }`}
                            placeholder="Enter your first name"
                          />
                        </div>
                        {errors.firstName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 font-['Inter'] flex items-center"
                          >
                            <X className="w-4 h-4 mr-2" />
                            {errors.firstName}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter']">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 font-['Inter'] text-base text-black placeholder-gray-500 ${
                              errors.lastName
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-[#0058FF] focus:ring-[#0058FF]/20'
                            }`}
                            placeholder="Enter your last name"
                          />
                        </div>
                        {errors.lastName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 font-['Inter'] flex items-center"
                          >
                            <X className="w-4 h-4 mr-2" />
                            {errors.lastName}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter']">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 font-['Inter'] text-base text-black placeholder-gray-500 ${
                            errors.email
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-300 focus:border-[#0058FF] focus:ring-[#0058FF]/20'
                          }`}
                          placeholder="Enter your email address"
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 font-['Inter'] flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter']">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 font-['Inter'] text-base text-black placeholder-gray-500 ${
                            errors.phone
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-300 focus:border-[#0058FF] focus:ring-[#0058FF]/20'
                          }`}
                          placeholder="+971 50 123 4567"
                        />
                      </div>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 font-['Inter'] flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-4 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-xl font-['Inter'] font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group mt-6"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue to Account Setup
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter']">
                        Company Name *
                      </label>
                      <div className="relative">
                        <Building className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 font-['Inter'] text-base text-black placeholder-gray-500 ${
                            errors.company
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-300 focus:border-[#0058FF] focus:ring-[#0058FF]/20'
                          }`}
                          placeholder="Enter your company name"
                        />
                      </div>
                      {errors.company && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 font-['Inter'] flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          {errors.company}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter']">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 font-['Inter'] text-base text-black placeholder-gray-500 ${
                            errors.password
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-300 focus:border-[#0058FF] focus:ring-[#0058FF]/20'
                          }`}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-gray-700 font-['Inter']">
                              Password Strength:
                            </span>
                            <span className={`text-sm font-bold font-['Inter'] ${
                              strengthScore === 4 ? 'text-green-600' :
                              strengthScore >= 2 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {strengthScore === 4 ? 'Strong' :
                               strengthScore >= 2 ? 'Medium' : 'Weak'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                strengthScore === 4 ? 'bg-green-500 w-full' :
                                strengthScore === 3 ? 'bg-yellow-500 w-3/4' :
                                strengthScore === 2 ? 'bg-yellow-500 w-1/2' :
                                strengthScore === 1 ? 'bg-red-500 w-1/4' : 'bg-red-500 w-0'
                              }`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { key: 'length', text: '8+ characters' },
                              { key: 'uppercase', text: 'Uppercase letter' },
                              { key: 'lowercase', text: 'Lowercase letter' },
                              { key: 'number', text: 'Number' },
                            ].map((req) => (
                              <div key={req.key} className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    passwordStrength[req.key as keyof typeof passwordStrength]
                                      ? 'bg-green-500'
                                      : 'bg-gray-400'
                                  }`}
                                />
                                <span
                                  className={`text-sm font-['Inter'] ${
                                    passwordStrength[req.key as keyof typeof passwordStrength]
                                      ? 'text-green-600 font-medium'
                                      : 'text-gray-500'
                                  }`}
                                >
                                  {req.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 font-['Inter'] flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          {errors.password}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 font-['Inter']">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Shield className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 font-['Inter'] text-base text-black placeholder-gray-500 ${
                            errors.confirmPassword
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                              : 'border-gray-300 focus:border-[#0058FF] focus:ring-[#0058FF]/20'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 font-['Inter'] flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="w-5 h-5 text-[#0058FF] border-gray-300 rounded focus:ring-[#0058FF] mt-1 flex-shrink-0"
                      />
                      <label className="text-sm text-gray-600 font-['Inter'] leading-relaxed">
                        I agree to the{' '}
                        <Link href="/terms" className="text-[#0058FF] hover:underline font-semibold">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-[#0058FF] hover:underline font-semibold">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm font-['Inter'] flex items-center"
                      >
                        <X className="w-4 h-4 mr-2" />
                        {errors.acceptTerms}
                      </motion.p>
                    )}

                    <div className="flex space-x-4 pt-4">
                      <motion.button
                        type="button"
                        onClick={handlePreviousStep}
                        className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-['Inter'] font-semibold text-lg hover:bg-gray-200 transition-all duration-300 border border-gray-300"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 py-4 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-xl font-['Inter'] font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Creating Account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 font-['Inter']">
                Already have an account?{' '}
                <Link href="/login" className="text-[#0058FF] hover:underline font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}