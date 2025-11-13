import React from 'react';
import { Icons } from '../components/icons';
import { Input } from '../components/Input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';

export const KnowledgeBasePage = () => {
  return (
    <div className="container mx-auto max-w-4xl p-4 py-10 md:p-12 page-fade-in">
      <div className="mb-10 text-center">
        <Icons.BookOpen className="h-12 w-12 text-[#00FFC0] mx-auto mb-4" />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">Knowledge Base</h1>
        <p className="text-[#8d8c9e] mt-2 font-mono text-sm">// YOUR TACTICAL MANUAL FOR THE GRID</p>
      </div>

      <div className="relative mb-8">
        <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d8c9e]" />
        <Input placeholder="Search for articles..." className="pl-12 h-12 text-lg font-mono" />
      </div>

      <Accordion multiple={false} defaultOpen={["item-0"]}>
        <AccordionItem value="item-0">
          <AccordionTrigger>What is the ZAP Score?</AccordionTrigger>
          <AccordionContent>The ZAP Score is a dynamic rating based on 40% data (RTP, payouts), 30% security, and 30% community sentiment (VPRs).</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I earn ZP?</AccordionTrigger>
          <AccordionContent>You earn ZAP Points (ZP) by completing missions, submitting VPRs, and contributing valuable intel to the community.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};