
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const ReviewMethodologyPage = () => {
    const PILLARS = [
        {
            id: "I",
            title: "TRUE RTP & FEES",
            weight: "40%",
            icon: Icons.Percent,
            color: "text-[#00FFC0]",
            border: "border-[#00FFC0]/30",
            bg: "bg-[#00FFC0]/5",
            source: "Dedicated ZAP Data Engine & On-Chain Audit",
            focus: "RAW MATH. Audited payout rates, low house edge, and minimal withdrawal fees. This determines your statistical win probability."
        },
        {
            id: "II",
            title: "SECURITY & COMPLIANCE",
            weight: "30%",
            icon: Icons.Shield,
            color: "text-blue-400",
            border: "border-blue-500/30",
            bg: "bg-blue-500/5",
            source: "ZAP Vetting Team & Live License Monitoring",
            focus: "PROTECTION. Verifiable RNG, robust AML/KYC protocols, and evidence of sufficient operational capital to cover all player balances."
        },
        {
            id: "III",
            title: "COMMUNITY VETO",
            weight: "20%",
            icon: Icons.Users,
            color: "text-purple-400",
            border: "border-purple-500/30",
            bg: "bg-purple-500/5",
            source: "Validated Player Reports (VPRs) & Forum Sentiment",
            focus: "PLAYER VOICE. Honest, uncensored feedback on payout speed, support competence, and term clarity. The ultimate integrity check."
        },
        {
            id: "IV",
            title: "USER EXPERIENCE (UX)",
            weight: "10%",
            icon: Icons.LayoutDashboard,
            color: "text-yellow-500",
            border: "border-yellow-500/30",
            bg: "bg-yellow-500/5",
            source: "UI/Mobile Audit & Platform Stability Checks",
            focus: "EFFICIENCY. The speed, mobile responsiveness, and overall stability of the gaming interface during peak loads."
        }
    ];

    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Database className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        ZAP SCORE METHODOLOGY
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // THE DATA CONTRACT V2.0 // STATUS: ACTIVE
                </p>
            </div>

            {/* INTRO MISSION */}
            <Card className="mb-16 p-8 bg-[#0c0c0e] border-[#00FFC0]/30 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase">TRANSPARENCY IS NON-NEGOTIABLE</h2>
                    <p className="text-lg text-[#8d8c9e] leading-relaxed max-w-3xl">
                        The ZAP Score is the gold standard because it’s immune to external influence. It is a live, dynamic rating determined by four weighted data streams. <strong className="text-white">If an operator compromises on one, the entire rating drops.</strong>
                    </p>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 192, 0.1) 25%, rgba(0, 255, 192, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 192, 0.1) 75%, rgba(0, 255, 192, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 192, 0.1) 25%, rgba(0, 255, 192, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 192, 0.1) 75%, rgba(0, 255, 192, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px'}}></div>
            </Card>

            {/* THE FOUR PILLARS */}
            <section className="mb-20">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <Icons.Activity className="h-6 w-6 text-[#00FFC0]" /> THE FOUR PILLARS (WEIGHTED DATA STREAMS)
                </h2>
                <div className="grid grid-cols-1 gap-6">
                    {PILLARS.map((pillar) => (
                        <Card key={pillar.id} className={`p-0 overflow-hidden border-[#333] transition-all duration-300 hover:border-opacity-50 ${pillar.border}`}>
                            <div className="flex flex-col md:flex-row">
                                {/* Weighting Module */}
                                <div className={`p-6 md:w-48 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#333] ${pillar.bg}`}>
                                    <pillar.icon className={`h-10 w-10 mb-2 ${pillar.color}`} />
                                    <span className={`font-mono text-4xl font-bold ${pillar.color}`}>{pillar.weight}</span>
                                    <span className="font-heading text-xs text-[#8d8c9e] uppercase tracking-widest mt-1">Impact Load</span>
                                </div>
                                {/* Details Module */}
                                <div className="p-6 flex-1 bg-[#14131c]">
                                    <h3 className="font-heading text-xl text-white uppercase mb-4 flex items-center gap-2">
                                        <span className={`${pillar.color}`}>{pillar.id}.</span> {pillar.title}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-1">
                                            <span className="text-xs font-mono text-[#8d8c9e] uppercase block mb-1">Data Source</span>
                                            <span className="text-sm text-white font-medium">{pillar.source}</span>
                                        </div>
                                        <div className="md:col-span-2">
                                            <span className="text-xs font-mono text-[#8d8c9e] uppercase block mb-1">Dynamic Metric Focus</span>
                                            <p className="text-sm text-[#8d8c9e] leading-relaxed">{pillar.focus}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* VETO & DECAY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* VETO MECHANISM (FAIL-SAFE) */}
                <Card className="p-8 bg-red-950/10 border-red-900/50 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 opacity-5">
                        <Icons.X className="h-64 w-64 text-red-500" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="font-heading text-2xl text-red-500 mb-6 flex items-center gap-3 uppercase">
                            <Icons.AlertTriangle className="h-6 w-6" /> Community Intervention (Veto)
                        </h3>
                        <p className="text-white mb-6">
                            The platform's ultimate fail-safe. If the collective, verified player experience reports consistent critical issues (e.g., slow payouts, hidden terms), the system triggers an <strong>immediate formal re-audit.</strong>
                        </p>
                        <div className="bg-black/40 p-4 rounded border-l-2 border-red-500">
                            <strong className="text-red-400 font-mono text-xs uppercase block mb-1">PROTOCOL ACTION:</strong>
                            <span className="text-[#8d8c9e] text-sm">The ZAP Score is instantly <span className="text-white font-bold">SUSPENDED</span> and a public VETO WARNING is issued. The community always dictates trust.</span>
                        </div>
                    </div>
                </Card>

                {/* SCORE DECAY (MAINTENANCE) */}
                <Card className="p-8 bg-[#14131c] border-[#333]">
                     <h3 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 uppercase">
                        <Icons.Clock className="h-6 w-6 text-yellow-500" /> Score Decay Algorithm
                    </h3>
                    <p className="text-[#8d8c9e] mb-6">
                        The ZAP Score is a living contract; it must be earned daily. We utilize a decay algorithm to ensure data doesn't go stale.
                    </p>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <Icons.Activity className="h-5 w-5 text-yellow-500 shrink-0" />
                            <span className="text-[#8d8c9e]"><strong className="text-white">Dynamic Data:</strong> Older VPRs and RTP audits carry progressively less weight over time.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Icons.Shield className="h-5 w-5 text-yellow-500 shrink-0" />
                            <span className="text-[#8d8c9e]"><strong className="text-white">Compliance Decay:</strong> Failing to update a required license triggers an accelerated decay in Pillar II.</span>
                        </li>
                    </ul>
                </Card>

            </div>

        </div>
    );
};
