import React from 'react';
import {useCurrentFrame} from 'remotion';
import {PAL} from './previewPlan';

export type CharacterId =
  | 'rani'
  | 'sari'
  | 'bimo'
  | 'dika'
  | 'pak_wiryo'
  | 'pak_darma'
  | 'bu_endang'
  | 'ibu_rani'
  | 'ayah_bimo'
  | 'ayah_dika'
  | 'pengawas_pria'
  | 'pengawas_wanita'
  | 'tukang_pos'
  | 'student_a'
  | 'student_b'
  | 'villager_a';

export type CharacterMood =
  | 'neutral'
  | 'focus'
  | 'happy'
  | 'shock'
  | 'sad'
  | 'stern'
  | 'smug'
  | 'sleep'
  | 'shame';

export type CharacterPose =
  | 'stand'
  | 'sit'
  | 'write'
  | 'shock_mouth'
  | 'offer_envelope'
  | 'reject_point'
  | 'point_board'
  | 'wave'
  | 'farm'
  | 'count'
  | 'read_letter'
  | 'slouch_desk';

export interface PixelCharacterProps {
  id: CharacterId;
  x?: number;
  y?: number;
  /** Target rendered height in px (e.g. 220 for seated teen, 320 for standing teen, 360 for standing adult). */
  height?: number;
  facing?: 'right' | 'left';
  pose?: CharacterPose;
  mood?: CharacterMood;
  /** Year 4 outfit variants (e.g., Bimo green apron + pencil, Dika cream office uniform, Sari caping). */
  year4?: boolean;
  /** Wear woven caping hat (Sari in rice field / herding). */
  caping?: boolean;
  /** Optional prop override (e.g. envelope in hand, clipboard, stick). */
  holding?: 'none' | 'envelope_thin' | 'envelope_thick' | 'clipboard' | 'letter' | 'stick' | 'pen' | 'crate';
  /** Vertical offset in SVG art-pixels for pointing hand (e.g. tracing down an announcement list). */
  pointOffsetY?: number;
  style?: React.CSSProperties;
}

const INK = PAL.ink;

/**
 * 32-bit flat pixel art character renderer on a crisp pixel art grid (viewBox 0 0 48 64 for standing, 0 0 48 48 for seated).
 * Every mirror pair has genuinely distinct head geometry, hair silhouette, skin tone, body width/height, clothing, and props
 * so they pass the brief-visual §5 silhouette test unconditionally.
 */
