
import React from 'react';
import { Card } from '../components/Card';
import { Icons } from '../components/icons';

const mockLeaderboard = [
    { rank: 1, username: "CryptoWhale99", points: 45250, change: "up" },
    { rank: 2, username: "SatoshiDreamer", points: 42100, change: "same" },
    { rank: 3, username: "DegenKing", points: 38900, change: "down" },
    { rank: 4, username: "MoonShot", points: 35400, change: "up" },
    { rank: 5, username: "HodlGang", points: 31200, change: "same" },
    // ... more users
];

export const LeaderboardPage = () => {
    return (
        <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Icons.Trophy className="text-yellow-500 h-10 w-10" /> Leaderboard
            </h1>
            <p className="text-lg text-[#8d8c9e] mb-10">Top contributors and earners in the Circuit this month.</p>

            <Card className="p-0 overflow-hidden">
                <div className="bg-[#1ed760]/10 p-4 grid grid-cols-12 gap-4 text-sm font-medium text-[#1ed760] uppercase tracking-wider">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-6">User</div>
                    <div className="col-span-4 text-right">Zap Points</div>
                </div>
                <div className="divide-y divide-[#3a3846]">
                    {mockLeaderboard.map((entry) => (
                        <div key={entry.username} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors">
                            <div className="col-span-2 flex justify-center">
                                {entry.rank <= 3 ? (
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-black ${
                                        entry.rank === 1 ? 'bg-yellow-400' : entry.rank === 2 ? 'bg-gray-300' : 'bg-amber-600'
                                    }`}>
                                        {entry.rank}
                                    </div>
                                ) : (
                                    <span className="font-heading text-xl text-[#8d8c9e]">#{entry.rank}</span>
                                )}
                            </div>
                            <div className="col-span-6 flex items-center gap-3">
                                <img src={`https://placehold.co/32x32/24232d/ffffff?text=${entry.username.substring(0,2).toUpperCase()}`} alt={entry.username} className="rounded-full h-8 w-8" />
                                <span className={`font-medium ${entry.rank <= 3 ? 'text-white text-lg' : 'text-[#8d8c9e]'}`}>{entry.username}</span>
                            </div>
                            <div className="col-span-4 text-right font-heading text-white">
                                {entry.points.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
