
import React, { useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Icons } from '../components/icons';
import { CasinoCard } from '../components/CasinoCard';
import { mockCasinosData } from '../constants/casinos';
import { AppContext } from '../context/AppContext';

const mockMissions = [
    { id: 1, title: "Review a New Casino", progress: 66, reward: "25 ZP" },
    { id: 2, title: "Weekly Wager Challenge", progress: 40, reward: "50 ZP" },
];

const mockActivity = [
    { id: 1, icon: Icons.Star, text: "You reviewed Stake.", time: "2h ago" },
    { id: 2, icon: Icons.Zap, text: "+5 ZP Daily Login claimed.", time: "1d ago" },
    { id: 3, icon: Icons.Trophy, text: "Rank #1,337 achieved!", time: "2d ago" },
];

export const DashboardPage = ({ setViewingCasinoId }: { setViewingCasinoId?: (id: string | null) => void; }) => {
    const appContext = useContext(AppContext);
    
    const handleViewDetails = (id: string) => {
        if (setViewingCasinoId) {
            setViewingCasinoId(id);
        } else if (appContext?.setViewingCasinoId) {
            appContext.setViewingCasinoId(id);
        }
    };

    const recommendedCasinos = mockCasinosData.filter(c => c.id === 'duel' || c.id === 'stake');

    return (
        <div className="container mx-auto max-w-7xl p-4 py-8 md:p-12 page-fade-in">
            {/* Hero Welcome */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-white/10">
                <div>
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1ed760] to-white">DegenGambler</span>
                    </h1>
                    <p className="text-lg text-[#8d8c9e]">Your circuit status is active. Ready to find your edge?</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                     <Button variant="secondary" size="sm" onClick={() => appContext?.setCurrentPage('Missions')}>
                        <Icons.Target className="w-4 h-4 mr-2"/> Daily Missions
                    </Button>
                    <Button size="sm" onClick={() => appContext?.setCurrentPage('Alpha Feed')}>
                        <Icons.Zap className="w-4 h-4 mr-2"/> Alpha Feed
                    </Button>
                </div>
            </div>

            {/* Stats HUD */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <div className="bg-[#14131c] border border-[#3a3846] p-5 rounded-lg flex items-center gap-4">
                    <div className="p-3 bg-[#1ed760]/10 rounded-md"><Icons.Zap className="w-6 h-6 text-[#1ed760]"/></div>
                    <div><p className="text-sm text-[#8d8c9e] font-medium uppercase">Zap Points</p><p className="font-heading text-2xl text-white">1,240</p></div>
                </div>
                <div className="bg-[#14131c] border border-[#3a3846] p-5 rounded-lg flex items-center gap-4">
                     <div className="p-3 bg-blue-500/10 rounded-md"><Icons.Trophy className="w-6 h-6 text-blue-400"/></div>
                     <div><p className="text-sm text-[#8d8c9e] font-medium uppercase">Rank</p><p className="font-heading text-2xl text-white">#1,337</p></div>
                </div>
                <div className="bg-[#14131c] border border-[#3a3846] p-5 rounded-lg flex items-center gap-4">
                     <div className="p-3 bg-purple-500/10 rounded-md"><Icons.Star className="w-6 h-6 text-purple-400"/></div>
                     <div><p className="text-sm text-[#8d8c9e] font-medium uppercase">Reviews</p><p className="font-heading text-2xl text-white">12</p></div>
                </div>
                <div className="bg-[#14131c] border border-[#3a3846] p-5 rounded-lg flex items-center gap-4">
                     <div className="p-3 bg-yellow-500/10 rounded-md"><Icons.Gift className="w-6 h-6 text-yellow-400"/></div>
                     <div><p className="text-sm text-[#8d8c9e] font-medium uppercase">Rewards</p><p className="font-heading text-2xl text-white">$45.00</p></div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Content - Recommended */}
                <div className="xl:col-span-2 space-y-10">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-heading text-2xl text-white flex items-center gap-2">
                                <Icons.Shield className="text-[#1ed760] h-6 w-6"/> Zap Recommended
                            </h2>
                             <Button variant="link" onClick={() => appContext?.setCurrentPage('Casino Directory')}>View Directory →</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recommendedCasinos.map(casino => (
                                <div key={casino.id} className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1ed760] to-[#24232d] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative">
                                         <CasinoCard casino={casino} onViewDetails={handleViewDetails} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Card className="p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-heading text-xl text-white">Active Missions</h2>
                        </div>
                        <div className="space-y-6">
                            {mockMissions.map(mission => (
                                <div key={mission.id}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-white">{mission.title}</span>
                                        <span className="font-bold text-[#1ed760] text-sm bg-[#1ed760]/10 px-2 py-0.5 rounded">{mission.reward}</span>
                                    </div>
                                    <ProgressBar progress={mission.progress} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <Card className="p-6">
                        <h2 className="font-heading text-xl text-white mb-5">Recent Activity</h2>
                        <ul className="space-y-5">
                            {mockActivity.map(activity => (
                                <li key={activity.id} className="flex items-start gap-4 relative pl-6 before:absolute before:left-2 before:top-2 before:w-0.5 before:h-full before:bg-[#3a3846] last:before:hidden">
                                    <div className="flex-shrink-0 z-10 bg-[#14131c] py-1">
                                        <activity.icon className="h-5 w-5 text-[#8d8c9e]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{activity.text}</p>
                                        <p className="text-xs text-[#8d8c9e] mt-1">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <div className="rounded-xl bg-gradient-to-br from-[#183d2d] to-[#14131c] p-6 border border-[#1ed760]/20">
                        <Icons.Zap className="h-8 w-8 text-[#1ed760] mb-4" />
                        <h3 className="font-heading text-lg text-white mb-2">Invite & Earn</h3>
                        <p className="text-sm text-[#8d8c9e] mb-4">Get 10% of all Zap Points earned by your referrals, forever.</p>
                        <Button variant="secondary" className="w-full bg-black/30 hover:bg-black/50 border border-[#1ed760]/30 text-white">Copy Referral Link</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
