
import React, { useContext } from 'react';
import { Icons } from '../components/icons';
import { AppContext } from '../context/AppContext';

export const Footer = () => {
  const appContext = useContext(AppContext);

  const handleLinkClick = (page: string) => {
    appContext?.setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top
  };
  
  return (
    <footer className="bg-[#000000] border-t border-[#3a3846] pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <button onClick={() => handleLinkClick('Dashboard')} className="flex items-center gap-2">
              <Icons.Zap className="h-7 w-7 text-[#1ed760]" />
              <span className="font-heading text-2xl font-bold text-white">ZAP</span>
            </button>
            <p className="mt-4 max-w-xs text-[#8d8c9e]">
              A smarter, more rewarding crypto gambling experience. Built by the community, for the community.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-[#8d8c9e] hover:text-[#1ed760]">X / Twitter</a>
              <a href="#" className="text-[#8d8c9e] hover:text-[#1ed760]">Discord</a>
              <a href="#" className="text-[#8d8c9e] hover:text-[#1ed760]">Telegram</a>
            </div>
          </div>
          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase text-[#8d8c9e]">Platform</h3>
            <ul className="space-y-3">
              <li><button onClick={() => handleLinkClick('About Us')} className="text-white hover:text-[#1ed760]">About Us</button></li>
              <li><button onClick={() => handleLinkClick('Our Mission')} className="text-white hover:text-[#1ed760]">Our Mission</button></li>
              <li><button onClick={() => handleLinkClick('Affiliate')} className="text-white hover:text-[#1ed760]">Partner With Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase text-[#8d8c9e]">Legal</h3>
            <ul className="space-y-3">
              <li><button onClick={() => handleLinkClick('Privacy Policy')} className="text-white hover:text-[#1ed760]">Privacy Policy</button></li>
              <li><button onClick={() => handleLinkClick('Terms of Service')} className="text-white hover:text-[#1ed760]">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[#3a3846] pt-8 text-center text-sm text-[#8d8c9e]">
          <p>© 2025 ZapWay Corp. All rights reserved. Gamble with control. Play for the thrill — not the paycheck. Know your limits, stay sharp, and walk away a winner. If the game stops being fun, it’s time to reach out — help is always within reach.</p>
        </div>
      </div>
    </footer>
  );
};
