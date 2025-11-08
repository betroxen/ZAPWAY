
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-[#1A1A1A] border border-[#333333] rounded-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,192,0.15)] hover:border-[#00FFC0]/30 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
