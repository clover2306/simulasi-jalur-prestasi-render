import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {CLAMP, PAL, SmoothCamera} from '../previewPlan';
import {PixelCharacter, PixelGoat} from '../PixelCharacters';
import {PixelBus, PixelSky, VillageSignboard, WoodenScoreboard} from '../PixelProps';

const INK = PAL.ink;

/**
 * BEAT 9: T2_4_papan_skor (f4008-4254, dur 246)
 * Wooden scoreboard at the middle road: top tile "TAHUN 2", scores 44 (Prestasi) and 43 (Orang Dalam).
 * Camera: slow continuous eased zoom in onto the scoreboard, holds steadily.
 * Palette: Year 2 still IDENTICAL warm across both sides!
 */
export const T2_4_papan_skor: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 175], [1.0, 1.24], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
  const flip = interpolate(f, [18, 44], [0, 1], {...CLAMP, easing: Easing.out(Easing.cubic)});

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: PAL.skyMid}}>
      <AbsoluteFill style={{transformOrigin: '50% 56%', transform: `scale(${zoom.toFixed(5)})`}}>
        <PixelSky mode="day" height={270} />
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          {/* Shared mountains */}
          <polygon points="0,270 250,140 520,270" fill={PAL.mountainFar} />
          <polygon points="400,270 740,124 1080,270" fill={PAL.mountainNear} />
          <polygon points="940,270 1180,148 1280,270" fill={PAL.mountainFar} />
          {/* Identical warm Year 2 grass + empty border field (NO factory!) */}
          <rect x={0} y={266} width={1280} height={236} fill={PAL.grassWarm} />
          <rect x={160} y={336} width={960} height={110} fill="#B3B86A" />
          {/* Middle dirt road running north-south cleanly into perspective behind scoreboard */}
          <polygon points="590,266 690,266 790,502 490,502" fill={PAL.roadWarm} />
          <polygon points="586,266 592,266 496,502 488,502" fill={PAL.roadWarmLo} />
          <polygon points="688,266 694,266 792,502 784,502" fill={PAL.roadWarmLo} />
          {/* Distant village roofs left and right (identical warm palette) */}
          <rect x={85} y={258} width={90} height={54} fill={PAL.wallWarm} stroke={INK} strokeWidth={3} />
          <polygon points="75,260 98,226 164,226 186,260" fill={PAL.roofWarm} stroke={INK} strokeWidth={3} />
          <rect x={1105} y={258} width={90} height={54} fill={PAL.wallWarm} stroke={INK} strokeWidth={3} />
          <polygon points="1095,260 1118,226 1184,226 1206,260" fill={PAL.roofWarm} stroke={INK} strokeWidth={3} />
          {/* Middle dirt road */}
          <rect x={0} y={500} width={1280} height={220} fill={PAL.roadWarm} />
          <rect x={0} y={498} width={1280} height={6} fill={PAL.roadWarmLo} />
        </svg>

        <WoodenScoreboard
          x={640}
          y={576}
          scale={1.42}
          yearLabel="TAHUN 2"
          scoreLeft="44"
          scoreRight="43"
          flipProgress={flip}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * BEAT 10: T2_5_bus_yang_sama (f4254-4531, dur 277)
 * ONE wide shot of the ONE shared world:
 * - Northern highway + Halte at top of middle road.
 * - Bus ("KOTA") stops at halte: Rani boards while Ibu Rani waves from left; Dika ALSO boards seen off by Ayah Dika.
 * - Bus drives smoothly & continuously along the highway toward the city (no jumps!).
 * - Down on the right roadside pasture, Sari (caping, mustard shirt, herding stick) tends her REMAINING 2 goats
 *   and turns to watch the bus pass by.
 */
