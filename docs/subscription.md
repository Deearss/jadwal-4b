# Fitur Notifikasi Email (Subscription)

## Gambaran Umum

User bisa mendaftarkan email Gmail mereka untuk menerima notifikasi otomatis setiap kali jadwal kuliah dimulai. Notifikasi dikirim tepat saat jam matkul mulai.

## Flow Lengkap

```
[User buka website]
        │
        ▼
[Isi email di SubscribeForm → klik Subscribe]
        │
        ▼
[POST /api/subscribe]
        │
        ▼
[Validasi email (format + harus @gmail.com)]
        │
        ▼
[Simpan email ke Netlify Blobs]
        │
        · · · (menunggu hari kuliah) · · ·
        │
        ▼
[Netlify Scheduled Function — jalan tiap menit]
        │
        ├─ Cek: apakah hari ini tanggal kuliah?
        │         └─ Tidak → berhenti
        │
        ├─ Cek: ada matkul yang mulai tepat sekarang (WIB)?
        │         └─ Tidak → berhenti
        │
        ├─ Cek: notifikasi ini sudah pernah dikirim?
        │         └─ Sudah → berhenti (cegah duplikat)
        │
        ├─ Ambil daftar email dari Netlify Blobs
        │
        └─ Kirim email via Brevo API ke semua subscriber
```

## Komponen Teknis

### Penyimpanan Email — Netlify Blobs

Email subscriber disimpan sebagai JSON array di Netlify Blobs (key-value store bawaan Netlify, gratis):

| Key | Value | Keterangan |
|---|---|---|
| `subscribers` | `["a@gmail.com", "b@gmail.com"]` | Daftar semua email |
| `sent-YYYY-MM-DD-HH:MM` | `"done"` | Pencegah duplikat per matkul per hari |

### API Endpoints

**`POST /api/subscribe`**
```json
// Request body
{ "email": "namakamu@gmail.com" }

// Response sukses
{ "message": "Berhasil subscribe!" }

// Response error
{ "error": "Hanya Gmail (@gmail.com) yang diterima." }
```

**`GET /api/unsubscribe?email=namakamu@gmail.com`**
- Dipanggil via link di dalam email notifikasi
- Menghapus email dari daftar subscriber
- Mengembalikan plain text konfirmasi

### Scheduled Function

File: `netlify/functions/send-notifications.mts`

- **Jadwal:** setiap menit (`* * * * *`)
- **Timezone:** konversi UTC → WIB (UTC+7) secara manual
- **Pencegahan duplikat:** sebelum kirim, simpan key `sent-{date}-{time}` ke Blobs; jika key sudah ada, function berhenti

### Email Service — Brevo

| Parameter | Nilai |
|---|---|
| API Endpoint | `https://api.brevo.com/v3/smtp/email` |
| Free tier | 300 email/hari, 9.000/bulan |
| Sender name | Jadwal4B |
| Sender email | Dikonfigurasi via env var `VERIFIED_SENDER_EMAIL` |

### Environment Variables

Disimpan di Netlify (bukan di-commit ke repo). Lihat `.env.example` untuk template lengkap.

| Variable | Keterangan |
|---|---|
| `NEXT_PUBLIC_SUBSCRIBE_ENABLED` | `"true"` untuk mengaktifkan seluruh fitur subscribe; nilai lain = nonaktif |
| `BREVO_API_KEY` | API key Brevo (secret) |
| `VERIFIED_SENDER_EMAIL` | Email pengirim yang sudah diverifikasi di Brevo |

## Toggle Fitur Subscribe

Seluruh fitur subscribe (form UI, API subscribe/unsubscribe, scheduled email) dapat dimatikan sekaligus dengan satu env var:

```
NEXT_PUBLIC_SUBSCRIBE_ENABLED=true   # aktif
NEXT_PUBLIC_SUBSCRIBE_ENABLED=false  # nonaktif (atau hapus variabelnya)
```

**Efek saat dinonaktifkan (`false` atau tidak di-set):**
- Form subscribe tidak muncul di halaman
- `POST /api/subscribe` mengembalikan `503`
- `GET /api/unsubscribe` mengembalikan `503`
- Scheduled function `send-notifications` langsung berhenti tanpa kirim email

**Cara menonaktifkan di Netlify:**
1. Buka [app.netlify.com/projects/jadwal4b](https://app.netlify.com/projects/jadwal4b)
2. Masuk ke **Site configuration → Environment variables**
3. Ubah nilai `NEXT_PUBLIC_SUBSCRIBE_ENABLED` menjadi `false`
4. Trigger redeploy

## Validasi Email

Validasi dilakukan di **dua lapis**:

**Frontend (SubscribeForm.tsx)** — real-time saat user mengetik:
1. Email harus mengandung `@`
2. Email harus diakhiri `@gmail.com`
3. Format karakter harus valid (regex)

**Backend (/api/subscribe)** — sebelum data disimpan:
1. Regex validation sebagai safety net

> Validasi bahwa email Gmail benar-benar *ada* (backend verification ke Google) belum diimplementasi dan direncanakan sebagai peningkatan berikutnya.

## Kapasitas

| Kondisi | Jumlah email/hari |
|---|---|
| 30 subscriber × 6 matkul (Sesi A) | 180 email |
| 30 subscriber × 4 matkul (Sesi B) | 120 email |
| **Limit Brevo free tier** | **300 email/hari** |

Dengan asumsi seluruh 30 mahasiswa subscribe, kapasitas masih aman di bawah limit.

## Cara Menguji

**Tanpa menunggu hari kuliah:**

1. Tambahkan tanggal hari ini sementara ke `SESI_A.dates` atau `SESI_B.dates` di `src/lib/schedule.ts`
2. Ubah waktu salah satu matkul ke menit berikutnya
3. Push dan tunggu scheduled function berjalan
4. Kembalikan perubahan setelah selesai tes

**Via Netlify Dashboard:**
1. Buka `app.netlify.com/projects/jadwal4b`
2. Masuk ke tab **Functions**
3. Pilih `send-notifications` → klik **Trigger function**
