import { forwardRef } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import clsx from "clsx";
import { SESI_A, SESI_B } from "@/lib/schedule";
import SesiSection from "./SesiSection";

interface JadwalCardProps {
  isSessionA: boolean;
  isSessionB: boolean;
  isRowActive: (start: string, end: string) => boolean;
}

// Kartu jadwal utama — menampilkan header institusi, dua sesi jadwal (A & B), dan footer.
// Komponen ini di-capture saat user export PNG/PDF via ref yang diteruskan dari ScheduleView.
const JadwalCard = forwardRef<HTMLDivElement, JadwalCardProps>(
  ({ isSessionA, isSessionB, isRowActive }, ref) => {
    const year = new Date().getFullYear();

    return (
      // Card wrapper — lebar tetap di desktop, full-width di laptop & mobile
      <div
        ref={ref}
        className={clsx(
          // "xl:w-290.25",
          // "lg:w-full",
          "w-full relative my-10 bg-surface border border-border rounded-md overflow-hidden",
        )}
      >
        {/* Garis aksen tipis di bagian atas card */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />

        {/* Header — logo institusi, judul jadwal, dan info semester */}
        <div
          className={clsx(
            "xl:px-[1.8rem] xl:pt-[1.6rem] xl:pb-[1.3rem]",
            "lg:px-6 lg:pt-5 lg:pb-4",
            "px-4 pt-4 pb-3 mb-4 border-b border-border",
          )}
        >
          {/* Header inner — logo+judul di kiri, info semester di kanan */}
          <div
            className={clsx(
              "xl:flex-row xl:items-start xl:justify-between",
              "lg:flex-row lg:items-start lg:justify-between",
              "flex flex-col gap-4",
            )}
          >
            {/* Kiri: logo FTI UNISKA + nama institusi + judul kelas */}
            <div
              className={clsx(
                "xl:w-140",
                "lg:flex-1",
                "flex items-center gap-4",
              )}
            >
              <Image
                src="/images/fti-uniska-logo.png"
                alt="Logo FTI UNISKA"
                width={52}
                height={52}
                className="shrink-0"
              />
              <div>
                <div className="text-[0.55rem] font-medium tracking-widest uppercase text-muted mb-2">
                  UNISKA BJM &nbsp;·&nbsp; Fakultas Teknologi Informasi
                  &nbsp;·&nbsp; Prodi Teknik Informatika
                </div>
                <div
                  className={clsx(
                    "xl:text-[1.5rem]",
                    "lg:text-[1.3rem]",
                    "text-[1.1rem] font-bold tracking-[-0.02em] text-prose leading-[1.15]",
                  )}
                >
                  Jadwal Kuliah <span className="text-accent">Kelas 4B</span>
                </div>
                <div className="text-[0.6rem] font-medium tracking-[0.08em] uppercase text-muted mt-[0.45rem]">
                  Non-Reguler &nbsp;·&nbsp; Banjarmasin
                </div>
              </div>
            </div>

            {/* Kanan: tahun akademik dan badge hari/ruang */}
            <div
              className={clsx(
                "xl:text-right xl:shrink-0",
                "lg:text-right lg:shrink-0",
                "text-left",
              )}
            >
              <div className="text-[0.55rem] text-muted tracking-[0.05em] mb-[0.3rem]">
                Semester Genap &nbsp;·&nbsp; Tahun Akademik
              </div>
              <div
                className={clsx(
                  "xl:text-[1.6rem]",
                  "lg:text-[1.4rem]",
                  "text-[1.2rem] font-bold tracking-[-0.03em] text-accent leading-none",
                )}
              >
                2025 / 2026
              </div>
              <div
                className={clsx(
                  "xl:justify-end",
                  "lg:justify-end",
                  "flex gap-1.5 mt-2",
                )}
              >
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

        {/* Sesi A — jadwal Sabtu minggu ganjil */}
        <SesiSection
          data={SESI_A}
          isDimmed={isSessionB && !isSessionA}
          isRowActive={isRowActive}
        />

        {/* Sesi B — jadwal Sabtu minggu genap */}
        <SesiSection
          data={SESI_B}
          isDimmed={isSessionA && !isSessionB}
          isRowActive={isRowActive}
        />

        {/* Footer */}
        <footer
          className={clsx(
            "xl:px-[1.8rem] xl:py-[0.85rem]",
            "lg:px-6 lg:py-3",
            "flex items-center justify-end border-t border-border px-4 py-2.5 text-[0.68rem] text-muted opacity-70",
          )}
        >
          © {year} Jadwal4B &nbsp;·&nbsp; Kelas 4B &nbsp;·&nbsp; Non Reguler -
          Banjarmasin
        </footer>
      </div>
    );
  },
);

JadwalCard.displayName = "JadwalCard";

export default JadwalCard;
