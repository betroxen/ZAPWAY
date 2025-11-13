import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';
import { useNavigate } from 'react-router-dom';

export const PartnerVettingPage = () => {
    const navigate = useNavigate();
    const cards = [
    { icon: Icons.Shield, title: "Security Audit", description: "We conduct deep security audits on all potential partners, checking for vulnerabilities, fair practices, and secure fund handling." },
    { icon: Icons.Database, title: "Data Verification", description: "Partners must provide verifiable data on RTP, payout speeds, and fee structures. We cross-reference this with community VPRs." },
    { icon: Icons.Users, title: "Community Veto", description: "Even after vetting, our partners are subject to community oversight. A successful Community Veto can trigger a delisting." }
  ];
  return (
    <GenericPage
      title="Partner Vetting Protocol"
      intro="Not all operators make the cut. Our vetting process is rigorous and uncompromising. This is how we protect the Grid."
      cards={cards}
      ctaText="Apply for Partnership"
      ctaAction={() => navigate('/affiliate')}
    />
  );
};
