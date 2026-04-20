# 🎓 Pengumuman Kelulusan BEM KEMAKOM 2026/2027

Website resmi pengumuman penerimaan pengurus BEM KEMAKOM (Keluarga Mahasiswa Komputer) Universitas Pendidikan Indonesia periode 2026/2027. Dibangun dengan fokus utama pada antarmuka pengguna (UI) yang memukau, responsif, dan kaya akan *micro-interactions*.

## ✨ Fitur Utama

- **Sistem Dua Fase (Two-Phase System):**
  - **Fase 1:** Hitung mundur (*countdown*) modern diikuti dengan fitur pencarian NIM untuk melihat status penerimaan.
  - **Fase 2:** Pengumuman penempatan Divisi (*Coming Soon / Countdown*).
- **Desain Premium & Modern:** Mengusung tema *Light* yang segar dipadukan dengan gaya *Glassmorphism*, palet warna yang kohesif (hijau & emas), dan layout berbasis kartu (*Card-based layout*).
- **Animasi Super Interaktif (Micro-animations):** Hampir setiap elemen interaktif (tombol, input, kartu) dilengkapi dengan animasi transisi, *hover scale*, *sliding gradient*, dan efek kilauan (*shimmer*).
- **Optimasi Layar Sentuh (Mobile-First):** Efek animasi dinamis (*floating & pulsing*) yang secara otomatis aktif di perangkat seluler untuk menggantikan ketiadaan *hover state* pada layar sentuh.
- **Latar Belakang 3D Interaktif:** Menggunakan partikel 3D ringan yang bereaksi terhadap pergerakan kursor (*React Three Fiber*).
- **Konfigurasi Terpusat:** Seluruh pengaturan waktu rilis pengumuman, organisasi, dan kontak WhatsApp dapat diubah dari satu file konfigurasi (`config.ts`).

## 🛠️ Teknologi yang Digunakan

- **Framework & Language:** React + TypeScript (via Vite)
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, Animasi Keyframes kompleks)
- **Animasi Lanjutan:** GSAP (GreenSock) untuk *entrance animations*.
- **Grafik 3D:** Three.js & @react-three/fiber
- **Ikon:** Lucide-React

## 📂 Struktur Penting

```text
├── public/                 # Aset statis (Logo BEM, good-job.png, favicon)
├── src/
│   ├── components/         # Komponen UI (Navbar, ResultCard, Footer, Background3D, dll)
│   ├── data/
│   │   └── students.json   # Basis data statis untuk pencarian NIM kandidat
│   ├── App.tsx             # Logika utama rendering fase dan state aplikasi
│   ├── config.ts           # ⚙️ FILE PENGATURAN UTAMA (Tanggal fase, info kontak, dll)
│   └── index.css           # Variabel global CSS dan reset
```

## 🚀 Panduan Menjalankan Secara Lokal

1. **Clone repositori ini**
   ```bash
   git clone <url-repo-anda>
   cd Website_Pengumuman_BEM_KEMAKOM_2026
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

## ⚙️ Cara Mengatur Waktu Pengumuman (Deployment)

Seluruh logika situs dikendalikan dari file `src/config.ts`. Anda **tidak perlu** mengotak-atik kode komponen untuk mengubah jadwal pengumuman.

Buka `src/config.ts` dan atur variabel berikut:

```typescript
// Tanggal input NIM dibuka
PHASE_1_TARGET_DATE: "2026-04-21T15:30:00+07:00",

// Tanggal pengumuman divisi dibuka (Jika isPhase2Active: true)
PHASE_2_TARGET_DATE: "2026-04-26T15:30:00+07:00",
isPhase2Active: false, // Ubah ke true jika sudah waktunya
```
*Catatan: Pastikan waktu menggunakan format zona waktu WIB (`+07:00`). Setelah mengubah `config.ts`, Anda harus melakukan *re-build* dan *re-deploy* karena data tanggal dikompilasi ke dalam bundle statis.*

## 📝 Format Data Mahasiswa (`students.json`)

Data kelulusan dibaca dari `src/data/students.json`. Pastikan format array JSON seperti berikut:
```json
[
  {
    "nim": "2408622",
    "nama": "Iqbal Rizky Maulana",
    "program_studi": "Ilmu Komputer",
    "angkatan": "2024",
    "status_diterima": true,
    "penempatan_divisi": null
  }
]
```

## 🌐 Build untuk Produksi

```bash
npm run build
```
Folder `dist/` akan dihasilkan dan siap untuk di-host pada platform static hosting seperti Vercel, Netlify, atau GitHub Pages.

---
**Dibuat untuk BEM KEMAKOM Periode 2026/2027.**
