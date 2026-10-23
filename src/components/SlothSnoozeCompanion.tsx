import React, { useState, useEffect } from 'react';
import { soundscapeEngine } from '../utils/audioEngine.ts';
import { SleepStoryResult } from '../types.ts';
import { SLOTH_FACTS } from '../data/samplePresets.ts';

interface SlothSnoozeCompanionProps {
  selectedModel: string;
}

export const SlothSnoozeCompanion: React.FC<SlothSnoozeCompanionProps> = ({ selectedModel }) => {
  // Soundscape state
  const [rainActive, setRainActive] = useState(false);
  const [rainVol, setRainVol] = useState(0.4);
  const [windActive, setWindActive] = useState(false);
  const [windVol, setWindVol] = useState(0.3);
  const [thetaActive, setThetaActive] = useState(false);
  const [thetaVol, setThetaVol] = useState(0.25);
  const [timerMinutes, setTimerMinutes] = useState<number>(0);
  const [timerRemaining, setTimerRemaining] = useState<string | null>(null);

  // Story state
  const [storyTopic, setStoryTopic] = useState('Gentle Rain in the Cecropia Canopy');
  const [loadingStory, setLoadingStory] = useState(false);
  const [story, setStory] = useState<SleepStoryResult | null>(null);

  // Breathing pacer state
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);

  // Toggle sound channels
  const toggleRain = () => {
    if (rainActive) {
      soundscapeEngine.stopChannel('rain');
      setRainActive(false);
    } else {
      soundscapeEngine.startRain(rainVol);
      setRainActive(true);
    }
  };

  const toggleWind = () => {
    if (windActive) {
      soundscapeEngine.stopChannel('wind');
      setWindActive(false);
    } else {
      soundscapeEngine.startWind(windVol);
      setWindActive(true);
    }
  };

  const toggleTheta = () => {
    if (thetaActive) {
      soundscapeEngine.stopChannel('theta');
      setThetaActive(false);
    } else {
      soundscapeEngine.startThetaDrone(thetaVol);
      setThetaActive(true);
    }
  };

  const handleStopAllSound = () => {
    soundscapeEngine.stopAll();
    setRainActive(false);
    setWindActive(false);
    setThetaActive(false);
    setTimerMinutes(0);
    setTimerRemaining(null);
  };

  const handleSetTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    if (minutes > 0) {
      soundscapeEngine.setSleepTimer(minutes, () => {
        setRainActive(false);
        setWindActive(false);
        setThetaActive(false);
        setTimerRemaining(null);
      });
      setTimerRemaining(`${minutes}m remaining`);
    } else {
      soundscapeEngine.setSleepTimer(0);
      setTimerRemaining(null);
    }
  };

  // Breathing pacer loop
  useEffect(() => {
    const cycle = [
      { phase: 'Inhale' as const, time: 4 },
      { phase: 'Hold' as const, time: 4 },
      { phase: 'Exhale' as const, time: 7 }
    ];
    let stepIndex = 0;

    const interval = setInterval(() => {
      setBreathSeconds(prev => {
        if (prev <= 1) {
          stepIndex = (stepIndex + 1) % cycle.length;
          setBreathPhase(cycle[stepIndex].phase);
          return cycle[stepIndex].time;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateStory = async () => {
    setLoadingStory(true);
    try {
      const res = await fetch('/api/sleep-companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tone: storyTopic,
          protagonist: 'Barnaby the Three-Toed Sloth',
          duration: '10 mins',
          modelEngine: selectedModel
        })
      });

      const data = await res.json();
      if (data.success) {
        setStory(data);
      }
    } catch (err) {
      console.error('Failed to generate sleep story:', err);
    } finally {
      setLoadingStory(false);
    }
  };

  // Generate initial story on mount
  useEffect(() => {
    handleGenerateStory();
  }, []);

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#9eb09e] mb-1">
          <span>Tool 04</span>
          <span aria-hidden="true">·</span>
          <span>Offline Wind-Down & Soundscape Companion</span>
          <span aria-hidden="true">·</span>
          <span>100% Client-Side Web Audio API</span>
        </div>
        <h2 className="text-2xl font-bold text-[#f2f4f1] tracking-tight">
          Wind Down with Calming Tales and Generative Soundscapes
        </h2>
        <p className="text-sm text-[#b2c4b2] mt-1 max-w-2xl leading-relaxed">
          Screen fatigue and racing thoughts disrupt sleep. SlothOps synthesizes soothing ambient soundscapes directly in your browser with zero audio downloads, paired with slow-paced sleep tales and an interactive breathing pacer.
        </p>
      </div>

      {/* Grid: Web Audio Soundscape Console + Breathing Pacer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Web Audio Synthesizer Console (7 cols) */}
        <div className="lg:col-span-7 bg-[#141b16] border border-[#27382b] rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#223126]">
            <div>
              <div className="text-xs font-mono text-[#a8d5a2]">WEB AUDIO SYNTHESIZER</div>
              <h3 className="text-base font-bold text-[#f2f4f1]">Generative Ambient Layers</h3>
            </div>
            {(rainActive || windActive || thetaActive) && (
              <button
                onClick={handleStopAllSound}
                className="text-xs text-[#e89178] hover:text-[#f2a691] transition-colors cursor-pointer font-mono"
              >
                Mute All
              </button>
            )}
          </div>

          {/* Sound Channels */}
          <div className="space-y-4">
            {/* Channel 1: Rain on Canopy */}
            <div className="p-3.5 bg-[#0e130f] border border-[#223125] rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🌧️</span>
                  <div>
                    <span className="text-xs font-semibold text-[#f2f4f1]">Gentle Canopy Rain</span>
                    <div className="text-[11px] text-[#7d967d]">Pink noise with leafy lowpass filtering</div>
                  </div>
                </div>
                <button
                  onClick={toggleRain}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    rainActive
                      ? 'bg-[#2b4430] text-[#a8d5a2] border border-[#446d4c]'
                      : 'bg-[#18221a] text-[#8ea68e] border border-[#263728] hover:text-[#f2f4f1]'
                  }`}
                >
                  {rainActive ? 'Playing' : 'Start'}
                </button>
              </div>
              {rainActive && (
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] font-mono text-[#7d967d]">Vol</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={rainVol}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setRainVol(v);
                      soundscapeEngine.setChannelVolume('rain', v);
                    }}
                    className="flex-1 accent-[#a8d5a2] h-1.5 bg-[#1f2b21] rounded"
                  />
                  <span className="text-[11px] font-mono tabular-nums text-[#a8d5a2]">
                    {Math.round(rainVol * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Channel 2: Forest Wind */}
            <div className="p-3.5 bg-[#0e130f] border border-[#223125] rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🍃</span>
                  <div>
                    <span className="text-xs font-semibold text-[#f2f4f1]">Forest Canopy Breeze</span>
                    <div className="text-[11px] text-[#7d967d]">Brownian noise modulated by 0.12Hz slow LFO</div>
                  </div>
                </div>
                <button
                  onClick={toggleWind}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    windActive
                      ? 'bg-[#2b4430] text-[#a8d5a2] border border-[#446d4c]'
                      : 'bg-[#18221a] text-[#8ea68e] border border-[#263728] hover:text-[#f2f4f1]'
                  }`}
                >
                  {windActive ? 'Playing' : 'Start'}
                </button>
              </div>
              {windActive && (
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] font-mono text-[#7d967d]">Vol</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={windVol}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setWindVol(v);
                      soundscapeEngine.setChannelVolume('wind', v);
                    }}
                    className="flex-1 accent-[#a8d5a2] h-1.5 bg-[#1f2b21] rounded"
                  />
                  <span className="text-[11px] font-mono tabular-nums text-[#a8d5a2]">
                    {Math.round(windVol * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Channel 3: Theta Binaural Wave */}
            <div className="p-3.5 bg-[#0e130f] border border-[#223125] rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🌙</span>
                  <div>
                    <span className="text-xs font-semibold text-[#f2f4f1]">4Hz Theta Sleep Frequency</span>
                    <div className="text-[11px] text-[#7d967d]">136.1Hz Om carrier + 4Hz binaural restorative pulse</div>
                  </div>
                </div>
                <button
                  onClick={toggleTheta}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    thetaActive
                      ? 'bg-[#2b4430] text-[#a8d5a2] border border-[#446d4c]'
                      : 'bg-[#18221a] text-[#8ea68e] border border-[#263728] hover:text-[#f2f4f1]'
                  }`}
                >
                  {thetaActive ? 'Playing' : 'Start'}
                </button>
              </div>
              {thetaActive && (
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] font-mono text-[#7d967d]">Vol</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={thetaVol}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setThetaVol(v);
                      soundscapeEngine.setChannelVolume('theta', v);
                    }}
                    className="flex-1 accent-[#a8d5a2] h-1.5 bg-[#1f2b21] rounded"
                  />
                  <span className="text-[11px] font-mono tabular-nums text-[#a8d5a2]">
                    {Math.round(thetaVol * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sleep Timer Bar */}
          <div className="pt-3 border-t border-[#223126] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#9eb09e]">Auto-Fade Sleep Timer:</span>
            <div className="flex items-center gap-1.5">
              {[5, 15, 30, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSetTimer(mins)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    timerMinutes === mins
                      ? 'bg-[#293c2c] text-[#a8d5a2] border border-[#a8d5a2]/50'
                      : 'bg-[#101511] text-[#7d967d] border border-[#233325] hover:text-[#d6e4d4]'
                  }`}
                >
                  {mins}m
                </button>
              ))}
              {timerMinutes > 0 && (
                <button
                  onClick={() => handleSetTimer(0)}
                  className="px-2 py-1 text-xs text-[#e89178] hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Breathing Pacer Visualizer (5 cols) */}
        <div className="lg:col-span-5 bg-[#141b16] border border-[#27382b] rounded-xl p-5 flex flex-col justify-between items-center text-center">
          <div>
            <div className="text-xs font-mono text-[#a8d5a2] mb-1">BIOMETRIC SLOW DOWN</div>
            <h3 className="text-base font-bold text-[#f2f4f1]">Sloth Breathing Pacer</h3>
            <p className="text-xs text-[#8da68d] mt-1">
              Synchronize your breath with the expanding canopy circle to lower resting heart rate.
            </p>
          </div>

          {/* Animated Circular Pacer */}
          <div className="relative my-8 flex items-center justify-center w-44 h-44">
            <div
              className={`absolute rounded-full border border-[#a8d5a2]/30 transition-all duration-1000 ease-in-out ${
                breathPhase === 'Inhale'
                  ? 'w-44 h-44 bg-[#1e3423]/40 scale-100'
                  : breathPhase === 'Hold'
                  ? 'w-44 h-44 bg-[#233d2a]/50 scale-105'
                  : 'w-24 h-24 bg-[#142318]/30 scale-75'
              }`}
            />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-sm font-bold text-[#f2f4f1] tracking-wide uppercase">
                {breathPhase}
              </span>
              <span className="text-2xl font-mono font-bold text-[#a8d5a2] tabular-nums mt-1">
                {breathSeconds}s
              </span>
            </div>
          </div>

          <div className="text-[11px] text-[#7d967d] font-mono">
            4s Inhale · 4s Hold · 7s Exhale (Parasympathetic activation)
          </div>
        </div>
      </div>

      {/* Bedtime Story Generator */}
      <div className="bg-[#162018] border border-[#2b3d2e] rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-[#a8d5a2] mb-1">BEDTIME TALE GENERATOR</div>
            <h3 className="text-lg font-bold text-[#f2f4f1]">The Canopy Sleep Story</h3>
          </div>
          <button
            onClick={handleGenerateStory}
            disabled={loadingStory}
            className="px-4 py-2 text-xs font-semibold text-[#0d140e] bg-[#a8d5a2] hover:bg-[#bde3b8] disabled:opacity-50 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            {loadingStory ? 'Weaving gentle tale...' : 'Generate New Tale'}
          </button>
        </div>

        {story && (
          <div className="space-y-4 pt-2">
            <h4 className="text-base font-bold text-[#d8ebd6]">{story.title}</h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#c8d8c6] leading-relaxed whitespace-pre-line bg-[#111712] border border-[#233325] rounded-lg p-4 font-serif">
              {story.narrative}
            </div>

            <div className="p-3 bg-[#1b261e] border border-[#2b3e2e] rounded-lg flex items-start gap-3">
              <span className="text-lg">🦥</span>
              <div>
                <span className="text-xs font-semibold text-[#a8d5a2]">Sloth Wisdom:</span>
                <p className="text-xs text-[#b8cbb6] italic mt-0.5">"{story.slothWisdom}"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
