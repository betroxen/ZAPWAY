
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';

// --- MOCK DATA ---
const MOCK_CONTACTS = [
    { id: 1, name: "ZAP SUPPORT HQ", status: 'online', lastSeen: 'NOW', lastMessage: "Ticket #9432: VPR validated. +50 ZP added to your stack.", time: "10m ago", unread: 1, role: 'OFFICIAL' },
    { id: 2, name: "CryptoWhale99", status: 'offline', lastSeen: '2H AGO', lastMessage: "Did you see that 5000x on Wanted? Insane run.", time: "2h ago", unread: 0, role: 'ELITE' },
    { id: 3, name: "RTP_Hunter", status: 'online', lastSeen: 'NOW', lastMessage: "Stake's new Plinko seed looks volatile today.", time: "1d ago", unread: 0, role: 'ANALYST' },
];

const MOCK_CHAT_HISTORY = [
    { id: 1, sender: 'them', text: "Operator, we've reviewed your VPR for the delayed withdrawal on Roobet.", time: "10:42 AM" },
    { id: 2, sender: 'them', text: "The on-chain data confirms the delay originated from their hot wallet, not the blockchain mempool. Good catch.", time: "10:43 AM" },
    { id: 3, sender: 'me', text: "Acknowledged. I knew the standard support excuse didn't add up. What's the verdict?", time: "10:45 AM" },
    { id: 4, sender: 'them', text: "Ticket #9432 closed. VPR validated. We've applied a temporary score penalty to their Payout metric and credited +50 ZP to your account.", time: "10:50 AM" },
];

