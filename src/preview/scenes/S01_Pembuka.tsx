import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {PIXEL_FONT} from '../../pixelFont';
import {CLAMP, PAL, SmoothCamera, fadeIn} from '../previewPlan';
import {PixelCharacter} from '../PixelCharacters';
import {SealedCrate} from '../PixelProps';
import {VillageMap, type MapWalkerDef} from '../VillageMap';

const INK = PAL.ink;

/**
 * Shared classroom interior backdrop (used for P2_ujian_serentak & P3_tebakan).
 * Side-view adventure game style: plaster wall, wood wainscoting, window showing shared blue sky, chalkboard, desks.
 */
const ClassroomBackdrop: React.FC<{
  boardText?: string;
  boardSub?: string;
  windowShift?: number;
}> = ({boardText = 'UJIAN BEASISWA', boardSub = '10 KURSI KE KOTA', windowShift = 0}) => (
  <AbsoluteFill>
    <svg width={1280} height={720} viewBox="0 0 1280 720" shapeRendering="crispEdges">
      {/* Upper plaster wall (identical warm Year 2 cream) */}
      <rect x={0} y={0} width={1280} height={390} fill="#EEDDB8" />
      <rect x={0} y={386} width={1280} height={10} fill="#9C6B3C" stroke={INK} strokeWidth={2} />
      {/* Lower wooden wainscoting */}
      <rect x={0} y={396} width={1280} height={116} fill="#C69D6B" />
      {Array.from({length: 16}).map((_, i) => (
        <rect key={i} x={i * 80} y={396} width={3} height={116} fill="#AD8352" />
      ))}
      {/* Wooden classroom floor */}
      <rect x={0} y={512} width={1280} height={208} fill="#8D6138" />
      <rect x={0} y={512} width={1280} height={6} fill="#6B4727" />
      {[552, 598, 646, 694].map((fy) => (
        <rect key={fy} x={0} y={fy} width={1280} height={3} fill="#76502D" />
      ))}

      {/* Windows showing the same shared blue sky #8FC6E8 (clean margin from clock & poster at all windowShifts) */}
      {[64 + windowShift, 1020 - windowShift].map((wx) => (
        <g key={wx} transform={`translate(${wx}, 72)`}>
          <rect x={0} y={0} width={196} height={184} fill={PAL.wood} stroke={INK} strokeWidth={4} />
          <rect x={12} y={12} width={172} height={160} fill={PAL.skyMid} stroke={INK} strokeWidth={2} />
          <rect x={12} y={12} width={172} height={46} fill={PAL.skyTop} />
          <rect x={12} y={126} width={172} height={46} fill={PAL.grassWarm} />
          {/* Window mullions */}
          <rect x={95} y={12} width={6} height={160} fill={PAL.wood} />
          <rect x={12} y={90} width={172} height={6} fill={PAL.wood} />
        </g>
      ))}

      {/* Small pixel wall clock (left of chalkboard) */}
      <g transform="translate(308, 92)">
        <rect x={0} y={0} width={38} height={38} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
        <rect x={5} y={5} width={28} height={28} fill="#F7F2E2" />
        <rect x={18} y={9} width={3} height={11} fill={INK} />
        <rect x={18} y={18} width={9} height={3} fill="#B83B32" />
      </g>

      {/* Small framed schedule poster (right of chalkboard) */}
      <g transform="translate(932, 92)">
        <rect x={0} y={0} width={36} height={48} fill={PAL.wood} stroke={INK} strokeWidth={3} />
        <rect x={5} y={5} width={26} height={38} fill="#F4EDD8" />
        <rect x={8} y={9} width={20} height={6} fill="#C8513E" />
        <rect x={8} y={20} width={18} height={3} fill="#7B7364" />
        <rect x={8} y={27} width={14} height={3} fill="#7B7364" />
        <rect x={8} y={34} width={18} height={3} fill="#7B7364" />
      </g>

      {/* Green chalkboard */}
      <rect x={360} y={64} width={560} height={224} fill={PAL.chalkboardFrame} stroke={INK} strokeWidth={5} />
      <rect x={378} y={82} width={524} height={188} fill={PAL.chalkboard} stroke={INK} strokeWidth={3} />
      {/* Chalk tray */}
      <rect x={352} y={286} width={576} height={14} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
      <rect x={440} y={278} width={34} height={8} fill="#F5F3EB" stroke={INK} strokeWidth={1.5} />
      <rect x={800} y={274} width={44} height={12} fill="#C97D45" stroke={INK} strokeWidth={1.5} />
    </svg>
    {/* Chalk text on the chalkboard (physical in-world prop) */}
    <div
      style={{
        position: 'absolute',
        left: 380,
        top: 118,
        width: 520,
        textAlign: 'center',
        fontFamily: PIXEL_FONT,
        fontSize: 21,
        color: '#EDF2E6',
        letterSpacing: '0.06em',
        lineHeight: 1.8,
      }}
    >
      <div>{boardText}</div>
      <div style={{fontSize: 12, color: '#C8D8CC', marginTop: 12}}>{boardSub}</div>
    </div>
  </AbsoluteFill>
);

