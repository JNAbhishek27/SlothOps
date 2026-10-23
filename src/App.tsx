/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types.ts';
import { TopBar } from './components/TopBar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ChatSummarizer } from './components/ChatSummarizer.tsx';
import { FridgeStareEliminator } from './components/FridgeStareEliminator.tsx';
import { FileTidier } from './components/FileTidier.tsx';
import { SlothSnoozeCompanion } from './components/SlothSnoozeCompanion.tsx';
import { DevSubmissionBuilder } from './components/DevSubmissionBuilder.tsx';
import { OpenSourceMatrix } from './components/OpenSourceMatrix.tsx';
import { SlothWisdomCard } from './components/SlothWisdomCard.tsx';
import { soundscapeEngine } from './utils/audioEngine.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [selectedModel, setSelectedModel] = useState<string>('gemma-2-9b');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Monitor audio playing state periodically
  useEffect(() => {
    const checkAudio = () => {
      setIsAudioPlaying(soundscapeEngine.getIsPlaying());
    };
    const interval = setInterval(checkAudio, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickNap = () => {
    if (soundscapeEngine.getIsPlaying()) {
      soundscapeEngine.stopAll();
      setIsAudioPlaying(false);
    } else {
      soundscapeEngine.startRain(0.35);
      soundscapeEngine.startWind(0.25);
      setIsAudioPlaying(true);
      setActiveTab('snooze');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1410] text-[#f2f4f1] flex flex-col font-sans">
      {/* Strict 3-Zone Top Navigation Contract */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onQuickNap={handleQuickNap}
        isAudioPlaying={isAudioPlaying}
      />

      {/* Hero Section with Hacktoberfest 2026 Week 3 Brief */}
      <HeroSection
        onSelectTab={setActiveTab}
        onOpenModelMatrix={() => setActiveTab('opensource')}
      />

      {/* Main Interactive Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {/* Workspace Segmented Controls (Functional Tab Buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#141b16] border border-[#253629] rounded-xl overflow-x-auto mb-8">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#253829] text-[#a8d5a2] shadow-sm'
                : 'text-[#9eb09e] hover:text-[#f2f4f1] hover:bg-[#1a241d]'
            }`}
          >
            01. Morning Chat Sloth
          </button>
          <button
            onClick={() => setActiveTab('fridge')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'fridge'
                ? 'bg-[#253829] text-[#a8d5a2] shadow-sm'
                : 'text-[#9eb09e] hover:text-[#f2f4f1] hover:bg-[#1a241d]'
            }`}
          >
            02. Fridge Stare Eliminator
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'files'
                ? 'bg-[#253829] text-[#a8d5a2] shadow-sm'
                : 'text-[#9eb09e] hover:text-[#f2f4f1] hover:bg-[#1a241d]'
            }`}
          >
            03. Desktop Hoard Tidier
          </button>
          <button
            onClick={() => setActiveTab('snooze')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'snooze'
                ? 'bg-[#253829] text-[#a8d5a2] shadow-sm'
                : 'text-[#9eb09e] hover:text-[#f2f4f1] hover:bg-[#1a241d]'
            }`}
          >
            04. Snooze & Soundscapes
          </button>
          <button
            onClick={() => setActiveTab('opensource')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'opensource'
                ? 'bg-[#253829] text-[#a8d5a2] shadow-sm'
                : 'text-[#9eb09e] hover:text-[#f2f4f1] hover:bg-[#1a241d]'
            }`}
          >
            Open Innovation Matrix
          </button>
          <button
            onClick={() => setActiveTab('devpost')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'devpost'
                ? 'bg-[#253829] text-[#a8d5a2] shadow-sm'
                : 'text-[#9eb09e] hover:text-[#f2f4f1] hover:bg-[#1a241d]'
            }`}
          >
            DEV Challenge Post Drafter
          </button>
        </div>

        {/* Tab Viewport Content */}
        <div className="min-h-[460px]">
          {activeTab === 'chat' && (
            <ChatSummarizer selectedModel={selectedModel} />
          )}

          {activeTab === 'fridge' && (
            <FridgeStareEliminator selectedModel={selectedModel} />
          )}

          {activeTab === 'files' && (
            <FileTidier selectedModel={selectedModel} />
          )}

          {activeTab === 'snooze' && (
            <SlothSnoozeCompanion selectedModel={selectedModel} />
          )}

          {activeTab === 'opensource' && (
            <OpenSourceMatrix
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
            />
          )}

          {activeTab === 'devpost' && (
            <DevSubmissionBuilder />
          )}
        </div>

        {/* International Sloth Day Biology & Fun Facts */}
        <SlothWisdomCard />
      </main>

      {/* Quiet, Human Editorial Footer (Strict anti-slop: zero fake status tickers) */}
      <footer className="border-t border-[#202f23] bg-[#0b100d] py-8 text-xs text-[#809980]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#a8d5a2] font-semibold">SlothOps</span>
            <span>—</span>
            <span>Built for Hacktoberfest 2026 Week 3 (Slow & Steady)</span>
          </div>

          <div className="flex items-center gap-4 text-[#94a894]">
            <span>Celebrating International Sloth Day</span>
            <span>·</span>
            <span>Powered by Open-Weight Models</span>
            <span>·</span>
            <a
              href="https://dev.to/challenges"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8d5a2] hover:underline"
            >
              HF26 Hub ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
