
import React, { useContext } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';
import { Button } from '../components/Button';
import { AppContext } from '../context/AppContext';

export const FAQPage = () => {
  const appContext = useContext(AppContext);
  const faqItems = [
    { title: "How do I connect my casino account?", content: "Use our secure API integrations to link accounts without sharing credentials. Follow the guided setup in your profile." },
    { title: "What are Zap Points worth?", content: "ZAP tokens are tradeable on major DEXs. Current value fluctuates; check live prices in the Rewards section." },
    { title: "Can I withdraw my earnings directly?", content: "Yes, connect your wallet to redeem points or affiliate commissions to your preferred chain." },
    { title: "Is my data safe?", content: "We use end-to-end encryption and never store sensitive info. All data is anonymized for analytics." }
  ];
  return (
    <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
      <h1 className="font-heading text-4xl font-bold text-white mb-4">FAQ</h1>
      <p className="text-lg text-[#8d8c9e] mb-10">Find answers to common questions about ZAP. If you don't see what you need, reach out via Support.</p>
      <div className="space-y-4">
        <Accordion multiple={false} defaultOpen={["item-0"]}>
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="mt-12 text-center">
        <Button size="lg" onClick={() => appContext?.setCurrentPage('Support')} className="shadow-[0_0_25px_rgba(29,215,96,0.35)]">
          Still Need Help?
        </Button>
      </div>
    </div>
  );
};
