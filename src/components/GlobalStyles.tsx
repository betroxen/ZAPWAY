
import React from 'react';

export const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

    :root {
      --font-primary: 'Rajdhani', sans-serif;
      --font-display: 'Orbitron', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --color-background: #000000;
      --color-primary: #00FF00;
      --color-secondary: #00AFFF;
      --color-text: #E0E0E0;
      --color-text-dark: #A0A0A0;
      --color-border: rgba(0, 255, 0, 0.2);
      --color-background-dark: #080808;
    }

    body {
      background-color: var(--color-background);
      color: var(--color-text);
      font-family: var(--font-primary);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      
      /* Animated Gradient Background */
      background: linear-gradient(45deg, #000000, #001f00, #000000, #001f00);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;

      /* Scanlines Overlay */
      position: relative;
    }

    body::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 255, 0, 0.05),
        rgba(0, 255, 0, 0.05) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 1000;
      animation: scanlines 10s linear infinite;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes scanlines {
      from { transform: translateY(0); }
      to { transform: translateY(100%); }
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-display);
      color: var(--color-primary);
      text-shadow: 0 0 5px var(--color-primary), 0 0 10px var(--color-primary), 0 0 15px var(--color-primary);
    }

    .text-glow {
      text-shadow: 0 0 5px var(--color-secondary), 0 0 10px var(--color-secondary);
    }
    
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: var(--color-background-dark);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-primary);
      border-radius: 4px;
      box-shadow: 0 0 5px var(--color-primary);
    }

    .font-orbitron {
        font-family: var(--font-display);
    }
  `}} />
);
