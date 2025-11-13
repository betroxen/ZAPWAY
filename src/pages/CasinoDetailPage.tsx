import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { mockCasinosData } from '../constants/casinos';
import { useUI } from '../context/UIContext';

export const CasinoDetailPage = () => {
    const { id: casinoId } = useParams();
    const navigate = useNavigate();
    const { openReviewModal } = useUI();
    
    const [activeTab, setActiveTab] = useState('overview');
    const casino = useMemo(() => mockCasinosData.find(c => c.id === casinoId), [casinoId]);

    if (!casino) {
        return (
            <div className="p-10 flex flex-col items-center justify-center text-[#8d8c9e] h-full page-fade-in">
                <Icons.AlertTriangle className="h-16 w-16 mb-4 opacity-20 text-red-500" />
                <h2 className="text-2xl font-heading text-white mb-2 uppercase tracking-wider">OPERATOR NOT FOUND</h2>
                <p className="font-mono text-sm mb-8">// ERROR 404: TARGET INVALID OR DELISTED</p>
                <Button onClick={() => navigate('/casinos')} variant="secondary" className="font-mono uppercase">RETURN TO GRID</Button>
            </div>
        );
    }

    const isEternalCrown = casino.specialRanking === 'ETERNAL CROWN';

    const TABS = [
        { id: 'overview', label: 'OPERATIONAL INTEL', icon: Icons.LayoutDashboard },
        { id: 'kyc', label: 'KYC & COMPLIANCE PROTOCOL', icon: Icons.Shield },
        { id: 'vprs', label: 'VPR FEED (COMMUNITY)', icon: Icons.MessageSquare },
    ];

    return (
        <div className="container mx-auto max-w-7xl p-4 py-6 md:p-10 page-fade-in">
            <Button variant="ghost" onClick={() => navigate('/casinos')} className="mb-6 text-[#8d8c9e] hover:text-white pl-0 font-mono uppercase text-xs flex items-center gap-2 group transition-all">
                <Icons.ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> BACK TO DIRECTORY
            </Button>

            <Card className={`p-0 bg-[#0c0c0e] mb-8 relative overflow-hidden group ${isEternalCrown ? 'border-[#00FFC0] shadow-[0_0_40px_rgba(0,255,192,0.15)]' : 'border-[#333]'}`}>
                 <div className={`absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.05)_1px,transparent_1px)] bg-[size:20px_20px] ${isEternalCrown ? 'opacity-20' : 'opacity-10'}`}></div>
                
                <div className="p-6 md:p-10 relative z-10 flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 relative">
                        <img src={casino.logo} alt={casino.name} className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 shadow-2xl bg-[#14131c] p-1 ${isEternalCrown ? 'border-[#00FFC0]' : 'border-[#333]'}`} />
                         <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold font-heading uppercase tracking-wider border shadow-xl whitespace-nowrap flex items-center gap-1
                            ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0] text-black border-[#00FFC0]' : 'bg-[#333] text-[#8d8c9e] border-[#444]'}`}>
                             {casino.status === 'VERIFIED' ? <Icons.CheckCircle className="h-3 w-3" /> : <Icons.AlertTriangle className="h-3 w-3" />}
                             {casino.status} OPERATOR
                         </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight flex items-center gap-3">
                                {casino.name}
                                {isEternalCrown && <Icons.Gem className="h-8 w-8 text-[#00FFC0] fill-[#00FFC0] drop-shadow-[0_0_15px_#00FFC0]" />}
                            </h1>
                             {casino.certified && (
                                <span className="px-3 py-1 bg-[#00FFC0]/10 text-[#00FFC0] text-xs font-bold rounded border border-[#00FFC0]/30 flex items-center gap-1.5 uppercase tracking-wider">
                                    <Icons.Shield className="h-3.5 w-3.5" /> ZAP CERTIFIED
                                </span>
                            )}
                        </div>
                        <p className="text-lg text-[#8d8c9e] max-w-3xl mb-6 leading-relaxed font-medium">{casino.description}</p>
                        
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="font-heading uppercase tracking-[0.15em] shadow-[0_0_30px_rgba(0,255,192,0.25)] animate-pulse-glow px-8 py-4 h-auto text-sm">
                                INITIATE SESSION <Icons.ExternalLink className="h-4 w-4 ml-2.5" />
                            </Button>
                             <Button variant="secondary" onClick={() => openReviewModal(casino.id)} className="font-heading uppercase tracking-widest border-[#333] hover:border-[#00FFC0] text-xs h-auto py-4 px-6">
                                SUBMIT VPR INTEL <Icons.Edit className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    <div className={`bg-[#14131c] p-6 rounded-xl border text-center min-w-[180px] flex flex-col justify-center shadow-lg ${isEternalCrown ? 'border-[#00FFC0]/50' : 'border-[#333]'}`}>
                        <div className="text-[10px] font-mono text-[#8d8c9e] uppercase tracking-[0.2em] mb-2">ZAP SCORE</div>
                        <div className={`text-5xl font-mono font-bold mb-3 ${casino.rating >= 4.5 ? 'text-[#00FFC0] text-glow' : 'text-white'}`}>
                            {casino.rating.toFixed(1)}
                        </div>
                        <div className="flex justify-center gap-1 mb-3">
                             {[...Array(5)].map((_, i) => (
                                <Icons.Star key={i} className={`h-4 w-4 ${i < Math.floor(casino.rating) ? 'fill-[#00FFC0] text-[#00FFC0]' : 'text-[#333]'}`} />
                             ))}
                        </div>
                        <div className="text-[10px] text-[#666] font-mono uppercase border-t border-[#333] pt-3">
                            BASED ON {casino.reviewCount} REPORTS
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex overflow-x-auto border-b border-[#333] mb-8 custom-scrollbar sticky top-16 bg-[#0A0A0A] z-20 pt-2">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2.5 px-6 py-4 font-heading uppercase text-xs md:text-sm transition-all border-b-2 whitespace-nowrap tracking-wider ${
                            activeTab === tab.id 
                            ? 'border-[#00FFC0] text-white bg-[#00FFC0]/5' 
                            : 'border-transparent text-[#8d8c9e] hover:text-white hover:bg-[#14131c]'
                        }`}
                    >
                        <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-[#00FFC0]' : 'opacity-70'}`} />
                        {tab.label}
                    </button>
                ))}
            </div>
            
        </div>
    );
};