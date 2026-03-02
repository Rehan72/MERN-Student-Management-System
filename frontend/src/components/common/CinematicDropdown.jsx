import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const CinematicDropdown = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  error,
  className = '',
  loading = false,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.slug === value || opt.value === value);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.slug || option.value } });
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2
      }
    })
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2 px-1 opacity-80">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      
      <div ref={dropdownRef} className="relative">
        {/* Trigger Button */}
        <motion.button
          type="button"
          onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
          disabled={disabled || loading}
          className={`
            w-full px-4 py-3 bg-surface-panel border rounded-xl 
            focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50
            outline-hidden transition-all text-white
            placeholder-brand-light-6/40 appearance-none text-left
            flex items-center justify-between gap-2 shadow-inner shadow-black/20
            ${error 
              ? 'border-rose-500/50 focus:ring-rose-500/20' 
              : 'border-brand-border hover:border-brand-primary/40'
            }
            ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${isOpen ? 'ring-2 ring-brand-primary/30 border-brand-primary/50 bg-brand-primary/10' : ''}
          `}
          whileHover={!disabled && !loading ? { scale: 1.005, backgroundColor: 'rgba(255, 255, 255, 0.04)' } : {}}
          whileTap={!disabled && !loading ? { scale: 0.995 } : {}}
        >
          {loading ? (
            <span className="text-brand-light-6/40 flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/20 border-t-brand-primary rounded-full"
              />
              <span className="text-xs font-bold uppercase tracking-widest">Processing</span>
            </span>
          ) : selectedOption ? (
            <span className="flex items-center gap-3">
              {selectedOption.icon && (
                <span className="text-brand-primary drop-shadow-[0_0_8px_rgba(0,102,255,0.4)]">{selectedOption.icon}</span>
              )}
              <span className="text-sm font-bold tracking-tight">{selectedOption.name || selectedOption.label}</span>
            </span>
          ) : (
            <span className="text-brand-light-6/40 text-sm font-medium">{placeholder}</span>
          )}
          
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-brand-light-6/40"
          >
            <ChevronDown size={18} />
          </motion.span>
        </motion.button>

        {/* Dropdown Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute z-50 w-full mt-3 py-2 bg-surface-base border border-brand-border rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-3xl"
            >
              <div className="max-h-60 overflow-y-auto no-scrollbar">
                {options.length === 0 ? (
                  <div className="px-5 py-6 text-[10px] font-black text-brand-light-6/20 text-center uppercase tracking-[0.3em]">
                    No available records
                  </div>
                ) : (
                  options.map((option, index) => (
                    <motion.button
                      key={option._id || option.id || option.slug || index}
                      type="button"
                      custom={index}
                      variants={itemVariants}
                      onClick={() => handleSelect(option)}
                      className={`
                        w-full px-5 py-4 text-left flex items-center justify-between
                        transition-all duration-300 group
                        ${(option.slug === value || option.value === value)
                          ? 'bg-brand-primary/20 text-white'
                          : 'text-brand-light-6 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        {option.icon && (
                          <span className={`transition-all duration-300 ${(option.slug === value || option.value === value) ? 'text-brand-primary scale-110' : 'text-brand-light-6/40 group-hover:text-brand-primary'}`}>
                            {option.icon}
                          </span>
                        )}
                        <span className="text-sm font-semibold tracking-tight">{option.name || option.label}</span>
                      </span>
                      
                      {(option.slug === value || option.value === value) && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center shadow-[0_0_10px_rgba(0,102,255,0.3)]"
                        >
                          <Check size={12} className="text-brand-primary font-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-2 px-1 text-[10px] font-black text-rose-500 uppercase tracking-widest"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicDropdown;
