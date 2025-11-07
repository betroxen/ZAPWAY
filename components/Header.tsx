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
    <header className={`sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#3a3846] bg-[#14131c]/80 px-4 py-3 backdrop-blur-md md:px-6 transition-all duration-300`}>
      
      {/* Left side - Logo or Menu Trigger */}
      <div className="flex items-center gap-4">
         {isLoggedIn && (
             <button className="text-[#8d8c9e] hover:text-white md:hidden" onClick={onToggleMobileNav}>
                 <Icons.Menu className="h-6 w-6" />
             </button>
         )}
         
         {!isLoggedIn && (
             // Visible logo for public landing page
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                 <Icons.Zap className="h-6 w-6 text-[#1ed760]" />
                 <span className="font-heading text-xl font-bold text-white hidden sm:block">ZAP</span>
             </div>
         )}
         
         {isLoggedIn && (
             // Mobile only logo when logged in, now clickable to go to Dashboard
             <button onClick={() => appContext?.setCurrentPage('Dashboard')} className="md:hidden flex items-center">
                <Icons.Zap className="h-6 w-6 text-[#1ed760]" />
             </button>
         )}
      </div>

      {/* Right side - Auth & Actions */}
      <div className="flex items-center gap-3">
        {isLoggedIn && (
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-[#1ed760] hover:text-[#1ed760] hover:bg-[#1ed760]/10" onClick={onOpenReview}>
                <Icons.Edit className="h-4 w-4" /> Write a Review
            </Button>
        )}

        {!isLoggedIn ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={onOpenLogin} className="hidden sm:flex">
              Log In
            </Button>
            <Button size="sm" onClick={onOpenRegister} className="shadow-[0_0_15px_rgba(29,215,96,0.3)]">
              Join Now
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Quick Action Icons */}
            <button className="text-[#8d8c9e] hover:text-white transition-colors relative hover:scale-110 transform duration-200" onClick={() => appContext?.setCurrentPage('Messages')}>
               <Icons.Mail className="h-5 w-5" />
               <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#1ed760] rounded-full border-2 border-[#14131c]"></span>
            </button>
            <button className="text-[#8d8c9e] hover:text-white transition-colors hover:scale-110 transform duration-200" onClick={() => appContext?.setCurrentPage('Rewards')}>
               <Icons.Gift className="h-5 w-5" />
            </button>

            {/* ZAP Balance Pill */}
            <div className="hidden md:flex items-center gap-2 bg-[#000000]/50 rounded-full px-3 py-1.5 border border-[#1ed760]/30 hover:border-[#1ed760]/60 transition-colors cursor-default">
                <Icons.Zap className="h-4 w-4 text-[#1ed760]" />
                <span className="text-sm font-bold text-white">1,240</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95"
              >
                <img
                  src="https://placehold.co/32x32/1ed760/000000?text=DG"
                  alt="Profile"
                  className="h-8 w-8 rounded-full ring-2 ring-[#3a3846]"
                />
              </button>

              {isProfileDropdownOpen && (
                <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 rounded-md bg-[#14131c] border border-[#3a3846] shadow-xl py-1 z-40 animate-fadeIn origin-top-right">
                        <div className="px-4 py-3 border-b border-[#3a3846]">
                            <p className="text-sm font-medium text-white">DegenGambler</p>
                            <p className="text-xs text-[#1ed760]">Level 42 Circuit Runner</p>
                        </div>
                        <button onClick={() => { appContext?.setCurrentPage('Profile'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#8d8c9e] hover:bg-[#24232d] hover:text-white transition-colors">
                            <Icons.Users className="h-4 w-4" /> Profile
                        </button>
                        <button onClick={() => { appContext?.setCurrentPage('Settings'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#8d8c9e] hover:bg-[#24232d] hover:text-white transition-colors">
                            <Icons.Settings className="h-4 w-4" /> Settings
                        </button>
                         <button onClick={() => { appContext?.setCurrentPage('Preferences'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#8d8c9e] hover:bg-[#24232d] hover:text-white transition-colors">
                            <Icons.Trophy className="h-4 w-4" /> Preferences
                        </button>
                        <div className="border-t border-[#3a3846] mt-1">
                             <button onClick={() => { onLogout(); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors">
                                <Icons.LogOut className="h-4 w-4" /> Log Out
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
};