
import React, { useState, useMemo } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { mockCasinosData } from '../constants/casinos';

interface CasinoDetailPageProps {
    casinoId: string;
    onBack: () => void;
    onOpenReview: () => void;
}

export const CasinoDetailPage: React.FC<CasinoDetailPageProps> = ({ casinoId, onBack, onOpenReview }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const casino = useMemo(() => mockCasinosData.find(c => c.id === casinoId), [casinoId]);

    if (!casino) {
        return (
            <div className="p-10 flex flex-col items-center justify-center text-[#8d8c9e] h-full">
                <Icons.AlertTriangle className="h-16 w-16 mb-4 opacity-20" />
                <h2 className="text-2xl font-heading text-white mb-2">OPERATOR NOT FOUND</h2>
                <p className="font-mono text-sm mb-6">// ERROR 404: TARGET INVALID</p>
                <Button onClick={onBack} variant="secondary">RETURN TO GRID</Button>
            </div>
        );
    }

    // Mock extended data that would usually come from an API
    const extendedData = {
        founded: '2017',
        license: 'Curaçao (GCB)',
        vpnPolicy: 'Allowed (Strategic Regions)',
        kycPolicy: 'Tiered (No KYC under $2k)',
        minDeposit: '$5 equivalent',
        cryptoSupport: ['BTC', 'ETH', 'LTC', 'DOGE', 'USDT', 'XRP', 'TRX', 'EOS'],
        rtp: { published: 97.5, actual: 97.2 },
        features: ['Instant Payouts', 'Original Games', 'High Roller VIP', 'Live Support 24/7']
    };

    const TABS = [
        { id: 'overview', label: 'INTEL OVERVIEW', icon: Icons.LayoutDashboard },
        { id: 'bonuses', label: 'ACTIVE BONUSES', icon: Icons.Gift },
        { id: 'vprs', label: 'VPR FEED (REVIEWS)', icon: Icons.MessageSquare },
    ];

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-10 page-fade-in">
            {/* HEADER NAV */}
            <Button variant="ghost" onClick={onBack} className="mb-6 text-[#8d8c9e] hover:text-white pl-0 font-mono uppercase text-xs">
                <Icons.ChevronLeft className="h-4 w-4 mr-1" /> BACK TO DIRECTORY
            </Button>

            {/* HERO SECTION */}
            <Card className="p-6 md:p-10 bg-[#0c0c0e] border-[#00FFC0]/20 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <Icons.Zap className="h-64 w-64 text-[#00FFC0]" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <img src={casino.logo} alt={casino.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-[#333] shadow-2xl bg-[#14131c]" />
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase">{casino.name}</h1>
                             {casino.certified && (
                                <span className="px-3 py-1 bg-[#00FFC0] text-black text-xs font-bold rounded-sm flex items-center gap-1 uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,192,0.4)]">
                                    <Icons.Shield className="h-3.5 w-3.5" /> ZAP CERTIFIED
                                </span>
                            )}
                        </div>
                        <p className="text-lg text-[#8d8c9e] max-w-2xl mb-8 leading-relaxed">{casino.description}</p>
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="font-heading uppercase tracking-widest shadow-[0_0_30px_rgba(0,255,192,0.3)] animate-pulse-glow px-8">
                                INITIATE SESSION <Icons.ExternalLink className="h-5 w-5 ml-2" />
                            </Button>
                             <Button variant="secondary" onClick={onOpenReview} className="font-heading uppercase tracking-widest border-[#333] hover:border-[#00FFC0] text-xs md:text-sm">
                                SUBMIT VPR <Icons.Edit className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                    {/* ZAP SCORE MODULE */}
                    <div className="bg-[#14131c] p-6 rounded-xl border border-[#333] text-center min-w-[200px] flex flex-col justify-center">
                        <div className="text-xs font-mono text-[#8d8c9e] uppercase tracking-widest mb-2">ZAP SCORE</div>
                        <div className="text-5xl font-mono font-bold text-white mb-2">{casino.rating.toFixed(1)}</div>
                        <div className="flex justify-center text-[#00FFC0] mb-3 gap-0.5">
                             {[...Array(5)].map((_, i) => (
                                <Icons.Star key={i} className={`h-5 w-5 ${i < Math.floor(casino.rating) ? 'fill-[#00FFC0]' : 'opacity-30'}`} />
                             ))}
                        </div>
                        <div className="text-xs text-[#8d8c9e] font-mono uppercase">{casino.reviewCount} VALIDATED REPORTS</div>
                    </div>
                </div>
            </Card>

            {/* TABS NAV */}
            <div className="flex overflow-x-auto border-b border-[#333] mb-8 custom-scrollbar">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 font-heading uppercase text-sm transition-all border-b-2 whitespace-nowrap ${
                            activeTab === tab.id 
                            ? 'border-[#00FFC0] text-white bg-[#00FFC0]/5' 
                            : 'border-transparent text-[#8d8c9e] hover:text-white hover:bg-[#14131c]'
                        }`}
                    >
                        <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-[#00FFC0]' : ''}`} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[400px]">
                
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-tabSlideIn">
                        <div className="lg:col-span-2 space-y-8">
                            {/* KEY METRICS GRID */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-[#14131c] p-5 rounded-lg border border-[#333] flex flex-col justify-between min-h-[100px]">
                                    <div className="text-[#8d8c9e] text-xs font-mono uppercase mb-2">Payout Speed</div>
                                    <div className="text-[#00FFC0] font-bold font-mono text-xl flex items-center gap-2">
                                        <Icons.Zap className="h-5 w-5" /> {casino.withdrawalTime}
                                    </div>
                                </div>
                                 <div className="bg-[#14131c] p-5 rounded-lg border border-[#333] flex flex-col justify-between min-h-[100px]">
                                    <div className="text-[#8d8c9e] text-xs font-mono uppercase mb-2">Est. True RTP</div>
                                    <div className="text-white font-bold font-mono text-xl flex items-center gap-2">
                                        <Icons.Activity className="h-5 w-5 text-blue-400" /> ~{extendedData.rtp.actual}%
                                    </div>
                                </div>
                                 <div className="bg-[#14131c] p-5 rounded-lg border border-[#333] flex flex-col justify-between min-h-[100px]">
                                    <div className="text-[#8d8c9e] text-xs font-mono uppercase mb-2">License</div>
                                    <div className="text-white font-bold font-mono text-lg flex items-center gap-2 truncate" title={extendedData.license}>
                                        <Icons.Shield className="h-5 w-5 text-purple-400 shrink-0" /> {extendedData.license.split(' ')[0]}
                                    </div>
                                </div>
                                 <div className="bg-[#14131c] p-5 rounded-lg border border-[#333] flex flex-col justify-between min-h-[100px]">
                                    <div className="text-[#8d8c9e] text-xs font-mono uppercase mb-2">VPN Policy</div>
                                    <div className="text-white font-bold font-mono text-xl flex items-center gap-2">
                                        <Icons.Globe className="h-5 w-5 text-yellow-500" /> ALLOWED
                                    </div>
                                </div>
                            </div>

                            {/* FEATURES */}
                            <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#333]">
                                <h3 className="font-heading text-lg text-white mb-6 uppercase flex items-center gap-2">
                                    <Icons.Target className="h-5 w-5 text-[#00FFC0]" /> OPERATIONAL FEATURES
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {extendedData.features.map(feat => (
                                        <div key={feat} className="flex items-center gap-3 p-4 bg-[#14131c] rounded-lg border border-[#333]">
                                            <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0]" />
                                            <span className="text-white font-medium">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                             {/* CRYPTO SUPPORT */}
                             <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#333]">
                                <h3 className="font-heading text-lg text-white mb-6 uppercase flex items-center gap-2">
                                    <Icons.Wallet className="h-5 w-5 text-[#00FFC0]" /> PAYMENT RAILS
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {extendedData.cryptoSupport.map(crypto => (
                                        <span key={crypto} className="px-4 py-2 bg-[#14131c] border border-[#333] rounded text-sm font-mono text-white font-bold">
                                            {crypto}
                                        </span>
                                    ))}
                                    <span className="px-4 py-2 bg-[#14131c] border border-[#333] rounded text-sm font-mono text-[#8d8c9e]">
                                        +12 MORE
                                    </span>
                                </div>
                            </Card>
                        </div>

                        {/* SIDEBAR INTEL */}
                        <div className="space-y-6">
                            <Card className="p-6 bg-[#14131c] border-[#333]">
                                <h3 className="font-heading text-white mb-6 uppercase text-sm tracking-wider border-b border-[#333] pb-3">
                                    COMPLIANCE DATA
                                </h3>
                                <ul className="space-y-4 text-sm font-mono">
                                    <li className="flex justify-between items-center">
                                        <span className="text-[#8d8c9e]">ESTABLISHED</span>
                                        <span className="text-white">{extendedData.founded}</span>
                                    </li>
                                     <li className="flex justify-between items-center">
                                        <span className="text-[#8d8c9e]">AUTHORITY</span>
                                        <span className="text-white">{extendedData.license.split(' ')[0]}</span>
                                    </li>
                                     <li className="flex justify-between items-start pt-2">
                                        <span className="text-[#8d8c9e]">KYC TRIGGER</span>
                                        <span className="text-white text-right max-w-[50%] leading-tight">{extendedData.kycPolicy}</span>
                                    </li>
                                </ul>
                            </Card>

                             <div className="p-5 bg-yellow-950/20 border-l-4 border-yellow-500 rounded-r-lg">
                                <h4 className="text-yellow-500 font-heading uppercase text-sm mb-2 flex items-center gap-2">
                                    <Icons.AlertTriangle className="h-4 w-4" /> INTEL ADVISORY
                                </h4>
                                <p className="text-xs text-yellow-200/80 leading-relaxed font-mono">
                                    Always verify the current T&Cs on the operator's site directly before depositing. ZAP data is updated daily, but operator terms can change instantly without notice.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* BONUSES TAB */}
                {activeTab === 'bonuses' && (
                    <div className="animate-tabSlideIn space-y-6">
                        <Card className="p-6 md:p-10 border-[#00FFC0]/30 bg-[#0c0c0e] relative overflow-hidden group">
                             <div className="absolute -top-10 -right-10 opacity-5 rotate-12 transition-all duration-500 group-hover:opacity-10 group-hover:rotate-0 group-hover:scale-110">
                                <Icons.Gift className="h-80 w-80 text-[#00FFC0]" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
                                    <div>
                                         <span className="inline-block px-3 py-1 bg-[#00FFC0] text-black text-xs font-bold rounded-sm uppercase mb-3 tracking-wider">
                                            PRIMARY WELCOME OFFER
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-heading text-white uppercase leading-tight">{casino.bonus}</h3>
                                    </div>
                                    <Button size="lg" className="w-full xl:w-auto shadow-[0_0_20px_rgba(0,255,192,0.3)] font-heading uppercase tracking-wider px-10 py-6">
                                        CLAIM BONUS NOW
                                    </Button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                        <span className="text-[#8d8c9e] text-xs font-mono uppercase block mb-2">Wagering Req (WR)</span>
                                        <span className="text-white font-bold text-2xl font-mono">35x <span className="text-sm text-[#666]">(B+D)</span></span>
                                    </div>
                                     <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                        <span className="text-[#8d8c9e] text-xs font-mono uppercase block mb-2">Min Deposit</span>
                                        <span className="text-white font-bold text-2xl font-mono">$20</span>
                                    </div>
                                     <div className="bg-[#14131c] p-5 rounded-lg border border-[#333]">
                                        <span className="text-[#8d8c9e] text-xs font-mono uppercase block mb-2">Max Bet (Active Bonus)</span>
                                        <span className="text-white font-bold text-2xl font-mono">$5.00</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                         <Card className="p-6 bg-[#14131c] border-[#333] opacity-75 hover:opacity-100 transition-opacity">
                             <div className="flex justify-between items-start">
                                 <div>
                                     <h3 className="font-heading text-lg text-white uppercase mb-1">WEEKLY RELOAD (VIP)</h3>
                                     <p className="text-[#8d8c9e] text-sm">50% up to $500 every Friday for Silver+ tier members.</p>
                                 </div>
                                 <span className="px-3 py-1 bg-[#333] text-[#8d8c9e] text-xs font-mono rounded uppercase">REQUIRES VIP</span>
                             </div>
                         </Card>
                    </div>
                )}

                {/* VPR FEED TAB */}
                {activeTab === 'vprs' && (
                    <div className="animate-tabSlideIn">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                             <h3 className="font-heading text-xl text-white uppercase flex items-center gap-3">
                                <Icons.MessageSquare className="h-6 w-6 text-[#00FFC0]" />
                                VALIDATED PLAYER REPORTS ({casino.reviewCount})
                            </h3>
                             <Button onClick={onOpenReview} className="w-full sm:w-auto font-heading uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,192,0.2)]">
                                 <Icons.Plus className="h-4 w-4 mr-2" /> SUBMIT NEW VPR
                             </Button>
                        </div>
                        
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-6 bg-[#14131c] border-[#333] hover:border-[#00FFC0]/30 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                             <img src={`https://placehold.co/40x40/222222/ffffff?text=${99-i}`} className="h-10 w-10 rounded-md border border-[#333]" alt="User" />
                                             <div>
                                                 <div className="text-white font-bold flex items-center gap-2 font-heading uppercase text-sm">
                                                     AnonOperator_{99 - i}
                                                     {i === 1 && <Icons.CheckCircle className="h-4 w-4 text-[#00FFC0]" title="Verified Contributor" />}
                                                 </div>
                                                 <div className="text-xs text-[#8d8c9e] font-mono mt-1">{i} DAY{i > 1 ? 'S' : ''} AGO // VERIFIED PLAY</div>
                                             </div>
                                        </div>
                                        <div className="flex gap-0.5 bg-[#0A0A0A] p-2 rounded-md border border-[#333]">
                                            {[...Array(5)].map((_, starI) => (
                                                <Icons.Star key={starI} className={`h-4 w-4 ${starI < (5-i+1) ? 'fill-[#00FFC0] text-[#00FFC0]' : 'text-[#333]'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[#FAFBFF] text-sm leading-relaxed bg-[#0A0A0A]/50 p-4 rounded-lg border border-[#333]/50 mb-4 font-medium">
                                        "{i === 1 ? "Withdrawal processed in 4 minutes flat via LTC. Support was responsive when I asked about the new VIP tier requirements. Solid experience overall, no friction." : 
                                         i === 2 ? "RTP feels a bit tight on their exclusive Pragmatic tables lately, but the sportsbook odds are consistently competitive. No issues with payouts so far." :
                                         "Great platform, slick UI. The KYC trigger at $2k was a bit annoying but I cleared it in about 2 hours with standard docs. Fast after that."}"
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="text-xs font-mono uppercase flex items-center gap-1.5 text-[#00FFC0] bg-[#00FFC0]/10 px-3 py-1.5 rounded border border-[#00FFC0]/20">
                                            <Icons.Zap className="h-3.5 w-3.5" /> PAYOUT: 5/5
                                        </div>
                                        <div className="text-xs font-mono uppercase flex items-center gap-1.5 text-white bg-[#333]/50 px-3 py-1.5 rounded border border-[#333]">
                                            <Icons.Shield className="h-3.5 w-3.5" /> TERMS: 4/5
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};
