import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {PIXEL_FONT} from '../../pixelFont';
import {CLAMP, PAL, SmoothCamera, fadeIn, popInPlace} from '../previewPlan';
import {PixelCharacter} from '../PixelCharacters';
import {PixelBus, PixelSky, PostmanBicycle, VillageSignboard, WoodenScoreboard} from '../PixelProps';
import {VillageMap} from '../VillageMap';

const INK = PAL.ink;

/**
 * BEAT 11: T4_1_kota_surat (f4531-4671, dur 140)
 * - Cut 1 (0..62): City university lecture hall — Rani in front row FULL & UNOBSCURED taking notes (~232px seated),
 *   Dika in back row genuinely SMALLER (~152px, proper perspective!) dozing over desk, REAL short chalk text on blackboard (F2!).
 * - Cut 2 (62..140): Tracking shot following postman on bicycle pedaling along middle road, turning left into
 *   Desa Prestasi to hand a letter to Ibu Rani, who smiles beside a growing stack of letters on her porch table.
 */
export const T4_1_kota_surat: React.FC = () => {
  const f = useCurrentFrame();

  if (f < 62) {
    // Cut 1: City university lecture hall (F2 FIXED: proper perspective, Rani full torso above desk, real chalk text!)
    return (
      <SmoothCamera dur={62} zoomFrom={1.0} zoomTo={1.07} origin="40% 58%">
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
          {/* City university wall (cooler slate-cream) + dado rail */}
          <rect x={0} y={0} width={1280} height={395} fill="#DCE2E6" />
          <rect x={0} y={395} width={1280} height={325} fill="#8F7356" />
          {/* Small university wall clock at left of blackboard (F5) */}
          <g transform="translate(126, 76)">
            <rect x={0} y={0} width={44} height={44} fill="#5C3D24" stroke={INK} strokeWidth={3} />
            <rect x={6} y={6} width={32} height={32} fill="#F7F5EE" />
            <rect x={20} y={11} width={3} height={12} fill={INK} />
            <rect x={20} y={21} width={10} height={3} fill="#B83B32" />
          </g>
          {/* Small framed campus notice on right wall (F5) */}
          <g transform="translate(1110, 76)">
            <rect x={0} y={0} width={46} height={58} fill="#5C3D24" stroke={INK} strokeWidth={3} />
            <rect x={6} y={6} width={34} height={46} fill="#F2EDE0" />
            <rect x={10} y={12} width={26} height={8} fill="#3C6B8A" />
            <rect x={10} y={26} width={22} height={4} fill="#7B7364" />
            <rect x={10} y={35} width={18} height={4} fill="#7B7364" />
          </g>
          {/* Large university blackboard (ZERO placeholder bars — real chalk text rendered below!) */}
          <rect x={210} y={30} width={860} height={224} fill="#5C3D24" stroke={INK} strokeWidth={5} />
          <rect x={228} y={48} width={824} height={188} fill="#21382E" stroke={INK} strokeWidth={3} />
          {/* Chalk tray with chalk & eraser */}
          <rect x={202} y={252} width={876} height={14} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
          <rect x={320} y={244} width={36} height={8} fill="#F4F2EA" stroke={INK} strokeWidth={1.5} />
          <rect x={890} y={240} width={46} height={12} fill="#C97D45" stroke={INK} strokeWidth={1.5} />
        </svg>

        {/* Real short chalk text on university blackboard (F2 — NO placeholder bars!) */}
        <div
          style={{
            position: 'absolute',
            left: 244,
            top: 72,
            width: 792,
            textAlign: 'center',
            fontFamily: PIXEL_FONT,
            color: '#E4EFE8',
          }}
        >
          <div style={{fontSize: 19, letterSpacing: '0.06em'}}>KULIAH — KOTA</div>
          <div style={{fontSize: 11, color: '#C2D8CA', marginTop: 22}}>EKONOMI &amp; TATA KELOLA</div>
          <div style={{fontSize: 10, color: '#A9C4B4', marginTop: 14}}>BAB 4: SUMBER DAYA DESA</div>
        </div>

        {/* Back row: Dika genuinely SMALLER (height=144 vs Rani's 232!) dozing over back bench with clean margin under chalk tray */}
        <PixelCharacter id="dika" x={842} y={278} height={144} facing="left" pose="slouch_desk" mood="sleep" />
        {/* Back row tiered bench + closed textbook */}
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <rect x={140} y={384} width={1000} height={20} fill={PAL.wood} stroke={INK} strokeWidth={3} />
          <rect x={140} y={404} width={1000} height={46} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
          {/* Closed textbook next to sleeping Dika */}
          <rect x={785} y={372} width={78} height={12} fill="#B83E35" stroke={INK} strokeWidth={2} />
          <rect x={792} y={375} width={64} height={4} fill="#E6D5A8" />
        </svg>

        {/* Front row: Rani seated FULL & UNOBSCURED (~232px, head + full blue blouse + arms cleanly above desk!) */}
        <PixelCharacter id="rani" x={286} y={300} height={232} facing="right" pose="write" mood="focus" />
        {/* Front lecture desk */}
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <rect x={160} y={488} width={960} height={28} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
          <rect x={160} y={516} width={960} height={150} fill={PAL.wood} stroke={INK} strokeWidth={4} />
          {/* Open notebook positioned cleanly in front of Rani's writing hand */}
          <rect x={436} y={470} width={144} height={24} fill={PAL.paper} stroke={INK} strokeWidth={2.5} />
          <rect x={507} y={470} width={3} height={24} fill={INK} />
          <rect x={448} y={477} width={48} height={3} fill={PAL.paperLine} />
          <rect x={448} y={483} width={42} height={3} fill={PAL.paperLine} />
          <rect x={520} y={477} width={48} height={3} fill={PAL.paperLine} />
          <rect x={520} y={483} width={38} height={3} fill={PAL.paperLine} />
        </svg>
      </SmoothCamera>
    );
  }

  // Cut 2 (62..140): Tracking shot following postman cycling down middle road, turning left to Ibu Rani's porch with growing stack of letters
  const lf = f - 62;
  const bikeX = interpolate(lf, [0, 56], [820, 465], {...CLAMP, easing: Easing.out(Easing.cubic)});
  const camX = interpolate(lf, [0, 78], [-85, 45], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
  const camZoom = interpolate(lf, [0, 78], [1.04, 1.09], {...CLAMP, easing: Easing.inOut(Easing.quad)});

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: PAL.skyMid}}>
      <AbsoluteFill style={{transform: `translate(${camX.toFixed(2)}px, 0px) scale(${camZoom.toFixed(5)})`, transformOrigin: '50% 54%'}}>
        <PixelSky mode="day" height={240} />
        <svg width={1440} height={720} viewBox="0 0 1440 720" shapeRendering="crispEdges" style={{position: 'absolute', left: -80, top: 0}}>
          <polygon points="0,240 310,130 640,240" fill={PAL.mountainFar} />
          <polygon points="540,240 960,120 1440,240" fill={PAL.mountainNear} />
          {/* Ground (Year 4 Prestasi slightly fresher green on left) */}
          <rect x={0} y={240} width={1440} height={250} fill={PAL.grassY4Prestasi} />
          {/* Subtle tree & grass tufts (F5) */}
          <g transform="translate(650, 310)">
            <rect x={-7} y={-8} width={14} height={28} fill={PAL.wood} stroke={INK} strokeWidth={2.5} />
            <rect x={-26} y={-46} width={52} height={40} fill={PAL.treeTop} stroke={INK} strokeWidth={2.5} />
            <rect x={-18} y={-54} width={36} height={12} fill={PAL.treeHi} />
          </g>
          {[560, 760, 1210].map((gx, i) => (
            <rect key={gx} x={gx} y={350 + i * 36} width={22} height={6} fill={PAL.grassWarmLo} />
          ))}
          {/* Middle road at right & lane turning left into Prestasi */}
          <rect x={0} y={488} width={1440} height={232} fill={PAL.roadWarm} />
          <rect x={0} y={486} width={1440} height={6} fill={PAL.roadWarmLo} />
          <polygon points="940,240 1070,240 1135,488 875,488" fill={PAL.roadWarm} />

          {/* Ibu Rani's wooden porch on left (freshly neat) */}
          <g transform="translate(70, 168)">
            <polygon points="-14,104 38,16 390,16 440,104" fill={PAL.roofY4Fresh} stroke={INK} strokeWidth={4} />
            <rect x={16} y={104} width={396} height={224} fill={PAL.wallY4Fresh} stroke={INK} strokeWidth={4} />
            {/* Small porch window */}
            <rect x={44} y={128} width={68} height={62} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            <rect x={52} y={136} width={52} height={46} fill="#7DB3CF" />
            <rect x={16} y={266} width={396} height={62} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            {/* Porch wooden table holding growing stack of monthly letters from Rani */}
            <rect x={285} y={230} width={108} height={18} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
            <rect x={295} y={248} width={12} height={76} fill={PAL.woodLo} stroke={INK} strokeWidth={2} />
            <rect x={372} y={248} width={12} height={76} fill={PAL.woodLo} stroke={INK} strokeWidth={2} />
            {/* Tall stack of white letters on table */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={308 + (i % 2) * 3}
                y={220 - i * 8}
                width={62}
                height={9}
                fill={PAL.paper}
                stroke={INK}
                strokeWidth={2}
              />
            ))}
          </g>
        </svg>

        {/* Ibu Rani smiling holding an open letter on her porch */}
        <PixelCharacter id="ibu_rani" x={115} y={196} height={300} facing="right" mood="happy" holding="letter" />
        {/* Postman riding bicycle smoothly left into Desa Prestasi */}
        <PostmanBicycle x={bikeX} y={592} scale={2.25} facingLeft />
        <AbsoluteFill style={{backgroundColor: '#1A1612', opacity: 1 - fadeIn(lf, 0, 5), pointerEvents: 'none'}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * BEAT 12: T4_2_toko (f4671-5013, dur 342)
 * Proportionate close-up interior of Ayah Bimo's shop.
 * Bimo wears his GREEN SHOP APRON + YELLOW PENCIL behind his ear (brief-visual §5 Year 4!),
 * counting change for a customer and recording stock in his ledger (BUKU STOK).
 * F5 polish: varied shelf goods sizes/colors/labels + small wall clock & framed calendar.
 */
export const T4_2_toko: React.FC = () => {
  const f = useCurrentFrame();
  const handBob = Math.sin(f / 8) * 3;

  // Varied pixel shop goods per shelf row [x, width, height, color, labelColor]
  const shelfRows: Array<{y: number; items: Array<[number, number, number, string, string]>}> = [
    {
      y: 128,
      items: [
        [78, 28, 50, '#D9643F', '#F7E7B4'],
        [114, 46, 36, '#E8B838', '#9E3828'],
        [174, 24, 52, '#4E8C54', '#E6F2D8'],
        [204, 24, 52, '#4E8C54', '#E6F2D8'],
        [244, 52, 34, '#5C90B8', '#F2F6FA'],
        [312, 34, 44, '#C45B47', '#F4E2B6'],
        [356, 44, 38, '#D9A844', '#6E4A24'],
        [418, 28, 48, '#6B8F4E', '#F4F0DE'],
        [462, 50, 32, '#8E5B3C', '#E8D2A4'],
        [524, 38, 42, '#4B7B9C', '#F2EBD4'],
      ],
    },
    {
      y: 226,
      items: [
        [82, 54, 34, '#5C90B8', '#F5EED8'],
        [148, 30, 48, '#C95A3F', '#F4D27A'],
        [188, 30, 48, '#C95A3F', '#F4D27A'],
        [236, 42, 40, '#E0B23E', '#5C3B1E'],
        [292, 26, 52, '#3E7D4E', '#E8F2D6'],
        [330, 56, 36, '#B8543B', '#F7EFE0'],
        [402, 36, 44, '#7E9C52', '#F4EED4'],
        [452, 46, 38, '#D69E3C', '#8C3228'],
        [514, 44, 46, '#4E7596', '#F5F0DE'],
      ],
    },
    {
      y: 324,
      items: [
        [76, 42, 42, '#E0A83B', '#7A3A24'],
        [128, 32, 48, '#4A8252', '#F2F0D8'],
        [174, 50, 34, '#C8523A', '#F7EBD2'],
        [240, 28, 50, '#5A8AB0', '#EAF2F8'],
        [280, 44, 38, '#8A6240', '#EAD6AE'],
        [338, 34, 46, '#D9643F', '#F7EED4'],
        [384, 52, 36, '#5E9256', '#F4F0D6'],
        [452, 32, 44, '#E2B442', '#6E3C22'],
        [500, 56, 34, '#547F9E', '#F2EBD4'],
      ],
    },
  ];

  return (
    <SmoothCamera dur={342} zoomFrom={1.0} zoomTo={1.08} origin="50% 52%">
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
        {/* Clean freshly painted Year 4 shop interior */}
        <rect x={0} y={0} width={1280} height={470} fill={PAL.wallY4Fresh} />
        <rect x={0} y={448} width={1280} height={22} fill="#E6DEC4" />
        <rect x={0} y={470} width={1280} height={250} fill="#9C6F42" />
        {/* Hanging wooden shop signboard */}
        <rect x={440} y={26} width={400} height={58} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
        <rect x={452} y={36} width={376} height={38} fill="#F4EBD2" stroke={INK} strokeWidth={2} />

        {/* Small pixel wall clock & framed calendar on right wall (F5) */}
        <g transform="translate(960, 74)">
          <rect x={0} y={0} width={48} height={48} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
          <rect x={6} y={6} width={36} height={36} fill="#FAF6E8" />
          <rect x={22} y={12} width={3} height={13} fill={INK} />
          <rect x={22} y={22} width={11} height={3} fill="#C2352B" />
        </g>
        <g transform="translate(1058, 72)">
          <rect x={0} y={0} width={76} height={92} fill={PAL.wood} stroke={INK} strokeWidth={3} />
          <rect x={6} y={6} width={64} height={80} fill="#FAF5E4" />
          <rect x={6} y={6} width={64} height={20} fill="#C94A38" />
          <rect x={14} y={34} width={48} height={5} fill="#8C8270" />
          <rect x={14} y={46} width={38} height={5} fill="#8C8270" />
          <rect x={14} y={58} width={44} height={5} fill="#8C8270" />
          <rect x={14} y={70} width={30} height={5} fill="#8C8270" />
        </g>

        {/* Varied stocked shelves behind counter (F5) */}
        {shelfRows.map((row) => (
          <g key={row.y}>
            <rect x={64} y={row.y + 48} width={520} height={14} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            {row.items.map(([jx, jw, jh, col, lbl]) => (
              <g key={jx}>
                <rect x={jx} y={row.y + 48 - jh} width={jw} height={jh} fill={col} stroke={INK} strokeWidth={2.5} />
                {/* Cap or top strip */}
                <rect x={jx + 4} y={row.y + 48 - jh - 4} width={Math.max(8, jw - 8)} height={5} fill="#5C4A38" stroke={INK} strokeWidth={1.5} />
                {/* Printed paper label on jar/tin */}
                <rect x={jx + 5} y={row.y + 48 - Math.floor(jh * 0.62)} width={Math.max(8, jw - 10)} height={10} fill={lbl} />
              </g>
            ))}
          </g>
        ))}

        {/* Rice sacks on right side */}
        {[930, 1040, 1145].map((rx, idx) => (
          <g key={rx}>
            <rect x={rx} y={330 + idx * 8} width={88} height={138 - idx * 8} fill="#E4D6B4" stroke={INK} strokeWidth={3} />
            <rect x={rx + 18} y={368 + idx * 8} width={52} height={12} fill="#C4533C" />
            <rect x={rx + 26} y={388 + idx * 8} width={36} height={6} fill="#8C7E62" />
          </g>
        ))}
      </svg>

      {/* Physical shop signboard text */}
      <div
        style={{
          position: 'absolute',
          left: 452,
          top: 45,
          width: 376,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 16,
          color: INK,
        }}
      >
        TOKO KELUARGA BIMO
      </div>

      {/* Bimo (Year 4: green shop apron + pencil cleanly behind ear, smiling focused, ~325px) behind counter */}
      <PixelCharacter id="bimo" x={420} y={248} height={325} facing="right" year4 mood="happy" />

      {/* Customer standing at right side of counter (~325px) */}
      <PixelCharacter id="villager_a" x={820} y={258} height={325} facing="left" mood="happy" />

      {/* Foreground wooden shop counter + stock ledger + calculator + rupiah change */}
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <rect x={110} y={456} width={1060} height={30} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
        <rect x={126} y={486} width={1028} height={206} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        {/* Physical ledger cover beside open pages */}
        <rect x={210} y={422} width={144} height={34} fill="#36593C" stroke={INK} strokeWidth={3} />
        {/* Open stock ledger */}
        <rect x={375} y={422} width={186} height={38} fill={PAL.paper} stroke={INK} strokeWidth={3} />
        <rect x={466} y={422} width={4} height={38} fill={INK} />
        <rect x={392} y={434} width={60} height={4} fill={PAL.paperLine} />
        <rect x={484} y={434} width={60} height={4} fill={PAL.paperLine} />
        <rect x={484} y={444} width={46} height={4} fill={PAL.paperLine} />
        {/* Small pixel calculator */}
        <rect x={582} y={428} width={60} height={32} fill="#363B42" stroke={INK} strokeWidth={3} />
        <rect x={590} y={433} width={44} height={10} fill="#9BC49A" />
        {/* Banknotes / change handed across counter */}
        <rect x={685} y={434 + handBob * 0.5} width={68} height={24} fill="#6CA66C" stroke={INK} strokeWidth={2.5} />
        <rect x={695} y={440 + handBob * 0.5} width={48} height={12} fill="#96C994" />
      </svg>

      {/* Physical printed title on the green ledger cover on the counter */}
      <div
        style={{
          position: 'absolute',
          left: 214,
          top: 433,
          width: 136,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 9,
          color: '#FFF6DE',
        }}
      >
        BUKU STOK
      </div>
    </SmoothCamera>
  );
};

/**
 * BEAT 13: T4_3_sawah_kantor (f5013-5640, dur 627)
 * Four crisp sentence-synced cuts, continuous smooth camera motion in every cut:
 * - 0..260 (167.10-175.77s): "Di Desa Orang Dalam, Sari bekerja di sawah. Bukan karena dia bodoh. Karena kursinya sudah ada yang punya."
 *   -> Sari in multi-tone green rice paddy with woven caping & faded mustard shirt (F5 enriched paddy).
 * - 260..415 (175.77-180.93s): "Sementara Dika — baru dua tahun di kota, dia gagal mengikuti pelajaran dan memilih pulang."
 *   -> Dika steps off the KOTA bus at the halte carrying his suitcase, walking home defeated.
 * - 415..512 (180.93-184.17s): "Ayahnya tidak panik. Dia tinggal membayar Pak Darma lagi,"
 *   -> Ayah Dika strides into Pak Darma's grander Year 4 house offering a thick envelope.
 * - 512..627 (184.17-188.01s): "dan Dika langsung duduk di kantor desa."
 *   -> Dika sits FULL & UNOBSCURED at his Desa Orang Dalam office desk in cream uniform with nameplate "DIKA" (F5: no sinking behind desk!).
 */
export const T4_3_sawah_kantor: React.FC = () => {
  const f = useCurrentFrame();

  if (f < 260) {
    // Cut 1: Sari working in rice paddy (F5: varied green paddy tones + dense rice plant clusters + distant hut/trees)
    const plantBob = Math.sin(f / 14) * 5;
    return (
      <SmoothCamera dur={260} zoomFrom={1.0} zoomTo={1.07} xFrom={-15} xTo={15} origin="50% 56%">
        <PixelSky mode="day" height={245} />
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          <polygon points="0,245 270,126 560,245" fill={PAL.mountainFar} />
          <polygon points="440,245 810,112 1180,245" fill={PAL.mountainNear} />
          <polygon points="1040,245 1240,144 1280,245" fill={PAL.mountainFar} />
          {/* Varied green rice paddy terraces (F5: not flat empty stripes!) */}
          <rect x={0} y={245} width={1280} height={62} fill="#96B558" />
          <rect x={0} y={307} width={1280} height={82} fill="#88A94D" />
          <rect x={0} y={389} width={1280} height={106} fill="#7FA146" />
          <rect x={0} y={495} width={1280} height={225} fill="#769940" />
          {/* Distant small bamboo field hut (saung) & trees on horizon */}
          <g transform="translate(168, 224)">
            <rect x={0} y={14} width={78} height={36} fill="#C6A672" stroke={INK} strokeWidth={2.5} />
            <polygon points="-10,16 14,-8 64,-8 88,16" fill="#8C6239" stroke={INK} strokeWidth={2.5} />
            <rect x={28} y={24} width={22} height={26} fill="#593B20" />
          </g>
          {[96, 276, 1086, 1184].map((tx) => (
            <g key={tx} transform={`translate(${tx}, 248)`}>
              <rect x={-5} y={-8} width={10} height={22} fill={PAL.wood} stroke={INK} strokeWidth={2} />
              <rect x={-20} y={-38} width={40} height={32} fill={PAL.treeTop} stroke={INK} strokeWidth={2} />
              <rect x={-14} y={-44} width={28} height={10} fill={PAL.treeHi} />
            </g>
          ))}
          {/* Mud embankments (pematang) + flooded water strips */}
          {[288, 376, 480, 602].map((py, rowIdx) => (
            <g key={py}>
              <rect x={0} y={py} width={1280} height={14} fill={rowIdx % 2 === 0 ? PAL.roadWarmLo : '#9E6E3E'} />
              <rect x={0} y={py + 14} width={1280} height={54 + rowIdx * 6} fill={rowIdx % 2 === 0 ? '#6E9A5E' : '#658F56'} />
              {/* Subtle water glint strips */}
              {[90, 380, 740, 1060].map((wx) => (
                <rect key={wx} x={wx + rowIdx * 30} y={py + 26} width={42} height={4} fill="#8FBC7E" opacity={0.65} />
              ))}
            </g>
          ))}
          {/* Multi-tone pixel rice shoot clusters across upper, mid & foreground terraces */}
          {[320, 412, 514, 628].map((ry, rIdx) =>
            Array.from({length: 13}).map((_, i) => {
              const cx = i * 98 + (rIdx % 2) * 44 + 18;
              const h = 16 + rIdx * 5;
              return (
                <g key={`${rIdx}-${i}`} transform={`translate(${cx}, ${ry})`}>
                  <rect x={0} y={0} width={5} height={h} fill="#5C8F38" />
                  <rect x={8} y={-4} width={5} height={h + 4} fill="#88BD5B" />
                  <rect x={16} y={2} width={5} height={h - 2} fill="#6CA346" />
                  {rIdx >= 2 ? <rect x={24} y={-2} width={4} height={h} fill="#A3CF6D" /> : null}
                </g>
              );
            }),
          )}
        </svg>
        {/* Sari with woven caping & faded mustard shirt working in paddy (~315px) */}
        <PixelCharacter
          id="sari"
          x={500}
          y={285 + plantBob}
          height={315}
          facing="right"
          caping
          pose="farm"
          mood="sad"
        />
      </SmoothCamera>
    );
  }

  if (f < 415) {
    // Cut 2 (260..415): Dika returns home from city alone with his suitcase ("baru dua tahun di kota, dia gagal mengikuti pelajaran dan memilih pulang")
    const lf = f - 260;
    const busDepartX = interpolate(lf, [12, 130], [640, 1420], {...CLAMP, easing: Easing.in(Easing.quad)});
    const dikaWalkX = interpolate(lf, [0, 155], [560, 760], {...CLAMP, easing: Easing.inOut(Easing.quad)});
    const dikaWalkY = interpolate(lf, [0, 155], [272, 342], {...CLAMP, easing: Easing.inOut(Easing.quad)});

    return (
      <SmoothCamera dur={155} startFrame={260} endFrame={415} zoomFrom={1.0} zoomTo={1.08} origin="56% 54%">
        <PixelSky mode="day" height={235} />
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          <polygon points="0,235 220,120 460,235" fill={PAL.mountainFar} />
          <polygon points="360,235 660,104 960,235" fill={PAL.mountainNear} />
          <polygon points="840,235 1120,126 1280,235" fill={PAL.mountainFar} />
          {/* Northern highway */}
          <rect x={0} y={235} width={1280} height={92} fill="#7B776F" />
          <rect x={0} y={235} width={1280} height={5} fill="#59554E" />
          <rect x={0} y={322} width={1280} height={5} fill="#59554E" />
          {Array.from({length: 16}).map((_, i) => (
            <rect key={i} x={i * 88 + 18} y={278} width={44} height={6} fill="#EAE2C8" />
          ))}
          {/* Year 4 subtle ground & middle road */}
          <rect x={0} y={327} width={640} height={393} fill={PAL.grassY4Prestasi} />
          <rect x={640} y={327} width={640} height={393} fill={PAL.grassY4Ordal} />
          {[110, 290, 960, 1130].map((gx, i) => (
            <rect key={gx} x={gx} y={400 + (i % 2) * 90} width={22} height={6} fill={gx < 640 ? PAL.grassWarmLo : PAL.grassY4OrdalLo} />
          ))}
          <polygon points="575,327 705,327 745,720 535,720" fill={PAL.roadWarm} />
          <polygon points="571,327 577,327 539,720 532,720" fill={PAL.roadWarmLo} />
          <polygon points="703,327 709,327 749,720 742,720" fill={PAL.roadWarmLo} />
          {/* Halte shelter */}
          <g transform="translate(566, 206)">
            <rect x={0} y={28} width={148} height={90} fill="#DED2B4" stroke={INK} strokeWidth={3} />
            <rect x={-12} y={8} width={172} height={24} fill="#3C6B8A" stroke={INK} strokeWidth={3} />
            <rect x={20} y={76} width={108} height={14} fill={PAL.wood} stroke={INK} strokeWidth={2} />
          </g>
        </svg>
        {/* Village signboards matching T2_5 geography */}
        <VillageSignboard x={470} y={536} label="DESA PRESTASI" scale={0.95} />
        <VillageSignboard x={838} y={536} label="DESA ORANG DALAM" scale={0.95} weathered tiltDeg={2.2} />
        {/* Bus from city pulling away */}
        <PixelBus x={busDepartX} y={322} scale={1.36} moving={lf >= 12} showPassengers={false} />
        {/* Dika walking back toward Desa Orang Dalam holding his suitcase, defeated */}
        <PixelCharacter
          id="dika"
          x={dikaWalkX}
          y={dikaWalkY}
          height={295}
          facing="right"
          mood="sad"
          holding="suitcase"
        />
        <AbsoluteFill style={{backgroundColor: '#1A1612', opacity: 1 - fadeIn(lf, 0, 5), pointerEvents: 'none'}} />
      </SmoothCamera>
    );
  }

  if (f < 512) {
    // Cut 3 (415..512): Ayah Dika approaching Pak Darma's grander Year 4 house carrying thick envelope
    const lf = f - 415;
    const walkX = interpolate(lf, [0, 72], [230, 515], {...CLAMP, easing: Easing.out(Easing.cubic)});

    return (
      <SmoothCamera dur={97} startFrame={415} endFrame={512} zoomFrom={1.0} zoomTo={1.07} origin="62% 52%">
        <PixelSky mode="day" height={235} />
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          <rect x={0} y={235} width={1280} height={265} fill={PAL.grassY4Ordal} />
          <rect x={0} y={500} width={1280} height={220} fill={PAL.roadWarm} />
          <rect x={0} y={498} width={1280} height={6} fill={PAL.roadWarmLo} />

          {/* Pak Darma's grander Year 4 house (white pillars + gold trim — only improving house in Orang Dalam!) */}
          <g transform="translate(610, 96)">
            <polygon points="-22,124 44,12 610,12 666,124" fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
            <rect x={-16} y={110} width={676} height={14} fill={PAL.roofWarmLo} />
            <rect x={12} y={124} width={624} height={290} fill="#F5ECD2" stroke={INK} strokeWidth={4} />
            {/* Gold decorative frieze */}
            <rect x={12} y={126} width={624} height={14} fill={PAL.gold} stroke={INK} strokeWidth={2} />
            {/* White classical porch pillars */}
            {[42, 232, 430, 594].map((px) => (
              <rect key={px} x={px} y={140} width={22} height={274} fill="#FAF6EA" stroke={INK} strokeWidth={2.5} />
            ))}
            {/* Large wooden front doorway */}
            <rect x={92} y={208} width={116} height={206} fill="#362418" stroke={INK} strokeWidth={4} />
          </g>
        </svg>

        {/* Pak Darma welcoming Ayah Dika warmly at the door */}
        <PixelCharacter id="pak_darma" x={760} y={232} height={355} facing="left" mood="smug" />
        {/* Ayah Dika striding up with thick envelope */}
        <PixelCharacter
          id="ayah_dika"
          x={walkX}
          y={235}
          height={352}
          facing="right"
          pose="offer_envelope"
          holding="envelope_thick"
          mood="smug"
        />
        <AbsoluteFill style={{backgroundColor: '#1A1612', opacity: 1 - fadeIn(lf, 0, 5), pointerEvents: 'none'}} />
      </SmoothCamera>
    );
  }

  // Cut 4 (512..627): Interior of Desa Orang Dalam office — Dika seated FULL & UNOBSCURED in cream uniform with nameplate "DIKA"
  const lf = f - 512;
  return (
    <SmoothCamera dur={115} startFrame={512} endFrame={627} zoomFrom={1.0} zoomTo={1.08} origin="50% 54%">
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
        {/* Slightly duller cream office wall */}
        <rect x={0} y={0} width={1280} height={470} fill="#E0D2AF" />
        <rect x={0} y={452} width={1280} height={18} fill="#C9BA94" />
        <rect x={0} y={470} width={1280} height={250} fill="#7B6B56" />
        {/* Office window showing shared blue sky */}
        <rect x={92} y={76} width={212} height={192} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        <rect x={106} y={90} width={184} height={164} fill={PAL.skyMid} stroke={INK} strokeWidth={2} />
        <rect x={196} y={90} width={6} height={164} fill={PAL.wood} />
        <rect x={106} y={168} width={184} height={6} fill={PAL.wood} />
        {/* Small pixel wall clock beside window (F5) */}
        <g transform="translate(338, 86)">
          <rect x={0} y={0} width={44} height={44} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
          <rect x={6} y={6} width={32} height={32} fill="#F5F0E0" />
          <rect x={20} y={11} width={3} height={12} fill={INK} />
          <rect x={20} y={20} width={10} height={3} fill="#B83B32" />
        </g>
        {/* Office wall sign */}
        <rect x={436} y={62} width={408} height={54} fill={PAL.woodLo} stroke={INK} strokeWidth={4} />
        <rect x={448} y={72} width={384} height={34} fill="#F2EAD4" stroke={INK} strokeWidth={2} />
        {/* Small framed notice/calendar on wall left of filing cabinet (F5) */}
        <g transform="translate(884, 82)">
          <rect x={0} y={0} width={68} height={82} fill={PAL.wood} stroke={INK} strokeWidth={3} />
          <rect x={6} y={6} width={56} height={70} fill="#F4EDD8" />
          <rect x={6} y={6} width={56} height={16} fill="#8C5B32" />
          <rect x={12} y={30} width={44} height={4} fill="#8A806E" />
          <rect x={12} y={42} width={34} height={4} fill="#8A806E" />
          <rect x={12} y={54} width={40} height={4} fill="#8A806E" />
        </g>
        {/* Empty filing cabinet at right */}
        <rect x={990} y={168} width={170} height={304} fill="#8C897E" stroke={INK} strokeWidth={4} />
        {[200, 294, 388].map((cy) => (
          <g key={cy}>
            <rect x={1006} y={cy} width={138} height={76} fill="#A3A094" stroke={INK} strokeWidth={2.5} />
            <rect x={1058} y={cy + 30} width={34} height={10} fill="#46443F" />
          </g>
        ))}
        {/* High-back office chair behind Dika (aligned to raised Dika) */}
        <rect x={534} y={224} width={212} height={224} fill="#5C3B24" stroke={INK} strokeWidth={4} />
      </svg>

      {/* Wall plaque (physical in-world prop) */}
      <div
        style={{
          position: 'absolute',
          left: 448,
          top: 81,
          width: 384,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 13,
          color: INK,
        }}
      >
        KANTOR DESA ORANG DALAM
      </div>

      {/* Dika seated FULL & UNOBSCURED in cream long-sleeve office uniform (F5: torso clearly visible above desk!) */}
      <PixelCharacter id="dika" x={512} y={248} height={244} facing="right" year4 pose="sit" mood="smug" />

      {/* Large wooden office desk + unopened red folder + wooden desk nameplate "DIKA" placed cleanly so Dika's torso is visible */}
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <rect x={236} y={468} width={808} height={28} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
        <rect x={256} y={496} width={768} height={194} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        {/* Unopened red folder sitting untouched on desk */}
        <rect x={300} y={446} width={144} height={22} fill="#B83E35" stroke={INK} strokeWidth={3} />
        {/* Coffee mug on right */}
        <rect x={918} y={436} width={34} height={32} fill="#F2EAD6" stroke={INK} strokeWidth={3} />
        <rect x={952} y={444} width={10} height={14} fill="none" stroke={INK} strokeWidth={3} />
        {/* Wooden desk nameplate mounted cleanly on right-front of desk (never hiding Dika's torso!) */}
        <rect x={684} y={426} width={206} height={42} fill="#4A2E1A" stroke={INK} strokeWidth={4} />
        <rect x={694} y={434} width={186} height={26} fill={PAL.gold} stroke={INK} strokeWidth={2} />
      </svg>

      {/* Physical nameplate text on desk */}
      <div
        style={{
          position: 'absolute',
          left: 694,
          top: 440,
          width: 186,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 14,
          color: INK,
        }}
      >
        DIKA
      </div>
      <AbsoluteFill style={{backgroundColor: '#1A1612', opacity: 1 - fadeIn(lf, 0, 5), pointerEvents: 'none'}} />
    </SmoothCamera>
  );
};

/**
 * BEAT 14: T4_4_papan_skor (f5640-6070, dur 430)
 * - 0..225: Slow eased zoom into wooden scoreboard showing "TAHUN 4", 51 (Prestasi) vs 48 (Orang Dalam), holds.
 *   MG synced to narration ("skornya [39..54] 51 [54..71] lawan [71..78] 48 [78..95], selisihnya masih kecil [115..149]."):
 *   - Left score counts continuously 0 -> 51 (f42..72) while recessed left bar grows in lockstep.
 *   - Right score counts continuously 0 -> 48 (f68..97) while recessed right bar grows in lockstep.
 *   - When numbers stop, hanging wooden "SELISIH 3" tag pops cleanly in under the board (f102..118).
 * - 225..430: Continuous eased zoom OUT into the wide Year 4 two-village map showing the subtle Year 4 divergence:
 *   ONE house freshly painted white in Desa Prestasi, ONE tilted fence in Desa Orang Dalam, grander Pak Darma house,
 *   empty border field (NO factory!), Bu Endang's pen still missing 2 goats (2 left).
 */
export const T4_4_papan_skor: React.FC = () => {
  const f = useCurrentFrame();

  // First half: close-up wooden scoreboard (51 vs 48)
  const closeZoom = interpolate(f, [0, 170], [1.0, 1.24], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
  const flip = interpolate(f, [8, 30], [0, 1], {...CLAMP, easing: Easing.out(Easing.cubic)});

  // Continuous eased count-up & bar growth synced verbatim to "51 lawan 48"
  const SCORE_BAR_MAX = 54;
  const leftVal = interpolate(f, [42, 72], [0, 51], {...CLAMP, easing: Easing.out(Easing.cubic)});
  const rightVal = interpolate(f, [68, 97], [0, 48], {...CLAMP, easing: Easing.out(Easing.cubic)});
  const leftPulse =
    1 + 0.06 * interpolate(f, [70, 75, 84], [0, 1, 0], {...CLAMP, easing: Easing.inOut(Easing.quad)});
  const rightPulse =
    1 + 0.06 * interpolate(f, [95, 100, 109], [0, 1, 0], {...CLAMP, easing: Easing.inOut(Easing.quad)});

  // Small wooden "SELISIH 3" tag pops in under the board right after numbers stop
  const diffPop = popInPlace(f, 102, 16);
  const diffOpacity = fadeIn(f, 102, 8);

  // Smooth transition from close scoreboard to wide Year 4 map (continuous zoom out from 1.85x -> 1.0x!)
  const mapBlend = interpolate(f, [210, 245], [0, 1], {...CLAMP, easing: Easing.inOut(Easing.quad)});
  const mapZoomOut = interpolate(f, [215, 430], [1.85, 1.0], {...CLAMP, easing: Easing.inOut(Easing.cubic)});

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: PAL.skyMid}}>
      {/* Close-up roadside scoreboard (f 0..245) */}
      {mapBlend < 0.999 ? (
        <AbsoluteFill
          style={{
            transformOrigin: '50% 56%',
            transform: `scale(${closeZoom.toFixed(5)})`,
            opacity: 1 - mapBlend,
          }}
        >
          <PixelSky mode="day" height={270} />
          <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
            <polygon points="0,270 250,140 520,270" fill={PAL.mountainFar} />
            <polygon points="400,270 740,124 1080,270" fill={PAL.mountainNear} />
            <polygon points="940,270 1180,148 1280,270" fill={PAL.mountainFar} />
            {/* Subtle Year 4 ground difference left vs right, joined naturally by the shared middle dirt road */}
            <rect x={0} y={266} width={640} height={236} fill={PAL.grassY4Prestasi} />
            <rect x={640} y={266} width={640} height={236} fill={PAL.grassY4Ordal} />
            {/* Empty border field (NO factory!) */}
            <rect x={160} y={336} width={960} height={110} fill="#B3B86A" />
            {/* Subtle distant trees & grass tufts (F5; Orang Dalam side slightly duller) */}
            {[245, 360].map((tx) => (
              <g key={tx} transform={`translate(${tx}, 280)`}>
                <rect x={-5} y={-8} width={10} height={20} fill={PAL.wood} stroke={INK} strokeWidth={2} />
                <rect x={-18} y={-34} width={36} height={28} fill={PAL.treeTop} stroke={INK} strokeWidth={2} />
                <rect x={-12} y={-40} width={24} height={10} fill={PAL.treeHi} />
              </g>
            ))}
            {[915, 1030].map((tx) => (
              <g key={tx} transform={`translate(${tx}, 280)`}>
                <rect x={-5} y={-8} width={10} height={20} fill={PAL.wood} stroke={INK} strokeWidth={2} />
                <rect x={-18} y={-34} width={36} height={28} fill="#5B7C4B" stroke={INK} strokeWidth={2} />
                <rect x={-12} y={-40} width={24} height={10} fill="#6F8F5D" />
              </g>
            ))}
            {[140, 390, 880, 1120].map((gx, i) => (
              <rect key={gx} x={gx} y={456 + (i % 2) * 14} width={20} height={6} fill={gx < 640 ? PAL.grassWarmLo : PAL.grassY4OrdalLo} />
            ))}
            {/* Shared middle dirt road running north-south cleanly into perspective (zero vertical seam!) */}
            <polygon points="590,266 690,266 790,502 490,502" fill={PAL.roadWarm} />
            <polygon points="586,266 592,266 496,502 488,502" fill={PAL.roadWarmLo} />
            <polygon points="688,266 694,266 792,502 784,502" fill={PAL.roadWarmLo} />
            {/* Left distant house: freshly painted crisp white + bright terracotta roof */}
            <rect x={85} y={258} width={90} height={54} fill={PAL.wallY4Fresh} stroke={INK} strokeWidth={3} />
            <polygon points="75,260 98,226 164,226 186,260" fill={PAL.roofY4Fresh} stroke={INK} strokeWidth={3} />
            {/* Right distant house: duller + tilted crooked fence */}
            <rect x={1105} y={258} width={90} height={54} fill={PAL.wallY4Ordal} stroke={INK} strokeWidth={3} />
            <polygon points="1095,260 1118,226 1184,226 1206,260" fill={PAL.roofY4Ordal} stroke={INK} strokeWidth={3} />
            <g transform="translate(1070, 304) rotate(-8)">
              <rect x={0} y={0} width={145} height={8} fill={PAL.woodLo} stroke={INK} strokeWidth={2} />
            </g>
            {/* Middle dirt road */}
            <rect x={0} y={500} width={1280} height={220} fill={PAL.roadWarm} />
            <rect x={0} y={498} width={1280} height={6} fill={PAL.roadWarmLo} />
          </svg>

          <WoodenScoreboard
            x={640}
            y={588}
            scale={1.42}
            yearLabel="TAHUN 4"
            scoreLeft={String(Math.round(leftVal))}
            scoreRight={String(Math.round(rightVal))}
            flipProgress={flip}
            mg={{
              barLeftRatio: leftVal / SCORE_BAR_MAX,
              barRightRatio: rightVal / SCORE_BAR_MAX,
              leftPulse,
              rightPulse,
              diffLabel: 'SELISIH 3',
              diffPop,
              diffOpacity,
            }}
          />
        </AbsoluteFill>
      ) : null}

      {/* Wide Year 4 map zooming smoothly out as preview closing shot */}
      {mapBlend > 0.001 ? (
        <AbsoluteFill
          style={{
            opacity: mapBlend,
            transformOrigin: '50% 58%',
            transform: `scale(${mapZoomOut.toFixed(5)})`,
          }}
        >
          <VillageMap era="y4" goatsInPen={2} scoreMode="y4" showVillagers />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
