# REPORT-FIX — Preview Jalur Prestasi v2

**Komposisi:** `Preview` — 1280×720, 30fps, **6070 frame** (202,32 dtk), bisu (timing & jumlah frame TIDAK diubah; caption, narasi, dan audio rakitan dipakai ulang).
**Working folder:** `/home/hatch/workspace/agy-jalur-prestasi-fix` (arsip v1 `agy-jalur-prestasi-preview` tidak disentuh).

---

## 1. Perbaikan yang Diterapkan

### F1 — `A1_dua_papan` (40,72–74,62 dtk; f1222–2239) — WAJIB
- **Teks papan Desa Orang Dalam** (`src/preview/scenes/S02_Aturan.tsx`): menghapus baris `"LEWAT UJIAN TERBUKA"` yang berlawanan dengan narasi. Papan Orang Dalam kini hanya menampilkan `"PENGUMUMAN RESMI / LOWONGAN, BEASISWA, / JABATAN:"` dengan garis kosong netral di bawahnya. Papan kaca Desa Prestasi tetap menampilkan `"LEWAT UJIAN TERBUKA"`.
- **Teks tanda balai tumpang tindih**: memindahkan papan nama `"BALAI DESA PRESTASI"` dan `"BALAI ORANG DALAM"` ke lis atap (`y=209`) di atas papan pengumuman (`y=250`) sehingga tulisan `"BALAI ORANG DALAM"` tidak lagi menembus kertas pengumuman.
- **Sinkronisasi pan & adegan pintu belakang Pak Darma**: menggeser pan kontinu menyeberangi Jalan Tengah dari `f390..640` ke `f565..645` (59,55–62,22 dtk) agar seluruh narasi Desa Prestasi (47,67–61,90 dtk) tetap berada di sisi Prestasi, dan seluruh narasi Desa Orang Dalam (61,92–73,35 dtk; `f645..1017`) menampilkan papan Orang Dalam sekaligus Pak Darma menerima Ayah Dika + amplop tebal di pintu belakang rumahnya yang terbuka jelas.

### F2 — `T4_1_kota_surat` (151,04–155,70 dtk; f4531–4671) — WAJIB
- **Rani duduk utuh** (`src/preview/scenes/S05_Tahun4.tsx`): menaikkan Rani ke `y=300, height=232` dengan meja depan `y=488` dan buku catatan terbuka di kanan tangannya (`x=436, y=470`) sehingga kepala, badan/blus biru muda, tali tas, dan tangan menulis tampil penuh di atas meja.
- **Perspektif Dika benar**: mengecilkan Dika di baris belakang menjadi `height=144` (`y=278`, dengan ruang bersih di bawah rak kapur) dalam pose `slouch_desk` + `mood="sleep"` tertidur di bangku belakang di samping buku tertutup — jelas lebih kecil dari Rani di baris depan.
- **Papan tulis nyata**: menghapus semua 5 batang putih placeholder, diganti tulisan kapur singkat nyata (`KULIAH — KOTA`, `EKONOMI & TATA KELOLA`, `BAB 4: SUMBER DAYA DESA`) + jam dinding & pengumuman kampus kecil.

### F3 — `T2_3_kambing_amplop` (124,66–133,60 dtk; f3740–4008)
- **Artefak kuning berbentuk "L" di langit malam** (`src/preview/PixelProps.tsx`): menghapus dua `<rect>` bulan sabit kotak (`x=1070, y=24`) di `PixelSky mode="night"` yang membentuk huruf "L" kuning di pojok kanan atas langit malam, serta menyamakan `viewBox` SVG langit dengan `height`.

### F4 — Nama karangan di papan pengumuman (`T2_1` & `T2_2`) — WAJIB
- (`src/preview/scenes/S03_Tahun2_Seleksi.tsx`): menghapus semua nama karangan (`HENDRA/DEWI/AGUS/LESTARI` dan `RAKA/TONO/SINTA/BAGAS`). Papan Prestasi kini hanya menulis `1. RANI` dan papan Orang Dalam hanya menulis `1. DIKA`, dengan baris `2.`–`5.` berupa garis kosong.

