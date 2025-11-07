import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-xl border border-white/10 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
