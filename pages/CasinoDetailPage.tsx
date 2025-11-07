import React, { useMemo } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { Tabs } from '../components/Tabs';
import { mockCasinosData } from '../constants/casinos';
import { Tooltip } from '../components/Tooltip';

// Extended mock data to simulate the rich data from the prompt
const extendedCasinoData: Record<string, any> = {
    duel: {
        pros: ["Extremely high 99.9% RTP on house games", "Instant 50% rakeback on house edge", "No KYC (Level 0) with unlimited withdrawals", "Public founder with anti-scam mission"],
        cons: ["Very new platform, building long-term rep", "Aggressive 'cult' branding", "Referral system is complex"],
        founded: "2024",
        license: "Anjouan",
        games: "2,000+",
        originalReview: "Duel is aggressively untraditional. Launched in 2024, it focuses entirely on player value with an absurd 99.9% RTP on its in-house games and instant 50% rakeback. The 'Level 0' no-KYC policy for unlimited withdrawals is a massive draw for privacy-focused degens. While the branding is intense, the value proposition is undeniable."
    },
    stake: {
        pros: ["Industry-leading original games", "Massive sports betting options", "Enhanced RTP on specific slots", "Unlimited withdrawals after KYC"],
        cons: ["Requires full KYC for unrestricted access", "Support can get busy during major events"],
        founded: "2017",
        license: "Curaçao",
        games: "3,000+",
        originalReview: "Stake is the gold standard for a reason. Since 2017, it has defined the crypto casino space. Its library of original games is unmatched in quality, and the integration of a world-class sportsbook makes it a one-stop shop. VIP benefits are legendary, though entry requires significant volume. It's the safest bet for high rollers."
    }
    // Other casinos would have similar entries in a real app
};

interface CasinoDetailPageProps {
    casinoId: string;
    onBack: () => void;
    onOpenReview: () => void;
}

