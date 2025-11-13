import React from 'react';

// FIX: Added explicit props type with React.PropsWithChildren to solve widespread 'children' prop error.
export const Card = ({ children, className, noHover = false, ...props }: React.PropsWithChildren<{ className?: string, noHover?: boolean, [x: string]: any }>) => {
  return (
    <div
      className={`bg-[#14131c] border border-[#333333] rounded-xl ${!noHover ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};