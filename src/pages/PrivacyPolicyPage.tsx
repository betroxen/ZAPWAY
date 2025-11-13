import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const PrivacyPolicyPage = () => {
  const cards = [
    { icon: Icons.Database, title: "Data We Collect", description: "We collect data you provide (reviews, profile info) and anonymous usage data to improve the Grid. We never sell your personal information." },
    { icon: Icons.Shield, title: "Data Security", description: "Your data is secured with industry-standard encryption. We take privacy seriously and protect your information as if it were our own." },
    { icon: Icons.Settings, title: "Your Control", description: "You can request data deletion or export at any time. You have full control over your information and how it's used." }
  ];
  return (
    // FIX: Added missing ctaText and ctaAction props.
    <GenericPage
      title="Privacy Policy"
      intro="Your data is your own. This is our promise for how we handle it. We believe in transparency and your right to privacy."
      cards={cards}
      ctaText={undefined}
      ctaAction={undefined}
    />
  );
};