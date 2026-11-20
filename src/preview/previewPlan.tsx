import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

export const PREVIEW_FPS = 30;
export const PREVIEW_TOTAL_FRAMES = 6070;

export interface PreviewBeatSpec {
  id:
    | 'P1_peta_lahir'
    | 'P2_ujian_serentak'
    | 'P3_tebakan'
    | 'A1_dua_papan'
    | 'A2_papan_skor'
    | 'T2_1_umumkan_prestasi'
    | 'T2_2_umumkan_orang_dalam'
    | 'T2_3_kambing_amplop'
    | 'T2_4_papan_skor'
    | 'T2_5_bus_yang_sama'
    | 'T4_1_kota_surat'
    | 'T4_2_toko'
    | 'T4_3_sawah_kantor'
    | 'T4_4_papan_skor';
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  qcFrameOffset: number; // representative local frame for QC still
}

export const PREVIEW_BEATS: PreviewBeatSpec[] = [
  {id: 'P1_peta_lahir', startFrame: 0, endFrame: 233, durationInFrames: 233, qcFrameOffset: 195},
  {id: 'P2_ujian_serentak', startFrame: 233, endFrame: 728, durationInFrames: 495, qcFrameOffset: 280},
  {id: 'P3_tebakan', startFrame: 728, endFrame: 1222, durationInFrames: 494, qcFrameOffset: 65},
  {id: 'A1_dua_papan', startFrame: 1222, endFrame: 2239, durationInFrames: 1017, qcFrameOffset: 820},
  {id: 'A2_papan_skor', startFrame: 2239, endFrame: 2510, durationInFrames: 271, qcFrameOffset: 140},
  {id: 'T2_1_umumkan_prestasi', startFrame: 2510, endFrame: 3279, durationInFrames: 769, qcFrameOffset: 410},
  {id: 'T2_2_umumkan_orang_dalam', startFrame: 3279, endFrame: 3740, durationInFrames: 461, qcFrameOffset: 240},
  {id: 'T2_3_kambing_amplop', startFrame: 3740, endFrame: 4008, durationInFrames: 268, qcFrameOffset: 225},
  {id: 'T2_4_papan_skor', startFrame: 4008, endFrame: 4254, durationInFrames: 246, qcFrameOffset: 165},
  {id: 'T2_5_bus_yang_sama', startFrame: 4254, endFrame: 4531, durationInFrames: 277, qcFrameOffset: 155},
  {id: 'T4_1_kota_surat', startFrame: 4531, endFrame: 4671, durationInFrames: 140, qcFrameOffset: 105},
  {id: 'T4_2_toko', startFrame: 4671, endFrame: 5013, durationInFrames: 342, qcFrameOffset: 180},
  {id: 'T4_3_sawah_kantor', startFrame: 5013, endFrame: 5640, durationInFrames: 627, qcFrameOffset: 520},
  {id: 'T4_4_papan_skor', startFrame: 5640, endFrame: 6070, durationInFrames: 430, qcFrameOffset: 130},
];

