'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Client, Account } from 'node-appwrite';
import { useToast } from './ToastContext';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

interface User { id: string; email: string; role: 'USER' | 'ADMIN'; }

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    account.get().then(u => setUser({ id: u.$id, email: u.email, role: u.labels[0] as any })).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const u = await account.get();
      setUser({ id: u.$id, email: u.email, role: u.labels[0] as any });
      addToast('Logged in successfully');
    } catch (error) {
      addToast('Login failed', 'error');
      throw error;
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    addToast('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};