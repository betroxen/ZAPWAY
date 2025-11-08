
import React, { useContext, useState } from 'react';
import { Button } from './Button';
import { Icons } from './icons';
import { AppContext } from '../context/AppContext';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  isSidebarCollapsed: boolean;
  onOpenReview?: () => void;
  onToggleMobileNav?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogin, onOpenRegister, isLoggedIn, onLogout, isSidebarCollapsed, onOpenReview, onToggleMobileNav }) => {
  const appContext = useContext(AppContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#333333] bg-[#121212]/80 px-4 py-3 backdrop-blur-md md:px-6 transition-all duration-300`}>
      
      {/* Left side - Logo or Menu Trigger */}
      <div className="flex items-center gap-4">
         {isLoggedIn && (
             <button className="text-[#8d8c9e] hover:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-[#00FFC0] rounded-md p-1" onClick={onToggleMobileNav} aria-label="Open Menu">
                 <Icons.Menu className="h-6 w-6" aria-hidden="true" />
             </button>
         )}
         
         {!isLoggedIn && (
             // Visible logo for public landing page
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && window.scrollTo(0,0)} aria-label="ZAP Home">
                 <Icons.Zap className="h-6 w-6 text-[#00FFC0]" aria-hidden="true" />
                 <span className="font-heading text-xl font-bold text-white hidden sm:block tracking-wider">ZAP</span>
             </div>
         )}
         
         {isLoggedIn && (
             // Mobile only logo when logged in, now clickable to go to Dashboard
             <button onClick={() => appContext?.setCurrentPage('Dashboard')} className="md:hidden flex items-center focus:outline-none focus:ring-2 focus:ring-[#00FFC0] rounded-md p-1" aria-label="Go to Dashboard">
                <Icons.Zap className="h-6 w-6 text-[#00FFC0]" aria-hidden="true" />
             </button>
         )}
      </div>

      {/* Right side - Auth & Actions */}
      <div className="flex items-center gap-3">
        {isLoggedIn && (
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-[#00FFC0] hover:text-[#00FFC0] hover:bg-[#00FFC0]/10 font-heading uppercase" onClick={onOpenReview}>
                <Icons.Edit className="h-4 w-4" aria-hidden="true" /> Write Review
            </Button>
        )}

        {!isLoggedIn ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={onOpenLogin} className="hidden sm:flex">
              LOG IN
            </Button>
            <Button size="sm" onClick={onOpenRegister} className="shadow-[0_0_15px_rgba(0,255,192,0.3)]">
              JOIN NOW
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Quick Action Icons */}
            <button 
                className="text-[#8d8c9e] hover:text-white transition-colors relative hover:scale-110 transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#00FFC0] rounded-full p-1" 
                onClick={() => appContext?.setCurrentPage('Messages')}
                aria-label="Messages (1 unread)"
            >
               <Icons.Mail className="h-5 w-5" aria-hidden="true" />
               <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-[#00FFC0] rounded-full border-2 border-[#121212]"></span>
            </button>
            <button 
                className="text-[#8d8c9e] hover:text-white transition-colors hover:scale-110 transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#00FFC0] rounded-full p-1" 
                onClick={() => appContext?.setCurrentPage('Rewards')}
                aria-label="Rewards"
            >
               <Icons.Gift className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* ZAP Balance Pill */}
            <div className="hidden md:flex items-center gap-2 bg-black rounded-full px-3 py-1.5 border border-[#00FFC0]/50 hover:border-[#00FFC0] transition-colors cursor-default shadow-[0_0_10px_rgba(0,255,192,0.2)]" aria-label="Zap Point Balance: 1240">
                <Icons.Zap className="h-4 w-4 text-[#00FFC0]" aria-hidden="true" />
                <span className="text-sm font-bold text-[#00FFC0] font-mono">1,240</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00FFC0] rounded-full"
                aria-haspopup="true"
                aria-expanded={isProfileDropdownOpen}
                aria-label="User Menu"
              >
                <img
                  src="https://placehold.co/32x32/00FFC0/000000?text=DG"
                  alt="DegenGambler Profile"
                  className="h-8 w-8 rounded-full ring-2 ring-[#333333]"
                />
              </button>

              {isProfileDropdownOpen && (
                <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} aria-hidden="true"></div>
                    <div className="absolute right-0 mt-2 w-56 rounded-md bg-[#1A1A1A] border border-[#333333] shadow-2xl py-1 z-40 animate-fadeIn origin-top-right" role="menu">
                        <div className="px-4 py-3 border-b border-[#333333]">
                            <p className="text-sm font-bold text-white font-heading">DegenGambler</p>
                            <p className="text-xs text-[#00FFC0] font-mono">LVL 42 // RUNNER</p>
                        </div>
                        <button onClick={() => { appContext?.setCurrentPage('Profile'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#8d8c9e] hover:bg-[#222222] hover:text-white transition-colors font-heading uppercase" role="menuitem">
                            <Icons.Users className="h-4 w-4" aria-hidden="true" /> Profile
                        </button>
                        <button onClick={() => { appContext?.setCurrentPage('Command Console'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#8d8c9e] hover:bg-[#222222] hover:text-white transition-colors font-heading uppercase" role="menuitem">
                            <Icons.Settings className="h-4 w-4" aria-hidden="true" /> Console
                        </button>
                        <div className="border-t border-[#333333] mt-1">
                             <button onClick={() => { onLogout(); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors font-heading uppercase" role="menuitem">
                                <Icons.LogOut className="h-4 w-4" aria-hidden="true" /> Log Out
                            </button>
                        </div>
                    </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