/** Wooden school desk with sealed exam envelope & exam sheet (proportioned to 220px seated student). */
const ExamDesk: React.FC<{
  x: number;
  y: number;
  width?: number;
  paperName?: string;
  showSeal?: boolean;
}> = ({x, y, width = 220, paperName, showSeal = true}) => (
  <div style={{position: 'absolute', left: x, top: y, width, height: 150, pointerEvents: 'none'}}>
    <svg width={width} height={150} viewBox={`0 0 ${width} 150`} shapeRendering="crispEdges">
      {/* Legs */}
      <rect x={14} y={32} width={16} height={116} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
      <rect x={width - 30} y={32} width={16} height={116} fill={PAL.woodLo} stroke={INK} strokeWidth={3} />
      {/* Modesty panel */}
      <rect x={28} y={34} width={width - 56} height={58} fill={PAL.wood} stroke={INK} strokeWidth={3} />
      {/* Desk top */}
      <rect x={0} y={14} width={width} height={24} fill={PAL.woodHi} stroke={INK} strokeWidth={3} />
      {/* Exam sheet on desk */}
      <rect x={34} y={2} width={104} height={24} fill={PAL.paper} stroke={INK} strokeWidth={2} />
      {!paperName ? (
        <>
          <rect x={44} y={10} width={52} height={3} fill={PAL.paperLine} />
          <rect x={44} y={16} width={68} height={3} fill={PAL.paperLine} />
        </>
      ) : (
        <rect x={44} y={20} width={84} height={2} fill={PAL.paperLine} />
      )}
      {/* Identical sealed exam envelope (amplop soal bersegel merah) */}
      {showSeal ? (
        <g>
          <rect x={width - 78} y={2} width={54} height={24} fill={PAL.envelope} stroke={INK} strokeWidth={2} />
          <rect x={width - 56} y={9} width={12} height={10} fill={PAL.waxRed} stroke={INK} strokeWidth={1.5} />
          <rect x={width - 53} y={11} width={4} height={4} fill={PAL.waxRedHi} />
        </g>
      ) : null}
    </svg>
    {paperName ? (
      <div
        style={{
          position: 'absolute',
          left: 36,
          top: 6,
          width: 100,
          textAlign: 'center',
          fontFamily: PIXEL_FONT,
          fontSize: 10,
          color: INK,
        }}
      >
        {paperName}
      </div>
    ) : null}
  </div>
);

/**
 * BEAT 1: P1_peta_lahir (f0-233, dur 233)
 * Static frame of empty map, slow continuous zoom in, elements pop/fade IN PLACE symmetrically.
 * NO sideways swipe! Identical warm palette.
 */
