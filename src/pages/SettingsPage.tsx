import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';
import { ToastContext, ToastContextType } from '../context/ToastContext';
import { useSound } from '../context/SoundContext';
import { ChangePasswordModal } from '../components/ChangePasswordModal';
import { DeleteAccountModal } from '../components/DeleteAccountModal';

// Define the structure of the settings object
interface UserSettings {
    mfaActive: boolean;
    highSecLogs: boolean;
    geoMonitor: boolean;
    autoTerminate: boolean;
    hardLock: boolean;
    anonymizedAnalytics: boolean;
    affiliateTracking: boolean;
    contributionDisplay: boolean;
    aestheticMode: 'dark' | 'light';
    dataViewFormat: 'decimal' | 'percentage';
    language: string;
    audioMuted: boolean;
    emailIntel: boolean;
    communitySignal: boolean;
    marketingComm: boolean;
}

export const SettingsPage = () => {
    const toastCtx = useContext(ToastContext) as ToastContextType | undefined;
    const showToast = toastCtx?.showToast ?? (() => {});
    const { setMuted } = useSound();

    const [user, setUser] = useState<{ handle: string; email: string } | null>(null);
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [newHandle, setNewHandle] = useState('');
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all user data
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const jwt = localStorage.getItem('jwt');
                if (!jwt) throw new Error('AUTHENTICATION INVALID');

                const response = await fetch('http://localhost:3001/user', { headers: { 'x-appwrite-jwt': jwt } });
                if (!response.ok) throw new Error('Failed to fetch user data');
                
                const data = await response.json();
                setUser({ handle: data.user.name, email: data.user.email });
                setNewHandle(data.user.name);
                setSettings(data.settings);
                setMuted(data.settings.audioMuted); // Sync sound context

            } catch (error: any) {
                showToast(error.message, 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [showToast, setMuted]);

    // Generic handler to update a single setting
    const handleSettingChange = useCallback(async (key: keyof UserSettings, value: any) => {
        if (!settings) return;
        
        const originalValue = settings[key];
        setSettings(prev => prev ? { ...prev, [key]: value } : null);

        try {
            const jwt = localStorage.getItem('jwt');
            const response = await fetch('http://localhost:3001/user/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-appwrite-jwt': jwt || '' },
                body: JSON.stringify({ [key]: value })
            });
            if (!response.ok) throw new Error(); // Let catch block handle it
            
            showToast(`Setting ${key} updated.`, 'success');
        } catch (error) {
            showToast(`Failed to update ${key}. Reverting.`, 'error');
            setSettings(prev => prev ? { ...prev, [key]: originalValue } : null); // Revert on failure
        }
    }, [settings, showToast]);

    // Specific handler for sound toggle to avoid double toast
    const handleAudioToggle = (isSoundOn: boolean) => {
        handleSettingChange('audioMuted', !isSoundOn);
        setMuted(!isSoundOn);
    };

    // ... (handleUpdateUsername, handleDeleteAccount remain the same)

    if (isLoading) {
        return <div className="text-center p-20 font-mono text-[#00FFC0]">// LOADING COMMAND CONSOLE...</div>;
    }

    if (!user || !settings) {
        return <div className="text-center p-20 font-mono text-red-500">// FAILED TO LOAD USER DATA. PLEASE RELOG.</div>;
    }

    // The rest of the JSX uses the `settings` state and `handleSettingChange` handler
    // For example:
    // <Toggle checked={settings.highSecLogs} onChange={(checked) => handleSettingChange('highSecLogs', checked)} ... />
    // <select value={settings.language} onChange={(e) => handleSettingChange('language', e.target.value)} ... />
    
    return (
        <>
            <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)} showToast={showToast} />
            <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async (password) => { /* ... */ }} showToast={showToast} />
            
            <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
                 {/* ... Header ... */}
                
                 {/* SECURITY CIRCUIT */}
                <section id="security">
                     {/* ... */}
                    <div className="space-y-2 divide-y divide-[#333]/50">
                        <Toggle 
                            checked={settings.mfaActive} onChange={(c) => handleSettingChange('mfaActive', c)} 
                            label={<span className="font-heading uppercase text-sm">MFA Management</span>}
                            description="Mandatory for withdrawals and high-risk executions."
                        />
                         <Toggle 
                            checked={settings.highSecLogs} onChange={(c) => handleSettingChange('highSecLogs', c)} 
                            label={<span className="font-heading uppercase text-sm">Enable High-Security Access Logs</span>}
                            description="Continuous capture of IP metadata and session vectors."
                        />
                        {/* ... more toggles with the same pattern */}
                    </div>
                </section>

                {/* USER PREFERENCES */}
                 <section id="preferences">
                     {/* ... */}
                     <Toggle 
                        checked={!settings.audioMuted} onChange={handleAudioToggle} 
                        label={<span className="font-heading uppercase text-sm">Tactical Audio Feedback</span>}
                        description="Enable UI sound effects for clicks and notifications."
                    />
                    <select value={settings.language} onChange={(e) => handleSettingChange('language', e.target.value)}>
                        {/* ... options ... */}
                    </select>
                     {/* ... etc ... */}
                 </section>

                 {/* ... all other sections updated similarly ... */}
            </div>
        </>
    );
};