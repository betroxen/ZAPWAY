
import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const AboutUsPage = () => {
  const cards = [
    { icon: Icons.Users, title: "Our Team", description: "Founded by ex-casino operators and professional gamblers who wanted to fix the industry." },
    { icon: Icons.Globe, title: "Global Reach", description: "Operating remotely with contributors from over 20 countries, ensuring 24/7 coverage of the crypto space." },
    { icon: Icons.Shield, title: "Our Promise", description: "We will never accept payment to alter a review score. Our reputation is our only asset." }
  ];
  return (
    <GenericPage
      title="About Us"
      intro="Zap was born out of frustration. We were tired of affiliate sites that cared more about their commissions than their community. We're building the alternative."
      cards={cards}
    />
  );
};
