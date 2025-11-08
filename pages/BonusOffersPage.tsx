
import React, { useMemo } from 'react';
import { CasinoListPage } from '../components/CasinoListPage';
import { mockCasinosData } from '../constants/casinos';

export const BonusOffersPage = ({ setViewingCasinoId }: { setViewingCasinoId: (id: string | null) => void; }) => {
  // Filter for casinos that are tagged with 'high-bonus' or generally have a bonus listed.
  // For this mock, we'll use those tagged 'high-bonus' as priority.
  const bonusCasinos = useMemo(() => {
      return mockCasinosData.filter(c => c.tags.includes('high-bonus'));
  }, []);

  return (
    <CasinoListPage
      title="Active Bonus Operations"
      subtitle="High-yield opportunities vetted for fair terms. <span class='text-[#1ed760]'>Maximize your initial stack.</span>"
      casinos={bonusCasinos}
      setViewingCasinoId={setViewingCasinoId}
    />
  );
};
