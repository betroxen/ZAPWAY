
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';

export const FAQComponent = () => {
  const faqItems = [
    { title: "Is Zap a casino?", content: "No. We are a community-powered hub and rewards platform. We do not operate any games ourselves. We exist to help you find the best and safest places to play, and reward you for being part of the community." },
    { title: "How do I earn Zap Points?", content: "You can earn Zap Points in many ways: connecting your casino accounts (securely via our API partners), completing daily/weekly 'missions', writing honest reviews, referring friends, and engaging in community discussions." },
    { title: "Are Zap Points a real cryptocurrency?", content: "Yes. Zap Points (ZAP) will be an on-chain token. You earn them for your contributions, and they are yours to hold, trade, or use within our ecosystem (e.g., for exclusive bonuses or merch)." },
    { title: "Is this platform free?", content: "Yes, joining the Zap community is 100% free. Our business model is based on affiliate partnerships with the high-quality casinos we list. This allows us to fund the platform and reward our users without charging any fees." }
  ];

  return (
    <section id="faq" className="bg-[#14131c] py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="font-heading mb-10 text-center text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>
        <Accordion multiple={false} defaultOpen={["item-0"]}>
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
