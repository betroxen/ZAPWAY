import React, { useState, useContext, createContext } from 'react';
import { Icons } from './icons';

// FIX: Added explicit types for context
const AccordionContext = createContext<{ openItems: string[], toggleItem: (value: string) => void } | undefined>(undefined);

// FIX: Changed to React.FC to correctly handle children and other React props.
export const Accordion: React.FC<{ multiple?: boolean; defaultOpen?: string[] }> = ({ children, multiple = false, defaultOpen = [] }) => {
  const [openItems, setOpenItems] = useState(defaultOpen);
  const toggleItem = (value: string) => {
    if (multiple) {
      setOpenItems((current) =>
        current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value]
      );
    } else {
      setOpenItems((current) => (current.includes(value) ? [] : [value]));
    }
  };
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className="w-full">{children}</div>
    </AccordionContext.Provider>
  );
};

// FIX: Added explicit types for context
const AccordionItemContext = createContext<{ value: string } | undefined>(undefined);

// FIX: Changed to React.FC to correctly handle `key` and `children` props.
export const AccordionItem: React.FC<{ value: string }> = ({ value, children }) => (
  <AccordionItemContext.Provider value={{ value }}>
    <div className="border-b border-[#3a3846] last:border-b-0">{children}</div>
  </AccordionItemContext.Provider>
);

// FIX: Changed to React.FC to correctly handle children.
export const AccordionTrigger: React.FC = ({ children }) => {
  const itemContext = useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }
  const accordionContext = useContext(AccordionContext);
  if (!accordionContext) {
      throw new Error("AccordionTrigger must be used within an Accordion");
  }
  const { value } = itemContext;
  const { openItems, toggleItem } = accordionContext;
  const isOpen = openItems.includes(value);
  return (
    <button
      className="font-heading flex w-full items-center justify-between py-5 text-left text-base font-medium text-white hover:text-[#00FFC0]"
      onClick={() => toggleItem(value)}
    >
      <span>{children}</span>
      <Icons.ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
    </button>
  );
};

// FIX: Changed to React.FC to correctly handle children.
export const AccordionContent: React.FC = ({ children }) => {
  const itemContext = useContext(AccordionItemContext);
  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }
   const accordionContext = useContext(AccordionContext);
  if (!accordionContext) {
      throw new Error("AccordionContent must be used within an Accordion");
  }
  const { value } = itemContext;
  const { openItems } = accordionContext;
  const isOpen = openItems.includes(value);
  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        maxHeight: isOpen ? '500px' : '0px',
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="pb-5 text-[#8d8c9e]">{children}</div>
    </div>
  );
};