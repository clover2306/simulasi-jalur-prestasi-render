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
 *   "PENGUMUMAN RESMI / LOWONGAN, BEASISWA, JABATAN: / LEWAT UJIAN TERBUKA" (text on pinned paper prop).
 * - Center (x 1120..1440): Shared middle dirt road (Jalan Tengah) + wooden village signboards.
 * - Right (x 1440..2560): Balai Desa Orang Dalam with neutral paper ("PENGUMUMAN RESMI / LOWONGAN, BEASISWA, JABATAN:"
 *   WITHOUT "LEWAT UJIAN TERBUKA" — F1!), while RIGHT NEXT DOOR at Pak Darma's back/side door, Pak Darma clearly
 *   receives Ayah Dika with a thick envelope throughout the ENTIRE Orang Dalam narration!
 * Camera: holds/breathes on left Prestasi board during Prestasi narration (f0..565), smooth eased PAN across
 * Jalan Tengah (f565..645), then holds clearly on Orang Dalam board + Pak Darma backdoor deal (f645..1017).
 */
export const A1_dua_papan: React.FC = () => {
  const f = useCurrentFrame();

  // Synced to narration: Prestasi ends at ~61.9s (f635), Orang Dalam runs 61.9s..73.4s (f636..980).
  // Pan smoothly crosses Jalan Tengah between f565..645 so Orang Dalam + Pak Darma are clearly framed for the full Orang Dalam section!
  const panX = interpolate(f, [565, 645], [0, -1280], {
    ...CLAMP,
    easing: Easing.inOut(Easing.cubic),
  });
  // Gentle continuous zoom breathing throughout
  const zoom =
    f < 565
      ? interpolate(f, [0, 565], [1.0, 1.05], {...CLAMP, easing: Easing.inOut(Easing.quad)})
      : f < 645
        ? interpolate(f, [565, 645], [1.05, 1.01], {...CLAMP, easing: Easing.inOut(Easing.quad)})
        : interpolate(f, [645, 1017], [1.01, 1.06], {...CLAMP, easing: Easing.inOut(Easing.quad)});

  // Ayah Dika steps up promptly as camera arrives on Orang Dalam side and extends thick envelope clearly
  const guestStep = interpolate(f, [620, 695], [56, 0], {...CLAMP, easing: Easing.out(Easing.cubic)});

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
          {/* Subtle grass patches & roadside shrubs (F5 light environmental polish) */}
          {[40, 1080, 1380, 1985, 2505].map((bx) => (
            <g key={bx} transform={`translate(${bx}, 484)`}>
              <rect x={0} y={8} width={34} height={22} fill={PAL.treeTop} stroke={INK} strokeWidth={2} />
              <rect x={6} y={2} width={22} height={10} fill={PAL.treeHi} />
              <rect x={2} y={24} width={30} height={6} fill={PAL.treeLo} />
            </g>
          ))}
          {[120, 420, 980, 1460, 1950, 2380].map((gx, idx) => (
            <rect key={gx} x={gx} y={310 + (idx % 3) * 55} width={18} height={6} fill={PAL.grassWarmLo} />
          ))}

          <rect x={0} y={515} width={2560} height={205} fill={PAL.roadWarm} />
          <rect x={0} y={512} width={2560} height={6} fill={PAL.roadWarmLo} />
          {[180, 620, 1020, 1540, 1920, 2340].map((px, idx) => (
            <rect key={px} x={px} y={565 + (idx % 2) * 48} width={36} height={7} fill={PAL.roadWarmHi} />
          ))}

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
            {/* Wooden sign mounted cleanly on upper roof eave (never overlapped by board!) */}
            <rect x={150} y={56} width={300} height={42} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
          </g>

          {/* Glass-cased announcement board (Desa Prestasi, x=650..1030) */}
          <g transform="translate(650, 250)">
            <rect x={46} y={210} width={22} height={110} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            <rect x={312} y={210} width={22} height={110} fill={PAL.wood} stroke={INK} strokeWidth={4} />
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

          {/* === RIGHT: BALAI DESA ORANG DALAM (x=1440..1950) + PAK DARMA'S HOUSE RIGHT NEXT DOOR (x=1990..2500) === */}
          <g transform="translate(1440, 140)">
            <polygon points="-10,120 40,20 470,20 520,120" fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
            <rect x={-6} y={108} width={522} height={14} fill={PAL.roofWarmLo} />
            <rect x={16} y={120} width={478} height={260} fill={PAL.wallWarm} stroke={INK} strokeWidth={4} />
            <rect x={190} y={230} width={104} height={150} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            <rect x={56} y={220} width={96} height={84} fill="#7DB3CF" stroke={INK} strokeWidth={3} />
            {/* Wooden sign mounted cleanly on upper roof eave (ABOVE announcement board — zero overlap!) */}
            <rect x={115} y={56} width={280} height={42} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
          </g>

          {/* Wooden announcement board (Desa Orang Dalam, x=1470..1850) */}
          <g transform="translate(1470, 250)">
            <rect x={46} y={210} width={22} height={110} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            <rect x={312} y={210} width={22} height={110} fill={PAL.wood} stroke={INK} strokeWidth={4} />
            <rect x={0} y={0} width={380} height={224} fill={PAL.woodLo} stroke={INK} strokeWidth={4} />
            <rect x={16} y={16} width={348} height={192} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
            {/* Pinned cream paper (NO "LEWAT UJIAN TERBUKA" rule!) */}
            <rect x={36} y={32} width={308} height={160} fill={PAL.paper} stroke={INK} strokeWidth={2.5} />
            <rect x={44} y={38} width={8} height={8} fill={PAL.waxRed} />
            <rect x={328} y={38} width={8} height={8} fill={PAL.waxRed} />
            {/* Subtle neutral blank lines below "JABATAN:" */}
            <rect x={82} y={154} width={216} height={3} fill={PAL.paperLine} opacity={0.55} />
            <rect x={108} y={170} width={164} height={3} fill={PAL.paperLine} opacity={0.45} />
          </g>

          {/* Pak Darma's big house RIGHT NEXT TO Balai Orang Dalam — with clear open back/side door! */}
          <g transform="translate(1995, 108)">
            <polygon points="-16,120 40,12 490,12 540,120" fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
            <rect x={-12} y={108} width={548} height={14} fill={PAL.roofWarmLo} />
            <rect x={14} y={120} width={500} height={292} fill="#F2E2B8" stroke={INK} strokeWidth={4} />
            {/* Open back/side door with warm interior glow & ajar wooden leaf */}
            <rect x={34} y={206} width={118} height={206} fill="#5C3B1E" stroke={INK} strokeWidth={4} />
            <rect x={44} y={216} width={78} height={192} fill="#8C5E2E" />
            <rect x={122} y={210} width={26} height={198} fill={PAL.wood} stroke={INK} strokeWidth={2.5} />
            {/* Doorway stone step */}
            <rect x={24} y={406} width={138} height={14} fill="#B8AA92" stroke={INK} strokeWidth={2.5} />
            {/* Fancy pillars */}
            <rect x={212} y={132} width={16} height={280} fill="#F7F1DE" stroke={INK} strokeWidth={2} />
            <rect x={464} y={132} width={16} height={280} fill="#F7F1DE" stroke={INK} strokeWidth={2} />
            <rect x={274} y={210} width={144} height={96} fill="#7DB3CF" stroke={INK} strokeWidth={3} />
            <rect x={343} y={210} width={6} height={96} fill={PAL.wood} />
          </g>
        </svg>

        {/* Physical Balai signs (mounted cleanly on roof eave above boards) */}
        <div
          style={{
            position: 'absolute',
            left: 230,
            top: 209,
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
            top: 210,
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
            top: 300,
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

        {/* Orang Dalam wooden board: F1 FIX — ONLY neutral heading, NO "LEWAT UJIAN TERBUKA"! */}
        <div
          style={{
            position: 'absolute',
            left: 1520,
            top: 302,
            width: 280,
            fontFamily: PIXEL_FONT,
            fontSize: 11.5,
            lineHeight: 1.8,
            color: INK,
            textAlign: 'center',
          }}
        >
          <div style={{fontSize: 10, color: PAL.roofWarm, marginBottom: 10}}>PENGUMUMAN RESMI</div>
          <div>LOWONGAN, BEASISWA,</div>
          <div>JABATAN:</div>
        </div>

        {/* Roadside wooden village signboards flanking the shared middle road */}
        <VillageSignboard x={1126} y={534} label="DESA PRESTASI" scale={1.1} />
        <VillageSignboard x={1434} y={534} label="DESA ORANG DALAM" scale={1.1} />

        {/* Left side: Pak Wiryo & villager calmly reading official Prestasi board */}
        <PixelCharacter id="pak_wiryo" x={450} y={258} height={382} facing="right" mood="neutral" holding="clipboard" />
        <PixelCharacter id="villager_a" x={265} y={276} height={362} facing="right" mood="neutral" />

        {/* Right side: Pak Darma standing right by his back door receiving Ayah Dika + thick envelope */}
        <PixelCharacter id="pak_darma" x={2025} y={258} height={382} facing="right" mood="smug" />
        <PixelCharacter
          id="ayah_dika"
          x={2268 + guestStep}
          y={254}
          height={386}
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
          {/* Subtle distant trees & grass tufts (F5) */}
          {[280, 410, 1085, 1215].map((tx) => (
            <g key={tx} transform={`translate(${tx}, 288)`}>
              <rect x={-5} y={-8} width={10} height={20} fill={PAL.wood} stroke={INK} strokeWidth={2} />
              <rect x={-18} y={-34} width={36} height={28} fill={PAL.treeTop} stroke={INK} strokeWidth={2} />
              <rect x={-12} y={-40} width={24} height={10} fill={PAL.treeHi} />
            </g>
          ))}
          {[190, 470, 1010, 1320].map((gx, i) => (
            <rect key={gx} x={gx} y={452 + (i % 2) * 14} width={20} height={6} fill={PAL.grassWarmLo} />
          ))}
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
