
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ProgressBar } from '../components/ProgressBar';

export const ProfilePage = () => {
    return (
        <div className="container mx-auto max-w-6xl p-4 py-10 md:p-12 page-fade-in">
            {/* Profile Header */}
            <Card className="relative overflow-hidden p-0 mb-8">
                <div className="h-48 bg-gradient-to-r from-[#183d2d] to-[#14131c]"></div>
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-end -mt-20">
                    <div className="relative">
                        <img 
                            src="https://placehold.co/150x150/1ed760/000000?text=DG" 
                            alt="Profile" 
                            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-[#14131c] shadow-xl"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-[#14131c] p-1.5 rounded-full">
                             <div className="bg-[#1ed760] p-1.5 rounded-full">
                                <Icons.Zap className="w-5 h-5 text-black fill-black" />
                             </div>
                        </div>
                    </div>
                    <div className="flex-1 mt-4 md:mt-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">DegenGambler</h1>
                            <span className="px-3 py-1 rounded-full bg-[#1ed760]/10 text-[#1ed760] text-sm font-bold border border-[#1ed760]/20">
                                Level 42
                            </span>
                        </div>
                        <p className="text-[#8d8c9e] text-lg max-w-2xl">Crypto native since 2017. Hunting for max RTP and fair play. Alpha seeker.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Button variant="secondary" className="flex-1 md:flex-none"><Icons.Share className="w-4 h-4 mr-2" /> Share Profile</Button>
                        <Button className="flex-1 md:flex-none"><Icons.Edit className="w-4 h-4 mr-2" /> Edit Profile</Button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Level Progress */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-heading text-lg text-white">Circuit Status</h3>
                             <span className="text-[#1ed760] font-bold">4,250 / 5,000 XP</span>
                        </div>
                        <ProgressBar progress={85} className="h-3 mb-4" />
                        <p className="text-sm text-[#8d8c9e]">750 XP until Level 43. Complete 2 more missions today to level up!</p>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                         <Card className="p-5 text-center border-[#1ed760]/20 bg-[#1ed760]/5">
                            <Icons.Zap className="w-8 h-8 text-[#1ed760] mx-auto mb-2" />
                            <p className="text-2xl font-heading text-white font-bold">1,240</p>
                            <p className="text-sm text-[#8d8c9e] uppercase font-medium">Zap Points</p>
                        </Card>
                         <Card className="p-5 text-center">
                            <Icons.Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <p className="text-2xl font-heading text-white font-bold">#1,337</p>
                            <p className="text-sm text-[#8d8c9e] uppercase font-medium">Global Rank</p>
                        </Card>
                         <Card className="p-5 text-center">
                            <Icons.Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                            <p className="text-2xl font-heading text-white font-bold">12</p>
                            <p className="text-sm text-[#8d8c9e] uppercase font-medium">Reviews</p>
                        </Card>
                    </div>

                    {/* Activity Feed */}
                    <Card className="p-6">
                        <h3 className="font-heading text-xl text-white mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 pb-6 border-b border-[#3a3846] last:border-0 last:pb-0">
                                    <div className="bg-[#24232d] p-3 rounded-full h-fit">
                                        {i === 1 ? <Icons.Star className="w-5 h-5 text-[#1ed760]" /> : 
                                         i === 2 ? <Icons.Target className="w-5 h-5 text-blue-400" /> : 
                                         <Icons.MessageSquare className="w-5 h-5 text-purple-400" />}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">
                                            {i === 1 ? 'Reviewed Stake Casino' : 
                                             i === 2 ? 'Completed "Daily Login" Mission' : 
                                             'Commented on "Hidden RTP" thread'}
                                        </p>
                                        <p className="text-sm text-[#8d8c9e] mt-1">
                                            {i === 1 ? 'Rated 5/5 stars. "Fastest withdrawals in the game..."' : 
                                             i === 2 ? 'Earned +5 Zap Points' : 
                                             'Shared alpha about a new slot release.'}
                                        </p>
                                        <p className="text-xs text-[#8d8c9e] mt-2">{i} day{i > 1 ? 's' : ''} ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <Card className="p-6">
                        <h3 className="font-heading text-lg text-white mb-4">Badges</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((badge) => (
                                <div key={badge} className={`aspect-square rounded-lg flex items-center justify-center ${badge <= 5 ? 'bg-[#1ed760]/10 text-[#1ed760] border border-[#1ed760]/30' : 'bg-[#24232d] text-[#3a3846] border border-[#3a3846]'}`}>
                                    <Icons.Shield className="w-6 h-6" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-heading text-lg text-white mb-4">Connected Accounts</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[#14131c] rounded-lg border border-[#3a3846]">
                                <div className="flex items-center gap-3">
                                    <Icons.Globe className="w-5 h-5 text-[#8d8c9e]" />
                                    <span className="text-white">Discord</span>
                                </div>
                                <span className="text-sm text-[#1ed760] flex items-center gap-1"><Icons.CheckCircle className="w-3 h-3" /> Verified</span>
                            </div>
                             <div className="flex items-center justify-between p-3 bg-[#14131c] rounded-lg border border-[#3a3846]">
                                <div className="flex items-center gap-3">
                                    <Icons.Wallet className="w-5 h-5 text-[#8d8c9e]" />
                                    <span className="text-white">Wallet</span>
                                </div>
                                <span className="text-sm text-[#8d8c9e]">0x...dEf1</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
