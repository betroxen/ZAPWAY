import React, { useState } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, showToast }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setError('ALL FIELDS ARE REQUIRED');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('NEW PASSKEYS DO NOT MATCH');
            return;
        }
        // Add new password strength validation if you want

        setIsLoading(true);

        try {
            const jwt = localStorage.getItem('jwt');
            const response = await fetch('http://localhost:3001/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-appwrite-jwt': jwt || ''
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An unknown error occurred.');
            }
            
            showToast('Passkey successfully updated.', 'success');
            onClose();

        } catch (err: any) {
            setError(err.message.toUpperCase() || 'FAILED TO UPDATE PASSKEY');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-[#000000]/80 backdrop-blur-md" onClick={onClose} />
            <div className="relative w-full max-w-md bg-[#0c0c0e] border border-[#00FFC0]/30 rounded-xl shadow-lg animate-modal-enter">
                <button onClick={onClose} className="absolute top-4 right-4 text-[#8d8c9e] hover:text-[#00FFC0]">
                    <Icons.X className="h-5 w-5" />
                </button>

                <div className="p-6">
                    <h2 className="font-heading text-lg text-white uppercase tracking-widest text-center mb-4">Update Passkey</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input type="password" placeholder="CURRENT PASSKEY" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                        <Input type="password" placeholder="NEW PASSKEY" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        <Input type="password" placeholder="CONFIRM NEW PASSKEY" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                        
                        {error && <p className="text-red-500 text-xs font-mono text-center">{error}</p>}

                        <Button type="submit" loading={isLoading} disabled={isLoading} className="w-full uppercase">
                            Secure and Update
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};