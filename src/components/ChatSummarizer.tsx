import React, { useState } from 'react';
import { CHAT_PRESETS } from '../data/samplePresets.ts';
import { ChatSummaryResult } from '../types.ts';

interface ChatSummarizerProps {
  selectedModel: string;
}

export const ChatSummarizer: React.FC<ChatSummarizerProps> = ({ selectedModel }) => {
  const [chatText, setChatText] = useState(CHAT_PRESETS[0].rawChat);
  const [userHandle, setUserHandle] = useState('Me');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChatSummaryResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [checkedActions, setCheckedActions] = useState<{ [key: number]: boolean }>({});

  const handleLoadPreset = (presetId: string) => {
    const found = CHAT_PRESETS.find(p => p.id === presetId);
    if (found) {
      setChatText(found.rawChat);
      setResult(null);
    }
  };

  const handleSummarize = async () => {
    if (!chatText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/summarize-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatText,
          userHandle,
          modelEngine: selectedModel
        })
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
        setCheckedActions({});
      }
    } catch (err) {
      console.error('Failed to summarize chat:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReply = (reply: string, index: number) => {
    navigator.clipboard.writeText(reply);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleAction = (idx: number) => {
    setCheckedActions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#9eb09e] mb-1">
          <span>Tool 01</span>
          <span aria-hidden="true">·</span>
          <span>Morning Chat Sloth</span>
          <span aria-hidden="true">·</span>
          <span>Zero-Effort Group Message Distillation</span>
        </div>
        <h2 className="text-2xl font-bold text-[#f2f4f1] tracking-tight">
          Wake Up to 2 Lines, Not 70 Unread Messages
        </h2>
        <p className="text-sm text-[#b2c4b2] mt-1 max-w-2xl leading-relaxed">
          Dump frantic group chat banter or Slack channels here. The open-weight model distills it to the bottom line, pulls out your obligations (or verifies you have none), and crafts instant 1-click canned replies.
        </p>
      </div>

      {/* Preset Selectors (Functional Tab Buttons) */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-medium text-[#9eb09e] mr-1">Load Chaotic Thread:</span>
        {CHAT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleLoadPreset(preset.id)}
            className="px-3 py-1.5 text-xs font-medium bg-[#172219] hover:bg-[#202f23] text-[#cfdcce] border border-[#2d3e30] rounded-lg transition-colors cursor-pointer"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Input Form & Action Bar */}
      <div className="bg-[#141b16] border border-[#27382b] rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#9eb09e]">
            <span>Your Name in Chat:</span>
            <input
              type="text"
              value={userHandle}
              onChange={(e) => setUserHandle(e.target.value)}
              placeholder="e.g. Me or Alex"
              className="bg-[#101511] border border-[#2b3c2e] rounded px-2.5 py-1 text-xs text-[#f2f4f1] focus:outline-none focus:border-[#a8d5a2]"
            />
          </div>
          <div className="text-xs text-[#7e967e]">
            {chatText.split('\n').filter(l => l.trim()).length} messages in buffer
          </div>
        </div>

        <textarea
          rows={6}
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          placeholder="Paste raw WhatsApp, Discord, or Slack chat dump here..."
          className="w-full bg-[#0e130f] border border-[#263729] rounded-lg p-3 text-xs font-mono text-[#d6e2d5] placeholder-[#576b57] focus:outline-none focus:border-[#a8d5a2] resize-y leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-[#899f89]">
            Active Engine: <span className="font-mono text-[#a8d5a2]">{selectedModel}</span>
          </div>
          <button
            onClick={handleSummarize}
            disabled={loading || !chatText.trim()}
            className="px-5 py-2 text-xs font-semibold text-[#0d140e] bg-[#a8d5a2] hover:bg-[#bae0b5] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin">🦥</span>
                <span>Sloth is gently reading...</span>
              </>
            ) : (
              <>
                <span>Distill Chat (Save Energy)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Results */}
      {result && (
        <div className="bg-[#162018] border border-[#2b3d2e] rounded-xl p-6 space-y-6">
          {/* Top Line Verdict */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-semibold text-[#a8d5a2]">The Two-Line Bottom Line</span>
              <div className="flex items-center gap-2 text-xs text-[#9eb09e]">
                <span>Saved ~{result.estimatedMinutesSaved} min</span>
                <span aria-hidden="true">·</span>
                <span>{result.mentalEnergySpared} Brainpower Saved</span>
              </div>
            </div>
            <p className="text-base sm:text-lg font-medium text-[#f2f4f1] bg-[#111712] border border-[#233325] rounded-lg p-4 leading-relaxed">
              {result.twoLineSummary}
            </p>
          </div>

          {/* Action Items for You */}
          <div>
            <span className="text-xs font-semibold text-[#a8d5a2] block mb-2">
              Obligations Assigned to You
            </span>
            <div className="space-y-2">
              {result.actionItemsForUser.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleAction(idx)}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                    checkedActions[idx]
                      ? 'bg-[#101611] border-[#223124] text-[#697d69] line-through'
                      : 'bg-[#121913] border-[#293a2b] text-[#e0e9df]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedActions[idx]}
                    onChange={() => {}}
                    className="mt-0.5 accent-[#a8d5a2] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Drama or Alerts Callout (if any) */}
          {result.dramaOrAlerts && (
            <div className="p-3 bg-[#241a17] border border-[#4d322b] rounded-lg">
              <div className="text-xs font-semibold text-[#e89178] mb-0.5">Alert / Attention Flagged:</div>
              <p className="text-xs text-[#d9c4bf]">{result.dramaOrAlerts}</p>
            </div>
          )}

          {/* 1-Click Canned Replies */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#a8d5a2]">
                1-Click Lazy Canned Replies (Zero Keystrokes)
              </span>
              <span className="text-[11px] text-[#869c86]">Click to copy to clipboard</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {result.lazyCannedReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopyReply(reply, idx)}
                  className="p-3 bg-[#111712] hover:bg-[#1a231b] border border-[#263729] hover:border-[#a8d5a2]/60 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between"
                >
                  <span className="text-xs text-[#e1ece0] leading-snug">"{reply}"</span>
                  <div className="text-[11px] text-[#7d967d] mt-2 font-mono">
                    {copiedIndex === idx ? '✓ Copied!' : 'Copy reply'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
