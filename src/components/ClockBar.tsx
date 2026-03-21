"use client";

import { useClock } from "@/hooks/useClock";

export default function ClockBar() {
  const { hh, mm } = useClock();

  return (
    <div className="max-w-[1215px] mx-auto mb-6 flex items-center justify-center py-2">
      <div className="text-[4.2rem] font-bold tracking-[0.06em] text-prose tabular-nums leading-none">
        <span>{hh}</span>
        <span className="text-accent mx-[0.05em] sep-blink"> : </span>
        <span>{mm}</span>
      </div>
    </div>
  );
}
