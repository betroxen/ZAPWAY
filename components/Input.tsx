
import React, { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-[4px] border border-[#3a3846] bg-[#24232d] px-3 py-2 text-sm text-white placeholder:text-[#8d8c9e]
      transition-colors
      hover:bg-[#2b2a34] hover:border-[#2e2d36]
      focus:outline-none focus:ring-2 focus:ring-[#1ed760] focus:border-transparent
      disabled:cursor-not-allowed disabled:opacity-50
      ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
