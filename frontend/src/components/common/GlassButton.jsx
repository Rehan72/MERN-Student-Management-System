import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const GlassButton = ({ className, children, ...props }) => {
  return (
    <Button
      className={cn(
        "bg-brand-light-1/10 backdrop-blur-md border border-brand-light-1/20 text-brand-light-1 hover:bg-brand-light-1/20 transition-all duration-300 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GlassButton;
