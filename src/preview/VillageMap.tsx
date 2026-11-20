import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {PAL, fadeIn, popInPlace} from './previewPlan';
import {MiniPixelSprite, PixelGoat} from './PixelCharacters';
import {VillageSignboard, WoodenScoreboard} from './PixelProps';
import {evalWalker, type Waypoint} from '../components/Walker';

const INK = PAL.ink;

export interface MapWalkerDef {
  id: string;
  path: Waypoint[];
  shirt: string;
  pants?: string;
  skin?: string;
  hair?: string;
  hat?: 'none' | 'peci' | 'caping' | 'hijab' | 'cap';
  hatColor?: string;
  speed?: number;
  phase?: number;
  loopMode?: 'pingpong' | 'cycle' | 'once';
  startFrame?: number;
  height?: number;
}

/** 3/4 top-down RPG pixel house. */
const MapHouse: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  roof: string;
  roofLo: string;
  wall: string;
  wallLo: string;
  scale?: number;
  smoke?: boolean;
  fancy?: boolean;
  fence?: boolean;
  crookedFence?: boolean;
  flagpole?: boolean;
  boardGlass?: boolean;
  boardWood?: boolean;
  frame: number;
}> = ({
  x,
  y,
  w = 68,
  h = 54,
  roof,
  roofLo,
  wall,
  wallLo,
  scale = 1,
  smoke = false,
  fancy = false,
  fence = false,
  crookedFence = false,
  flagpole = false,
  boardGlass = false,
  boardWood = false,
  frame,
}) => {
  if (scale <= 0.01) return null;
  const smokeY = (frame % 36) * 0.45;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale.toFixed(4)})`}>
      {/* Ground shadow */}
      <rect x={-w / 2 + 4} y={2} width={w} height={8} fill="rgba(26,22,16,0.25)" />
      {/* Yard fence (e.g. Dika's house iron fence or Year 4 crooked Orang Dalam fence) */}
      {fence ? (
        <g transform={crookedFence ? 'rotate(-5 0 0)' : undefined}>
          <rect x={-w / 2 - 10} y={-8} width={w + 20} height={14} fill="none" stroke={crookedFence ? '#6E5338' : '#3C4048'} strokeWidth={2.5} />
          {crookedFence ? (
            <line x1={w / 2 + 2} y1={-10} x2={w / 2 + 12} y2={6} stroke="#5B422A" strokeWidth={3} />
          ) : null}
        </g>
      ) : null}

      {/* Wall */}
      <rect x={-w / 2} y={-h + 24} width={w} height={h - 20} fill={wall} stroke={INK} strokeWidth={2} />
      <rect x={w / 2 - 8} y={-h + 25} width={7} height={h - 22} fill={wallLo} />
      {/* Door & Windows */}
      <rect x={-8} y={-16} width={14} height={20} fill={PAL.wood} stroke={INK} strokeWidth={1.5} />
      <rect x={-w / 2 + 8} y={-20} width={12} height={12} fill="#6F9EB8" stroke={INK} strokeWidth={1.5} />
      <rect x={w / 2 - 22} y={-20} width={12} height={12} fill="#6F9EB8" stroke={INK} strokeWidth={1.5} />

      {/* Fancy porch pillars for Pak Darma's growing house */}
      {fancy ? (
        <g>
          <rect x={-w / 2 + 3} y={-24} width={4} height={28} fill="#F5F0E0" stroke={INK} strokeWidth={1} />
          <rect x={w / 2 - 7} y={-24} width={4} height={28} fill="#F5F0E0" stroke={INK} strokeWidth={1} />
          <rect x={-w / 2 - 4} y={-32} width={w + 8} height={6} fill={PAL.gold} stroke={INK} strokeWidth={1.5} />
        </g>
      ) : null}

      {/* 3/4 Roof */}
      <polygon
        points={`${-w / 2 - 6},${-h + 26} ${-w / 2 + 8},${-h} ${w / 2 - 8},${-h} ${w / 2 + 6},${-h + 26}`}
        fill={roof}
        stroke={INK}
        strokeWidth={2}
      />
      <rect x={-w / 2 - 4} y={-h + 20} width={w + 8} height={5} fill={roofLo} />
      <rect x={-w / 2 + 8} y={-h + 2} width={w - 16} height={3} fill="rgba(255,255,255,0.18)" />

      {/* Kitchen smoke (subtle 3-frame pixel puff) */}
      {smoke ? (
        <g opacity={0.65}>
          <rect x={w / 2 - 14} y={-h - 6 - smokeY * 0.5} width={6} height={6} fill="#EFECE2" />
          <rect x={w / 2 - 10} y={-h - 14 - smokeY * 0.8} width={5} height={5} fill="#E4E0D4" />
        </g>
      ) : null}

      {/* School flagpole */}
      {flagpole ? (
        <g>
          <rect x={w / 2 + 8} y={-h - 14} width={3} height={h + 18} fill="#DDD7C8" stroke={INK} strokeWidth={1} />
          <rect x={w / 2 + 11} y={-h - 13} width={14} height={5} fill="#D4352B" />
          <rect x={w / 2 + 11} y={-h - 8} width={14} height={5} fill="#FAF8F2" />
        </g>
      ) : null}

      {/* Balai announcement board */}
      {boardGlass || boardWood ? (
        <g>
          <rect x={w / 2 + 6} y={-18} width={18} height={14} fill={boardGlass ? '#A6D0E4' : PAL.woodHi} stroke={INK} strokeWidth={1.5} />
          <rect x={w / 2 + 9} y={-15} width={12} height={8} fill={PAL.paper} />
          <rect x={w / 2 + 13} y={-4} width={4} height={8} fill={PAL.woodLo} />
        </g>
      ) : null}
    </g>
  );
};

/** 3/4 top-down pixel tree with gentle leaf rustle. */
const MapTree: React.FC<{x: number; y: number; scale?: number; frame: number; phase?: number; dull?: boolean}> = ({
  x,
  y,
  scale = 1,
  frame,
  phase = 0,
  dull = false,
}) => {
  if (scale <= 0.01) return null;
  const rustle = Math.floor((frame + phase * 11) / 14) % 2 === 0 ? 0 : 1;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale.toFixed(4)})`}>
      <rect x={-12} y={-2} width={24} height={6} fill="rgba(26,22,16,0.22)" />
      <rect x={-4} y={-14} width={8} height={16} fill={PAL.wood} stroke={INK} strokeWidth={1.5} />
      <rect x={-15 + rustle} y={-34} width={30} height={22} fill={dull ? '#5B7C4B' : PAL.treeTop} stroke={INK} strokeWidth={2} />
      <rect x={-11 + rustle} y={-40} width={22} height={10} fill={dull ? '#6F8F5D' : PAL.treeHi} stroke={INK} strokeWidth={1.5} />
      <rect x={-13} y={-18} width={26} height={5} fill={dull ? '#48633B' : PAL.treeLo} />
    </g>
  );
};

