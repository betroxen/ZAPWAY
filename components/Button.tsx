import React, { forwardRef } from 'react';
import { Icons } from './icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'default', children, loading = false, ...props }, ref) => {
  const variants = {
    primary: 'bg-[#1ed760] text-black shadow-[0_0_15px_rgba(29,215,96,0.4)] hover:bg-[#33ee76] hover:shadow-[0_0_25px_rgba(29,215,96,0.5)]',
    secondary: 'bg-[#24232d] text-[#8d8c9e] hover:bg-[#3a3846] hover:text-white',
    ghost: 'hover:bg-[#24232d] hover:text-white text-[#8d8c9e]',
    link: 'text-[#1ed760] underline-offset-4 hover:underline',
  };
 
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-9 rounded-[4px] px-3 text-xs',
    lg: 'h-11 rounded-[4px] px-8 text-base',
    icon: 'h-10 w-10',
  };
  const baseClasses = 'inline-flex items-center justify-center rounded-[4px] font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:-translate-y-0.5';
 
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
