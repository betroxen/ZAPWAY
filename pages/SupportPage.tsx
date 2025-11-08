
import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { Icons } from '../components/icons';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';

export const SupportPage = () => {
    const appContext = useContext(AppContext);
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        handle: '',
        email: '',
        userId: '',
        category: 'GENERAL',
        platform: '',
        subject: '',
        priority: 'STANDARD',
        message: '',
        evidenceUrl: '',
        attestData: false,
        attestTc: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.attestData || !formData.attestTc) {
             showToast("TRANSMISSION FAILED: Mandatory attestations required to activate line.", "error");
             return;
        }

        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            showToast("SIGNAL TRANSMITTED. Ticket #9432 created. Expect response within 12h.", "success");
            // Reset critical fields
            setFormData(prev => ({ ...prev, subject: '', message: '', evidenceUrl: '', attestData: false, attestTc: false }));
        }, 2000);
    };

    const inputClassName = "w-full rounded-[4px] border border-[#333] bg-[#1A1A1A] px-3 py-2.5 text-sm text-white placeholder:text-[#666] focus:outline-none focus:ring-1 focus:ring-[#00FFC0] focus:border-[#00FFC0] transition-all font-mono";
    const labelClassName = "block text-xs font-mono uppercase text-[#00FFC0] mb-2";

  return (
    <div className="container mx-auto max-w-6xl p-4 py-10 md:p-12 page-fade-in">
        {/* CONSOLE HEADER */}
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
                <Icons.Activity className="h-8 w-8 text-[#00FFC0] animate-pulse-slow" />
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                    SYSTEM DIAGNOSTIC CONSOLE
                </h1>
            </div>
            <p className="text-[#00FFC0] font-mono text-sm uppercase tracking-widest ml-11">
                // STATUS: CLEAR SIGNAL. YOUR EDGE DEPENDS ON FAST ANSWERS.
            </p>
        </div>

        {/* 1. INTEL CIRCUIT & PROTOCOL ACCESS */}
        <div className="mb-16">
            <h2 className="font-heading text-xl text-white mb-6 uppercase flex items-center gap-2 border-b border-[#333] pb-4">
                <span className="text-[#00FFC0]">01 //</span> INTEL CIRCUIT & PROTOCOL ACCESS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* KB Card */}
                <Card className="p-6 border-[#00FFC0]/20 hover:border-[#00FFC0]/50 group bg-[#0c0c0e]">
                    <Icons.BookOpen className="h-8 w-8 text-[#00FFC0] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading text-lg text-white mb-2">KNOWLEDGE BASE</h3>
                    <p className="text-sm text-[#8d8c9e] mb-6 min-h-[40px]">Raw Data Library. Fastest path to solution. Includes Score Methodology and Operator Q&A.</p>
                    <Button variant="secondary" className="w-full font-mono uppercase text-xs" onClick={() => appContext?.setCurrentPage('Knowledge Base')}>
                        ACCESS INTEL LIBRARY →
                    </Button>
                </Card>
                {/* Safe Play Card */}
                <Card className="p-6 border-blue-500/20 hover:border-blue-500/50 group bg-[#0c0c0e]">
                    <Icons.Shield className="h-8 w-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading text-lg text-white mb-2">RESPONSIBLE GAMING</h3>
                    <p className="text-sm text-[#8d8c9e] mb-6 min-h-[40px]">Safe Play Protocols. Critical tools to maintain control and avoid tilt.</p>
                    <Button variant="secondary" className="w-full font-mono uppercase text-xs hover:border-blue-500" onClick={() => appContext?.setCurrentPage('Responsible Gaming')}>
                        VIEW SAFE PLAY PROTOCOLS →
                    </Button>
                </Card>
                {/* Legal Card */}
                <Card className="p-6 border-purple-500/20 hover:border-purple-500/50 group bg-[#0c0c0e]">
                    <Icons.FileText className="h-8 w-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading text-lg text-white mb-2">LEGAL MANIFESTO</h3>
                    <p className="text-sm text-[#8d8c9e] mb-6 min-h-[40px]">The Contract. Full Terms of Service, Privacy Policy, and Affiliate Disclosures.</p>
                    <Button variant="secondary" className="w-full font-mono uppercase text-xs hover:border-purple-500" onClick={() => appContext?.setCurrentPage('Terms of Service')}>
                        VIEW COMPLIANCE FILES →
                    </Button>
                </Card>
            </div>
        </div>

        {/* 2. DIRECT COMMUNICATION: LINE ACTIVATION TERMINAL */}
        <div id="ticket-system">
             <h2 className="font-heading text-xl text-white mb-6 uppercase flex items-center gap-2 border-b border-[#333] pb-4">
                <span className="text-[#00FFC0]">02 //</span> DIRECT COMMUNICATION: LINE ACTIVATION
            </h2>

            <Card className="p-0 overflow-hidden border-[#333] bg-[#0A0A0A] shadow-2xl">
                <div className="bg-[#0c0c0e] p-4 border-b border-[#333] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="h-3 w-3 rounded-full bg-[#00FFC0] animate-pulse shadow-[0_0_8px_#00FFC0]"></div>
                         <span className="font-mono text-sm text-[#00FFC0] uppercase tracking-widest">
                            SIGNAL STATUS: READY TO TRANSMIT
                        </span>
                    </div>
                </div>
                
                <div className="p-6 md:p-10">
                    <p className="text-[#8d8c9e] mb-10 border-l-2 border-[#00FFC0] pl-4 py-2 bg-[#00FFC0]/5 font-mono text-sm">
                        <strong className="text-[#00FFC0] font-heading uppercase">MISSION DIRECTIVE:</strong> Transmit Clear Signal. Our team prioritizes verified data. We move fastest when information is complete.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Group 1: Sender Intel */}
                        <div>
                            <h3 className="text-white font-heading uppercase text-sm mb-6 flex items-center gap-2">
                                <Icons.Users className="h-4 w-4 text-[#8d8c9e]" /> 1. SENDER'S INTEL (The Source)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={labelClassName}>Your Handle (Alias) *</label>
                                    <Input name="handle" required placeholder="e.g. TheDataWrangler" value={formData.handle} onChange={handleInputChange} className="font-mono" />
                                </div>
                                <div>
                                    <label className={labelClassName}>Verified Email *</label>
                                    <Input name="email" type="email" required placeholder="Best contact channel" value={formData.email} onChange={handleInputChange} className="font-mono" />
                                </div>
                                 <div>
                                    <label className={labelClassName}>ZAP User ID</label>
                                    <Input name="userId" placeholder="Optional (Account issues)" value={formData.userId} onChange={handleInputChange} className="font-mono" />
                                </div>
                            </div>
                        </div>

                        {/* Group 2: The Signal */}
                         <div>
                            <h3 className="text-white font-heading uppercase text-sm mb-6 flex items-center gap-2">
                                <Icons.Activity className="h-4 w-4 text-[#8d8c9e]" /> 2. THE SIGNAL (Core Issue)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                 <div>
                                    <label className={labelClassName}>Category *</label>
                                    <select name="category" className={inputClassName} value={formData.category} onChange={handleInputChange}>
                                        <option value="DATA">DATA/RTP AUDIT</option>
                                        <option value="ACCOUNT">ACCOUNT/REWARDS</option>
                                        <option value="VETTING">OPERATOR VETTING</option>
                                        <option value="PARTNER">PARTNERSHIP QUERY</option>
                                        <option value="GENERAL">GENERAL INQUIRY</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClassName}>Priority *</label>
                                    <select name="priority" className={`${inputClassName} font-bold ${formData.priority === 'CRITICAL' ? 'text-red-500 !border-red-900 !bg-red-950/30' : formData.priority === 'ELEVATED' ? 'text-yellow-500' : 'text-[#8d8c9e]'}`} value={formData.priority} onChange={handleInputChange}>
                                        <option value="STANDARD">STANDARD (General Queue)</option>
                                        <option value="ELEVATED">ELEVATED (Time-Sensitive)</option>
                                        <option value="CRITICAL">CRITICAL (Security/Loss)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div>
                                    <label className={labelClassName}>Operator Name</label>
                                    <Input name="platform" placeholder="If applicable" value={formData.platform} onChange={handleInputChange} className="font-mono" />
                                </div>
                                 <div className="md:col-span-2">
                                    <label className={labelClassName}>Subject (Mission Summary) *</label>
                                    <Input name="subject" required placeholder="BRIEF SUMMARY OF ISSUE..." value={formData.subject} onChange={handleInputChange} className="font-mono" />
                                </div>
                            </div>
                        </div>

                        {/* Group 3: Raw Data Contract */}
                        <div>
                            <h3 className="text-white font-heading uppercase text-sm mb-6 flex items-center gap-2">
                                <Icons.Database className="h-4 w-4 text-[#8d8c9e]" /> 3. THE RAW DATA CONTRACT (Verification)
                            </h3>
                            <div className="space-y-6">
                                 <div>
                                    <label className={labelClassName}>Detailed Report (Min 5 lines) *</label>
                                    <textarea 
                                        name="message"
                                        required
                                        rows={6}
                                        className={`${inputClassName} resize-none`}
                                        placeholder="> INITIATE REPORT SEQUENCE...&#10;> STATE FACTS: WHAT, WHEN, EXPECTED OUTCOME.&#10;> NO THEORIES. JUST DATA."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                 <div>
                                    <label className={labelClassName}>Evidence URL (Recommended)</label>
                                    <div className="relative">
                                        <Icons.Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
                                        <Input name="evidenceUrl" type="url" placeholder="HTTPS://..." value={formData.evidenceUrl} onChange={handleInputChange} className="font-mono pl-10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Group 4: Attestation */}
                         <div className="bg-[#0c0c0e] p-6 rounded-lg border border-[#333]">
                            <h3 className="text-[#00FFC0] font-heading uppercase text-sm mb-4 flex items-center gap-2">
                                <Icons.Lock className="h-4 w-4" /> 4. DATA ATTESTATION (MANDATORY CHECKPOINT)
                            </h3>
                            <div className="space-y-4">
                                <Toggle 
                                    checked={formData.attestData} 
                                    onChange={(val) => setFormData(prev => ({...prev, attestData: val}))}
                                    label={<span className="font-heading uppercase text-sm text-white">DATA INTEGRITY CONFIRMATION</span>}
                                    description={<span className="font-mono text-xs">I confirm this report contains raw, un-fictionalized data. I have not manipulated evidence.</span>}
                                />
                                <div className="h-px bg-[#333] w-full"></div>
                                <Toggle 
                                    checked={formData.attestTc} 
                                    onChange={(val) => setFormData(prev => ({...prev, attestTc: val}))}
                                    label={<span className="font-heading uppercase text-sm text-white">T&C CONTRACT ACCEPTANCE</span>}
                                    description={<span className="font-mono text-xs">I accept the ZAP Terms of Service and understand my use of this system is governed by them.</span>}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <Button 
                                type="submit" 
                                size="lg" 
                                className="w-full font-heading uppercase tracking-[0.2em] text-base py-6 shadow-[0_0_40px_rgba(0,255,192,0.2)] hover:shadow-[0_0_60px_rgba(0,255,192,0.4)] transition-all duration-300"
                                loading={isLoading}
                                disabled={!formData.attestData || !formData.attestTc}
                            >
                                {isLoading ? 'TRANSMITTING SIGNAL...' : 'ACTIVATE SUPPORT LINE & TRANSMIT'}
                            </Button>
                            <p className="text-center font-mono text-xs text-[#666] mt-4">
                                NOTE: Misuse of CRITICAL priority will result in queue deprioritization.
                            </p>
                        </div>

                    </form>
                </div>
            </Card>
        </div>
    </div>
  );
};
