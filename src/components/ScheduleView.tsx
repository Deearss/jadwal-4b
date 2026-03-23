"use client";

import { useRef, useState } from "react";
import { useScheduleStatus } from "@/hooks/useScheduleStatus";
import TopBar from "./TopBar";
import ClockBar from "./ClockBar";
import SubscribeForm from "./SubscribeForm";
import JadwalCard from "./JadwalCard";

export default function ScheduleView() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Memproses...");

  const { isSessionA, isSessionB, isRowActive } = useScheduleStatus();

  async function captureCard(scale: number) {
    if (!cardRef.current) throw new Error("Card tidak ditemukan");
    const html2canvas = (await import("html2canvas-pro")).default;
    return html2canvas(cardRef.current, {
      scale,
      backgroundColor: "#242318",
      useCORS: true,
      logging: false,
    });
  }

  async function handleExportPNG() {
    setLoadingText("Menyiapkan PNG...");
    setLoading(true);
    try {
      const canvas = await captureCard(3);
      const a = document.createElement("a");
      a.download = "jadwal-TI-4B-2025-2026.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    } catch (e) {
      alert("Gagal: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleExportPDF() {
    setLoadingText("Menyiapkan PDF...");
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const canvas = await captureCard(2);
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const pW = pdf.internal.pageSize.getWidth();
      const pH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      let w = pW - 10;
      let h = w / ratio;
      if (h > pH - 10) {
        h = pH - 10;
        w = h * ratio;
      }
      pdf.addImage(img, "PNG", (pW - w) / 2, (pH - h) / 2, w, h);
      pdf.save("jadwal-TI-4B-2025-2026.pdf");
    } catch (e) {
      alert("Gagal: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-2.5 bg-[rgba(28,27,22,0.88)]">
          <div className="spinner" />
          <p className="text-[0.65rem] font-semibold tracking-widest uppercase text-accent">
            {loadingText}
          </p>
        </div>
      )}

      <TopBar onExportPNG={handleExportPNG} onExportPDF={handleExportPDF} />

      <ClockBar />

      {process.env.NEXT_PUBLIC_SUBSCRIBE_ENABLED === "true" && (
        <SubscribeForm />
      )}

      <div className="overflow-x-auto overflow-y-visible py-2 max-w-5xl mx-auto">
        <div className="">
          <JadwalCard
            ref={cardRef}
            isSessionA={isSessionA}
            isSessionB={isSessionB}
            isRowActive={isRowActive}
          />
        </div>
      </div>

      {process.env.NEXT_PUBLIC_SUBSCRIBE_ENABLED === "true" && (
        <SubscribeForm />
      )}
    </>
  );
}
