import React from 'react';

interface ProgressBarProps {
    progress: number;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
    const progressWidth = Math.min(100, Math.max(0, progress));

    return (
        <div className={`w-full bg-black/20 rounded-full h-2.5 ${className}`}>
            <div 
                className="bg-[#1ed760] h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressWidth}%` }}
            ></div>
        </div>
    );
};
