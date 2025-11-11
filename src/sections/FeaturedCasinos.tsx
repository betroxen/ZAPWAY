
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCasinos } from '../services/api';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';

interface Casino {
    id: string;
    name: string;
    logo: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    bonus: { title: string; };
}

export const FeaturedCasinos: React.FC = () => {
    const [casinos, setCasinos] = useState<Casino[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getFeaturedCasinos = async () => {
            try {
                const allCasinos = await fetchCasinos();
                // Just taking the first few casinos as 'featured' for this example
                setCasinos(allCasinos.slice(0, 3)); 
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getFeaturedCasinos();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 md:py-32 bg-[#09090B]">
                 <div className="container mx-auto max-w-7xl px-4 text-center">
                    <p className="font-mono text-[#00FFC0] animate-pulse">// LOADING TRANSMISSIONS...</p>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-20 md:py-32 bg-[#09090B]">
                 <div className="container mx-auto max-w-7xl px-4 text-center">
                    <p className="font-mono text-red-500 uppercase">// TRANSMISSION ERROR: {error}</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 md:py-32 bg-[#09090B] border-y-2 border-[#1A1A1A]">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="font-orbitron text-3xl md:text-5xl text-white uppercase font-black tracking-wider">Featured Operators</h2>
                    <p className="text-[#8d8c9e] max-w-xl mx-auto text-lg mt-4 font-medium">Vetted and verified operators, continuously monitored by the Grid.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {casinos.map((casino, index) => (
                        <div 
                            key={casino.id}
                            className="bg-gradient-to-br from-[#101012] to-[#0c0c0e] border border-[#3a3846] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-[#00FFC0]/70 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#00FFC0]/10 animate-fade-in"
                            style={{ animationDelay: `${index * 150}ms`}}
                        >
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-grow">
                                    <h3 className="font-orbitron text-2xl text-white font-bold">{casino.name}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-yellow-400">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Icons.Star key={i} className={`h-4 w-4 ${i < Math.floor(casino.rating) ? 'fill-current' : 'opacity-40'}`} />
                                            ))}
                                        </div>
                                        <span className="font-bold text-white text-sm">{casino.rating.toFixed(1)}</span>
                                        <span className="text-xs text-white/50">({casino.reviewCount})</span>
                                    </div>
                                </div>
                                <img src={casino.logo} alt={`${casino.name} Logo`} className="h-14 w-14 rounded-full bg-gray-900 p-1 object-contain flex-shrink-0 ml-4" />
                            </div>
                            
                            {/* Bonus Info */}
                            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 my-4 flex items-start gap-4">
                                <Icons.Gift className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-yellow-400 font-bold uppercase text-sm">EXCLUSIVE BONUS</p>
                                    <p className="text-white font-semibold text-base mt-1">{casino.bonus.title}</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex-grow flex flex-wrap gap-2 mb-6">
                                {casino.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-[#1A1A1A] text-[#8d8c9e] px-2.5 py-1.5 rounded-full font-mono font-semibold">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action Button */}
                            <Link to={`/casinos/${casino.id}`} className="mt-auto">
                                 <Button variant="secondary" className="w-full font-orbitron uppercase tracking-wider font-bold"> 
                                     <Icons.ArrowRight className="h-4 w-4 mr-2"/>
                                     View Operator
                                 </Button>
                            </Link>
                        </div>
                    ))}
                </div>

                 <div className="mt-20 text-center">
                    <Link to="/casinos">
                        <Button variant="primary" size="lg" className="font-orbitron font-bold uppercase tracking-widest text-base">
                           <Icons.List className="h-5 w-5 mr-3"/>
                           Browse All Operators
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
