import { forwardRef } from "react";
import { Calendar } from "lucide-react";
import { SESI_A, SESI_B } from "@/lib/schedule";
import SesiSection from "./SesiSection";

interface JadwalCardProps {
  isSessionA: boolean;
  isSessionB: boolean;
  isRowActive: (start: string, end: string) => boolean;
}

const JadwalCard = forwardRef<HTMLDivElement, JadwalCardProps>(
  ({ isSessionA, isSessionB, isRowActive }, ref) => {
    const year = new Date().getFullYear();

    return (
      <div
        ref={ref}
        className="relative w-290.25 bg-surface border border-border rounded-md overflow-hidden"
      >
        {/* Accent line atas */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />

        {/* Header */}
        <div className="px-[1.8rem] pt-[1.6rem] pb-[1.3rem] border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[0.55rem] font-medium tracking-widest uppercase text-muted mb-2">
                UNISKA BJM &nbsp;·&nbsp; Fakultas Teknologi Informasi
                &nbsp;·&nbsp; Prodi Teknik Informatika
              </div>
              <div className="text-[1.5rem] font-bold tracking-[-0.02em] text-prose leading-[1.15]">
                Jadwal Kuliah <span className="text-accent">Kelas 4B</span>
              </div>
              <div className="text-[0.6rem] font-medium tracking-[0.08em] uppercase text-muted mt-[0.45rem]">
                Non-Reguler &nbsp;·&nbsp; Banjarmasin
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[0.55rem] text-muted tracking-[0.05em] mb-[0.3rem]">
                Semester Genap &nbsp;·&nbsp; Tahun Akademik
              </div>
              <div className="text-[1.6rem] font-bold tracking-[-0.03em] text-accent leading-none">
                2025 / 2026
              </div>
              <div className="flex gap-1.5 mt-2 justify-end">
                <span className="inline-flex items-center gap-1 text-[0.58rem] font-semibold tracking-[0.06em] uppercase py-[0.22rem] px-[0.65rem] rounded-sm border text-accent border-(--accent-mid) bg-(--accent-dim)">
                  <Calendar size={14} className="relative -top-[1.5px]" /> Sabtu
                </span>
                <span className="inline-flex items-center text-[0.58rem] font-semibold tracking-[0.06em] uppercase py-[0.22rem] px-[0.65rem] rounded-sm border text-muted border-border bg-transparent">
                  Ruang 4B
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sesi A */}
        <SesiSection
          data={SESI_A}
          isDimmed={isSessionB && !isSessionA}
          isRowActive={isRowActive}
        />

        {/* Divider */}
        <div className="h-px bg-border mx-[1.8rem]" />

        {/* Sesi B */}
        <SesiSection
          data={SESI_B}
          isDimmed={isSessionA && !isSessionB}
          isRowActive={isRowActive}
        />

        {/* Footer */}
        <footer className="flex items-center justify-end border-t border-border px-[1.8rem] py-[0.85rem] text-[0.68rem] text-muted opacity-70">
          © {year} Jadwal4B &nbsp;·&nbsp; Kelas 4B &nbsp;·&nbsp; Non Reguler -
          Banjarmasin
        </footer>
      </div>
    );
  },
);

JadwalCard.displayName = "JadwalCard";

export default JadwalCard;
