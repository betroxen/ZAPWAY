
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { ToastContext } from '../context/ToastContext';
import { Toggle } from './Toggle';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login', onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const { showToast } = useContext(ToastContext) || { showToast: () => {} };

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isOver18, setIsOver18] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);

  // Validation states
  const [errors, setErrors] = useState({
      username: '',
      password: '',
      terms: ''
  });

  useEffect(() => {
      if (isOpen) {
          setTab(initialTab);
          resetForm();
      }
  }, [isOpen, initialTab]);

  const resetForm = () => {
      setEmail('');
      setPassword('');
      setUsername('');
      setAcceptedTerms(false);
      setIsOver18(false);
      setErrors({ username: '', password: '', terms: '' });
      setRegSuccess(false);
      setPasswordStrength(0);
  };

  const calculatePasswordStrength = (pwd: string) => {
      let strength = 0;
      if (pwd.length >= 8) strength++;
      if (/[A-Z]/.test(pwd)) strength++;
      if (/[0-9]/.test(pwd)) strength++;
      if (/[^A-Za-z0-9]/.test(pwd)) strength++;
      setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPwd = e.target.value;
      setPassword(newPwd);
      calculatePasswordStrength(newPwd);
  };

  const validate = () => {
      let isValid = true;
      const newErrors = { username: '', password: '', terms: '' };

      if (tab === 'register') {
          if (username.length < 4 || username.length > 15) {
              newErrors.username = 'Handle must be 4-15 chars.';
              isValid = false;
          }
          if (passwordStrength < 2) {
             newErrors.password = 'Increase password complexity.';
             isValid = false;
          }
          if (!acceptedTerms || !isOver18) {
              newErrors.terms = 'Must accept protocols.';
              isValid = false;
          }
      } else {
          if (!email || !password) isValid = false;
      }

      setErrors(newErrors);
      return isValid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) {
          // In a full implementation, we'd shake the modal here
          return;
      }

      setIsLoading(true);
      
      // Simulate API Network Delay with "sequencing" feel
      setTimeout(() => {
          setIsLoading(false);
          if (tab === 'login') {
             if (email.includes('@')) {
                 showToast("IDENTITY VERIFIED. WELCOME OPERATOR.", "success");
                 onLoginSuccess(); 
             } else {
                 showToast("ACCESS DENIED: Invalid Credentials.", "error");
             }
          } else {
              setRegSuccess(true);
          }
      }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overflow-x-hidden" role="dialog" aria-modal="true">
      {/* Backdrop - Heavy blur for focus */}
      <div 
          className="fixed inset-0 bg-[#000000]/80 backdrop-blur-lg transition-opacity duration-300 ease-out" 
          onClick={onClose} 
          aria-hidden="true"
      />
      
      {/* MAIN TERMINAL CONTAINER */}
      <div 
          ref={modalRef}
          className="relative w-full max-w-md bg-[#0A0A0A] border border-[#333333] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden animate-materialize"
      >
        {/* Tactical Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-[#8d8c9e] hover:text-white bg-[#1A1A1A] hover:bg-red-950/30 hover:border-red-500/50 border border-transparent rounded-md p-1.5 transition-all duration-200 focus:outline-none z-20"
            aria-label="Terminate Session"
        >
          <Icons.X className="h-4 w-4" />
        </button>

        {regSuccess ? (
            // === SUCCESS TERMINAL ===
            <div className="p-8 py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#00FFC0] blur-xl opacity-20 rounded-full animate-pulse"></div>
                    <div className="relative h-24 w-24 bg-[#0A0A0A] rounded-full flex items-center justify-center border-2 border-[#00FFC0]">
                        <Icons.Shield className="h-12 w-12 text-[#00FFC0]" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#0A0A0A] rounded-full p-1 border border-[#00FFC0]">
                         <Icons.CheckCircle className="h-6 w-6 text-[#00FFC0]" />
                    </div>
                </div>
                
                <h2 className="font-heading text-2xl text-white uppercase tracking-[0.1em] mb-2 text-glow">
                    ACCESS GRANTED
                </h2>
                <p className="text-[#8d8c9e] font-mono text-sm mb-8">
                    IDENTITY ESTABLISHED. WELCOME TO THE GRID.
                </p>
                
                <div className="w-full bg-[#14131c]/50 p-4 rounded border-l-2 border-[#00FFC0] mb-8 text-left">
                    <p className="text-[#00FFC0] font-mono text-xs uppercase mb-1">// NEXT DIRECTIVE</p>
                    <p className="text-sm text-white leading-tight">Secure your perimeter. Set up Multi-Factor Authentication in your Command Console immediately.</p>
                </div>
                
                <Button 
                    onClick={onLoginSuccess} 
                    className="w-full shadow-[0_0_20px_rgba(0,255,192,0.2)] font-heading uppercase tracking-wider"
                >
                    ENTER THE CIRCUIT
                </Button>
            </div>
        ) : (
            <>
                {/* === AUTH HEADER === */}
                <div className="pt-8 px-6 sm:px-8 pb-0 text-center bg-[#0c0c0e] border-b border-[#1A1A1A]">
                    <Icons.Zap className="h-10 w-10 text-[#00FFC0] mx-auto mb-4 animate-pulse-slow" />
                    <h2 className="font-mono text-base sm:text-lg text-white uppercase tracking-[0.2em] mb-8">
                        // AUTHENTICATION_PROTOCOL
                    </h2>

                    {/* TACTICAL SLIDING TOGGLE */}
                    <div className="flex relative">
                        <button
                            onClick={() => setTab('login')}
                            className={`flex-1 pb-4 text-xs sm:text-sm font-heading uppercase tracking-wider transition-colors duration-300 ${tab === 'login' ? 'text-white' : 'text-[#8d8c9e] hover:text-white'}`}
                        >
                            LOGIN
                        </button>
                        <button
                            onClick={() => setTab('register')}
                            className={`flex-1 pb-4 text-xs sm:text-sm font-heading uppercase tracking-wider transition-colors duration-300 ${tab === 'register' ? 'text-white' : 'text-[#8d8c9e] hover:text-white'}`}
                        >
                            INITIALIZE
                        </button>
                        {/* Neon Active Line */}
                        <div 
                            className="absolute bottom-0 h-[2px] bg-[#00FFC0] w-1/2 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_-2px_10px_rgba(0,255,192,0.5)]"
                            style={{ transform: tab === 'login' ? 'translateX(0%)' : 'translateX(100%)' }}
                        />
                    </div>
                </div>

                {/* === SLIDING FORM CONTAINER === */}
                <div className="overflow-hidden bg-[#121212]">
                    <div 
                        className="flex w-[200%] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{ transform: tab === 'login' ? 'translateX(0%)' : 'translateX(-50%)' }}
                    >
                        {/* LOGIN FORM PANE */}
                        <div className="w-1/2 flex-shrink-0 p-6 sm:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-mono text-[#00FFC0] uppercase">Access ID (Email)</label>
                                    <div className="relative group">
                                        <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3a3846] group-focus-within:text-[#00FFC0] transition-colors" />
                                        <Input 
                                            type="email" 
                                            placeholder="operative@zap.gg" 
                                            className="pl-10 bg-[#0A0A0A] border-[#333] focus:border-[#00FFC0]/50" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="block text-xs font-mono text-[#00FFC0] uppercase">Passkey</label>
                                        <button type="button" className="text-[10px] text-[#8d8c9e] hover:text-white font-mono uppercase tracking-wider transition-colors">
                                            // FORGOT KEY?
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3a3846] group-focus-within:text-[#00FFC0] transition-colors" />
                                        <Input 
                                            type="password" 
                                            placeholder="••••••••" 
                                            className="pl-10 bg-[#0A0A0A] border-[#333] focus:border-[#00FFC0]/50"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full font-heading uppercase tracking-[0.15em] py-6 mt-2 shadow-[0_0_20px_rgba(0,255,192,0.15)]" loading={isLoading}>
                                    {isLoading ? 'VERIFYING...' : 'AUTHENTICATE'}
                                </Button>
                            </form>
                        </div>

                        {/* REGISTER FORM PANE */}
                        <div className="w-1/2 flex-shrink-0 p-6 sm:p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-mono text-[#00FFC0] uppercase">Establish Handle</label>
                                    <div className="relative group">
                                        <Icons.Users className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${errors.username ? 'text-red-500' : 'text-[#3a3846] group-focus-within:text-[#00FFC0]'}`} />
                                        <Input 
                                            type="text" 
                                            placeholder="Unique Alias..." 
                                            className={`pl-10 bg-[#0A0A0A] border-[#333] focus:border-[#00FFC0]/50 ${errors.username ? '!border-red-500 focus:!border-red-500' : ''}`}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    {errors.username && <p className="text-[10px] text-red-500 font-mono uppercase">{errors.username}</p>}
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-mono text-[#00FFC0] uppercase">Contact Email</label>
                                    <div className="relative group">
                                        <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3a3846] group-focus-within:text-[#00FFC0] transition-colors" />
                                        <Input 
                                            type="email" 
                                            placeholder="you@example.com" 
                                            className="pl-10 bg-[#0A0A0A] border-[#333] focus:border-[#00FFC0]/50" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-mono text-[#00FFC0] uppercase">Create Passkey</label>
                                    <div className="relative group">
                                        <Icons.Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${errors.password ? 'text-red-500' : 'text-[#3a3846] group-focus-within:text-[#00FFC0]'}`} />
                                        <Input 
                                            type="password" 
                                            placeholder="••••••••" 
                                            className={`pl-10 bg-[#0A0A0A] border-[#333] focus:border-[#00FFC0]/50 ${errors.password ? '!border-red-500 focus:!border-red-500' : ''}`}
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    {/* Tactical Password Meter */}
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="text-[10px] font-mono text-[#8d8c9e] uppercase mr-2">ENTROPY:</span>
                                        {[1, 2, 3, 4].map(level => (
                                            <div 
                                                key={level} 
                                                className={`h-1.5 flex-1 rounded-sm transition-all duration-300 ${
                                                    passwordStrength >= level 
                                                    ? (passwordStrength < 3 ? 'bg-yellow-500' : 'bg-[#00FFC0] shadow-[0_0_8px_#00FFC0]') 
                                                    : 'bg-[#222]'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    {errors.password && <p className="text-[10px] text-red-500 font-mono uppercase">{errors.password}</p>}
                                </div>

                                <div className="space-y-3 pt-2 bg-[#0c0c0e] p-3 rounded border border-[#333]">
                                    <Toggle 
                                        checked={acceptedTerms} 
                                        onChange={setAcceptedTerms} 
                                        label={<span className="text-xs text-[#8d8c9e] font-mono">ACCEPT <span className="text-white hover:text-[#00FFC0] cursor-pointer underline underline-offset-2">TERMS OF ENGAGEMENT</span></span>}
                                    />
                                    <Toggle 
                                        checked={isOver18} 
                                        onChange={setIsOver18} 
                                        label={<span className="text-xs text-[#8d8c9e] font-mono">CONFIRM AGE 18+</span>}
                                    />
                                    {errors.terms && <p className="text-[10px] text-red-500 font-mono uppercase text-center">{errors.terms}</p>}
                                </div>

                                <Button type="submit" className="w-full font-heading uppercase tracking-[0.15em] py-6" loading={isLoading}>
                                    {isLoading ? 'INITIALIZING...' : 'INITIALIZE ACCOUNT'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )}

      </div>
    </div>
  );
};