const DEFAULT_VILLAGERS: MapWalkerDef[] = [
  // Left village (Desa Prestasi) - 4 symmetric villagers walking cleanly on dirt lanes
  {id: 'p1', path: [[155, 294], [385, 294], [585, 294]], shirt: '#5E9AC7', speed: 34, phase: 0.1},
  {id: 'p2', path: [[360, 294], [585, 294], [585, 438]], shirt: '#D98E4E', speed: 36, phase: 0.45},
  {id: 'p3', path: [[150, 438], [360, 438], [580, 438]], shirt: '#5EA369', speed: 32, phase: 0.7},
  {id: 'p4', path: [[250, 438], [440, 438]], shirt: '#C9685B', speed: 30, phase: 0.25},
  // Right village (Desa Orang Dalam) - 4 symmetric villagers walking cleanly on dirt lanes
  {id: 'o1', path: [[695, 294], [910, 294], [1110, 294]], shirt: '#D4A653', speed: 35, phase: 0.2},
  {id: 'o2', path: [[695, 294], [695, 438], [910, 438]], shirt: '#6C8CB8', speed: 34, phase: 0.55},
  {id: 'o3', path: [[720, 438], [910, 438]], shirt: '#B5695E', speed: 31, phase: 0.8},
  {id: 'o4', path: [[870, 438], [1120, 438]], shirt: '#7A995E', speed: 33, phase: 0.35},
];

