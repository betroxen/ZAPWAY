
import React from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Icons } from '../components/icons';

const mockContacts = [
    { id: 1, name: "Zap Support", lastMessage: "Your ticket #482 has been resolved.", time: "1h ago", unread: true },
    { id: 2, name: "CryptoWhale99", lastMessage: "Did you see that new bonus?", time: "1d ago", unread: false },
];

export const MessagesPage = () => {
    return (
        <div className="container mx-auto max-w-6xl h-[calc(100vh-8rem)] p-4 md:p-8 page-fade-in flex gap-4">
            {/* Sidebar / Contact List */}
            <Card className="w-full md:w-1/3 lg:w-1/4 flex flex-col p-0 overflow-hidden">
                <div className="p-4 border-b border-[#3a3846]">
                     <h2 className="font-heading text-xl text-white mb-4">Messages</h2>
                     <div className="relative">
                        <Input placeholder="Search..." className="pl-10" />
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-4 w-4" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {mockContacts.map(contact => (
                        <div key={contact.id} className={`p-4 flex gap-3 hover:bg-[#24232d] cursor-pointer transition-colors ${contact.id === 1 ? 'bg-[#1ed760]/5' : ''}`}>
                             <img src={`https://placehold.co/40x40/24232d/ffffff?text=${contact.name.substring(0,1)}`} alt={contact.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                             <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-baseline mb-1">
                                     <p className={`font-medium truncate ${contact.unread ? 'text-white' : 'text-[#8d8c9e]'}`}>{contact.name}</p>
                                     <span className="text-xs text-[#8d8c9e]">{contact.time}</span>
                                 </div>
                                 <p className={`text-sm truncate ${contact.unread ? 'text-white font-medium' : 'text-[#8d8c9e]'}`}>{contact.lastMessage}</p>
                             </div>
                             {contact.unread && <div className="w-2.5 h-2.5 bg-[#1ed760] rounded-full self-center"></div>}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Area - Placeholder */}
            <Card className="hidden md:flex flex-1 flex-col p-0 overflow-hidden justify-center items-center bg-[#14131c]/50">
                <div className="text-center p-8">
                    <Icons.MessageSquare className="h-16 w-16 text-[#3a3846] mx-auto mb-4" />
                    <h3 className="font-heading text-2xl text-white mb-2">Your Inbox</h3>
                    <p className="text-[#8d8c9e]">Select a conversation to start messaging.</p>
                </div>
            </Card>
        </div>
    );
};
