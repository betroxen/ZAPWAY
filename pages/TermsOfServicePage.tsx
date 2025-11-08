
import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

export const TermsOfServicePage = () => {
    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            
            {/* HEADER */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Icons.FileText className="h-10 w-10 text-[#00FFC0] animate-pulse-slow" />
                    <h1 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
                        TERMS OF ENGAGEMENT
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // THE CIRCUIT RULES // STATUS: MANDATORY
                    </p>
                    <span className="hidden md:block text-[#333]">|</span>
                    <p className="text-[#8d8c9e] font-mono text-xs uppercase">
                        LAST SYNCHRONIZED: NOVEMBER 07, 2025
                    </p>
                </div>
            </div>

            {/* INTRO MANIFESTO */}
            <Card className="p-8 bg-[#0c0c0e] border-[#00FFC0]/30 mb-12 relative overflow-hidden">
                <div className="relative z-10">
                     <h2 className="font-heading text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Zap className="h-5 w-5 text-[#00FFC0]" /> AGREEMENT PROTOCOL
                    </h2>
                    <p className="text-lg text-white leading-relaxed mb-4">
                        Welcome to ZAP. We're data rebels, but even a revolution needs ground rules. These Terms ("The Rules") are a binding agreement between you, the player, and ZapWay Corporation.
                    </p>
                    <p className="text-[#8d8c9e] leading-relaxed">
                        By accessing, using, or plugging into the ZAP ecosystem, you agree to play by these rules. <strong className="text-white">No exceptions.</strong> If you don't agree, disconnect immediately.
                    </p>
                </div>
                {/* subtle background grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </Card>

            {/* TERMS SECTIONS */}
            <div className="space-y-8">

                {/* PROTOCOL 01: ELIGIBILITY */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                        <span className="text-[#00FFC0]">01 //</span> PLAYER ELIGIBILITY
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[#14131c] border-[#333]">
                            <Icons.Users className="h-8 w-8 text-[#00FFC0] mb-4" />
                            <h3 className="font-heading text-lg text-white uppercase mb-2">Minimum Age (18+)</h3>
                            <p className="text-sm text-[#8d8c9e]">You must be at least 18 years of age or the highest legal gambling age in your jurisdiction. If you’re not of age, you’re not getting the data.</p>
                        </Card>
                         <Card className="p-6 bg-[#14131c] border-[#333]">
                            <Icons.Globe className="h-8 w-8 text-blue-500 mb-4" />
                            <h3 className="font-heading text-lg text-white uppercase mb-2">Local Compliance</h3>
                            <p className="text-sm text-[#8d8c9e]">It is your sole responsibility to confirm that using ZAP and interacting with operators is legal in your jurisdiction. We provide data, not legal advice.</p>
                        </Card>
                    </div>
                </section>

                {/* PROTOCOL 02: CONDUCT */}
                <section>
                    <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">02 //</span> CODE OF CONDUCT
                    </h2>
                    <Card className="p-6 bg-[#14131c] border-[#333]">
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block font-heading uppercase text-sm">YOUR VOICE IS POWER</strong>
                                    <span className="text-[#8d8c9e] text-sm">When you contribute (reviews, VPRs), you grant us a license to use that content to improve the platform's intelligence grid.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icons.X className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                                <div>
                                    <strong className="text-white block font-heading uppercase text-sm">ZERO NOISE POLICY</strong>
                                    <span className="text-[#8d8c9e] text-sm">We have zero tolerance for spam, shilling, misinformation, or malicious activity. Pollute the signal, and you will be permanently unplugged.</span>
                                </div>
                            </li>
                        </ul>
                    </Card>
                </section>

                {/* PROTOCOL 03: LIABILITY (CRITICAL) */}
                <section>
                     <h2 className="font-heading text-2xl text-red-500 mb-6 flex items-center gap-3 border-b border-red-900/30 pb-4">
                         <span className="text-red-500">03 //</span> CRITICAL: LIMITATION OF LIABILITY
                    </h2>
                    <Card className="p-6 bg-red-950/10 border-red-900/50 mb-6">
                        <div className="flex items-start gap-4">
                            <Icons.AlertTriangle className="h-8 w-8 text-red-500 shrink-0" />
                            <div className="space-y-4">
                                <p className="text-white text-lg font-medium">
                                    THE DATA IS NOT A GUARANTEE. ZAP provides intelligence, analysis, and reviews. We are <span className="text-red-500 font-bold">NOT</span> a casino, financial service, or operator.
                                </p>
                                <ul className="list-disc pl-4 space-y-2 text-[#8d8c9e] text-sm font-mono">
                                    <li>ZAP IS NOT LIABLE FOR ANY FINANCIAL LOSSES INCURRED ON THIRD-PARTY PLATFORMS.</li>
                                    <li>YOU USE EXTERNAL OPERATORS AT YOUR OWN SOLE RISK.</li>
                                    <li>ALL CONTENT IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* PROTOCOL 04: INTELLECTUAL PROPERTY */}
                 <section>
                    <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3 border-b border-[#333] pb-4">
                         <span className="text-[#00FFC0]">04 //</span> INTELLECTUAL PROPERTY
                    </h2>
                    <p className="text-[#8d8c9e] mb-4">
                        "Content" means all the good stuff we generate: ZAP Scores, raw RTP data, custom metrics, and branding.
                    </p>
                    <div className="bg-[#14131c] p-4 rounded border-l-4 border-[#00FFC0] text-sm text-white">
                        Our data is built for the community's edge, but it remains our property. You can use it to win, but you cannot steal it to build a competitor.
                    </div>
                </section>

            </div>

            {/* CONTACT FOOTER */}
            <div className="mt-16 pt-8 border-t border-[#333] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-heading text-white uppercase mb-2 flex items-center gap-2">
                        <Icons.HelpCircle className="h-4 w-4 text-[#00FFC0]" /> Operational Support
                    </h3>
                    <p className="text-[#8d8c9e] text-sm mb-2">For account, reward, or technical issues.</p>
                    <a href="mailto:support@zap.gg" className="text-[#00FFC0] font-mono hover:underline">support@zap.gg</a>
                </div>
                <div>
                     <h3 className="font-heading text-white uppercase mb-2 flex items-center gap-2">
                        <Icons.Shield className="h-4 w-4 text-[#00FFC0]" /> Legal Comm Line
                    </h3>
                    <p className="text-[#8d8c9e] text-sm mb-2">For formal disputes or compliance queries.</p>
                    <a href="mailto:legal@zap.gg" className="text-[#00FFC0] font-mono hover:underline">legal@zap.gg</a>
                     <p className="text-xs text-[#666] mt-2 font-mono">
                        HQ: Premier Business Centre, Mutsamudu, Comoros
                    </p>
                </div>
            </div>

        </div>
    );
};
