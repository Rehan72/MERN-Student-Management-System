import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const GlassButton = ({ className, children, ...props }) => {
  return (
    <Button
      className={cn(
        "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GlassButton;
