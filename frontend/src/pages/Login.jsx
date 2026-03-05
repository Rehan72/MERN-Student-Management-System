import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950">
      {/* Left Side - Branding Panel */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center noise-overlay"
      >
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 z-0" />
         <div className="absolute inset-0 bg-grid-pattern z-[1]" />
         <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
            alt="University" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 z-[2]"
         />
         
         {/* Ambient blobs */}
         <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl z-[3]" />
         <div className="absolute -top-32 -right-32 w-80 h-80 bg-violet-400/15 rounded-full blur-3xl z-[3]" />
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 text-white p-12 max-w-lg"
         >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-8">
              <GraduationCap size={16} className="text-indigo-200" />
              <span className="text-xs font-semibold text-indigo-100 tracking-wide">StudentMS</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-[1.1]">Welcome Back!</h1>
            <p className="text-lg text-white/70 leading-relaxed">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
            </p>
            <p className="mt-4 text-white/40 font-medium text-sm">— Malcolm X</p>
         </motion.div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative bg-grid-pattern-light">
        <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
        >
            {/* Form Card */}
            <div className="glass-light rounded-2xl p-8 lg:p-10">
              <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={20} className="text-indigo-500" />
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Sign In</h2>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your details to access your account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Email</label>
                      <input
                          type="email"
                          required
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 text-sm"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>

                  <div>
                      <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Password</label>
                          <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                              Forgot?
                          </Link>
                      </div>
                      <div className="relative">
                          <input
                              type={showPassword ? "text" : "password"}
                              required
                              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 pr-10 text-sm"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                          >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                      </div>
                  </div>

                  <div className="flex items-center">
                      <input
                          id="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500 dark:text-slate-400">
                          Remember me for 30 days
                      </label>
                  </div>

                  <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                  </motion.button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                    Create an account
                </Link>
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
