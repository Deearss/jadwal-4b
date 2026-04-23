import Link from "next/link";
import { ExternalLink, GraduationCap, Building2 } from "lucide-react";

// CTA section menuju portal akademik UNISKA
export default function ELearningCTA() {
  return (
    <div className="mt-10 py-10 mb-6 border-t border-border text-center px-4">
      <p className="text-[0.6rem] font-semibold tracking-widest uppercase text-muted mb-4">
        Layanan Akademik
      </p>
      <p className="text-[1.5rem] font-bold tracking-[-0.02em] text-prose mb-2.5">
        Akses Portal UNISKA
      </p>
      <p className="text-[0.8rem] text-muted mb-8 max-w-sm mx-auto leading-relaxed">
        Jalan pintas menuju portal E-Learning, Sistem Informasi Akademik (SIA), dan website resmi Fakultas Teknologi Informasi.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {/* E-Learning */}
        <div className="relative inline-block group">
          <Link
            href={process.env.NEXT_PUBLIC_ELEARNING_LINK || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-[0.9rem] font-semibold tracking-[0.02em] py-3 px-6 rounded-lg border cursor-pointer transition-all bg-(--accent-dim) border-(--accent-mid) text-accent hover:opacity-80 hover:-translate-y-px"
          >
            E-Learning
            <ExternalLink size={17} />
          </Link>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded bg-surface border border-border text-[0.6rem] text-muted whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
            Portal E-Learning UNISKA
            <span className="absolute -bottom-1.25 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-surface border-b border-r border-border rotate-45" />
          </div>
        </div>

        {/* SIA UNISKA */}
        <div className="relative inline-block group">
          <Link
            href={process.env.NEXT_PUBLIC_SIA_LINK || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-[0.9rem] font-semibold tracking-[0.02em] py-3 px-6 rounded-lg border cursor-pointer transition-all bg-(--blue-dim) border-(--blue-mid) text-blue hover:opacity-80 hover:-translate-y-px"
          >
            SIA UNISKA
            <GraduationCap size={17} />
          </Link>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded bg-surface border border-border text-[0.6rem] text-muted whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
            Sistem Informasi Akademik
            <span className="absolute -bottom-1.25 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-surface border-b border-r border-border rotate-45" />
          </div>
        </div>

        {/* FTI UNISKA */}
        <div className="relative inline-block group">
          <Link
            href={process.env.NEXT_PUBLIC_FTI_LINK || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-[0.9rem] font-semibold tracking-[0.02em] py-3 px-6 rounded-lg border cursor-pointer transition-all bg-(--teal-dim) border-(--teal-mid) text-teal hover:opacity-80 hover:-translate-y-px"
          >
            Web FTI
            <Building2 size={17} />
          </Link>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded bg-surface border border-border text-[0.6rem] text-muted whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
            Website Resmi FTI UNISKA
            <span className="absolute -bottom-1.25 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-surface border-b border-r border-border rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
