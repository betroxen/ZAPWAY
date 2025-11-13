import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const MESSAGES_DATA = [
  { id: 1, from: 'ZAP System', subject: 'SSP Reward Payout Initiated', time: '2h ago', read: false },
  { id: 2, from: 'CommunityVetoBot', subject: 'Veto Against "ShadyBet" Has Passed', time: '1d ago', read: true },
  { id: 3, from: 'Admin', subject: 'Your VPR for Stake.com has been verified', time: '2d ago', read: true },
];

export const MessagesPage = () => {
  return (
    <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
            <Icons.Mail className="h-8 w-8 text-[#00FFC0]" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">Inbox</h1>
        </div>
        <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">// SECURE COMMUNICATION CHANNEL</p>
      </div>

      <Card className="p-0 overflow-hidden bg-[#0c0c0e] border-[#333]">
        <div className="p-4 bg-[#14131c] border-b border-[#333] flex justify-between items-center">
            <h2 className="font-heading text-sm text-white uppercase">All Messages</h2>
            <Button variant="ghost" size="sm" className="text-xs font-mono uppercase">Compose</Button>
        </div>
        <div className="divide-y divide-[#333]">
          {MESSAGES_DATA.map((msg) => (
            <div key={msg.id} className={`p-4 flex items-center justify-between gap-4 hover:bg-[#14131c] transition-colors cursor-pointer ${!msg.read ? 'bg-[#00FFC0]/5' : ''}`}>
              <div className="flex items-center gap-4">
                {!msg.read && <div className="h-2 w-2 rounded-full bg-[#00FFC0] flex-shrink-0"></div>}
                <div className={msg.read ? 'ml-6' : ''}>
                  <p className={`font-bold ${!msg.read ? 'text-white' : 'text-[#8d8c9e]'}`}>{msg.from}</p>
                  <p className={`text-sm ${!msg.read ? 'text-white' : 'text-[#8d8c9e]'}`}>{msg.subject}</p>
                </div>
              </div>
              <div className="text-xs text-[#666] font-mono whitespace-nowrap">{msg.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
