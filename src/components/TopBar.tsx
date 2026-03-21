"use client";

import { ImageIcon, FileText } from "lucide-react";

interface TopBarProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
}

export default function TopBar({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onExportPNG,
  onExportPDF,
}: TopBarProps) {
  return (
    <div className="flex items-center justify-between max-w-[1215px] mx-auto mb-5 pb-[0.85rem] border-b border-border gap-3 flex-wrap">
      {/* Logo */}
      <div className="text-[1rem] font-bold tracking-[-0.01em] text-accent">
        Jadwal<span className="text-muted font-normal">4B</span>
      </div>

      {/* Controls */}
      <div className="flex gap-2 items-center">
        {/* Zoom */}
        <div className="flex items-center gap-0.5 bg-surface border border-border rounded px-1.5 py-0.5 text-[0.6rem] text-muted">
          <button
            onClick={onZoomOut}
            className="bg-none border-none text-accent text-[0.85rem] cursor-pointer px-[7px] py-0.5 rounded font-sans hover:bg-[var(--accent-dim)] transition-colors"
          >
            −
          </button>
          <span className="min-w-[34px] text-center">{zoomLevel}%</span>
          <button
            onClick={onZoomIn}
            className="bg-none border-none text-accent text-[0.85rem] cursor-pointer px-[7px] py-0.5 rounded font-sans hover:bg-[var(--accent-dim)] transition-colors"
          >
            +
          </button>
        </div>

        {/* PNG */}
        <button
          onClick={onExportPNG}
          className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold tracking-[0.03em] py-[0.35rem] px-[0.8rem] rounded border cursor-pointer transition-all bg-[var(--accent-dim)] border-[var(--accent-mid)] text-accent hover:opacity-80 hover:-translate-y-px"
        >
          <ImageIcon size={12} /> Download PNG
        </button>

        {/* PDF */}
        <button
          onClick={onExportPDF}
          className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold tracking-[0.03em] py-[0.35rem] px-[0.8rem] rounded border cursor-pointer transition-all bg-[var(--blue-dim)] border-[var(--blue-mid)] text-blue hover:opacity-80 hover:-translate-y-px"
        >
          <FileText size={12} /> Download PDF
        </button>
      </div>
    </div>
  );
}