### F5 — Penghalusan grafik hemat (tetap flat pixel 32-bit, palet & peta tetap)
- **Tokoh** (`src/preview/PixelCharacters.tsx`): menambahkan alis ekspresif per tokoh/mood, telinga di sisi kepala yang terbuka, bayangan pangkal hidung & dagu, tekstur highlight rambut, pose `slouch_desk`, properti `suitcase`, memperbaiki posisi pensil Bimo Tahun 4 agar rapi di belakang telinga (tidak menempel mata), serta memperbaiki lengan belakang Pak Wiryo pada `reject_point` agar menunjuk ke atas papan tanpa menutupi wajah.
- **Tidak ada tokoh tenggelam di balik perabot**: memperbaiki Dika di kantor desa (`T4_3` Cut 4, `S05_Tahun4.tsx`) yang sebelumnya tenggelam di balik papan nama meja (`y=288` → `y=248, height=244`, meja `y=468`, papan nama `"DIKA"` digeser rapi ke kanan-depan meja sehingga seragam krem Dika tampil utuh); juga memperbaiki Rani & Bimo/Sari & Dika di kelas `P2_ujian_serentak` (`S01_Pembuka.tsx`) agar duduk utuh di atas meja dan ujung pensil Bimo tidak keluar meja.
- **Latar & properti**:
  - Sawah peta (`VillageMap.tsx`) & sawah close-up Sari (`T4_3` Cut 1): variasi tone hijau per petak/teras, pematang, kilau air, rumpun padi multi-tone, serta saung & pepohonan jauh.
  - Rak toko Bimo (`T4_2_toko`): variasi lebar, tinggi, warna, tutup, dan label botol/kaleng/dus di 3 baris rak + jam dinding & kalender kecil.
  - Dinding interior: jam dinding & poster/kalender kecil di ruang kelas (`S01`), ruang kuliah (`T4_1`), kantor desa (`T4_3`), dan balai (`S03`).
  - Latar luar (A1, A2, T2_3, T2_4, T2_5, T4_1 Cut 2, T4_4): variasi halus rumpun rumput/pohon/semak tanpa mengubah komposisi peta.
  - Perbaikan tumpang-tindih minor hasil inspeksi still: margin jendela kelas (`S01`) terhadap jam/poster saat `windowShift > 0`; papan `"PASAR MINGGUAN"` (`T2_3` Cut 1) dinaikkan agar tidak tertutup kepala pembeli.

### Temuan Audit Tambahan (14 Beat Kalimat-per-Kalimat lawan Narasi)
1. **`P2_ujian_serentak` (S01)**: menyelaraskan pergantian kelas Prestasi → Orang Dalam ke lokal `f386` (20,63 dtk) tepat saat narasi masuk *"Di desa kanan, ujian ini hanya sandiwara."*
2. **`T2_1_umumkan_prestasi` (S03)**: v1 memotong ke suap Ayah Bimo pada lokal `f270` (92,66 dtk, 9 detik terlalu cepat saat narasi masih membahas Rani) dan memotong keluar ke Bimo sebelum kalimat *"ditolak mentah-mentah"* (104,9–106,3 dtk). Diselaraskan penuh:
   - `f0..432` (83,66–98,06 dtk): Rani #1 + Pak Wiryo (*"Rani... meraih nilai tertinggi. Dia menang karena dia memang paling pintar."*).
   - `f432..530` (98,06–101,33 dtk): Bimo memandang papan tanpa namanya + Ayah Bimo (*"Sementara Bimo, anak orang kaya di desa yang sama, gagal ujian."*).
   - `f530..769` (101,33–109,30 dtk): Ayah Bimo menyodorkan amplop → Pak Wiryo menolak tegas & menunjuk papan tepat di `f620` (104,3 dtk) → Ayah Bimo tertunduk malu (*"Ayahnya mencoba menyodorkan amplop ke Pak Wiryo... tapi ditolak mentah-mentah. Di sini, nilai yang berbicara."*).
3. **`T2_2_umumkan_orang_dalam` (S03)**: 5,3 detik terakhir beat ini (119,37–124,08 dtk; lokal `f302..443`) menarasikan *"Ayah Dika membayar Pak Darma, ketua panitia, lima belas juta rupiah 'uang administrasi'"*, tetapi v1 tetap menahan shot Sari di papan pengumuman. Ditambahkan Cut 2 (`f300..461`): Ayah Dika menyerahkan amplop tebal ke Pak Darma di samping meja dengan properti `"UANG ADMIN / 15 JUTA"`.
4. **`T2_3_kambing_amplop` (S03)**: batas 3 cut diselaraskan ke narasi (`f0..102` jual 2 kambing siang, `f102..192` amplop tipis malam, `f192..268` close-up laci amplop tebal + daftar tarif 15 juta).
5. **`T4_3_sawah_kantor` (S05)**: v1 melewatkan kalimat *"Sementara Dika — baru dua tahun di kota, dia gagal mengikuti pelajaran dan memilih pulang."* (176,0–181,5 dtk) dan menampilkan suap Ayah Dika 8 detik terlalu cepat. Kini dibagi 4 cut sinkron narasi:
   - `f0..260` (167,10–175,77 dtk): Sari di sawah (diperhalus).
   - `f260..415` (175,77–180,93 dtk): Dika turun dari bus `"KOTA"` di halte membawa koper pulang sendirian ke arah Desa Orang Dalam dengan ekspresi murung.
   - `f415..512` (180,93–184,17 dtk): Ayah Dika membawa amplop tebal ke rumah Pak Darma yang makin megah.
   - `f512..627` (184,17–188,01 dtk): Dika duduk utuh di meja kantor desa dengan papan nama `"DIKA"`.
