import React from 'react';
import { mockCasinosData } from '../constants/casinos';
import { CasinoListPage } from '../components/CasinoListPage';

export const CasinoDirectoryPage = ({ setViewingCasinoId }: { setViewingCasinoId: (id: string | null) => void; }) => {
    return (
        <CasinoListPage
            title="Casino Directory"
            subtitle="<strong>We are not a casino.</strong> We're a community that vets and ranks the best, safest crypto casinos so you can find your edge."
            casinos={mockCasinosData}
            setViewingCasinoId={setViewingCasinoId}
        />
    );
};