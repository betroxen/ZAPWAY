
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const CommercialDisclosurePage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.Info className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        COMMERCIAL DISCLOSURE
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // TRANSPARENCY PROTOCOL // STATUS: ACTIVE
                    </p>
                    <span className="hidden md:block text-[#333]">|</span>
                    <p className="text-[#8d8c9e] font-mono text-sm uppercase">
                        WE OPERATE IN THE LIGHT.
                    </p>
                </div>
            </div>

            {/* CORE MANIFESTO */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-16 relative overflow-hidden">
                 <div className="relative z-10">
                    <h2 className="font-heading text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Zap className="h-5 w-5 text-[#00FFC0]" /> THE DATA ENGINE REQUIRES FUEL
                    </h2>
                    <p className="text-lg text-[#8d8c9e] leading-relaxed max-w-3xl">
                        ZAP is powered by data, but high-fidelity intelligence isn't free. We believe in radical transparency regarding our financial model. <strong className="text-white">We earn so we can remain independent, unbiased, and relentless in our vetting.</strong>
                    </p>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* 1. THE REVENUE MODEL */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">01 //</span> OPERATIONAL REVENUE MODEL (Affiliate)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Step 1 */}
                    <Card className="p-6 bg-[#14131c] border-[#333] relative">
                        <div className="text-[#00FFC0] font-mono text-4xl font-bold opacity-20 absolute top-4 right-4">01</div>
                        <Icons.Link className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-white uppercase mb-2 text-sm">The Connection</h3>
                        <p className="text-sm text-[#8d8c9e]">You find a vetted operator on ZAP and click our secure tracking link to visit their platform.</p>
                    </Card>
                    {/* Step 2 */}
                     <Card className="p-6 bg-[#14131c] border-[#333] relative">
                        <div className="text-[#00FFC0] font-mono text-4xl font-bold opacity-20 absolute top-4 right-4">02</div>
                        <Icons.Users className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-white uppercase mb-2 text-sm">The Engagement</h3>
                        <p className="text-sm text-[#8d8c9e]">If you register and play, the operator pays ZAP a commission for the referral traffic.</p>
                    </Card>
                    {/* Step 3 */}
                     <Card className="p-6 bg-[#14131c] border-[#333] relative">
                        <div className="text-[#00FFC0] font-mono text-4xl font-bold opacity-20 absolute top-4 right-4">03</div>
                        <Icons.Zap className="h-8 w-8 text-[#00FFC0] mb-4" />
                        <h3 className="font-heading text-white uppercase mb-2 text-sm">The Fuel</h3>
                        <p className="text-sm text-[#8d8c9e]">This revenue funds our dev team, data audits, and the Shared Success Protocol (SSP) reward pool.</p>
                    </Card>
                </div>
                <div className="bg-[#00FFC0]/10 p-4 rounded border-l-4 border-[#00FFC0] flex items-start gap-3">
                    <Icons.CheckCircle className="h-6 w-6 text-[#00FFC0] shrink-0" />
                    <div>
                        <strong className="text-[#00FFC0] font-heading uppercase text-sm block mb-1">ZERO COST TO PLAYER</strong>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Our commission comes directly from the operator's marketing budget. It <strong className="text-white">NEVER</strong> affects your odds, RTP, bonuses, or fees. You pay the exact same (often less, thanks to exclusive ZAP bonuses) as a direct user.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. THE INTEGRITY FIREWALL */}
            <section className="mb-16">
                <h2 className="font-heading text-2xl text-red-500 mb-8 flex items-center gap-3 border-b border-red-900/30 pb-4">
                    <span className="text-red-500">02 //</span> THE INTEGRITY FIREWALL (Non-Negotiables)
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <p className="text-lg text-white">
                            Affiliate relationships are standard. Our <strong className="text-red-500">FIREWALL</strong> is what makes us different. Money cannot cross this line to influence data.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 p-4 bg-[#14131c] rounded border-l-2 border-red-500">
                                <Icons.Shield className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                                <span className="text-[#8d8c9e] text-sm">
                                    <strong className="text-white block font-heading uppercase mb-1">NO PAID RATINGS</strong>
                                    Operators cannot buy a higher ZAP Score. The score is algorithmically locked to Data (40%), Security (30%), and Community Veto (20%).
                                </span>
                            </li>
                             <li className="flex items-start gap-3 p-4 bg-[#14131c] rounded border-l-2 border-red-500">
                                <Icons.Trash className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                                <span className="text-[#8d8c9e] text-sm">
                                    <strong className="text-white block font-heading uppercase mb-1">NO DELETING HISTORY</strong>
                                    We do not remove valid negative VPRs or historical RTP failures upon operator request, regardless of partnership status.
                                </span>
                            </li>
                        </ul>
                    </div>
                    <Card className="p-8 bg-red-950/10 border-red-900/30 flex items-center justify-center text-center">
                        <div>
                            <Icons.Lock className="h-16 w-16 text-red-500 mx-auto mb-6 opacity-80" />
                            <h3 className="font-heading text-xl text-white uppercase mb-2">OUR REPUTATION IS THE ASSET</h3>
                            <p className="text-[#8d8c9e] text-sm max-w-sm mx-auto">
                                If we compromise our data for a quick payout, the entire ZAP ecosystem collapses. We are incentivized to remain brutally honest.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* 3. THE VALUE LOOP */}
            <section>
                <h2 className="font-heading text-2xl text-white mb-8 flex items-center gap-3 border-b border-[#333] pb-4">
                    <span className="text-[#00FFC0]">03 //</span> THE VALUE LOOP (Shared Success)
                </h2>
                <Card className="p-8 bg-[#14131c] border-[#00FFC0]/20">
                    <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                        <div className="text-center">
                            <div className="bg-[#333] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#555]">
                                <Icons.Zap className="h-8 w-8 text-[#8d8c9e]" />
                            </div>
                            <p className="font-heading uppercase text-sm text-[#8d8c9e]">Platform Revenue</p>
                        </div>
                        <Icons.ArrowRight className="h-6 w-6 text-[#00FFC0] hidden md:block" />
                        <Icons.ArrowDown className="h-6 w-6 text-[#00FFC0] md:hidden" />
                        <div className="text-center p-6 rounded-xl bg-[#00FFC0]/10 border border-[#00FFC0] shadow-[0_0_30px_rgba(0,255,192,0.2)]">
                             <Icons.Gift className="h-10 w-10 text-[#00FFC0] mx-auto mb-2" />
                             <h3 className="font-heading text-xl text-white uppercase">SSP PROTOCOL</h3>
                             <p className="font-mono text-xs text-[#00FFC0] uppercase">REWARD DISTRIBUTION</p>
                        </div>
                        <Icons.ArrowRight className="h-6 w-6 text-[#00FFC0] hidden md:block" />
                        <Icons.ArrowDown className="h-6 w-6 text-[#00FFC0] md:hidden" />
                         <div className="text-center">
                            <div className="bg-[#333] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#555]">
                                <Icons.Users className="h-8 w-8 text-white" />
                            </div>
                            <p className="font-heading uppercase text-sm text-white">Active Contributors</p>
                        </div>
                    </div>
                    <p className="text-center text-[#8d8c9e] mt-8 max-w-2xl mx-auto">
                        We prefer a smaller piece of a bigger pie. By sharing revenue back with the community through Zap Points (ZP) and the SSP, we align our success with yours.
                    </p>
                </Card>
            </section>

        </div>
    );
};
