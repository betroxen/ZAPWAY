
import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';
import { ToastContext } from '../context/ToastContext';

export const SettingsPage = () => {
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };
    const [activeCircuit, setActiveCircuit] = useState('profile');
    const [isSyncing, setIsSyncing] = useState(false);

    // Circuit State
    const [mfaActive, setMfaActive] = useState(true);
    const [anonymizedAnalytics, setAnonymizedAnalytics] = useState(true);
    const [affiliateTracking, setAffiliateTracking] = useState(true);
    const [contributionDisplay, setContributionDisplay] = useState(true);
    const [walletAddress, setWalletAddress] = useState('');
    const [aestheticMode, setAestheticMode] = useState<'dark' | 'light'>('dark');
    const [dataViewFormat, setDataViewFormat] = useState<'decimal' | 'percentage'>('percentage');
    const [showBalance, setShowBalance] = useState(true);
    const [compactMode, setCompactMode] = useState(false);
    const [autoPlayVideos, setAutoPlayVideos] = useState(false);
    const [emailIntel, setEmailIntel] = useState(true);
    const [communitySignal, setCommunitySignal] = useState(true);
    const [marketingComm, setMarketingComm] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            showToast("CIRCUIT SYNCED: Configuration updated on the Grid.", "success");
        }, 1500);
    };

    const CIRCUITS = [
        { id: 'profile', label: '1. PROFILE BLUEPRINT', icon: Icons.Users },
        { id: 'security', label: '2. SECURITY CIRCUIT', icon: Icons.Shield },
        { id: 'privacy', label: '3. PRIVACY & DATA', icon: Icons.Database },
        { id: 'ssp', label: '4. SSP PAYOUTS', icon: Icons.Gift },
        { id: 'prefs', label: '5. USER PREFERENCES', icon: Icons.LayoutDashboard },
        { id: 'intel', label: '6. INTEL COMM', icon: Icons.Mail },
        { id: 'danger', label: '7. DANGER ZONE', icon: Icons.AlertTriangle, danger: true },
    ];

    return (
        <div className="container mx-auto max-w-7xl h-[calc(100vh-8rem)] p-4 md:p-8 page-fade-in flex flex-col">
            {/* CONSOLE HEADER */}
            <div className="mb-6 flex-shrink-0">
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                    <Icons.Settings className="h-8 w-8 text-[#00FFC0] animate-spin-slow" />
                    COMMAND CONSOLE
                </h1>
                <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest mt-1 ml-11 text-glow">
                    // CONFIGURATION V2.0 // STATUS: OPERATIONAL
                </p>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                
                {/* LEFT PANEL: NAVIGATION SIDEBAR */}
                <div className="w-full lg:w-64 flex-shrink-0 bg-[#0A0A0A] border border-[#333333] rounded-lg overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible custom-scrollbar">
                    {CIRCUITS.map(circuit => (
                        <button
                            key={circuit.id}
                            onClick={() => setActiveCircuit(circuit.id)}
                            className={`flex items-center gap-3 p-4 text-sm font-heading uppercase tracking-wider transition-all whitespace-nowrap lg:whitespace-normal group
                                ${activeCircuit === circuit.id 
                                    ? 'bg-[#222222] text-white border-b-2 lg:border-b-0 lg:border-l-[3px] border-[#00FFC0]' 
                                    : 'bg-[#1A1A1A] text-[#8d8c9e] hover:bg-[#222222] border-b-2 lg:border-b-0 lg:border-l-[3px] border-transparent'}
                                ${circuit.danger && activeCircuit !== circuit.id ? 'text-red-900 hover:text-red-500' : ''}
                                ${circuit.danger && activeCircuit === circuit.id ? '!border-red-500 !text-red-500' : ''}
                            `}
                        >
                            <circuit.icon className={`h-5 w-5 flex-shrink-0 ${activeCircuit === circuit.id ? (circuit.danger ? 'text-red-500' : 'text-[#00FFC0]') : 'opacity-50'}`} />
                            <span className={activeCircuit !== circuit.id && !circuit.danger ? 'group-hover:text-[#00FFC0] group-hover:text-glow transition-all duration-150' : ''}>
                                {circuit.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* RIGHT PANEL: CONTENT AREA */}
                <Card className="flex-1 bg-[#121212] border-[#333333] overflow-y-auto custom-scrollbar p-6 md:p-8 relative">
                    
                    {/* 1. PROFILE BLUEPRINT */}
                    {activeCircuit === 'profile' && (
                        <div key="profile" className="animate-tabSlideIn space-y-8">
                            <h2 className="font-heading text-2xl text-white uppercase border-b border-[#333333] pb-4 flex items-center gap-3">
                                <Icons.Users className="h-6 w-6 text-[#00FFC0]" /> Profile Blueprint
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Handle (Alias)</label>
                                    <Input value="DegenGambler" readOnly className="font-mono bg-[#0A0A0A] !border-[#333333] text-[#00FFC0] cursor-not-allowed opacity-80" />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-2">Access Email</label>
                                    <div className="flex gap-3">
                                        <Input type="email" value="op@zap.gg" readOnly className="font-mono bg-[#0A0A0A] !border-[#333333]" />
                                        <Button variant="secondary" size="sm" className="shrink-0 font-mono uppercase">REQ CHANGE</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-[#333333] flex justify-end">
                                <Button onClick={handleSync} disabled={isSyncing} className="w-full md:w-auto min-w-[200px] font-heading uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,192,0.2)]">
                                    {isSyncing ? <><Icons.Loader className="h-5 w-5 mr-2" /> SYNCING...</> : 'SYNCHRONIZE CHANGES'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* 2. SECURITY CIRCUIT */}
                    {activeCircuit === 'security' && (
                        <div key="security" className="animate-tabSlideIn space-y-8">
                            <h2 className="font-heading text-2xl text-white uppercase border-b border-[#333333] pb-4 flex items-center gap-3">
                                <Icons.Shield className="h-6 w-6 text-[#00FFC0]" /> Security Circuit
                            </h2>
                            <div className="bg-[#1A1A1A] p-5 rounded border border-[#333333] flex justify-between items-center">
                                <div>
                                    <h3 className="font-heading text-white uppercase mb-1">Password Protocol</h3>
                                    <p className="font-mono text-xs text-[#8d8c9e]">
                                        LAST UPDATE: <span className="text-[#00FFC0] font-bold">42</span> DAYS AGO. STATUS: <span className="text-[#00FFC0] text-glow">PROTECTED</span>.
                                    </p>
                                </div>
                                <Button variant="secondary" size="sm" className="font-mono uppercase">ROTATE KEY</Button>
                            </div>
                            <div className="bg-[#1A1A1A] p-5 rounded border border-[#333333]">
                                <div className="flex justify-between items-center mb-4">
                                     <div>
                                        <h3 className="font-heading text-white uppercase mb-1">MFA Lock</h3>
                                        <p className="text-xs text-[#8d8c9e]">Two-factor authentication for critical actions.</p>
                                    </div>
                                    <Toggle checked={mfaActive} onChange={setMfaActive} />
                                </div>
                                {!mfaActive && (
                                    <div className="flex items-center gap-2 text-red-500 font-mono text-xs bg-red-950/30 p-3 rounded border border-red-900/50 animate-pulse">
                                        <Icons.AlertTriangle className="h-4 w-4" /> WARNING: CIRCUIT VULNERABLE. ENGAGE MFA.
                                    </div>
                                )}
                            </div>
                             <div className="flex justify-between items-center p-4 bg-[#0A0A0A] rounded border border-[#333]">
                                <span className="text-[#8d8c9e] font-heading uppercase text-sm">Active Session Logs</span>
                                <div className="flex items-center gap-2">
                                     <span className="relative flex h-2.5 w-2.5 mr-1">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FFC0]"></span>
                                    </span>
                                    <span className="font-mono text-[#00FFC0] text-sm">1 ACTIVE</span>
                                </div>
                             </div>
                        </div>
                    )}

                    {/* 3. PRIVACY */}
                    {activeCircuit === 'privacy' && (
                        <div key="privacy" className="animate-tabSlideIn space-y-8">
                            <h2 className="font-heading text-2xl text-white uppercase border-b border-[#333333] pb-4 flex items-center gap-3">
                                <Icons.Database className="h-6 w-6 text-[#00FFC0]" /> Privacy & Data
                            </h2>
                            <div className="divide-y divide-[#333333]">
                                <Toggle checked={anonymizedAnalytics} onChange={setAnonymizedAnalytics} label="Anonymized Analytics" description="Contribute non-identifying data for platform optimization." />
                                <Toggle checked={affiliateTracking} onChange={setAffiliateTracking} label="External Tracking" description="Allow non-essential external affiliate cookies." />
                                <Toggle checked={contributionDisplay} onChange={setContributionDisplay} label="Public Handle" description="Display your alias on public leaderboards and reports." />
                            </div>
                            <div className="pt-4 flex justify-end">
                                 <Button variant="ghost" className="text-[#00FFC0] hover:text-[#00FFC0] hover:bg-[#00FFC0]/10 font-mono uppercase text-xs">
                                    <Icons.FileText className="h-4 w-4 mr-2" /> REQUEST DATA ARCHIVE
                                </Button>
                            </div>
                        </div>
                    )}

                     {/* 4. SSP PAYOUTS */}
                     {activeCircuit === 'ssp' && (
                        <div key="ssp" className="animate-tabSlideIn space-y-8">
                            <h2 className="font-heading text-2xl text-white uppercase border-b border-[#333333] pb-4 flex items-center gap-3">
                                <Icons.Gift className="h-6 w-6 text-[#00FFC0]" /> SSP Protocol Payouts
                            </h2>
                            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333333]">
                                <label className="block text-xs font-mono text-[#00FFC0] uppercase mb-3 flex items-center gap-2">
                                    Reward Wallet Address (ERC-20 / SOL)
                                    {!walletAddress && <Icons.AlertTriangle className="h-4 w-4 text-[#00FFC0] animate-pulse" />}
                                </label>
                                <div className="flex gap-4 mb-4">
                                    <Input 
                                        value={walletAddress} 
                                        onChange={(e) => setWalletAddress(e.target.value)} 
                                        placeholder="0x..."
                                        className="font-mono text-lg bg-black !border-[#00FFC0]/50 focus:!border-[#00FFC0] text-white tracking-wider h-12" 
                                    />
                                    <Button onClick={handleSync} className="shrink-0 px-6 font-heading uppercase">UPDATE</Button>
                                </div>
                                <p className="text-xs text-[#00FFC0] font-mono flex items-start gap-2 bg-[#00FFC0]/10 p-3 rounded border border-[#00FFC0]/20">
                                    <Icons.Info className="h-4 w-4 flex-shrink-0 mt-0.5" /> 
                                    <span>CRITICAL: Double-check your address. Lost payouts cannot be recovered once transmitted to the blockchain.</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 5. PREFERENCES */}
                    {activeCircuit === 'prefs' && (
                        <div key="prefs" className="animate-tabSlideIn space-y-8">
                             <h2 className="font-heading text-2xl text-white uppercase border-b border-[#333333] pb-4 flex items-center gap-3">
                                <Icons.LayoutDashboard className="h-6 w-6 text-[#00FFC0]" /> User Preferences
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Visual Ops Mode</label>
                                    <div className="flex gap-2 bg-[#0A0A0A] p-1.5 rounded-md border border-[#333333]">
                                        <button onClick={() => setAestheticMode('dark')} className={`flex-1 py-3 text-sm font-heading uppercase transition-all rounded-sm ${aestheticMode === 'dark' ? 'bg-[#222] text-[#00FFC0] font-bold shadow-sm' : 'text-[#8d8c9e] hover:text-white'}`}>Dark Ops</button>
                                        <button onClick={() => setAestheticMode('light')} className={`flex-1 py-3 text-sm font-heading uppercase transition-all rounded-sm ${aestheticMode === 'light' ? 'bg-white text-black font-bold' : 'text-[#8d8c9e] hover:text-white'}`}>Light</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-[#8d8c9e] uppercase mb-3">Data Format</label>
                                    <div className="flex gap-2 bg-[#0A0A0A] p-1.5 rounded-md border border-[#333333]">
                                        <button onClick={() => setDataViewFormat('percentage')} className={`flex-1 py-3 text-sm font-mono transition-all rounded-sm ${dataViewFormat === 'percentage' ? 'bg-[#00FFC0]/20 text-[#00FFC0] font-bold border border-[#00FFC0]/30' : 'text-[#8d8c9e] hover:text-white'}`}>96.5%</button>
                                        <button onClick={() => setDataViewFormat('decimal')} className={`flex-1 py-3 text-sm font-mono transition-all rounded-sm ${dataViewFormat === 'decimal' ? 'bg-[#00FFC0]/20 text-[#00FFC0] font-bold border border-[#00FFC0]/30' : 'text-[#8d8c9e] hover:text-white'}`}>0.965</button>
                                    </div>
                                </div>
                            </div>
                            <div className="divide-y divide-[#333333] border-t border-[#333333] pt-4">
                                <Toggle checked={showBalance} onChange={setShowBalance} label="Header Balance Display" />
                                <Toggle checked={compactMode} onChange={setCompactMode} label="Compact Mode" />
                                <Toggle checked={autoPlayVideos} onChange={setAutoPlayVideos} label="Autoplay Media" />
                            </div>
                        </div>
                    )}

                    {/* 6. INTEL COMM */}
                    {activeCircuit === 'intel' && (
                         <div key="intel" className="animate-tabSlideIn space-y-8">
                            <h2 className="font-heading text-2xl text-white uppercase border-b border-[#333333] pb-4 flex items-center gap-3">
                                <Icons.Mail className="h-6 w-6 text-[#00FFC0]" /> Intel Comm Channel
                            </h2>
                            <div className="divide-y divide-[#333333]">
                                <div className="flex items-center justify-between py-4 opacity-60 cursor-not-allowed bg-[#0A0A0A] px-4 -mx-4 rounded-md border border-transparent mb-2">
                                    <div>
                                        <label className="font-heading uppercase text-sm text-white flex items-center gap-2">
                                            System Critical Alerts <span className="text-[#00FFC0] font-mono text-[10px] border border-[#00FFC0] px-1.5 py-0.5 rounded">// MANDATORY</span>
                                        </label>
                                        <div className="text-xs text-[#8d8c9e] mt-1 font-mono">Security, Payouts, and Account Status.</div>
                                    </div>
                                    <div className="w-11 h-6 bg-[#00FFC0]/20 rounded-full relative flex items-center justify-end p-1 border border-[#00FFC0]/30">
                                        <div className="w-4 h-4 bg-[#00FFC0] rounded-full shadow-[0_0_10px_#00FFC0]"></div>
                                    </div>
                                </div>
                                <Toggle checked={emailIntel} onChange={setEmailIntel} label="Email Intel Briefs" description="ZAP Score changes and new VPR reports." />
                                <Toggle checked={communitySignal} onChange={setCommunitySignal} label="Community Signal" description="Replies and Veto triggers on your threads." />
                                <Toggle checked={marketingComm} onChange={setMarketingComm} label="Partner Transmissions" description="Exclusive bonuses and event invites." />
                            </div>
                        </div>
                    )}

                    {/* 7. DANGER ZONE */}
                    {activeCircuit === 'danger' && (
                        <div key="danger" className="animate-tabSlideIn space-y-8">
                             <h2 className="font-heading text-2xl text-red-500 uppercase border-b border-red-900/30 pb-4 flex items-center gap-3">
                                <Icons.AlertTriangle className="h-6 w-6" /> Danger Zone
                            </h2>
                            <div className="border-2 border-red-500/50 p-6 rounded-lg bg-red-950/10 relative overflow-hidden">
                                {/* Caution stripes background */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{backgroundImage: 'repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, transparent 10px, transparent 20px)'}}></div>
                                
                                <div className="relative z-10">
                                    <h3 className="font-heading text-lg text-white uppercase mb-4">Decommission Account</h3>
                                    <p className="text-[#8d8c9e] mb-8 max-w-2xl leading-relaxed">
                                        WARNING: This action is permanent. It will void all unwithdrawn SSP rewards, delete your VPR history, and remove your Handle from the Grid.
                                    </p>
                                    <Button 
                                        variant="secondary" 
                                        className="bg-[#1A1A1A] text-red-500 !border-red-500 hover:bg-red-600 hover:text-white font-heading uppercase tracking-widest w-full md:w-auto transition-colors duration-300"
                                        onClick={() => { if(window.confirm('CONFIRM FINAL DECOMMISSION?')) showToast("SELF-DESTRUCT SEQUENCE INITIATED.", "error"); }}
                                    >
                                        INITIATE SELF-DESTRUCT PROTOCOL
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                </Card>
            </div>
        </div>
    );
};
