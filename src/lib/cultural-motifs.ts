/**
 * SVG-based cultural motif definitions for each Indonesian ethnic wedding template.
 * Each motif is a lightweight SVG path rendered as background decoration.
 * viewBox is standardized to "0 0 100 100".
 */

export interface CulturalMotifSVG {
  /** SVG path `d` attribute */
  path: string;
  /** Optional secondary path for detail */
  path2?: string;
  /** Label for accessibility */
  label: string;
}

export type CulturalMotifSet = CulturalMotifSVG[];

/**
 * Maps template IDs to their cultural SVG motifs.
 * Each template has 3 motifs that get scattered across the invitation background.
 */
export const culturalMotifSets: Record<string, CulturalMotifSet> = {

  // ── JAWA ──
  'wedding-jawa-classic': [
    {
      // Candi / Temple — stepped pyramid silhouette
      path: 'M50 10 L60 25 L65 25 L65 35 L70 35 L70 50 L75 50 L75 65 L80 65 L80 90 L20 90 L20 65 L25 65 L25 50 L30 50 L30 35 L35 35 L35 25 L40 25 Z',
      label: 'Candi Borobudur',
    },
    {
      // Batik Kawung — 4 overlapping ellipses forming a diamond flower
      path: 'M50 20 Q65 35 50 50 Q35 35 50 20 Z M20 50 Q35 35 50 50 Q35 65 20 50 Z M50 80 Q35 65 50 50 Q65 65 50 80 Z M80 50 Q65 65 50 50 Q65 35 80 50 Z',
      label: 'Batik Kawung',
    },
    {
      // Wayang — simplified puppet silhouette (profile)
      path: 'M45 10 Q55 10 55 20 L55 25 Q60 27 58 32 Q62 35 55 38 L55 50 L65 65 L60 67 L50 55 L50 70 L60 90 L55 90 L48 75 L41 90 L36 90 L46 70 L46 55 L36 67 L31 65 L41 50 L41 38 Q34 35 38 32 Q36 27 41 25 L41 20 Q41 10 45 10 Z',
      label: 'Wayang Kulit',
    },
  ],

  // ── SUNDA ──
  'wedding-sunda-elegant': [
    {
      // Mountain / Gunung Tangkuban Parahu
      path: 'M5 85 L30 30 Q40 15 50 30 L55 38 L60 30 Q65 20 70 28 L95 85 Z',
      path2: 'M30 30 Q40 25 50 30',
      label: 'Gunung Tangkuban Parahu',
    },
    {
      // Angklung — bamboo tubes
      path: 'M25 15 L25 75 Q25 80 28 80 Q31 80 31 75 L31 20 Z M40 25 L40 80 Q40 85 43 85 Q46 85 46 80 L46 30 Z M55 10 L55 70 Q55 75 58 75 Q61 75 61 70 L61 15 Z M70 30 L70 85 Q70 90 73 90 Q76 90 76 85 L76 35 Z',
      label: 'Angklung',
    },
    {
      // Batik Sunda — interlocking mega mendung cloud-step pattern
      path: 'M10 50 Q20 30 35 40 Q50 25 65 40 Q80 30 90 50 Q80 70 65 60 Q50 75 35 60 Q20 70 10 50 Z',
      path2: 'M25 50 Q35 38 50 45 Q65 38 75 50 Q65 62 50 55 Q35 62 25 50 Z',
      label: 'Batik Sunda',
    },
  ],

  // ── MADURA ──
  'wedding-madura-bold': [
    {
      // Karapan Sapi — bull silhouette
      path: 'M15 55 Q15 40 25 35 L30 25 L28 15 L35 20 L40 30 Q45 28 50 30 Q60 28 65 35 L70 30 Q75 28 78 35 Q85 40 85 55 L80 60 Q75 65 70 60 L65 55 Q55 58 45 55 L35 58 Q25 60 20 55 Z',
      label: 'Karapan Sapi',
    },
    {
      // Perahu Madura — traditional boat
      path: 'M10 60 Q15 45 30 50 L70 50 Q85 45 90 60 L85 62 Q75 55 65 55 L35 55 Q25 55 15 62 Z M50 50 L50 20 L55 22 L55 48',
      path2: 'M50 20 L75 35 L55 40',
      label: 'Perahu Madura',
    },
    {
      // Batik Madura geometric — interlocking diamonds
      path: 'M50 10 L70 30 L50 50 L30 30 Z M50 50 L70 70 L50 90 L30 70 Z',
      path2: 'M10 50 L30 30 L50 50 L30 70 Z M50 50 L70 30 L90 50 L70 70 Z',
      label: 'Batik Madura',
    },
  ],

  // ── BATAK ──
  'wedding-batak-megah': [
    {
      // Rumah Bolon — traditional house with curved roof
      path: 'M15 65 L50 20 L85 65 Z M20 65 L20 90 L80 90 L80 65',
      path2: 'M10 68 Q50 10 90 68',
      label: 'Rumah Bolon',
    },
    {
      // Gondang Batak — set of traditional drums (taganing)
      path: 'M15 30 Q15 22 25 20 Q35 22 35 30 L36 68 Q36 78 25 80 Q14 78 14 68 Z M40 25 Q40 17 50 15 Q60 17 60 25 L61 65 Q61 75 50 77 Q39 75 39 65 Z M65 30 Q65 22 75 20 Q85 22 85 30 L86 68 Q86 78 75 80 Q64 78 64 68 Z',
      path2: 'M15 30 Q15 36 25 38 Q35 36 35 30 M40 25 Q40 31 50 33 Q60 31 60 25 M65 30 Q65 36 75 38 Q85 36 85 30',
      label: 'Gondang Batak',
    },
    {
      // Ulos zigzag textile pattern
      path: 'M10 30 L25 20 L40 30 L55 20 L70 30 L85 20 L90 25 L90 35 L85 30 L70 40 L55 30 L40 40 L25 30 L10 40 Z M10 60 L25 50 L40 60 L55 50 L70 60 L85 50 L90 55 L90 65 L85 60 L70 70 L55 60 L40 70 L25 60 L10 70 Z',
      label: 'Ulos',
    },
  ],

  // ── MINANGKABAU ──
  'wedding-minang-indah': [
    {
      // Rumah Gadang — curved horn roof
      path: 'M5 70 Q15 30 30 55 L30 85 L70 85 L70 55 Q85 30 95 70 L85 72 Q78 45 70 55 L30 55 Q22 45 15 72 Z',
      path2: 'M5 70 Q15 25 30 50 M95 70 Q85 25 70 50',
      label: 'Rumah Gadang',
    },
    {
      // Keris — wavy blade silhouette
      path: 'M45 90 L45 80 Q40 70 50 60 Q42 50 52 40 Q44 30 50 20 L52 15 L55 20 Q48 30 56 40 Q48 50 55 60 Q47 70 55 80 L55 90 Z',
      label: 'Keris Minang',
    },
    {
      // Rendang pot / plate — decorative circular
      path: 'M50 25 Q75 25 80 45 Q85 65 65 75 Q50 82 35 75 Q15 65 20 45 Q25 25 50 25 Z',
      path2: 'M50 35 Q65 35 68 47 Q72 58 58 65 Q50 70 42 65 Q28 58 32 47 Q35 35 50 35 Z',
      label: 'Rendang',
    },
  ],

  // ── BETAWI ──
  'wedding-betawi-meriah': [
    {
      // Ondel-ondel — large puppet face
      path: 'M50 10 Q75 10 78 35 Q80 55 65 65 L60 90 L40 90 L35 65 Q20 55 22 35 Q25 10 50 10 Z',
      path2: 'M38 35 Q40 30 45 33 M55 33 Q60 30 62 35 M42 50 Q50 58 58 50',
      label: 'Ondel-ondel',
    },
    {
      // Gambang Kromong — xylophone instrument
      path: 'M15 40 L20 35 L20 75 L15 80 Z M28 35 L33 28 L33 72 L28 78 Z M41 30 L46 22 L46 68 L41 75 Z M54 28 L59 18 L59 65 L54 72 Z M67 30 L72 22 L72 68 L67 75 Z M80 35 L85 28 L85 72 L80 78 Z',
      label: 'Gambang Kromong',
    },
    {
      // Baju Sadariah — traditional Betawi vest
      path: 'M35 15 L45 12 L50 10 L55 12 L65 15 L68 20 L70 40 L65 42 L62 80 L55 85 L50 86 L45 85 L38 80 L35 42 L30 40 L32 20 Z',
      path2: 'M45 12 L45 40 M55 12 L55 40 M42 50 L42 75 M58 50 L58 75',
      label: 'Baju Sadariah',
    },
  ],

  // ── BUGIS ──
  'wedding-bugis-megah': [
    {
      // Perahu Pinisi — large sailing ship
      path: 'M20 70 Q30 55 45 58 L55 58 Q70 55 80 70 Z M50 58 L50 15 M50 15 L75 40 L52 50 M50 20 L25 42 L48 50',
      label: 'Perahu Pinisi',
    },
    {
      // Badik — traditional dagger
      path: 'M45 85 L42 75 L48 40 L46 38 L44 35 Q43 25 50 15 Q57 25 56 35 L54 38 L52 40 L58 75 L55 85 Z',
      label: 'Badik',
    },
    {
      // Lontara script — abstract squares
      path: 'M20 20 L40 20 L40 40 L20 40 Z M25 25 L35 35 M35 25 L25 35 M60 20 L80 20 L80 40 L60 40 Z M65 25 L75 35 M20 60 L40 60 L40 80 L20 80 Z M25 65 L35 75 M60 60 L80 60 L80 80 L60 80 Z M65 65 L75 75 M75 65 L65 75',
      label: 'Aksara Lontara',
    },
  ],

  // ── BANTEN ──
  'wedding-banten-klasik': [
    {
      // Masjid dome — mosque silhouette
      path: 'M25 85 L25 50 Q25 25 50 15 Q75 25 75 50 L75 85 Z M48 10 L50 5 L52 10',
      path2: 'M35 85 L35 55 Q35 40 50 32 Q65 40 65 55 L65 85',
      label: 'Masjid Agung Banten',
    },
    {
      // Golok blade
      path: 'M35 85 L30 75 L38 20 Q40 12 48 10 Q52 10 50 18 L55 75 L50 85 Z',
      label: 'Golok',
    },
    {
      // Batik Banten — hexagonal pattern
      path: 'M50 15 L72 30 L72 60 L50 75 L28 60 L28 30 Z',
      path2: 'M50 28 L62 36 L62 54 L50 62 L38 54 L38 36 Z',
      label: 'Batik Banten',
    },
  ],

  // ── BANJAR ──
  'wedding-banjar-indah': [
    {
      // Rumah Bubungan Tinggi — steep-roofed house
      path: 'M50 8 L80 50 L80 88 L20 88 L20 50 Z',
      path2: 'M50 8 L85 52 M50 8 L15 52 M38 60 L38 88 L62 88 L62 60 L38 60',
      label: 'Rumah Bubungan Tinggi',
    },
    {
      // Jukung boat
      path: 'M8 58 Q20 42 40 48 L60 48 Q80 42 92 58 L82 60 Q72 50 60 52 L40 52 Q28 50 18 60 Z',
      path2: 'M50 48 L50 25 L55 27',
      label: 'Jukung',
    },
    {
      // Sasirangan textile — wavy lines
      path: 'M15 20 Q30 10 45 20 Q60 30 75 20 Q85 14 90 20 M15 40 Q30 30 45 40 Q60 50 75 40 Q85 34 90 40 M15 60 Q30 50 45 60 Q60 70 75 60 Q85 54 90 60 M15 80 Q30 70 45 80 Q60 90 75 80 Q85 74 90 80',
      label: 'Sasirangan',
    },
  ],

  // ── BALI ──
  'wedding-bali-sakral': [
    {
      // Pura / Temple gate — split gate (candi bentar)
      path: 'M15 85 L15 40 Q15 20 30 15 L35 10 L38 15 L38 85 Z M85 85 L85 40 Q85 20 70 15 L65 10 L62 15 L62 85 Z',
      path2: 'M20 50 L35 50 M65 50 L80 50 M20 65 L35 65 M65 65 L80 65',
      label: 'Pura',
    },
    {
      // Dancer silhouette — Tari Kecak pose
      path: 'M50 12 Q55 12 55 18 Q55 22 50 22 Q45 22 45 18 Q45 12 50 12 Z M50 22 L50 45 M50 30 L35 22 L30 28 M50 30 L65 22 L70 28 M50 45 L38 70 L35 75 M50 45 L62 70 L65 75',
      label: 'Tari Kecak',
    },
    {
      // Kain Kamen — traditional Balinese wrapped fabric/sarong
      path: 'M30 15 L70 15 L72 18 L72 75 Q72 85 60 88 L50 90 L40 88 Q28 85 28 75 L28 18 Z',
      path2: 'M30 15 L70 15 M32 30 L68 30 M35 45 Q50 52 65 45 M38 60 Q50 66 62 60 M40 75 Q50 80 60 75',
      label: 'Kain Kamen',
    },
  ],

  // ── SASAK ──
  'wedding-sasak-anggun': [
    {
      // Bale Tani — traditional house
      path: 'M10 55 L50 25 L90 55 Z M20 55 L20 85 L80 85 L80 55',
      path2: 'M40 85 L40 62 L60 62 L60 85',
      label: 'Bale Tani',
    },
    {
      // Tenun weave pattern — interlocking diamonds
      path: 'M50 10 L65 25 L50 40 L35 25 Z M20 25 L35 40 L20 55 L5 40 Z M80 25 L95 40 L80 55 L65 40 Z M50 40 L65 55 L50 70 L35 55 Z M20 55 L35 70 L20 85 L5 70 Z M80 55 L95 70 L80 85 L65 70 Z',
      label: 'Tenun Lombok',
    },
    {
      // Gendang Beleq — large drum
      path: 'M30 30 Q30 20 50 18 Q70 20 70 30 L72 70 Q72 82 50 84 Q28 82 28 70 Z',
      path2: 'M30 30 Q30 38 50 40 Q70 38 70 30 M28 70 Q28 62 50 60 Q72 62 72 70',
      label: 'Gendang Beleq',
    },
  ],

  // ── ACEH ──
  'wedding-aceh-mulia': [
    {
      // Masjid Raya Baiturrahman — multi-dome mosque
      path: 'M20 85 L20 50 L30 50 L30 40 Q30 25 40 20 Q50 10 60 20 Q70 25 70 40 L70 50 L80 50 L80 85 Z',
      path2: 'M48 8 L50 3 L52 8 M25 50 Q25 38 35 32 M75 50 Q75 38 65 32',
      label: 'Masjid Raya Baiturrahman',
    },
    {
      // Rencong — curved dagger
      path: 'M60 85 L55 70 L52 50 Q48 35 55 25 Q60 18 58 10 L62 12 Q65 20 58 30 Q55 38 56 50 L60 70 L65 85 Z',
      path2: 'M48 50 L62 46',
      label: 'Rencong',
    },
    {
      // Tari Saman — row of dancers
      path: 'M15 25 Q18 20 21 25 L21 35 L15 35 Z M15 35 L13 50 L23 50 L21 35 M30 25 Q33 20 36 25 L36 35 L30 35 Z M30 35 L28 50 L38 50 L36 35 M45 25 Q48 20 51 25 L51 35 L45 35 Z M45 35 L43 50 L53 50 L51 35 M60 25 Q63 20 66 25 L66 35 L60 35 Z M60 35 L58 50 L68 50 L66 35 M75 25 Q78 20 81 25 L81 35 L75 35 Z M75 35 L73 50 L83 50 L81 35',
      label: 'Tari Saman',
    },
  ],

  // ── DAYAK ──
  'wedding-dayak-agung': [
    {
      // Patung Totem — stacked totemic figures
      path: 'M40 10 L60 10 L60 25 L55 28 L60 30 L60 50 L55 53 L60 55 L60 75 L55 78 L60 80 L60 90 L40 90 L40 80 L45 78 L40 75 L40 55 L45 53 L40 50 L40 30 L45 28 L40 25 Z',
      path2: 'M44 16 L48 14 M52 16 L56 14 M44 36 L48 34 M52 36 L56 34 M44 62 L48 60 M52 62 L56 60',
      label: 'Patung Totem',
    },
    {
      // Feather headdress
      path: 'M50 50 Q45 35 30 15 Q35 18 40 30 Q42 20 35 5 Q42 15 48 35 Q48 20 50 2 Q52 20 52 35 Q58 15 65 5 Q58 20 60 30 Q65 18 70 15 Q55 35 50 50 Z',
      label: 'Hiasan Bulu',
    },
    {
      // Rumah Panjang — longhouse
      path: 'M5 55 L50 30 L95 55 Z M10 55 L10 80 L90 80 L90 55',
      path2: 'M25 80 L25 60 L40 60 L40 80 M60 80 L60 60 L75 60 L75 80',
      label: 'Rumah Panjang',
    },
  ],

  // ── MAKASSAR ──
  'wedding-makassar-gagah': [
    {
      // Perahu Phinisi — sailing ship
      path: 'M15 65 Q25 48 45 52 L55 52 Q75 48 85 65 Z M50 52 L48 12 M48 12 L20 40 L46 48 M48 18 L78 38 L52 48',
      label: 'Perahu Phinisi',
    },
    {
      // Badik — Makassar dagger
      path: 'M44 88 L42 78 L47 30 Q46 22 50 12 Q54 22 53 30 L58 78 L56 88 Z',
      path2: 'M38 40 L62 36',
      label: 'Badik',
    },
    {
      // Passapu — traditional hat
      path: 'M20 60 Q20 30 50 20 Q80 30 80 60 Z',
      path2: 'M15 60 L85 60 Q85 68 50 72 Q15 68 15 60 Z',
      label: 'Passapu',
    },
  ],

  // ── MELAYU ──
  'wedding-melayu-pesona': [
    {
      // Tanjak — traditional crown/headdress
      path: 'M20 65 L30 35 L40 50 L50 20 L60 50 L70 35 L80 65 Z',
      path2: 'M18 65 L82 65 Q82 75 50 78 Q18 75 18 65 Z',
      label: 'Tanjak',
    },
    {
      // Masjid Melayu — mosque with pointed dome
      path: 'M30 85 L30 50 Q30 30 50 15 Q70 30 70 50 L70 85 Z',
      path2: 'M48 10 L50 2 L52 10 M40 85 L40 65 L60 65 L60 85',
      label: 'Masjid Melayu',
    },
    {
      // Zapin dance figure
      path: 'M50 10 Q55 10 55 16 Q55 20 50 20 Q45 20 45 16 Q45 10 50 10 Z M50 20 L50 42 M50 28 L35 38 M50 28 L65 38 M50 42 L38 68 L35 72 M50 42 L62 68 L65 72',
      label: 'Tari Zapin',
    },
  ],

  // ── TORAJA ──
  'wedding-toraja-sakral': [
    {
      // Tongkonan — boat-shaped roof
      path: 'M5 55 Q25 20 50 35 Q75 20 95 55 L80 55 L80 85 L20 85 L20 55 Z',
      path2: 'M40 85 L40 62 L60 62 L60 85',
      label: 'Tongkonan',
    },
    {
      // Kerbau — buffalo horns
      path: 'M50 50 Q45 40 30 25 Q20 15 10 20 Q15 25 25 30 Q35 38 45 48 Z M50 50 Q55 40 70 25 Q80 15 90 20 Q85 25 75 30 Q65 38 55 48 Z',
      path2: 'M40 50 Q50 55 60 50 Q55 65 50 70 Q45 65 40 50 Z',
      label: 'Kerbau',
    },
    {
      // Tau-Tau — standing figure statue
      path: 'M45 10 L55 10 L55 18 Q58 20 58 25 L55 28 L55 30 L62 35 L62 38 L55 36 L55 55 L60 80 L56 82 L50 60 L44 82 L40 80 L45 55 L45 36 L38 38 L38 35 L45 30 L45 28 L42 25 Q42 20 45 18 Z',
      label: 'Tau-Tau',
    },
  ],

  // ── AMBON ──
  'wedding-ambon-cerah': [
    {
      // Tifa drum
      path: 'M35 20 Q35 12 50 10 Q65 12 65 20 L68 75 Q68 88 50 90 Q32 88 32 75 Z',
      path2: 'M35 20 Q35 28 50 30 Q65 28 65 20',
      label: 'Tifa',
    },
    {
      // Totobuang — row of small kettle gongs on a frame
      path: 'M10 55 L10 45 L90 45 L90 55 Z M18 45 Q18 32 25 30 Q32 32 32 45 M38 45 Q38 32 45 30 Q52 32 52 45 M58 45 Q58 32 65 30 Q72 32 72 45 M78 45 Q78 32 85 30 Q92 32 92 45',
      path2: 'M10 55 L10 65 M90 55 L90 65 M15 65 L85 65',
      label: 'Musik Totobuang',
    },
    {
      // Anchor — maritime / Budaya Bahari
      path: 'M50 10 Q55 10 55 15 Q55 20 50 20 Q45 20 45 15 Q45 10 50 10 Z M50 20 L50 75 M50 75 Q35 75 30 65 L34 62 Q38 70 50 70 Q62 70 66 62 L70 65 Q65 75 50 75 Z M38 35 L62 35',
      label: 'Budaya Bahari',
    },
  ],

  // ── PAPUA ──
  'wedding-papua-mulia': [
    {
      // Burung Cenderawasih — Bird of Paradise silhouette with flowing tail
      path: 'M35 20 Q40 15 45 18 Q48 12 50 15 L52 18 Q55 16 58 20 Q60 25 55 30 L50 32 L45 30 Q40 25 35 20 Z M50 32 L48 45 Q45 50 42 55 L40 60 M50 32 L52 45 Q55 50 58 55 L60 60 M48 45 L45 70 Q42 80 35 88 M48 45 L50 72 Q52 82 55 88 M48 45 L42 68 Q38 78 30 85',
      path2: 'M42 18 Q44 16 46 18 M53 20 L55 18',
      label: 'Burung Cenderawasih',
    },
    {
      // Tifa Papua drum
      path: 'M38 18 Q38 10 50 8 Q62 10 62 18 L64 78 Q64 90 50 92 Q36 90 36 78 Z',
      path2: 'M38 18 Q38 26 50 28 Q62 26 62 18 M44 40 L44 65 M50 38 L50 68 M56 40 L56 65',
      label: 'Tifa Papua',
    },
    {
      // Mountain peaks — Pegunungan Jayawijaya
      path: 'M0 80 L18 35 L28 55 L40 25 L52 50 L60 18 L72 45 L82 30 L100 80 Z',
      path2: 'M40 25 L44 30 M60 18 L64 24 M82 30 L85 35',
      label: 'Pegunungan Papua',
    },
  ],

  // ── TIONGHOA INDONESIA ──
  'wedding-tionghoa-harmoni': [
    {
      // Lampion / Lantern
      path: 'M40 15 L60 15 M38 18 Q30 30 30 45 Q30 60 38 72 L40 78 L42 82 L58 82 L60 78 L62 72 Q70 60 70 45 Q70 30 62 18 Z',
      path2: 'M38 18 L62 18 M35 35 L65 35 M35 55 L65 55 M38 72 L62 72',
      label: 'Lampion Merah',
    },
    {
      // Barongsai — Chinese lion dance head
      path: 'M20 45 Q20 20 50 15 Q80 20 80 45 Q82 55 75 60 L70 65 Q65 70 60 68 L55 72 L50 75 L45 72 L40 68 Q35 70 30 65 L25 60 Q18 55 20 45 Z',
      path2: 'M35 35 Q38 30 42 35 Q40 40 36 40 Z M58 35 Q62 30 65 35 Q64 40 60 40 Z M40 52 Q50 60 60 52 M30 25 L25 15 M70 25 L75 15 M50 18 L50 8',
      label: 'Barongsai',
    },
    {
      // Petasan / Firecrackers — Imlek symbol
      path: 'M42 10 L42 30 Q42 33 45 33 Q48 33 48 30 L48 10 Z M52 10 L52 30 Q52 33 55 33 Q58 33 58 30 L58 10 Z M35 20 L35 40 Q35 43 38 43 Q41 43 41 40 L41 20 Z M59 20 L59 40 Q59 43 62 43 Q65 43 65 40 L65 20 Z',
      path2: 'M45 33 L45 50 Q45 55 50 55 Q55 55 55 50 L55 33 M38 43 L38 55 Q38 60 42 60 M62 43 L62 55 Q62 60 58 60 M50 55 L50 70 L48 75 L52 75 L50 70',
      label: 'Petasan Imlek',
    },
  ],

  // ── LAMPUNG ──
  'wedding-lampung-agung': [
    {
      // Siger — crown headdress
      path: 'M15 65 L25 40 L35 55 L42 30 L50 15 L58 30 L65 55 L75 40 L85 65 Z',
      path2: 'M15 65 L85 65 Q85 75 50 80 Q15 75 15 65 Z',
      label: 'Siger',
    },
    {
      // Kain Tapis — textile diamond pattern
      path: 'M50 10 L70 30 L50 50 L30 30 Z M50 35 L60 45 L50 55 L40 45 Z M50 55 L70 75 L50 95 L30 75 Z',
      path2: 'M20 50 L30 40 L40 50 L30 60 Z M60 50 L70 40 L80 50 L70 60 Z',
      label: 'Kain Tapis',
    },
    {
      // Nuwo Sesat — traditional meeting house
      path: 'M10 60 L50 25 L90 60 Z M20 60 L20 88 L80 88 L80 60',
      path2: 'M38 88 L38 68 L62 68 L62 88 M10 60 L50 20 L90 60',
      label: 'Nuwo Sesat',
    },
  ],
};