// Binding color palette from brief-visual.md section 3
export const PAL = {
  // Constant shared world elements (identical across both villages at all eras)
  ink: '#1E1A16',
  skyTop: '#74B4DE',
  skyMid: '#8FC6E8',
  skyLow: '#AED7F0',
  skyHoriz: '#CBE7F7',
  nightTop: '#131D30',
  nightMid: '#1C2A45',
  nightLow: '#273A5C',
  mountainFar: '#5E8076',
  mountainNear: '#496861',
  mountainSnow: '#7FA398',
  river: '#4FA3C7',
  riverDeep: '#3A82A3',
  riverHi: '#88CDE5',
  riverBank: '#B78C56',

  // Year 0-2 shared warm palette (both villages IDENTICAL)
  grassWarm: '#9DBF5A',
  grassWarmLo: '#84A645',
  grassWarmHi: '#B3D26F',
  paddyWarm: '#8CB04B',
  paddyWater: '#6F9962',
  roadWarm: '#C98B4F',
  roadWarmLo: '#A76E3A',
  roadWarmHi: '#DDA46B',
  roofWarm: '#B5523B',
  roofWarmLo: '#8E3C2A',
  roofWarmHi: '#CE6B53',
  wallWarm: '#EED9A8',
  wallWarmLo: '#D4BC88',
  wood: '#855833',
  woodLo: '#5D3B20',
  woodHi: '#A87448',
  treeTop: '#4F8A44',
  treeLo: '#386A31',
  treeHi: '#6AA85A',

  // Year 4 subtle divergence (Prestasi freshly painted house, Orang Dalam slightly duller fence/grass)
  grassY4Prestasi: '#94C055',
  roofY4Fresh: '#D9643F',
  roofY4FreshLo: '#B1492A',
  wallY4Fresh: '#F6F0DC',
  wallY4FreshLo: '#DFD7BE',
  grassY4Ordal: '#99A860',
  grassY4OrdalLo: '#839150',
  wallY4Ordal: '#E3D0A4',
  roofY4Ordal: '#A85643',

  // Interior & prop colors
  paper: '#F7F1DE',
  paperShadow: '#DDD3B8',
  paperLine: '#8D826D',
  envelope: '#F4EBD3',
  envelopeShade: '#D7CAA8',
  waxRed: '#C2352B',
  waxRedHi: '#E0574D',
  chalkboard: '#2A4A3A',
  chalkboardFrame: '#7B4E2B',
  gold: '#E8B838',
  goldLo: '#B3861E',
  lampWarm: '#FFE58A',
} as const;

export const CLAMP = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

/** Continuous eased progress 0..1 between start and end frame (never quantized). */
export function easeProgress(
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = Easing.inOut(Easing.cubic),
): number {
  if (end <= start) return frame >= end ? 1 : 0;
  return interpolate(frame, [start, end], [0, 1], {...CLAMP, easing});
}

/** Gentle in-place pop scale (brief-visual §2: slightly overshoots then settles, no flying from edges). */
export function popInPlace(frame: number, at: number, dur = 14): number {
  if (frame < at) return 0;
  const t = interpolate(frame, [at, at + dur], [0, 1], {
    ...CLAMP,
    easing: Easing.out(Easing.back(1.7)),
  });
  return Math.max(0, t);
}

/** Continuous smooth fade-in 0..1. */
export function fadeIn(frame: number, at: number, dur = 12): number {
  return interpolate(frame, [at, at + Math.max(1, dur)], [0, 1], {
    ...CLAMP,
    easing: Easing.out(Easing.quad),
  });
}

/** Continuous camera wrapper: smooth floating-point translate + zoom with easing on every frame. */
export const SmoothCamera: React.FC<{
  dur: number;
  zoomFrom?: number;
  zoomTo?: number;
  xFrom?: number;
  xTo?: number;
  yFrom?: number;
  yTo?: number;
  origin?: string;
  startFrame?: number;
  endFrame?: number;
  easing?: (t: number) => number;
  children: React.ReactNode;
}> = ({
  dur,
  zoomFrom = 1,
  zoomTo = 1.06,
  xFrom = 0,
  xTo = 0,
  yFrom = 0,
  yTo = 0,
  origin = '50% 50%',
  startFrame = 0,
  endFrame,
  easing = Easing.inOut(Easing.cubic),
  children,
}) => {
  const f = useCurrentFrame();
  const t = easeProgress(f, startFrame, endFrame ?? Math.max(1, dur), easing);
  const sc = zoomFrom + (zoomTo - zoomFrom) * t;
  const tx = xFrom + (xTo - xFrom) * t;
  const ty = yFrom + (yTo - yFrom) * t;

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transformOrigin: origin,
          transform: `translate(${tx.toFixed(3)}px, ${ty.toFixed(3)}px) scale(${sc.toFixed(5)})`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
