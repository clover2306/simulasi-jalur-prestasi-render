import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {PIXEL_FONT} from '../../pixelFont';
import {CLAMP, PAL} from '../previewPlan';
import {PixelCharacter} from '../PixelCharacters';
import {PixelSky, VillageSignboard, WoodenScoreboard} from '../PixelProps';

const INK = PAL.ink;

/**
 * BEAT 4: A1_dua_papan (f1222-2239, dur 1017)
 * ONE continuous panoramic 2560px street-level world (NO split screen!):
 * - Left (x 0..1120): Balai Desa Prestasi with glass announcement board reading
 *   "Lowongan, beasiswa, jabatan: lewat ujian terbuka" (as text printed on pinned paper prop).
 * - Center (x 1120..1440): Shared middle dirt road (Jalan Tengah) + wooden village signboards.
 * - Right (x 1440..2560): Balai Desa Orang Dalam with the SAME paper pinned, while RIGHT NEXT DOOR
 *   at Pak Darma's house back door, Pak Darma accepts a guest (Ayah Dika) with an envelope!
 * Camera: holds/slowly breathes on left board, then smooth continuous eased PAN across the middle road to right board!
 */
export const A1_dua_papan: React.FC = () => {
  const f = useCurrentFrame();

  // Continuous smooth pan from x=0 (left Prestasi balai) -> x=-1280 (right Orang Dalam balai + Pak Darma)
  const panX = interpolate(f, [390, 640], [0, -1280], {
    ...CLAMP,
    easing: Easing.inOut(Easing.cubic),
  });
  // Gentle continuous zoom breathing throughout
  const zoom =
    f < 390
      ? interpolate(f, [0, 390], [1.0, 1.05], {...CLAMP, easing: Easing.inOut(Easing.quad)})
      : f < 640
        ? interpolate(f, [390, 640], [1.05, 1.02], {...CLAMP, easing: Easing.inOut(Easing.quad)})
        : interpolate(f, [640, 1017], [1.02, 1.08], {...CLAMP, easing: Easing.inOut(Easing.quad)});

  // Subtle backdoor envelope handoff motion on right side
  const guestStep = interpolate(f, [670, 760], [45, 0], {...CLAMP, easing: Easing.out(Easing.cubic)});

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: PAL.skyMid}}>
      <AbsoluteFill
        style={{
          width: 2560,
          height: 720,
          transformOrigin: `${(-panX + 640).toFixed(1)}px 380px`,
          transform: `translate(${panX.toFixed(2)}px, 0px) scale(${zoom.toFixed(5)})`,
        }}
      >
        {/* Shared 4-band sky spanning entire 2560px continuous world */}
        <svg width={2560} height={720} viewBox="0 0 2560 720" shapeRendering="crispEdges">
          <rect x={0} y={0} width={2560} height={60} fill={PAL.skyTop} />
          <rect x={0} y={60} width={2560} height={75} fill={PAL.skyMid} />
          <rect x={0} y={135} width={2560} height={75} fill={PAL.skyLow} />
          <rect x={0} y={210} width={2560} height={65} fill={PAL.skyHoriz} />

          {/* Shared distant mountains */}
          <polygon points="0,280 280,145 580,280" fill={PAL.mountainFar} />
          <polygon points="460,280 820,130 1180,280" fill={PAL.mountainNear} />
          <polygon points="1040,280 1380,150 1720,280" fill={PAL.mountainFar} />
          <polygon points="1580,280 1960,132 2320,280" fill={PAL.mountainNear} />
          <polygon points="2160,280 2440,155 2560,280" fill={PAL.mountainFar} />

          {/* Shared warm ground (Year 0-2 identical palette across both villages) */}
          <rect x={0} y={275} width={2560} height={240} fill={PAL.grassWarm} />
          <rect x={0} y={515} width={2560} height={205} fill={PAL.roadWarm} />
          <rect x={0} y={512} width={2560} height={6} fill={PAL.roadWarmLo} />

          {/* Shared Middle Road (Jalan Tengah) intersecting seamlessly at x=1160..1400 */}
          <polygon points="1220,275 1340,275 1420,518 1140,518" fill={PAL.roadWarm} />
          <polygon points="1216,275 1222,275 1146,518 1138,518" fill={PAL.roadWarmLo} />
          <polygon points="1338,275 1344,275 1424,518 1416,518" fill={PAL.roadWarmLo} />

          {/* === LEFT: BALAI DESA PRESTASI (x=80..980) === */}
          <g transform="translate(80, 140)">
            {/* Roof */}
            <polygon points="-20,120 40,20 560,20 620,120" fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
            <rect x={-16} y={108} width={632} height={14} fill={PAL.roofWarmLo} />
            {/* Balai wall & veranda */}
            <rect x={16} y={120} width={568} height={260} fill={PAL.wallWarm} stroke={INK} strokeWidth={4} />
            <rect x={230} y={230} width={110} height={150} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            <rect x={70} y={220} width={110} height={84} fill="#7DB3CF" stroke={INK} strokeWidth={3} />
            <rect x={420} y={220} width={110} height={84} fill="#7DB3CF" stroke={INK} strokeWidth={3} />
            {/* Wooden sign mounted on Balai roof */}
            <rect x={150} y={132} width={300} height={44} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
          </g>

          {/* Glass-cased announcement board (Desa Prestasi, x=660..1040) */}
          <g transform="translate(650, 224)">
            <rect x={46} y={210} width={22} height={124} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            <rect x={312} y={210} width={22} height={124} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            {/* Outer wooden frame */}
            <rect x={0} y={0} width={380} height={224} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            {/* Glass case interior */}
            <rect x={16} y={16} width={348} height={192} fill="#C6E0EA" stroke={INK} strokeWidth={3} />
            {/* Pinned cream paper inside glass board */}
            <rect x={36} y={32} width={308} height={160} fill={PAL.paper} stroke={INK} strokeWidth={2.5} />
            {/* Red push-pins */}
            <rect x={44} y={38} width={8} height={8} fill={PAL.waxRed} />
            <rect x={328} y={38} width={8} height={8} fill={PAL.waxRed} />
            {/* Crisp diagonal glass sheen pixels */}
            <rect x={28} y={24} width={12} height={28} fill="rgba(255,255,255,0.45)" />
            <rect x={46} y={24} width={6} height={18} fill="rgba(255,255,255,0.35)" />
          </g>

          {/* === RIGHT: BALAI DESA ORANG DALAM (x=1450..2020) + PAK DARMA'S HOUSE RIGHT NEXT DOOR (x=2050..2510) === */}
          <g transform="translate(1440, 140)">
            <polygon points="-10,120 40,20 470,20 520,120" fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
            <rect x={-6} y={108} width={522} height={14} fill={PAL.roofWarmLo} />
            <rect x={16} y={120} width={478} height={260} fill={PAL.wallWarm} stroke={INK} strokeWidth={4} />
            <rect x={190} y={230} width={104} height={150} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            <rect x={56} y={220} width={96} height={84} fill="#7DB3CF" stroke={INK} strokeWidth={3} />
            <rect x={115} y={132} width={280} height={44} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
          </g>

          {/* Wooden announcement board (Desa Orang Dalam, x=1470..1850) */}
          <g transform="translate(1470, 224)">
            <rect x={46} y={210} width={22} height={124} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            <rect x={312} y={210} width={22} height={124} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            <rect x={0} y={0} width={380} height={224} fill={PAL.woodLo} stroke={INK} strokeWidth={4} />
            <rect x={16} y={16} width={348} height={192} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
            {/* SAME paper pinned on Orang Dalam board */}
            <rect x={36} y={32} width={308} height={160} fill={PAL.paper} stroke={INK} strokeWidth={2.5} />
            <rect x={44} y={38} width={8} height={8} fill={PAL.waxRed} />
            <rect x={328} y={38} width={8} height={8} fill={PAL.waxRed} />
          </g>

          {/* Pak Darma's big house RIGHT NEXT TO Balai Orang Dalam — with back/side door visible! */}
          <g transform="translate(2020, 108)">
            <polygon points="-16,120 40,12 460,12 510,120" fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
            <rect x={-12} y={108} width={518} height={14} fill={PAL.roofWarmLo} />
            <rect x={14} y={120} width={466} height={292} fill="#F2E2B8" stroke={INK} strokeWidth={4} />
            {/* Side/back door where Pak Darma secretly greets guests */}
            <rect x={44} y={216} width={104} height={196} fill="#362418" stroke={INK} strokeWidth={4} />
            <rect x={128} y={218} width={20} height={192} fill={PAL.wood} stroke={INK} strokeWidth={2} />
            {/* Fancy pillars */}
            <rect x={198} y={132} width={16} height={280} fill="#F7F1DE" stroke={INK} strokeWidth={2} />
            <rect x={436} y={132} width={16} height={280} fill="#F7F1DE" stroke={INK} strokeWidth={2} />
            <rect x={256} y={210} width={140} height={96} fill="#7DB3CF" stroke={INK} strokeWidth={3} />
          </g>
        </svg>

        {/* Physical Balai signs (in-world wooden boards) */}
        <div
          style={{
            position: 'absolute',
            left: 230,
            top: 284,
            width: 300,
            textAlign: 'center',
            fontFamily: PIXEL_FONT,
            fontSize: 13,
            color: '#FFF6DE',
          }}
        >
          BALAI DESA PRESTASI
        </div>
        <div
          style={{
            position: 'absolute',
            left: 1555,
            top: 284,
            width: 280,
            textAlign: 'center',
            fontFamily: PIXEL_FONT,
            fontSize: 11,
            color: '#FFF6DE',
          }}
        >
          BALAI ORANG DALAM
        </div>

        {/* Readable paper text inside Prestasi glass announcement board */}
        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 274,
            width: 280,
            fontFamily: PIXEL_FONT,
            fontSize: 11.5,
            lineHeight: 1.75,
            color: INK,
            textAlign: 'center',
          }}
        >
          <div style={{fontSize: 10, color: PAL.roofWarm, marginBottom: 8}}>PENGUMUMAN RESMI</div>
          <div>LOWONGAN, BEASISWA,</div>
          <div>JABATAN:</div>
          <div style={{marginTop: 8, color: '#245836'}}>LEWAT UJIAN TERBUKA</div>
        </div>

        {/* SAME paper text inside Orang Dalam wooden announcement board */}
        <div
          style={{
            position: 'absolute',
            left: 1520,
            top: 274,
            width: 280,
            fontFamily: PIXEL_FONT,
            fontSize: 11.5,
            lineHeight: 1.75,
            color: INK,
            textAlign: 'center',
          }}
        >
          <div style={{fontSize: 10, color: PAL.roofWarm, marginBottom: 8}}>PENGUMUMAN RESMI</div>
          <div>LOWONGAN, BEASISWA,</div>
          <div>JABATAN:</div>
          <div style={{marginTop: 8, color: '#245836'}}>LEWAT UJIAN TERBUKA</div>
        </div>

        {/* Roadside wooden village signboards flanking the shared middle road */}
        <VillageSignboard x={1126} y={534} label="DESA PRESTASI" scale={1.1} />
        <VillageSignboard x={1434} y={534} label="DESA ORANG DALAM" scale={1.1} />

        {/* Left side: Pak Wiryo & villager calmly reading official Prestasi board */}
        <PixelCharacter id="pak_wiryo" x={450} y={258} height={382} facing="right" mood="neutral" holding="clipboard" />
        <PixelCharacter id="villager_a" x={265} y={276} height={362} facing="right" mood="neutral" />

        {/* Right side: Pak Darma receiving wealthy guest (Ayah Dika) at his house back door with an envelope! */}
        <PixelCharacter id="pak_darma" x={2055} y={256} height={385} facing="right" mood="smug" />
        <PixelCharacter
          id="ayah_dika"
          x={2260 + guestStep}
          y={252}
          height={388}
          facing="left"
          pose="offer_envelope"
          holding="envelope_thick"
          mood="smug"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * BEAT 5: A2_papan_skor (f2239-2510, dur 271)
 * Slow continuous tracking shot along the middle road passing the wooden scoreboard.
 * Flip tiles are COMPLETELY EMPTY (no digits written! Brief: "Keping angka masih KOSONG").
 */
