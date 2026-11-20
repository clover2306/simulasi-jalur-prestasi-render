# REPORT-MG — Score Motion Graphics (Preview Jalur Prestasi v2)

**Komposisi:** `Preview` — 1280×720, 30fps, **6070 frame** (202,32 dtk), bisu (timing, jumlah frame, narasi, caption, dan audio rakitan TIDAK diubah).
**Working folder:** `/home/hatch/workspace/agy-jalur-prestasi-mg`

---

## 1. Apa yang Ditambahkan

Motion graphic ditambahkan **hanya** pada dua beat skor sesuai `BRIEF-MG.md` dan sepenuhnya menempel secara fisik di **papan skor kayu** (bukan HUD melayang, tanpa chart/diagram, tanpa angka tambahan):

1. **`WoodenScoreboard` (`src/preview/PixelProps.tsx`)**
   - Menambahkan prop opsional `mg?: ScoreboardMgProps` (jika tidak diberikan, seperti di `A2_papan_skor`, papan skor dirender 100% identik tanpa bar maupun tag).
   - **Bar perbandingan tertanam di papan kayu:** dua alur kayu gelap (`#362618`, border `#1E1A16`) tepat di bawah keping angka kiri dan kanan. Bar kiri (Prestasi) memakai warna emas hangat papan (`PAL.gold` `#E8B838` + bevel `#F7DF84`/`#B3861E`) dan bar kanan (Orang Dalam) memakai terakota atap papan (`#C45A40` + bevel `#DD7E64`/`#8E3C2A`), bertumbuh kontinu secara linear (`score / 54`, tanpa kuantisasi) mengikuti angka yang sedang naik.
   - **Tag kecil `"SELISIH 1"` / `"SELISIH 3"`:** papan slat kayu kecil yang digantung dengan dua cincin besi tepat di bawah tepi papan skor di antara kedua tiang kaki, memakai font `Press Start 2P` (`PIXEL_FONT`) dan palet kayu-krem yang sama persis dengan keping tahun papan.
   - **Landing pulse halus:** penekanan skala kontinu kecil (`1.0 → 1.06 → 1.0`) pada keping angka saat hitungan berhenti di angka akhir.

2. **`T2_4_papan_skor` (`src/preview/scenes/S04_Tahun2_SkorBus.tsx`, f4008–4254, dur 246)**
   - Disinkronkan ke timestamp kata `transcript_words.json` (*"skornya [loc 76..95] 44 [95..116] lawan [116..128] 43 [128..143]. Hampir sama [161..182]."*):
     - Keping & bar kiri (Prestasi): menghitung naik kontinu `0 → 44` pada lokal `f82..116` (`Easing.out(Easing.cubic)`).
     - Keping & bar kanan (Orang Dalam): menghitung naik kontinu `0 → 43` pada lokal `f114..145` (`Easing.out(Easing.cubic)`), berhenti sedikit lebih pendek dari Prestasi (selisih 1).
     - Tag kayu `"SELISIH 1"`: muncul dengan pop halus di bawah papan pada lokal `f148..164` (`popInPlace` `Easing.out(Easing.back(1.7))` + `fadeIn`).
   - Palet Tahun 2 kedua desa tetap identik hangat; kamera zoom kontinu halus tetap utuh.

3. **`T4_4_papan_skor` (`src/preview/scenes/S05_Tahun4.tsx`, f5640–6070, dur 430) & kontinuitas peta (`src/preview/VillageMap.tsx`)**
   - Disinkronkan ke timestamp kata `transcript_words.json` (*"skornya [loc 39..54] 51 [54..71] lawan [71..78] 48 [78..95], selisihnya masih kecil [115..149]."*):
     - Keping & bar kiri (Prestasi): menghitung naik kontinu `0 → 51` pada lokal `f42..72` (`Easing.out(Easing.cubic)`).
     - Keping & bar kanan (Orang Dalam): menghitung naik kontinu `0 → 48` pada lokal `f68..97` (`Easing.out(Easing.cubic)`), berhenti jelas lebih pendek dari Prestasi (selisih 3).
     - Tag kayu `"SELISIH 3"`: muncul dengan pop halus di bawah papan pada lokal `f102..118` (`popInPlace` + `fadeIn`).
   - Pada `VillageMap.tsx` khusus `scoreMode="y4"` (hanya dipakai saat zoom-out penutup `T4_4_papan_skor` mulai lokal `f210`), papan skor kayu di jalan tengah ikut menampilkan bar final `51`/`48` dan tag `"SELISIH 3"` agar transisi crossfade + zoom-out ke peta lebar tetap mulus dan konsisten.