6. **`VillageMap.tsx`**: rute walker warga dirapikan agar berjalan di atas jalan tanah desa (tidak menembus rumah).

---

## 2. Verifikasi Teknis & Aturan Keras
- **`npx tsc --noEmit`**: **BERSIH** (exit 0, tanpa error).
- **Kamera (`grep -rnE "step01|pxSnap" src/preview src/PreviewVideo.tsx`)**: **KOSONG** — seluruh gerak kamera interpolasi kontinu + easing (`SmoothCamera` / `interpolate` + `Easing`).
- **Komposisi & timing**: `Preview` 1280×720, 30fps, **6070 frame** (utuh).
- **Aturan keras**: satu dunia + satu jalan tengah (tanpa split screen), tanpa pabrik di preview, tanpa grafik/chart/HUD/teks melayang, skor hanya di papan skor kayu (kosong di A2, `44`–`43` di Tahun 2, `51`–`48` di Tahun 4), kontinuitas kandang kambing (4 sebelum T2_3 → 2 di T2_5 & T4_4).

---

## 3. Daftar Stills (`qc-preview/`) — Semua Diperiksa Visual

### 14 Beat Stills (frame sama seperti v1)
1. `01_P1_peta_lahir.png` (f195) — Peta satu dunia simetris, palet hangat identik, sawah bertone variatif, papan nama desa, 4 kambing di kandang Bu Endang. **LOLOS.**
2. `02_P2_ujian_serentak.png` (f513) — Kelas Desa Prestasi: Rani & Bimo duduk utuh di atas meja (pensil rapi di meja), amplop soal bersegel merah, pengawas pria berkacamata, jam & poster dinding. **LOLOS.**
3. `03_P3_tebakan.png` (f793) — Close-up Rani (kepang, blus biru muda, nama `"RANI"` di lembar ujian, amplop bersegel), detail wajah/alis rapi. **LOLOS.**
4. `04_A1_dua_papan.png` (f2042) — **F1 TERPERBAIKI:** papan `"BALAI ORANG DALAM"` rapi di atap (tanpa bleed), papan pengumuman tanpa `"LEWAT UJIAN TERBUKA"`, Pak Darma menerima Ayah Dika + amplop tebal di pintu belakang. **LOLOS.**
5. `05_A2_papan_skor.png` (f2379) — Papan skor kayu di Jalan Tengah dengan keping tahun & angka KOSONG, lapangan perbatasan kosong tanpa pabrik. **LOLOS.**
6. `06_T2_1_umumkan_prestasi.png` (f2920) — **F4 + SINKRON NARASI:** Rani terkejut bahagia & Pak Wiryo menunjuk papan `"1. RANI"` (tanpa nama karangan, baris 2–5 garis kosong), cocok dengan narasi 97,3 dtk. **LOLOS.**
7. `07_T2_2_umumkan_orang_dalam.png` (f3519) — **F4 TERPERBAIKI:** Sari menelusuri papan `"1. DIKA"` (tanpa nama karangan) dengan Bu Endang di belakangnya, ekspresi alis sedih terbaca jelas. **LOLOS.**
8. `08_T2_3_kambing_amplop.png` (f3965) — Close-up laci kayu Pak Darma: tangan bercincin akik memasukkan amplop tebal di atas amplop tipis Bu Endang, daftar tarif `"Uang administrasi 15 juta"`. **LOLOS.**
9. `09_T2_4_papan_skor.png` (f4173) — Papan skor `"TAHUN 2"`: `44` lawan `43`, palet kedua desa masih identik hangat. **LOLOS.**
10. `10_T2_5_bus_yang_sama.png` (f4409) — Satu shot lebar: bus `"KOTA"` (Rani & Dika di jendela), ibu Rani melambai, ayah Dika berkacamata hitam, Sari bercaping menggembala 2 kambing sisa di tepi jalan. **LOLOS.**
11. `11_T4_1_kota_surat.png` (f4636) — Tukang pos bersepeda mengantar surat ke beranda ibu Rani yang tersenyum dengan tumpukan surat bulanan (rumah cat baru Tahun 4). **LOLOS.**
12. `12_T4_2_toko.png` (f4851) — **F5 TERPERBAIKI:** Bimo bercelemek hijau dengan pensil rapi di belakang telinga, rak toko bervariasi ukuran/warna/label, jam & kalender dinding, `BUKU STOK`, kalkulator, kembalian. **LOLOS.**
13. `13_T4_3_sawah_kantor.png` (f5533) — **F5 TERPERBAIKI:** Dika duduk utuh (tidak tenggelam) berseragam krem di `KANTOR DESA ORANG DALAM`, papan nama `"DIKA"` di kanan-depan meja, map merah tertutup, jam & kalender dinding. **LOLOS.**
14. `14_T4_4_papan_skor.png` (f5770) — Papan skor `"TAHUN 4"`: `51` lawan `48`, beda tipis Tahun 4 terlihat (rumah Prestasi cat putih baru di kiri, pagar miring di kanan). **LOLOS.**

