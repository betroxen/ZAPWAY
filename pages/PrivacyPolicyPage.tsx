
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const PrivacyPolicyPage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Lock className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        DATA PRIVACY PROTOCOL
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // CLASSIFICATION: NO SECRETS // STATUS: ENCRYPTED
                    </p>
                    <span className="hidden md:block text-[#333]">|</span>
                    <p className="text-[#8d8c9e] font-mono text-xs uppercase">
                        EFFECTIVE DATE: NOVEMBER 07, 2025
                    </p>
                </div>
            </div>

            {/* CORE MANIFESTO */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-16 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Eye className="h-5 w-5 text-[#00FFC0]" /> TRANSPARENCY IS TRUST
                    </h2>
                    <p className="text-lg text-white leading-relaxed mb-4">
                        We are committed to unwavering transparency—that includes your data. This protocol explains exactly what intelligence we pull, why we need it, and how we use it to give you the tactical edge.
                    </p>
                    <div className="bg-[#00FFC0]/10 p-4 rounded border-l-4 border-[#00FFC0] flex items-start gap-3">
                        <Icons.Shield className="h-6 w-6 text-[#00FFC0] shrink-0 mt-1" />
                        <div>
                            <strong className="text-[#00FFC0] font-heading uppercase text-sm block mb-1">ZERO SALE PROTOCOL</strong>
                            <p className="text-sm text-[#8d8c9e] leading-relaxed">
                                We do not, and will never, sell your individual personal data to third parties. We trade in community intelligence, not user identities.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* DATA PROTOCOLS */}
            <div className="space-y-12">

                {/* PROTOCOL 01: COLLECTION */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                        <span className="text-[#00FFC0]">01 //</span> INTELLIGENCE GATHERING (What We Collect)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-500/10 p-2 rounded">
                                    <Icons.Users className="h-6 w-6 text-blue-500" />
                                </div>
                                <h3 className="font-heading text-lg text-white uppercase">Player Identity</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-[#8d8c9e] font-mono">
                                <li className="flex justify-between border-b border-[#333] pb-2">
                                    <span>HANDLE/EMAIL</span>
                                    <span className="text-white">REQUIRED FOR ACCESS</span>
                                </li>
                                <li className="flex justify-between border-b border-[#333] pb-2">
                                    <span>WALLET ADDRESS</span>
                                    <span className="text-white">FOR SSP PAYOUTS ONLY</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>CONTRIBUTIONS</span>
                                    <span className="text-white">VPRS, FORUM POSTS</span>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-500/10 p-2 rounded">
                                    <Icons.Activity className="h-6 w-6 text-purple-500" />
                                </div>
                                <h3 className="font-heading text-lg text-white uppercase">Operational Data</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-[#8d8c9e] font-mono">
                                <li className="flex justify-between border-b border-[#333] pb-2">
                                    <span>IP ADDRESS</span>
                                    <span className="text-white">SECURITY & GEO-COMPLIANCE</span>
                                </li>
                                <li className="flex justify-between border-b border-[#333] pb-2">
                                    <span>DEVICE INTEL</span>
                                    <span className="text-white">OPTIMIZATION & FRAUD CHECK</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>USAGE LOGS</span>
                                    <span className="text-white">PLATFORM IMPROVEMENT</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* PROTOCOL 02: USAGE */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">02 //</span> OPERATIONAL USAGE (Why We Need It)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#14131c] p-5 rounded-lg border border-[#333] hover:border-[#00FFC0]/30 transition-all">
                            <Icons.Shield className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-white uppercase text-sm mb-2">Secure the Grid</h3>
                            <p className="text-xs text-[#8d8c9e]">Monitor for fraudulent VPRs, multi-accounting, and malicious activity to keep the ecosystem clean.</p>
                        </div>
                        <div className="bg-[#14131c] p-5 rounded-lg border border-[#333] hover:border-[#00FFC0]/30 transition-all">
                            <Icons.Target className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-white uppercase text-sm mb-2">Sharpen Tools</h3>
                            <p className="text-xs text-[#8d8c9e]">Analyze which data points (RTP, Volatility) are used most to build better, faster features.</p>
                        </div>
                        <div className="bg-[#14131c] p-5 rounded-lg border border-[#333] hover:border-[#00FFC0]/30 transition-all">
                            <Icons.Gift className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-white uppercase text-sm mb-2">Distribute Rewards</h3>
                            <p className="text-xs text-[#8d8c9e]">Track your contributions accurately to ensure you receive your rightful share of SSP payouts.</p>
                        </div>
                    </div>
                </section>

                {/* PROTOCOL 03: USER CONTROL */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">03 //</span> USER CONTROL TERMINAL (Your Rights)
                    </h2>
                    <Card className="p-6 bg-[#0c0c0e] border-[#333]">
                        <p className="text-[#8d8c9e] mb-6">
                            You own your data. You can request a full archive of everything we hold on you, or initiate the "Right to be Forgotten" protocol.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="secondary" className="font-mono uppercase text-xs flex items-center gap-2">
                                <Icons.Database className="h-4 w-4" /> REQUEST DATA ARCHIVE
                            </Button>
                            <Button variant="secondary" className="font-mono uppercase text-xs flex items-center gap-2 hover:text-red-500 hover:border-red-500">
                                <Icons.Trash className="h-4 w-4" /> INITIATE DELETION PROTOCOL
                            </Button>
                        </div>
                    </Card>
                </section>

            </div>

            {/* FOOTER CONTACT */}
            <div className="mt-16 p-6 bg-[#14131c] rounded-xl border border-[#333] flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-heading text-white uppercase mb-2 flex items-center gap-2">
                        <Icons.HelpCircle className="h-5 w-5 text-[#00FFC0]" /> PRIVACY OFFICER COMM LINE
                    </h3>
                    <p className="text-[#8d8c9e] text-sm">
                        Questions about our protocols? Direct line to our legal compliance team.
                    </p>
                </div>
                <a href="mailto:privacy@zap.gg" className="px-6 py-3 bg-[#0c0c0e] border border-[#00FFC0]/30 rounded text-[#00FFC0] font-mono uppercase text-sm hover:bg-[#00FFC0]/10 transition-colors">
                    privacy@zap.gg
                </a>
            </div>

        </div>
    );
};
