import React, { useState } from 'react';
import { SLOTH_FACTS } from '../data/samplePresets.ts';

export const SlothWisdomCard: React.FC = () => {
  const [currentFactIdx, setCurrentFactIdx] = useState(0);

  const nextFact = () => {
    setCurrentFactIdx((prev) => (prev + 1) % SLOTH_FACTS.length);
  };

  const fact = SLOTH_FACTS[currentFactIdx];

  return (
    <div className="bg-[#141b16] border border-[#26372a] rounded-xl p-5 my-8">
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden border border-[#2f4233] bg-[#1a251c]">
          <img
            src="/src/assets/images/sloth_mascot_peaceful_1792715242667.jpg"
            alt="Peaceful sloth mascot drinking herbal tea"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#9eb09e] mb-1">
            <span className="font-semibold text-[#a8d5a2]">International Sloth Day Wisdom</span>
            <span aria-hidden="true">·</span>
            <span>Fact {currentFactIdx + 1} of {SLOTH_FACTS.length}</span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-[#f2f4f1] mb-1">
            {fact.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#b8c9b8] leading-relaxed">
            {fact.fact}
          </p>
        </div>

        <button
          onClick={nextFact}
          className="px-3.5 py-2 text-xs font-medium text-[#d6e4d4] bg-[#1c271e] hover:bg-[#253528] border border-[#2e4031] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Another Sloth Secret →
        </button>
      </div>
    </div>
  );
};
