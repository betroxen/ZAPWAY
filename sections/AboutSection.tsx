
import React from 'react';
import { Icons } from '../components/icons';

export const AboutSection = () => {
  return (
    <section id="about" className="bg-[#000000] py-16 md:py-24">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <span className="mb-3 text-sm font-medium text-[#1ed760]">ABOUT US</span>
          <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-4xl">
            We're Not a Casino. We're a Revolution.
          </h2>
          <p className="mb-4 text-[#8d8c9e]">
            The world of crypto gambling is a wild frontier. It's exhilarating, fast-paced, and full of opportunity. But it's also chaotic, confusing, and filled with platforms that don't have your best interests at heart.
          </p>
          <p className="text-[#8d8c9e]">
            That's where Zap comes in. We're a team of degens, data scientists, and developers who were tired of the status quo. Tired of shady operators, worthless 'rewards', and a total lack of community. We're building the platform we always wished we had.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full rounded-lg bg-[#14131c] p-8">
            <h3 className="font-heading mb-4 text-2xl font-semibold text-white">The Problem We're Solving</h3>
            <p className="mb-6 text-[#8d8c9e]">The current landscape is broken.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white">
                <Icons.Shield className="h-5 w-5 flex-shrink-0 text-[#8d8c9e]" />
                <span>Shady, untrustworthy operators</span>
              </li>
              <li className="flex items-center gap-3 text-white">
                <Icons.Percent className="h-5 w-5 flex-shrink-0 text-[#8d8c9e]" />
                <span>Worthless 'rewards' & opaque bonuses</span>
              </li>
              <li className="flex items-center gap-3 text-white">
                <Icons.Users className="h-5 w-5 flex-shrink-0 text-[#8d8c9e]" />
                <span>Fragmented, unhelpful communities</span>
              </li>
              <li className="flex items-center gap-3 text-white">
                <Icons.BookOpen className="h-5 w-5 flex-shrink-0 text-[#8d8c9e]" />
                <span>Lack of real data and transparency</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
