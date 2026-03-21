"use client";

import { useState, useEffect } from "react";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function useClock() {
  const [time, setTime] = useState({ hh: "00", mm: "00" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({ hh: pad2(now.getHours()), mm: pad2(now.getMinutes()) });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
