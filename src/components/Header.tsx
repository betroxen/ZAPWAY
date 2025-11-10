
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { Icons } from './icons';
import { AppContext, AppContextType } from '../context/AppContext';
import { ZapLogo } from './ZapLogo';
import { useSound } from '../context/SoundContext';

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
  const appContext = useContext(AppContext) as AppContextType | undefined;
  const { isMuted, setMuted, playSound } = useSound();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMuteToggle = () => {
      const newState = !isMuted;
      setMuted(newState);
      if (!newState) {
          setTimeout(() => playSound('ui_open', 0.4), 50);
      }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#333333] bg-[#0c0c0e]/90 backdrop-blur-xl px-4 py-3 md:px-6 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]`}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFC0]/50 to-transparent animate-pulse-glow"></div>
      
      <div className="flex items-center gap-4">
         {isLoggedIn && (
             <button className="text-[#8d8c9e] hover:text-[#00FFC0] transition-colors md:hidden focus:outline-none" onClick={onToggleMobileNav} aria-label="Open Menu">
                 <Icons.Menu className="h-6 w-6" aria-hidden="true" />
             </button>
         )}
         <div className="flex items-center gap-3 cursor-pointer group" onClick={() => isLoggedIn ? appContext?.setCurrentPage('Dashboard') : window.scrollTo(0,0)} role="button" tabIndex={0} aria-label="ZAP Home">
             <ZapLogo className="p-1.5 rounded-lg" iconClassName="h-5 w-5" />
             <span className={`font-orbitron text-xl font-bold text-white tracking-wider group-hover:text-glow transition-all ${isLoggedIn ? 'hidden sm:block' : 'block'}`}>ZAP</span>
         </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <NavLink 
            to="/leaderboard"
            className={({ isActive }) =>
                `hidden md:flex items-center gap-2 text-sm font-orbitron uppercase transition-colors ${isActive ? 'text-[#00FFC0]' : 'text-[#8d8c9e] hover:text-white'}`
            }
        >
            <Icons.BarChart className="h-4 w-4" />
            <span>Leaderboard</span>
        </NavLink>

        <NavLink 
            to="/tournaments"
            className={({ isActive }) =>
                `hidden md:flex items-center gap-2 text-sm font-orbitron uppercase transition-colors ${isActive ? 'text-[#00FFC0]' : 'text-[#8d8c9e] hover:text-white'}`
            }
        >
            <Icons.Swords className="h-4 w-4" />
            <span>Tournaments</span>
        </NavLink>

        <NavLink 
            to="/casinos"
            className={({ isActive }) =>
                `hidden md:flex items-center gap-2 text-sm font-orbitron uppercase transition-colors ${isActive ? 'text-[#00FFC0]' : 'text-[#8d8c9e] hover:text-white'}`
            }
        >
            <Icons.Library className="h-4 w-4" />
            <span>Casinos</span>
        </NavLink>

        {isLoggedIn && (
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-[#00FFC0] hover:text-[#00FFC0] hover:bg-[#00FFC0]/10 font-orbitron uppercase" onClick={onOpenReview}>
                <Icons.Edit className="h-4 w-4" aria-hidden="true" /> Write Review
            </Button>
        )}

        {!isLoggedIn ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={onOpenLogin} className="hidden sm:flex font-orbitron uppercase">
              LOG IN
            </Button>
            <Button size="sm" onClick={onOpenRegister} className="shadow-[0_0_15px_rgba(0,255,192,0.3)] font-orbitron uppercase tracking-wider">
              JOIN CIRCUIT
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
             <button className={`transition-all duration-200 focus:outline-none ${isMuted ? 'text-[#8d8c9e] hover:text-white' : 'text-[#00FFC0] hover:text-[#00FFC0]/80'}`} onClick={handleMuteToggle} title={isMuted ? "Unmute Audio" : "Mute Audio"}>
               {isMuted ? <Icons.EyeOff className="h-5 w-5" /> : <Icons.Activity className="h-5 w-5 animate-pulse-slow" />}
            </button>
            <button className="text-[#8d8c9e] hover:text-white transition-colors relative hover:scale-110 transform duration-200 focus:outline-none" onClick={() => appContext?.setCurrentPage('Messages')} aria-label="Messages">
               <Icons.Mail className="h-5 w-5" aria-hidden="true" />
               <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#00FFC0] rounded-full border-2 border-[#0c0c0e]"></span>
            </button>
            <button className="text-[#8d8c9e] hover:text-white transition-colors hover:scale-110 transform duration-200 focus:outline-none" onClick={() => appContext?.setCurrentPage('Rewards')} aria-label="Rewards">
               <Icons.Gift className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5 border border-[#00FFC0]/30 hover:border-[#00FFC0] transition-colors cursor-default" aria-label="Zap Point Balance: 1240">
                <Icons.Zap className="h-3.5 w-3.5 text-[#00FFC0]" aria-hidden="true" />
                <span className="text-xs font-bold text-white font-mono">1,240 ZP</span>
            </div>
            <div className="relative">
              <button onClick={() => { setIsProfileDropdownOpen(!isProfileDropdownOpen); if(!isProfileDropdownOpen) playSound('click_secondary', 0.2); }} className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95 focus:outline-none" aria-haspopup="true" aria-expanded={isProfileDropdownOpen} aria-label="User Menu">
                <img src="https://placehold.co/32x32/00FFC0/000000?text=DG" alt="Profile" className="h-8 w-8 rounded-md ring-1 ring-[#333333]" />
              </button>
              {isProfileDropdownOpen && (
                <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} aria-hidden="true"></div>
                    <div className="absolute right-0 mt-2 w-60 rounded-lg bg-[#0c0c0e] border border-[#333333] shadow-[0_0_30px_rgba(0,0,0,0.5)] py-1 z-40 animate-fadeIn origin-top-right" role="menu">
                        <div className="px-4 py-3 border-b border-[#333333] bg-[#14131c]/50">
                            <p className="text-sm font-bold text-white font-orbitron uppercase">DegenGambler</p>
                            <p className="text-[10px] text-[#00FFC0] font-mono flex items-center gap-1 mt-1">
                                <Icons.Shield className="h-3 w-3" /> LVL 42 OPERATOR
                            </p>
                        </div>
                        <div className="p-1">
                            <button onClick={() => { appContext?.setCurrentPage('Profile'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white transition-colors font-orbitron uppercase rounded-md" role="menuitem">
                                <Icons.Users className="h-4 w-4" aria-hidden="true" /> Profile Blueprint
                            </button>
                            <button onClick={() => { appContext?.setCurrentPage('Command Console'); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white transition-colors font-orbitron uppercase rounded-md" role="menuitem">
                                <Icons.Settings className="h-4 w-4" aria-hidden="true" /> Command Console
                            </button>
                        </div>
                        <div className="border-t border-[#333333] p-1">
                             <button onClick={() => { onLogout(); setIsProfileDropdownOpen(false); }} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors font-orbitron uppercase rounded-md" role="menuitem">
                                <Icons.LogOut className="h-4 w-4" aria-hidden="true" /> Terminate Session
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
