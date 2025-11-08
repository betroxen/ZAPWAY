
import React, { forwardRef } from 'react';
import { Icons } from './icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'default', children, loading = false, ...props }, ref) => {
  const variants = {
    primary: 'bg-[#00FFC0] text-black font-bold shadow-[0_0_15px_rgba(0,255,192,0.4)] hover:bg-[#33ffcc] hover:shadow-[0_0_30px_rgba(0,255,192,0.6)] border border-[#00FFC0]',
    secondary: 'bg-[#1A1A1A] text-[#8d8c9e] border border-[#333333] hover:bg-[#252525] hover:text-white hover:border-white/20',
    ghost: 'hover:bg-[#1A1A1A] hover:text-white text-[#8d8c9e]',
    link: 'text-[#00FFC0] underline-offset-4 hover:underline',
  };
 
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 rounded-[4px] px-3 text-xs',
    lg: 'h-12 rounded-[4px] px-8 text-base',
    icon: 'h-10 w-10',
  };
  
  // Added active:scale-[0.98] for kinetic "press" feedback
  const baseClasses = 'inline-flex items-center justify-center rounded-[4px] font-heading uppercase tracking-wider transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';
 
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && <Icons.Loader className="h-5 w-5 mr-2" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
