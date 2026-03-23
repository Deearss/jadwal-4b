# Arsitektur Proyek

## Tech Stack

| Teknologi | Versi | Peran |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.x | Framework utama — App Router + TypeScript |
| [React](https://react.dev) | 19.x | UI library |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Styling — tanpa `tailwind.config.js` |
| [lucide-react](https://lucide.dev) | 0.577.x | Ikon SVG |
| [html2canvas-pro](https://github.com/niklasvh/html2canvas) | 2.x | Ekspor jadwal ke PNG |
| [jsPDF](https://github.com/parallax/jsPDF) | 4.x | Ekspor jadwal ke PDF |
| [@netlify/blobs](https://docs.netlify.com/blobs/overview/) | 10.x | Penyimpanan email subscriber (key-value store) |
| [Brevo](https://brevo.com) | API v3 | Pengiriman email notifikasi |

## Struktur Folder

```
jadwal-4b/
├── docs/                          # Dokumentasi proyek
├── netlify/
│   └── functions/
│       └── send-notifications.mts # Scheduled function (cron tiap menit)
├── public/
│   └── images/
│       └── fti-uniska-logo.png    # Logo FTI UNISKA
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── subscribe/
│   │   │   │   └── route.ts       # POST — simpan email subscriber
│   │   │   └── unsubscribe/
│   │   │       └── route.ts       # GET — hapus email subscriber
│   │   ├── globals.css            # Global styles + Tailwind + CSS variables
│   │   ├── layout.tsx             # Root layout + metadata + Inter font
│   │   └── page.tsx               # Entry point (server component)
│   ├── components/
│   │   ├── ClockBar.tsx           # Jam & tanggal real-time
│   │   ├── JadwalCard.tsx         # Card jadwal utama (Sesi A & B)
│   │   ├── ScheduleView.tsx       # Client state manager (zoom, export, ref)
│   │   ├── SesiSection.tsx        # Tabel per sesi lengkap dengan ISHOMA
│   │   ├── SubscribeForm.tsx      # Form subscribe notifikasi email
│   │   └── TopBar.tsx             # Logo + kontrol zoom + tombol export
│   ├── hooks/
│   │   ├── useClock.ts            # Jam real-time (update tiap detik)
│   │   └── useScheduleStatus.ts   # Status sesi aktif + highlight baris
│   └── lib/
│       └── schedule.ts            # Data jadwal + type definitions
├── netlify.toml                   # Konfigurasi build & scheduled function
└── .vscode/
    └── settings.json              # Nonaktifkan false positive CSS linter
```

## Alur Render

```
app/page.tsx (Server Component)
  └── ScheduleView.tsx (Client Component)
        ├── TopBar.tsx          — logo, zoom, export
        ├── ClockBar.tsx        — jam + tanggal real-time
        ├── SubscribeForm.tsx   — form email subscribe
        └── JadwalCard.tsx      — card jadwal (forwardRef untuk export)
              ├── SesiSection (Sesi A)
              └── SesiSection (Sesi B)
```

## CSS & Theming

Tailwind v4 digunakan **tanpa** `tailwind.config.js`. Semua custom token warna didefinisikan di `globals.css` menggunakan `@theme`:

```css
@theme {
  --color-accent: #d97757;  /* oranye — warna utama */
  --color-prose:  #e8e4d8;  /* teks utama */
  --color-muted:  #6b6756;  /* teks sekunder */
  /* dst... */
}
```

Variabel berbasis `rgba` (yang tidak bisa masuk `@theme`) diletakkan di `:root` biasa.

Untuk konvensi responsivitas (breakpoint, pola `clsx`, skala font), lihat bagian **Responsivitas** di [`pengembangan.md`](./pengembangan.md).
