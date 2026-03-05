import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'sonner';
import axiosInstance from '../api/axiosInstance';
import { motion } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    role: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Failed to load roles', error);
      } finally {
        setItemsLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
        toast.error('Please select a role');
        return;
    }

    const { success, message } = await register(formData);
    if (success) {
      navigate('/login');
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const inputClass = "w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 text-sm";
  const labelClass = "block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 uppercase tracking-wider";

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950">
      {/* Left Side - Branding Panel */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center noise-overlay"
      >
         <div className="absolute inset-0 bg-gradient-to-tr from-violet-700 via-indigo-700 to-indigo-600 z-0" />
         <div className="absolute inset-0 bg-grid-pattern z-[1]" />
         <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
            alt="Students" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 z-[2]"
         />
         
         <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl z-[3]" />
         <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-400/15 rounded-full blur-3xl z-[3]" />
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 text-white p-12 max-w-lg"
         >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-8">
              <GraduationCap size={16} className="text-violet-200" />
              <span className="text-xs font-semibold text-violet-100 tracking-wide">StudentMS</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-[1.1]">Join Our Community</h1>
            <p className="text-lg text-white/70 leading-relaxed">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
            <p className="mt-4 text-white/40 font-medium text-sm">— B.B. King</p>
         </motion.div>
      </motion.div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-y-auto bg-grid-pattern-light">
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="w-full max-w-lg lg:py-10"
        >
            <div className="glass-light rounded-2xl p-8 lg:p-10">
              <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <UserPlus size={20} className="text-indigo-500" />
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create an Account</h2>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Start your journey with us today.</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={inputVariants} className="md:col-span-2">
                      <label className={labelClass}>Full Name</label>
                      <input type="text" name="name" required className={inputClass} placeholder="John Doe" value={formData.name} onChange={handleChange} />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" name="email" required className={inputClass} placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                       <label className={labelClass}>Phone Number</label>
                       <input type="tel" name="phone" required className={inputClass} placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                      <label className={labelClass}>Age</label>
                      <input type="number" name="age" required className={inputClass} placeholder="25" value={formData.age} onChange={handleChange} />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                      <label className={labelClass}>Role</label>
                      <select name="role" required className={`${inputClass} appearance-none`} value={formData.role} onChange={handleChange}>
                          <option value="" disabled className="text-slate-400">Select Role</option>
                          {!itemsLoading && roles.map((role) => (
                              <option key={role._id} value={role.slug}>{role.name}</option>
                          ))}
                      </select>
                  </motion.div>

                  <motion.div variants={inputVariants} className="md:col-span-2">
                      <label className={labelClass}>Password</label>
                      <div className="relative">
                          <input type={showPassword ? "text" : "password"} name="password" required className={`${inputClass} pr-10`} placeholder="••••••••" value={formData.password} onChange={handleChange} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                      </div>
                       <p className="text-[11px] text-slate-400 mt-1.5">Must be 8+ chars, incl. uppercase, lowercase, number, special char.</p>
                  </motion.div>

                  <motion.div variants={inputVariants} className="md:col-span-2 mt-1">
                      <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isLoading}
                          className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                          {isLoading ? 'Creating Account...' : 'Sign Up'}
                      </motion.button>
                  </motion.div>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                    Sign in
                </Link>
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
