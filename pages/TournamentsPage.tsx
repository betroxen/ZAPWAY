
import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const TournamentsPage = () => {
  const cards = [
    { icon: Icons.Zap, title: "Live Events", description: "Join ongoing tournaments with real prizes and leaderboards." },
    { icon: Icons.Trophy, title: "Upcoming", description: "Plan ahead with our calendar of high-stakes competitions." },
    { icon: Icons.Users, title: "Team Play", description: "Form squads and compete collectively for bigger rewards." }
  ];
  return (
    <GenericPage
      title="Tournaments"
      intro="Compete for glory and gains. ZAP hosts and aggregates the hottest tournaments in the space."
      cards={cards}
      ctaText="Join a Tournament"
      ctaAction={() => { /* Enter first available */ }}
    />
  );
};
