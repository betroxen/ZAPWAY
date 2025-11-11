
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ToastContext } from '../context/ToastContext';
import { WriteReviewModal } from '../components/WriteReviewModal';
import { fetchCasino } from '../services/api';

interface Casino {
    id: string;
    name: string;
    logo: string;
    website: string;
    rating: number;
    reviewCount: number;
    description: string;
    bonus: { title: string; description: string; };
    features: string[];
    tags: string[];
    reviews: { user: string; rating: number; text: string; }[];
}

export const CasinoDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const showToast = useContext(ToastContext)?.showToast ?? (() => {});
    const [casino, setCasino] = useState<Casino | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);

    useEffect(() => {
        const loadCasino = async () => {
            try {
                if (!id) return;
                const data = await fetchCasino(id);
                setCasino(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadCasino();
    }, [id]);

    const handleReviewSubmit = async () => {
        try {
            if (!id) return;
            const data = await fetchCasino(id);
            setCasino(data);
        } catch (err: any) {
            setError(err.message);
        } 
    };

    if (isLoading) return <div className="text-center p-20 font-mono text-[#00FFC0]">// LOADING CASINO DATA...</div>;
    if (error) return <div className="text-center p-20 font-mono text-red-500 uppercase">{error}</div>;
    if (!casino) return <div className="text-center p-20 font-mono text-white">Casino not found.</div>;

    return (
        <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h1 className="font-orbitron text-4xl md:text-5xl text-white font-black uppercase tracking-wide">{casino.name}</h1>
                    <p className="text-[#8d8c9e] text-lg mt-2">{casino.description}</p>
                </div>
                <div className="flex md:items-end md:justify-end">
                    <a href={casino.website} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="w-full md:w-auto font-orbitron uppercase">
                            <Icons.ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                        </Button>
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column (Bonus & Features) */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Bonus Card */}
                    <div className="bg-[#0c0c0e] border border-yellow-400/50 rounded-lg p-6">
                        <h3 className="font-orbitron text-xl text-yellow-400 font-bold flex items-center"><Icons.Gift className="h-5 w-5 mr-3"/>Exclusive Bonus</h3>
                        <p className="text-lg text-white font-bold mt-3">{casino.bonus.title}</p>
                        <p className="text-sm text-[#8d8c9e] mt-1">{casino.bonus.description}</p>
                    </div>

                    {/* Features List */}
                    <div>
                        <h3 className="font-orbitron text-xl text-white font-bold">Key Features</h3>
                        <ul className="mt-4 space-y-2">
                            {casino.features.map(feature => (
                                <li key={feature} className="flex items-center text-[#8d8c9e]">
                                    <Icons.Check className="h-4 w-4 mr-2 text-[#00FFC0]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column (Reviews) */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-orbitron text-xl text-white font-bold">User Reviews</h3>
                        <Button onClick={() => setReviewModalOpen(true)}>
                            <Icons.Edit className="h-4 w-4 mr-2"/> Write a Review
                        </Button>
                    </div>

                    <div className="mt-6 space-y-6">
                        {casino.reviews.length > 0 ? (
                            casino.reviews.map((review, index) => (
                                <div key={index} className="bg-[#0c0c0e]/50 border border-[#3a3846] rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-white">{review.user}</p>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Icons.Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[#8d8c9e] mt-2 text-sm">{review.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-[#8d8c9e] py-8">No reviews yet. Be the first to write one!</p>
                        )}
                    </div>
                </div>
            </div>

            {isReviewModalOpen && (
                <WriteReviewModal
                    casinoId={casino.id}
                    casinoName={casino.name}
                    onClose={() => setReviewModalOpen(false)}
                    onSuccess={handleReviewSubmit}
                />
            )}
        </div>
    );
};
