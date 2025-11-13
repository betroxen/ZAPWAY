import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const ProvablyFairPage = () => {
  const cards = [
    { icon: Icons.Lock, title: "Server Seed", description: "The casino provides a hashed (encrypted) version of a secret seed before you bet." },
    { icon: Icons.User, title: "Client Seed", description: "You provide a client seed, which you can change at any time to influence the outcome." },
    { icon: Icons.Zap, title: "Verification", description: "After the bet, the casino reveals the original server seed. You can combine it with your client seed to verify the outcome was predetermined and not manipulated." }
  ];
  return (
    // FIX: Added missing ctaText and ctaAction props.
    <GenericPage
      title="Provably Fair Protocol"
      intro="Don't trust—verify. Provably fair technology is a cryptographic method that ensures casino game outcomes are fair and not tampered with."
      cards={cards}
      ctaText={undefined}
      ctaAction={undefined}
    />
  );
};