---

## 2. Verifikasi Teknis & Aturan Keras

- **`npx tsc --noEmit`**: **BERSIH** (exit 0, 0 error).
- **Kamera & animasi (`grep -rnE "step01|pxSnap" src/preview src/PreviewVideo.tsx`)**: **KOSONG** — seluruh gerak kamera, count-up, bar, dan pop tag memakai `interpolate` + `Easing` kontinu tiap frame.
- **Aturan keras**:
  - Satu dunia, dua desa bertetangga, satu jalan tengah, tanpa pabrik.
  - Tidak ada grafik/chart/diagram/HUD/teks melayang; seluruh MG menempel pada properti papan skor kayu.
  - Skor hanya `44`–`43` (Tahun 2) dan `51`–`48` (Tahun 4), font `Press Start 2P`, palet sama dengan papan skor.
  - Komposisi tetap `Preview`, 1280×720, 30fps, **6070 frame**; 12 beat lainnya tidak disentuh.

---

## 3. Daftar Stills (`qc-preview/`) — Semua Diperiksa Visual

- `qc-preview/T2_4_mg_countup.png` (f4128, loc 120, 137,60 dtk) — Tengah count-up Tahun 2: Prestasi sudah mendarat di `44` dengan bar emas penuh, Orang Dalam sedang menghitung naik di `20` dengan bar terakota bertumbuh di tengah alur, tag belum muncul. **LOLOS.**
- `qc-preview/09_T2_4_papan_skor.png` (f4173, loc 165, 139,10 dtk) — Beat still Tahun 2 / f4173: skor akhir `44` lawan `43`, bar Prestasi sedikit lebih panjang dari Orang Dalam, tag kayu `"SELISIH 1"` muncul rapi di bawah papan di antara dua kaki kayu, palet Tahun 2 identik hangat. **LOLOS.**
- `qc-preview/T4_4_mg_countup.png` (f5718, loc 78, 190,60 dtk) — Tengah count-up Tahun 4: Prestasi mendarat di `51` dengan bar emas penuh, Orang Dalam sedang menghitung naik di `35` dengan bar terakota bertumbuh, tag belum muncul. **LOLOS.**
- `qc-preview/14_T4_4_papan_skor.png` (f5770, loc 130, 192,33 dtk) — Beat still Tahun 4: skor akhir `51` lawan `48`, bar Prestasi tampak jelas lebih panjang dari Orang Dalam (selisih 3), tag kayu `"SELISIH 3"` terpasang rapi di bawah papan, beda tipis palet Tahun 4 terlihat. **LOLOS.**
- `qc-preview/T4_4_mg_5900.png` (f5900, loc 260, 196,67 dtk) — Frame f5900 saat kamera zoom-out halus ke peta Tahun 4: papan skor kayu di tengah jalan tetap menampilkan `51` lawan `48`, dua bar perbandingan, dan tag `"SELISIH 3"` secara konsisten di tengah satu dunia tanpa pabrik. **LOLOS.**
- `qc-preview/T4_4_wide_map.png` (f6040, loc 400, 201,33 dtk) — Penutup peta lebar Tahun 4: kedua desa, rumah Prestasi cat putih baru, pagar miring Orang Dalam, 2 kambing di kandang Bu Endang, lapangan kosong tanpa pabrik, dan papan skor `51`–`48` + bar + `"SELISIH 3"` utuh. **LOLOS.**
- `qc-preview/05_A2_papan_skor.png` (f2379, loc 140, 79,30 dtk) — Uji regresi beat `A2_papan_skor`: papan skor tetap kosong (tanpa angka, tanpa bar, tanpa tag) persis seperti hasil fix v2. **LOLOS.**

---

## 4. Masalah yang Belum Selesai

- Tidak ada masalah kode, TypeScript, atau QC visual yang tersisa.
- Catatan lingkungan: symlink `node_modules` diarahkan ke `/home/hatch/workspace/agy-jalur-prestasi-fix/node_modules` untuk menjalankan `tsc` dan `remotion` secara lokal tanpa menduplikasi paket.
- Sesuai batas tugas: render GitHub Actions tidak didispatch, video penuh tidak dirender, dan audio tidak diproduksi.
