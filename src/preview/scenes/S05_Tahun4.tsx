import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {PIXEL_FONT} from '../../pixelFont';
import {CLAMP, PAL, SmoothCamera, fadeIn} from '../previewPlan';
import {PixelCharacter} from '../PixelCharacters';
import {PixelSky, PostmanBicycle, WoodenScoreboard} from '../PixelProps';
import {VillageMap} from '../VillageMap';

const INK = PAL.ink;

/**
 * BEAT 11: T4_1_kota_surat (f4531-4671, dur 140)
 * - Cut 1 (0..62): City university lecture hall — Rani in front row diligently taking notes (Dika asleep in back row!).
 * - Cut 2 (62..140): Tracking shot following postman on bicycle pedaling along middle road, turning left into
 *   Desa Prestasi to hand a letter to Ibu Rani, who smiles beside a growing stack of letters on her porch table.
 */
export const T4_1_kota_surat: React.FC = () => {
  const f = useCurrentFrame();

  if (f < 62) {
    // Cut 1: City university lecture hall
    return (
      <SmoothCamera dur={62} zoomFrom={1.0} zoomTo={1.08} origin="38% 60%">
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
          {/* City university wall (cooler slate-cream) */}
          <rect x={0} y={0} width={1280} height={415} fill="#DCE2E6" />
          <rect x={0} y={415} width={1280} height={305} fill="#8F7356" />
          {/* Large university blackboard */}
          <rect x={210} y={34} width={860} height={224} fill="#5C3D24" stroke={INK} strokeWidth={5} />
          <rect x={228} y={52} width={824} height={188} fill="#21382E" stroke={INK} strokeWidth={3} />
          {/* Chalk diagrams/lines (in-world blackboard) */}
          <rect x={280} y={92} width={220} height={5} fill="#D8E6DC" />
          <rect x={280} y={118} width={310} height={5} fill="#D8E6DC" />
          <rect x={280} y={144} width={180} height={5} fill="#D8E6DC" />
          <rect x={710} y={96} width={240} height={5} fill="#D8E6DC" />
          <rect x={710} y={128} width={190} height={5} fill="#D8E6DC" />
          {/* Tiered lecture benches */}
          <rect x={120} y={388} width={1040} height={24} fill={PAL.wood} stroke={INK} strokeWidth={3} />
          <rect x={120} y={412} width={1040} height={52} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 178,
            width: 800,
            textAlign: 'center',
            fontFamily: PIXEL_FONT,
            fontSize: 15,
            color: '#DCEAE0',
          }}
        >
          KULIAH — KOTA
        </div>

        {/* Back row: Dika asleep on his book! */}
        <PixelCharacter id="dika" x={845} y={222} height={198} facing="left" pose="sit" mood="sleep" />
        {/* Back row desk */}
        <div style={{position: 'absolute', left: 820, top: 374, width: 170, height: 14, backgroundColor: PAL.paper, border: `2px solid ${INK}`}} />

        {/* Front row: Rani diligently taking notes (~228px seated) */}
        <PixelCharacter id="rani" x={310} y={356} height={228} facing="right" pose="write" mood="focus" />
        {/* Front lecture desk */}
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
          <rect x={180} y={482} width={920} height={28} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
          <rect x={180} y={510} width={920} height={150} fill={PAL.wood} stroke={INK} strokeWidth={4} />
          {/* Open notebook in front of Rani */}
          <rect x={375} y={464} width={132} height={24} fill={PAL.paper} stroke={INK} strokeWidth={2.5} />
          <rect x={440} y={464} width={3} height={24} fill={INK} />
        </svg>
      </SmoothCamera>
    );
  }

  // Cut 2 (62..140): Tracking shot following postman cycling down middle road, turning left to Ibu Rani's porch with growing stack of letters
  const lf = f - 62;
  const bikeX = interpolate(lf, [0, 56], [820, 445], {...CLAMP, easing: Easing.out(Easing.cubic)});
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
          {/* Middle road at right & lane turning left into Prestasi */}
          <rect x={0} y={488} width={1440} height={232} fill={PAL.roadWarm} />
          <rect x={0} y={486} width={1440} height={6} fill={PAL.roadWarmLo} />
          <polygon points="940,240 1070,240 1135,488 875,488" fill={PAL.roadWarm} />

          {/* Ibu Rani's wooden porch on left (freshly neat) */}
          <g transform="translate(80, 168)">
            <polygon points="-14,104 38,16 370,16 420,104" fill={PAL.roofY4Fresh} stroke={INK} strokeWidth={4} />
            <rect x={16} y={104} width={376} height={224} fill={PAL.wallY4Fresh} stroke={INK} strokeWidth={4} />
            <rect x={16} y={266} width={376} height={62} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            {/* Porch wooden table holding growing stack of monthly letters from Rani */}
            <rect x={265} y={230} width={108} height={18} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
            <rect x={275} y={248} width={12} height={76} fill={PAL.woodLo} stroke={INK} strokeWidth={2} />
            <rect x={352} y={248} width={12} height={76} fill={PAL.woodLo} stroke={INK} strokeWidth={2} />
            {/* Tall stack of white letters on table */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={288 + (i % 2) * 3}
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
        <PixelCharacter id="ibu_rani" x={125} y={196} height={300} facing="right" mood="happy" holding="letter" />
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
 */
export const T4_2_toko: React.FC = () => {
  const f = useCurrentFrame();
  const handBob = Math.sin(f / 8) * 3;

  return (
    <SmoothCamera dur={342} zoomFrom={1.0} zoomTo={1.08} origin="50% 52%">
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
        {/* Clean freshly painted Year 4 shop interior */}
        <rect x={0} y={0} width={1280} height={470} fill={PAL.wallY4Fresh} />
        <rect x={0} y={470} width={1280} height={250} fill="#9C6F42" />
        {/* Hanging wooden shop signboard */}
        <rect x={440} y={26} width={400} height={58} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
        <rect x={452} y={36} width={376} height={38} fill="#F4EBD2" stroke={INK} strokeWidth={2} />

        {/* Stocked shelves behind counter */}
        {[128, 226, 324].map((sy) => (
          <g key={sy}>
            <rect x={64} y={sy + 48} width={520} height={14} fill={PAL.wood} stroke={INK} strokeWidth={3} />
            {/* Pixel jars, oil bottles, spice cans */}
            {[86, 146, 206, 276, 336, 396, 456, 516].map((jx, idx) => (
              <rect
                key={jx}
                x={jx}
                y={sy + (idx % 2) * 8}
                width={38}
                height={48 - (idx % 2) * 8}
                fill={['#D9643F', '#E8B838', '#4E8C54', '#5C90B8'][idx % 4]}
                stroke={INK}
                strokeWidth={2.5}
              />
            ))}
          </g>
        ))}

        {/* Rice sacks on right side */}
        {[930, 1040, 1145].map((rx, idx) => (
          <g key={rx}>
            <rect x={rx} y={330 + idx * 8} width={88} height={138 - idx * 8} fill="#E4D6B4" stroke={INK} strokeWidth={3} />
            <rect x={rx + 18} y={368 + idx * 8} width={52} height={12} fill="#C4533C" />
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

      {/* Bimo (Year 4: green shop apron + pencil behind ear, smiling focused, ~325px) behind counter */}
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
 * Three crisp cuts, continuous smooth camera motion in every cut:
 * - 0..210: Sari in the rice paddy of Desa Orang Dalam with woven caping hat & faded mustard shirt.
 * - 210..410: Ayah Dika walks into Pak Darma's grander Year 4 house carrying an envelope.
 * - 410..627: Dika sits at his Desa Orang Dalam office desk in cream uniform with wooden desk nameplate "DIKA".
 */
export const T4_3_sawah_kantor: React.FC = () => {
  const f = useCurrentFrame();

  if (f < 210) {
    // Cut 1: Sari working in rice paddy (shared #8FC6E8 sky & mountains)
    const plantBob = Math.sin(f / 14) * 5;
    return (
      <SmoothCamera dur={210} zoomFrom={1.0} zoomTo={1.07} xFrom={-15} xTo={15} origin="50% 56%">
        <PixelSky mode="day" height={245} />
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          <polygon points="0,245 270,126 560,245" fill={PAL.mountainFar} />
          <polygon points="440,245 810,112 1180,245" fill={PAL.mountainNear} />
          <polygon points="1040,245 1240,144 1280,245" fill={PAL.mountainFar} />
          {/* Rice paddy mud embankments & flooded rice plots */}
          <rect x={0} y={245} width={1280} height={475} fill={PAL.paddyWarm} />
          {[285, 368, 468, 588].map((py) => (
            <g key={py}>
              <rect x={0} y={py} width={1280} height={14} fill={PAL.roadWarmLo} />
              <rect x={0} y={py + 14} width={1280} height={64} fill={PAL.paddyWater} />
            </g>
          ))}
          {/* Pixel rice shoot tufts */}
          {Array.from({length: 14}).map((_, i) => (
            <g key={i} transform={`translate(${i * 94 + 26}, ${490 + (i % 2) * 86})`}>
              <rect x={0} y={0} width={6} height={24} fill="#6CA346" />
              <rect x={10} y={-4} width={6} height={28} fill="#88BD5B" />
              <rect x={20} y={2} width={6} height={22} fill="#6CA346" />
            </g>
          ))}
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

  if (f < 410) {
    // Cut 2: Ayah Dika approaching Pak Darma's grander Year 4 house carrying thick envelope
    const lf = f - 210;
    const walkX = interpolate(lf, [0, 150], [210, 520], {...CLAMP, easing: Easing.out(Easing.cubic)});

    return (
      <SmoothCamera dur={200} startFrame={210} endFrame={410} zoomFrom={1.0} zoomTo={1.07} origin="62% 52%">
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

  // Cut 3: Interior of Desa Orang Dalam office — Dika seated in cream office uniform with nameplate "DIKA"
  const lf = f - 410;
  return (
    <SmoothCamera dur={217} startFrame={410} endFrame={627} zoomFrom={1.0} zoomTo={1.09} origin="50% 54%">
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
        {/* Slightly duller cream office wall */}
        <rect x={0} y={0} width={1280} height={470} fill="#E0D2AF" />
        <rect x={0} y={470} width={1280} height={250} fill="#7B6B56" />
        {/* Office window showing shared blue sky */}
        <rect x={92} y={76} width={212} height={192} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        <rect x={106} y={90} width={184} height={164} fill={PAL.skyMid} stroke={INK} strokeWidth={2} />
        <rect x={196} y={90} width={6} height={164} fill={PAL.wood} />
        <rect x={106} y={168} width={184} height={6} fill={PAL.wood} />
        {/* Office wall sign */}
        <rect x={436} y={62} width={408} height={54} fill={PAL.woodLo} stroke={INK} strokeWidth={4} />
        <rect x={448} y={72} width={384} height={34} fill="#F2EAD4" stroke={INK} strokeWidth={2} />
        {/* Empty filing cabinet at right */}
        <rect x={990} y={168} width={170} height={304} fill="#8C897E" stroke={INK} strokeWidth={4} />
        {[200, 294, 388].map((cy) => (
          <g key={cy}>
            <rect x={1006} y={cy} width={138} height={76} fill="#A3A094" stroke={INK} strokeWidth={2.5} />
            <rect x={1058} y={cy + 30} width={34} height={10} fill="#46443F" />
          </g>
        ))}
        {/* High-back office chair behind Dika */}
        <rect x={534} y={248} width={212} height={196} fill="#5C3B24" stroke={INK} strokeWidth={4} />
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

      {/* Dika seated in cream long-sleeve village office uniform (year4, ~238px seated) */}
      <PixelCharacter id="dika" x={515} y={288} height={240} facing="right" year4 pose="sit" mood="smug" />

      {/* Large wooden office desk + unopened red folder + wooden desk nameplate "DIKA" */}
      <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <rect x={236} y={454} width={808} height={30} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
        <rect x={256} y={484} width={768} height={206} fill={PAL.wood} stroke={INK} strokeWidth={4} />
        {/* Unopened red folder sitting untouched on desk */}
        <rect x={312} y={432} width={142} height={22} fill="#B83E35" stroke={INK} strokeWidth={3} />
        {/* Wooden desk nameplate block */}
        <rect x={526} y={412} width={228} height={48} fill="#4A2E1A" stroke={INK} strokeWidth={4} />
        <rect x={538} y={422} width={204} height={28} fill={PAL.gold} stroke={INK} strokeWidth={2} />
      </svg>

      {/* Physical nameplate text on desk */}
      <div
        style={{
          position: 'absolute',
          left: 538,
          top: 428,
          width: 204,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 15,
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
 * - 225..430: Continuous eased zoom OUT into the wide Year 4 two-village map showing the subtle Year 4 divergence:
 *   ONE house freshly painted white in Desa Prestasi, ONE tilted fence in Desa Orang Dalam, grander Pak Darma house,
 *   empty border field (NO factory!), Bu Endang's pen still missing 2 goats (2 left).
 */
export const T4_4_papan_skor: React.FC = () => {
  const f = useCurrentFrame();

  // First half: close-up wooden scoreboard (51 vs 48)
  const closeZoom = interpolate(f, [0, 170], [1.0, 1.24], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
  const flip = interpolate(f, [18, 44], [0, 1], {...CLAMP, easing: Easing.out(Easing.cubic)});

  // Smooth transition from close scoreboard to wide Year 4 map (continuous zoom out from 2.2x -> 1.0x!)
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
            y={576}
            scale={1.42}
            yearLabel="TAHUN 4"
            scoreLeft="51"
            scoreRight="48"
            flipProgress={flip}
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
