
import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ToastContext } from '../context/ToastContext';

interface Tournament {
    id: string;
    name: string;
    description: string;
    minLevel: number;
    prizePool: string;
}

export const TournamentsPage = () => {
    const showToast = useContext(ToastContext)?.showToast ?? (() => {});
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [userLevel, setUserLevel] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                setError('You must be logged in to view tournaments.');
                setIsLoading(false);
                return;
            }

            try {
                // Fetch user and tournament data in parallel
                const [userRes, tournamentsRes] = await Promise.all([
                    fetch('http://localhost:3001/user', { headers: { 'x-appwrite-jwt': jwt } }),
                    fetch('http://localhost:3001/tournaments')
                ]);

                if (!userRes.ok) throw new Error('Could not fetch user data.');
                if (!tournamentsRes.ok) throw new Error('Could not fetch tournaments.');

                const userData = await userRes.json();
                const tournamentsData = await tournamentsRes.json();

                setUserLevel(userData.user.level);
                setTournaments(tournamentsData);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleJoin = (tournamentName: string) => {
        showToast(`Attempting to join ${tournamentName}...`, 'info');
        // In a real app, this would make a POST request to a /joinTournament endpoint
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 py-10 md:p-12 page-fade-in">
            <h1 className="font-orbitron text-4xl md:text-5xl text-white font-black uppercase tracking-wide">TOURNAMENTS</h1>
            <p className="text-[#8d8c9e] text-lg mt-2">Test your skills against other Operators.</p>

            {isLoading && <div className="text-center p-20 font-mono text-[#00FFC0]">// LOADING SIMULATIONS...</div>}
            {error && <div className="text-center p-20 font-mono text-red-500 uppercase">{error}</div>}

            {!isLoading && !error && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tournaments.map(tourney => {
                        const isEligible = userLevel >= tourney.minLevel;
                        return (
                            <div key={tourney.id} className={`bg-[#0c0c0e] border border-[#3a3846] rounded-lg p-6 flex flex-col transition-all duration-300 ${!isEligible ? 'opacity-50' : 'hover:border-[#00FFC0]'}`}>
                                <h2 className="font-orbitron text-2xl text-[#00FFC0] font-bold">{tourney.name}</h2>
                                <p className="text-[#8d8c9e] mt-2 flex-grow">{tourney.description}</p>
                                
                                <div className="my-6 space-y-3 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-white/50">PRIZE POOL:</span>
                                        <span className="text-white font-bold">{tourney.prizePool}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/50">MIN. LEVEL:</span>
                                        <span className={`font-bold ${isEligible ? 'text-green-400' : 'text-red-400'}`}>{tourney.minLevel}</span>
                                    </div>
                                </div>

                                <Button 
                                    onClick={() => handleJoin(tourney.name)}
                                    disabled={!isEligible}
                                    className="mt-auto w-full"
                                >
                                    {isEligible ? <><Icons.LogIn className="h-4 w-4 mr-2"/><span>Join Queue</span></> : <><Icons.Lock className="h-4 w-4 mr-2"/><span>Level Locked</span></>}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
