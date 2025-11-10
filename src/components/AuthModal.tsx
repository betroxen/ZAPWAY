
import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { ZapLogo } from './ZapLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'login' | 'register';
  onLoginSuccess: () => void;
}

// --- Validation Regex ---
const USERNAME_REGEX = /^[a-zA-Z0-9]{4,15}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,30}$/;

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Validation states
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
      length: false,
      uppercase: false,
      number: false,
      symbol: false
  });

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      resetForm();
    }
  }, [isOpen, initialTab]);

  // Real-time username validation
  useEffect(() => {
      if (username.length > 0) {
          setIsUsernameValid(USERNAME_REGEX.test(username));
      } else {
          setIsUsernameValid(null);
      }
  }, [username]);

  // Real-time password strength analyzer
  useEffect(() => {
      if (!password) {
          setPasswordStrength(0);
          setPasswordCriteria({ length: false, uppercase: false, number: false, symbol: false });
          return;
      }
      const criteria = {
          length: password.length >= 8 && password.length <= 30,
          uppercase: /[A-Z]/.test(password),
          number: /[0-9]/.test(password),
          symbol: /[!@#$%^&*]/.test(password)
      };
      setPasswordCriteria(criteria);
      const score = Object.values(criteria).filter(Boolean).length;
      setPasswordStrength(score);
  }, [password]);

  const resetForm = () => {
      setEmail('');
      setPassword('');
      setUsername('');
      setConfirmPassword('');
      setTermsAccepted(false);
      setPasswordStrength(0);
      setIsUsernameValid(null);
      setError('');
      setIsLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'login') {
        if (!email || !password) { setError('CREDENTIALS MISSING'); return; }
    } else {
        if (!isUsernameValid) { setError('INVALID HANDLE SYNTAX'); return; }
        if (passwordStrength < 4) { setError('PASSKEY DOES NOT MEET CRITERIA'); return; }
        if (password !== confirmPassword) { setError('PASSKEY MISMATCH'); return; }
        if (!termsAccepted) { setError('AFFIRMATION PROTOCOL REQUIRED'); return; }
    }

    setIsLoading(true);

    const url = activeTab === 'login' ? 'http://localhost:3001/login' : 'http://localhost:3001/register';
    const payload = activeTab === 'login' ? { email, password } : { email, password, username };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            // Use backend error message if available, otherwise a generic one
            throw new Error(data.message || 'AUTHENTICATION FAILED');
        }

        onLoginSuccess();
        resetForm();

    } catch (err: any) {
        setError(err.message.toUpperCase());
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const isLoginValid = email.length > 0 && password.length > 0;
  const isRegisterValid = isUsernameValid && passwordStrength === 4 && password === confirmPassword && termsAccepted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:py-8">
      <div 
        className="fixed inset-0 bg-[#000000]/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full sm:max-w-[480px] max-h-[95vh] flex flex-col bg-[#0c0c0e] border border-[#00FFC0]/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-modal-enter overflow-hidden">
        
        <button 
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#8d8c9e] hover:text-[#00FFC0] transition-colors p-2 z-20 bg-[#0c0c0e]/50 rounded-full sm:bg-transparent"
        >
            <Icons.X className="h-5 w-5" />
        </button>

        <div className="flex-shrink-0 p-5 pb-0 sm:p-6 sm:pb-0 text-center group relative z-10 bg-[#0c0c0e]">
            <ZapLogo className="mx-auto mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-2xl inline-block" iconClassName="h-8 w-8 sm:h-10 sm:w-10" />
            
            <h2 className="font-heading text-lg sm:text-xl text-white uppercase tracking-widest">
                {activeTab === 'login' ? 'WELCOME BACK, OPERATOR' : 'INITIATE NEW PROFILE'}
            </h2>
            <p className="text-[10px] sm:text-xs font-mono text-[#00FFC0] mt-1 sm:mt-2 tracking-wider opacity-80">
                {activeTab === 'login' ? '// AUTHENTICATION REQUIRED' : '// SECURE YOUR GRID IDENTITY'}
            </p>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                
                {activeTab === 'register' && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Handle (4-15 Chars, A-Z, 0-9)</label>
                            {isUsernameValid === true && <span className="text-[10px] font-mono uppercase text-[#00FFC0]">SYNTAX VALID</span>}
                            {isUsernameValid === false && <span className="text-[10px] font-mono uppercase text-red-500">INVALID SYNTAX</span>}
                        </div>
                        <div className="relative">
                            <Icons.Users className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isUsernameValid === false ? 'text-red-500' : 'text-[#666]'}`} />
                            <Input 
                                placeholder="UNIQUE_ID..." 
                                className={`pl-10 font-mono ${isUsernameValid === false ? '!border-red-900 focus:!border-red-500' : ''}`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                maxLength={15}
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Email Protocol</label>
                    <div className="relative">
                        <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                        <Input 
                            type="email" 
                            placeholder="OPERATOR@ZAP.GG" 
                            className="pl-10 font-mono"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                     <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Passkey (8-30 Chars)</label>
                    <div className="relative">
                        <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                        <Input 
                            type="password" 
                            placeholder="••••••••"
                            className="pl-10 font-mono"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={30}
                        />
                    </div>
                    {/* Password Strength Criteria */}
                    {activeTab === 'register' && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 pt-1 px-1">
                            <CriteriaItem label="8-30 Chars" met={passwordCriteria.length} />
                            <CriteriaItem label="Uppercase" met={passwordCriteria.uppercase} />
                            <CriteriaItem label="Number" met={passwordCriteria.number} />
                            <CriteriaItem label="Symbol" met={passwordCriteria.symbol} />
                        </div>
                    )}
                </div>

                {activeTab === 'register' && (
                    <>
                        <div className="space-y-1">
                            <label className="text-[10px] sm:text-xs font-mono text-[#8d8c9e] uppercase ml-1">Confirm Passkey</label>
                            <div className="relative">
                                <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                                <Input 
                                    type="password" 
                                    placeholder="RE-ENTER PASSKEY" 
                                    className={`pl-10 font-mono ${confirmPassword && password !== confirmPassword ? '!border-red-900 focus:!border-red-500' : ''}`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    maxLength={30}
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group p-2 sm:p-3 rounded border border-[#333] hover:border-[#3a3846] bg-[#0A0A0A] transition-colors">
                            <div className="relative flex items-center mt-0.5">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <div className="h-5 w-5 border-2 border-[#333] rounded bg-[#14131c] peer-checked:bg-[#00FFC0] peer-checked:border-[#00FFC0] transition-all flex items-center justify-center">
                                    <Icons.Check className={`h-3 w-3 text-black ${termsAccepted ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                            </div>
                            <span className="text-[10px] text-[#8d8c9e] leading-tight font-mono uppercase">
                                I AFFIRM I AM 18+ AND ACCEPT THE <button type="button" className="text-[#00FFC0] hover:underline">TERMS</button> AND <button type="button" className="text-[#00FFC0] hover:underline">PRIVACY POLICY</button>.
                            </span>
                        </label>
                    </>
                )}

                {error && (
                    <div className="p-3 bg-red-950/30 border border-red-900/50 rounded text-red-400 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                        <Icons.AlertTriangle className="h-4 w-4 shrink-0" /> {error}
                    </div>
                )}

                <Button 
                    type="submit" 
                    className={`w-full mt-4 font-heading uppercase tracking-[0.15em] text-sm py-3 sm:py-4 transition-all duration-300
                        ${(activeTab === 'login' ? isLoginValid : isRegisterValid) ? 'shadow-[0_0_30px_rgba(0,255,192,0.3)] animate-pulse-glow' : 'opacity-50 cursor-not-allowed'}
                    `}
                    size="lg"
                    loading={isLoading}
                    disabled={isLoading || !(activeTab === 'login' ? isLoginValid : isRegisterValid)}
                >
                    {activeTab === 'login' ? 'ESTABLISH CONNECTION' : 'CREATE OPERATOR PROFILE'}
                </Button>
            </form>

            <div className="mt-4 sm:mt-5 text-center space-y-3">
                {activeTab === 'login' ? (
                    <>
                        <button className="text-xs font-mono text-[#8d8c9e] hover:text-[#00FFC0] transition-colors uppercase tracking-wider block mx-auto">
                            [ FORGOT PASSKEY? ]
                        </button>
                        <p className="text-xs text-[#666] font-mono uppercase">
                            NEW TO THE GRID? <button onClick={() => { resetForm(); setActiveTab('register'); }} className="text-white hover:text-[#00FFC0] ml-1 font-bold transition-colors">INITIATE NEW PROFILE</button>
                        </p>
                    </>
                ) : (
                    <p className="text-xs text-[#666] font-mono uppercase">
                        ALREADY OPERATIVE? <button onClick={() => { resetForm(); setActiveTab('login'); }} className="text-white hover:text-[#00FFC0] ml-1 font-bold transition-colors">ESTABLISH CONNECTION</button>
                    </p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for password criteria
const CriteriaItem: React.FC<{ label: string; met: boolean }> = ({ label, met }) => (
    <div className={`flex items-center gap-1.5 transition-all duration-300 ${met ? 'text-[#00FFC0]' : 'text-[#666]'}`}>
        <div className={`h-1 w-3 rounded-full ${met ? 'bg-[#00FFC0]' : 'bg-[#333]'}`} />
        <span className="text-[10px] font-mono uppercase">{label}</span>
    </div>
);
