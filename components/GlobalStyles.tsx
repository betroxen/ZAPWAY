
import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
   
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #121212;
      color: #FAFBFF;
      /* Subtle noise texture for depth */
      background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 100px 100px;
    }
    .font-body {
      font-family: 'Inter', sans-serif;
    }
    .font-heading {
      font-family: 'Orbitron', sans-serif;
      font-weight: 600;
      letter-spacing: 0.05em;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Orbitron', sans-serif;
      font-weight: 600;
    }

    /* Neon Text Glow Utility */
    .text-glow {
      text-shadow: 0 0 10px rgba(0, 255, 192, 0.5);
    }

    /* Custom Scrollbar - Darker with Neon accent on hover */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #121212;
    }
    ::-webkit-scrollbar-thumb {
      background: #333333;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #00FFC0;
    }

    /* Modal open body styles */
    .modal-open {
      overflow: hidden;
    }

    /* Page fade-in animation - faster kinetic feel */
    .page-fade-in {
      animation: fadeIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
    }

    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-slideInRight {
        animation: slideInRight 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
    }

    /* RAPID TAB SLIDE (V4.0 Console) */
    @keyframes tabSlideIn {
      from { opacity: 0; transform: translateX(15px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-tabSlideIn {
      animation: tabSlideIn 0.2s ease-out forwards;
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 192, 0.2); }
      50% { box-shadow: 0 0 20px rgba(0, 255, 192, 0.6); }
    }
    .animate-pulse-glow {
       animation: pulse-glow 2s infinite;
    }

    /* MODAL MATERIALIZE ANIMATION (V4.0) */
    @keyframes materialize {
      0% { opacity: 0; transform: scale(0.95); box-shadow: 0 0 0 rgba(0,255,192,0); }
      60% { box-shadow: 0 0 40px rgba(0,255,192,0.2); border-color: rgba(0,255,192,0.5); }
      100% { opacity: 1; transform: scale(1.0); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border-color: #333333; }
    }
    .animate-materialize {
        animation: materialize 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    /* Tooltip styles */
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #1A1A1A transparent transparent transparent;
    }

  `}</style>
);
