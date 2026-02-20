import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-brand-light-2 dark:bg-brand-dark-1">
      {/* Left Side - Image/Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 bg-brand-dark-2 relative overflow-hidden items-center justify-center"
      >
         {/* Abstract background or Image */}
         <div className="absolute inset-0 bg-linear-to-br from-brand-dark-5 to-brand-dark-3 opacity-90 z-10"></div>
         <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
            alt="University" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
         />
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-20 text-white p-12 max-w-lg"
         >
            <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
            </p>
            <p className="mt-4 text-blue-200 font-medium">- Malcolm X</p>
         </motion.div>
         
         {/* Decorative Circles */}
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl z-10"
         ></motion.div>
         <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl z-10"
         ></motion.div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative">
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md space-y-8"
        >
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign In</h2>
                <p className="text-gray-500 dark:text-gray-400">Please enter your details to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-medium text-brand-dark-5 dark:text-brand-light-2 mb-1.5">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-brand-light-1 dark:bg-brand-dark-2 border border-brand-light-4 dark:border-brand-dark-5 rounded-lg focus:ring-2 focus:ring-brand-dark-1 focus:border-transparent outline-hidden transition-all text-brand-dark-1 dark:text-brand-light-1 placeholder-gray-600"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-hidden transition-all text-gray-900 dark:text-white placeholder-gray-600 pr-10"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </motion.div>

                <div className="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                        Remember me for 30 days
                    </label>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-semibold text-white bg-brand-dark-1 hover:bg-brand-dark-2 dark:bg-brand-light-1 dark:text-brand-dark-1 dark:hover:bg-brand-light-2 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark-1 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </motion.button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">
                    Create an account
                </Link>
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
