import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const ReviewMethodologyPage = () => {
  const cards = [
    { icon: Icons.Database, title: "40% Data Driven", description: "The largest part of our ZAP Score is based on hard data: verified RTP, payout speeds, and fee transparency." },
    { icon: Icons.Shield, title: "30% Security & Trust", description: "We evaluate licensing, security protocols, and responsible gaming features to ensure player safety." },
    { icon: Icons.Users, title: "30% Community Signal", description: "Validated Player Reports (VPRs) and community sentiment directly impact the score, ensuring real-world experience is counted." }
  ];
  return (
    // FIX: Added missing ctaText and ctaAction props.
    <GenericPage
      title="ZAP Score Methodology"
      intro="Our scores aren't for sale. They are calculated using a transparent, data-driven methodology that prioritizes player experience and safety."
      cards={cards}
      ctaText={undefined}
      ctaAction={undefined}
    />
  );
};