export interface VillageMapProps {
  era?: 'y0' | 'y2' | 'y4';
  /** For P1_peta_lahir: animate houses, trees, villagers, signboards popping/fading IN PLACE. */
  birthAnim?: boolean;
  /** Number of goats in Bu Endang's southeast pen (4 before T2_3 sale, 2 after!). */
  goatsInPen?: number;
  /** Wooden scoreboard state on the middle road. */
  scoreMode?: 'hidden' | 'empty' | 'y2' | 'y4';
  /** Show default ambient villagers walking on village paths. */
  showVillagers?: boolean;
  /** Custom walkers rendered on the map (e.g., proctors splitting, postman, etc.). */
  extraWalkers?: MapWalkerDef[];
  /** Optional extra overlay children inside the map coordinate space (1280x720). */
  children?: React.ReactNode;
}

/**
 * The ONE shared world map (brief-visual.md §4):
 * - Top: shared sky (#8FC6E8), shared northern mountains, northern highway to city, Halte + Weekly Market
 * - Left: Desa Prestasi | Center: Jalan Tengah + empty Lapangan Perbatasan (NO factory!) + Papan Skor | Right: Desa Orang Dalam
 * - Bottom: shared River (#4FA3C7) + Bridge + Rice Paddies (Sawah)
 */
