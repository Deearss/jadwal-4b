"use client";

import { useState } from "react";
import { Bell, CheckCircle } from "lucide-react";
import clsx from "clsx";

type Status = "idle" | "loading" | "success" | "error";

const GMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@gmail\.com$/;

function validateEmail(email: string): string | null {
  if (!email.includes("@")) return "Email harus mengandung '@'.";
  if (!email.toLowerCase().endsWith("@gmail.com"))
    return "Hanya Gmail (@gmail.com) yang diterima.";
  if (!GMAIL_REGEX.test(email)) return "Format email tidak valid.";
  return null;
}

// Form subscribe notifikasi email — muncul di atas dan bawah kartu jadwal.
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setValidationError(val ? validateEmail(val) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setValidationError(err);
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Terjadi kesalahan, coba lagi.");
      }
    } catch {
      setStatus("error");
      setMessage("Gagal terhubung ke server.");
    }
  };

  return (
    // Container — full width di mobile dengan padding sisi, dibatasi max-width di desktop
    <div
      className={clsx(
        "xl:max-w-303.75",
        "lg:max-w-2xl",
        "w-full px-8 mx-auto mb-5 flex flex-col items-center gap-2",
      )}
    >
      {/* Heading */}
      <div className="text-center mb-1">
        <p className="text-[0.75rem] font-semibold text-prose">
          Notifikasi Jadwal Kuliah
        </p>
        <p className="text-[0.6rem] text-prose/60 mt-0.5">
          Masukkan email kamu dan dapatkan notifikasi otomatis setiap kali
          jadwal kuliah dimulai.
        </p>
      </div>

      {/* Form — horizontal di laptop/desktop, vertikal di mobile */}
      <form
        onSubmit={handleSubmit}
        className={clsx(
          "xl:flex-row xl:w-auto",
          "lg:flex-row lg:w-auto",
          "flex flex-col w-full items-stretch gap-2",
        )}
      >
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="contoh: namakamu@gmail.com"
          disabled={status === "loading" || status === "success"}
          required
          className={clsx(
            "xl:w-80",
            "lg:w-72",
            `w-full bg-surface border rounded px-3 py-1.5 text-[0.7rem] text-prose placeholder:text-muted focus:outline-none transition-colors disabled:opacity-50 ${validationError ? "border-red-500/60 focus:border-red-400" : "border-border focus:border-accent"}`,
          )}
        />
        <button
          type="submit"
          disabled={
            !email ||
            !!validationError ||
            status === "loading" ||
            status === "success"
          }
          className={clsx(
            "xl:w-auto",
            "lg:w-auto",
            "w-full inline-flex justify-center items-center gap-1.5 font-sans text-[0.65rem] font-semibold tracking-[0.03em] py-[0.35rem] px-[0.8rem] rounded border cursor-pointer transition-all bg-(--accent-dim) border-(--accent-mid) text-accent hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          {status === "success" ? (
            <>
              <CheckCircle size={16} className="relative top-[0.5px]" />{" "}
              Terdaftar!
            </>
          ) : (
            <>
              <Bell size={16} className="relative top-[0.5px]" />{" "}
              {status === "loading" ? "Mendaftarkan..." : "Subscribe"}
            </>
          )}
        </button>
      </form>

      {/* Feedback */}
      {validationError && (
        <p className="text-[0.6rem] text-red-400">{validationError}</p>
      )}
      {!validationError && message && (
        <p
          className={`text-[0.6rem] ${status === "success" ? "text-teal" : "text-red-400"}`}
        >
          {message}
        </p>
      )}

      {/* Info */}
      {!validationError && status !== "success" && (
        <p className="text-[0.55rem] text-prose/40 text-center">
          ✦ Hanya <span className="text-prose/60">{`Gmail (@gmail.com)`}</span>{" "}
          yang diterima &nbsp;·&nbsp; Notifikasi dikirim tepat saat jam kuliah
          dimulai ✦
        </p>
      )}
    </div>
  );
}
