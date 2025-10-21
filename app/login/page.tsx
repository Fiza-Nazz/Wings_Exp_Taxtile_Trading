// app/login/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  CheckCircle, 
  X,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/services');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            Welcome Back!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6 font-['Inter'] leading-relaxed"
          >
            You've successfully signed in. You're being redirected to our premium collection.
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
              transition={{ duration: 2, ease: 'linear' }}
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
              Welcome{' '}
              <span className="bg-gradient-to-r from-[#0058FF] to-[#FF7A00] bg-clip-text text-transparent">
                Back
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-10 font-['Inter'] leading-relaxed max-w-lg"
            >
              Sign in to your account to access our exclusive textile catalog, manage your orders, 
              and continue your journey with Dubai's premier textile trading company.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-5 max-w-md"
            >
              {[
                'Access your personalized dashboard',
                'View order history and track shipments',
                'Manage your wholesale pricing',
                'Get personalized recommendations',
                '24/7 dedicated account support',
                'Early access to exclusive deals'
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
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 font-['Poppins'] mb-3">
                Sign In to Your Account
              </h2>
              <p className="text-gray-600 font-['Inter']">
                Enter your credentials to access your business dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className="w-5 h-5 text-[#0058FF] border-gray-300 rounded focus:ring-[#0058FF]"
                  />
                  <label className="text-sm text-gray-700 font-['Inter'] font-medium">
                    Remember me
                  </label>
                </div>
                
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-[#0058FF] hover:underline font-['Inter'] font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-[#0058FF] to-[#FF7A00] text-white rounded-xl font-['Inter'] font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Demo Credentials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 bg-blue-50 rounded-xl border border-blue-200"
              >
                <h4 className="text-sm font-semibold text-blue-900 mb-2 font-['Inter'] flex items-center">
                  <BadgeCheck className="w-4 h-4 mr-2" />
                  Demo Credentials
                </h4>
                <div className="text-xs text-blue-700 font-['Inter'] space-y-1">
                  <p><span className="font-medium">Email:</span> demo@wingsexp.com</p>
                  <p><span className="font-medium">Password:</span> Demo1234</p>
                </div>
              </motion.div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 font-['Inter']">
                Don't have an account?{' '}
                <Link href="/signup" className="text-[#0058FF] hover:underline font-semibold">
                  Create account here
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
              {[
                { label: 'Secure', icon: '🔒' },
                { label: 'Trusted', icon: '⭐' },
                { label: '24/7', icon: '🛡️' }
              ].map((item, index) => (
                <div key={item.label} className="text-center">
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-xs text-gray-600 font-['Inter'] font-medium">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}