
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Icons } from '../components/icons';

const mockPosts = [
    { id: 1, user: "CryptoWhale99", time: "2h ago", content: "Just hit a 5000x on Wanted Dead or a Wild at Stake! The RTP seems hot right now. 🚀", likes: 24, comments: 5 },
    { id: 2, user: "BonusHunter", time: "5h ago", content: "PSA: Roobet's new weekly bonus has a hidden 40x wager on free spins. Read the T&Cs carefully before claiming.", likes: 45, comments: 12 },
    { id: 3, user: "DegenKing", time: "1d ago", content: "Anyone tried the new Duel originals? Plinko feels a bit tight compared to others.", likes: 8, comments: 15 },
];

export const CommunityHubPage = () => {
    return (
        <div className="container mx-auto max-w-3xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-heading text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Icons.Zap className="text-[#1ed760] h-8 w-8" /> Alpha Feed
            </h1>
            <p className="text-lg text-[#8d8c9e] mb-8">Real-time insights, big wins, and warnings from the community.</p>

            {/* New Post Input */}
            <Card className="p-4 mb-8">
                <div className="flex gap-4">
                    <img src="https://placehold.co/40x40/1ed760/000000?text=DG" alt="Profile" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                        <Input placeholder="Share some alpha..." className="mb-3 bg-[#14131c] border-none focus:ring-1" />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 text-[#8d8c9e]">
                                <button className="hover:text-white"><Icons.FileText className="h-5 w-5" /></button>
                            </div>
                            <Button size="sm">Post</Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Feed */}
            <div className="space-y-4">
                {mockPosts.map(post => (
                    <Card key={post.id} className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={`https://placehold.co/40x40/24232d/ffffff?text=${post.user.substring(0,2).toUpperCase()}`} alt={post.user} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-bold text-white hover:text-[#1ed760] cursor-pointer">{post.user}</p>
                                <p className="text-xs text-[#8d8c9e]">{post.time}</p>
                            </div>
                        </div>
                        <p className="text-white mb-4 leading-relaxed">{post.content}</p>
                        <div className="flex gap-6 text-[#8d8c9e] text-sm">
                            <button className="flex items-center gap-2 hover:text-[#1ed760] transition-colors">
                                <Icons.Zap className="h-5 w-5" /> {post.likes}
                            </button>
                            <button className="flex items-center gap-2 hover:text-white transition-colors">
                                <Icons.MessageSquare className="h-5 w-5" /> {post.comments}
                            </button>
                            <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                                <Icons.Share className="h-5 w-5" />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