export const T2_5_bus_yang_sama: React.FC = () => {
  const f = useCurrentFrame();

  // Bus stays parked at halte (x=640) for frames 0..88, then accelerates smoothly right toward city (continuous motion!)
  const busX =
    f < 88
      ? 640
      : interpolate(f, [88, 277], [640, 1460], {
          ...CLAMP,
          easing: Easing.in(Easing.quad),
        });
  const busMoving = f >= 88;

  // Rani & Dika step up to board the bus before frame 85
  const raniBoard = interpolate(f, [15, 72], [0, 1], {...CLAMP, easing: Easing.inOut(Easing.quad)});
  const dikaBoard = interpolate(f, [22, 76], [0, 1], {...CLAMP, easing: Easing.inOut(Easing.quad)});
  const boarded = f >= 78;

  // Sari turns her head/body toward the passing bus once it rolls past
  const sariWatching = f >= 115;

  return (
    <SmoothCamera dur={277} zoomFrom={1.0} zoomTo={1.07} origin="54% 52%" easing={Easing.inOut(Easing.quad)}>
      <PixelSky mode="day" height={235} />
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
        {/* Shared northern mountains */}
        <polygon points="0,235 220,120 460,235" fill={PAL.mountainFar} />
        <polygon points="360,235 660,104 960,235" fill={PAL.mountainNear} />
        <polygon points="840,235 1120,126 1280,235" fill={PAL.mountainFar} />

        {/* Shared northern highway running horizontally */}
        <rect x={0} y={235} width={1280} height={92} fill="#7B776F" />
        <rect x={0} y={235} width={1280} height={5} fill="#59554E" />
        <rect x={0} y={322} width={1280} height={5} fill="#59554E" />
        {Array.from({length: 16}).map((_, i) => (
          <rect key={i} x={i * 88 + 18} y={278} width={44} height={6} fill="#EAE2C8" />
        ))}

        {/* Shared green warm ground south of highway */}
        <rect x={0} y={327} width={1280} height={393} fill={PAL.grassWarm} />
        {/* Middle dirt road joining the halte from south */}
        <polygon points="575,327 705,327 745,720 535,720" fill={PAL.roadWarm} />
        <polygon points="571,327 577,327 539,720 532,720" fill={PAL.roadWarmLo} />
        <polygon points="703,327 709,327 749,720 742,720" fill={PAL.roadWarmLo} />

        {/* Halte shelter standing at junction */}
        <g transform="translate(566, 206)">
          <rect x={0} y={28} width={148} height={90} fill="#DED2B4" stroke={INK} strokeWidth={3} />
          <rect x={-12} y={8} width={172} height={24} fill="#3C6B8A" stroke={INK} strokeWidth={3} />
          <rect x={20} y={76} width={108} height={14} fill={PAL.wood} stroke={INK} strokeWidth={2} />
        </g>

        {/* Roadside wooden fence beside Sari's pasture (right foreground) */}
        {[830, 910, 990, 1070, 1150, 1230].map((fx) => (
          <rect key={fx} x={fx} y={454} width={10} height={44} fill={PAL.wood} stroke={INK} strokeWidth={2} />
        ))}
        <rect x={820} y={466} width={440} height={8} fill={PAL.woodHi} stroke={INK} strokeWidth={2} />
      </svg>

      {/* Village signboards along middle road (confirming one shared world) */}
      <VillageSignboard x={470} y={536} label="DESA PRESTASI" scale={0.95} />
      <VillageSignboard x={808} y={536} label="DESA ORANG DALAM" scale={0.95} />

      {/* Left side of halte: Ibu Rani waving goodbye warmly */}
      <PixelCharacter id="ibu_rani" x={365} y={224} height={192} facing="right" pose="wave" mood="happy" />

      {/* Right side of halte: Ayah Dika seeing Dika off */}
      <PixelCharacter id="ayah_dika" x={810} y={205} height={206} facing="left" mood="smug" />

      {/* Rani & Dika climbing onto the SAME bus before departure */}
      {!boarded ? (
        <>
          <PixelCharacter
            id="rani"
            x={475 + raniBoard * 115}
            y={220 - raniBoard * 14}
            height={176}
            facing="right"
            mood="happy"
          />
          <PixelCharacter
            id="dika"
            x={728 - dikaBoard * 62}
            y={208 - dikaBoard * 14}
            height={186}
            facing="left"
            mood="smug"
          />
        </>
      ) : null}

      {/* The ONE shared intercity bus ("KOTA") driving smoothly along highway */}
      <PixelBus x={busX} y={322} scale={1.38} moving={busMoving} showPassengers={boarded} />

      {/* Right roadside foreground: Sari herding her REMAINING 2 goats (continuity!) and turning to watch the bus */}
      <PixelGoat x={896} y={652} size={86} coat="#F0E8D4" phase={1} />
      <PixelGoat x={1152} y={666} size={84} coat="#DCD1BA" phase={3} facingLeft />
      <PixelCharacter
        id="sari"
        x={972}
        y={402}
        height={252}
        facing={sariWatching ? 'left' : 'right'}
        caping
        holding="stick"
        mood="sad"
      />
    </SmoothCamera>
  );
};
