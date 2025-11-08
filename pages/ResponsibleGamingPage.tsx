
import React, { useContext } from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ToastContext } from '../context/ToastContext';

export const ResponsibleGamingPage = () => {
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };

    const handleLockdown = () => {
        if (window.confirm("CONFIRM PROTOCOL: Initiate temporary 24h account suspension? You will lose access to all data tools.")) {
            showToast("LOCKDOWN INITIATED. Session terminating...", "error");
        }
    };

    return (
        <div className="container mx-auto max-w-6xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <Icons.Shield className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                        TACTICAL DISCIPLINE PROTOCOL
                    </h1>
                </div>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                    // MISSION STATUS: MAINTAIN ABSOLUTE CONTROL
                </p>
            </div>

            {/* INTRO MANIFESTO */}
            <div className="prose prose-invert max-w-3xl mb-16">
                <p className="text-xl leading-relaxed text-white">
                    <strong className="text-[#00FFC0]">Gamble Smarter, Not Harder.</strong> This philosophy is non-negotiable. The edge is only valuable if you maintain absolute control. The moment the game controls you, you've lost your strategic advantage.
                </p>
            </div>

            {/* 1. THE PLAYER CONTRACT */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">01 //</span> SELF-CONTROL IS THE EDGE (Player Contract)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Financial Limit */}
                    <Card className="p-6 bg-[#0c0c0e] border-[#00FFC0]/20 hover:border-[#00FFC0]/50 group">
                        <Icons.Wallet className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">Financial Hard Stop</h3>
                        <p className="text-[#8d8c9e] text-sm mb-4 min-h-[60px]">
                            Budget Allocation. Determine your maximum affordable loss before starting. Do not deviate.
                        </p>
                        <div className="bg-[#14131c] p-3 rounded border border-[#333] text-xs font-mono text-[#00FFC0]">
                            <strong className="block text-white mb-1 uppercase">TACTICAL ENHANCEMENT:</strong>
                            Use external automated tools to track spending across all operators in real-time.
                        </div>
                    </Card>

                    {/* Time Limit */}
                     <Card className="p-6 bg-[#0c0c0e] border-blue-500/20 hover:border-blue-500/50 group">
                        <Icons.Clock className="h-8 w-8 text-blue-500 mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">Session Timer</h3>
                        <p className="text-[#8d8c9e] text-sm mb-4 min-h-[60px]">
                             Unplug Protocol. Set a rigid time limit (e.g., 60 mins). When the timer hits zero, walk away.
                        </p>
                        <div className="bg-[#14131c] p-3 rounded border border-[#333] text-xs font-mono text-blue-400">
                            <strong className="block text-white mb-1 uppercase">FATIGUE AUDIT:</strong>
                            Fatigue is the fastest route to losing your edge. Keep sessions short and focused.
                        </div>
                    </Card>

                    {/* Win Limit */}
                     <Card className="p-6 bg-[#0c0c0e] border-purple-500/20 hover:border-purple-500/50 group">
                        <Icons.Target className="h-8 w-8 text-purple-500 mb-4" />
                        <h3 className="font-heading text-lg text-white uppercase mb-2">The Win Lock</h3>
                        <p className="text-[#8d8c9e] text-sm mb-4 min-h-[60px]">
                             Profit Locking. Define a strict profit target (e.g., +50%). Hit it? Cash out immediately.
                        </p>
                        <div className="bg-[#14131c] p-3 rounded border border-[#333] text-xs font-mono text-purple-400">
                            <strong className="block text-white mb-1 uppercase">DISCIPLINE AUDIT:</strong>
                             Don't re-deploy locked profits. Chasing higher highs often leads to zero.
                        </div>
                    </Card>
                </div>
            </section>

            {/* 2. THE UNPLUG PROTOCOL */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-red-500 mb-6 flex items-center gap-3 border-b border-red-900/30 pb-4">
                    <span className="text-red-500">02 //</span> THE UNPLUG PROTOCOL (De-Escalation)
                </h2>
                <p className="text-[#8d8c9e] mb-8 text-lg">
                    If you feel you are losing control or the game has stopped being fun, INITIATE THE UNPLUG PROTOCOL immediately.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* DIRECT ACTION */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-red-950/10 border-red-900/50">
                            <h3 className="font-heading text-white uppercase mb-4 flex items-center gap-2">
                                <Icons.Lock className="h-5 w-5 text-red-500" /> ZAP ACCOUNT LOCKDOWN
                            </h3>
                            <p className="text-sm text-[#8d8c9e] mb-6">
                                Temporarily or permanently suspend your ZAP account to remove access to all data tools and rewards.
                            </p>
                            <Button 
                                onClick={handleLockdown}
                                className="w-full bg-red-500 hover:bg-red-600 text-white border-none font-heading uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                            >
                                INITIATE TEMPORARY LOCKDOWN
                            </Button>
                        </Card>
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                             <h3 className="font-heading text-white uppercase mb-4 flex items-center gap-2">
                                <Icons.Globe className="h-5 w-5 text-blue-500" /> OPERATOR EXCLUSION
                            </h3>
                             <p className="text-sm text-[#8d8c9e] mb-4">
                                You must use the self-exclusion and limit tools provided directly by the operators you play on.
                            </p>
                            <Button variant="secondary" className="w-full font-mono uppercase text-xs">
                                ACCESS OPERATOR LIMITS GUIDE
                            </Button>
                        </Card>
                    </div>

                    {/* GLOBAL SUPPORT TABLE */}
                    <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
                        <div className="p-4 bg-[#14131c] border-b border-[#333]">
                            <h3 className="font-heading text-white uppercase text-sm">GLOBAL SUPPORT INFRASTRUCTURE</h3>
                        </div>
                        <div className="p-4">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-[#8d8c9e] font-mono uppercase">
                                    <tr>
                                        <th className="pb-3">Resource Name</th>
                                        <th className="pb-3">Focus</th>
                                        <th className="pb-3 text-right">Contact Signal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    <tr>
                                        <td className="py-3 text-white font-medium">NCPG</td>
                                        <td className="py-3 text-[#8d8c9e]">US/Global Support</td>
                                        <td className="py-3 text-right font-mono text-[#00FFC0]">1-800-522-4700</td>
                                    </tr>
                                     <tr>
                                        <td className="py-3 text-white font-medium">GamCare</td>
                                        <td className="py-3 text-[#8d8c9e]">UK Advice Line</td>
                                        <td className="py-3 text-right font-mono text-[#00FFC0]">0808 8020 133</td>
                                    </tr>
                                     <tr>
                                        <td className="py-3 text-white font-medium">Gambling Therapy</td>
                                        <td className="py-3 text-[#8d8c9e]">Global Online Chat</td>
                                        <td className="py-3 text-right font-mono text-[#00FFC0]">gamblingtherapy.org</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </section>

            {/* FOOTER CLARIFICATION */}
            <div className="mt-16 p-6 bg-[#14131c] rounded-xl border-l-4 border-[#3a3846] flex items-start gap-4">
                <Icons.Info className="h-6 w-6 text-[#8d8c9e] flex-shrink-0" />
                <p className="text-sm text-[#8d8c9e] leading-relaxed font-mono">
                    <strong className="text-white font-heading uppercase">ZAP STATUS CLARIFICATION:</strong> ZAP is a data platform. We do not process wagers, hold funds, or offer game transactions. Our role is to provide the intelligence; your role is to maintain the tactical discipline.
                </p>
            </div>

        </div>
    );
};
