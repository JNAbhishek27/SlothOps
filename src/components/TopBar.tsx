import React from 'react';
import { ActiveTab } from '../types.ts';

interface TopBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onQuickNap: () => void;
  isAudioPlaying: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  onQuickNap,
  isAudioPlaying
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-[#141b16]/90 backdrop-blur-md border-b border-[#28382c]">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => onTabChange('chat')}
        className="text-lg font-bold tracking-tight text-[#f2f4f1] hover:text-[#a8d5a2] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
      >
        <span className="text-[#86b580]">🦥</span> SlothOps
      </button>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#9eb09e]">
        <button
          onClick={() => onTabChange('chat')}
          className={`hover:text-[#f2f4f1] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'chat' ? 'text-[#a8d5a2] font-semibold border-b border-[#a8d5a2] pb-0.5' : ''
          }`}
        >
          Chat Sloth
        </button>
        <button
          onClick={() => onTabChange('fridge')}
          className={`hover:text-[#f2f4f1] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'fridge' ? 'text-[#a8d5a2] font-semibold border-b border-[#a8d5a2] pb-0.5' : ''
          }`}
        >
          Fridge Stare
        </button>
        <button
          onClick={() => onTabChange('files')}
          className={`hover:text-[#f2f4f1] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'files' ? 'text-[#a8d5a2] font-semibold border-b border-[#a8d5a2] pb-0.5' : ''
          }`}
        >
          File Tidier
        </button>
        <button
          onClick={() => onTabChange('snooze')}
          className={`hover:text-[#f2f4f1] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'snooze' ? 'text-[#a8d5a2] font-semibold border-b border-[#a8d5a2] pb-0.5' : ''
          }`}
        >
          Snooze & Sound
        </button>
        <button
          onClick={() => onTabChange('devpost')}
          className={`hover:text-[#f2f4f1] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'devpost' ? 'text-[#a8d5a2] font-semibold border-b border-[#a8d5a2] pb-0.5' : ''
          }`}
        >
          DEV Submission
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onQuickNap}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
            isAudioPlaying
              ? 'bg-[#2d4d33] text-[#c2ecc0] border border-[#487350]'
              : 'bg-[#1e2a21] text-[#e0e9df] hover:bg-[#28382c] border border-[#344839]'
          }`}
        >
          <span>{isAudioPlaying ? '🔊 Soundscape Active' : '🌿 Rest & Ambient'}</span>
        </button>
      </div>
    </header>
  );
};
