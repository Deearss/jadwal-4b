# Panduan Deployment

## Platform

Proyek ini di-deploy ke **Netlify** dengan integrasi GitHub. Setiap push ke branch `master` akan otomatis memicu build dan deploy baru.

🌐 **URL Produksi:** [jadwal4b.netlify.app](https://jadwal4b.netlify.app)

---

## Konfigurasi Build

File: `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"

[functions."send-notifications"]
  schedule = "* * * * *"
```

| Bagian | Keterangan |
|---|---|
| `command` | Perintah build Next.js |
| `publish` | Folder output Next.js |
| `@netlify/plugin-nextjs` | Plugin wajib agar Next.js berjalan di Netlify (SSR, API routes) |
| `node_bundler = "esbuild"` | Bundler untuk Netlify Functions |
| `schedule = "* * * * *"` | Scheduled function jalan tiap menit |

---

## Environment Variables

Diset langsung di Netlify Dashboard (tidak di-commit ke repo).

| Variable | Scope | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SUBSCRIBE_ENABLED` | Runtime | `"true"` untuk mengaktifkan fitur subscribe; nilai lain = nonaktif |
| `BREVO_API_KEY` | Functions, Runtime | API key Brevo — ditandai sebagai **secret** |
| `VERIFIED_SENDER_EMAIL` | Functions, Runtime | Email pengirim notifikasi yang diverifikasi di Brevo |

**Cara menambah/mengubah env var:**
1. Buka [app.netlify.com/projects/jadwal4b](https://app.netlify.com/projects/jadwal4b)
2. Masuk ke **Site configuration → Environment variables**
3. Tambah atau edit variable yang diperlukan
4. Trigger redeploy agar perubahan aktif

---

## Netlify Blobs

Digunakan untuk menyimpan daftar email subscriber. Tidak memerlukan konfigurasi tambahan — otomatis tersedia di environment Netlify.

Data tersimpan di store bernama `jadwal4b` dengan dua jenis key:
- `subscribers` — JSON array email
- `sent-{YYYY-MM-DD}-{HH:MM}` — penanda notifikasi sudah terkirim

---

## Scheduled Function

Function `send-notifications` berjalan otomatis setiap menit di server Netlify. Tidak memerlukan trigger manual di kondisi normal.

**Memantau eksekusi:**
1. Buka [app.netlify.com/projects/jadwal4b](https://app.netlify.com/projects/jadwal4b)
2. Masuk ke tab **Functions**
3. Pilih `send-notifications` untuk melihat log eksekusi

**Trigger manual (untuk testing):**
Di halaman function yang sama, klik tombol **Trigger function**.

---

## Deploy Manual

Jika perlu deploy ulang tanpa push kode baru:

```bash
# Via Netlify CLI (jika sudah ter-install)
netlify deploy --prod
```

Atau via dashboard: **Deploys → Trigger deploy → Deploy site**.
