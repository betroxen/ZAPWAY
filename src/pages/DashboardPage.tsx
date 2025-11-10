
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';
import { ToastContext } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';
import { ProgressBar } from '../components/ProgressBar';

interface Rank {
    name: string;
    zp: number;
}

export const DashboardPage = () => {
    const navigate = useNavigate();
    const showToast = useContext(ToastContext)?.showToast ?? (() => {});
    const { setMuted } = useSound();

    const [user, setUser] = useState<any>(null);
    const [settings, setSettings] = useState<any>(null);
    const [points, setPoints] = useState(0);
    const [ranks, setRanks] = useState<Rank[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                navigate('/home');
                return;
            }

            try {
                // Fetch all data in parallel
                const [userRes, ranksRes] = await Promise.all([
                    fetch('http://localhost:3001/user', { headers: { 'x-appwrite-jwt': jwt } }),
                    fetch('http://localhost:3001/api/ranks')
                ]);

                if (!userRes.ok) throw new Error('SESSION EXPIRED. PLEASE LOG IN AGAIN.');
                if (!ranksRes.ok) throw new Error('Could not load rank system.');

                const userData = await userRes.json();
                const ranksData = await ranksRes.json();

                setUser(userData.user);
                setSettings(userData.settings);
                setPoints(userData.points);
                setRanks(ranksData);
                setMuted(userData.settings.audioMuted);

            } catch (error: any) {
                showToast(error.message, 'error');
                localStorage.removeItem('jwt');
                navigate('/home');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate, showToast, setMuted]);

    const handleSettingChange = useCallback(async (key: string, value: any) => {
        // ... (existing settings change logic)
    }, [settings, showToast]);

    if (isLoading || !user || !settings || ranks.length === 0) {
        return <div className="flex items-center justify-center h-screen font-mono text-[#00FFC0]">// LOADING GRID NODE...</div>;
    }

    const currentRank = ranks.slice().reverse().find(r => points >= r.zp) || ranks[0];
    const nextRank = ranks.find(r => points < r.zp);
    const rankProgress = nextRank ? ((points - currentRank.zp) / (nextRank.zp - currentRank.zp)) * 100 : 100;

    return (
        <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
            {/* ... (Header is the same) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                        <h2 className="font-heading text-xl text-white uppercase tracking-wider border-b border-[#3a3846] pb-3 mb-6 flex items-center gap-3"><Icons.BarChart className="h-5 w-5 text-[#00FFC0]"/>NODE STATUS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="font-mono text-sm text-[#8d8c9e] uppercase">Z-POINTS (ZP)</p>
                                <p className="font-orbitron text-5xl text-white font-black tracking-tighter">{points.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="font-mono text-sm text-[#8d8c9e] uppercase">CURRENT RANK</p>
                                <p className="font-orbitron text-5xl text-[#00FFC0] font-black tracking-tighter text-glow">{currentRank.name}</p>
                            </div>
                        </div>
                        {nextRank && (
                            <div className="mt-8">
                                <div className="flex justify-between items-center font-mono text-sm mb-2">
                                    <span className="text-[#8d8c9e]">PROGRESS TO <span className="text-[#00FFC0]">{nextRank.name}</span></span>
                                    <span className="text-white">{points.toLocaleString()} / {nextRank.zp.toLocaleString()} ZP</span>
                                </div>
                                <ProgressBar progress={rankProgress} />
                            </div>
                        )}
                    </Card>
                </div>
                <div className="space-y-8">
                   {/* ... (Quick Comms card is the same) */}
                </div>
            </div>
        </div>
    );
};
