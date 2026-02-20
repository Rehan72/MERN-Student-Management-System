import React from 'react';
import { Link } from 'react-router-dom';
import GlassButton from '../components/common/GlassButton';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-brand-dark-5 via-brand-dark-2 to-brand-dark-1 text-brand-light-1 relative overflow-hidden">
      
      {/* Background Shapes */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full z-0"
      ></motion.div>
       <motion.div 
        animate={{ 
          rotate: -360,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border border-white/5 rounded-full z-0"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Student <span className="text-brand-light-4">Management</span> <br/> System
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-brand-light-6 mb-12 max-w-2xl mx-auto"
        >
            Empowering the next generation of leaders with seamless education management.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-x-6"
        >
            <Link to="/login">
            <GlassButton className="px-10 py-4 text-xl bg-brand-light-1 text-brand-dark-1 hover:bg-brand-light-2 hover:scale-105 transition-transform">
                Get Started
            </GlassButton>
            </Link>
            <Link to="/register">
            <GlassButton className="px-10 py-4 text-xl bg-transparent border-brand-light-1 text-brand-light-1 hover:bg-brand-light-1/10 hover:scale-105 transition-transform">
                Sign Up
            </GlassButton>
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
