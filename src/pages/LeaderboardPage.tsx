
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface LeaderboardEntry {
    username: string;
    level: number;
    points: number;
    profilePicture: string;
}

export const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3001/leaderboard');
                if (!response.ok) {
                    throw new Error('Failed to load leaderboard data.');
                }
                const data = await response.json();
                setLeaderboard(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-orbitron text-4xl md:text-5xl text-white font-black uppercase tracking-wide">LEADERBOARD</h1>
            <p className="text-[#8d8c9e] text-lg mt-2">The Grid's Top Ranked Operators</p>

            {isLoading && <div className="text-center p-20 font-mono text-[#00FFC0]">// LOADING RANKINGS...</div>}
            {error && <div className="text-center p-20 font-mono text-red-500 uppercase">{error}</div>}

            {!isLoading && !error && (
                <div className="mt-12 bg-[#0c0c0e] border border-[#3a3846] rounded-lg">
                    <table className="w-full text-left">
                        <thead className="border-b border-[#3a3846]">
                            <tr>
                                <th className="p-4 font-heading uppercase text-sm text-white tracking-wider">Rank</th>
                                <th className="p-4 font-heading uppercase text-sm text-white tracking-wider">Operator</th>
                                <th className="p-4 font-heading uppercase text-sm text-white tracking-wider text-center">Level</th>
                                <th className="p-4 font-heading uppercase text-sm text-white tracking-wider text-right">Z-Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((user, index) => (
                                <tr key={user.username} className="border-b border-[#22212b] last:border-b-0 hover:bg-[#1a1923]">
                                    <td className="p-4 font-orbitron text-2xl text-[#00FFC0] text-glow">{index + 1}</td>
                                    <td className="p-4">
                                        <Link to={`/profile/${user.username}`} className="flex items-center gap-4 group">
                                            <img src={user.profilePicture} alt={user.username} className="w-12 h-12 rounded-full"/>
                                            <span className="font-bold text-white text-lg group-hover:text-[#00FFC0]">{user.username}</span>
                                        </Link>
                                    </td>
                                    <td className="p-4 font-orbitron text-xl text-white text-center">{user.level}</td>
                                    <td className="p-4 font-mono text-lg text-white text-right">{user.points.toLocaleString()} ZP</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
