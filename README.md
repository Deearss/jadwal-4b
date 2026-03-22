# Jadwal4B

Website jadwal kuliah **Kelas 4B Non-Reguler** — Prodi Teknik Informatika, Fakultas Teknologi Informasi, UNISKA Banjarmasin. Semester Genap (4) Tahun Akademik 2025/2026.

🌐 **Live:** [jadwal4b.netlify.app](https://jadwal4b.netlify.app)

---

## Fitur

| Fitur | Keterangan |
|---|---|
| 🕐 Jam & Tanggal Real-Time | Format `HH : MM : SS` + tanggal bahasa Indonesia, update tiap detik |
| ✨ Highlight Otomatis | Baris matkul aktif ter-highlight; sesi tidak aktif di-*dim* |
| 🔍 Zoom In / Out | Tampilan jadwal bisa diperbesar (40%–200%) |
| 🖼️ Export PNG | Unduh jadwal sebagai gambar resolusi tinggi |
| 📄 Export PDF | Unduh jadwal dalam format PDF landscape A4 |
| 🔔 Notifikasi Email | Subscribe untuk mendapat notifikasi tiap kali jadwal kuliah dimulai |

---

## Tech Stack

| Teknologi | Versi |
|---|---|
| [Next.js](https://nextjs.org) | 16.x |
| [React](https://react.dev) | 19.x |
| [Tailwind CSS](https://tailwindcss.com) | 4.x |
| [lucide-react](https://lucide.dev) | 0.577.x |
| [html2canvas-pro](https://github.com/niklasvh/html2canvas) | 2.x |
| [jsPDF](https://github.com/parallax/jsPDF) | 4.x |
| [@netlify/blobs](https://docs.netlify.com/blobs/overview/) | 10.x |
| [Brevo](https://brevo.com) | API v3 |

---

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Dokumentasi

Dokumentasi lengkap tersedia di folder [`docs/`](./docs/):

| File | Isi |
|---|---|
| [`docs/arsitektur.md`](./docs/arsitektur.md) | Struktur proyek, komponen, dan sistem theming |
| [`docs/fitur.md`](./docs/fitur.md) | Penjelasan detail tiap fitur |
| [`docs/subscription.md`](./docs/subscription.md) | Fitur notifikasi email — flow, API, Brevo, Netlify Blobs |
| [`docs/pengembangan.md`](./docs/pengembangan.md) | Cara mengubah data jadwal dan panduan kontribusi |
| [`docs/deployment.md`](./docs/deployment.md) | Konfigurasi Netlify, env vars, dan scheduled function |

---

## Deploy

Proyek ini di-deploy otomatis ke **Netlify** setiap push ke branch `master`. Konfigurasi build ada di [`netlify.toml`](./netlify.toml).
