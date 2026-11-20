import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import './pixelFont';
import {PREVIEW_BEATS, type PreviewBeatSpec} from './preview/previewPlan';
import {P1_peta_lahir, P2_ujian_serentak, P3_tebakan} from './preview/scenes/S01_Pembuka';
import {A1_dua_papan, A2_papan_skor} from './preview/scenes/S02_Aturan';
import {
  T2_1_umumkan_prestasi,
  T2_2_umumkan_orang_dalam,
  T2_3_kambing_amplop,
} from './preview/scenes/S03_Tahun2_Seleksi';
import {T2_4_papan_skor, T2_5_bus_yang_sama} from './preview/scenes/S04_Tahun2_SkorBus';
import {
  T4_1_kota_surat,
  T4_2_toko,
  T4_3_sawah_kantor,
  T4_4_papan_skor,
} from './preview/scenes/S05_Tahun4';

const BEAT_COMPONENTS: Record<PreviewBeatSpec['id'], React.ComponentType> = {
  P1_peta_lahir,
  P2_ujian_serentak,
  P3_tebakan,
  A1_dua_papan,
  A2_papan_skor,
  T2_1_umumkan_prestasi,
  T2_2_umumkan_orang_dalam,
  T2_3_kambing_amplop,
  T2_4_papan_skor,
  T2_5_bus_yang_sama,
  T4_1_kota_surat,
  T4_2_toko,
  T4_3_sawah_kantor,
  T4_4_papan_skor,
};

/**
 * 3-minute silent Preview composition: "Desa Jalur Prestasi vs Desa Orang Dalam"
 * 1280x720, 30fps, 6070 frames, 14 beats aligned verbatim to beat_windows_preview.json.
 * Zero HUD, zero floating text, zero audio.
 */
export const PreviewVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#1E1A16'}}>
      {PREVIEW_BEATS.map((beat) => {
        const Comp = BEAT_COMPONENTS[beat.id];
        return (
          <Sequence
            key={beat.id}
            name={beat.id}
            from={beat.startFrame}
            durationInFrames={beat.durationInFrames}
          >
            <Comp />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
