# REPORT-PREVIEW — Kode Remotion Preview Jalur Prestasi (3 menit)

**Tanggal:** 20 Nov 2026, ~17:45 WIB.
**Penulis kode:** agy gemini-4-neon-high (job `jalur-prestasi-kode-preview`, pid 1821).
**Pengambilalihan:** agy macet 74 menit di tahap verifikasi (idle menunggu `remotion bundle` yang menggantung, log diam sejak 16:26; bundle itu sendiri hanya makan 8 detik CPU). Clover mematikan prosesnya (exit.code 3), menghapus checker cron, dan mengambil alih dari disk. Fallback Neon XHigh TIDAK terpakai — Neon High tidak gagal, dia hanya macet di verifikasi.
**Verifikasi oleh Clover:** `npx tsc --noEmit` BERSIH (exit 0, 14 detik). `npx remotion bundle` BERSIH (exit 0, ~19 detik, 44 MB) — bundle yang menggantung ternyata bukan masalah kode. 14 stills + 5 stills ekstra berhasil di-render (75 detik).

## Yang dibuat
- `src/PreviewVideo.tsx` — komposisi Preview (1280x720, 30fps, 6070 frame, bisu).
- `src/preview/previewPlan.tsx` — 14 beat + jendela frame (sesuai `beat_windows_preview.json`).
- `src/preview/VillageMap.tsx` (622 baris) — peta satu dunia: jalan tengah, halte+pasar, sungai+jembatan, sawah, papan nama desa, papan skor.
- `src/preview/PixelCharacters.tsx` (986 baris) — seluruh cast preview (Rani, Sari, Bimo, Dika, Pak Wiryo, Pak Darma, Bu Endang, ibu Rani, ayah Bimo, ayah Dika, 2 pengawas, tukang pos).
- `src/preview/PixelProps.tsx` (482 baris) — properti: papan pengumuman, amplop, laci+daftar tarif, surat, bus, papan skor.
- `src/preview/scenes/` — S01 Pembuka, S02 Aturan, S03 Tahun 2 Seleksi, S04 Tahun 2 Skor+Bus, S05 Tahun 4 (total 1.621 baris).
- `src/Root.tsx` — komposisi Preview didaftarkan; FullVideo pemimpin tidak disentuh.

## Hasil QC (diperiksa Clover dari stills)
- Peta lahir (f195): dua desa simetris di kiri-kanan jalan tengah, gunung, jalan raya + halte, sungai + jembatan, sawah, papan nama desa. Palet identik hangat. LOLOS.
- Papan skor Tahun 2 (f4173): "TAHUN 2", PRESTASI 44, ORANG DALAM 43. LOLOS.
- Papan skor Tahun 4 (f5770): "TAHUN 4", PRESTASI 51, ORANG DALAM 48. LOLOS.
- Siluet tokoh (P3_sari/bimo/dika): Sari (kulit gelap, rambut panjang + jepit kuning, kaos mustard), Bimo (kulit terang, rambut ikal, polo putih), Dika (wajah panjang, rambut klimis, batik merah-emas) — tiga orang yang jelas berbeda. LOLOS.
- Bus yang sama (f4409): bus "KOTA" di halte, ibu Rani melambai, ayah Dika berkacamata hitam, Sari bercaping menggembala dua kambing di tepi jalan. Satu dunia, satu bus. LOLOS.
- `grep step01|pxSnap` di seluruh `src/`: KOSONG. Kamera memakai `SmoothCamera` (interpolate + easing). LOLOS.
- Tidak ada grafik/chart/diagram/HUD/teks melayang. Tulisan hanya di properti (papan nama, papan tulis kelas, papan nama meja, papan skor, bus). LOLOS.
- Catatan kecil (bukan pelanggaran): tulisan papan tulis "BEASISWA KE KOTA" di adegan kelas agak terasa seperti label adegan, tapi sah sebagai tulisan di properti.

## Yang belum selesai
- Render video penuh di GitHub Actions (repo baru `simulasi-jalur-prestasi-render`) — tahap berikutnya.
- Rakitan (caption + BGM + SFX) — setelah render selesai.
