# Dokumentasi Fitur

## 1. Jam & Tanggal Real-Time

Ditampilkan di bagian atas halaman dalam format besar.

- **Format jam:** `HH : MM : SS` — separator `:` berkedip tiap detik
- **Format tanggal:** Bahasa Indonesia, contoh: `Minggu, 22 Maret 2026`
- **Update interval:** setiap 1 detik via `setInterval`
- **Timezone:** lokal browser pengguna

**File terkait:**
- `src/hooks/useClock.ts` — hook yang mengelola state waktu
- `src/components/ClockBar.tsx` — komponen tampilan

---

## 2. Highlight Jadwal Aktif

Sistem otomatis mendeteksi sesi dan mata kuliah yang sedang berlangsung.

- **Highlight baris:** baris matkul yang sedang berlangsung diberi background oranye
- **Dimming sesi:** sesi yang **tidak** aktif hari ini akan di-*dim* (opacity rendah)
- **Logika penentuan:**
  - Cek apakah tanggal hari ini ada di `SESI_A.dates` atau `SESI_B.dates`
  - Cek apakah jam sekarang berada di antara `start` dan `end` suatu matkul

**File terkait:**
- `src/hooks/useScheduleStatus.ts` — logika pengecekan sesi & baris aktif
- `src/lib/schedule.ts` — sumber data tanggal dan jam matkul

---

## 3. Export PNG

Mengunduh jadwal sebagai gambar PNG resolusi tinggi.

- **Library:** `html2canvas-pro` v2.x
- **Scale:** 3× (untuk resolusi tinggi)
- **Nama file:** `jadwal-TI-4B-2025-2026.png`
- **Proses:** render `JadwalCard` ke canvas → convert ke data URL → trigger download

---

## 4. Export PDF

Mengunduh jadwal dalam format PDF landscape A4.

- **Library:** `jsPDF` v4.x
- **Orientasi:** landscape A4
- **Scale render:** 2× (keseimbangan kualitas vs ukuran file)
- **Nama file:** `jadwal-TI-4B-2025-2026.pdf`
- **Proses:** render ke canvas → embed sebagai gambar di PDF → save

> Kedua fitur export menggunakan **dynamic import** agar library berat tidak dimuat saat halaman pertama kali dibuka.

---

## 5. Notifikasi Email (Subscribe)

Lihat dokumentasi lengkap di [`subscription.md`](./subscription.md).
