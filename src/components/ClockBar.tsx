"use client";

import { useClock } from "@/hooks/useClock";

export default function ClockBar() {
  const { hh, mm, ss, date } = useClock();

  return (
    <div className="max-w-303.75 mx-auto mb-6 flex flex-col items-center justify-center py-2 gap-1">
      <div className="text-[4.2rem] font-bold tracking-[0.06em] text-prose tabular-nums leading-none">
        <span>{hh}</span>
        <span className="text-accent mx-[0.05em] sep-blink"> : </span>
        <span>{mm}</span>
        <span className="text-accent mx-[0.05em] sep-blink"> : </span>
        <span>{ss}</span>
      </div>
      {date && (
        <div className="mt-4 text-[0.7rem] font-medium tracking-[0.06em] text-muted capitalize">
          {date}
        </div>
      )}
    </div>
  );
}
