# Jadwal4B

Website jadwal kuliah **Kelas 4B Non-Reguler** — Prodi Teknik Informatika, Fakultas Teknologi Informasi, UNISKA Banjarmasin. Semester Genap (4) Tahun Akademik 2025/2026.

🌐 **Live:** [jadwal4b.netlify.app](https://jadwal4b.netlify.app)

---

## Fitur

- **Jam & Tanggal Real-Time** — menampilkan jam digital `HH : MM : SS` beserta tanggal hari ini dalam format Indonesia
- **Highlight Otomatis** — baris mata kuliah yang sedang berlangsung otomatis ter-highlight; sesi yang tidak aktif akan di-_dim_
- **Zoom In / Out** — tampilan jadwal bisa diperbesar atau diperkecil sesuai preferensi
- **Export PNG** — unduh jadwal sebagai gambar dengan satu klik
- **Export PDF** — unduh jadwal dalam format PDF landscape A4

---

## Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.x | App Router + TypeScript |
| [React](https://react.dev) | 19.x | — |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Tanpa `tailwind.config.js` |
| [lucide-react](https://lucide.dev) | 0.577.x | Ikon SVG |
| [html2canvas-pro](https://github.com/niklasvh/html2canvas) | 2.x | Ekspor PNG |
| [jsPDF](https://github.com/parallax/jsPDF) | 4.x | Ekspor PDF |

---

## Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata + Inter font
│   ├── page.tsx            # Entry point (server component)
│   └── globals.css         # Global styles + Tailwind + CSS variables
├── components/
│   ├── ScheduleView.tsx    # Client state manager (zoom, export, ref)
│   ├── TopBar.tsx          # Logo + kontrol zoom + tombol export
│   ├── ClockBar.tsx        # Jam & tanggal real-time
│   ├── JadwalCard.tsx      # Card jadwal utama
│   └── SesiSection.tsx     # Tabel per sesi (A / B)
├── hooks/
│   ├── useClock.ts         # Hook jam real-time (update tiap detik)
│   └── useScheduleStatus.ts# Hook status sesi & highlight row aktif
└── lib/
    └── schedule.ts         # Data jadwal + type definitions
```

---

## Menjalankan Secara Lokal

```bash
# Install dependensi
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Deploy

Proyek ini di-deploy otomatis ke **Netlify** setiap kali ada push ke branch `master`, menggunakan konfigurasi di [`netlify.toml`](netlify.toml).
