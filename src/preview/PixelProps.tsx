import React from 'react';
import {useCurrentFrame} from 'remotion';
import {PIXEL_FONT} from '../pixelFont';
import {PAL} from './previewPlan';

const INK = PAL.ink;

/** Flat stepped 4-band pixel sky (brief-visual §2: no smooth gradients, 3-4 flat color bands). */
export const PixelSky: React.FC<{
  mode?: 'day' | 'night';
  height?: number;
  clouds?: boolean;
}> = ({mode = 'day', height = 220, clouds = true}) => {
  const f = useCurrentFrame();
  const bands =
    mode === 'night'
      ? [PAL.nightTop, PAL.nightMid, PAL.nightLow, '#314569']
      : [PAL.skyTop, PAL.skyMid, PAL.skyLow, PAL.skyHoriz];
  const bandH = Math.ceil(height / bands.length);
  const drift = (f * 0.25) % 1400;

  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1280, height, overflow: 'hidden'}}>
      {bands.map((bg, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            top: i * bandH,
            width: 1280,
            height: bandH + 1,
            backgroundColor: bg,
          }}
        />
      ))}
      {mode === 'night' ? (
        <svg width={1280} height={height} viewBox="0 0 1280 220" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          {[
            [90, 28], [210, 52], [350, 22], [480, 44], [640, 18], [790, 48], [940, 26], [1110, 40], [1220, 20],
          ].map(([sx, sy], i) => {
            const twinkle = (f + i * 17) % 45 > 38 ? 0.45 : 1;
            return <rect key={i} x={sx} y={sy} width={4} height={4} fill="#F5EED0" opacity={twinkle} />;
          })}
          {/* Pixel crescent moon */}
          <rect x={1070} y={24} width={28} height={28} fill="#F5E6A6" />
          <rect x={1078} y={24} width={20} height={22} fill={PAL.nightTop} />
        </svg>
      ) : clouds ? (
        <svg width={1280} height={height} viewBox="0 0 1280 220" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          {[140, 560, 990].map((cx, i) => {
            const px = ((cx + drift * (0.6 + i * 0.2)) % 1420) - 100;
            const py = 22 + (i % 2) * 24;
            return (
              <g key={i} transform={`translate(${px.toFixed(2)}, ${py})`}>
                <rect x={12} y={0} width={52} height={12} fill="#F4FAFD" />
                <rect x={0} y={10} width={84} height={14} fill="#F4FAFD" />
                <rect x={4} y={20} width={76} height={4} fill="#D9ECF6" />
              </g>
            );
          })}
        </svg>
      ) : null}
    </div>
  );
};

/**
 * 17-Agustus wooden scoreboard standing in the world along the middle road (brief-visual §4 & §7 rule 7).
 * NEVER a HUD overlay — always grounded on wooden posts in the soil.
 * `yearLabel` and scores can be empty (A2) or exact checkpoint numbers (44-43 in Year 2, 51-48 in Year 4).
 */
