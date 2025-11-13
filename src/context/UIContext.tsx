import React, { createContext, useState, useContext } from 'react';

const UIContext = createContext<{
    isAuthModalOpen: boolean;
    authModalTab: string;
    openLogin: () => void;
    openRegister: () => void;
    closeAuthModal: () => void;
    isReviewModalOpen: boolean;
    reviewCasinoId: string | null;
    openReviewModal: (casinoId?: string) => void;
    closeReviewModal: () => void;
} | undefined>(undefined);

// FIX: Changed to React.FC to correctly handle children prop.
export const UIProvider: React.FC = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewCasinoId, setReviewCasinoId] = useState<string | null>(null);

  const openLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  
  const openReviewModal = (casinoId?: string) => {
      setReviewCasinoId(casinoId || null);
      setIsReviewModalOpen(true);
  };
  
  const closeReviewModal = () => setIsReviewModalOpen(false);

  return (
    <UIContext.Provider value={{ 
        isAuthModalOpen, authModalTab, openLogin, openRegister, closeAuthModal,
        isReviewModalOpen, reviewCasinoId, openReviewModal, closeReviewModal
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};