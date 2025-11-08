
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';

export const FAQComponent = () => {
  // Selected top 5 for the home page from the full list of 10
  const faqItems = [
    { 
        title: "ZAP: Not a Casino. A Catalyst. What exactly is ZAP?", 
        content: "We’re the decentralized brain for crypto gaming. Forget the traditional affiliate model—we’re a data engine, a watchdog, and a rewards platform all rolled into one. We flip the script and put the power back where it belongs: with the player." 
    },
    { 
        title: "How are you different from the other 'review sites'?", 
        content: "Most are just sales funnels disguised as reviews. We're a utility. We prioritize raw data, verified RTPs, and community signals over paid placement. Our focus is finding your edge, not maximizing their commission." 
    },
    { 
        title: "If you won't take bribes, how does ZAP make money?", 
        content: "Transparency is non-negotiable. We run standard affiliate partnerships with operators who pass our rigorous vetting. The difference? We disclose everything and prioritize long-term, high-quality traffic—not short-term cash grabs." 
    },
    { 
        title: "How do I earn real rewards for participating?", 
        content: "You built this engine. You should own a piece of the outcome. We reward active contributors—those who submit data, write quality reviews, and help vet the ecosystem—with value that's real, not just funny money." 
    },
    { 
        title: "What’s the single core philosophy driving ZAP?", 
        content: "Gamble Smarter, Not Harder. Every tool, every review, and every data point we provide is designed to maximize your potential return, sharpen your play, and give you a critical edge over the house." 
    }
  ];

  return (
    <section id="faq" className="bg-[#14131c] py-16 md:py-24 border-t border-[#3a3846]">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
            <span className="mb-3 font-heading text-sm font-bold text-[#1ed760] uppercase tracking-widest">Nothing to Hide</span>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            FREQUENTLY FIRED QUESTIONS
            </h2>
        </div>
        
        <Accordion multiple={false} defaultOpen={["item-0"]}>
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                  <span className="font-bold">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                  <p className="text-lg leading-relaxed">{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
