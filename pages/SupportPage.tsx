
import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';

export const SupportPage = () => {
  const cards = [
    { icon: Icons.HelpCircle, title: "Knowledge Base", description: "Self-serve articles on common issues and platform guides." },
    { icon: Icons.MessageSquare, title: "Ticket System", description: "Submit detailed support requests for personalized assistance." },
    { icon: Icons.Shield, title: "Responsible Gaming", description: "Resources and tools to promote healthy gambling habits." }
  ];
  return (
    <GenericPage
      title="Support"
      intro="We're here to help you navigate the Circuit. Access resources or contact our team anytime."
      cards={cards}
      ctaText="Open a Ticket"
      ctaAction={() => { /* Open support form */ }}
    />
  );
};
