
import React from 'react';
import { GenericPage } from './GenericPage';
import { Icons } from '../components/icons';
import { ProgressBar } from '../components/ProgressBar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const MissionsPage = () => {
  const dailyMissions = [
      { id: 1, title: "Daily Login", description: "Log in to the platform.", progress: 100, reward: "5 ZP", claimed: false },
      { id: 2, title: "Community Voice", description: "Post 3 messages in the Alpha Feed.", progress: 33, reward: "15 ZP", claimed: false },
      { id: 3, title: "Bonus Hunter", description: "View 5 different casino bonus pages.", progress: 60, reward: "10 ZP", claimed: false },
  ];

  return (
    <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="font-heading text-4xl font-bold text-white mb-2">Missions</h1>
                <p className="text-lg text-[#8d8c9e]">Complete tasks to earn Zap Points and level up.</p>
            </div>
            <div className="hidden md:block text-right">
                 <p className="text-sm text-[#8d8c9e] uppercase font-medium mb-1">Time Remaining</p>
                 <p className="font-heading text-2xl text-white font-bold flex items-center gap-2 justify-end">
                    <Icons.Clock className="h-5 w-5 text-[#1ed760]" /> 14h 32m 10s
                 </p>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {dailyMissions.map(mission => (
                <Card key={mission.id} className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="p-4 bg-[#14131c] rounded-full border border-[#3a3846]">
                        <Icons.Target className="h-8 w-8 text-[#1ed760]" />
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex justify-between mb-2">
                            <h3 className="font-heading text-xl text-white">{mission.title}</h3>
                            <span className="text-[#1ed760] font-bold">{mission.reward}</span>
                        </div>
                        <p className="text-[#8d8c9e] text-sm mb-4">{mission.description}</p>
                        <div className="flex items-center gap-4">
                            <ProgressBar progress={mission.progress} className="flex-1" />
                            <span className="text-xs text-white font-medium min-w-[3rem] text-right">{mission.progress}%</span>
                        </div>
                    </div>
                    <Button 
                        variant={mission.progress === 100 ? 'primary' : 'secondary'} 
                        disabled={mission.progress < 100 || mission.claimed}
                        className="w-full md:w-auto whitespace-nowrap"
                    >
                        {mission.claimed ? 'Claimed' : mission.progress === 100 ? 'Claim Reward' : 'In Progress'}
                    </Button>
                </Card>
            ))}
        </div>
    </div>
  );
};
