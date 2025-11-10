
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { ToastContext } from '../context/ToastContext';

export const MessagesPage = () => {
    const showToast = useContext(ToastContext)?.showToast ?? (() => {});
    const [connections, setConnections] = useState<any[]>([]);
    const [pendingRequests, setPendingRequests] = useState<any[]>([]);
    const [activeChat, setActiveChat] = useState<any>(null); // The user you are chatting with
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchUsername, setSearchUsername] = useState('');

    const jwt = localStorage.getItem('jwt');

    const fetchConnections = useCallback(async () => {
        // Fetch accepted connections and pending requests
        // This would involve new backend endpoints `GET /connections/accepted` and `GET /connections/pending`
    }, [jwt]);

    const fetchMessages = useCallback(async (partnerId: string) => {
        if (!jwt) return;
        try {
            const response = await fetch(`http://localhost:3001/messages/${partnerId}`, { headers: { 'x-appwrite-jwt': jwt }});
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            showToast('Error fetching messages', 'error');
        }
    }, [jwt, showToast]);

    useEffect(() => {
        fetchConnections();
    }, [fetchConnections]);

    // Poll for new messages in the active chat
    useEffect(() => {
        if (!activeChat) return;
        const interval = setInterval(() => {
            fetchMessages(activeChat.id);
        }, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [activeChat, fetchMessages]);


    const handleSendRequest = async () => {
        // ... POST to /connections/request
    };

    const handleAcceptRequest = async (requestId: string) => {
        // ... POST to /connections/accept/:requestId
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;
        
        // POST to /messages/send
        setNewMessage('');
        // Immediately append the message to the UI for a snappy feel
        setMessages(prev => [{ content: newMessage, senderId: 'me' /* temp */ }, ...prev]); 
        // Fetch again to get the real message with server data
        setTimeout(() => fetchMessages(activeChat.id), 1000);
    };

    return (
        <div className="container mx-auto max-w-7xl p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
                {/* Left Column: Connections & Requests */}
                <div className="bg-[#14131c] rounded-lg p-6 border border-[#333]">
                    <h2 className="font-heading text-xl uppercase mb-4">Connections</h2>
                    {/* Search to add connection */}
                    <div className="flex gap-2 mb-4">
                        <Input type="text" placeholder="Enter username..." value={searchUsername} onChange={e => setSearchUsername(e.target.value)} />
                        <Button onClick={handleSendRequest}><Icons.UserPlus className="h-5 w-5"/></Button>
                    </div>
                    {/* Pending Requests */}
                    {/* List of Connections */}
                </div>

                {/* Right Column: Chat Window */}
                <div className="lg:col-span-2 bg-[#14131c] rounded-lg border border-[#333] flex flex-col">
                    {activeChat ? (
                        <>
                            <div className="border-b border-[#333] p-4 font-heading uppercase text-lg">Chat with {activeChat.name}</div>
                            <div className="flex-grow p-4 overflow-y-auto flex flex-col-reverse">
                                {/* Messages will be mapped here */}
                            </div>
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-[#333]">
                                <Input type="text" placeholder="Transmit message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                            </form>
                        </>
                    ) : (
                        <div className="flex-grow flex items-center justify-center text-[#8d8c9e]">// Select a connection to begin secure comms</div>
                    )}
                </div>
            </div>
        </div>
    );
};
