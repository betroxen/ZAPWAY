import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');
   
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: #0A0A0A;
      color: #FAFBFF;
    }
    .font-body {
      font-family: 'Inter', sans-serif;
    }
    .font-heading {
      font-family: 'Orbitron', sans-serif;
      font-weight: 600;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Orbitron', sans-serif;
      font-weight: 600;
    }
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #171620; /* Dark surface */
    }
    ::-webkit-scrollbar-thumb {
      background: #45454d;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #1ed760; /* accent */
    }
    /* Modal open body styles */
    .modal-open {
      overflow: hidden;
    }
    /* Page fade-in animation */
    .page-fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.4s ease-out forwards;
    }

    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-slideInRight {
        animation: slideInRight 0.3s ease-out forwards;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
        50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
    }
    .animate-bounce {
        animation: bounce 1s infinite;
    }

    /* Card hover base effect */
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-4px); }
    
    /* Tooltip styles */
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #24232d transparent transparent transparent;
    }

  `}</style>
);