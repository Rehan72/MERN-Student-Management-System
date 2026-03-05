import React from 'react';
import { Link } from 'react-router-dom';
import GlassButton from '../components/common/GlassButton';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Users, BookOpen, BarChart3, Shield } from 'lucide-react';

const features = [
  { icon: Users, title: 'Student Profiles', desc: 'Manage student records, attendance, and performance in one place.' },
  { icon: BookOpen, title: 'Course Management', desc: 'Create, assign, and track courses with real-time updates.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Get deep insights into academic performance and trends.' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Admins, teachers, and students each get tailored views.' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white relative overflow-hidden noise-overlay">
      
      {/* Dot grid backdrop */}
      <div className="absolute inset-0 bg-grid-pattern z-0" />

      {/* Animated ambient glow blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/25 rounded-full blur-[130px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-2/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none z-0" 
      />

      {/* Rotating decorative rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/[0.03] rounded-full z-0"
      />
       <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] border border-white/[0.03] rounded-full z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 pt-20 pb-10 max-w-6xl mx-auto">
        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass mb-10"
        >
          <GraduationCap size={18} className="text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-300 tracking-wide">StudentMS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-[1.05]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          Student{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Management
          </span>
          <br />System
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base md:text-lg text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed"
        >
            Empowering the next generation of leaders with seamless, modern education management.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
            <Link to="/login">
              <button className="group px-8 py-3.5 text-base font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2">
                  Get Started 
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link to="/register">
              <button className="px-8 py-3.5 text-base font-semibold bg-transparent border border-white/15 text-white rounded-xl hover:bg-white/[0.06] hover:border-white/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
                  Sign Up
              </button>
            </Link>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-left hover:bg-white/[0.06] transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center mb-4 group-hover:bg-indigo-500/25 transition-colors">
                <feat.icon size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
