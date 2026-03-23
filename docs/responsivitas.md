# Standar Responsivitas

Dokumen ini mendefinisikan konvensi yang dipakai untuk mengatur responsivitas tampilan di seluruh komponen proyek ini.

---

## Breakpoint

Mengikuti breakpoint default Tailwind CSS v4:

| Nama | Min-width | Target device |
|------|-----------|---------------|
| *(base)* | — | Mobile |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |

---

## Konvensi clsx

Setiap elemen yang perlu menyesuaikan tampilannya antar device menggunakan `clsx` dengan **3 parameter terpisah** — masing-masing satu breakpoint:

```tsx
import clsx from "clsx";

<div
  className={clsx(
    "xl:px-[1.8rem] xl:pt-[1.6rem]",   // desktop
    "lg:px-6 lg:pt-5",                  // laptop
    "px-4 pt-4 border-b border-border", // mobile + class statis
  )}
/>
```

**Aturan:**
- Parameter 1 → class prefixed `xl:` (desktop)
- Parameter 2 → class prefixed `lg:` (laptop)
- Parameter 3 → class tanpa prefix (mobile) + class statis yang tidak berubah antar breakpoint

Jika sebuah elemen tidak perlu responsive, cukup gunakan `className="..."` biasa — tidak perlu `clsx`.

---

## Skala Font Global

Root `font-size` di `globals.css` dikonfigurasi responsif sehingga **seluruh nilai `rem`** di komponen ikut terskala secara proporsional tanpa perlu mengubah tiap komponen:

```css
/* src/app/globals.css */
@layer base {
  html { font-size: 14px; }                          /* mobile  */
  @media (min-width: 1024px) { html { font-size: 17px; } }    /* laptop  */
  @media (min-width: 1280px) { html { font-size: 21.6px; } }  /* desktop */
}
```

Karena semua ukuran di komponen menggunakan satuan `rem` (contoh: `text-[0.82rem]`, `px-[1.8rem]`), mengubah satu nilai `font-size` pada `html` sudah cukup untuk menskalakan keseluruhan layout.

---

## Komentar Komponen

Komentar ditambahkan hanya pada **scope menengah ke atas** untuk menghindari polusi komentar:

- ✅ Komponen utama (definisi `const` / `function`)
- ✅ Blok section besar di dalam JSX (header, footer, sesi, dll.)
- ❌ Elemen individual seperti `<span>`, `<td>`, class styling
