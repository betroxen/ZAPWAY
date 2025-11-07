import React, { useState, useContext, useEffect } from 'react';
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
  const [isSuccess, setIsSuccess] = useState(false); // New success state for animation
  const { showToast } = useContext(ToastContext) || { showToast: () => {} };

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isOver18, setIsOver18] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({
      username: '',
      password: '',
      terms: ''
  });

  useEffect(() => {
      if (isOpen) {
          // Reset states when opening
          setTab(initialTab);
          setEmail('');
          setPassword('');
          setUsername('');
          setAcceptedTerms(false);
          setIsOver18(false);
          setErrors({ username: '', password: '', terms: '' });
          setIsSuccess(false);
      }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const validate = () => {
      let isValid = true;
      const newErrors = { username: '', password: '', terms: '' };

      if (tab === 'register') {
          if (username.length < 4 || username.length > 15) {
              newErrors.username = 'Username must be 4-15 characters.';
              isValid = false;
          }
          // Password: 8+ chars, latin letters, 1 special, 1 number
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          if (!passwordRegex.test(password)) {
             newErrors.password = 'Password must be 8+ chars, include a number & special character.';
             isValid = false;
          }
          if (!acceptedTerms || !isOver18) {
              newErrors.terms = 'You must accept terms and confirm you are 18+.';
              isValid = false;
          }
      } else {
          // Simple login validation
          if (!email || !password) isValid = false;
      }

      setErrors(newErrors);
      return isValid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) {
          // Toast for general error if specific inline ones aren't enough
          if (tab === 'login' && (!email || !password)) {
               showToast("Please enter your email and password.", "error");
          }
          return;
      }

      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
          setIsLoading(false);
          if (tab === 'login') {
             // Mock login success
             if (email.includes('@')) {
                 setIsSuccess(true);
                 showToast("Welcome back, Operator.", "success");
                 setTimeout(onLoginSuccess, 1000); // Wait for success animation
             } else {
                 showToast("Invalid credentials.", "error");
             }
          } else {
              // Mock register success
              setIsSuccess(true);
              showToast("Identity verified. Welcome to the Circuit.", "success");
              setTimeout(onLoginSuccess, 1000);
          }
      }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-[#14131c] border border-[#3a3846] p-8 text-left shadow-2xl transition-all animate-fadeIn">
        
        {/* Success Overlay */}
        {isSuccess && (
            <div className="absolute inset-0 z-10 bg-[#14131c] flex flex-col items-center justify-center animate-fadeIn">
                <Icons.CheckCircle className="h-16 w-16 text-[#1ed760] mb-4 animate-bounce" />
                <h3 className="font-heading text-2xl text-white">Authorized</h3>
            </div>
        )}

        <div className="absolute right-4 top-4">
          <button onClick={onClose} className="text-[#8d8c9e] hover:text-white transition-colors">
            <Icons.X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8 text-center">
          <Icons.Zap className="mx-auto h-12 w-12 text-[#1ed760]" />
          <h2 className="mt-4 font-heading text-2xl font-bold text-white">
            {tab === 'login' ? 'Welcome Back' : 'Join the Circuit'}
          </h2>
          <p className="mt-2 text-sm text-[#8d8c9e]">
            {tab === 'login' ? 'Sign in to continue your streak.' : 'Create an account to start earning.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-[#000000]/30 p-1">
          <button
            onClick={() => setTab('login')}
            className={`rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              tab === 'login' ? 'bg-[#24232d] text-white shadow' : 'text-[#8d8c9e] hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              tab === 'register' ? 'bg-[#24232d] text-white shadow' : 'text-[#8d8c9e] hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
                 <div>
                    <label className="block text-xs font-medium text-[#8d8c9e] mb-1">Username</label>
                    <div className="relative">
                        <Icons.Users className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${errors.username ? 'text-red-400' : 'text-[#8d8c9e]'}`} />
                        <Input 
                            type="text" 
                            placeholder="DegenKing123" 
                            className={`pl-10 ${errors.username ? '!border-red-500 focus:!ring-red-500' : ''}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {errors.username && <p className="text-xs text-red-400 mt-1">{errors.username}</p>}
                </div>
            )}
          <div>
            <label className="block text-xs font-medium text-[#8d8c9e] mb-1">Email Address</label>
            <div className="relative">
                <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8d8c9e]" />
                <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="pl-10" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <label className="block text-xs font-medium text-[#8d8c9e] mb-1">Password</label>
              {tab === 'login' && (
                <button type="button" className="text-xs text-[#1ed760] hover:underline">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
                <Icons.Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${errors.password ? 'text-red-400' : 'text-[#8d8c9e]'}`} />
                <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className={`pl-10 ${errors.password ? '!border-red-500 focus:!ring-red-500' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
             {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
          </div>

          {tab === 'register' && (
              <div className="pt-2 space-y-0">
                  <Toggle 
                    checked={acceptedTerms} 
                    onChange={setAcceptedTerms} 
                    label={<span className="text-sm text-[#8d8c9e]">I agree to the <a href="#" className="text-[#1ed760] hover:underline">Terms</a> & <a href="#" className="text-[#1ed760] hover:underline">Privacy Policy</a></span>}
                   />
                   <Toggle 
                    checked={isOver18} 
                    onChange={setIsOver18} 
                    label={<span className="text-sm text-[#8d8c9e]">I confirm I am 18 years or older</span>}
                   />
                   {errors.terms && <p className="text-xs text-red-400 text-center">{errors.terms}</p>}
              </div>
          )}

          <Button type="submit" className="w-full mt-6 shadow-[0_0_20px_rgba(29,215,96,0.2)]" loading={isLoading}>
            {tab === 'login' ? 'Log In' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
};