import React from 'react';
import { ActiveTab } from '../types.ts';

interface HeroSectionProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenModelMatrix: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectTab,
  onOpenModelMatrix
}) => {
  return (
    <div className="w-full border-b border-[#243328] bg-[#121814]">
      {/* Editorial Kicker & Challenge Hook */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          {/* Left Column: Mission & Rationale */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs text-[#9eb09e] mb-3">
              <span>Hacktoberfest 2026</span>
              <span aria-hidden="true">·</span>
              <span>DEV Challenge 4 of 5</span>
              <span aria-hidden="true">·</span>
              <span>Theme: Slow and Steady</span>
              <span aria-hidden="true">·</span>
              <span>International Sloth Day</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f2f4f1] mb-4 text-balance leading-tight">
              Open-Source AI Built to Reward Pure Laziness
            </h1>

            <p className="text-base sm:text-lg text-[#b8c9b8] leading-relaxed mb-6 max-w-2xl">
              Sloths conserve their energy, sleep 18 hours, and move at 0.003 mph—yet survive and thrive. 
              SlothOps channels open-weight models (Google Gemma 2, Prior Labs TabPFN) to automate the daily tasks 
              you dread so you can preserve your brain cycles.
            </p>

            {/* Action buttons (functional controls) */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('chat')}
                className="px-5 py-2.5 text-sm font-semibold text-[#0d140e] bg-[#a8d5a2] hover:bg-[#bde3b8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
              >
                Launch Morning Chat Sloth
              </button>
              <button
                onClick={() => onSelectTab('snooze')}
                className="px-5 py-2.5 text-sm font-medium text-[#e0e9df] bg-[#1b261e] hover:bg-[#25352a] border border-[#304434] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Start Ambient Soundscape
              </button>
              <button
                onClick={onOpenModelMatrix}
                className="px-4 py-2.5 text-sm font-medium text-[#9eb09e] hover:text-[#f2f4f1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inspect Open-Weight Architecture →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:w-[480px] shrink-0 flex items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-xl border border-[#2b3c2f] bg-[#162018] shadow-lg">
              <img
                src="/src/assets/images/hacktoberfest_sloth_banner_1792715242475.jpg"
                alt="Hacktoberfest Slow and Steady Sloth relaxing in a forest hammock"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1510]/90 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs text-[#d6e4d4]">
                  <span className="font-semibold text-[#f2f4f1]">International Sloth Day Edition</span>
                  <p className="text-[#a0b59f] mt-0.5">Automate group chats, fridge stares, and messy downloads locally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip (Adjacency to Proof, Tabular Numerals, Zero Pill Sandwiches) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#223126]">
          <div className="p-3 bg-[#162018] border border-[#26372a] rounded-lg">
            <div className="text-2xl font-bold font-mono tabular-nums text-[#a8d5a2]">1,480</div>
            <div className="text-xs text-[#9eb09e] mt-1">Keystrokes Avoided</div>
            <div className="text-[11px] text-[#6b806b] mt-0.5">Via 1-click canned replies & scripts</div>
          </div>

          <div className="p-3 bg-[#162018] border border-[#26372a] rounded-lg">
            <div className="text-2xl font-bold font-mono tabular-nums text-[#a8d5a2]">52 min</div>
            <div className="text-xs text-[#9eb09e] mt-1">Morning Sleep Gained</div>
            <div className="text-[11px] text-[#6b806b] mt-0.5">Skipped reading 70 unread chat messages</div>
          </div>

          <div className="p-3 bg-[#162018] border border-[#26372a] rounded-lg">
            <div className="text-2xl font-bold font-mono tabular-nums text-[#a8d5a2]">100%</div>
            <div className="text-xs text-[#9eb09e] mt-1">Data Kept on Device</div>
            <div className="text-[11px] text-[#6b806b] mt-0.5">Zero cloud retention with open weights</div>
          </div>

          <div className="p-3 bg-[#162018] border border-[#26372a] rounded-lg">
            <div className="text-2xl font-bold font-mono tabular-nums text-[#a8d5a2]">$0.00</div>
            <div className="text-xs text-[#9eb09e] mt-1">Marginal API Invoice</div>
            <div className="text-[11px] text-[#6b806b] mt-0.5">Set up once, runs forever on laptop</div>
          </div>
        </div>
      </div>
    </div>
  );
};
