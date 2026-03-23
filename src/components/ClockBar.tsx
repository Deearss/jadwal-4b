"use client";

import clsx from "clsx";
import { useClock } from "@/hooks/useClock";

// Menampilkan jam real-time besar dan tanggal hari ini di tengah halaman.
export default function ClockBar() {
  const { hh, mm, ss, date } = useClock();

  return (
    <div
      className={clsx(
        "xl:max-w-303.75 xl:mt-14 xl:mb-10",
        "lg:mt-10 lg:mb-8",
        "mt-8 mb-6 mx-auto flex flex-col items-center justify-center py-2 gap-1",
      )}
    >
      {/* Angka jam */}
      <div
        className={clsx(
          "xl:text-[4.2rem]",
          "lg:text-[3.8rem]",
          "text-[3rem] font-bold tracking-[0.06em] text-prose tabular-nums leading-none",
        )}
      >
        <span>{hh}</span>
        <span className="text-accent mx-[0.05em] sep-blink"> : </span>
        <span>{mm}</span>
        <span className="text-accent mx-[0.05em] sep-blink"> : </span>
        <span>{ss}</span>
      </div>

      {/* Tanggal */}
      {date && (
        <div className="mt-4 text-[0.7rem] font-medium tracking-[0.06em] text-muted capitalize">
          {date}
        </div>
      )}
    </div>
  );
}