export const P1_peta_lahir: React.FC = () => {
  return (
    <SmoothCamera dur={233} zoomFrom={1.0} zoomTo={1.1} origin="50% 48%" easing={Easing.inOut(Easing.quad)}>
      <VillageMap era="y0" birthAnim goatsInPen={4} scoreMode="hidden" showVillagers />
    </SmoothCamera>
  );
};

/**
 * BEAT 2: P2_ujian_serentak (f233-728, dur 495)
 * - 0..215: Two proctors arrive at halte with ONE sealed exam crate, split left & right across middle road; continuous pan across middle road.
 * - 215..355: Classroom Desa Prestasi (Rani seated ~220px writing, sealed exam envelope on desk, male proctor).
 * - 355..495: Classroom Desa Orang Dalam (Sari seated ~220px writing, same sealed exam envelope, female proctor).
 */
export const P2_ujian_serentak: React.FC = () => {
  const f = useCurrentFrame();

  if (f < 215) {
    // Sub-shot A: Halte + proctors splitting across middle road with smooth continuous pan
    const panX = interpolate(f, [40, 200], [90, -90], {...CLAMP, easing: Easing.inOut(Easing.cubic)});
    const zoom = interpolate(f, [0, 215], [1.45, 1.62], {...CLAMP, easing: Easing.inOut(Easing.quad)});

    const proctors: MapWalkerDef[] = [
      // Pengawas Pria walks left across road into Desa Prestasi school
      {
        id: 'proc_left',
        path: [
          [630, 178],
          [620, 224],
          [490, 290],
          [350, 286],
        ],
        shirt: '#9C9468',
        pants: '#5A553A',
        speed: 62,
        startFrame: 42,
        loopMode: 'once',
        height: 36,
      },
      // Pengawas Wanita (grey hijab) walks right across road into Desa Orang Dalam school
      {
        id: 'proc_right',
        path: [
          [654, 178],
          [662, 224],
          [820, 290],
          [1045, 286],
        ],
        shirt: '#9C9468',
        pants: '#5A553A',
        hat: 'hijab',
        hatColor: '#8C9298',
        speed: 62,
        startFrame: 42,
        loopMode: 'once',
        height: 36,
      },
    ];

    return (
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <AbsoluteFill
          style={{
            transformOrigin: '50% 28%',
            transform: `translate(${panX.toFixed(2)}px, 60px) scale(${zoom.toFixed(4)})`,
          }}
        >
          <VillageMap era="y2" goatsInPen={4} scoreMode="hidden" showVillagers extraWalkers={proctors}>
            {/* Shared sealed exam crate at halte */}
            <SealedCrate x={640} y={192} scale={0.62} />
          </VillageMap>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  }

  if (f < 386) {
    // Sub-shot B: Desa Prestasi classroom (Rani & Bimo seated cleanly ABOVE desks, ~228px, synced to "di desa kiri, ujian ini menentukan segalanya")
    const lf = f - 215;
    return (
      <SmoothCamera dur={171} startFrame={215} endFrame={386} zoomFrom={1.0} zoomTo={1.07} origin="44% 62%">
        <ClassroomBackdrop boardText="UJIAN BEASISWA" boardSub="DESA PRESTASI — 10 KURSI" windowShift={0} />
        {/* Male district proctor observing */}
        <PixelCharacter id="pengawas_pria" x={950} y={222} height={382} facing="left" mood="focus" holding="clipboard" />
        {/* Back row: Bimo seated cleanly above desk */}
        <PixelCharacter id="bimo" x={552} y={302} height={224} facing="right" pose="write" mood="neutral" />
        <ExamDesk x={544} y={456} width={230} showSeal />
        {/* Front row: Rani prominently seated (~230px) writing diligently, torso clearly visible above desk */}
        <PixelCharacter id="rani" x={224} y={316} height={230} facing="right" pose="write" mood="focus" />
        <ExamDesk x={198} y={474} width={235} showSeal />
        {/* Smooth local fade-in on cut */}
        <AbsoluteFill style={{backgroundColor: '#1A1612', opacity: 1 - fadeIn(lf, 0, 6), pointerEvents: 'none'}} />
      </SmoothCamera>
    );
  }

  // Sub-shot C (386..495): Desa Orang Dalam classroom (Sari & Dika, synced to "Di desa kanan, ujian ini hanya sandiwara")
  const lf = f - 386;
  return (
    <SmoothCamera dur={109} startFrame={386} endFrame={495} zoomFrom={1.0} zoomTo={1.07} origin="44% 62%">
      <ClassroomBackdrop boardText="UJIAN BEASISWA" boardSub="DESA ORANG DALAM — 10 KURSI" windowShift={24} />
      {/* Female district proctor (grey hijab, same khaki uniform) */}
      <PixelCharacter id="pengawas_wanita" x={950} y={226} height={378} facing="left" mood="focus" holding="clipboard" />
      {/* Back row: Dika seated cleanly above desk */}
      <PixelCharacter id="dika" x={576} y={300} height={226} facing="right" pose="sit" mood="smug" />
      <ExamDesk x={548} y={456} width={220} showSeal />
      {/* Front row: Sari prominently seated (~230px) writing diligently, torso clearly visible above desk */}
      <PixelCharacter id="sari" x={222} y={314} height={230} facing="right" pose="write" mood="focus" />
      <ExamDesk x={198} y={474} width={235} showSeal />
      <AbsoluteFill style={{backgroundColor: '#1A1612', opacity: 1 - fadeIn(lf, 0, 6), pointerEvents: 'none'}} />
    </SmoothCamera>
  );
};

/**
 * BEAT 3: P3_tebakan (f728-1222, dur 494)
 * Short static close-ups + slow continuous zoom introducing the two pairs so every face is memorized:
 * 1) Rani (Prestasi), 2) Bimo (Prestasi), 3) Sari (Orang Dalam), 4) Dika (Orang Dalam).
 * Names appear ONLY on their physical exam sheets on the desk (zero floating text / HUD!).
 */
export const P3_tebakan: React.FC = () => {
  const f = useCurrentFrame();
  const segLen = 123;
  const idx = Math.min(3, Math.floor(f / segLen));
  const lf = f - idx * segLen;
  const zoom = interpolate(lf, [0, segLen], [1.0, 1.09], {...CLAMP, easing: Easing.inOut(Easing.quad)});

  const specs = [
    {id: 'rani' as const, label: 'RANI', pose: 'write' as const, mood: 'focus' as const, h: 242, y: 312, board: 'DESA PRESTASI'},
    {id: 'bimo' as const, label: 'BIMO', pose: 'sit' as const, mood: 'sad' as const, h: 240, y: 300, board: 'DESA PRESTASI'},
    {id: 'sari' as const, label: 'SARI', pose: 'write' as const, mood: 'focus' as const, h: 242, y: 302, board: 'DESA ORANG DALAM'},
    {id: 'dika' as const, label: 'DIKA', pose: 'sit' as const, mood: 'smug' as const, h: 245, y: 310, board: 'DESA ORANG DALAM'},
  ];
  const cur = specs[idx];

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transformOrigin: '50% 56%',
          transform: `scale(${zoom.toFixed(5)})`,
        }}
      >
        <ClassroomBackdrop boardText={cur.board} boardSub="UJIAN BEASISWA" windowShift={idx >= 2 ? 20 : 0} />
        {/* Centered proportionate seated close-up portrait (~240px seated teen) */}
        <PixelCharacter
          id={cur.id}
          x={505}
          y={cur.y}
          height={cur.h}
          facing="right"
          pose={cur.pose}
          mood={cur.mood}
        />
        {/* Large wooden school desk foreground with physical name written on exam paper */}
        <ExamDesk x={465} y={458} width={350} paperName={cur.label} showSeal />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
