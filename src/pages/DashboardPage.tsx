

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Icons } from '../components/icons';
import { Toggle } from '../components/Toggle';
import { mockCasinosData } from '../constants/casinos';

// Mock Data for a lively dashboard
const ALPHA_FEED = [
    { id: 1, type: 'PRIORITY', text: 'VPR VALIDATED: Duel.com payout delay confirmed. Score impacted.', time: '2m ago', icon: Icons.AlertTriangle },
    { id: 2, type: 'STANDARD', text: 'New Mission Available: "RTP Hunter" (50 ZP)', time: '15m ago', icon: Icons.Target },
    { id: 3, type: 'STANDARD', text: 'Community Veto initiated against "ShadyBet".', time: '1h ago', icon: Icons.Gavel },
    { id: 4, type: 'SYSTEM', text: 'SSP Reward Pool adjusted: +2.4% APY.', time: '3h ago', icon: Icons.Settings },
];

const ACTIVE_MISSIONS = [
    { id: 1, title: "VALIDATE A PAYOUT", reward: "50 ZP", progress: 0, status: "ACTIVE", description: "Submit one VPR for a withdrawal > $100." },
    { id: 2, title: "WEEKLY WAGER CHALLENGE", reward: "25 ZP", progress: 60, status: "ACTIVE", description: "Wager $500 on verified >96% RTP slots." },
];

