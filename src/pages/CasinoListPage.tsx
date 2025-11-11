
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/icons';
import { fetchCasinos } from '../services/api';

interface Casino {
    id: string;
    name: string;
    logo: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    description: string;
}

export const CasinoListPage = () => {
    const [casinos, setCasinos] = useState<Casino[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCasinos = async () => {
            try {
                const data = await fetchCasinos();
                setCasinos(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadCasinos();
    }, []);

    return (
        <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-orbitron text-4xl md:text-5xl text-white font-black uppercase tracking-wide">Casino List</h1>
            <p className="text-[#8d8c9e] text-lg mt-2">Browse our curated and verified list of operators.</p>

            {isLoading && <div className="text-center p-20 font-mono text-[#00FFC0]">// SCANNING THE GRID...</div>}
            {error && <div className="text-center p-20 font-mono text-red-500 uppercase">{error}</div>}

            {!isLoading && !error && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {casinos.map(casino => (
                        <Link to={`/casinos/${casino.id}`} key={casino.id} className="bg-[#0c0c0e] border border-[#3a3846] rounded-lg p-6 flex flex-col transition-all duration-300 hover:border-[#00FFC0] hover:scale-105">
                            <div className="flex items-start justify-between">
                                <h2 className="font-orbitron text-2xl text-white font-bold">{casino.name}</h2>
                                <img src={casino.logo} alt={`${casino.name} logo`} className="h-12 w-12 rounded-full bg-gray-800 object-contain p-1" />
                            </div>
                            <p className="text-[#8d8c9e] mt-2 text-sm flex-grow">{casino.description}</p>

                            <div className="mt-4 flex items-center gap-2 text-yellow-400">
                                <Icons.Star className="h-5 w-5" />
                                <span className="font-bold text-white">{casino.rating.toFixed(1)}</span>
                                <span className="text-xs text-white/50">({casino.reviewCount} reviews)</span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {casino.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-[#1A1A1A] text-[#8d8c9e] px-2 py-1 rounded-full font-mono">{tag}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