export const VillageMap: React.FC<VillageMapProps> = ({
  era = 'y2',
  birthAnim = false,
  goatsInPen = 4,
  scoreMode = 'empty',
  showVillagers = true,
  extraWalkers = [],
  children,
}) => {
  const f = useCurrentFrame();
  const isY4 = era === 'y4';

  // Terrain palette: Year 0-2 identical; Year 4 subtle shift only
  const grassL = isY4 ? PAL.grassY4Prestasi : PAL.grassWarm;
  const grassR = isY4 ? PAL.grassY4Ordal : PAL.grassWarm;
  const grassRLo = isY4 ? PAL.grassY4OrdalLo : PAL.grassWarmLo;

  // Birth reveal helper (in-place pop/fade, NO swipe or fly-in!)
  const pop = (at: number) => (birthAnim ? popInPlace(f, at, 14) : 1);
  const signPop = birthAnim ? popInPlace(f, 155, 16) : 1;
  const villagerAlpha = birthAnim ? fadeIn(f, 118, 20) : 1;

  const allWalkers = [...(showVillagers ? DEFAULT_VILLAGERS : []), ...extraWalkers];

  // Animated 3-frame river wave offset
  const waveShift = (Math.floor(f / 10) % 3) * 14;

  return (
    <AbsoluteFill style={{backgroundColor: PAL.grassWarm}}>
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
        {/* 1. SHARED SKY (4 flat pixel bands, constant #8FC6E8 family) */}
        <rect x={0} y={0} width={1280} height={24} fill={PAL.skyTop} />
        <rect x={0} y={24} width={1280} height={28} fill={PAL.skyMid} />
        <rect x={0} y={52} width={1280} height={26} fill={PAL.skyLow} />
        <rect x={0} y={78} width={1280} height={22} fill={PAL.skyHoriz} />

        {/* 2. SHARED NORTHERN MOUNTAINS */}
        <polygon points="0,104 140,34 295,104" fill={PAL.mountainFar} />
        <polygon points="210,104 395,22 585,104" fill={PAL.mountainNear} />
        <polygon points="480,104 650,30 820,104" fill={PAL.mountainFar} />
        <polygon points="730,104 930,20 1125,104" fill={PAL.mountainNear} />
        <polygon points="1030,104 1175,36 1280,104" fill={PAL.mountainFar} />
        {/* Stepped mountain ridges */}
        <polygon points="365,36 395,22 425,36" fill={PAL.mountainSnow} />
        <polygon points="900,34 930,20 960,34" fill={PAL.mountainSnow} />

        {/* 3. SHARED GROUND (left Prestasi + right Orang Dalam blended naturally at the middle road — NO dividing line!) */}
        <rect x={0} y={104} width={640} height={616} fill={grassL} />
        <rect x={640} y={104} width={640} height={616} fill={grassR} />

        {/* Subtle pixel grass texture tiles on both sides */}
        {[180, 260, 350, 440, 510].map((ty, r) =>
          [70, 210, 370, 515, 760, 910, 1060, 1190].map((tx, c) => (
            <rect
              key={`${r}-${c}`}
              x={tx + ((r * 23) % 30)}
              y={ty}
              width={10}
              height={4}
              fill={tx < 640 ? PAL.grassWarmLo : grassRLo}
            />
          )),
        )}

        {/* 4. NORTHERN HIGHWAY TO THE CITY (horizontal road across top) */}
        <rect x={0} y={114} width={1280} height={36} fill="#7E7A72" />
        <rect x={0} y={114} width={1280} height={3} fill="#5C5852" />
        <rect x={0} y={147} width={1280} height={3} fill="#5C5852" />
        {Array.from({length: 22}).map((_, i) => (
          <rect key={i} x={i * 60 + 12} y={130} width={28} height={4} fill="#E6DEC4" />
        ))}

        {/* 5. SHARED MIDDLE ROAD (JALAN TENGAH — north-south dirt road connecting halte to bridge) */}
        <rect x={604} y={150} width={72} height={570} fill={PAL.roadWarm} />
        <rect x={602} y={150} width={4} height={570} fill={PAL.roadWarmLo} />
        <rect x={674} y={150} width={4} height={570} fill={PAL.roadWarmLo} />
        {/* Warm dirt pebbles */}
        {[185, 240, 315, 390, 465, 535].map((ry, i) => (
          <g key={ry}>
            <rect x={616 + (i % 3) * 14} y={ry} width={8} height={4} fill={PAL.roadWarmHi} />
            <rect x={644 - (i % 2) * 10} y={ry + 24} width={6} height={4} fill={PAL.roadWarmLo} />
          </g>
        ))}

        {/* Village branch dirt lanes into left & right villages */}
        <rect x={120} y={280} width={484} height={24} fill={PAL.roadWarm} />
        <rect x={120} y={425} width={484} height={22} fill={PAL.roadWarm} />
        <rect x={676} y={280} width={484} height={24} fill={PAL.roadWarm} />
        <rect x={676} y={425} width={484} height={22} fill={PAL.roadWarm} />

        {/* 6. HALTE + PASAR MINGGUAN (top of middle road where it meets highway) */}
        <g transform="translate(640, 166)">
          {/* Halte shelter */}
          <rect x={-36} y={-24} width={72} height={22} fill="#DED2B4" stroke={INK} strokeWidth={2} />
          <rect x={-42} y={-32} width={84} height={10} fill="#3C6B8A" stroke={INK} strokeWidth={2} />
          <rect x={-26} y={-10} width={52} height={6} fill={PAL.wood} />
          {/* Weekly market striped awning stalls beside halte */}
          <rect x={-114} y={-20} width={48} height={18} fill={PAL.woodHi} stroke={INK} strokeWidth={2} />
          <rect x={-118} y={-28} width={56} height={10} fill="#C94A38" stroke={INK} strokeWidth={2} />
          <rect x={-106} y={-27} width={10} height={8} fill="#F5EED8" />
          <rect x={-86} y={-27} width={10} height={8} fill="#F5EED8" />

          <rect x={66} y={-20} width={48} height={18} fill={PAL.woodHi} stroke={INK} strokeWidth={2} />
          <rect x={62} y={-28} width={56} height={10} fill="#468A58" stroke={INK} strokeWidth={2} />
          <rect x={74} y={-27} width={10} height={8} fill="#F5EED8" />
          <rect x={94} y={-27} width={10} height={8} fill="#F5EED8" />
        </g>

        {/* 7. LAPANGAN PERBATASAN (EMPTY border field — NO factory in preview!) */}
        <rect x={548} y={356} width={184} height={82} fill="#C5B076" stroke={PAL.roadWarmLo} strokeWidth={2} />
        <rect x={554} y={362} width={172} height={70} fill="#B3B86A" />
        {/* Re-draw middle road continuing cleanly past/through edge of field */}
        <rect x={604} y={350} width={72} height={94} fill={PAL.roadWarm} />
        <rect x={602} y={350} width={4} height={94} fill={PAL.roadWarmLo} />
        <rect x={674} y={350} width={4} height={94} fill={PAL.roadWarmLo} />

        {/* 8. SHARED SOUTHERN RIVER (#4FA3C7) + BRIDGE + RICE PADDIES */}
        {/* River banks */}
        <rect x={0} y={556} width={1280} height={64} fill={PAL.riverBank} />
        {/* Water */}
        <rect x={0} y={564} width={1280} height={48} fill={PAL.river} />
        <rect x={0} y={564} width={1280} height={6} fill={PAL.riverDeep} />
        {/* 3-frame animated river ripples */}
        {Array.from({length: 14}).map((_, i) => (
          <g key={i}>
            <rect x={(i * 96 + waveShift) % 1260} y={578 + (i % 2) * 14} width={28} height={4} fill={PAL.riverHi} />
            <rect x={(i * 96 + 46 + waveShift) % 1260} y={596} width={18} height={3} fill="#AEE0F2" />
          </g>
        ))}

        {/* Shared wooden bridge at south end of middle road */}
        <rect x={596} y={554} width={88} height={68} fill={PAL.wood} stroke={INK} strokeWidth={2.5} />
        {[562, 574, 586, 598, 610].map((by) => (
          <rect key={by} x={600} y={by} width={80} height={3} fill={PAL.woodLo} />
        ))}
        <rect x={596} y={554} width={8} height={68} fill={PAL.woodHi} stroke={INK} strokeWidth={1.5} />
        <rect x={676} y={554} width={8} height={68} fill={PAL.woodHi} stroke={INK} strokeWidth={1.5} />

        {/* Rice paddies (SAWAH) on both sides south of the river with varied green tones & pixel rice shoots */}
        {[
          [32, 632, 165, 72, '#86AE49'],
          [214, 632, 175, 72, '#92B852'],
          [406, 632, 172, 72, '#82A945'],
          [702, 632, 172, 72, isY4 ? '#8A9E56' : '#86AE49'],
          [892, 632, 175, 72, isY4 ? '#93A65E' : '#92B852'],
          [1084, 632, 165, 72, isY4 ? '#859852' : '#82A945'],
        ].map(([px, py, pw, ph, pCol], idx) => (
          <g key={idx}>
            <rect x={px as number} y={py as number} width={pw as number} height={ph as number} fill={pCol as string} stroke={PAL.roadWarmLo} strokeWidth={3} />
            {[14, 32, 50].map((ry) => (
              <g key={ry}>
                <rect x={(px as number) + 8} y={(py as number) + ry} width={(pw as number) - 16} height={6} fill={PAL.paddyWater} />
                {[18, 52, 86, 120, 146].map((rx) =>
                  rx < (pw as number) - 14 ? (
                    <rect key={rx} x={(px as number) + rx} y={(py as number) + ry - 4} width={4} height={6} fill="#5E9139" />
                  ) : null,
                )}
              </g>
            ))}
          </g>
        ))}

        {/* 9. VILLAGE BUILDINGS — SYMMETRICAL COUNT (6 buildings per village) */}
        {/* === LEFT: DESA PRESTASI === */}
        {/* Balai Desa Prestasi (glass board) */}
        <MapHouse
          x={506}
          y={258}
          w={88}
          h={60}
          roof={PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          boardGlass
          scale={pop(28)}
          frame={f}
        />
        {/* Sekolah Prestasi (flagpole) */}
        <MapHouse
          x={328}
          y={256}
          w={96}
          h={58}
          roof={PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          flagpole
          scale={pop(42)}
          frame={f}
        />
        {/* Rumah Pak Wiryo (simple yard near balai) */}
        <MapHouse
          x={468}
          y={392}
          w={68}
          h={50}
          roof={PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          smoke
          scale={pop(56)}
          frame={f}
        />
        {/* Toko Ayah Bimo (in Year 4: ONE freshly painted white house & bright terracotta roof!) */}
        <MapHouse
          x={290}
          y={398}
          w={78}
          h={54}
          roof={isY4 ? PAL.roofY4Fresh : PAL.roofWarm}
          roofLo={isY4 ? PAL.roofY4FreshLo : PAL.roofWarmLo}
          wall={isY4 ? PAL.wallY4Fresh : PAL.wallWarm}
          wallLo={isY4 ? PAL.wallY4FreshLo : PAL.wallWarmLo}
          scale={pop(66)}
          frame={f}
        />
        {/* Rumah Ujang (near middle road) */}
        <MapHouse
          x={504}
          y={518}
          w={62}
          h={48}
          roof={PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          smoke
          scale={pop(78)}
          frame={f}
        />
        {/* Rumah Rani (humble wood house near SW rice paddy edge) */}
        <MapHouse
          x={152}
          y={516}
          w={62}
          h={46}
          roof={PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall="#D8BA88"
          wallLo="#BFA06E"
          smoke
          scale={pop(90)}
          frame={f}
        />

        {/* === RIGHT: DESA ORANG DALAM === */}
        {/* Balai Desa Orang Dalam (wooden board) */}
        <MapHouse
          x={768}
          y={258}
          w={88}
          h={60}
          roof={isY4 ? PAL.roofY4Ordal : PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={isY4 ? PAL.wallY4Ordal : PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          boardWood
          scale={pop(32)}
          frame={f}
        />
        {/* Rumah Pak Darma — RIGHT NEXT TO BALAI, slightly bigger/fancier in Year 4! */}
        <MapHouse
          x={900}
          y={258}
          w={isY4 ? 94 : 82}
          h={isY4 ? 64 : 56}
          roof={PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={isY4 ? '#F5ECD2' : PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          fancy={isY4}
          scale={pop(46)}
          frame={f}
        />
        {/* Sekolah Orang Dalam (flagpole) */}
        <MapHouse
          x={1082}
          y={256}
          w={94}
          h={56}
          roof={isY4 ? PAL.roofY4Ordal : PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={isY4 ? PAL.wallY4Ordal : PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          flagpole
          scale={pop(60)}
          frame={f}
        />
        {/* Rumah Keluarga Dika (big house with iron fence) */}
        <MapHouse
          x={964}
          y={398}
          w={80}
          h={54}
          roof={PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          fence
          scale={pop(70)}
          frame={f}
        />
        {/* Rumah Udin (facing middle road; Year 4 has ONE tilted crooked wooden fence!) */}
        <MapHouse
          x={774}
          y={518}
          w={62}
          h={48}
          roof={isY4 ? PAL.roofY4Ordal : PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall={isY4 ? PAL.wallY4Ordal : PAL.wallWarm}
          wallLo={PAL.wallWarmLo}
          fence={isY4}
          crookedFence={isY4}
          smoke
          scale={pop(82)}
          frame={f}
        />
        {/* Rumah Sari & Bu Endang (small bamboo house at SE edge + GOAT PEN) */}
        <MapHouse
          x={1112}
          y={516}
          w={62}
          h={46}
          roof={isY4 ? PAL.roofY4Ordal : PAL.roofWarm}
          roofLo={PAL.roofWarmLo}
          wall="#D5B989"
          wallLo="#B89B6B"
          smoke
          scale={pop(94)}
          frame={f}
        />
        {/* Bu Endang's Goat Pen (kandang kambing) beside her SE house */}
        {pop(96) > 0.05 ? (
          <g transform={`translate(1018, 502) scale(${pop(96).toFixed(4)})`}>
            <rect x={-32} y={-22} width={64} height={34} fill="#B39864" stroke="#6E4E2E" strokeWidth={3} />
            <rect x={-32} y={-12} width={64} height={3} fill="#6E4E2E" />
          </g>
        ) : null}

        {/* 10. SYMMETRICAL TREES (8 left, 8 right) */}
        {[
          [94, 240, 102], [190, 232, 106], [108, 368, 110], [202, 386, 114],
          [386, 384, 118], [90, 514, 122], [250, 512, 126], [386, 514, 130],
        ].map(([tx, ty, at], i) => (
          <MapTree key={`tl${i}`} x={tx} y={ty} scale={pop(at)} frame={f} phase={i} />
        ))}
        {[
          [1190, 240, 104], [1002, 232, 108], [1174, 368, 112], [1072, 386, 116],
          [858, 384, 120], [1192, 514, 124], [898, 512, 128], [712, 386, 132],
        ].map(([tx, ty, at], i) => (
          <MapTree key={`tr${i}`} x={tx} y={ty} scale={pop(at)} frame={f} phase={i + 5} dull={isY4 && i % 3 === 0} />
        ))}
      </svg>

      {/* Goats in Bu Endang's pen (continuity: 4 before sale, 2 after Year 2!) */}
      {pop(98) > 0.2 ? (
        <>
          {[
            [1002, 500],
            [1028, 496],
            [1014, 510],
            [1036, 510],
          ]
            .slice(0, goatsInPen)
            .map(([gx, gy], idx) => (
              <PixelGoat key={idx} x={gx} y={gy} size={22} facingLeft={idx % 2 === 1} phase={idx * 3} />
            ))}
        </>
      ) : null}

      {/* Village signboards on both sides of the middle road (appear last in P1) */}
      <VillageSignboard
        x={534}
        y={346}
        label="DESA PRESTASI"
        scale={0.86 * signPop}
        opacity={signPop > 0.02 ? 1 : 0}
      />
      <VillageSignboard
        x={746}
        y={346}
        label="DESA ORANG DALAM"
        scale={0.86 * signPop}
        weathered={isY4}
        tiltDeg={isY4 ? 2.2 : 0}
        opacity={signPop > 0.02 ? 1 : 0}
      />

      {/* Wooden scoreboard standing along the middle road next to the empty border field */}
      {scoreMode !== 'hidden' ? (
        <WoodenScoreboard
          x={640}
          y={456}
          scale={0.28 * pop(140)}
          yearLabel={scoreMode === 'y2' ? 'TAHUN 2' : scoreMode === 'y4' ? 'TAHUN 4' : ''}
          scoreLeft={scoreMode === 'y2' ? '44' : scoreMode === 'y4' ? '51' : ''}
          scoreRight={scoreMode === 'y2' ? '43' : scoreMode === 'y4' ? '48' : ''}
          mg={
            scoreMode === 'y4'
              ? {
                  barLeftRatio: 51 / 54,
                  barRightRatio: 48 / 54,
                  diffLabel: 'SELISIH 3',
                  diffPop: 1,
                  diffOpacity: 1,
                }
              : undefined
          }
        />
      ) : null}

      {/* Ambient & custom RPG walking sprites (24-40px tall) */}
      <div style={{position: 'absolute', inset: 0, opacity: villagerAlpha}}>
        {allWalkers.map((w) => {
          const ev = evalWalker(f, w.path, {
            speed: w.speed ?? 36,
            phase: w.phase ?? 0,
            loopMode: w.loopMode ?? 'pingpong',
            startFrame: w.startFrame ?? 0,
          });
          return (
            <MiniPixelSprite
              key={w.id}
              x={ev.x}
              y={ev.y}
              shirt={w.shirt}
              pants={w.pants}
              skin={w.skin}
              hair={w.hair}
              hat={w.hat}
              hatColor={w.hatColor}
              height={w.height ?? 30}
              facingLeft={ev.facingLeft}
              walking={ev.moving}
              phase={(w.phase ?? 0) * 10}
            />
          );
        })}
      </div>

      {children}
    </AbsoluteFill>
  );
};