export const MessagesPage = () => {
    const [activeContactId, setActiveContactId] = useState<number | null>(null);
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
    const [messageInput, setMessageInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const activeContact = MOCK_CONTACTS.find(c => c.id === activeContactId);

    const handleContactSelect = (id: number) => {
        setActiveContactId(id);
        setMobileView('chat');
    };

    const handleBackToList = () => {
        setMobileView('list');
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        // In a real app, this would push to state/backend
        setMessageInput('');
        // Scroll to bottom
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    return (
        <div className="container mx-auto max-w-7xl h-[calc(100vh-8rem)] p-4 md:p-8 page-fade-in flex flex-col">
            
            {/* HEADER */}
            <div className="mb-6 flex-shrink-0">
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                    <Icons.MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-[#00FFC0] animate-pulse-slow" />
                    SECURE COMM LINK
                </h1>
                <p className="text-[#00FFC0] font-mono text-xs md:text-sm uppercase tracking-widest mt-1 ml-9 md:ml-11 text-glow">
                    // ENCRYPTION: ACTIVE // SIGNAL: CLEAR
                </p>
            </div>

            {/* MAIN TERMINAL LAYOUT */}
            <div className="flex flex-1 gap-6 overflow-hidden relative bg-[#0A0A0A] border border-[#333] rounded-xl">
                
                {/* LEFT PANEL: CONTACT LIST */}
                <div className={`w-full md:w-1/3 lg:w-1/4 bg-[#0c0c0e] border-r border-[#333] flex flex-col transition-all duration-300 absolute inset-0 z-10 md:relative md:z-auto ${mobileView === 'chat' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
                    {/* Search Header */}
                    <div className="p-4 border-b border-[#333]">
                        <div className="relative">
                            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8c9e] h-4 w-4" />
                            <Input placeholder="SEARCH SIGNALS..." className="pl-10 bg-[#14131c] border-[#333] font-mono text-xs h-10" />
                        </div>
                    </div>
                    {/* List */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {MOCK_CONTACTS.map(contact => (
                            <button
                                key={contact.id}
                                onClick={() => handleContactSelect(contact.id)}
                                className={`w-full text-left p-4 flex gap-3 transition-all border-l-2 hover:bg-[#14131c] ${activeContactId === contact.id ? 'bg-[#14131c] border-[#00FFC0]' : 'border-transparent'}`}
                            >
                                <div className="relative flex-shrink-0">
                                    <img src={`https://placehold.co/40x40/24232d/ffffff?text=${contact.name.substring(0,1)}`} alt={contact.name} className="w-10 h-10 rounded-md border border-[#333]" />
                                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0c0c0e] ${contact.status === 'online' ? 'bg-[#00FFC0]' : 'bg-[#666]'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className={`font-heading text-sm uppercase truncate ${contact.unread ? 'text-white font-bold' : 'text-[#8d8c9e]'}`}>
                                            {contact.name}
                                        </span>
                                        <span className="text-[10px] font-mono text-[#666]">{contact.time}</span>
                                    </div>
                                    <p className={`text-xs truncate font-mono ${contact.unread ? 'text-[#00FFC0]' : 'text-[#666]'}`}>
                                        {contact.unread ? '> NEW SIGNAL RECEIVED' : contact.lastMessage}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT PANEL: CHAT TERMINAL */}
                <div className={`flex-1 flex flex-col bg-[#121212] transition-all duration-300 absolute inset-0 z-10 md:relative md:z-auto ${mobileView === 'list' ? 'translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
                    {activeContact ? (
                        <>
                            {/* Chat Header */}
                            <div className="h-16 flex-shrink-0 bg-[#0c0c0e] border-b border-[#333] flex items-center px-4 md:px-6 justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={handleBackToList} className="md:hidden text-[#8d8c9e] hover:text-white">
                                        <Icons.ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <div className="relative">
                                        <img src={`https://placehold.co/40x40/24232d/ffffff?text=${activeContact.name.substring(0,1)}`} alt="" className="w-8 h-8 rounded-md border border-[#333]" />
                                        <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#0c0c0e] ${activeContact.status === 'online' ? 'bg-[#00FFC0]' : 'bg-[#666]'}`} />
                                    </div>
                                    <div>
                                        <h2 className="font-heading text-white text-sm uppercase tracking-wider">{activeContact.name}</h2>
                                        <p className="font-mono text-[10px] text-[#00FFC0] uppercase">
                                            // {activeContact.role} // {activeContact.status === 'online' ? 'SIGNAL ACTIVE' : `LAST SEEN: ${activeContact.lastSeen}`}
                                        </p>
                                    </div>
                                </div>
                                <span title="End-to-End Encrypted" className="cursor-help">
                                    <Icons.Lock className="h-4 w-4 text-[#333]" />
                                </span>
                            </div>

                            {/* Chat Messages Stream */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar bg-[linear-gradient(rgba(0,255,192,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.02)_1px,transparent_1px)] bg-[size:20px_20px]">
                                {MOCK_CHAT_HISTORY.map(msg => (
                                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'me' ? 'bg-[#00FFC0]/10 border border-[#00FFC0]/30 text-[#00FFC0] rounded-tr-none' : 'bg-[#1A1A1A] border border-[#333] text-[#8d8c9e] rounded-tl-none'}`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] font-mono text-[#666] mt-1 uppercase">
                                            {msg.time} {msg.sender === 'me' && '// SENT'}
                                        </span>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input Terminal */}
                            <div className="p-4 bg-[#0c0c0e] border-t border-[#333]">
                                <form onSubmit={handleSendMessage} className="flex gap-3">
                                    <div className="flex-1 relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00FFC0] font-mono text-sm">{'>'}</span>
                                        <Input 
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            placeholder="TRANSMIT MESSAGE..." 
                                            className="pl-8 bg-[#1A1A1A] border-[#333] font-mono text-sm h-11 focus:border-[#00FFC0]" 
                                        />
                                    </div>
                                    <Button type="submit" className="px-4 md:px-6 shadow-[0_0_15px_rgba(0,255,192,0.15)]" disabled={!messageInput.trim()}>
                                        <Icons.ArrowRight className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-[#8d8c9e] p-6 text-center">
                            <Icons.Activity className="h-16 w-16 opacity-20 text-[#00FFC0] mb-4 animate-pulse" />
                            <h3 className="font-heading text-xl text-white uppercase tracking-widest mb-2">AWAITING SIGNAL</h3>
                            <p className="font-mono text-xs">// SELECT AN ACTIVE FREQUENCY TO COMMUNICATE</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
