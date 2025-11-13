import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const TermsOfServicePage = () => {
  const cards = [
    { icon: Icons.User, title: "Your Account", description: "You must be 18+ and legally able to gamble. Your account is your responsibility. Keep your credentials secure." },
    { icon: Icons.Zap, title: "Our Service", description: "ZAP provides data and community tools. We are not a casino and do not handle funds. Our data is for informational purposes." },
    { icon: Icons.Gavel, title: "Code of Conduct", description: "Engage respectfully. No spam, manipulation, or malicious activity. Violation results in immediate termination of access." }
  ];
  return (
    // FIX: Added missing ctaText and ctaAction props.
    <GenericPage
      title="Terms of Engagement"
      intro="This is your contract with the Grid. By accessing ZAP, you agree to these terms. Read them carefully."
      cards={cards}
      ctaText={undefined}
      ctaAction={undefined}
    />
  );
};