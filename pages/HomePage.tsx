
import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';

interface HomePageProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenLogin, onOpenRegister, isLoggedIn }) => {
  const [headlineText, setHeadlineText] = useState('');
  const fullHeadline = "WE'RE NOT A CASINO. WE'RE A REVOLUTION.";

  useEffect(() => {
      let i = 0;
      const typing = setInterval(() => {
          setHeadlineText(fullHeadline.substring(0, i + 1));
          i++;
          if (i === fullHeadline.length) clearInterval(typing);
      }, 50);
      return () => clearInterval(typing);
  }, []);

  // Simple scroll reveal hook alternative for simplicity in this context
  const useScrollReveal = (threshold = 0.1) => {
      const [isRevealed, setIsRevealed] = useState(false);
      const ref = React.useRef<HTMLDivElement>(null);
      useEffect(() => {
          const observer = new IntersectionObserver(([entry]) => {
              if (entry.isIntersecting) { setIsRevealed(true); observer.disconnect(); }
          }, { threshold });
          if (ref.current) observer.observe(ref.current);
          return () => observer.disconnect();
      }, [threshold]);
      return { ref, isRevealed };
  };

  const module2 = useScrollReveal(0.2);
  const module3 = useScrollReveal(0.1);

  return (
    <div className="bg-[#121212] text-[#FAFBFF]">
      
      {/* === MODULE I: THE CORE MANIFESTO (HERO) === */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
          {/* Kinetic Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FFC0]/10 border border-[#00FFC0]/20 mb-4 animate-fadeIn">
                  <div className="w-2 h-2 rounded-full bg-[#00FFC0] animate-pulse"></div>
                  <span className="text-xs font-mono text-[#00FFC0] uppercase tracking-widest">Incoming Transmission</span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight min-h-[80px] md:min-h-[144px]">
                  <span className="text-white">{headlineText}</span>
                  <span className="animate-pulse text-[#00FFC0]">_</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-[#8d8c9e] max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{animationDelay: '1.5s'}}>
                  Your gateway to a smarter, fairer crypto gambling ecosystem. 
                  <span className="text-white block mt-2">Built by degens, verified by data, powered by you.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-fadeIn" style={{animationDelay: '2s'}}>
                  <Button 
                    size="lg" 
                    onClick={onOpenRegister} 
                    className="w-full sm:w-auto text-lg px-12 py-6 shadow-[0_0_40px_rgba(0,255,192,0.3)] animate-pulse-glow"
                  >
                      JOIN THE CIRCUIT
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    onClick={onOpenLogin} 
                    className="w-full sm:w-auto text-[#8d8c9e] hover:text-white font-heading uppercase tracking-widest"
                  >
                      // ACCESS TERMINAL
                  </Button>
              </div>
          </div>
      </section>

      {/* === MODULE II: THE VETTING CONTRACT (GRID RECON) === */}
      <section ref={module2.ref} className={`py-24 px-4 bg-[#0A0A0A] border-t border-[#333333] transition-all duration-1000 transform ${module2.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase mb-4">
                      <Icons.Target className="inline-block h-8 w-8 text-[#00FFC0] mb-1 mr-3" />
                      GRID RECON: THE ZAP FIX
                  </h2>
                  <p className="text-[#8d8c9e] text-lg max-w-2xl mx-auto">
                      The old way is broken. Opaque terms, fake reviews, and rigged RTPs. We built the data engine to fix it.
                  </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* THE COMPARISON */}
                  <Card className="p-0 overflow-hidden border-[#333333]">
                      <div className="grid grid-cols-2 divide-x divide-[#333333] bg-[#14131c] border-b border-[#333333]">
                          <div className="p-4 text-center font-heading uppercase text-[#8d8c9e]">The Old Way</div>
                          <div className="p-4 text-center font-heading uppercase text-white bg-[#00FFC0]/5">The ZAP Circuit</div>
                      </div>
                      <div className="divide-y divide-[#333333]">
                          {[
                              { old: "Hidden RTPs & Fees", new: "Verified On-Chain Data" },
                              { old: "Paid Fake Reviews", new: "Community Veto Power" },
                              { old: "Impossible Bonuses", new: "True Cost Calculator" },
                              { old: "Zero Accountability", new: "Real-Time VPR Tracking" },
                          ].map((item, i) => (
                              <div key={i} className="grid grid-cols-2 divide-x divide-[#333333]">
                                  <div className="p-6 text-[#8d8c9e] flex items-center gap-3">
                                      <Icons.X className="h-5 w-5 text-red-500 shrink-0" /> {item.old}
                                  </div>
                                  <div className="p-6 text-white font-bold flex items-center gap-3 bg-[#00FFC0]/5">
                                      <Icons.CheckCircle className="h-5 w-5 text-[#00FFC0] shrink-0" /> {item.new}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </Card>

                  {/* SAMPLE INTEL CARDS */}
                  <div className="space-y-6">
                      <div className="font-mono text-xs text-[#00FFC0] uppercase mb-4">// INCOMING SAMPLE DATA STREAM...</div>
                      
                      <Card className="p-5 flex items-center gap-5 bg-[#121212]">
                          <div className="h-14 w-14 rounded-md bg-[#222] flex items-center justify-center border border-[#333]">
                              <Icons.Zap className="h-6 w-6 text-[#00FFC0]" />
                          </div>
                          <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-heading text-lg text-white">STAKE.COM</h3>
                                  <span className="px-2 py-0.5 bg-[#00FFC0] text-black text-xs font-bold rounded-sm">9.8 ZAP SCORE</span>
                              </div>
                              <div className="flex gap-4 text-xs font-mono text-[#8d8c9e]">
                                  <span>RTP: <span className="text-white">98.5%</span></span>
                                  <span>PAYOUT: <span className="text-white">~5 MINS</span></span>
                              </div>
                          </div>
                      </Card>

                       <Card className="p-5 flex items-center gap-5 bg-[#121212] opacity-60">
                          <div className="h-14 w-14 rounded-md bg-[#222] flex items-center justify-center border border-[#333]">
                              <Icons.AlertTriangle className="h-6 w-6 text-red-500" />
                          </div>
                          <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-heading text-lg text-[#8d8c9e] line-through">SHADY.BET</h3>
                                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-sm">DELISTED</span>
                              </div>
                              <div className="text-xs font-mono text-red-400">
                                  // VETOED BY COMMUNITY: FAILED PAYOUT AUDIT
                              </div>
                          </div>
                      </Card>
                  </div>
              </div>
          </div>
      </section>

      {/* === MODULE III: INTEGRITY BACKSTOP (MANIFESTO + FAQ) === */}
      <section ref={module3.ref} className={`py-24 px-4 transition-all duration-1000 transform ${module3.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="max-w-4xl mx-auto">
              
              {/* ARCHITECTURE PILLARS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                  <div className="text-center p-6 border border-[#333333] rounded-xl bg-[#14131c] hover:border-[#00FFC0]/30 transition-all group">
                      <Icons.Shield className="h-10 w-10 text-[#00FFC0] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-heading text-lg text-white uppercase mb-2">1. Vetting</h3>
                      <p className="text-[#8d8c9e] text-sm">We audit licenses, RNG certs, and ownership before they touch the Grid.</p>
                  </div>
                  <div className="text-center p-6 border border-[#333333] rounded-xl bg-[#14131c] hover:border-[#00FFC0]/30 transition-all group">
                      <Icons.Database className="h-10 w-10 text-[#00FFC0] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-heading text-lg text-white uppercase mb-2">2. Verification</h3>
                      <p className="text-[#8d8c9e] text-sm">Real-time RTP tracking and fee analysis. We check the math so you don't have to.</p>
                  </div>
                  <div className="text-center p-6 border border-[#333333] rounded-xl bg-[#14131c] hover:border-[#00FFC0]/30 transition-all group">
                       <Icons.Users className="h-10 w-10 text-[#00FFC0] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-heading text-lg text-white uppercase mb-2">3. Veto Power</h3>
                      <p className="text-[#8d8c9e] text-sm">If the community flags it, we investigate. You have the final kill switch.</p>
                  </div>
              </div>

              {/* FAQ TEASER */}
              <div className="mb-16">
                  <h2 className="font-heading text-2xl text-white uppercase mb-8 text-center">Intel Briefing</h2>
                  <Accordion multiple={false} defaultOpen={["item-0"]}>
                      <AccordionItem value="item-0">
                          <AccordionTrigger><span className="font-bold">Is ZAP a casino?</span></AccordionTrigger>
                          <AccordionContent>Negative. We are the decentralized intelligence layer for crypto gambling. We don't take bets; we provide the data to help you make smarter ones.</AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-1">
                          <AccordionTrigger><span className="font-bold">How do I earn by participating?</span></AccordionTrigger>
                          <AccordionContent>Through the Shared Success Protocol (SSP). Contribute valid data, write VPRs, and complete missions to earn Zap Points, redeemable for real value.</AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                          <AccordionTrigger><span className="font-bold">Can operators buy a better rating?</span></AccordionTrigger>
                          <AccordionContent>Never. Our reputation is our only asset. Scores are algorithmic based on Data, Vetting, and Community sentiment.</AccordionContent>
                      </AccordionItem>
                  </Accordion>
              </div>

              {/* FINAL CTA */}
              <div className="text-center border-2 border-[#00FFC0] bg-[#00FFC0]/5 p-10 rounded-2xl">
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white uppercase mb-4 leading-tight">
                      Ready to find your edge?
                  </h2>
                  <p className="text-lg text-[#00FFC0] font-mono mb-8">
                      // CIRCUIT STATUS: OPEN FOR NEW OPERATORS
                  </p>
                  <Button size="lg" onClick={onOpenRegister} className="text-xl px-16 py-6 shadow-[0_0_50px_rgba(0,255,192,0.4)] animate-pulse-glow">
                      PLUG IN NOW
                  </Button>
              </div>

          </div>
      </section>

    </div>
  );
};
