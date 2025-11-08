
import React, { useState, useMemo } from 'react';
import { mockCasinosData } from '../constants/casinos';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';

export const CasinoDirectoryPage = ({ setViewingCasinoId }: { setViewingCasinoId: (id: string | null) => void; }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [minRating, setMinRating] = useState(0);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Mock Feature Toggles
    const [featKyc, setFeatKyc] = useState(false);
    const [featVpn, setFeatVpn] = useState(false);
    const [featUs, setFeatUs] = useState(false);

    // Process Data
    const filteredCasinos = useMemo(() => {
        return mockCasinosData
            .filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = filterCategory === 'ALL' || c.tags.includes(filterCategory.toLowerCase());
                const matchesRating = c.rating >= minRating;
                // Mock feature matching (assuming all match for now as data doesn't have these specific tags yet)
                const matchesFeat = (!featKyc || true) && (!featVpn || true) && (!featUs || true); 
                return matchesSearch && matchesCategory && matchesRating && matchesFeat;
            })
            .sort((a, b) => {
                if (sortBy === 'rating') return b.rating - a.rating;
                if (sortBy === 'newest') return (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0);
                return 0;
            });
    }, [searchTerm, sortBy, filterCategory, minRating, featKyc, featVpn, featUs]);

    return (
        <div className="container mx-auto max-w-[1400px] p-4 py-6 md:p-10 h-[calc(100vh-8rem)] flex flex-col page-fade-in">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Icons.Server className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                            OPERATOR DATABASE
                        </h1>
                    </div>
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                        // SEARCH THE GRID // STATUS: LIVE
                    </p>
                </div>
                <Button 
                    variant="secondary" 
                    className="md:hidden mt-4 w-full flex items-center gap-2 justify-center border-[#333] text-[#00FFC0]"
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                    <Icons.Sliders className="h-4 w-4" /> {isMobileFiltersOpen ? 'HIDE FILTERS' : 'SHOW FILTERS'}
                </Button>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex flex-1 gap-8 min-h-0 relative">

                {/* LEFT: FILTER SIDEBAR (Fixed width) */}
                <div className={`w-full md:w-72 bg-[#0c0c0e] border-r border-[#333] flex-shrink-0 flex flex-col absolute md:relative z-20 h-full transition-transform duration-300 ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className="p-5 border-b border-[#333] bg-[#14131c]">
                        <h3 className="font-heading text-white uppercase text-sm flex items-center gap-2">
                            <Icons.Filter className="h-4 w-4 text-[#00FFC0]" /> SEARCH PARAMETERS
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
                        {/* Category */}
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Primary Category</label>
                            <div className="space-y-2">
                                {['ALL', 'HIGH-BONUS', 'NEW', 'LIVE', 'SPORTS'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={`w-full text-left px-3 py-2 rounded-md font-heading uppercase text-xs transition-all ${
                                            filterCategory === cat 
                                            ? 'bg-[#00FFC0] text-black font-bold shadow-[0_0_10px_rgba(0,255,192,0.3)]' 
                                            : 'text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Rating */}
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Min ZAP Score: {minRating > 0 ? minRating : 'ANY'}</label>
                            <input 
                                type="range" 
                                min="0" max="5" step="0.5" 
                                value={minRating}
                                onChange={(e) => setMinRating(Number(e.target.value))}
                                className="w-full accent-[#00FFC0] h-2 bg-[#333] rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-[#666] font-mono mt-1">
                                <span>0</span><span>5.0</span>
                            </div>
                        </div>
                        {/* Features */}
                        <div>
                             <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-1">Advanced Features</label>
                             <div className="divide-y divide-[#333]">
                                 <Toggle checked={featKyc} onChange={setFeatKyc} label={<span className="text-xs">NO KYC REQUIRED</span>} />
                                 <Toggle checked={featVpn} onChange={setFeatVpn} label={<span className="text-xs">VPN ALLOWED</span>} />
                                 <Toggle checked={featUs} onChange={setFeatUs} label={<span className="text-xs">US PLAYERS OK</span>} />
                             </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: RESULTS GRID */}
                <div className="flex-1 flex flex-col min-w-0">
                    
                    {/* Search Bar & Controls */}
                    <div className="mb-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-5 w-5" />
                            <Input 
                                placeholder="SEARCH OPERATOR DATABASE..." 
                                className="pl-12 bg-[#0c0c0e] border-[#333] h-12 font-mono text-sm focus:border-[#00FFC0]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select 
                            className="h-12 bg-[#0c0c0e] border border-[#333] rounded px-4 text-sm text-white font-mono focus:outline-none focus:border-[#00FFC0]"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="rating">SORT: ZAP SCORE</option>
                            <option value="newest">SORT: NEWEST LISTING</option>
                        </select>
                    </div>

                    {/* Results Status */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="font-mono text-xs text-[#8d8c9e]">
                            // FOUND: <span className="text-[#00FFC0] font-bold">{filteredCasinos.length} UNITS</span>
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCasinos.map(casino => (
                                <Card key={casino.id} className="p-0 overflow-hidden bg-[#14131c] border-[#333] group hover:border-[#00FFC0]/50">
                                    {/* Card Header */}
                                    <div className="p-5 border-b border-[#333] flex justify-between items-start bg-[#0c0c0e]">
                                        <div className="flex items-center gap-4">
                                            <img src={casino.logo} alt={casino.name} className="w-12 h-12 rounded-md border border-[#333]" />
                                            <div>
                                                <h3 className="font-heading text-lg text-white uppercase">{casino.name}</h3>
                                                {casino.certified && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#00FFC0] bg-[#00FFC0]/10 px-2 py-0.5 rounded border border-[#00FFC0]/20 uppercase">
                                                        <Icons.Shield className="h-3 w-3" /> VERIFIED
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-2xl font-bold text-white">{casino.rating}</div>
                                            <div className="text-[10px] text-[#8d8c9e] uppercase font-heading">ZAP SCORE</div>
                                        </div>
                                    </div>
                                    
                                    {/* Data Grid */}
                                    <div className="p-5 space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div className="bg-[#0A0A0A] p-3 rounded border border-[#333]">
                                                <span className="text-[#8d8c9e] block mb-1 font-heading uppercase">PAYOUT SPEED</span>
                                                <span className="text-[#00FFC0] font-mono font-bold">{casino.withdrawalTime}</span>
                                            </div>
                                             <div className="bg-[#0A0A0A] p-3 rounded border border-[#333]">
                                                <span className="text-[#8d8c9e] block mb-1 font-heading uppercase">EST. RTP AVG</span>
                                                <span className="text-white font-mono font-bold">~97.5%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[#8d8c9e] text-xs font-heading uppercase block mb-2">ACTIVE BONUS INTEL</span>
                                            <p className="text-sm text-white font-medium truncate">{casino.bonus}</p>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="p-5 pt-0">
                                        <Button onClick={() => setViewingCasinoId(casino.id)} className="w-full font-heading uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,192,0.1)]">
                                            VIEW INTEL UNIT
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        {filteredCasinos.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-[#8d8c9e]">
                                <Icons.Search className="h-16 w-16 opacity-20 mb-4" />
                                <p className="font-heading uppercase text-xl">NO MATCHES FOUND</p>
                                <p className="font-mono text-sm">// ADJUST SEARCH PARAMETERS</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
};