export const WoodenScoreboard: React.FC<{
  x: number;
  y: number;
  scale?: number;
  yearLabel?: string; // '' when empty, 'TAHUN 2', 'TAHUN 4'
  scoreLeft?: string; // '' when empty, '44', '51'
  scoreRight?: string; // '' when empty, '43', '48'
  flipProgress?: number; // 0..1 optional tile flip emphasis
  style?: React.CSSProperties;
}> = ({x, y, scale = 1, yearLabel = '', scoreLeft = '', scoreRight = '', flipProgress = 1, style}) => {
  const w = 360;
  const h = 250;
  const flipScaleY = 0.15 + 0.85 * Math.abs(Math.cos((1 - flipProgress) * Math.PI * 0.5));

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translate(-50%, -100%) scale(${scale})`,
        transformOrigin: '50% 100%',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
        {/* Ground shadow */}
        <rect x={36} y={236} width={288} height={12} fill="rgba(30,26,22,0.28)" />
        {/* Two thick wooden legs planted in dirt */}
        <rect x={54} y={168} width={22} height={74} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        <rect x={68} y={170} width={6} height={70} fill={PAL.woodLo} />
        <rect x={284} y={168} width={22} height={74} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        <rect x={298} y={170} width={6} height={70} fill={PAL.woodLo} />

        {/* Small corrugated wooden rain-cap roof on top */}
        <rect x={16} y={32} width={328} height={14} fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
        <rect x={20} y={40} width={320} height={4} fill={PAL.roofWarmLo} />

        {/* Top Year flip-tile housing */}
        <rect x={106} y={4} width={148} height={36} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
        <rect x={116} y={10} width={128} height={24} fill="#F3E9D0" stroke={INK} strokeWidth={2} />

        {/* Main wooden plank board body */}
        <rect x={24} y={46} width={312} height={134} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        <rect x={32} y={54} width={296} height={118} fill={PAL.woodHi} stroke={INK} strokeWidth={2} />
        {/* Horizontal plank seam lines */}
        <rect x={34} y={92} width={292} height={3} fill={PAL.woodLo} />
        {/* Center vertical divider bar of the wooden board */}
        <rect x={177} y={54} width={6} height={118} fill={PAL.woodLo} />

        {/* Left flip-card slot */}
        <rect x={48} y={102} width={114} height={60} fill="#362618" stroke={INK} strokeWidth={3} />
        {/* Right flip-card slot */}
        <rect x={198} y={102} width={114} height={60} fill="#362618" stroke={INK} strokeWidth={3} />
        {/* Flip rings */}
        {[72, 134, 222, 284].map((rx) => (
          <rect key={rx} x={rx} y={96} width={8} height={10} fill="#A0A8B0" stroke={INK} strokeWidth={2} />
        ))}
      </svg>

      {/* Painted year tile text (physical wood slat) */}
      <div
        style={{
          position: 'absolute',
          left: 116,
          top: 12,
          width: 128,
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 11,
          color: INK,
          letterSpacing: '0.03em',
        }}
      >
        {yearLabel}
      </div>

      {/* Painted column headings on wooden board */}
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 63,
          width: 142,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 11,
          color: '#FFF6DE',
          textShadow: '2px 2px 0 #3D2614',
        }}
      >
        PRESTASI
      </div>
      <div
        style={{
          position: 'absolute',
          left: 184,
          top: 63,
          width: 142,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 9,
          lineHeight: 1.25,
          color: '#FFF6DE',
          textShadow: '2px 2px 0 #3D2614',
        }}
      >
        ORANG DALAM
      </div>

      {/* Left physical flip tile */}
      <div
        style={{
          position: 'absolute',
          left: 54,
          top: 108,
          width: 102,
          height: 48,
          backgroundColor: '#F5EED8',
          border: `2px solid ${INK}`,
          boxShadow: 'inset 0 -4px 0 #D8CCB0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 28,
          color: INK,
          transform: `scaleY(${flipScaleY.toFixed(4)})`,
        }}
      >
        {scoreLeft}
      </div>

      {/* Right physical flip tile */}
      <div
        style={{
          position: 'absolute',
          left: 204,
          top: 108,
          width: 102,
          height: 48,
          backgroundColor: '#F5EED8',
          border: `2px solid ${INK}`,
          boxShadow: 'inset 0 -4px 0 #D8CCB0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 28,
          color: INK,
          transform: `scaleY(${flipScaleY.toFixed(4)})`,
        }}
      >
        {scoreRight}
      </div>
    </div>
  );
};

/** Wooden village roadside signboard ("DESA PRESTASI" / "DESA ORANG DALAM"). */
export const VillageSignboard: React.FC<{
  x: number;
  y: number;
  label: string;
  scale?: number;
  weathered?: boolean;
  tiltDeg?: number;
  opacity?: number;
}> = ({x, y, label, scale = 1, weathered = false, tiltDeg = 0, opacity = 1}) => {
  const w = 152;
  const h = 68;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        opacity,
        transform: `translate(-50%, -100%) rotate(${tiltDeg}deg) scale(${scale})`,
        transformOrigin: '50% 100%',
        pointerEvents: 'none',
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
        <rect x={28} y={40} width={10} height={28} fill={weathered ? '#6A533E' : PAL.wood} stroke={INK} strokeWidth={2.5} />
        <rect x={114} y={40} width={10} height={28} fill={weathered ? '#6A533E' : PAL.wood} stroke={INK} strokeWidth={2.5} />
        <rect x={6} y={4} width={140} height={40} fill={weathered ? '#7A644F' : PAL.woodHi} stroke={INK} strokeWidth={3} />
        <rect x={12} y={10} width={128} height={28} fill={weathered ? '#DED6C2' : '#F4EBD2'} stroke={INK} strokeWidth={2} />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 10,
          width: 128,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 8.5,
          lineHeight: 1.25,
          color: INK,
        }}
      >
        {label}
      </div>
    </div>
  );
};

/** Sealed wooden exam crate with red wax seal (for P2_ujian_serentak). */
export const SealedCrate: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 68,
      height: 50,
      transform: `translate(-50%, -100%) scale(${scale})`,
      transformOrigin: '50% 100%',
      pointerEvents: 'none',
    }}
  >
    <svg width={68} height={50} viewBox="0 0 68 50" shapeRendering="crispEdges">
      <rect x={4} y={6} width={60} height={40} fill="#9C6B3C" stroke={INK} strokeWidth={3} />
      <rect x={8} y={10} width={52} height={32} fill="#B8834E" />
      <rect x={4} y={18} width={60} height={4} fill="#724A26" />
      <rect x={4} y={32} width={60} height={4} fill="#724A26" />
      {/* Sealed official strip + red wax seal */}
      <rect x={28} y={6} width={12} height={40} fill={PAL.paper} stroke={INK} strokeWidth={1.5} />
      <rect x={29} y={20} width={10} height={10} fill={PAL.waxRed} stroke={INK} strokeWidth={1.5} />
      <rect x={31} y={22} width={4} height={4} fill={PAL.waxRedHi} />
    </svg>
  </div>
);

/** Vintage Indonesian intercity bus ("KOTA") in crisp 32-bit pixel art. */
export const PixelBus: React.FC<{
  x: number;
  y: number;
  scale?: number;
  facingLeft?: boolean;
  moving?: boolean;
  showPassengers?: boolean;
}> = ({x, y, scale = 1, facingLeft = false, moving = false, showPassengers = false}) => {
  const f = useCurrentFrame();
  const bounce = moving ? (Math.floor(f / 4) % 2 === 0 ? 0 : -1.5) : 0;
  const w = 180;
  const h = 84;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + bounce,
        width: w,
        height: h,
        transform: `translate(-50%, -100%) scaleX(${facingLeft ? -scale : scale}) scaleY(${scale})`,
        transformOrigin: '50% 100%',
        pointerEvents: 'none',
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
        {/* Ground shadow */}
        <rect x={12} y={76} width={156} height={8} fill="rgba(25,22,18,0.32)" />
        {/* Exhaust puffs when moving */}
        {moving ? (
          <g opacity={0.65}>
            <rect x={-16 - (f % 12)} y={60} width={12} height={10} fill="#D8D4C8" />
            <rect x={-30 - (f % 16)} y={54} width={10} height={8} fill="#E6E2D8" />
          </g>
        ) : null}
        {/* Main body */}
        <rect x={10} y={12} width={158} height={58} fill="#EFE6CC" stroke={INK} strokeWidth={3} />
        {/* Classic teal & terracotta stripes */}
        <rect x={12} y={42} width={154} height={12} fill="#2E7D8C" />
        <rect x={12} y={54} width={154} height={6} fill="#C24A38" />
        {/* Roof rack */}
        <rect x={24} y={6} width={106} height={6} fill="#7B6B58" stroke={INK} strokeWidth={2} />
        {/* Windows */}
        {[20, 48, 76, 104, 134].map((wx, idx) => (
          <rect
            key={wx}
            x={wx}
            y={18}
            width={idx === 4 ? 26 : 22}
            height={20}
            fill="#8DC2DC"
            stroke={INK}
            strokeWidth={2}
          />
        ))}
        {/* Window sheen pixels */}
        {[24, 52, 80, 108, 138].map((wx) => (
          <rect key={wx} x={wx} y={20} width={6} height={4} fill="#CBE8F5" />
        ))}
        {/* Rani (light blue blouse, window 2) and Dika (red-gold batik, window 4) riding the SAME bus */}
        {showPassengers ? (
          <g>
            {/* Rani in window x=48..70 */}
            <rect x={54} y={24} width={8} height={7} fill="#E2B086" />
            <rect x={53} y={22} width={10} height={3} fill="#231D1A" />
            <rect x={52} y={31} width={12} height={7} fill="#7EC8F2" />
            {/* Dika in window x=104..126 */}
            <rect x={111} y={23} width={8} height={8} fill="#CC966C" />
            <rect x={110} y={21} width={10} height={3} fill="#1A1A20" />
            <rect x={109} y={31} width={12} height={7} fill="#B8292F" />
          </g>
        ) : null}
        {/* Headlight & bumper */}
        <rect x={164} y={50} width={8} height={8} fill="#FFE57F" stroke={INK} strokeWidth={2} />
        <rect x={4} y={64} width={170} height={6} fill="#464A52" stroke={INK} strokeWidth={2} />
        {/* Wheels */}
        {[40, 132].map((wx) => (
          <g key={wx}>
            <rect x={wx - 12} y={60} width={24} height={22} fill="#222428" stroke={INK} strokeWidth={2} />
            <rect x={wx - 6} y={66} width={12} height={10} fill="#9BA2AC" />
            <rect x={wx - 2} y={69} width={4} height={4} fill="#464A52" />
          </g>
        ))}
      </svg>
      {/* Physical destination board inside front windshield: "KOTA" */}
      <div
        style={{
          position: 'absolute',
          left: 132,
          top: 29,
          width: 30,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 6,
          color: INK,
          backgroundColor: '#FFF5D6',
          border: `1px solid ${INK}`,
          padding: '1px 0',
        }}
      >
        KOTA
      </div>
    </div>
  );
};

/** Postman riding a vintage pixel bicycle (for T4_1_kota_surat). */
export const PostmanBicycle: React.FC<{
  x: number;
  y: number;
  scale?: number;
  facingLeft?: boolean;
}> = ({x, y, scale = 1, facingLeft = false}) => {
  const f = useCurrentFrame();
  const pedal = Math.floor(f / 4) % 2;
  const w = 80;
  const h = 76;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translate(-50%, -100%) scaleX(${facingLeft ? -scale : scale}) scaleY(${scale})`,
        transformOrigin: '50% 100%',
        pointerEvents: 'none',
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
        <rect x={8} y={70} width={64} height={5} fill="rgba(25,22,18,0.28)" />
        {/* Rear & front wheels */}
        {[18, 62].map((cx) => (
          <g key={cx}>
            <rect x={cx - 12} y={48} width={24} height={24} fill="none" stroke={INK} strokeWidth={4} />
            <rect x={cx - 2} y={58} width={4} height={4} fill={INK} />
            <rect x={cx - 1} y={50 + pedal * 2} width={2} height={18} fill="#787F88" />
          </g>
        ))}
        {/* Frame */}
        <rect x={18} y={54} width={44} height={4} fill="#2A4A72" />
        <rect x={30} y={36} width={4} height={22} fill="#2A4A72" />
        <rect x={54} y={32} width={4} height={26} fill="#2A4A72" />
        <rect x={50} y={30} width={14} height={4} fill={INK} />
        {/* Rear mail rack + white envelopes */}
        <rect x={6} y={38} width={18} height={12} fill="#8C5B32" stroke={INK} strokeWidth={2} />
        <rect x={9} y={34} width={12} height={6} fill={PAL.paper} stroke={INK} strokeWidth={1.5} />
        {/* Postman rider */}
        <rect x={32} y={42 + pedal * 2} width={8} height={14} fill="#334E73" stroke={INK} strokeWidth={2} />
        <rect x={28} y={20} width={16} height={22} fill="#D96B27" stroke={INK} strokeWidth={2} />
        {/* Arm holding handlebar */}
        <rect x={42} y={24} width={14} height={6} fill="#D96B27" stroke={INK} strokeWidth={2} />
        {/* Head + orange cap */}
        <rect x={30} y={8} width={13} height={12} fill="#C38B61" stroke={INK} strokeWidth={2} />
        <rect x={29} y={4} width={15} height={5} fill="#D96B27" stroke={INK} strokeWidth={2} />
        <rect x={38} y={7} width={10} height={3} fill="#263B57" />
        <rect x={39} y={12} width={2} height={2} fill={INK} />
      </svg>
    </div>
  );
};
