'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">MyApp</Link>
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
            <Link href="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        <button onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'} Mode</button>
      </nav>
    </header>
  );
}