export const CasinoDetailPage: React.FC<CasinoDetailPageProps> = ({ casinoId, onBack, onOpenReview }) => {
    
    const casino = useMemo(() => {
        const baseData = mockCasinosData.find(c => c.id === casinoId);
        if (!baseData) return null;
        
        const extended = extendedCasinoData[casinoId] || {
            pros: ["Fast crypto withdrawals", "Good game selection", "Mobile friendly"],
            cons: ["Limited fiat options", "Average bonuses"],
            founded: "Unknown",
            license: "Curaçao",
            games: "1,000+",
             originalReview: baseData.description + " This casino offers a solid experience for crypto players. Withdrawals are generally fast, and standard support channels are available."
        };

        return {
            ...baseData,
            ...extended,
            userReviews: [
                { id: 1, avatar: "https://placehold.co/40x40/f87171/ffffff?text=AP", username: "BonusPro", rating: 5, content: "Fastest withdrawals in the game, period. Never had an issue.", votes: 15 },
                { id: 2, avatar: "https://placehold.co/40x40/8d8c9e/ffffff?text=NN", username: "CryptoNoob", rating: 4, content: "Great selection of games but I wish they had a bigger welcome bonus.", votes: 3 },
            ]
        };
    }, [casinoId]);

    if (!casino) {
        return (
            <div className="container mx-auto max-w-5xl p-4 py-20 text-center page-fade-in">
                <h2 className="font-heading text-2xl text-white mb-4">Casino Not Found</h2>
                <Button onClick={onBack}>Back to Directory</Button>
            </div>
        );
    }

    return (
        <div className="page-fade-in">
            {/* Cinematic Header */}
            <div className="relative w-full bg-[#14131c] border-b border-[#3a3846] overflow-hidden">
                 {/* Ambient background glow based on brand color if we had one, generic for now */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1ed760]/5 to-transparent opacity-50"></div>
                
                <div className="container mx-auto max-w-6xl p-6 md:p-12 relative z-10">
                    <Button variant="ghost" onClick={onBack} className="mb-8 text-[#8d8c9e] hover:text-white pl-0">
                        <Icons.ChevronLeft className="mr-2 h-4 w-4" /> Back to Directory
                    </Button>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                        <div className="relative">
                             <img src={casino.logo} alt={casino.name} className="h-32 w-32 md:h-40 md:w-40 rounded-2xl object-cover shadow-2xl ring-4 ring-[#14131c]" />
                             {casino.certified && (
                                 <Tooltip content="Zap Verified: Safe, fair, and fast.">
                                    <div className="absolute -bottom-3 -right-3 bg-[#1ed760] text-black p-2 rounded-full shadow-lg">
                                        <Icons.Shield className="w-6 h-6" />
                                    </div>
                                 </Tooltip>
                             )}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">{casino.name}</h1>
                                {casino.certified && (
                                    <span className="px-3 py-1 rounded-full bg-[#1ed760]/10 text-[#1ed760] text-sm font-bold border border-[#1ed760]/20">
                                        Certified
                                    </span>
                                )}
                            </div>
                            <p className="text-xl text-[#8d8c9e] max-w-2xl">{casino.bonus}</p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <Button variant="secondary" size="lg" className="flex-1 md:flex-none" onClick={onOpenReview}>Write a Review</Button>
                            <Button size="lg" className="flex-1 md:flex-none shadow-[0_0_30px_rgba(29,215,96,0.3)]">Play Now</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl p-4 md:p-12">
                {/* Quick Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-[#14131c] border border-[#3a3846] p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 rounded-lg"><Icons.Star className="w-5 h-5 text-yellow-500"/></div>
                        <div><p className="text-xs text-[#8d8c9e] uppercase font-semibold">Rating</p><p className="font-heading text-xl text-white">{casino.rating}/5</p></div>
                    </div>
                    <div className="bg-[#14131c] border border-[#3a3846] p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-[#1ed760]/10 rounded-lg"><Icons.Zap className="w-5 h-5 text-[#1ed760]"/></div>
                        <div><p className="text-xs text-[#8d8c9e] uppercase font-semibold">Payout Speed</p><p className="font-heading text-xl text-white">{casino.withdrawalTime}</p></div>
                    </div>
                    <div className="bg-[#14131c] border border-[#3a3846] p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg"><Icons.BookOpen className="w-5 h-5 text-blue-500"/></div>
                        <div><p className="text-xs text-[#8d8c9e] uppercase font-semibold">License</p><p className="font-heading text-xl text-white">{casino.license}</p></div>
                    </div>
                    <div className="bg-[#14131c] border border-[#3a3846] p-4 rounded-xl flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg"><Icons.Activity className="w-5 h-5 text-purple-500"/></div>
                        <div><p className="text-xs text-[#8d8c9e] uppercase font-semibold">Est. Founded</p><p className="font-heading text-xl text-white">{casino.founded}</p></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Tabs tabs={["Overview", "Bonuses", `Reviews (${casino.reviewCount})`]}>
                            {/* Overview Tab */}
                            <div className="space-y-8 animate-fadeIn">
                                <Card className="p-6 md:p-8">
                                    <h2 className="font-heading text-2xl text-white mb-4">Zap Verdict</h2>
                                    <p className="text-[#8d8c9e] text-lg leading-relaxed whitespace-pre-line">{casino.originalReview}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#3a3846]">
                                        <div>
                                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Icons.ArrowUp className="text-[#1ed760]"/> The Good</h3>
                                            <ul className="space-y-3">
                                                {casino.pros.map((pro: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2 text-[#8d8c9e] text-sm">
                                                        <span className="text-[#1ed760] mt-1">●</span> {pro}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Icons.ArrowDown className="text-red-500"/> The Bad</h3>
                                            <ul className="space-y-3">
                                                {casino.cons.map((con: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2 text-[#8d8c9e] text-sm">
                                                        <span className="text-red-500 mt-1">●</span> {con}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Bonuses Tab Placeholder */}
                            <div className="animate-fadeIn">
                                <Card className="p-6 border-dashed border-[#3a3846] bg-transparent text-center">
                                    <Icons.Gift className="w-12 h-12 text-[#3a3846] mx-auto mb-4" />
                                    <p className="text-[#8d8c9e]">Detailed bonus breakdown coming soon.</p>
                                </Card>
                            </div>

                             {/* Reviews Tab Placeholder (using existing simple map) */}
                             <div className="space-y-6 animate-fadeIn">
                                 <div className="flex justify-between items-center mb-4">
                                     <h3 className="text-xl font-heading text-white">Community Reviews</h3>
                                     <Button variant="secondary" size="sm" onClick={onOpenReview}>Write a Review</Button>
                                 </div>
                                {casino.userReviews.map((review: any) => (
                                    <Card key={review.id} className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <img src={review.avatar} alt={review.username} className="h-10 w-10 rounded-full" />
                                            <div>
                                                <p className="font-bold text-white">{review.username}</p>
                                                <div className="flex text-[#1ed760] text-sm">
                                                    {[...Array(5)].map((_, i) => <Icons.Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-[#1ed760]' : 'opacity-30'}`} />)}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[#8d8c9e]">{review.content}</p>
                                    </Card>
                                ))}
                             </div>
                        </Tabs>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="font-heading text-lg text-white mb-4">Platform Details</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-[#8d8c9e]">Games Available</span>
                                    <span className="text-white font-medium">{casino.games}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-[#8d8c9e]">VPN Allowed</span>
                                    <span className="text-white font-medium">Yes (Verified)</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-[#8d8c9e]">KYC Level</span>
                                    <span className="text-white font-medium">Minimal</span>
                                </li>
                            </ul>
                        </Card>
                        
                        <div className="p-6 rounded-xl bg-gradient-to-br from-[#1ed760]/20 to-[#14131c] border border-[#1ed760]/30">
                            <h3 className="font-heading text-lg text-white mb-2">Exclusive Offer</h3>
                            <p className="text-[#1ed760] font-bold text-xl mb-4">{casino.bonus}</p>
                            <Button className="w-full shadow-lg shadow-[#1ed760]/20">Claim Now</Button>
                            <p className="text-xs text-[#8d8c9e] text-center mt-3">New players only. T&Cs apply.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
