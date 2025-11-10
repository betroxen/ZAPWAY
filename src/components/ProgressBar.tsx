import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
  return (
    <div className={`w-full bg-[#1a1a1a] rounded-full h-2.5 ${className}`}>
      <div
        className="bg-[#00FFC0] h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};