export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  id,
  x,
  y,
  height = 320,
  facing = 'right',
  pose = 'stand',
  mood = 'neutral',
  year4 = false,
  caping = false,
  holding = 'none',
  pointOffsetY = 0,
  style,
}) => {
  const f = useCurrentFrame();
  // Subtle 1-art-pixel idle breathing and occasional blink (brief-visual §2)
  const breathY = Math.sin(f / 14 + id.length) > 0.35 ? -1 : 0;
  const blink = (f + id.length * 19) % 105 > 101;
  const isSeated = pose === 'sit' || pose === 'write' || pose === 'slouch_desk';
  const vbW = 48;
  const vbH = isSeated ? 46 : 64;
  const width = (height * vbW) / vbH;

  // Skin tones (distinct per mirror pair)
  const skinMap: Record<CharacterId, [string, string]> = {
    rani: ['#E2B086', '#C69168'], // sawo matang terang
    sari: ['#AC734D', '#8C5938'], // cokelat gelap
    bimo: ['#F0CCA6', '#D4AD84'], // kuning langsat
    dika: ['#CC966C', '#AC7850'], // sawo matang
    pak_wiryo: ['#C9956D', '#A7744E'],
    pak_darma: ['#D49E76', '#B37D56'],
    bu_endang: ['#B8815B', '#966341'],
    ibu_rani: ['#E4B38A', '#C8956D'],
    ayah_bimo: ['#EBC59E', '#CEA67E'],
    ayah_dika: ['#C58E64', '#A46F49'],
    pengawas_pria: ['#D7A57E', '#B7855F'],
    pengawas_wanita: ['#E0B18B', '#C0906A'],
    tukang_pos: ['#C38B61', '#A26D47'],
    student_a: ['#D6A279', '#B6835D'],
    student_b: ['#BC855E', '#9C6845'],
    villager_a: ['#C8936A', '#A8744E'],
  };

  const [skin, skinLo] = skinMap[id];

  // Body silhouette metrics (pass silhouette test!)
  const bodyProfile: Record<
    CharacterId,
    {
      headX: number;
      headW: number;
      headH: number;
      headY: number;
      torsoX: number;
      torsoW: number;
      torsoH: number;
      belly?: number;
      hunch?: number;
      legW: number;
    }
  > = {
    // Rani: oval face, slender upright
    rani: {headX: 18, headW: 12, headH: 14, headY: 8, torsoX: 16, torsoW: 16, torsoH: 20, legW: 5},
    // Sari: round full cheeks, shorter, wider sturdy shoulders
    sari: {headX: 16, headW: 16, headH: 13, headY: 11, torsoX: 13, torsoW: 22, torsoH: 18, legW: 6},
    // Bimo: wide round face, stocky plump shorter build
    bimo: {headX: 15, headW: 18, headH: 14, headY: 11, torsoX: 11, torsoW: 26, torsoH: 20, belly: 2, legW: 7},
    // Dika: long narrow sharp face, tall thin build
    dika: {headX: 18, headW: 12, headH: 16, headY: 4, torsoX: 16, torsoW: 16, torsoH: 23, legW: 5},
    // Pak Wiryo: gaunt narrow face, thin upright
    pak_wiryo: {headX: 18, headW: 12, headH: 15, headY: 5, torsoX: 16, torsoW: 16, torsoH: 22, legW: 5},
    // Pak Darma: broad chubby face, heavy protruding belly
    pak_darma: {headX: 15, headW: 18, headH: 15, headY: 8, torsoX: 10, torsoW: 28, torsoH: 22, belly: 5, legW: 7},
    // Bu Endang: thin gaunt face, thin slightly hunched
    bu_endang: {headX: 18, headW: 12, headH: 14, headY: 10, torsoX: 16, torsoW: 16, torsoH: 20, hunch: 2, legW: 5},
    // Ibu Rani: round rosy face, plump shorter
    ibu_rani: {headX: 15, headW: 18, headH: 14, headY: 12, torsoX: 11, torsoW: 26, torsoH: 22, legW: 6},
    // Ayah Bimo: stocky plump like Bimo
    ayah_bimo: {headX: 15, headW: 18, headH: 14, headY: 9, torsoX: 11, torsoW: 26, torsoH: 22, belly: 2, legW: 7},
    // Ayah Dika: tall slim like Dika
    ayah_dika: {headX: 18, headW: 12, headH: 15, headY: 4, torsoX: 15, torsoW: 18, torsoH: 23, legW: 5},
    pengawas_pria: {headX: 17, headW: 14, headH: 14, headY: 6, torsoX: 14, torsoW: 20, torsoH: 22, legW: 6},
    pengawas_wanita: {headX: 17, headW: 14, headH: 14, headY: 8, torsoX: 15, torsoW: 18, torsoH: 21, legW: 5},
    tukang_pos: {headX: 17, headW: 14, headH: 14, headY: 8, torsoX: 15, torsoW: 18, torsoH: 20, legW: 5},
    student_a: {headX: 17, headW: 14, headH: 13, headY: 10, torsoX: 15, torsoW: 18, torsoH: 18, legW: 5},
    student_b: {headX: 18, headW: 13, headH: 13, headY: 10, torsoX: 16, torsoW: 16, torsoH: 18, legW: 5},
    villager_a: {headX: 17, headW: 14, headH: 14, headY: 9, torsoX: 14, torsoW: 20, torsoH: 20, legW: 6},
  };

  const p = bodyProfile[id];
  const hunchDx = p.hunch ?? 0;
  const headY = p.headY + breathY + (pose === 'farm' ? 3 : 0);
  const torsoY = p.headY + p.headH + breathY;
  const legY = torsoY + p.torsoH;
  const eyeY = headY + Math.floor(p.headH * 0.45);
  const mouthY = headY + p.headH - 3;

  // Outfit colors
  const outfitColors = () => {
    switch (id) {
      case 'rani':
        return {top: '#7EC8F2', topLo: '#5CA5D1', bottom: '#2B3B54', bottomLo: '#1D293B', accent: '#EFE4C8'};
      case 'sari':
        return {top: '#C9A44C', topLo: '#A38136', bottom: '#4E4A3E', bottomLo: '#37342B', accent: '#F7D74A'};
      case 'bimo':
        return year4
          ? {top: '#F4F0E4', topLo: '#D9D3C3', bottom: '#48525E', bottomLo: '#323A44', accent: '#3D8B4C'}
          : {top: '#F4F0E4', topLo: '#D9D3C3', bottom: '#48525E', bottomLo: '#323A44', accent: '#C6BFA9'};
      case 'dika':
        return year4
          ? {top: '#DFD3B0', topLo: '#BFB28D', bottom: '#5C523E', bottomLo: '#433B2C', accent: '#8E7B52'}
          : {top: '#B8292F', topLo: '#8B1C21', bottom: '#2A272B', bottomLo: '#1B191C', accent: '#E8B838'};
      case 'pak_wiryo':
        return {top: '#F5F2EA', topLo: '#D8D4C9', bottom: '#25252B', bottomLo: '#16161B', accent: '#1F1F24'};
      case 'pak_darma':
        return {top: '#5E402B', topLo: '#432C1D', bottom: '#483020', bottomLo: '#312014', accent: '#D83A3A'};
      case 'bu_endang':
        return {top: '#8C6A4F', topLo: '#6E5039', bottom: '#594230', bottomLo: '#3F2E21', accent: '#7A563C'};
      case 'ibu_rani':
        return {top: '#5FA865', topLo: '#46874C', bottom: '#46874C', bottomLo: '#356B3A', accent: '#F6E88D'};
      case 'ayah_bimo':
        return {top: '#F2EFE6', topLo: '#D5D1C4', bottom: '#3A3A40', bottomLo: '#25252A', accent: '#1F1F24'};
      case 'ayah_dika':
        return {top: '#7A2438', topLo: '#591827', bottom: '#232024', bottomLo: '#141215', accent: '#E8B838'};
      case 'pengawas_pria':
      case 'pengawas_wanita':
        return {top: '#9C9468', topLo: '#7D764F', bottom: '#5A553A', bottomLo: '#413D29', accent: '#D4AF37'};
      case 'tukang_pos':
        return {top: '#D96B27', topLo: '#B35217', bottom: '#334E73', bottomLo: '#243854', accent: '#F2C14E'};
      case 'student_a':
        return {top: '#E8E3D5', topLo: '#CCC6B5', bottom: '#3B4D6B', bottomLo: '#2A374E', accent: '#B85443'};
      case 'student_b':
        return {top: '#DCE6D5', topLo: '#BFCBB8', bottom: '#4C4A40', bottomLo: '#35342C', accent: '#7E8F6B'};
      default:
        return {top: '#8D9E7A', topLo: '#6E7F5D', bottom: '#4B443A', bottomLo: '#332E26', accent: '#D6B87A'};
    }
  };
  const col = outfitColors();

  // Render distinct hair & headwear per character
  const renderHair = () => {
    const hx = p.headX + hunchDx;
    switch (id) {
      case 'rani':
        return (
          <g>
            {/* Dark hair crown + single unmistakable long braid (kepang) hanging down the back */}
            <rect x={hx - 1} y={headY - 2} width={p.headW + 2} height={5} fill="#231D1A" />
            <rect x={hx - 2} y={headY + 1} width={3} height={8} fill="#231D1A" />
            {/* Long distinct braid hanging behind shoulder */}
            <rect x={hx - 4} y={headY + 8} width={4} height={4} fill="#231D1A" />
            <rect x={hx - 5} y={headY + 12} width={4} height={4} fill="#362C27" />
            <rect x={hx - 5} y={headY + 16} width={4} height={4} fill="#231D1A" />
            <rect x={hx - 6} y={headY + 20} width={4} height={4} fill="#362C27" />
            <rect x={hx - 6} y={headY + 24} width={4} height={2} fill="#7EC8F2" /> {/* blue hair tie */}
            <rect x={hx - 6} y={headY + 26} width={3} height={3} fill="#231D1A" />
          </g>
        );
      case 'sari':
        return (
          <g>
            {/* Short shoulder-length bob with bangs (poni) + bright yellow hair clip (jepit kuning) */}
            <rect x={hx - 2} y={headY - 2} width={p.headW + 4} height={5} fill="#261E19" />
            {/* Bangs across forehead */}
            <rect x={hx} y={headY + 2} width={p.headW - 1} height={3} fill="#261E19" />
            {/* Bob sides down to jaw/shoulder */}
            <rect x={hx - 3} y={headY + 2} width={4} height={13} fill="#261E19" />
            <rect x={hx + p.headW - 1} y={headY + 2} width={3} height={11} fill="#261E19" />
            {/* Bright yellow hair clip */}
            <rect x={hx + 2} y={headY + 2} width={5} height={2} fill="#F7D74A" />
            <rect x={hx + 3} y={headY + 1} width={3} height={1} fill="#FFF2A6" />
          </g>
        );
      case 'bimo':
        return (
          <g>
            {/* Fluffy short curly hair (ikal mengembang) */}
            <rect x={hx - 2} y={headY - 4} width={p.headW + 4} height={6} fill="#29211C" />
            <rect x={hx - 3} y={headY - 2} width={p.headW + 6} height={5} fill="#29211C" />
            <rect x={hx + 1} y={headY - 5} width={6} height={2} fill="#29211C" />
            <rect x={hx + 9} y={headY - 5} width={5} height={2} fill="#29211C" />
            <rect x={hx - 2} y={headY + 2} width={3} height={4} fill="#29211C" />
            {/* Year 4: yellow pencil tucked behind ear! */}
            {year4 ? (
              <g>
                <rect x={hx - 4} y={headY + 4} width={6} height={2} fill="#F4C942" />
                <rect x={hx - 5} y={headY + 4} width={1} height={2} fill="#D66E6E" />
                <rect x={hx + 2} y={headY + 4} width={2} height={2} fill="#231D1A" />
              </g>
            ) : null}
          </g>
        );
      case 'dika':
        return (
          <g>
            {/* Slick oily side-parted hair (klimis belah samping) with glossy shine pixel */}
            <rect x={hx - 1} y={headY - 3} width={p.headW + 2} height={5} fill="#1A1A20" />
            <rect x={hx + 2} y={headY - 4} width={p.headW - 1} height={3} fill="#1A1A20" />
            <rect x={hx + 4} y={headY - 3} width={5} height={1} fill="#5B6170" /> {/* oily sheen */}
            <rect x={hx - 1} y={headY + 1} width={2} height={4} fill="#1A1A20" />
          </g>
        );
      case 'pak_wiryo':
        return (
          <g>
            {/* Cropped hair with grey temples + tall black peci */}
            <rect x={hx - 1} y={headY - 5} width={p.headW + 2} height={7} fill="#1E1E24" />
            <rect x={hx} y={headY - 6} width={p.headW} height={2} fill="#2F3038" />
            <rect x={hx - 1} y={headY + 2} width={2} height={4} fill="#8F949C" /> {/* grey temple */}
            <rect x={hx + p.headW - 1} y={headY + 2} width={2} height={3} fill="#8F949C" />
          </g>
        );
      case 'pak_darma':
        return (
          <g>
            {/* Bald shiny crown, hair only on sides combed back */}
            <rect x={hx + 4} y={headY + 1} width={4} height={2} fill="#E9BC99" /> {/* bald shine */}
            <rect x={hx - 2} y={headY + 2} width={3} height={6} fill="#221E1C" />
            <rect x={hx + p.headW - 1} y={headY + 2} width={3} height={5} fill="#221E1C" />
          </g>
        );
      case 'bu_endang':
        return (
          <g>
            {/* Plain brown headscarf (kerudung cokelat polos) framing face and draping shoulders */}
            <rect x={hx - 3} y={headY - 3} width={p.headW + 6} height={5} fill="#7A563C" />
            <rect x={hx - 4} y={headY + 1} width={4} height={15} fill="#7A563C" />
            <rect x={hx + p.headW} y={headY + 1} width={3} height={14} fill="#63432D" />
            <rect x={hx - 4} y={headY + 13} width={p.headW + 7} height={4} fill="#63432D" />
          </g>
        );
      case 'ibu_rani':
        return (
          <g>
            {/* Hair pulled back into neat traditional bun (sanggul) with gold hairpin (tusuk konde), NO headscarf */}
            <rect x={hx - 1} y={headY - 2} width={p.headW + 2} height={4} fill="#241D1A" />
            <rect x={hx - 6} y={headY + 2} width={6} height={7} fill="#241D1A" /> {/* sanggul bun */}
            <rect x={hx - 5} y={headY + 3} width={4} height={5} fill="#362C28" />
            {/* Tusuk konde hairpin sticking cleanly through bun */}
            <rect x={hx - 8} y={headY + 1} width={9} height={1} fill="#E8B838" />
            <rect x={hx - 9} y={headY} width={2} height={2} fill="#FFF0A8" />
          </g>
        );
      case 'ayah_bimo':
        return (
          <g>
            {/* Black peci */}
            <rect x={hx - 1} y={headY - 5} width={p.headW + 2} height={7} fill="#1E1E24" />
            <rect x={hx} y={headY - 6} width={p.headW} height={2} fill="#34353E" />
            <rect x={hx - 1} y={headY + 2} width={2} height={4} fill="#2B2420" />
          </g>
        );
      case 'ayah_dika':
        return (
          <g>
            {/* Slick combed dark hair */}
            <rect x={hx - 1} y={headY - 3} width={p.headW + 2} height={5} fill="#18181D" />
            <rect x={hx + 3} y={headY - 3} width={5} height={1} fill="#4D525E" />
          </g>
        );
      case 'pengawas_wanita':
        return (
          <g>
            {/* Grey hijab (jilbab abu) */}
            <rect x={hx - 3} y={headY - 3} width={p.headW + 6} height={5} fill="#8C9298" />
            <rect x={hx - 4} y={headY + 1} width={4} height={15} fill="#8C9298" />
            <rect x={hx + p.headW} y={headY + 1} width={3} height={14} fill="#6F757C" />
            <rect x={hx - 3} y={headY + 13} width={p.headW + 6} height={4} fill="#7B8188" />
          </g>
        );
      case 'tukang_pos':
        return (
          <g>
            {/* Postal cap with visor */}
            <rect x={hx - 1} y={headY - 4} width={p.headW + 2} height={5} fill="#D96B27" />
            <rect x={hx + 4} y={headY - 1} width={p.headW + 2} height={2} fill="#263B57" />
          </g>
        );
      default:
        return (
          <g>
            <rect x={hx - 1} y={headY - 3} width={p.headW + 2} height={5} fill="#261F1B" />
            <rect x={hx - 1} y={headY + 1} width={2} height={5} fill="#261F1B" />
          </g>
        );
    }
  };

  // Render facial details (eyes, brows, mustaches, glasses, mole, expression)
  const renderFace = () => {
    const hx = p.headX + hunchDx;
    const lx = hx + Math.floor(p.headW * 0.32);
    const rx = hx + Math.floor(p.headW * 0.68);
    const isSleep = mood === 'sleep';
    const isNarrowEye = id === 'bimo' || id === 'ayah_bimo';
    const eyeH = blink || isSleep ? 1 : isNarrowEye ? 1 : 2;
    const eyeW = id === 'ibu_rani' ? 3 : 2;

    return (
      <g>
        {/* Eyes */}
        {id === 'ayah_dika' ? (
          /* Dark sunglasses */
          <g>
            <rect x={hx + 2} y={eyeY - 1} width={p.headW - 2} height={4} fill="#141418" />
            <rect x={hx + 3} y={eyeY} width={3} height={1} fill="#465264" />
            <rect x={hx + 8} y={eyeY} width={3} height={1} fill="#465264" />
          </g>
        ) : (
          <g>
            <rect x={lx} y={eyeY} width={eyeW} height={eyeH} fill={INK} />
            <rect x={rx} y={eyeY} width={eyeW} height={eyeH} fill={INK} />
            {/* Glasses for Pengawas Pria */}
            {id === 'pengawas_pria' ? (
              <g>
                <rect x={lx - 1} y={eyeY - 1} width={4} height={4} fill="none" stroke={INK} strokeWidth={1} />
                <rect x={rx - 1} y={eyeY - 1} width={4} height={4} fill="none" stroke={INK} strokeWidth={1} />
                <rect x={lx + 3} y={eyeY} width={rx - lx - 4} height={1} fill={INK} />
              </g>
            ) : null}
          </g>
        )}

        {/* Brows */}
        {mood === 'stern' ? (
          <g>
            <rect x={lx - 1} y={eyeY - 2} width={4} height={1} fill={INK} />
            <rect x={rx - 1} y={eyeY - 2} width={4} height={1} fill={INK} />
          </g>
        ) : mood === 'sad' || mood === 'shame' ? (
          <g>
            <rect x={lx - 1} y={eyeY - 2} width={3} height={1} fill="#4E3B2E" />
            <rect x={rx} y={eyeY - 2} width={3} height={1} fill="#4E3B2E" />
          </g>
        ) : id === 'rani' ? (
          /* Thick straight brows */
          <g>
            <rect x={lx - 1} y={eyeY - 2} width={4} height={1} fill="#231D1A" />
            <rect x={rx - 1} y={eyeY - 2} width={4} height={1} fill="#231D1A" />
          </g>
        ) : null}

        {/* Unique face markers */}
        {id === 'sari' ? (
          /* Small mole on left cheek (tahi lalat pipi kiri) */
          <rect x={hx + 3} y={eyeY + 4} width={1} height={1} fill="#3B2317" />
        ) : null}
        {id === 'ibu_rani' ? (
          /* Rosy cheeks */
          <g>
            <rect x={hx + 2} y={eyeY + 3} width={3} height={2} fill="#E28B7E" />
            <rect x={hx + p.headW - 5} y={eyeY + 3} width={3} height={2} fill="#E28B7E" />
          </g>
        ) : null}
        {id === 'pak_wiryo' ? (
          /* Thin mustache + prominent cheekbones */
          <g>
            <rect x={hx + 3} y={mouthY - 2} width={6} height={1} fill="#383432" />
            <rect x={hx + 1} y={eyeY + 3} width={2} height={1} fill={skinLo} />
          </g>
        ) : null}
        {id === 'pak_darma' ? (
          /* Thick bushy horizontal black mustache */
          <rect x={hx + 3} y={mouthY - 2} width={12} height={2} fill="#1A1715" />
        ) : null}

        {/* Mouth by mood */}
        {mood === 'happy' ? (
          <g>
            <rect x={hx + Math.floor(p.headW / 2) - 2} y={mouthY} width={5} height={1} fill={INK} />
            <rect x={hx + Math.floor(p.headW / 2) - 3} y={mouthY - 1} width={1} height={1} fill={INK} />
            <rect x={hx + Math.floor(p.headW / 2) + 3} y={mouthY - 1} width={1} height={1} fill={INK} />
          </g>
        ) : mood === 'shock' ? (
          <rect x={hx + Math.floor(p.headW / 2) - 1} y={mouthY - 1} width={3} height={3} fill="#6B2B2B" />
        ) : mood === 'sad' || mood === 'shame' ? (
          <g>
            <rect x={hx + Math.floor(p.headW / 2) - 2} y={mouthY} width={5} height={1} fill={INK} />
            <rect x={hx + Math.floor(p.headW / 2) - 3} y={mouthY + 1} width={1} height={1} fill={INK} />
            <rect x={hx + Math.floor(p.headW / 2) + 3} y={mouthY + 1} width={1} height={1} fill={INK} />
          </g>
        ) : mood === 'smug' ? (
          <g>
            <rect x={hx + Math.floor(p.headW / 2) - 1} y={mouthY} width={4} height={1} fill={INK} />
            <rect x={hx + Math.floor(p.headW / 2) + 3} y={mouthY - 1} width={1} height={1} fill={INK} />
          </g>
        ) : (
          <rect x={hx + Math.floor(p.headW / 2) - 2} y={mouthY} width={4} height={1} fill={INK} />
        )}
      </g>
    );
  };

  // Render outfit details & accessories on torso
  const renderOutfitDetails = () => {
    const tx = p.torsoX;
    const tw = p.torsoW;
    return (
      <g>
        {/* Rani: cloth sling bag strap across chest */}
        {id === 'rani' ? (
          <g>
            <rect x={tx + 2} y={torsoY} width={3} height={4} fill="#EFE4C8" />
            <rect x={tx + 5} y={torsoY + 4} width={3} height={4} fill="#EFE4C8" />
            <rect x={tx + 8} y={torsoY + 8} width={3} height={4} fill="#EFE4C8" />
            <rect x={tx + 11} y={torsoY + 12} width={5} height={8} fill="#DFD1AC" stroke={INK} strokeWidth={1} />
          </g>
        ) : null}

        {/* Dika Year 2: red-gold batik diamond motifs + gold wristwatch */}
        {id === 'dika' && !year4 ? (
          <g>
            <rect x={tx + 3} y={torsoY + 4} width={2} height={2} fill="#E8B838" />
            <rect x={tx + 9} y={torsoY + 4} width={2} height={2} fill="#E8B838" />
            <rect x={tx + 6} y={torsoY + 9} width={2} height={2} fill="#E8B838" />
            <rect x={tx + 3} y={torsoY + 14} width={2} height={2} fill="#E8B838" />
            <rect x={tx + 10} y={torsoY + 14} width={2} height={2} fill="#E8B838" />
          </g>
        ) : null}

        {/* Bimo Year 4: green shop apron over white polo */}
        {id === 'bimo' && year4 ? (
          <g>
            <rect x={tx + 3} y={torsoY + 3} width={tw - 6} height={p.torsoH - 2} fill="#3D8B4C" />
            <rect x={tx + 5} y={torsoY} width={2} height={4} fill="#2D6E39" />
            <rect x={tx + tw - 7} y={torsoY} width={2} height={4} fill="#2D6E39" />
            <rect x={tx + 6} y={torsoY + 11} width={tw - 12} height={6} fill="#2D6E39" />
          </g>
        ) : null}

        {/* Pak Darma: safari pockets + envelope peeking from chest pocket + belly line */}
        {id === 'pak_darma' ? (
          <g>
            <rect x={tx + 16} y={torsoY + 4} width={7} height={6} fill="#432C1D" />
            <rect x={tx + 17} y={torsoY + 1} width={5} height={4} fill={PAL.envelope} /> {/* peeking envelope */}
            <rect x={tx + 3} y={torsoY + 13} width={8} height={6} fill="#432C1D" />
            <rect x={tx + 16} y={torsoY + 13} width={8} height={6} fill="#432C1D" />
          </g>
        ) : null}

        {/* Pak Wiryo: crisp white collar & buttons */}
        {id === 'pak_wiryo' ? (
          <g>
            <rect x={tx + 7} y={torsoY + 2} width={2} height={p.torsoH - 3} fill="#D8D4C9" />
            <rect x={tx + 7} y={torsoY + 5} width={1} height={1} fill={INK} />
            <rect x={tx + 7} y={torsoY + 10} width={1} height={1} fill={INK} />
            <rect x={tx + 7} y={torsoY + 15} width={1} height={1} fill={INK} />
          </g>
        ) : null}

        {/* Ibu Rani: green floral daster flower dots */}
        {id === 'ibu_rani' ? (
          <g>
            <rect x={tx + 4} y={torsoY + 5} width={2} height={2} fill="#F6E88D" />
            <rect x={tx + 14} y={torsoY + 4} width={2} height={2} fill="#FFF5C4" />
            <rect x={tx + 8} y={torsoY + 12} width={2} height={2} fill="#F6E88D" />
            <rect x={tx + 18} y={torsoY + 11} width={2} height={2} fill="#FFF5C4" />
            <rect x={tx + 5} y={torsoY + 18} width={2} height={2} fill="#FFF5C4" />
          </g>
        ) : null}

        {/* Ayah Dika: gold silk batik stripes */}
        {id === 'ayah_dika' ? (
          <g>
            <rect x={tx + 4} y={torsoY + 3} width={2} height={16} fill="#E8B838" />
            <rect x={tx + 12} y={torsoY + 3} width={2} height={16} fill="#E8B838" />
          </g>
        ) : null}

        {/* District exam proctors: gold official badge */}
        {id === 'pengawas_pria' || id === 'pengawas_wanita' ? (
          <rect x={tx + tw - 6} y={torsoY + 5} width={3} height={3} fill="#E8B838" />
        ) : null}
      </g>
    );
  };

  // Render arms & held props based on pose
  const renderArmsAndProps = () => {
    const tx = p.torsoX;
    const tw = p.torsoW;
    const armY = torsoY + 3;
    const sleeveCol = id === 'sari' ? col.top : col.topLo;

    // Front hand coordinates
    let handX = tx + tw + 1;
    let handY = armY + 12;

    if (pose === 'shock_mouth') {
      // Rani covering mouth in joyful disbelief (attached forearm + hand resting cleanly over mouth)
      const mx = p.headX + hunchDx + Math.floor(p.headW / 2) - 2;
      return (
        <g>
          <rect x={tx - 4} y={armY} width={4} height={12} fill={sleeveCol} stroke={INK} strokeWidth={1} />
          <rect x={tx - 4} y={armY + 12} width={4} height={3} fill={skin} stroke={INK} strokeWidth={1} />
          {/* Raised right upper arm & forearm bending inward to mouth */}
          <rect x={tx + tw - 2} y={armY - 1} width={4} height={9} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={mx + 2} y={headY + p.headH - 4} width={tx + tw - mx - 1} height={4} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={mx} y={headY + p.headH - 5} width={5} height={5} fill={skin} stroke={INK} strokeWidth={1} />
        </g>
      );
    }

    if (pose === 'offer_envelope') {
      handX = tx + tw + 9;
      handY = armY + 5;
      return (
        <g>
          <rect x={tx - 4} y={armY} width={4} height={12} fill={sleeveCol} stroke={INK} strokeWidth={1} />
          {/* Extended arm offering envelope */}
          <rect x={tx + tw - 1} y={armY + 3} width={10} height={4} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={handX} y={handY - 1} width={4} height={4} fill={skin} stroke={INK} strokeWidth={1} />
          {/* Envelope held out */}
          <rect
            x={handX + 2}
            y={handY - 3}
            width={10}
            height={holding === 'envelope_thick' ? 7 : 5}
            fill={PAL.envelope}
            stroke={INK}
            strokeWidth={1}
          />
          <rect x={handX + 3} y={handY - 1} width={8} height={1} fill={PAL.envelopeShade} />
        </g>
      );
    }

    if (pose === 'reject_point') {
      // Pak Wiryo pushing envelope firmly away in front (open vertical palm) while other arm points UP toward the score board!
      return (
        <g>
          {/* Upper back/other arm raised pointing up-front toward the announcement board */}
          <rect x={tx - 2} y={armY - 8} width={4} height={11} fill={sleeveCol} stroke={INK} strokeWidth={1} />
          <rect x={tx + 1} y={armY - 10} width={8} height={4} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={tx + 9} y={armY - 10} width={4} height={2} fill={skin} stroke={INK} strokeWidth={1} />
          {/* Front arm extending straight forward with upright open palm pushing envelope away */}
          <rect x={tx + tw - 1} y={armY + 3} width={11} height={4} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw + 10} y={armY + 1} width={3} height={7} fill={skin} stroke={INK} strokeWidth={1} />
        </g>
      );
    }

    if (pose === 'point_board') {
      const py = armY - 2 + pointOffsetY;
      return (
        <g>
          <rect x={tx - 4} y={armY} width={4} height={13} fill={sleeveCol} stroke={INK} strokeWidth={1} />
          <rect x={tx - 4} y={armY + 13} width={4} height={3} fill={skin} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw - 1} y={py} width={11} height={4} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw + 10} y={py + 1} width={5} height={2} fill={skin} stroke={INK} strokeWidth={1} />
        </g>
      );
    }

    if (pose === 'wave') {
      const waveShift = Math.sin(f / 4) * 2;
      return (
        <g>
          <rect x={tx - 4} y={armY} width={4} height={12} fill={sleeveCol} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw - 1} y={armY - 6 + waveShift * 0.4} width={4} height={10} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw - 1} y={armY - 9 + waveShift * 0.6} width={4} height={4} fill={skin} stroke={INK} strokeWidth={1} />
        </g>
      );
    }

    if (pose === 'write') {
      const writeX = Math.sin(f / 5) * 1.2;
      return (
        <g>
          <rect x={tx - 3} y={armY + 2} width={5} height={10} fill={sleeveCol} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw - 2} y={armY + 2} width={6} height={10} fill={col.top} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw + 2 + writeX} y={armY + 10} width={4} height={3} fill={skin} stroke={INK} strokeWidth={1} />
          <rect x={tx + tw + 5 + writeX} y={armY + 8} width={2} height={6} fill="#E8B838" />
        </g>
      );
    }

    // Default stand / sit / read / count / farm
    return (
      <g>
        <rect x={tx - 4} y={armY} width={4} height={12} fill={sleeveCol} stroke={INK} strokeWidth={1} />
        <rect x={tx - 4} y={armY + 12} width={4} height={3} fill={skin} stroke={INK} strokeWidth={1} />

        <rect x={tx + tw} y={armY} width={4} height={12} fill={col.top} stroke={INK} strokeWidth={1} />
        <rect x={tx + tw} y={armY + 12} width={4} height={3} fill={skin} stroke={INK} strokeWidth={1} />

        {/* Gold wristwatch for Dika (Year 2) */}
        {id === 'dika' && !year4 ? (
          <rect x={tx + tw} y={armY + 10} width={4} height={2} fill="#F2CA44" />
        ) : null}

        {/* Big agate ring for Pak Darma */}
        {id === 'pak_darma' ? (
          <g>
            <rect x={tx + tw + 1} y={armY + 13} width={3} height={2} fill="#C92E2E" />
            <rect x={tx + tw + 2} y={armY + 13} width={1} height={1} fill="#FF9898" />
          </g>
        ) : null}

        {/* Held props */}
        {holding === 'clipboard' ? (
          <g>
            <rect x={tx + tw + 2} y={armY + 5} width={9} height={12} fill="#7B4E2B" stroke={INK} strokeWidth={1} />
            <rect x={tx + tw + 3} y={armY + 7} width={7} height={9} fill={PAL.paper} />
            <rect x={tx + tw + 5} y={armY + 4} width={3} height={2} fill="#A0A8B0" />
          </g>
        ) : null}
        {holding === 'envelope_thin' || holding === 'envelope_thick' ? (
          <rect
            x={handX}
            y={handY - 2}
            width={10}
            height={holding === 'envelope_thick' ? 7 : 5}
            fill={PAL.envelope}
            stroke={INK}
            strokeWidth={1}
          />
        ) : null}
        {holding === 'letter' ? (
          <g>
            <rect x={tx + tw - 2} y={armY + 7} width={10} height={8} fill={PAL.paper} stroke={INK} strokeWidth={1} />
            <rect x={tx + tw} y={armY + 9} width={6} height={1} fill={PAL.paperLine} />
            <rect x={tx + tw} y={armY + 11} width={5} height={1} fill={PAL.paperLine} />
          </g>
        ) : null}
        {holding === 'stick' ? (
          <rect x={tx + tw + 2} y={armY - 4} width={2} height={30} fill="#7B5230" stroke={INK} strokeWidth={1} />
        ) : null}
      </g>
    );
  };

  return (
    <div
      style={{
        position: x !== undefined || y !== undefined ? 'absolute' : 'relative',
        left: x,
        top: y,
        width,
        height,
        transform: facing === 'left' ? 'scaleX(-1)' : undefined,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${vbW} ${vbH}`}
        shapeRendering="crispEdges"
        style={{display: 'block', overflow: 'visible'}}
      >
        {/* Legs / Skirt (only when standing) */}
        {!isSeated ? (
          id === 'rani' || id === 'ibu_rani' || id === 'bu_endang' ? (
            <g>
              <rect
                x={p.torsoX + 1}
                y={legY - 1}
                width={p.torsoW - 2}
                height={Math.max(12, 60 - legY)}
                fill={col.bottom}
                stroke={INK}
                strokeWidth={1}
              />
              <rect
                x={p.torsoX + p.torsoW - 5}
                y={legY}
                width={3}
                height={Math.max(10, 58 - legY)}
                fill={col.bottomLo}
              />
              {/* Shoes / sandals */}
              <rect x={p.torsoX + 2} y={60} width={5} height={3} fill="#362820" />
              <rect x={p.torsoX + p.torsoW - 7} y={60} width={5} height={3} fill="#362820" />
            </g>
          ) : (
            <g>
              {/* Left leg */}
              <rect
                x={p.torsoX + 2}
                y={legY - 1}
                width={p.legW}
                height={Math.max(10, 60 - legY)}
                fill={col.bottom}
                stroke={INK}
                strokeWidth={1}
              />
              {/* Right leg */}
              <rect
                x={p.torsoX + p.torsoW - p.legW - 2}
                y={legY - 1}
                width={p.legW}
                height={Math.max(10, 60 - legY)}
                fill={col.bottomLo}
                stroke={INK}
                strokeWidth={1}
              />
              {/* Rolled trousers calf for Sari */}
              {id === 'sari' ? (
                <g>
                  <rect x={p.torsoX + 2} y={56} width={p.legW} height={4} fill={skin} />
                  <rect x={p.torsoX + p.torsoW - p.legW - 2} y={56} width={p.legW} height={4} fill={skinLo} />
                </g>
              ) : null}
              <rect x={p.torsoX + 1} y={60} width={p.legW + 2} height={3} fill="#2A211C" />
              <rect x={p.torsoX + p.torsoW - p.legW - 2} y={60} width={p.legW + 2} height={3} fill="#2A211C" />
            </g>
          )
        ) : (
          /* Seated thighs */
          <rect
            x={p.torsoX + 1}
            y={legY - 1}
            width={p.torsoW - 2}
            height={8}
            fill={col.bottom}
            stroke={INK}
            strokeWidth={1}
          />
        )}

        {/* Torso */}
        <rect
          x={p.torsoX}
          y={torsoY}
          width={p.torsoW}
          height={p.torsoH}
          fill={col.top}
          stroke={INK}
          strokeWidth={1}
        />
        {/* Single-step side shading */}
        <rect x={p.torsoX + p.torsoW - 4} y={torsoY + 1} width={3} height={p.torsoH - 2} fill={col.topLo} />
        {/* Protruding belly highlight for Pak Darma / stocky figures */}
        {p.belly ? (
          <rect
            x={p.torsoX + p.torsoW - 2}
            y={torsoY + 8}
            width={p.belly}
            height={10}
            fill={col.top}
            stroke={INK}
            strokeWidth={1}
          />
        ) : null}

        {renderOutfitDetails()}

        {/* Neck */}
        <rect x={p.headX + hunchDx + Math.floor(p.headW / 2) - 2} y={headY + p.headH - 1} width={4} height={3} fill={skinLo} />

        {/* Head */}
        <rect
          x={p.headX + hunchDx}
          y={headY}
          width={p.headW}
          height={p.headH}
          fill={skin}
          stroke={INK}
          strokeWidth={1}
        />
        {/* One-step face shadow */}
        <rect x={p.headX + hunchDx + p.headW - 3} y={headY + 1} width={2} height={p.headH - 2} fill={skinLo} />

        {renderHair()}
        {renderFace()}

        {/* Optional woven conical hat (caping) for Sari */}
        {caping ? (
          <g>
            <polygon
              points={`${p.headX - 8},${headY + 3} ${p.headX + p.headW / 2},${headY - 10} ${p.headX + p.headW + 8},${headY + 3}`}
              fill="#D6B268"
              stroke={INK}
              strokeWidth={1}
            />
            <rect x={p.headX - 6} y={headY + 1} width={p.headW + 12} height={2} fill="#B89249" />
            <rect x={p.headX + p.headW / 2 - 2} y={headY - 8} width={4} height={2} fill="#E8CA82" />
          </g>
        ) : null}

        {renderArmsAndProps()}
      </svg>
    </div>
  );
};

/** Small 24-44px RPG map walking sprite (flat pixel art, code-drawn) for wide shots and maps. */
export const MiniPixelSprite: React.FC<{
  x: number;
  y: number;
  shirt: string;
  pants?: string;
  skin?: string;
  hair?: string;
  hat?: 'none' | 'peci' | 'caping' | 'hijab' | 'cap';
  hatColor?: string;
  height?: number;
  facingLeft?: boolean;
  walking?: boolean;
  phase?: number;
}> = ({
  x,
  y,
  shirt,
  pants = '#36322E',
  skin = '#D9A57C',
  hair = '#221C19',
  hat = 'none',
  hatColor = '#7A563C',
  height = 36,
  facingLeft = false,
  walking = true,
  phase = 0,
}) => {
  const f = useCurrentFrame();
  const step = walking ? Math.floor((f + phase * 10) / 6) % 4 : 0;
  const bob = walking && (step === 1 || step === 3) ? -2 : 0;
  const legOffset = step === 1 ? 1 : step === 3 ? -1 : 0;
  const w = Math.round(height * 0.65);

  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - height + bob,
        width: w,
        height,
        transform: facingLeft ? 'scaleX(-1)' : undefined,
        pointerEvents: 'none',
      }}
    >
      <svg width={w} height={height} viewBox="0 0 12 18" shapeRendering="crispEdges">
        {/* Shadow */}
        <rect x={2} y={16} width={8} height={2} fill="rgba(20,18,14,0.3)" />
        {/* Legs */}
        <rect x={3 + legOffset} y={12} width={2} height={5} fill={pants} stroke={INK} strokeWidth={0.6} />
        <rect x={7 - legOffset} y={12} width={2} height={5} fill={pants} stroke={INK} strokeWidth={0.6} />
        {/* Shirt */}
        <rect x={2} y={6} width={8} height={7} fill={shirt} stroke={INK} strokeWidth={0.7} />
        {/* Head */}
        <rect x={3} y={1} width={6} height={5} fill={skin} stroke={INK} strokeWidth={0.7} />
        {/* Hair / Hat */}
        {hat === 'caping' ? (
          <polygon points="0,3 6,-2 12,3" fill="#D6B268" stroke={INK} strokeWidth={0.7} />
        ) : hat === 'hijab' ? (
          <g>
            <rect x={2} y={0} width={8} height={6} fill={hatColor} stroke={INK} strokeWidth={0.6} />
            <rect x={4} y={2} width={4} height={3} fill={skin} />
          </g>
        ) : hat === 'peci' ? (
          <rect x={3} y={0} width={6} height={2} fill="#1E1E24" />
        ) : hat === 'cap' ? (
          <g>
            <rect x={3} y={0} width={6} height={2} fill={hatColor} />
            <rect x={6} y={1} width={4} height={1} fill="#243854" />
          </g>
        ) : (
          <rect x={3} y={1} width={6} height={2} fill={hair} />
        )}
      </svg>
    </div>
  );
};

/** Pixel art goat (for Bu Endang's pen, market sale, and Sari herding). */
export const PixelGoat: React.FC<{
  x: number;
  y: number;
  size?: number;
  facingLeft?: boolean;
  coat?: string;
  phase?: number;
}> = ({x, y, size = 32, facingLeft = false, coat = '#EDE6D4', phase = 0}) => {
  const f = useCurrentFrame();
  const munch = Math.sin(f / 10 + phase) > 0.4 ? 1 : 0;
  const h = Math.round(size * 0.75);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - h,
        width: size,
        height: h,
        transform: facingLeft ? 'scaleX(-1)' : undefined,
        pointerEvents: 'none',
      }}
    >
      <svg width={size} height={h} viewBox="0 0 20 15" shapeRendering="crispEdges">
        <rect x={3} y={13} width={14} height={2} fill="rgba(20,18,14,0.25)" />
        {/* Legs */}
        <rect x={4} y={9} width={2} height={5} fill="#594C40" stroke={INK} strokeWidth={0.6} />
        <rect x={7} y={9} width={2} height={5} fill="#4A3F35" stroke={INK} strokeWidth={0.6} />
        <rect x={12} y={9} width={2} height={5} fill="#594C40" stroke={INK} strokeWidth={0.6} />
        <rect x={14} y={9} width={2} height={5} fill="#4A3F35" stroke={INK} strokeWidth={0.6} />
        {/* Body */}
        <rect x={3} y={4} width={13} height={6} fill={coat} stroke={INK} strokeWidth={0.8} />
        <rect x={3} y={8} width={13} height={2} fill="#CFC5B0" />
        {/* Tail */}
        <rect x={1} y={4} width={2} height={2} fill={coat} stroke={INK} strokeWidth={0.6} />
        {/* Head + horns */}
        <rect x={14} y={2 + munch} width={5} height={4} fill={coat} stroke={INK} strokeWidth={0.8} />
        <rect x={15} y={0 + munch} width={1} height={2} fill="#6E5A44" />
        <rect x={17} y={0 + munch} width={1} height={2} fill="#6E5A44" />
        <rect x={17} y={3 + munch} width={1} height={1} fill={INK} />
      </svg>
    </div>
  );
};
