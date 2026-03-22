# Panduan Kontribusi

## Format Commit Message

Gunakan **Conventional Commits** dalam **Bahasa Indonesia**:

```
<type>: <deskripsi singkat dalam bahasa Indonesia>
```

### Tipe yang digunakan

| Tipe | Kapan dipakai |
|---|---|
| `feat` | Fitur baru |
| `fix` | Perbaikan bug |
| `style` | Perubahan tampilan/CSS (bukan logika) |
| `refactor` | Refaktor kode tanpa mengubah perilaku |
| `docs` | Perubahan dokumentasi |
| `chore` | Hal-hal teknis (update deps, config, dll) |

### Contoh

```
feat: tambah hamburger menu dan sidebar untuk tampilan mobile
fix: perbaiki tombol zoom yang terpotong di layar kecil
style: perbesar padding section unduh jadwal di sidebar
docs: tambah panduan kontribusi dan format commit
chore: install clsx dan tailwind-merge untuk utilitas cn()
```

---

## Deployment

Proyek ini di-deploy di **Netlify** secara otomatis setiap kali ada push ke branch `master`.

- **URL produksi:** https://jadwal4b.netlify.app
- **Branch deploy:** `master`
- **Build command:** `npm run build`
- **Plugin:** `@netlify/plugin-nextjs` (wajib untuk SSR & API routes)

### Environment Variables

Set di dashboard Netlify (jangan di-commit ke repo):

| Variable | Keterangan |
|---|---|
| `NEXT_PUBLIC_SUBSCRIBE_ENABLED` | `"true"` untuk aktifkan fitur subscribe |
| `BREVO_API_KEY` | API key Brevo untuk kirim email |
| `NETLIFY_BLOBS_*` | Otomatis tersedia di Netlify |

### Sebelum push, pastikan build lokal berhasil

```bash
npm run build
```

Kalau build lokal gagal, Netlify juga akan gagal deploy.
