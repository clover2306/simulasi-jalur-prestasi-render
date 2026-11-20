import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {PIXEL_FONT} from '../../pixelFont';
import {CLAMP, PAL, SmoothCamera, fadeIn} from '../previewPlan';
import {PixelCharacter, PixelGoat} from '../PixelCharacters';
import {PixelSky} from '../PixelProps';

const INK = PAL.ink;

/** Exterior wall + glass/wood announcement board backdrop for Year 2 results scenes. */
const AnnouncementSceneBg: React.FC<{
  glass: boolean;
  topName: string;
  listItems: string[];
}> = ({glass, topName, listItems}) => (
  <AbsoluteFill>
    <PixelSky mode="day" height={230} clouds={false} />
    <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
      {/* Balai exterior wall (identical warm Year 2 cream) */}
      <rect x={0} y={130} width={1280} height={378} fill={PAL.wallWarm} />
      <rect x={0} y={110} width={1280} height={28} fill={PAL.roofWarm} stroke={INK} strokeWidth={4} />
      <rect x={0} y={130} width={1280} height={8} fill={PAL.roofWarmLo} />
      {/* Yard dirt ground */}
      <rect x={0} y={508} width={1280} height={212} fill={PAL.roadWarm} />
      <rect x={0} y={506} width={1280} height={6} fill={PAL.roadWarmLo} />
      {/* Wooden board frame mounted on wall */}
      <rect x={420} y={168} width={440} height={272} fill={glass ? PAL.wood : PAL.woodLo} stroke={INK} strokeWidth={5} />
      <rect x={438} y={186} width={404} height={236} fill={glass ? '#C6E0EA' : PAL.woodHi} stroke={INK} strokeWidth={3} />
      {/* Pinned official results paper */}
      <rect x={476} y={204} width={328} height={200} fill={PAL.paper} stroke={INK} strokeWidth={3} />
      <rect x={486} y={212} width={10} height={10} fill={PAL.waxRed} />
      <rect x={784} y={212} width={10} height={10} fill={PAL.waxRed} />
      {glass ? <rect x={450} y={196} width={14} height={44} fill="rgba(255,255,255,0.45)" /> : null}
    </svg>

    {/* Physical printed text on the pinned results paper */}
    <div
      style={{
        position: 'absolute',
        left: 492,
        top: 220,
        width: 296,
        fontFamily: PIXEL_FONT,
        color: INK,
      }}
    >
      <div style={{fontSize: 11, textAlign: 'center', color: PAL.roofWarm, borderBottom: `2px solid ${INK}`, paddingBottom: 8}}>
        HASIL SELEKSI BEASISWA
      </div>
      <div
        style={{
          marginTop: 14,
          padding: '6px 8px',
          backgroundColor: '#EAE0C0',
          border: `2px solid ${INK}`,
          fontSize: 15,
          color: '#1F4F2B',
        }}
      >
        1. {topName}
      </div>
      <div style={{marginTop: 10, fontSize: 10, lineHeight: 2.1, color: '#4B4438'}}>
        {listItems.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

/**
 * BEAT 6: T2_1_umumkan_prestasi (f2510-3279, dur 769)
 * - 0..270: Pak Wiryo pins list; Rani #1 on top; Rani covers mouth in joyful disbelief.
 * - 270..560: Ayah Bimo pulls Pak Wiryo aside and offers envelope; focus zooms on faces as Pak Wiryo pushes envelope back & points to board!
 * - 560..769: Ayah Bimo bows head in shame; Bimo gazes at the board where his name is missing.
 */
export const T2_1_umumkan_prestasi: React.FC = () => {
  const f = useCurrentFrame();

  if (f < 270) {
    return (
      <SmoothCamera dur={270} zoomFrom={1.0} zoomTo={1.08} origin="48% 48%">
        <AnnouncementSceneBg
          glass
          topName="RANI"
          listItems={['2. HENDRA', '3. DEWI', '4. AGUS', '5. LESTARI']}
        />
        {/* Rani covers mouth in joyful disbelief (~335px standing teen) */}
        <PixelCharacter id="rani" x={185} y={285} height={335} facing="right" pose="shock_mouth" mood="shock" />
        {/* Pak Wiryo beside board with clipboard (~385px standing adult) */}
        <PixelCharacter id="pak_wiryo" x={885} y={242} height={385} facing="left" pose="point_board" mood="neutral" holding="clipboard" />
      </SmoothCamera>
    );
  }

  if (f < 560) {
    // Sub-shot B: Close-up focus on faces as Ayah Bimo offers envelope and Pak Wiryo firmly rejects & points to board
    const lf = f - 270;
    const rejectStep = interpolate(lf, [85, 130], [0, 1], {...CLAMP, easing: Easing.out(Easing.cubic)});
    const pushBackX = rejectStep * 36;
    const zoom = interpolate(lf, [0, 290], [1.06, 1.24], {...CLAMP, easing: Easing.inOut(Easing.cubic)});

    return (
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <AbsoluteFill style={{transformOrigin: '52% 45%', transform: `scale(${zoom.toFixed(5)})`}}>
          <AnnouncementSceneBg
            glass
            topName="RANI"
            listItems={['2. HENDRA', '3. DEWI', '4. AGUS', '5. LESTARI']}
          />
          {/* Ayah Bimo offering thick envelope from left (~380px standing adult) */}
          <PixelCharacter
            id="ayah_bimo"
            x={335 - pushBackX}
            y={252}
            height={380}
            facing="right"
            pose="offer_envelope"
            holding="envelope_thick"
            mood={rejectStep > 0.5 ? 'shame' : 'neutral'}
          />
          {/* Pak Wiryo firmly pushing envelope away and pointing up to score board (~390px standing adult) */}
          <PixelCharacter
            id="pak_wiryo"
            x={675}
            y={242}
            height={390}
            facing="left"
            pose={rejectStep > 0.35 ? 'reject_point' : 'stand'}
            mood="stern"
            holding="clipboard"
          />
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  // Sub-shot C: Ayah Bimo bows head in shame; Bimo quietly gazes at the list without his name
  const lf = f - 560;
  return (
    <SmoothCamera dur={209} startFrame={560} endFrame={769} zoomFrom={1.02} zoomTo={1.09} origin="50% 50%">
      <AnnouncementSceneBg
        glass
        topName="RANI"
        listItems={['2. HENDRA', '3. DEWI', '4. AGUS', '5. LESTARI']}
      />
      {/* Bimo staring sadly at board (~330px standing teen) */}
      <PixelCharacter id="bimo" x={205} y={292} height={330} facing="right" pose="stand" mood="sad" />
      {/* Ayah Bimo head bowed in shame clutching rejected envelope (~382px) */}
      <PixelCharacter id="ayah_bimo" x={885} y={248} height={382} facing="left" pose="stand" mood="shame" holding="envelope_thick" />
      <AbsoluteFill style={{backgroundColor: '#1A1612', opacity: 1 - fadeIn(lf, 0, 5), pointerEvents: 'none'}} />
    </SmoothCamera>
  );
};

/**
 * BEAT 7: T2_2_umumkan_orang_dalam (f3279-3740, dur 461)
 * Desa Orang Dalam wooden announcement board: "1. DIKA" at the top.
 * Sari traces the list with her finger and cannot find her name; Bu Endang stands right behind her.
 */
export const T2_2_umumkan_orang_dalam: React.FC = () => {
  const f = useCurrentFrame();
  // Sari's attached pointing hand traces gently down the paper list
  const traceArtY = interpolate(f, [60, 280], [-4, 6], {...CLAMP, easing: Easing.inOut(Easing.quad)});
  const foundNothing = f > 240;

  return (
    <SmoothCamera dur={461} zoomFrom={1.0} zoomTo={1.12} origin="48% 46%">
      <AnnouncementSceneBg
        glass={false}
        topName="DIKA"
        listItems={['2. RAKA', '3. TONO', '4. SINTA', '5. BAGAS']}
      />
      {/* Bu Endang standing right behind Sari (~380px standing adult) */}
      <PixelCharacter id="bu_endang" x={95} y={248} height={380} facing="right" pose="stand" mood="sad" />
      {/* Sari standing close to board, tracing down the announcement list with her own attached pointing finger (~335px standing teen) */}
      <PixelCharacter
        id="sari"
        x={278}
        y={285}
        height={335}
        facing="right"
        pose="point_board"
        pointOffsetY={traceArtY}
        mood={foundNothing ? 'sad' : 'focus'}
      />
    </SmoothCamera>
  );
};

/**
 * BEAT 8: T2_3_kambing_amplop (f3740-4008, dur 268)
 * Three crisp cuts:
 * - 0..95 (DAY): Bu Endang leads TWO goats on ropes to the weekly market at halte (and sells them).
 * - 95..180 (NIGHT): At Pak Darma's front door under warm lantern, Bu Endang hands him her THIN envelope.
 * - 180..268 (CLOSE-UP DRAWER): Inside Pak Darma's open wooden drawer, his hand (agate ring!) puts Ayah Dika's
 *   THICK envelope into the same drawer beside Bu Endang's thin one and the tariff sheet "Uang administrasi 15 juta".
 */
export const T2_3_kambing_amplop: React.FC = () => {
  const f = useCurrentFrame();

  if (f < 95) {
    // Cut 1: DAY — Bu Endang leads TWO goats on ropes to the weekly market at halte
    const walkX = interpolate(f, [0, 95], [140, 560], {...CLAMP, easing: Easing.inOut(Easing.quad)});
    return (
      <SmoothCamera dur={95} zoomFrom={1.0} zoomTo={1.06} origin="55% 60%">
        <PixelSky mode="day" height={260} />
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          <polygon points="0,260 280,150 560,260" fill={PAL.mountainFar} />
          <polygon points="480,260 880,140 1280,260" fill={PAL.mountainNear} />
          <rect x={0} y={260} width={1280} height={220} fill={PAL.grassWarm} />
          <rect x={0} y={480} width={1280} height={240} fill={PAL.roadWarm} />
          <rect x={0} y={478} width={1280} height={6} fill={PAL.roadWarmLo} />
          {/* Weekly market striped awning stall at right */}
          <rect x={870} y={280} width={310} height={206} fill={PAL.woodHi} stroke={INK} strokeWidth={4} />
          <rect x={850} y={230} width={350} height={54} fill="#C94A38" stroke={INK} strokeWidth={4} />
          {[876, 946, 1016, 1086, 1156].map((sx) => (
            <rect key={sx} x={sx} y={234} width={32} height={46} fill="#F5EED8" />
          ))}
          <rect x={920} y={356} width={220} height={130} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
          {/* Rope lines from Bu Endang's hand to the TWO goats */}
          <line x1={walkX + 115} y1={470} x2={walkX - 35} y2={525} stroke="#7A5A32" strokeWidth={4} />
          <line x1={walkX + 115} y1={470} x2={walkX - 115} y2={535} stroke="#7A5A32" strokeWidth={4} />
        </svg>
        {/* Market signboard */}
        <div
          style={{
            position: 'absolute',
            left: 910,
            top: 298,
            width: 240,
            textAlign: 'center',
            fontFamily: PIXEL_FONT,
            fontSize: 13,
            color: '#FFF6DE',
            backgroundColor: PAL.woodLo,
            border: `3px solid ${INK}`,
            padding: '6px 8px',
          }}
        >
          PASAR MINGGUAN
        </div>
        {/* TWO goats led on ropes */}
        <PixelGoat x={walkX - 40} y={585} size={96} coat="#F0E8D4" phase={1} />
        <PixelGoat x={walkX - 125} y={596} size={92} coat="#DCD1BA" phase={4} />
        {/* Bu Endang walking right */}
        <PixelCharacter id="bu_endang" x={walkX + 40} y={268} height={335} facing="right" mood="sad" />
        {/* Market buyer waiting at stall */}
        <PixelCharacter id="villager_a" x={970} y={288} height={310} facing="left" mood="neutral" />
      </SmoothCamera>
    );
  }

  if (f < 180) {
    // Cut 2: NIGHT — Bu Endang hands THIN envelope to Pak Darma at his doorway
    const lf = f - 95;
    return (
      <SmoothCamera dur={85} startFrame={95} endFrame={180} zoomFrom={1.0} zoomTo={1.07} origin="56% 52%">
        <PixelSky mode="night" height={250} clouds={false} />
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges" style={{position: 'absolute', inset: 0}}>
          {/* Night yard */}
          <rect x={0} y={250} width={1280} height={260} fill="#394B34" />
          <rect x={0} y={510} width={1280} height={210} fill="#5C4834" />
          {/* Pak Darma's grand front porch at night */}
          <rect x={580} y={136} width={680} height={380} fill="#877961" stroke={INK} strokeWidth={4} />
          <polygon points="550,144 630,66 1280,66 1280,144" fill="#5E352B" stroke={INK} strokeWidth={4} />
          {/* Warm open doorway */}
          <rect x={700} y={214} width={196} height={302} fill="#C98A3E" stroke={INK} strokeWidth={4} />
          <rect x={716} y={230} width={164} height={286} fill="#E6B25C" />
          {/* Flat pixel porch lantern + stepped yellow light cone (NO smooth glow/blur!) */}
          <rect x={656} y={182} width={22} height={30} fill={PAL.lampWarm} stroke={INK} strokeWidth={3} />
          <polygon points="654,212 680,212 750,510 560,510" fill="#FFE58A" opacity={0.14} />
        </svg>
        {/* Bu Endang humbly offering THIN envelope */}
        <PixelCharacter
          id="bu_endang"
          x={405}
          y={270}
          height={340}
          facing="right"
          pose="offer_envelope"
          holding="envelope_thin"
          mood="sad"
        />
        {/* Pak Darma at doorway receiving it */}
        <PixelCharacter id="pak_darma" x={710} y={248} height={365} facing="left" mood="smug" />
        <AbsoluteFill style={{backgroundColor: '#0E1420', opacity: 1 - fadeIn(lf, 0, 5), pointerEvents: 'none'}} />
      </SmoothCamera>
    );
  }

  // Cut 3: CLOSE-UP DRAWER — Pak Darma puts Ayah Dika's THICK envelope into the same drawer beside tariff list "Uang administrasi 15 juta"
  const lf = f - 180;
  const handDrop = interpolate(lf, [10, 54], [-140, 0], {...CLAMP, easing: Easing.out(Easing.cubic)});
  const zoom = interpolate(lf, [0, 88], [1.0, 1.09], {...CLAMP, easing: Easing.inOut(Easing.quad)});

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#3B2516'}}>
      <AbsoluteFill style={{transformOrigin: '50% 50%', transform: `scale(${zoom.toFixed(5)})`}}>
        <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
          {/* Desk surface surrounding open wooden drawer */}
          <rect x={0} y={0} width={1280} height={720} fill="#6E4728" />
          {/* Open wooden desk drawer interior */}
          <rect x={110} y={66} width={1060} height={588} fill={PAL.woodLo} stroke={INK} strokeWidth={8} />
          <rect x={146} y={102} width={988} height={516} fill="#4A301D" stroke={INK} strokeWidth={4} />
          {/* Drawer handle at bottom */}
          <rect x={540} y={654} width={200} height={24} fill={PAL.gold} stroke={INK} strokeWidth={4} />

          {/* Physical tariff list paper sitting inside the drawer (right side) */}
          <rect x={675} y={145} width={410} height={425} fill={PAL.paper} stroke={INK} strokeWidth={4} />
          <rect x={695} y={225} width={370} height={4} fill={PAL.paperLine} />
          <rect x={695} y={356} width={370} height={4} fill={PAL.paperLine} />
          <rect x={695} y={440} width={260} height={4} fill={PAL.paperLine} />

          {/* Bu Endang's THIN envelope already inside drawer (bottom-left) */}
          <g transform="translate(205, 405)">
            <rect x={0} y={0} width={360} height={160} fill="#E6DAC0" stroke={INK} strokeWidth={4} />
            <polygon points="0,0 180,82 360,0" fill="#D5C6A6" stroke={INK} strokeWidth={3} />
          </g>

          {/* Ayah Dika's FAT THICK envelope placed into the same drawer by Pak Darma's ringed hand */}
          <g transform={`translate(215, ${(175 + handDrop).toFixed(2)})`}>
            {/* Thick cash bulge shadow */}
            <rect x={12} y={16} width={370} height={192} fill="rgba(20,16,12,0.35)" />
            <rect x={0} y={24} width={370} height={176} fill="#C9BC98" stroke={INK} strokeWidth={4} />
            <rect x={0} y={0} width={370} height={176} fill={PAL.envelope} stroke={INK} strokeWidth={4} />
            <polygon points="0,0 185,92 370,0" fill="#E3D6B4" stroke={INK} strokeWidth={3} />
            {/* Banknote stack peeking out of fat envelope edge */}
            <rect x={356} y={28} width={22} height={124} fill="#D1645C" stroke={INK} strokeWidth={3} />
            <rect x={362} y={36} width={10} height={108} fill="#E89A92" />

            {/* Pak Darma's chubby hand with BIG RED AGATE RING */}
            <g transform="translate(24, -64)">
              <rect x={28} y={0} width={118} height={94} fill="#D49E76" stroke={INK} strokeWidth={4} />
              <rect x={36} y={76} width={24} height={48} fill="#D49E76" stroke={INK} strokeWidth={3} />
              <rect x={68} y={78} width={24} height={52} fill="#D49E76" stroke={INK} strokeWidth={3} />
              <rect x={100} y={76} width={24} height={48} fill="#D49E76" stroke={INK} strokeWidth={3} />
              {/* Big Agate Ring on finger */}
              <rect x={64} y={96} width={32} height={18} fill={PAL.gold} stroke={INK} strokeWidth={3} />
              <rect x={70} y={92} width={20} height={22} fill="#C92E2E" stroke={INK} strokeWidth={2.5} />
              <rect x={74} y={96} width={6} height={6} fill="#FF9898" />
            </g>
          </g>
        </svg>

        {/* Physical printed text on the tariff paper inside the drawer */}
        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 170,
            width: 360,
            fontFamily: PIXEL_FONT,
            color: INK,
            lineHeight: 1.85,
          }}
        >
          <div style={{fontSize: 16, textAlign: 'center', color: PAL.roofWarm}}>DAFTAR TARIF</div>
          <div style={{marginTop: 34, fontSize: 14, color: INK}}>Uang administrasi</div>
          <div style={{marginTop: 14, fontSize: 26, color: '#9E241E'}}>15 juta</div>
          <div style={{marginTop: 42, fontSize: 10, color: '#6E6352'}}>BEASISWA / JABATAN</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
