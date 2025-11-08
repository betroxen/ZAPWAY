
import React, { useState, useEffect } from 'react';
import { AppContext, AppContextType } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { GlobalStyles } from './components/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Footer } from './sections/Footer';
import { ReviewModal } from './components/ReviewModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { CasinoDirectoryPage } from './pages/CasinoDirectoryPage';
import { CasinoDetailPage } from './pages/CasinoDetailPage';
import { BonusOffersPage } from './pages/BonusOffersPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { SupportPage } from './pages/SupportPage';
import { FAQPage } from './pages/FAQPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { AffiliatePage } from './pages/AffiliatePage';
import { BonusCalculatorPage } from './pages/BonusCalculatorPage';
import { LiveRTPTrackerPage } from './pages/LiveRTPTrackerPage';
import { MissionsPage } from './pages/MissionsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { CommunityHubPage } from './pages/CommunityHubPage';
import { MessagesPage } from './pages/MessagesPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { RewardsPage } from './pages/RewardsPage';
import { LiveSupportPage } from './pages/LiveSupportPage';
import { ResponsibleGamingPage } from './pages/ResponsibleGamingPage';
import { CommercialDisclosurePage } from './pages/CommercialDisclosurePage';
import { PartnerVettingPage } from './pages/PartnerVettingPage';
import { ReviewMethodologyPage } from './pages/ReviewMethodologyPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';

const App = () => {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // App state
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [viewingCasinoId, setViewingCasinoId] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewCasinoId, setReviewCasinoId] = useState<string | null>(null);

  // Simple initial route check could go here
  useEffect(() => {
      // Placeholder for future session persistence check
  }, []);

  const handleOpenLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = () => {
      // Slight delay to allow auth modal success animation to play if we add one
      setTimeout(() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
          setCurrentPage('Dashboard');
          window.scrollTo(0, 0);
      }, 500);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setCurrentPage('Home'); // Effectively ignored as standard HomePage renders when !isLoggedIn
  };

  const handleOpenReviewModal = (casinoId?: string) => {
      setReviewCasinoId(casinoId || null);
      setIsReviewModalOpen(true);
  };

  const appContextValue: AppContextType = {
    currentPage,
    setCurrentPage: (page) => {
        if (!isLoggedIn) {
             // If not logged in, trying to navigate just opens login
             handleOpenLogin();
             return;
        }
        setCurrentPage(page);
        setViewingCasinoId(null);
        setIsMobileNavOpen(false); // Close mobile nav on navigation
        window.scrollTo(0, 0);
    },
    isLoggedIn,
    setViewingCasinoId
  };

  const renderContent = () => {
    if (viewingCasinoId) {
        return <CasinoDetailPage casinoId={viewingCasinoId} onBack={() => setViewingCasinoId(null)} onOpenReview={() => handleOpenReviewModal(viewingCasinoId)} />;
    }

    switch (currentPage) {
      case 'Dashboard': return <DashboardPage setViewingCasinoId={setViewingCasinoId} />;
      case 'Casino Directory': return <CasinoDirectoryPage setViewingCasinoId={setViewingCasinoId} />;
      case 'Bonus Offers': return <BonusOffersPage setViewingCasinoId={setViewingCasinoId} />;
      case 'Profile': return <ProfilePage />;
      case 'Settings': return <SettingsPage />;
      case 'Support': return <SupportPage />;
      case 'FAQ': return <FAQPage />;
      case 'Terms of Service': return <TermsOfServicePage />;
      case 'Privacy Policy': return <PrivacyPolicyPage />;
      case 'About Us': return <AboutUsPage />;
      case 'Affiliate': return <AffiliatePage />;
      case 'Bonus Calculator': return <BonusCalculatorPage />;
      case 'RTP Tracker': return <LiveRTPTrackerPage />;
      case 'Missions': return <MissionsPage />;
      case 'Leaderboards': return <LeaderboardPage />;
      case 'Alpha Feed': return <CommunityHubPage />;
      case 'Messages': return <MessagesPage />;
      case 'Tournaments': return <TournamentsPage />;
      case 'Analytics': return <AnalyticsPage />;
      case 'Reports': return <ReportsPage />;
      case 'Rewards': return <RewardsPage />;
      case 'Live Support': return <LiveSupportPage />;
      case 'Responsible Gaming': return <ResponsibleGamingPage />;
      case 'Commercial Disclosure': return <CommercialDisclosurePage />;
      case 'Partner Vetting': return <PartnerVettingPage />;
      case 'Review Methodology': return <ReviewMethodologyPage />;
      case 'Knowledge Base': return <KnowledgeBasePage />;
      default: return <DashboardPage setViewingCasinoId={setViewingCasinoId} />;
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <ToastProvider>
        <GlobalStyles />
        <div className={`min-h-screen w-full bg-[#0A0A0A] text-[#FAFBFF] ${(isAuthModalOpen || isReviewModalOpen) ? 'modal-open' : ''}`}>
          
          {/* AUTH MODAL - Always available to be triggered */}
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            initialTab={authModalTab}
            onLoginSuccess={handleLoginSuccess}
          />

          {!isLoggedIn ? (
            // === PUBLIC LANDING LAYOUT ===
            <div className="flex flex-col min-h-screen animate-fadeIn">
                 <Header 
                    onOpenLogin={handleOpenLogin} 
                    onOpenRegister={handleOpenRegister} 
                    isLoggedIn={false} 
                    onLogout={handleLogout}
                    isSidebarCollapsed={true} // Always "collapsed" (hidden) in public view
                />
                <main className="flex-1">
                    {/* We use HomePage as the landing page content */}
                    <HomePage onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} isLoggedIn={false} />
                </main>
                <Footer />
            </div>
          ) : (
            // === AUTHENTICATED APP LAYOUT ===
            <div className="flex min-h-screen animate-fadeIn bg-[#0A0A0A]">
               <Sidebar 
                    isCollapsed={isSidebarCollapsed} 
                    setIsCollapsed={setIsSidebarCollapsed}
                    isMobileOpen={isMobileNavOpen}
                    setIsMobileOpen={setIsMobileNavOpen}
               />
               
               <div className="flex flex-1 flex-col min-w-0 transition-all duration-300">
                    <Header 
                        onOpenLogin={handleOpenLogin} 
                        onOpenRegister={handleOpenRegister} 
                        isLoggedIn={true} 
                        onLogout={handleLogout}
                        isSidebarCollapsed={isSidebarCollapsed}
                        onOpenReview={() => handleOpenReviewModal()}
                        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    />
                    
                    <main className="flex-1 overflow-x-hidden">
                        {renderContent()}
                    </main>

                    {/* Hide footer on highly interactive full-height pages */}
                    {currentPage !== 'Dashboard' && currentPage !== 'Messages' && <Footer />}
               </div>

                <FloatingActionButton />
                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                    initialCasinoId={reviewCasinoId}
                />
            </div>
          )}
        </div>
      </ToastProvider>
    </AppContext.Provider>
  );
};

export default App;
