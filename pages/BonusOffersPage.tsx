import React from 'react';
import { mockCasinosData } from '../constants/casinos';
import { CasinoListPage } from '../components/CasinoListPage';

export const BonusOffersPage = ({ setViewingCasinoId }: { setViewingCasinoId: (id: string | null) => void; }) => {
    const bonusCasinos = [...mockCasinosData].sort((a, b) => {
         const aIsHigh = a.tags.includes('high-bonus');
         const bIsHigh = b.tags.includes('high-bonus');
         if (aIsHigh && !bIsHigh) return -1;
         if (!aIsHigh && bIsHigh) return 1;
         return b.rating - a.rating; // secondary sort by rating
    });

    return (
        <CasinoListPage
            title="Exclusive Bonus Offers"
            subtitle="Unlock the best bonuses in crypto gambling. We've partnered with top casinos to bring you exclusive deals with fair terms."
            casinos={bonusCasinos}
            setViewingCasinoId={setViewingCasinoId}
        />
    );
};