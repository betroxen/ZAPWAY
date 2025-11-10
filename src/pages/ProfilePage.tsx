
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icons } from '../components/icons';

// Dummy badge data, replace with real definitions
const BADGE_DEFINITIONS = {
    NEW_RECRUIT: { icon: Icons.Award, name: 'New Recruit', description: 'Joined the Grid' },
    GRIDRUNNER: { icon: Icons.Zap, name: 'Gridrunner', description: 'Reached Level 5' },
    // ... more badges
};

export const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!username) return;
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/profile/${username}`);
                if (response.status === 404) {
                    setError('USER NOT FOUND: This node does not exist on the Grid.');
                } else if (!response.ok) {
                    throw new Error('Error fetching profile data.');
                }
                const data = await response.json();
                setProfile(data);
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [username]);

    if (isLoading) {
        return <div className="text-center p-20 font-mono text-[#00FFC0]">// ACCESSING NODE DATA...</div>;
    }

    if (error) {
        return <div className="text-center p-20 font-mono text-red-500 uppercase">{error}</div>;
    }

    if (!profile) return null;

    return (
        <div className="page-fade-in">
            {/* Banner Image */}
            <div className="h-48 md:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${profile.bannerPicture})` }}></div>

            <div className="container mx-auto max-w-5xl p-4 -mt-24">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Profile Picture */}
                    <div className="relative">
                        <img src={profile.profilePicture} alt={`${username}\'s profile`} className="w-40 h-40 rounded-full border-4 border-black object-cover shadow-lg"/>
                        <div className="absolute bottom-2 right-2 bg-green-500 rounded-full h-6 w-6 border-2 border-black flex items-center justify-center text-xs font-bold">{profile.level}</div>
                    </div>
                    <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                        <h1 className="font-orbitron text-4xl font-bold uppercase tracking-wider text-white">{profile.name}</h1>
                        <p className="text-[#8d8c9e] text-lg font-mono mt-1">{profile.tagline}</p>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="mt-12">
                    <h2 className="font-heading text-xl text-white uppercase tracking-wider mb-4">BADGES & HONORS</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {profile.badges.map((badgeCode: string) => {
                            const badge = BADGE_DEFINITIONS[badgeCode as keyof typeof BADGE_DEFINITIONS];
                            if (!badge) return null;
                            const BadgeIcon = badge.icon;
                            return (
                                <div key={badgeCode} className="bg-[#14131c] p-4 rounded-lg border border-[#333] text-center">
                                    <BadgeIcon className="h-12 w-12 mx-auto text-[#00FFC0] mb-2" />
                                    <h3 className="font-bold text-white uppercase">{badge.name}</h3>
                                    <p className="text-xs text-[#8d8c9e]">{badge.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
