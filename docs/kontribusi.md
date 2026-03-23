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

Lihat [`deployment.md`](./deployment.md) untuk panduan lengkap deployment, environment variables, dan cara memantau scheduled function.
