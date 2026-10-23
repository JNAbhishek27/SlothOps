import React from 'react';
import { OPEN_MODELS } from '../data/samplePresets.ts';
import { ModelEngineOption } from '../types.ts';

interface OpenSourceMatrixProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

export const OpenSourceMatrix: React.FC<OpenSourceMatrixProps> = ({
  selectedModel,
  onSelectModel
}) => {
  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#9eb09e] mb-1">
          <span>Hacktoberfest Requirement</span>
          <span aria-hidden="true">·</span>
          <span>Open-Weight Models & Frameworks</span>
          <span aria-hidden="true">·</span>
          <span>Local Inference Architecture</span>
        </div>
        <h2 className="text-2xl font-bold text-[#f2f4f1] tracking-tight">
          Why Open Innovation Matters for What We Built
        </h2>
        <p className="text-sm text-[#b2c4b2] mt-2 max-w-3xl leading-relaxed">
          The Hacktoberfest challenge specifically asks: <span className="text-[#d8ebd6] italic">"Tell us where your open-based approach worked better than a closed one. Does it run on a laptop with no internet? Keep someone's data off a server they don't control?"</span> Here is the architectural reality:
        </p>
      </div>

      {/* 3 Pillar Comparison (Clean unboxed cards, no pill sandwich, single elevation) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-[#162018] border border-[#27382b] rounded-xl flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-[#a8d5a2] mb-1">01. Intimate Data Privacy</div>
            <h3 className="text-base font-bold text-[#f2f4f1] mb-2">Group Chats & Personal Files Stay Home</h3>
            <p className="text-xs text-[#9eb09e] leading-relaxed">
              Closed APIs require sending your personal family arguments, confidential work Slack logs, and unorganized bank receipts to third-party cloud data centers where they can be retained or audited. Open weights run on your laptop via Ollama or WebGPU, keeping sensitive personal reality strictly on your device.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#233327] flex items-center justify-between text-xs font-mono text-[#89a689]">
            <span>Cloud Leakage</span>
            <span className="text-[#a8d5a2] font-semibold">0 bytes</span>
          </div>
        </div>

        <div className="p-5 bg-[#162018] border border-[#27382b] rounded-xl flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-[#a8d5a2] mb-1">02. The Laziness Dividend</div>
            <h3 className="text-base font-bold text-[#f2f4f1] mb-2">Zero API Billing Anxiety</h3>
            <p className="text-xs text-[#9eb09e] leading-relaxed">
              Commercial AI utilities charge monthly subscriptions or token metered billing that makes users hesitate to run "frivolous" tasks. When the model is open-weight and runs locally, summarizing a chaotic group chat costs exactly $0.00. You can be as lazy as you want without receiving a surprise invoice.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#233327] flex items-center justify-between text-xs font-mono text-[#89a689]">
            <span>Running Cost</span>
            <span className="text-[#a8d5a2] font-semibold">$0.00 / month</span>
          </div>
        </div>

        <div className="p-5 bg-[#162018] border border-[#27382b] rounded-xl flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-[#a8d5a2] mb-1">03. Airplane & Offline Resilience</div>
            <h3 className="text-base font-bold text-[#f2f4f1] mb-2">Functions Without An Internet Signal</h3>
            <p className="text-xs text-[#9eb09e] leading-relaxed">
              If your internet goes down or you are in a remote cabin retreat, closed AI tools stop dead. SlothOps incorporates Web Audio synthesis and local open-weight parsing so your ambient sleep companion, recipes, and file tidiers continue running without an active Wi-Fi connection.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#233327] flex items-center justify-between text-xs font-mono text-[#89a689]">
            <span>Offline Capable</span>
            <span className="text-[#a8d5a2] font-semibold">100% Ready</span>
          </div>
        </div>
      </div>

      {/* Model Engine Selector Grid */}
      <div className="bg-[#141b16] border border-[#26372a] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-bold text-[#f2f4f1]">Active Open Model Configuration</h3>
            <p className="text-xs text-[#9eb09e]">Select your preferred open foundation model or cloud fallback bridge.</p>
          </div>
          <div className="text-xs text-[#89a689] font-mono">
            Active: <span className="text-[#a8d5a2] font-bold">{selectedModel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OPEN_MODELS.map((model: ModelEngineOption) => {
            const isSelected = selectedModel === model.id;
            return (
              <div
                key={model.id}
                onClick={() => onSelectModel(model.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1b271d] border-[#a8d5a2] ring-1 ring-[#a8d5a2]/50'
                    : 'bg-[#162018] border-[#293c2d] hover:border-[#3d5442]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono text-[#a8d5a2]">{model.provider}</span>
                    <h4 className="text-sm font-bold text-[#f2f4f1] mt-0.5">{model.name}</h4>
                  </div>
                  <span className="text-[11px] font-medium text-[#b2c4b2] bg-[#223125] px-2 py-0.5 rounded">
                    {model.type}
                  </span>
                </div>
                <p className="text-xs text-[#9eb09e] mb-3 leading-relaxed">
                  {model.description}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#233426] text-[#7d997d]">
                  <span>Offline: {model.offlineCapable ? 'Supported' : 'Requires Internet'}</span>
                  <span>Privacy: {model.privacyRating}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
