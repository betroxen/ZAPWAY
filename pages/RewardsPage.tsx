
import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const RewardsPage = () => {
  const cards = [
    { icon: Icons.Gift, title: "Available Rewards", description: "Redeem your Zap Points for bonuses, merch, or crypto airdrops." },
    { icon: Icons.Zap, title: "Mission Board", description: "Complete tasks to earn points and climb the ranks faster." },
    { icon: Icons.Trophy, title: "Referral Program", description: "Invite friends and earn a cut of their activity forever." }
  ];
  return (
    <GenericPage
      title="Rewards"
      intro="Earn and redeem like a true degen. ZAP's rewards system is designed to value your contributions."
      cards={cards}
      ctaText="Redeem Now"
      ctaAction={() => { /* Open rewards catalog */ }}
    />
  );
};
