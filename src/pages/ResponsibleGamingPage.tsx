import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';
import { useNavigate } from 'react-router-dom';

export const ResponsibleGamingPage = () => {
  const navigate = useNavigate();
  const cards = [
    { icon: Icons.Clock, title: "Set Limits", description: "Control your deposit, loss, and session time limits directly from your ZAP profile." },
    { icon: Icons.EyeOff, title: "Self-Exclusion", description: "Need a break? Activate a cool-off period or self-exclude from all ZAP-partnered operators." },
    { icon: Icons.HelpCircle, title: "Get Help", description: "Access resources and professional help if you feel your gambling is becoming a problem." }
  ];
  return (
    <GenericPage
      title="Responsible Gaming"
      intro="Gamble smarter means playing within your limits. We provide the tools to keep your play safe and in control."
      cards={cards}
      ctaText="Go to Settings"
      ctaAction={() => navigate('/settings')}
    />
  );
};
