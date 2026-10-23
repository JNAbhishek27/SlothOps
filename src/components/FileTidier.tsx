import React, { useState } from 'react';
import { FILE_PRESETS } from '../data/samplePresets.ts';
import { FileTidyResult } from '../types.ts';

interface FileTidierProps {
  selectedModel: string;
}

export const FileTidier: React.FC<FileTidierProps> = ({ selectedModel }) => {
  const [fileList, setFileList] = useState<string[]>(FILE_PRESETS[0].files);
  const [customFile, setCustomFile] = useState('');
  const [targetOS, setTargetOS] = useState<'mac-linux' | 'windows'>('mac-linux');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FileTidyResult | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  const handleLoadPreset = (presetId: string) => {
    const found = FILE_PRESETS.find(p => p.id === presetId);
    if (found) {
      setFileList(found.files);
      setResult(null);
    }
  };

  const handleAddFile = () => {
    if (customFile.trim() && !fileList.includes(customFile.trim())) {
      setFileList([...fileList, customFile.trim()]);
      setCustomFile('');
    }
  };

  const handleRemoveFile = (idx: number) => {
    setFileList(fileList.filter((_, i) => i !== idx));
  };

  const handleTidyFiles = async () => {
    if (fileList.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch('/api/tidy-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileList,
          targetOS,
          modelEngine: selectedModel
        })
      });

      const data = await res.json();
      if (data.success) {
        setResult(data);
      }
    } catch (err) {
      console.error('Failed to tidy files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = () => {
    if (!result) return;
    const script = targetOS === 'mac-linux' ? result.bashScript : result.powershellScript;
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleDownloadScript = () => {
    if (!result) return;
    const script = targetOS === 'mac-linux' ? result.bashScript : result.powershellScript;
    const filename = targetOS === 'mac-linux' ? 'sloth_tidy.sh' : 'sloth_tidy.ps1';
    const blob = new Blob([script], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#9eb09e] mb-1">
          <span>Tool 03</span>
          <span aria-hidden="true">·</span>
          <span>Desktop & File Hoard Tidier</span>
          <span aria-hidden="true">·</span>
          <span>Automatic Semantic Sorting & Batch Renaming</span>
        </div>
        <h2 className="text-2xl font-bold text-[#f2f4f1] tracking-tight">
          Clean Up 6 Months of Desktop Clutter in 0.04 Seconds
        </h2>
        <p className="text-sm text-[#b2c4b2] mt-1 max-w-2xl leading-relaxed">
          You've been putting off organizing your Downloads folder forever. The model analyzes chaotic filenames, sorts them into structured directory buckets, normalizes dates, isolates installer junk, and outputs a 1-click terminal script.
        </p>
      </div>

      {/* Preset Selectors */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-medium text-[#9eb09e] mr-1">Load Clutter Sample:</span>
        {FILE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleLoadPreset(preset.id)}
            className="px-3 py-1.5 text-xs font-medium bg-[#172219] hover:bg-[#202f23] text-[#cfdcce] border border-[#2d3e30] rounded-lg transition-colors cursor-pointer"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* File List & OS Target Controls */}
      <div className="bg-[#141b16] border border-[#27382b] rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-[#9eb09e]">
            Unorganized Files: <span className="font-mono text-[#a8d5a2]">{fileList.length} files queued</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#9eb09e]">Target Shell:</span>
            <button
              onClick={() => setTargetOS('mac-linux')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                targetOS === 'mac-linux'
                  ? 'bg-[#283b2b] text-[#a8d5a2] border border-[#a8d5a2]/40'
                  : 'bg-[#101511] text-[#7d967d] border border-[#233325]'
              }`}
            >
              Bash / Zsh (Mac/Linux)
            </button>
            <button
              onClick={() => setTargetOS('windows')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                targetOS === 'windows'
                  ? 'bg-[#283b2b] text-[#a8d5a2] border border-[#a8d5a2]/40'
                  : 'bg-[#101511] text-[#7d967d] border border-[#233325]'
              }`}
            >
              PowerShell (Windows)
            </button>
          </div>
        </div>

        {/* File items list */}
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {fileList.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-2 bg-[#0e130f] border border-[#223125] rounded-md text-xs font-mono text-[#d6e4d4]"
            >
              <span className="truncate mr-2">{file}</span>
              <button
                onClick={() => handleRemoveFile(idx)}
                className="text-[#6d846d] hover:text-[#e89178] transition-colors cursor-pointer text-xs"
                aria-label="Remove file"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Add custom filename */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#223126]">
          <input
            type="text"
            value={customFile}
            onChange={(e) => setCustomFile(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddFile()}
            placeholder="Add filename (e.g. receipt_june_2026.pdf, screenshot_119.png)..."
            className="flex-1 bg-[#0e130f] border border-[#263729] rounded-lg px-3 py-2 text-xs font-mono text-[#f2f4f1] placeholder-[#576b57] focus:outline-none focus:border-[#a8d5a2]"
          />
          <button
            onClick={handleAddFile}
            className="px-3 py-2 text-xs font-medium text-[#cfdcce] bg-[#1a251c] hover:bg-[#243327] border border-[#2d3e30] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Add File
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-[#899f89]">
            Local Execution: <span className="font-mono text-[#a8d5a2]">No filesystem files uploaded</span>
          </div>
          <button
            onClick={handleTidyFiles}
            disabled={loading || fileList.length === 0}
            className="px-5 py-2 text-xs font-semibold text-[#0d140e] bg-[#a8d5a2] hover:bg-[#bae0b5] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin">🗂️</span>
                <span>Classifying file semantics...</span>
              </>
            ) : (
              <>
                <span>Generate Clean Hierarchy & Script</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results View */}
      {result && (
        <div className="bg-[#162018] border border-[#2b3d2e] rounded-xl p-6 space-y-6">
          <div>
            <div className="text-xs font-mono text-[#a8d5a2] mb-1">AUTOMATIC REORGANIZATION ARCHITECTURE</div>
            <p className="text-sm text-[#e0e9df]">{result.summary}</p>
          </div>

          {/* Categorized Folders */}
          <div className="space-y-4">
            {result.folders.map((folder, fIdx) => (
              <div key={fIdx} className="bg-[#111712] border border-[#233325] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📁</span>
                    <span className="text-sm font-bold font-mono text-[#f2f4f1]">{folder.name}/</span>
                  </div>
                  <span className="text-xs text-[#859c85]">{folder.purpose}</span>
                </div>

                <div className="space-y-1.5 mt-3">
                  {folder.files.map((f, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 text-xs font-mono p-2 bg-[#0d120e] border border-[#1e2a20] rounded"
                    >
                      <div className="md:col-span-5 text-[#869b86] truncate">
                        {f.original}
                      </div>
                      <div className="md:col-span-1 text-center text-[#556e55]">→</div>
                      <div className="md:col-span-4 text-[#a8d5a2] truncate font-semibold">
                        {f.suggested}
                      </div>
                      <div className="md:col-span-2 text-right text-[11px] text-[#b8c9b8]">
                        {f.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Junk Candidates */}
          {result.junkCandidates && result.junkCandidates.length > 0 && (
            <div className="p-4 bg-[#231a17] border border-[#442c26] rounded-lg">
              <div className="text-xs font-semibold text-[#e89178] mb-2 flex items-center gap-1.5">
                <span>🗑️</span>
                <span>Flagged Temporary & Redundant Artifacts</span>
              </div>
              <div className="space-y-1.5">
                {result.junkCandidates.map((junk, jIdx) => (
                  <div key={jIdx} className="flex items-center justify-between text-xs font-mono text-[#d9c4bf]">
                    <span>{junk.original}</span>
                    <span className="text-[#a88d85]">{junk.reason} ({junk.action})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Executable Script */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#a8d5a2]">
                1-Click Executable Script ({targetOS === 'mac-linux' ? 'Bash' : 'PowerShell'})
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyScript}
                  className="text-xs text-[#a8d5a2] hover:text-[#c5eec1] transition-colors cursor-pointer font-mono"
                >
                  {copiedScript ? '✓ Copied!' : 'Copy Script'}
                </button>
                <button
                  onClick={handleDownloadScript}
                  className="text-xs text-[#9eb09e] hover:text-[#f2f4f1] transition-colors cursor-pointer font-mono"
                >
                  Download .{targetOS === 'mac-linux' ? 'sh' : 'ps1'}
                </button>
              </div>
            </div>

            <pre className="bg-[#0b0e0c] border border-[#223125] rounded-lg p-3 text-xs font-mono text-[#a8d5a2] overflow-x-auto leading-relaxed max-h-56">
              <code>{targetOS === 'mac-linux' ? result.bashScript : result.powershellScript}</code>
            </pre>
            <p className="text-[11px] text-[#718671] mt-1.5">
              Paste into your terminal inside the cluttered directory to organize in 1 hit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
