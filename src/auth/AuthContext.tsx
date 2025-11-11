import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './authService';
import { User, RegisterData } from './types';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Refresh on mount to check for existing session
  useEffect(() => {
    // FIX: Changed authService.refresh() to authService.getCurrentUser() to match available methods.
    authService
      .getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const u = await authService.login(email, password);
    setUser(u);
  };

  const register = async (data: RegisterData) => {
    // FIX: Pass individual arguments to authService.register instead of a single object.
    const u = await authService.register(data.username, data.email, data.password);
    setUser(u);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAdmin = user?.prefs?.role === 'admin'; // Correctly check for role in user preferences

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAdmin,
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