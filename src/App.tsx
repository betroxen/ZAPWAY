
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { MessagesPage } from './pages/MessagesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { CasinoDirectoryPage } from './pages/CasinoDirectoryPage'; // Import CasinoDirectoryPage
import { CasinoDetailPage } from './pages/CasinoDetailPage'; // Import CasinoDetailPage
import { ToastProvider } from './context/ToastContext';
import { SoundProvider } from './context/SoundContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = !!localStorage.getItem('jwt');
    return isLoggedIn ? <>{children}</> : <Navigate to="/home" replace />;
};

function App() {
    const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'));

    useEffect(() => {
        // ... (existing logic)
    }, []);

    const handleLogout = () => {
        // ... (existing logic)
    };

    return (
        <Router>
            <ToastProvider>
                <SoundProvider>
                    <div className="bg-grid-pattern min-h-screen font-sans text-white">
                        <Header 
                            isLoggedIn={isLoggedIn} 
                            onLogout={handleLogout}
                            onOpenLogin={() => setAuthMode('login')} 
                            onOpenRegister={() => setAuthMode('register')} 
                        />
                        <main>
                            <Routes>
                                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/home" />} />
                                <Route path="/home" element={<HomePage onOpenLogin={() => setAuthMode('login')} onOpenRegister={() => setAuthMode('register')} isLoggedIn={isLoggedIn} />} />
                                
                                {/* Public Routes */}
                                <Route path="/profile/:username" element={<ProfilePage />} />
                                <Route path="/leaderboard" element={<LeaderboardPage />} />
                                <Route path="/casinos" element={<CasinoDirectoryPage />} />
                                <Route path="/casinos/:id" element={<CasinoDetailPage />} />

                                {/* Protected Routes */}
                                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                                <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
                                <Route path="/tournaments" element={<ProtectedRoute><TournamentsPage /></ProtectedRoute>} />

                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </main>
                        <Footer />
                        {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onLoginSuccess={() => setIsLoggedIn(true)} />} 
                    </div>
                </SoundProvider>
            </ToastProvider>
        </Router>
    );
}

export default App;
