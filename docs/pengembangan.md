# Panduan Pengembangan

## Menjalankan Secara Lokal

```bash
# Clone repo
git clone https://github.com/Deearss/jadwal-4b.git
cd jadwal-4b

# Install dependensi
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

> **Catatan:** Fitur subscription (Netlify Blobs + Brevo) tidak akan berfungsi di lokal tanpa konfigurasi tambahan. Fitur lainnya (tampilan jadwal, export, clock) berjalan normal.

### Konfigurasi `.env` Lokal

Salin `.env.example` ke `.env` dan sesuaikan nilainya:

```bash
cp .env.example .env
```

| Variable | Nilai lokal yang disarankan |
|---|---|
| `NEXT_PUBLIC_SUBSCRIBE_ENABLED` | `true` atau `false` — toggle form subscribe di UI |
| `BREVO_API_KEY` | Opsional untuk lokal; hanya dibutuhkan saat scheduled function jalan |
| `VERIFIED_SENDER_EMAIL` | Opsional untuk lokal |

---

## Mengubah Data Jadwal

Semua data jadwal ada di satu file: `src/lib/schedule.ts`

### Mengubah Tanggal Pertemuan

```ts
export const SESI_A: SesiData = {
  dates: ["2026-03-07", "2026-04-11", "2026-05-09", "2026-06-06"], // ISO
  displayDates: ["07 Mar", "11 Apr", "09 Mei", "06 Jun"],          // Tampilan UI
  // ...
};
```

- `dates` — format `YYYY-MM-DD`, digunakan untuk logika highlight otomatis
- `displayDates` — teks yang muncul di chip tanggal pada UI

Pastikan urutan `dates` dan `displayDates` selalu sinkron.

### Mengubah Mata Kuliah

```ts
rows: [
  {
    type: "class",
    start: "07:20",          // Format HH:MM
    end: "08:50",
    subject: "Cloud Computing",
    abbreviation: "CLOUD",   // Teks kecil di bawah nama matkul
    lecturer: "Herry AC, M.Kom",
  },
  { type: "ishoma", label: "ISHOMA — (12.10 - 13.00)" },
  // ...
]
```

### Menambah Sesi Baru

Saat ini hanya ada `SESI_A` dan `SESI_B`. Jika perlu menambah sesi, buat konstanta baru bertipe `SesiData` dan tambahkan ke `JadwalCard.tsx`.

---

## Mengubah Tampilan

### Warna & Theme

Semua token warna ada di `src/app/globals.css`:

```css
@theme {
  --color-accent: #d97757;  /* Ganti warna utama di sini */
  --color-bg:     #1c1b16;
  /* dst... */
}
```

### Font

Font dimuat via `next/font/google` di `src/app/layout.tsx`. Untuk mengganti font:

```ts
import { Inter } from "next/font/google";
// Ganti Inter dengan font lain, misal:
import { Plus_Jakarta_Sans } from "next/font/google";
```

### Responsivitas

Breakpoint yang digunakan mengikuti default Tailwind CSS v4:

| Nama | Min-width | Target device |
|------|-----------|---------------|
| *(base)* | — | Mobile |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |

**Pola clsx:** setiap elemen yang perlu menyesuaikan tampilan antar device menggunakan `clsx` dengan 3 parameter terpisah — masing-masing satu breakpoint:

```tsx
<div
  className={clsx(
    "xl:px-[1.8rem] xl:pt-[1.6rem]",   // desktop
    "lg:px-6 lg:pt-5",                  // laptop
    "px-4 pt-4 border-b border-border", // mobile + class statis
  )}
/>
```

**Skala font global:** root `font-size` di `globals.css` dikonfigurasi responsif sehingga seluruh nilai `rem` di komponen ikut terskala secara proporsional:

```css
@layer base {
  html { font-size: 14px; }                                     /* mobile  */
  @media (min-width: 1024px) { html { font-size: 17px; } }     /* laptop  */
  @media (min-width: 1280px) { html { font-size: 21.6px; } }   /* desktop */
}
```

**Komentar komponen:** tambahkan komentar hanya pada scope menengah ke atas (definisi komponen & blok section besar di JSX) — hindari komentar pada elemen individual agar tidak polusi.

---

## Menambah Subscriber Secara Manual

Jika perlu menambah email langsung tanpa melalui form, bisa via API:

```bash
curl -X POST https://jadwal4b.netlify.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "contoh@gmail.com"}'
```

---

## Struktur Commit

Proyek ini menggunakan format commit message deskriptif berbahasa Indonesia dengan prefix konvensional:

| Prefix | Kapan digunakan |
|---|---|
| `feat:` | Fitur baru |
| `fix:` | Perbaikan bug |
| `style:` | Perubahan tampilan/CSS |
| `refactor:` | Restrukturisasi kode |
| `docs:` | Perubahan dokumentasi |
| `chore:` | Konfigurasi, dependency, dll |
