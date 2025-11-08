
import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';
import { ToastContext, ToastContextType } from '../context/ToastContext';

export const SettingsPage = () => {
    const toastCtx = useContext(ToastContext) as ToastContextType | undefined;
    const showToast = toastCtx?.showToast ?? (() => {});

    // 2. SECURITY CIRCUIT
    const [mfaActive, setMfaActive] = useState(true);

    // 3. PRIVACY & DATA CONTROL
    const [anonymizedAnalytics, setAnonymizedAnalytics] = useState(true);
    const [affiliateTracking, setAffiliateTracking] = useState(true);
    const [contributionDisplay, setContributionDisplay] = useState(true);

    // 4. SSP PROTOCOL PAYOUTS
    const [walletAddress, setWalletAddress] = useState('0x7a...3f9D');

    // 5. USER PREFERENCES
    const [aestheticMode, setAestheticMode] = useState<'dark' | 'light'>('dark');
    const [dataViewFormat, setDataViewFormat] = useState<'decimal' | 'percentage'>('percentage');
    const [language, setLanguage] = useState('en-US');

    // 6. INTEL COMM CHANNEL
    // System Alerts are mandatory (always true)
    const [emailIntel, setEmailIntel] = useState(true);
    const [communitySignal, setCommunitySignal] = useState(true);
    const [marketingComm, setMarketingComm] = useState(false);

    const handleSaveProfile = () => {
        showToast("IDENTITY SYNCHRONIZED: Profile updated on the Grid.", "success");
    };

    const handleUpdateWallet = () => {
        showToast("SSP PROTOCOL UPDATED: New payout address confirmed.", "success");
    };

    const handleDeleteAccount = () => {
        if (window.confirm("WARNING: FINAL DECOMMISSION.\n\nAre you sure you want to initiate the self-destruct protocol? This action is irreversible and will void all unclaim rewards.")) {
             showToast("SELF-DESTRUCT SEQUENCE INITIATED. Goodbye, Operator.", "error");
             // In a real app, this would trigger logout and account deletion.
        }
    };

    const SectionHeader = ({ title, icon: Icon }: { title: string, icon: React.FC<any> }) => (
        <h2 className="font-heading text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#3a3846] pb-3">
            <Icon className="h-5 w-5 text-[#1ed760]" /> {title}
        </h2>
    );

    return (
        <div className="container mx-auto max-w-5xl p-4 py-10 md:p-12 page-fade-in">
            {/* CONSOLE HEADER */}
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Icons.Settings className="h-8 w-8 text-[#1ed760] animate-spin-slow" />
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase">
                            COMMAND CONSOLE
                        </h1>
                    </div>
                    <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest">
                        // CONFIGURATION V2.0 // STATUS: OPERATIONAL
                    </p>
                </div>
                <div className="bg-[#1ed760]/10 border border-[#1ed760]/30 px-4 py-2 rounded-md flex items-center gap-3">
                     <div className="h-2.5 w-2.5 rounded-full bg-[#1ed760] animate-pulse"></div>
                     <span className="text-xs font-bold text-[#1ed760] uppercase tracking-wider">Secure Connection Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">

                {/* 1. PROFILE BLUEPRINT */}
                <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                    <SectionHeader title="1. PROFILE BLUEPRINT (Identity & Access)" icon={Icons.Users} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Your Handle (Alias)</label>
                            <div className="flex gap-3">
                                <Input value="DegenGambler" readOnly className="font-mono bg-[#14131c] border-[#3a3846] text-[#00FFC0]" />
                                <Button variant="secondary" size="sm" className="shrink-0">Edit Handle</Button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Verified Email</label>
                            <div className="flex gap-3">
                                <Input type="email" value="operator@zap.gg" readOnly className="font-mono bg-[#14131c] border-[#3a3846]" />
                                <Button variant="secondary" size="sm" className="shrink-0">Update Email</Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-[#3a3846]/50 flex justify-end">
                        <Button onClick={handleSaveProfile} className="font-mono uppercase text-xs tracking-wider">
                            SYNCHRONIZE CHANGES
                        </Button>
                    </div>
                </Card>

                {/* 2. SECURITY CIRCUIT */}
                <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                    <SectionHeader title="2. SECURITY CIRCUIT (Protection)" icon={Icons.Shield} />
                    <div className="space-y-6">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[#14131c] rounded-lg border border-[#3a3846]">
                            <div>
                                <h3 className="text-white font-heading uppercase text-sm mb-1">Password Schema</h3>
                                <p className="text-xs text-[#8d8c9e]">Last updated: 42 days ago. Status: Protected.</p>
                            </div>
                            <Button variant="secondary" size="sm">Change Password</Button>
                        </div>

                        <div className="p-4 bg-[#14131c] rounded-lg border border-[#3a3846]">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-white font-heading uppercase text-sm mb-1 flex items-center gap-2">
                                        MFA Management {mfaActive ? <span className="text-[#1ed760] text-xs">// ACTIVE</span> : <span className="text-red-500 text-xs">// INACTIVE</span>}
                                    </h3>
                                    <p className="text-xs text-[#8d8c9e]">Mandatory two-factor authentication for all withdrawals and setting changes.</p>
                                </div>
                                <Toggle checked={mfaActive} onChange={setMfaActive} />
                            </div>
                            {!mfaActive && (
                                <div className="bg-red-950/30 text-red-400 p-3 rounded text-xs border border-red-900/50 flex items-center gap-2">
                                    <Icons.X className="h-4 w-4" /> SECURITY RISK: ENABLE MFA IMMEDIATELY.
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Button variant="secondary" className="border-[#3a3846] justify-between group">
                                <span className="text-[#8d8c9e] group-hover:text-white transition-colors">Active Session Logs</span>
                                <span className="bg-[#1ed760]/10 text-[#1ed760] text-xs px-2 py-1 rounded font-mono">1 ACTIVE</span>
                             </Button>
                             <Button variant="secondary" className="border-[#3a3846] justify-between group">
                                <span className="text-[#8d8c9e] group-hover:text-white transition-colors">Emergency Recovery Key</span>
                                <Icons.Lock className="h-4 w-4 text-[#8d8c9e]" />
                             </Button>
                        </div>
                    </div>
                </Card>

                {/* 3. PRIVACY & DATA CONTROL */}
                <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                    <SectionHeader title="3. PRIVACY & DATA CONTROL (The Contract)" icon={Icons.Database} />
                    <div className="divide-y divide-[#3a3846]/50">
                        <Toggle 
                            checked={anonymizedAnalytics} 
                            onChange={setAnonymizedAnalytics} 
                            label={<span className="font-heading uppercase text-sm">Anonymized Analytics</span>}
                            description="Allow ZAP to use non-identifying data for platform performance optimization."
                        />
                        <Toggle 
                            checked={affiliateTracking} 
                            onChange={setAffiliateTracking} 
                             label={<span className="font-heading uppercase text-sm">Affiliate Tracking Preference</span>}
                            description="Opt-in to non-essential external tracking. (Disabling does not affect rewards)."
                        />
                        <Toggle 
                            checked={contributionDisplay} 
                            onChange={setContributionDisplay} 
                             label={<span className="font-heading uppercase text-sm">Community Contribution Display</span>}
                            description="Display your Handle on public validated reports and leaderboards."
                        />
                    </div>
                    <div className="mt-6 pt-6 border-t border-[#3a3846]/50">
                        <Button variant="secondary" className="w-full md:w-auto font-mono uppercase text-xs tracking-wider flex items-center gap-2 justify-center">
                            <Icons.FileText className="h-4 w-4" /> EXPORT USER DATA ARCHIVE
                        </Button>
                    </div>
                </Card>

                {/* 4. SSP PROTOCOL PAYOUTS */}
                <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                    <SectionHeader title="4. SSP PROTOCOL PAYOUTS (Rewards)" icon={Icons.Gift} />
                    <div className="bg-[#14131c] p-6 rounded-lg border border-[#3a3846] mb-6">
                        <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-3">Reward Wallet Address (ERC-20 / SOL)</label>
                        <div className="flex gap-4">
                            <Input 
                                value={walletAddress} 
                                onChange={(e) => setWalletAddress(e.target.value)} 
                                className="font-mono text-lg bg-black border-[#1ed760]/50 focus:border-[#1ed760] text-white tracking-wider" 
                            />
                            <Button onClick={handleUpdateWallet} className="shrink-0 shadow-[0_0_15px_rgba(29,215,96,0.2)]">UPDATE</Button>
                        </div>
                        <p className="text-xs text-[#8d8c9e] mt-3 flex items-center gap-2">
                            <Icons.Info className="h-4 w-4" /> Double-check your address. Lost payouts cannot be recovered.
                        </p>
                    </div>
                    <Button variant="secondary" className="w-full flex justify-between items-center border-[#3a3846] hover:border-[#1ed760]/50 group">
                        <span className="font-heading uppercase text-sm text-[#8d8c9e] group-hover:text-white">View Payout History Log</span>
                        <Icons.ChevronRight className="h-5 w-5 text-[#3a3846] group-hover:text-[#1ed760] transition-colors" />
                    </Button>
                </Card>

                {/* 5. USER PREFERENCES */}
                <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                    <SectionHeader title="5. USER PREFERENCES (View)" icon={Icons.LayoutDashboard} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Aesthetic Mode</label>
                            <div className="grid grid-cols-2 gap-2 bg-[#14131c] p-1 rounded-md border border-[#3a3846]">
                                <button 
                                    onClick={() => setAestheticMode('dark')}
                                    className={`py-2 px-4 rounded text-sm font-medium transition-all ${aestheticMode === 'dark' ? 'bg-[#3a3846] text-white shadow-sm' : 'text-[#8d8c9e] hover:text-white'}`}
                                >
                                    DARK OPS
                                </button>
                                <button 
                                    onClick={() => setAestheticMode('light')}
                                    className={`py-2 px-4 rounded text-sm font-medium transition-all ${aestheticMode === 'light' ? 'bg-white text-black shadow-sm' : 'text-[#8d8c9e] hover:text-white'}`}
                                >
                                    LIGHT (BETA)
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Data View Format</label>
                            <div className="grid grid-cols-2 gap-2 bg-[#14131c] p-1 rounded-md border border-[#3a3846]">
                                <button 
                                    onClick={() => setDataViewFormat('percentage')}
                                    className={`py-2 px-4 rounded text-sm font-medium transition-all ${dataViewFormat === 'percentage' ? 'bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30' : 'text-[#8d8c9e] hover:text-white'}`}
                                >
                                    96.5%
                                </button>
                                <button 
                                    onClick={() => setDataViewFormat('decimal')}
                                    className={`py-2 px-4 rounded text-sm font-medium transition-all ${dataViewFormat === 'decimal' ? 'bg-[#1ed760]/20 text-[#1ed760] border border-[#1ed760]/30' : 'text-[#8d8c9e] hover:text-white'}`}
                                >
                                    0.965
                                </button>
                            </div>
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Primary Console Language</label>
                            <select 
                                value={language} 
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full h-10 rounded-md border border-[#3a3846] bg-[#14131c] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760] focus:border-transparent font-mono"
                            >
                                <option value="en-US">ENGLISH (US) // DEFAULT</option>
                                <option value="es-ES">ESPAÑOL // BETA</option>
                                <option value="de-DE">DEUTSCH // BETA</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* 6. INTEL COMM CHANNEL */}
                <Card className="p-6 md:p-8 bg-[#0c0c0e] border-[#3a3846]">
                     <SectionHeader title="6. INTEL COMM CHANNEL (Notifications)" icon={Icons.Mail} />
                     <div className="divide-y divide-[#3a3846]/50">
                        {/* Mandatory Toggle - effectively disabled but visually 'on' */}
                        <div className="flex items-center justify-between py-4 opacity-75 cursor-not-allowed">
                            <div className="pr-8">
                                <label className="font-heading uppercase text-sm text-white block flex items-center gap-2">
                                    System Alerts <span className="text-[#1ed760] text-xs border border-[#1ed760] px-1 rounded">// MANDATORY</span>
                                </label>
                                <div className="text-sm text-[#8d8c9e] mt-1">Receive critical security, dispute resolution, and payout alerts.</div>
                            </div>
                             <div className="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent bg-[#1ed760]/50">
                                <span className="inline-block h-5 w-5 transform translate-x-5 rounded-full bg-white shadow ring-0" />
                            </div>
                        </div>

                        <Toggle 
                            checked={emailIntel} 
                            onChange={setEmailIntel} 
                            label={<span className="font-heading uppercase text-sm">Email Intel Updates</span>}
                            description="Receive essential updates on ZAP Score changes and new data reports."
                        />
                         <Toggle 
                            checked={communitySignal} 
                            onChange={setCommunitySignal} 
                            label={<span className="font-heading uppercase text-sm">Community Activity Signal</span>}
                            description="Alerts regarding responses or Veto triggers in your tracked threads."
                        />
                         <Toggle 
                            checked={marketingComm} 
                            onChange={setMarketingComm} 
                            label={<span className="font-heading uppercase text-sm">Marketing Communications</span>}
                            description="Receive exclusive partner bonuses and ZAP event announcements."
                        />
                    </div>
                </Card>

                 {/* 7. DANGER ZONE */}
                 <Card className="p-6 md:p-8 bg-red-950/5 border-red-900/30 relative overflow-hidden">
                    {/* Caution Stripes Background */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-repeating-linear-gradient-45 from-red-900/50 via-red-900/50 to-transparent bg-[length:20px_20px]"></div>
                    
                    <h2 className="font-heading text-xl text-red-500 mb-4 flex items-center gap-3 uppercase tracking-wider mt-4">
                        <Icons.X className="h-6 w-6" /> 7. DANGER ZONE (Decommission)
                    </h2>
                    <p className="text-[#8d8c9e] mb-6 max-w-3xl">
                        WARNING: UNPLUGGING IS PERMANENT. Deleting this account voids all earned SSP rewards and removes your Handle from the Grid. This action cannot be undone.
                    </p>
                    <Button 
                        variant="secondary" 
                        onClick={handleDeleteAccount}
                        className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-red-500/50 font-mono uppercase tracking-widest w-full md:w-auto"
                    >
                        INITIATE SELF-DESTRUCT PROTOCOL
                    </Button>
                </Card>

            </div>
        </div>
    );
};