### 5 Extra Stills (`qc-preview/`)
- `P3_bimo.png` (f911) — Close-up Bimo (rambut ikal, polo putih, alis murung, lembar `"BIMO"`), siluet jelas beda. **LOLOS.**
- `P3_sari.png` (f1034) — Close-up Sari (kulit gelap, poni + jepit kuning, tahi lalat, kaos mustard, lembar `"SARI"`), jendela/jam/poster tidak bertabrakan. **LOLOS.**
- `P3_dika.png` (f1157) — Close-up Dika (wajah panjang, rambut klimis, batik merah-emas, senyum sombong, lembar `"DIKA"`). **LOLOS.**
- `T2_3_goats.png` (f3795) — Bu Endang menuntun 2 kambing bertali menuju `"PASAR MINGGUAN"` (papan nama pasar 100% terbaca, tidak tertutup pembeli). **LOLOS.**
- `T4_4_wide_map.png` (f6040) — Peta lebar Tahun 4: rumah Toko Bimo cat putih baru, rumah Pak Darma makin mewah berlist emas, pagar miring di rumah Udin, kandang Bu Endang tinggal 2 kambing, lapangan perbatasan kosong (tanpa pabrik), skor `51`–`48`. **LOLOS.**

### Sub-shot Diagnostik Tambahan (juga diperiksa visual di scratch)
- `diag_A1_prestasi` (f1472): Papan kaca Prestasi `"LEWAT UJIAN TERBUKA"` + `"BALAI DESA PRESTASI"` di atap, Pak Wiryo & warga. **LOLOS.**
- `diag_T2_1_reject` (f3170): Pak Wiryo menolak amplop Ayah Bimo (`reject_point` lengan belakang tidak menutupi wajah) + papan `"1. RANI"` bebas nama karangan. **LOLOS.**
- `diag_T2_2_pay` (f3659): Ayah Dika menyerahkan amplop tebal ke Pak Darma + properti `"UANG ADMIN / 15 JUTA"`. **LOLOS.**
- `diag_T2_3_night` (f3885): **F3 TERPERBAIKI:** langit malam berbintang bersih TANPA artefak kuning "L", Bu Endang menyerahkan amplop tipis di pintu Pak Darma. **LOLOS.**
- `diag_T4_1_lecture` (f4561): **F2 TERPERBAIKI:** Rani duduk utuh mencatat di baris depan, Dika jauh lebih kecil tertidur di bangku belakang, papan tulis berisi teks kapur nyata (`KULIAH — KOTA` / `EKONOMI & TATA KELOLA` / `BAB 4: SUMBER DAYA DESA`). **LOLOS.**
- `diag_T4_3_sawah` (f5133): **F5 TERPERBAIKI:** Sawah terasering multi-tone hijau, rumpun padi, kilau air, saung & pohon jauh, Sari bercaping. **LOLOS.**
- `diag_T4_3_dika_home` (f5348): Dika turun dari bus `"KOTA"` di halte membawa koper pulang ke Desa Orang Dalam. **LOLOS.**

---

## 4. Masalah yang Belum Selesai
- Tidak ada cacat kode, TypeScript, atau QC visual yang tersisa pada 14 beat Preview v2.
- Tahap lanjutan (di luar cakupan tugas ini — sengaja tidak dijalankan): dispatch render video penuh di GitHub Actions dan perakitan audio/caption.
