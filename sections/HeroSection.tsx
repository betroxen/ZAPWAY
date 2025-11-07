
import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';

interface HeroSectionProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  isLoggedIn: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLogin, onOpenRegister, isLoggedIn }) => {
  const slogans = [
    "We're Not a Casino.",
    "We're a Revolution.",
    "Your Crypto Gambling Hub."
  ];
  const [sloganIndex, setSloganIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const sloganTimer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(sloganTimer);
  }, [slogans.length]);
  
  return (
    <section className="relative flex h-[70vh] min-h-[500px] w-full flex-col items-center justify-center bg-gradient-to-b from-[#000000] via-[#000000] to-[#14131c] px-4 py-20 text-center md:h-[80vh]">
      <div className="max-w-4xl">
        <span className="mb-4 inline-block rounded-full bg-[#1ed760]/10 px-4 py-1 text-sm font-medium text-[#1ed760]">
          WELCOME TO THE CIRCUIT
        </span>
        <div className="h-20 md:h-28">
          <h1 className={`font-heading text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            {slogans[sloganIndex]}
          </h1>
        </div>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#8d8c9e] md:text-xl">
          Your Gateway to a Smarter, More Rewarding Crypto Gambling Experience.
        </p>
        {!isLoggedIn && (
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="shadow-[0_0_25px_rgba(29,215,96,0.35)]" onClick={onOpenRegister}>
              Join the Circuit
            </Button>
            <Button size="lg" variant="secondary" onClick={onOpenLogin}>
              Login
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
