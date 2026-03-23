"use client";

import { useState } from "react";
import { ImageIcon, FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onExportPNG: () => void;
  onExportPDF: () => void;
}

export default function TopBar({ onExportPNG, onExportPDF }: TopBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between max-w-303.75 mx-auto mb-5 pb-[0.85rem] border-b border-border gap-3">
        {/* Logo */}
        <div className="text-[1rem] font-bold tracking-[-0.01em] text-accent">
          Jadwal<span className="text-muted font-normal">4B</span>
        </div>

        {/* Desktop controls */}
        <div className="hidden sm:flex gap-2 items-center">
          <button
            onClick={onExportPNG}
            className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold tracking-[0.03em] py-[0.35rem] px-[0.8rem] rounded border cursor-pointer transition-all bg-(--accent-dim) border-(--accent-mid) text-accent hover:opacity-80 hover:-translate-y-px"
          >
            <ImageIcon size={18} /> Download PNG
          </button>

          <button
            onClick={onExportPDF}
            className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold tracking-[0.03em] py-[0.35rem] px-[0.8rem] rounded border cursor-pointer transition-all bg-(--blue-dim) border-(--blue-mid) text-blue hover:opacity-80 hover:-translate-y-px"
          >
            <FileText size={18} /> Download PDF
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="sm:hidden text-muted hover:text-accent transition-colors cursor-pointer"
          aria-label="Buka menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "sm:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Sidebar drawer */}
      <div
        className={cn(
          "sm:hidden fixed top-0 right-0 z-50 h-full w-64 bg-surface border-l border-border flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <span className="text-[0.7rem] font-semibold tracking-widest uppercase text-muted">
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-muted hover:text-accent transition-colors cursor-pointer"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex flex-col">
          {/* Downloads */}
          <div className="flex flex-col gap-2 p-4">
            <span className="text-[0.55rem] font-semibold tracking-widest uppercase text-muted">
              Unduh Jadwal :
            </span>

            <div className="flex gap-1.5">
              <button
                onClick={() => { onExportPNG(); setOpen(false); }}
                className="inline-flex flex-col flex-1 justify-center items-start gap-1.5 font-sans text-[0.55rem] font-semibold tracking-[0.03em] py-2 px-2 rounded border cursor-pointer transition-all bg-(--accent-dim) border-(--accent-mid) text-accent hover:opacity-80 active:opacity-60"
              >
                <ImageIcon className="size-4.5" /> Download PNG file
              </button>

              <button
                onClick={() => { onExportPDF(); setOpen(false); }}
                className="inline-flex flex-col flex-1 justify-center items-start gap-1.5 font-sans text-[0.55rem] font-semibold tracking-[0.03em] py-2 px-2 rounded border cursor-pointer transition-all bg-(--blue-dim) border-(--blue-mid) text-blue hover:opacity-80 active:opacity-60"
              >
                <FileText className="size-4.5" /> Download PDF file
              </button>
            </div>
          </div>

          <div className="h-px bg-border" />
        </div>
      </div>
    </>
  );
}