const PerformanceSnapshot = () => {
    const data = [60, 75, 70, 85, 95, 90, 110]; // Mock ZP earnings for 7 days
    const labels = ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'Y-DAY', 'TODAY'];
    const maxVal = Math.max(...data) * 1.2;
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / maxVal) * 100}`).join(' ');

    return (
        <Card className="p-6 bg-[#0c0c0e] border-[#333]">
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg text-white uppercase flex items-center gap-2">
                <Icons.TrendingUp className="h-5 w-5 text-[#00FFC0]" /> PERFORMANCE SNAPSHOT
            </h2>
            <span className="text-xs font-mono text-[#8d8c9e]">LAST 7 DAYS (ZP EARNED)</span>
        </div>
        <div className="relative h-48 group">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            {/* Grid lines */}
            {[...Array(3)].map((_, i) => (
                <line key={i} x1="0" y1={(i + 1) * 25} x2="100" y2={(i + 1) * 25} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            ))}
            {/* Gradient */}
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#00FFC0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00FFC0" stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,100 ${points} 100,100`} fill="url(#chartGradient)" />
            {/* Line */}
            <polyline points={points} fill="none" stroke="#00FFC0" strokeWidth="0.8" />
            {/* Points */}
            {data.map((d, i) => (
                <circle key={i} cx={(i / (data.length - 1)) * 100} cy={100 - (d / maxVal) * 100} r="1.5" fill="#00FFC0" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            ))}
            </svg>
            <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-1">
                {labels.map(label => (
                    <div key={label} className="text-[10px] text-[#666] font-mono">{label}</div>
                ))}
            </div>
        </div>
        </Card>
    );
};

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [quickAesthetic, setQuickAesthetic] = useState(true);
    const [quickData, setQuickData] = useState(true);

    const duelCasino = mockCasinosData.find(c => c.id === 'duel');

    return (
        <div className="container mx-auto max-w-[1400px] p-4 py-6 md:p-8 page-fade-in">
            
            <div className="sticky top-16 z-20 bg-[#0A0A0A]/80 backdrop-blur-md py-4 mb-6 border-b border-[#333] flex flex-col md:flex-row justify-between items-start md:items-center -mx-4 px-4 md:-mx-8 md:px-8">
                <div>
                    <h1 className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wider">
                        WELCOME BACK, <span className="text-[#00FFC0] text-glow">DEGENGAMBLER</span>
                    </h1>
                    <p className="font-mono text-xs md:text-sm text-[#8d8c9e] mt-1">
                        // SYSTEM STATUS: <span className="text-[#00FFC0] font-bold animate-pulse">// OPTIMAL</span>
                    </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="secondary" size="sm" onClick={() => navigate('/missions')} className="font-heading uppercase text-xs">
                        <Icons.Target className="w-4 h-4 mr-2 text-[#00FFC0]"/> DAILY OPS
                    </Button>
                    <Button size="sm" onClick={() => navigate('/settings')} className="shadow-[0_0_15px_rgba(0,255,192,0.2)] font-heading uppercase text-xs">
                        <Icons.Settings className="w-4 h-4 mr-2"/> CONSOLE
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Zap className="w-16 h-16 text-[#00FFC0]"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">ZAP POINTS (ZP)</p>
                    <p className="font-mono text-3xl text-[#00FFC0] font-bold tracking-tight">1,240</p>
                    <div className="mt-3">
                        <div className="flex justify-between text-[10px] font-mono text-[#8d8c9e] mb-1">
                            <span>LVL 42 PROGRESS</span>
                            <span className="text-[#00FFC0]">85%</span>
                        </div>
                        <ProgressBar progress={85} className="h-1.5 bg-[#333]" />
                    </div>
                </Card>
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                     <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Trophy className="w-16 h-16 text-yellow-500"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">GLOBAL RANK</p>
                    <p className="font-mono text-3xl text-white font-bold tracking-tight">#1,337</p>
                    <p className="text-xs text-[#00FFC0] font-mono mt-2 flex items-center">
                        <Icons.ArrowUp className="w-3 h-3 mr-1" /> TOP 5%
                    </p>
                </Card>
                <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Database className="w-16 h-16 text-purple-500"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">VPRs LOGGED</p>
                    <p className="font-mono text-3xl text-white font-bold tracking-tight">12</p>
                    <button className="text-xs text-[#8d8c9e] hover:text-[#00FFC0] font-mono mt-2 flex items-center uppercase transition-colors">
                        [VIEW LOG] <Icons.ChevronRight className="w-3 h-3 ml-1" />
                    </button>
                </Card>
                 <Card className="p-5 bg-[#0c0c0e] border-[#333] relative overflow-hidden group hover:border-[#00FFC0]/30 transition-all">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Icons.Gift className="w-16 h-16 text-[#00FFC0]"/></div>
                    <p className="text-xs text-[#8d8c9e] font-heading uppercase tracking-widest mb-1">SSP REWARDS</p>
                    <p className="font-mono text-3xl text-[#00FFC0] font-bold tracking-tight">$45.00</p>
                    <p className="text-xs text-[#8d8c9e] font-mono mt-2">PENDING PAYOUT</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <PerformanceSnapshot />
                    <div>
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="font-heading text-xl text-white uppercase flex items-center gap-2">
                                <Icons.Target className="h-5 w-5 text-[#00FFC0]" /> ACTIVE MISSIONS
                            </h2>
                            <Button variant="link" onClick={() => navigate('/missions')} className="text-xs font-mono">VIEW ALL →</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ACTIVE_MISSIONS.map(mission => (
                                <Card key={mission.id} className="p-5 flex flex-col justify-between bg-[#14131c] hover:bg-[#1A1A1A] border-[#333] group">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-heading text-white text-sm uppercase">{mission.title}</h3>
                                            <span className="font-mono text-[#00FFC0] text-xs bg-[#00FFC0]/10 px-2 py-1 rounded border border-[#00FFC0]/20">
                                                +{mission.reward}
                                            </span>
                                        </div>
                                        <p className="text-[#8d8c9e] text-sm mb-4 leading-relaxed">{mission.description}</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-mono text-[#8d8c9e] mb-1">
                                            <span>PROGRESS</span>
                                            <span className={mission.progress > 0 ? "text-[#00FFC0]" : ""}>{mission.progress}%</span>
                                        </div>
                                        <ProgressBar progress={mission.progress} className="h-1" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
                        <div className="p-4 border-b border-[#333] flex justify-between items-center bg-[#14131c]">
                            <h2 className="font-heading text-lg text-white uppercase flex items-center gap-2">
                                <Icons.Zap className="h-5 w-5 text-[#00FFC0]" /> ALPHA FEED INTEL
                            </h2>
                             <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FFC0]"></span>
                                </span>
                                <span className="text-xs font-mono text-[#00FFC0] uppercase">LIVE</span>
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-4 space-y-3">
                            {ALPHA_FEED.map(item => (
                                <div 
                                    key={item.id} 
                                    className={`p-3 rounded border text-sm flex gap-3 items-start animate-fadeIn
                                        ${item.type === 'PRIORITY' 
                                            ? 'bg-[#00FFC0]/5 border-[#00FFC0]/50 shadow-[0_0_10px_rgba(0,255,192,0.1)]' 
                                            : 'bg-[#14131c] border-[#333]'}`}
                                >
                                    <div className={`mt-0.5 shrink-0 ${item.type === 'PRIORITY' ? 'text-[#00FFC0]' : 'text-[#8d8c9e]'}`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`${item.type === 'PRIORITY' ? 'text-white font-medium' : 'text-[#8d8c9e]'}`}>{item.text}</p>
                                        <p className="text-xs font-mono text-[#666] mt-1 uppercase">{item.time} // {item.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                </div>

                <div className="space-y-8">
                    <div>
                        <h2 className="font-heading text-xl text-white uppercase mb-4 flex items-center gap-2">
                            <Icons.Shield className="h-5 w-5 text-[#00FFC0]" /> GRID RECON
                        </h2>
                        {duelCasino ? (
                            <Card className="p-5 bg-[#0c0c0e] border-[#00FFC0] shadow-[0_0_40px_rgba(0,255,192,0.15)] relative overflow-hidden group animate-pulse-glow">
                                <div className="absolute inset-0 bg-[#00FFC0]/5 animate-pulse-slow pointer-events-none"></div>
                                <div className="absolute top-0 right-0 p-2 text-[#00FFC0] drop-shadow-[0_0_15px_#00FFC0]">
                                    <Icons.Gem className="h-8 w-8 fill-[#00FFC0]" />
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={duelCasino.logo} alt={duelCasino.name} className="w-14 h-14 rounded-md border-2 border-[#00FFC0]" />
                                    <div>
                                        <h3 className="font-heading text-xl text-white uppercase">{duelCasino.name}</h3>
                                        <div className="text-[10px] text-[#00FFC0] font-mono uppercase tracking-widest mt-1">ETERNAL CROWN RANK</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                                    <div className="bg-[#14131c] p-2 rounded border border-[#00FFC0]/30">
                                        <p className="text-[10px] text-[#8d8c9e] font-heading uppercase mb-1">TRUE RTP</p>
                                        <p className="font-mono text-lg text-[#00FFC0] font-bold">100%</p>
                                    </div>
                                    <div className="bg-[#14131c] p-2 rounded border border-[#00FFC0]/30">
                                        <p className="text-[10px] text-[#8d8c9e] font-heading uppercase mb-1">HOUSE EDGE</p>
                                        <p className="font-mono text-lg text-[#00FFC0] font-bold">0%</p>
                                    </div>
                                    <div className="bg-[#14131c] p-2 rounded border border-[#00FFC0]/30">
                                        <p className="text-[10px] text-[#8d8c9e] font-heading uppercase mb-1">PAYOUT</p>
                                        <p className="font-mono text-lg text-[#00FFC0] font-bold">INSTANT</p>
                                    </div>
                                </div>
                                <Button onClick={() => navigate(`/casinos/${duelCasino.id}`)} className="w-full shadow-[0_0_20px_rgba(0,255,192,0.3)] font-heading uppercase tracking-wider">
                                    ACCESS INTEL
                                </Button>
                            </Card>
                        ) : (
                            <Card className="p-8 text-center text-[#8d8c9e] border-dashed border-[#333] bg-transparent">
                                <p>Error loading featured operator.</p>
                            </Card>
                        )}
                    </div>

                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <h2 className="font-heading text-lg text-white uppercase mb-4 flex items-center gap-2">
                            <Icons.Settings className="h-5 w-5 text-[#8d8c9e]" /> QUICK COMMS
                        </h2>
                        <div className="divide-y divide-[#333]">
                             <Toggle 
                                checked={quickAesthetic} 
                                onChange={setQuickAesthetic} 
                                label={<span className="text-sm font-mono text-[#8d8c9e] uppercase">DARK OPS MODE</span>}
                            />
                             <Toggle 
                                checked={quickData} 
                                onChange={setQuickData} 
                                label={<span className="text-sm font-mono text-[#8d8c9e] uppercase">DATA: PERCENTAGE</span>}
                            />
                        </div>
                        <Button 
                            variant="secondary" 
                            onClick={() => navigate('/settings')}
                            className="w-full mt-4 border-[#333] text-[#8d8c9e] hover:text-white hover:border-[#00FFC0] transition-colors font-mono uppercase text-xs"
                        >
                            FULL CONSOLE ACCESS
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};