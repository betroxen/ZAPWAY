import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../components/icons';
import { ZapLogo } from '../components/ZapLogo';

const FOOTER_LINKS = {
    INTEL: [
        { title: 'Dashboard HQ', path: '/dashboard' },
        { title: 'Operator Grid', path: '/casinos' },
        { title: 'Active Bounties', path: '/bonus-offers' },
        { title: 'Live RTP Feed', path: '/rtp-tracker' },
    ],
    PROTOCOLS: [
        { title: 'Mission Brief', path: '/about-us' },
        { title: 'Scoring Algo', path: '/review-methodology' },
        { title: 'Fairness Audit', path: '/provably-fair' },
        { title: 'Safety Limits', path: '/responsible-gaming' },
        { title: 'Help Channel', path: '/support' },
    ],
    COMPLIANCE: [
        { title: 'Terms of Engagement', path: '/terms-of-service' },
        { title: 'Data Privacy', path: '/privacy-policy' },
        { title: 'Commercial Intel', path: '/commercial-disclosure' },
        { title: 'Vetting Standards', path: '/partner-vetting' },
    ],
};

export const Footer = () => {
    // FIX: Typed FooterLink as React.FC to handle key and children props correctly.
    const FooterLink: React.FC<{ path: string }> = ({ path, children }) => (
        <li>
            <NavLink 
                to={path} 
                className="group flex items-center gap-2 text-[#8d8c9e] hover:text-[#00FFC0] transition-all duration-200 ease-out hover:translate-x-2 py-1.5 text-sm font-medium text-left"
            >
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#00FFC0] font-mono font-bold leading-none">{'>'}</span>
                <span className="group-hover:drop-shadow-[0_0_8px_rgba(0,255,192,0.8)] transition-all duration-300">{children}</span>
            </NavLink>
        </li>
    );
  
  return (
    <footer className="relative bg-[#000000] pt-20 pb-10 overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#333]">
          <div className="absolute inset-0 bg-[#00FFC0] opacity-50 blur-[2px] animate-pulse-glow"></div>
          <div className="absolute top-0 left-0 h-[1px] w-1/3 bg-gradient-to-r from-transparent via-[#00FFC0] to-transparent animate-[scanline_6s_linear_infinite] opacity-70"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5 space-y-8">
            <NavLink to="/dashboard" className="flex items-center gap-4 group">
              <ZapLogo />
              <div className="text-left">
                  <span className="font-heading text-3xl font-bold text-white tracking-wider block leading-none group-hover:text-glow transition-all duration-300">ZAP</span>
                  <span className="text-[10px] text-[#00FFC0] font-mono uppercase tracking-[0.4em] opacity-80 group-hover:opacity-100 transition-opacity">COMMAND CENTER</span>
              </div>
            </NavLink>

            <p className="text-[#8d8c9e] text-base leading-relaxed max-w-md font-medium border-l-2 border-[#333] pl-4 hover:border-[#00FFC0] transition-colors duration-300 cursor-default">
              The decentralized intelligence layer for unbiased betting protocols. Arming operators with raw data, ironclad security audits, and unfiltered community signals to seize the edge.
            </p>
            
            <div className="inline-flex items-center gap-4 px-4 py-2 bg-[#0A0A0A] rounded-md border border-[#333] cursor-help group hover:border-[#00FFC0]/50 transition-colors" title="All systems nominal. Data feeds active.">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFC0] shadow-[0_0_10px_#00FFC0]"></span>
                </div>
                <span className="text-xs font-mono text-[#8d8c9e] group-hover:text-[#00FFC0] tracking-widest font-bold transition-colors">
                    GRID STATUS: <span className="text-[#00FFC0] text-glow">OPTIMAL</span>
                </span>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-10 items-start">
              <div>
                <h3 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                    <Icons.Database className="h-3 w-3 text-[#00FFC0]" /> INTEL CORE
                </h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.INTEL.map(link => <FooterLink key={link.path} path={link.path}>{link.title}</FooterLink>)}
                </ul>
              </div>

              <div>
                <h3 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                    <Icons.BookOpen className="h-3 w-3 text-[#00FFC0]" /> PROTOCOLS
                </h3>
                <ul className="space-y-3">
                    {FOOTER_LINKS.PROTOCOLS.map(link => <FooterLink key={link.path} path={link.path}>{link.title}</FooterLink>)}
                </ul>
              </div>

              <div>
                <h3 className="font-mono font-bold text-white mb-6 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                    <Icons.Shield className="h-3 w-3 text-[#00FFC0]" /> COMPLIANCE
                </h3>
                <ul className="space-y-3">
                    {FOOTER_LINKS.COMPLIANCE.map(link => <FooterLink key={link.path} path={link.path}>{link.title}</FooterLink>)}
                </ul>
              </div>
          </div>
        </div>

        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center">
                 <p className="text-[10px] text-[#666] font-mono uppercase tracking-widest group hover:text-white transition-colors duration-300 cursor-default">
                    © 2025 ZAPWAY CORP. <span className="text-[#333] mx-2 group-hover:text-[#00FFC0] transition-colors duration-300">|</span> SYSTEM V5.5.0
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-[#666] hover:text-[#00FFC0] transition-colors hover:scale-110 transform duration-200"><Icons.MessageSquare className="h-5 w-5" /></a>
                    <a href="#" className="text-[#666] hover:text-[#00FFC0] transition-colors hover:scale-110 transform duration-200"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                    <a href="#" className="text-[#666] hover:text-[#00FFC0] transition-colors hover:scale-110 transform duration-200"><Icons.Github className="h-5 w-5" /></a>
                </div>
            </div>
             <p className="text-[10px] text-[#444] font-mono uppercase max-w-md text-left md:text-right leading-relaxed group hover:text-[#8d8c9e] transition-colors duration-300 cursor-default">
                <span className="text-[#00FFC0] group-hover:text-glow transition-all duration-300">// ADVISORY:</span> ZAP is an intelligence platform. We do not process wagers. Access restricted to authorized personnel aged 18+.
            </p>
        </div>
      </div>
    </footer>
  );
};