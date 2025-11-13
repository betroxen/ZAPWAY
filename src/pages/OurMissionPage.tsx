import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const OurMissionPage = () => {
  const cards = [
    { icon: Icons.Zap, title: "Radical Transparency", description: "To expose the truth in the crypto gaming world through verifiable data and community intelligence." },
    { icon: Icons.Users, title: "Community Empowerment", description: "To give players the tools and the power to hold operators accountable and find their edge." },
    { icon: Icons.Gift, title: "Shared Success", description: "To create a self-sustaining ecosystem where contributors are rewarded for the value they create." }
  ];
  return (
    // FIX: Added missing ctaText and ctaAction props.
    <GenericPage
      title="Our Mission"
      intro="We are not a casino. We are the revolution. Our mission is to build a smarter, fairer crypto gambling ecosystem for everyone."
      cards={cards}
      ctaText={undefined}
      ctaAction={undefined}
    />
  );
};