export const A2_papan_skor: React.FC = () => {
  const f = useCurrentFrame();
  const trackX = interpolate(f, [0, 271], [95, -95], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
  const zoom = interpolate(f, [0, 271], [1.0, 1.07], {...CLAMP, easing: Easing.inOut(Easing.quad)});

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: PAL.skyMid}}>
      <AbsoluteFill
        style={{
          transformOrigin: '50% 56%',
          transform: `translate(${trackX.toFixed(2)}px, 0px) scale(${zoom.toFixed(5)})`,
        }}
      >
        <PixelSky mode="day" height={280} />
        <svg width={1520} height={720} viewBox="0 0 1520 720" shapeRendering="crispEdges" style={{position: 'absolute', left: -120, top: 0}}>
          {/* Shared mountains */}
          <polygon points="0,280 260,150 540,280" fill={PAL.mountainFar} />
          <polygon points="440,280 780,130 1120,280" fill={PAL.mountainNear} />
          <polygon points="980,280 1280,152 1520,280" fill={PAL.mountainFar} />
          {/* Empty border field (Lapangan Perbatasan — NO factory!) */}
          <rect x={0} y={275} width={1520} height={225} fill={PAL.grassWarm} />
          <rect x={160} y={330} width={1200} height={110} fill="#B3B86A" />
          {/* Middle dirt road running north-south cleanly into perspective behind scoreboard */}
          <polygon points="710,275 810,275 910,498 610,498" fill={PAL.roadWarm} />
          <polygon points="706,275 712,275 616,498 608,498" fill={PAL.roadWarmLo} />
          <polygon points="808,275 814,275 912,498 904,498" fill={PAL.roadWarmLo} />
          {/* Distant small houses on both sides */}
          <rect x={130} y={260} width={96} height={58} fill={PAL.wallWarm} stroke={INK} strokeWidth={3} />
          <polygon points="118,262 142,226 214,226 238,262" fill={PAL.roofWarm} stroke={INK} strokeWidth={3} />
          <rect x={1270} y={260} width={96} height={58} fill={PAL.wallWarm} stroke={INK} strokeWidth={3} />
          <polygon points="1258,262 1282,226 1354,226 1378,262" fill={PAL.roofWarm} stroke={INK} strokeWidth={3} />
          {/* Middle dirt road running foreground */}
          <rect x={0} y={495} width={1520} height={225} fill={PAL.roadWarm} />
          <rect x={0} y={492} width={1520} height={6} fill={PAL.roadWarmLo} />
          {[220, 520, 860, 1180].map((px) => (
            <rect key={px} x={px} y={565} width={44} height={8} fill={PAL.roadWarmHi} />
          ))}
        </svg>

        {/* Wooden scoreboard standing by the middle road — BLANK tiles (no scores yet!) */}
        <WoodenScoreboard x={640} y={565} scale={1.38} yearLabel="" scoreLeft="" scoreRight="" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
