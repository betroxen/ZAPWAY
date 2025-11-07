
import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { FeaturedCasinos } from '../sections/FeaturedCasinos';
import { AboutSection } from '../sections/AboutSection';
import { MissionSection } from '../sections/MissionSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { FAQComponent } from '../sections/FAQComponent';

interface HomePageProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenLogin, onOpenRegister, isLoggedIn }) => {
  return (
    <>
      <HeroSection onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} isLoggedIn={isLoggedIn} />
      <FeaturedCasinos />
      <AboutSection />
      <MissionSection />
      <FeaturesSection />
      <FAQComponent />
    </>
  );
};
