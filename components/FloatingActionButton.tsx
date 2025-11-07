
import React from 'react';
import { Button } from './Button';
import { Icons } from './icons';

export const FloatingActionButton = () => {
  return (
    <Button
      variant="primary"
      size="icon"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg md:hidden"
    >
      <Icons.HelpCircle className="h-6 w-6" />
    </Button>
  );
};
