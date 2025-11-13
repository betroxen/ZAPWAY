import React, { createContext, useContext, useEffect, useState } from 'react';
// FIX: Import types from authService where they are now defined.
import { authService, User, RegisterData } from './authService';
// import { User, RegisterData } from './types';

const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  loading: boolean;
} | undefined>(undefined);

// FIX: Changed to React.FC to correctly handle children prop.
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Refresh on mount to check for existing session
  useEffect(() => {
    authService
      .refresh()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const u = await authService.login(email, password);
    setUser(u);
  };

  const register = async (data: RegisterData) => {
    const u = await authService.register(data);
    setUser(u);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};