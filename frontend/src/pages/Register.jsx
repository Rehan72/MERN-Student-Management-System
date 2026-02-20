import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'sonner';
import axiosInstance from '../api/axiosInstance';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
         <div className="absolute inset-0 bg-linear-to-tr from-brand-dark-5 to-brand-dark-3 opacity-90 z-10"></div>
         <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
            alt="Students" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
         />
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-20 text-white p-12 max-w-lg"
         >
            <h1 className="text-5xl font-bold mb-6">Join Our Community</h1>
            <p className="text-xl text-purple-100 leading-relaxed">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
            <p className="mt-4 text-purple-200 font-medium">- B.B. King</p>
         </motion.div>
         
         {/* Decorative Circles */}
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl z-10"
         ></motion.div>
         <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl z-10"
         ></motion.div>
      </motion.div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-y-auto">
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="w-full max-w-lg space-y-6 lg:py-10"
        >
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create an account</h2>
                <p className="text-gray-500 dark:text-gray-400">Start your journey with us today.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div variants={inputVariants} className="md:col-span-2">
                    <label className="block text-sm font-medium text-brand-dark-5 dark:text-brand-light-2 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-2.5 bg-brand-light-1 dark:bg-brand-dark-2 border border-brand-light-4 dark:border-brand-dark-5 rounded-lg focus:ring-2 focus:ring-brand-dark-1 focus:border-transparent outline-hidden transition-all text-brand-dark-1 dark:text-brand-light-1 placeholder-gray-600"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-1">
                    <label className="block text-sm font-medium text-brand-dark-5 dark:text-brand-light-2 mb-1.5">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-2.5 bg-brand-light-1 dark:bg-brand-dark-2 border border-brand-light-4 dark:border-brand-dark-5 rounded-lg focus:ring-2 focus:ring-brand-dark-1 focus:border-transparent outline-hidden transition-all text-brand-dark-1 dark:text-brand-light-1 placeholder-gray-600"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-1">
                     <label className="block text-sm font-medium text-brand-dark-5 dark:text-brand-light-2 mb-1.5">Phone Number</label>
                     <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-4 py-2.5 bg-brand-light-1 dark:bg-brand-dark-2 border border-brand-light-4 dark:border-brand-dark-5 rounded-lg focus:ring-2 focus:ring-brand-dark-1 focus:border-transparent outline-hidden transition-all text-brand-dark-1 dark:text-brand-light-1 placeholder-gray-600"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-1">
                    <label className="block text-sm font-medium text-brand-dark-5 dark:text-brand-light-2 mb-1.5">Age</label>
                    <input
                        type="number"
                        name="age"
                        required
                        className="w-full px-4 py-2.5 bg-brand-light-1 dark:bg-brand-dark-2 border border-brand-light-4 dark:border-brand-dark-5 rounded-lg focus:ring-2 focus:ring-brand-dark-1 focus:border-transparent outline-hidden transition-all text-brand-dark-1 dark:text-brand-light-1 placeholder-gray-600"
                        placeholder="25"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-1">
                    <label className="block text-sm font-medium text-brand-dark-5 dark:text-brand-light-2 mb-1.5">Role</label>
                    <select
                        name="role"
                        required
                        className="w-full px-4 py-2.5 bg-brand-light-1 dark:bg-brand-dark-2 border border-brand-light-4 dark:border-brand-dark-5 rounded-lg focus:ring-2 focus:ring-brand-dark-1 focus:border-transparent outline-hidden transition-all text-brand-dark-1 dark:text-brand-light-1 placeholder-brand-light-4 appearance-none"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled className="text-gray-400">Select Role</option>
                        {!itemsLoading && roles.map((role) => (
                            <option key={role._id} value={role.slug}>{role.name}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-2">
                    <label className="block text-sm font-medium text-brand-dark-5 dark:text-brand-light-2 mb-1.5">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            className="w-full px-4 py-2.5 bg-brand-light-1 dark:bg-brand-dark-2 border border-brand-light-4 dark:border-brand-dark-5 rounded-lg focus:ring-2 focus:ring-brand-dark-1 focus:border-transparent outline-hidden transition-all text-brand-dark-1 dark:text-brand-light-1 placeholder-gray-600 pr-10"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                     <p className="text-xs text-gray-500 mt-1">Must be 8+ chars, incl. uppercase, lowercase, number, special char.</p>
                </motion.div>

                <motion.div variants={inputVariants} className="md:col-span-2 mt-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-semibold text-white bg-brand-dark-1 hover:bg-brand-dark-2 dark:bg-brand-light-1 dark:text-brand-dark-1 dark:hover:bg-brand-light-2 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark-1 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </motion.button>
                </motion.div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">
                    Sign in
                </Link>
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
