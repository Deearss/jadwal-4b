"use client";

import { useState, useEffect, useCallback } from "react";
import { SESI_A, SESI_B } from "@/lib/schedule";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function getTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function timeToMin(str: string) {
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
}

export function useScheduleStatus() {
  const [today, setToday] = useState("");
  const [currentMinutes, setCurrentMinutes] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setToday(getTodayISO());
      setCurrentMinutes(now.getHours() * 60 + now.getMinutes());
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const isSessionA = SESI_A.dates.includes(today);
  const isSessionB = SESI_B.dates.includes(today);
  const isClassDay = isSessionA || isSessionB;

  const isRowActive = useCallback(
    (start: string, end: string) => {
      if (!isClassDay) return false;
      return currentMinutes >= timeToMin(start) && currentMinutes < timeToMin(end);
    },
    [isClassDay, currentMinutes],
  );

  return { isSessionA, isSessionB, isClassDay, isRowActive };
}
