import React from 'react';
import { Card } from '../components/Card';
import { Icons } from '../components/icons';

const mockRtpData = [
    { game: "Gates of Olympus", provider: "Pragmatic Play", rtp: 96.5, platform: "Stake" },
    { game: "Sweet Bonanza", provider: "Pragmatic Play", rtp: 96.48, platform: "BC.Game" },
    { game: "Wanted Dead or a Wild", provider: "Hacksaw Gaming", rtp: 96.38, platform: "Rollbit" },
    { game: "Crazy Time", provider: "Evolution", rtp: 96.08, platform: "Stake" },
    { game: "Mental", provider: "Nolimit City", rtp: 96.06, platform: "All" },
    { game: "Reactoonz", provider: "Play'n GO", rtp: 96.51, platform: "Most" },
];

export const LiveRTPTrackerPage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-2">Live RTP Tracker</h1>
            <p className="text-lg text-[#8d8c9e] mb-8">Community-verified RTP data. Know your edge before you play.</p>

            <Card className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/10">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-[#8d8c9e] uppercase">Game</th>
                                <th className="p-4 text-xs font-semibold text-[#8d8c9e] uppercase">Provider</th>
                                <th className="p-4 text-xs font-semibold text-[#8d8c9e] uppercase text-right">Stated RTP</th>
                                <th className="p-4 text-xs font-semibold text-[#8d8c9e] uppercase">Platform</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRtpData.map(item => (
                                <tr key={item.game} className="border-b border-white/10 last:border-b-0 hover:bg-white/5">
                                    <td className="p-4 font-semibold text-white">{item.game}</td>
                                    <td className="p-4 text-white">{item.provider}</td>
                                    <td className="p-4 font-heading text-lg text-[#1ed760] text-right">{item.rtp}%</td>
                                    <td className="p-4 text-white">{item.platform}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
