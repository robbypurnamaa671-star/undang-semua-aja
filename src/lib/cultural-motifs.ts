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

  // ── NEW TEMPLATES: Religion ──

  'wedding-islami-mewah': [
    { path: 'M50 10 Q75 25 75 50 L75 85 L25 85 L25 50 Q25 25 50 10 Z', path2: 'M48 5 L50 0 L52 5 M35 85 L35 65 L65 65 L65 85', label: 'Masjid' },
    { path: 'M50 10 Q60 10 65 25 Q70 40 50 50 Q30 40 35 25 Q40 10 50 10 Z', path2: 'M50 50 L50 90', label: 'Bulan Sabit' },
    { path: 'M30 15 L70 15 L72 20 L72 85 L28 85 L28 20 Z', path2: 'M35 25 L65 25 M35 35 L65 35 M35 45 L65 45 M35 55 L65 55', label: 'Al-Quran' },
  ],

  'wedding-kristen-sakral': [
    { path: 'M45 10 L55 10 L55 40 L80 40 L80 50 L55 50 L55 90 L45 90 L45 50 L20 50 L20 40 L45 40 Z', label: 'Salib' },
    { path: 'M25 85 L25 40 Q25 20 50 10 Q75 20 75 40 L75 85 Z', path2: 'M48 5 L50 0 L52 5 M40 85 L40 60 L60 60 L60 85 Q50 75 40 85', label: 'Gereja' },
    { path: 'M50 15 Q55 15 55 20 Q55 25 50 25 Q45 25 45 20 Q45 15 50 15 Z M45 25 L42 40 L50 35 L58 40 L55 25 M42 40 L38 80 L45 75 M58 40 L62 80 L55 75 L50 85 L45 75', label: 'Lonceng' },
  ],

  'wedding-katolik-agung': [
    { path: 'M20 85 L20 40 L30 40 L30 30 Q30 15 50 8 Q70 15 70 30 L70 40 L80 40 L80 85 Z', path2: 'M48 3 L50 0 L52 3 M40 85 L40 60 L60 60 L60 85', label: 'Katedral' },
    { path: 'M50 10 Q55 10 55 14 Q60 12 60 17 Q65 15 63 20 Q68 22 63 26 Q65 30 60 30 Q62 35 57 33 Q55 38 50 35 Q45 38 43 33 Q38 35 40 30 Q35 30 37 26 Q32 22 37 20 Q35 15 40 17 Q40 12 45 14 Q45 10 50 10 Z M50 35 L50 85 M50 55 L40 45 M50 65 L60 55', label: 'Rosario' },
    { path: 'M45 15 L55 15 L55 80 L45 80 Z M35 25 L50 15 L65 25 Z', path2: 'M48 10 L50 5 L52 10 M42 80 L50 90 L58 80', label: 'Lilin' },
  ],

  'wedding-hindu-suci': [
    { path: 'M50 10 Q65 25 65 45 Q65 60 50 70 Q35 60 35 45 Q35 25 50 10 Z', path2: 'M50 25 Q57 35 57 45 Q57 55 50 60 Q43 55 43 45 Q43 35 50 25 Z', label: 'Mandala' },
    { path: 'M50 5 Q55 15 60 20 Q55 25 50 20 Q45 25 40 20 Q45 15 50 5 Z M50 20 L50 30 M40 30 Q30 40 35 55 Q40 65 50 70 Q60 65 65 55 Q70 40 60 30 L40 30 Z', label: 'Teratai Om' },
    { path: 'M15 80 L15 40 Q15 20 30 15 L35 10 L38 15 L38 80 Z M85 80 L85 40 Q85 20 70 15 L65 10 L62 15 L62 80 Z', path2: 'M20 50 L35 50 M65 50 L80 50', label: 'Gapura' },
  ],

  'wedding-buddha-harmoni': [
    { path: 'M50 15 L58 35 L80 35 L62 50 L70 70 L50 58 L30 70 L38 50 L20 35 L42 35 Z', label: 'Roda Dharma' },
    { path: 'M50 20 Q55 25 60 30 Q55 35 50 30 Q45 35 40 30 Q45 25 50 20 Z M50 30 L50 40 M35 40 Q25 50 30 65 Q38 78 50 82 Q62 78 70 65 Q75 50 65 40 L35 40 Z', label: 'Teratai' },
    { path: 'M50 10 Q70 15 70 35 Q70 55 50 65 Q30 55 30 35 Q30 15 50 10 Z', path2: 'M50 20 Q60 25 60 35 Q60 48 50 55 Q40 48 40 35 Q40 25 50 20 Z', label: 'Stupa' },
  ],

  // ── NEW TEMPLATES: Famous Cities ──

  'wedding-paris-romantis': [
    { path: 'M48 5 L52 5 L52 25 L60 25 L60 30 L55 30 L55 50 L65 50 L65 55 L58 55 L58 70 L72 70 L72 78 L60 78 L60 85 L40 85 L40 78 L28 78 L28 70 L42 70 L42 55 L35 55 L35 50 L45 50 L45 30 L40 30 L40 25 L48 25 Z', label: 'Eiffel Tower' },
    { path: 'M30 45 Q30 20 50 15 Q70 20 70 45 Q70 65 50 75 Q30 65 30 45 Z', path2: 'M40 45 Q40 30 50 25 Q60 30 60 45 Q60 55 50 62 Q40 55 40 45 Z', label: 'Rose Window' },
    { path: 'M50 10 Q58 10 60 18 Q68 16 65 24 Q72 28 66 34 Q70 40 62 42 Q63 50 55 48 Q55 55 48 50 Q42 55 42 48 Q35 50 36 42 Q28 40 34 34 Q28 28 36 24 Q32 16 40 18 Q42 10 50 10 Z', label: 'Mawar' },
  ],

  'wedding-tokyo-sakura': [
    { path: 'M50 15 Q55 20 52 28 Q58 25 55 32 Q60 32 55 38 Q58 42 52 40 Q55 45 50 42 Q45 45 48 40 Q42 42 45 38 Q40 32 45 32 Q42 25 48 28 Q45 20 50 15 Z', label: 'Sakura' },
    { path: 'M15 80 L15 40 Q15 20 30 15 L35 10 L38 15 L38 80 Z M85 80 L85 40 Q85 20 70 15 L65 10 L62 15 L62 80 Z', path2: 'M38 35 L62 35', label: 'Torii Gate' },
    { path: 'M40 15 L60 15 L58 25 L55 25 L55 30 Q60 35 60 45 Q60 60 50 65 Q40 60 40 45 Q40 35 45 30 L45 25 L42 25 Z', label: 'Kokeshi' },
  ],

  'wedding-istanbul-megah': [
    { path: 'M20 85 L20 45 Q20 20 50 10 Q80 20 80 45 L80 85 Z', path2: 'M48 5 L50 0 L52 5 M30 85 L30 50 Q30 30 50 20 Q70 30 70 50 L70 85', label: 'Hagia Sophia' },
    { path: 'M50 15 Q70 25 70 50 Q70 75 50 85 Q30 75 30 50 Q30 25 50 15 Z', path2: 'M50 25 Q60 30 60 50 Q60 70 50 78 Q40 70 40 50 Q40 30 50 25 Z', label: 'Evil Eye' },
    { path: 'M50 10 Q55 15 52 22 Q58 18 55 26 Q60 24 55 30 Q58 35 52 32 Q55 38 50 34 Q45 38 48 32 Q42 35 45 30 Q40 24 45 26 Q42 18 48 22 Q45 15 50 10 Z', label: 'Tulip' },
  ],

  'wedding-jogja-heritage': [
    { path: 'M50 10 L60 25 L65 25 L65 35 L70 35 L70 50 L75 50 L75 65 L80 65 L80 90 L20 90 L20 65 L25 65 L25 50 L30 50 L30 35 L35 35 L35 25 L40 25 Z', label: 'Keraton' },
    { path: 'M50 20 Q65 35 50 50 Q35 35 50 20 Z M20 50 Q35 35 50 50 Q35 65 20 50 Z M50 80 Q35 65 50 50 Q65 65 50 80 Z M80 50 Q65 65 50 50 Q65 35 80 50 Z', label: 'Batik Parang' },
    { path: 'M45 10 Q55 10 55 20 L55 25 Q60 27 58 32 L55 50 L65 65 L60 67 L50 55 L50 70 L60 90 L55 90 L48 75 L41 90 L36 90 L46 70 L46 55 L36 67 L31 65 L41 50 L41 32 Q36 27 41 25 L41 20 Q41 10 45 10 Z', label: 'Wayang' },
  ],

  'wedding-venice-elegan': [
    { path: 'M15 65 Q25 50 40 55 L60 55 Q75 50 85 65 Z M50 55 L50 25 L55 27 L55 50', path2: 'M50 25 L70 40 L55 45', label: 'Gondola' },
    { path: 'M30 20 Q30 10 50 10 Q70 10 70 20 Q72 35 65 40 Q70 45 68 55 L60 55 Q58 48 62 42 Q55 38 55 25 Q55 15 50 15 Q45 15 45 25 Q45 38 38 42 Q42 48 40 55 L32 55 Q30 45 35 40 Q28 35 30 20 Z', label: 'Topeng Venesia' },
    { path: 'M20 70 Q20 30 50 20 Q80 30 80 70 Z', path2: 'M30 70 Q30 40 50 30 Q70 40 70 70', label: 'Jembatan Rialto' },
  ],

  // ── NEW TEMPLATES: Climate/Nature ──

  'wedding-garden-boho': [
    { path: 'M50 15 Q58 15 60 25 Q68 22 64 30 Q70 36 62 38 Q64 46 56 44 Q55 50 48 46 Q42 50 42 44 Q34 46 36 38 Q28 36 34 30 Q30 22 38 25 Q40 15 50 15 Z', label: 'Bunga Matahari' },
    { path: 'M50 10 Q52 20 55 30 Q60 35 55 45 Q58 55 50 60 Q42 55 45 45 Q40 35 45 30 Q48 20 50 10 Z', path2: 'M50 60 L50 90 M45 70 L35 65 M55 75 L65 70', label: 'Eucalyptus' },
    { path: 'M50 5 L52 15 Q58 12 55 20 Q62 20 57 26 Q60 32 53 30 Q52 35 50 30 Q48 35 47 30 Q40 32 43 26 Q38 20 45 20 Q42 12 48 15 Z M50 30 L50 90 M46 45 L38 40 M54 55 L62 50 M46 65 L38 60', label: 'Wildflower' },
  ],

  'wedding-pantai-sunset': [
    { path: 'M0 60 Q15 50 30 58 Q45 50 60 60 Q75 50 90 58 Q100 52 100 60 L100 90 L0 90 Z', label: 'Ombak' },
    { path: 'M50 25 Q55 25 58 30 Q65 28 62 35 Q68 38 62 42 Q65 48 58 46 Q55 50 50 46 Q45 50 42 46 Q35 48 38 42 Q32 38 38 35 Q35 28 42 30 Q45 25 50 25 Z', path2: 'M43 38 L40 42 M57 35 L60 32', label: 'Kerang' },
    { path: 'M50 5 L50 70 M48 70 Q40 75 35 85 Q50 80 65 85 Q60 75 52 70', path2: 'M45 20 L25 30 M55 15 L75 25 M42 35 L20 45 M58 30 L78 38', label: 'Kelapa' },
  ],

  'wedding-winter-frost': [
    { path: 'M50 10 L50 90 M50 50 L80 25 M50 50 L20 25 M50 50 L80 75 M50 50 L20 75 M25 50 L75 50', path2: 'M50 20 L55 25 L50 30 L45 25 Z M50 70 L55 75 L50 80 L45 75 Z M30 40 L35 35 L40 40 L35 45 Z M60 60 L65 55 L70 60 L65 65 Z', label: 'Kristal Es' },
    { path: 'M50 15 Q60 15 65 25 Q70 35 60 40 Q65 50 55 52 Q58 60 50 58 Q42 60 45 52 Q35 50 40 40 Q30 35 35 25 Q40 15 50 15 Z', path2: 'M44 30 Q46 28 48 30 M52 32 Q54 30 56 32 M46 40 Q50 44 54 40', label: 'Snowman' },
    { path: 'M50 10 L55 30 L75 30 L60 42 L65 62 L50 50 L35 62 L40 42 L25 30 L45 30 Z', label: 'Bintang Salju' },
  ],

  'wedding-autumn-warm': [
    { path: 'M50 15 Q60 20 65 35 Q68 50 55 60 Q50 55 45 60 Q32 50 35 35 Q40 20 50 15 Z', path2: 'M50 15 L50 85 M42 30 L35 25 M58 40 L65 35', label: 'Maple Leaf' },
    { path: 'M50 10 Q52 20 55 25 Q60 22 57 30 Q62 32 56 36 Q58 42 50 40 Q42 42 44 36 Q38 32 43 30 Q40 22 45 25 Q48 20 50 10 Z M50 40 L50 90 M45 55 Q35 58 30 65 M55 65 Q65 68 70 75', label: 'Gandum' },
    { path: 'M30 40 Q30 20 50 15 Q70 20 70 40 Q70 55 55 60 L55 85 L45 85 L45 60 Q30 55 30 40 Z', path2: 'M40 45 Q42 40 48 42 M52 38 Q55 35 58 38', label: 'Labu' },
  ],

  // ── NEW TEMPLATES: Identity/Culture ──

  'wedding-nusantara-fusion': [
    { path: 'M50 15 L60 25 L58 28 L65 35 L60 38 L68 48 L50 60 L32 48 L40 38 L35 35 L42 28 L40 25 Z', path2: 'M50 60 L50 85', label: 'Garuda' },
    { path: 'M20 20 L35 20 Q30 35 35 50 Q30 65 35 80 L20 80 Z M65 20 L80 20 Q75 35 80 50 Q75 65 80 80 L65 80 Z', path2: 'M35 30 L65 30 M35 50 L65 50 M35 70 L65 70', label: 'Songket' },
    { path: 'M15 50 Q15 25 50 15 Q85 25 85 50 Q85 75 50 85 Q15 75 15 50 Z', path2: 'M25 50 Q25 32 50 25 Q75 32 75 50 Q75 68 50 75 Q25 68 25 50 Z', label: 'Peta Nusantara' },
  ],

  'wedding-arab-luxury': [
    { path: 'M50 10 L65 25 L65 50 L50 65 L35 50 L35 25 Z', path2: 'M50 20 L58 28 L58 48 L50 55 L42 48 L42 28 Z', label: 'Arabesque Star' },
    { path: 'M50 5 L55 18 L70 18 L58 28 L62 42 L50 33 L38 42 L42 28 L30 18 L45 18 Z', label: 'Islamic Star' },
    { path: 'M40 15 L60 15 Q70 15 70 25 L70 75 Q70 85 60 85 L40 85 Q30 85 30 75 L30 25 Q30 15 40 15 Z', path2: 'M35 25 L65 25 M35 45 L65 45 M35 65 L65 65', label: 'Ornamen Geometris' },
  ],

  'wedding-india-bollywood': [
    { path: 'M50 10 Q55 15 58 22 Q65 18 62 28 Q70 28 64 35 Q68 42 60 40 Q60 48 52 44 Q50 50 48 44 Q40 48 40 40 Q32 42 36 35 Q30 28 38 28 Q35 18 42 22 Q45 15 50 10 Z', label: 'Mandala' },
    { path: 'M50 15 Q60 20 65 35 Q68 50 55 60 Q50 55 45 60 Q32 50 35 35 Q40 20 50 15 Z M50 60 L50 90', path2: 'M35 45 Q42 50 50 45 Q58 50 65 45', label: 'Paisley' },
    { path: 'M25 65 Q25 30 50 15 Q75 30 75 65 L70 70 Q70 40 50 28 Q30 40 30 70 Z', path2: 'M40 65 L40 85 L60 85 L60 65', label: 'Gajah' },
  ],

  'wedding-korea-hanbok': [
    { path: 'M35 20 Q35 12 50 10 Q65 12 65 20 L70 35 L30 35 Z M28 35 L72 35 L68 85 L32 85 Z', path2: 'M40 35 L40 50 M60 35 L60 50 M45 55 L55 55', label: 'Hanbok' },
    { path: 'M35 20 Q35 10 50 8 Q65 10 65 20 L68 70 Q68 82 50 85 Q32 82 32 70 Z', path2: 'M35 20 Q35 28 50 30 Q65 28 65 20', label: 'Lentera Korea' },
    { path: 'M20 60 L50 30 L80 60 Z M30 60 L30 85 L70 85 L70 60', path2: 'M42 85 L42 68 L58 68 L58 85', label: 'Hanok' },
  ],

  // ── NEW TEMPLATES: Modern Lifestyle ──

  'wedding-industrial-chic': [
    { path: 'M50 15 Q65 15 70 30 Q75 45 65 52 Q70 60 60 62 Q62 70 52 68 Q50 72 48 68 Q38 70 40 62 Q30 60 35 52 Q25 45 30 30 Q35 15 50 15 Z', path2: 'M50 25 L50 45 M42 35 L58 35 M35 42 L50 35 L65 42', label: 'Gear' },
    { path: 'M45 10 L55 10 L55 25 Q60 25 60 30 L60 80 Q60 85 55 85 L45 85 Q40 85 40 80 L40 30 Q40 25 45 25 Z', path2: 'M46 35 Q50 30 54 35 Q54 40 50 42 Q46 40 46 35 Z', label: 'Edison Bulb' },
    { path: 'M15 20 L85 20 L85 80 L15 80 Z M15 35 L85 35 M15 50 L85 50 M15 65 L85 65 M35 20 L35 80 M55 20 L55 80 M75 20 L75 80', label: 'Brick Wall' },
  ],

  'wedding-art-deco-gatsby': [
    { path: 'M50 10 L70 20 L80 40 L80 60 L70 80 L50 90 L30 80 L20 60 L20 40 L30 20 Z', path2: 'M50 20 L62 26 L68 40 L68 60 L62 74 L50 80 L38 74 L32 60 L32 40 L38 26 Z', label: 'Art Deco Gem' },
    { path: 'M10 50 L25 20 L40 50 L55 20 L70 50 L85 20 L90 30 L90 70 L85 80 L70 50 L55 80 L40 50 L25 80 L10 70 Z', label: 'Fan Pattern' },
    { path: 'M30 15 L70 15 L70 85 L30 85 Z M35 20 L65 20 L65 80 L35 80 Z M40 25 L60 25 L60 75 L40 75 Z', path2: 'M50 15 L50 85 M30 50 L70 50', label: 'Frame' },
  ],

  // ══════════════════ NEW BATCH 2: ZODIAK & CELESTIAL ══════════════════

  'wedding-celestial-stars': [
    { path: 'M50 10 L55 30 L75 30 L60 42 L65 62 L50 50 L35 62 L40 42 L25 30 L45 30 Z', label: 'Bintang Emas' },
    { path: 'M50 15 Q60 15 65 25 Q70 35 60 42 Q55 50 50 45 Q45 50 40 42 Q30 35 35 25 Q40 15 50 15 Z', path2: 'M30 60 L35 70 L25 70 Z M70 55 L75 65 L65 65 Z M50 75 L55 85 L45 85 Z', label: 'Rasi Bintang' },
    { path: 'M50 20 Q65 20 70 35 Q75 50 60 60 Q50 65 40 60 Q25 50 30 35 Q35 20 50 20 Z', path2: 'M50 28 Q58 28 62 38 Q65 48 55 55 Q50 58 45 55 Q35 48 38 38 Q42 28 50 28 Z', label: 'Celestial Orb' },
  ],

  'wedding-moon-phase': [
    { path: 'M50 10 Q75 10 75 50 Q75 90 50 90 Q25 90 25 50 Q25 10 50 10 Z', path2: 'M50 10 Q40 30 40 50 Q40 70 50 90', label: 'Bulan Purnama' },
    { path: 'M50 15 Q65 15 65 50 Q65 85 50 85 Q50 65 50 50 Q50 35 50 15 Z', label: 'Bulan Sabit' },
    { path: 'M20 50 Q20 30 35 25 Q40 50 35 75 Q20 70 20 50 Z M50 50 Q50 30 65 25 Q70 50 65 75 Q50 70 50 50 Z M80 50 Q80 30 95 25 Q100 50 95 75 Q80 70 80 50 Z', label: 'Fase Bulan' },
  ],

  'wedding-galaxy-nebula': [
    { path: 'M50 10 Q70 20 75 45 Q80 70 55 80 Q30 90 20 65 Q10 40 30 25 Q45 15 50 10 Z', path2: 'M50 25 Q60 30 62 45 Q65 58 52 65 Q40 70 35 55 Q30 42 40 32 Q48 25 50 25 Z', label: 'Nebula' },
    { path: 'M15 50 Q30 20 50 15 Q70 20 85 50 Q70 80 50 85 Q30 80 15 50 Z', path2: 'M25 50 Q35 30 50 25 Q65 30 75 50 Q65 70 50 75 Q35 70 25 50 Z', label: 'Galaxy Spiral' },
    { path: 'M50 5 L53 18 L65 10 L58 22 L72 22 L60 30 L68 42 L55 35 L55 50 L48 38 L38 48 L42 35 L28 38 L38 28 L25 22 L40 22 L35 10 L48 18 Z', label: 'Supernova' },
  ],

  'wedding-constellation': [
    { path: 'M20 20 L35 40 L55 30 L70 50 L85 35 L80 65 L60 75 L35 60 L20 70', path2: 'M20 20 Q22 18 24 20 M35 40 Q37 38 39 40 M55 30 Q57 28 59 30 M70 50 Q72 48 74 50 M85 35 Q87 33 89 35', label: 'Rasi Bintang' },
    { path: 'M50 10 L55 25 L70 25 L58 35 L62 50 L50 40 L38 50 L42 35 L30 25 L45 25 Z', label: 'North Star' },
    { path: 'M15 30 L30 30 L30 60 M50 20 L50 50 L70 50 M60 70 L80 70 L80 85', path2: 'M15 30 Q13 28 15 26 M30 60 Q32 62 30 64 M50 20 Q48 18 50 16 M70 50 Q72 52 70 54 M60 70 Q58 68 60 66 M80 85 Q82 87 80 89', label: 'Star Map' },
  ],

  'wedding-solar-eclipse': [
    { path: 'M50 10 Q80 10 80 50 Q80 90 50 90 Q20 90 20 50 Q20 10 50 10 Z', path2: 'M50 18 Q72 18 72 50 Q72 82 50 82 Q28 82 28 50 Q28 18 50 18 Z', label: 'Corona' },
    { path: 'M50 15 Q70 15 70 50 Q70 85 50 85 Q30 85 30 50 Q30 15 50 15 Z M50 25 Q45 35 45 50 Q45 65 50 75 Q55 65 55 50 Q55 35 50 25 Z', label: 'Eclipse' },
    { path: 'M50 50 L50 5 M50 50 L90 25 M50 50 L95 50 M50 50 L90 75 M50 50 L50 95 M50 50 L10 75 M50 50 L5 50 M50 50 L10 25', label: 'Sun Rays' },
  ],

  // ══════════════════ NEW BATCH 2: ARSITEKTUR DUNIA ══════════════════

  'wedding-gothic-cathedral': [
    { path: 'M50 5 Q55 5 58 15 L60 45 L65 45 L65 90 L35 90 L35 45 L40 45 L42 15 Q45 5 50 5 Z', path2: 'M42 50 Q50 40 58 50 M45 65 Q50 58 55 65 M48 78 Q50 75 52 78', label: 'Gothic Arch' },
    { path: 'M50 10 Q70 20 70 50 Q70 80 50 90 Q30 80 30 50 Q30 20 50 10 Z', path2: 'M50 20 L55 35 L65 25 L58 38 L68 40 L55 45 L60 58 L50 48 L40 58 L45 45 L32 40 L42 38 L35 25 L45 35 Z', label: 'Rose Window' },
    { path: 'M30 90 L30 50 Q30 25 50 10 Q70 25 70 50 L70 90 Z', path2: 'M40 90 L40 55 Q40 38 50 28 Q60 38 60 55 L60 90', label: 'Pointed Arch' },
  ],

  'wedding-zen-garden': [
    { path: 'M15 60 Q30 55 45 60 Q60 55 75 60 Q85 57 90 60 M15 70 Q30 65 45 70 Q60 65 75 70 Q85 67 90 70 M15 80 Q30 75 45 80 Q60 75 75 80 Q85 77 90 80', label: 'Raked Sand' },
    { path: 'M40 30 Q40 15 50 12 Q60 15 60 30 Q60 45 50 48 Q40 45 40 30 Z', path2: 'M35 55 Q35 45 42 43 L58 43 Q65 45 65 55 Q65 65 58 68 L42 68 Q35 65 35 55 Z', label: 'Zen Stones' },
    { path: 'M50 5 L50 95 M48 15 L35 25 M52 20 L65 30 M47 35 L30 45 M53 40 L70 50 M48 55 L32 65 M52 60 L68 70 M47 75 L38 82 M53 80 L62 87', label: 'Bambu' },
  ],

  'wedding-mediterranean-villa': [
    { path: 'M20 45 Q20 20 50 15 Q80 20 80 45 L80 85 L20 85 Z', path2: 'M30 55 L30 85 M45 55 L45 85 M55 55 L55 85 M70 55 L70 85 M25 55 L75 55', label: 'Arcade' },
    { path: 'M35 20 Q35 10 50 8 Q65 10 65 20 L68 70 Q68 82 50 85 Q32 82 32 70 Z', path2: 'M38 25 L62 25 M38 45 L62 45 M38 65 L62 65', label: 'Olive Jar' },
    { path: 'M50 10 Q55 15 58 22 Q65 18 62 28 Q68 32 60 36 Q62 42 55 40 Q55 48 50 44 Q45 48 45 40 Q38 42 40 36 Q32 32 38 28 Q35 18 42 22 Q45 15 50 10 Z', label: 'Sunflower' },
  ],

  'wedding-victorian-manor': [
    { path: 'M15 85 L15 40 L35 40 L35 20 L50 10 L65 20 L65 40 L85 40 L85 85 Z', path2: 'M42 85 L42 62 L58 62 L58 85 M25 50 L25 60 L32 60 L32 50 M68 50 L68 60 L75 60 L75 50', label: 'Victorian House' },
    { path: 'M50 10 Q58 10 60 20 Q68 18 64 26 Q70 30 62 34 Q64 42 56 40 Q55 48 48 42 Q42 48 42 40 Q34 42 36 34 Q28 30 36 26 Q32 18 40 20 Q42 10 50 10 Z', path2: 'M50 22 Q54 22 55 27 Q58 26 56 30 Q59 32 55 34 Q56 38 52 37 L50 38 L48 37 Q44 38 45 34 Q41 32 44 30 Q42 26 45 27 Q46 22 50 22 Z', label: 'Victorian Rose' },
    { path: 'M30 15 L70 15 L70 85 L30 85 Z M35 20 L65 20 L65 80 L35 80 Z', path2: 'M50 20 L50 80 M35 50 L65 50 M35 35 L65 35 M35 65 L65 65', label: 'Iron Gate' },
  ],

  'wedding-moroccan-riad': [
    { path: 'M50 10 L70 30 L70 60 L50 80 L30 60 L30 30 Z', path2: 'M50 20 L62 32 L62 56 L50 68 L38 56 L38 32 Z', label: 'Zellige Star' },
    { path: 'M20 50 Q20 20 50 10 Q80 20 80 50 Q80 80 50 90 Q20 80 20 50 Z', path2: 'M30 50 Q30 28 50 20 Q70 28 70 50 Q70 72 50 80 Q30 72 30 50 Z', label: 'Horseshoe Arch' },
    { path: 'M50 5 L55 18 L70 18 L58 28 L62 42 L50 33 L38 42 L42 28 L30 18 L45 18 Z M50 55 L55 68 L70 68 L58 78 L62 92 L50 83 L38 92 L42 78 L30 68 L45 68 Z', label: 'Geometric Pattern' },
  ],

  // ══════════════════ NEW BATCH 2: WARNA & MOOD ══════════════════

  'wedding-midnight-noir': [
    { path: 'M50 10 L55 30 L75 30 L60 42 L65 62 L50 50 L35 62 L40 42 L25 30 L45 30 Z', path2: 'M50 18 L53 28 L62 28 L55 35 L57 44 L50 38 L43 44 L45 35 L38 28 L47 28 Z', label: 'Gold Star' },
    { path: 'M50 15 Q65 15 70 35 Q75 55 60 65 Q50 70 40 65 Q25 55 30 35 Q35 15 50 15 Z', path2: 'M50 25 Q58 25 62 38 Q65 50 55 56 Q50 60 45 56 Q35 50 38 38 Q42 25 50 25 Z', label: 'Noir Diamond' },
    { path: 'M30 15 L70 15 L70 85 L30 85 Z M35 20 L65 20 L65 80 L35 80 Z M40 25 L60 25 L60 75 L40 75 Z', path2: 'M50 25 L50 75 M40 50 L60 50', label: 'Art Frame' },
  ],

  'wedding-rose-quartz': [
    { path: 'M50 15 Q60 15 65 30 Q70 45 55 55 Q50 58 45 55 Q30 45 35 30 Q40 15 50 15 Z', path2: 'M50 60 L50 90 M42 70 L35 65 M58 75 L65 70', label: 'Crystal' },
    { path: 'M50 10 Q55 15 58 22 Q65 18 62 28 Q68 32 60 36 Q62 42 55 40 Q55 48 50 44 Q45 48 45 40 Q38 42 40 36 Q32 32 38 28 Q35 18 42 22 Q45 15 50 10 Z', label: 'Rose Bloom' },
    { path: 'M30 30 Q35 20 45 25 Q50 15 55 25 Q65 20 70 30 Q75 40 65 50 L50 70 L35 50 Q25 40 30 30 Z', label: 'Heart Crystal' },
  ],

  'wedding-emerald-dream': [
    { path: 'M50 10 L65 25 L65 55 L50 70 L35 55 L35 25 Z', path2: 'M50 18 L58 28 L58 52 L50 62 L42 52 L42 28 Z', label: 'Emerald Gem' },
    { path: 'M50 5 Q55 10 60 18 Q65 15 62 24 Q70 26 64 32 Q68 38 60 38 Q60 45 54 40 Q50 46 46 40 Q40 45 40 38 Q32 38 36 32 Q30 26 38 24 Q35 15 40 18 Q45 10 50 5 Z', label: 'Emerald Crown' },
    { path: 'M20 50 L35 20 L50 50 L65 20 L80 50 L65 80 L50 50 L35 80 Z', label: 'Faceted Gem' },
  ],

  'wedding-copper-luxe': [
    { path: 'M50 15 Q65 15 70 30 Q75 45 65 52 Q70 60 60 62 Q62 70 52 68 Q50 72 48 68 Q38 70 40 62 Q30 60 35 52 Q25 45 30 30 Q35 15 50 15 Z', path2: 'M50 25 L50 45 M42 35 L58 35', label: 'Copper Gear' },
    { path: 'M30 20 L70 20 L75 25 L75 75 L70 80 L30 80 L25 75 L25 25 Z', path2: 'M35 30 L65 30 M35 45 L65 45 M35 60 L65 60 M50 20 L50 80', label: 'Metal Frame' },
    { path: 'M50 10 L60 20 L55 20 L55 40 L70 40 L70 35 L80 45 L70 55 L70 50 L55 50 L55 70 L60 70 L50 80 L40 70 L45 70 L45 50 L30 50 L30 55 L20 45 L30 35 L30 40 L45 40 L45 20 L40 20 Z', label: 'Pinwheel' },
  ],

  'wedding-lavender-mist': [
    { path: 'M50 10 Q55 15 52 22 Q58 20 55 28 Q60 28 55 34 Q58 38 52 36 Q52 42 48 38 Q42 42 44 36 Q38 38 40 34 Q36 28 42 28 Q38 20 45 22 Q42 15 50 10 Z', path2: 'M50 38 L50 85 M46 50 L38 45 M54 55 L62 50 M46 65 L40 60 M54 70 L60 65', label: 'Lavender Sprig' },
    { path: 'M25 40 Q30 30 40 35 Q45 20 55 30 Q65 22 70 35 Q80 30 78 45 Q85 52 75 58 Q78 68 65 65 Q60 75 50 68 Q40 75 35 65 Q22 68 25 58 Q15 52 22 45 Q20 35 25 40 Z', label: 'Cloud' },
    { path: 'M30 30 Q35 20 45 25 Q50 15 55 25 Q65 20 70 30 Q75 40 65 50 L50 70 L35 50 Q25 40 30 30 Z', path2: 'M38 35 Q42 28 50 32 Q58 28 62 35 Q66 42 58 48 L50 58 L42 48 Q34 42 38 35 Z', label: 'Heart Mist' },
  ],

  // ══════════════════ NEW BATCH 2: MUSIM & FENOMENA ALAM ══════════════════

  'wedding-spring-blossom': [
    { path: 'M50 15 Q55 20 52 28 Q58 25 55 32 Q60 32 55 38 Q58 42 52 40 Q55 45 50 42 Q45 45 48 40 Q42 42 45 38 Q40 32 45 32 Q42 25 48 28 Q45 20 50 15 Z', label: 'Cherry Blossom' },
    { path: 'M50 10 Q55 15 58 22 Q65 18 62 28 Q68 32 60 36 Q62 42 55 40 Q55 48 50 44 Q45 48 45 40 Q38 42 40 36 Q32 32 38 28 Q35 18 42 22 Q45 15 50 10 Z', path2: 'M50 44 L50 90', label: 'Tulip' },
    { path: 'M30 30 Q35 20 45 25 Q50 15 55 25 Q65 20 70 30 Q75 40 65 50 L50 70 L35 50 Q25 40 30 30 Z', label: 'Spring Heart' },
  ],

  'wedding-monsoon-rain': [
    { path: 'M50 10 L55 30 L50 30 L55 50 L50 50 L55 70 L45 55 L50 55 L45 35 L50 35 L45 15 Z', label: 'Lightning' },
    { path: 'M25 30 Q32 18 45 25 Q50 15 55 25 Q68 18 75 30 Q82 42 70 48 L50 48 L30 48 Q18 42 25 30 Z', path2: 'M35 48 L33 62 M45 48 L43 58 M55 48 L53 62 M65 48 L63 58', label: 'Rain Cloud' },
    { path: 'M15 70 Q30 50 50 60 Q70 50 85 70 Q70 75 50 68 Q30 75 15 70 Z M20 72 Q35 55 50 63 Q65 55 80 72', path2: 'M35 40 Q50 20 65 40', label: 'Rainbow' },
  ],

  'wedding-desert-mirage': [
    { path: 'M10 75 L25 45 L40 60 L55 35 L70 55 L85 40 L95 75 Z', label: 'Sand Dunes' },
    { path: 'M50 15 L52 25 L55 30 L52 40 Q55 50 52 60 L55 70 L52 75 L50 85 L48 75 L45 70 L48 60 Q45 50 48 40 L45 30 L48 25 Z', path2: 'M42 35 L35 30 M58 45 L65 40 M40 55 L33 52 M60 65 L67 62', label: 'Cactus' },
    { path: 'M50 20 Q65 20 68 35 Q70 50 58 55 L55 80 L45 80 L42 55 Q30 50 32 35 Q35 20 50 20 Z', path2: 'M48 8 L50 3 L52 8', label: 'Minaret' },
  ],

  'wedding-northern-lights': [
    { path: 'M5 70 Q20 40 35 55 Q50 30 65 50 Q80 35 95 65 L95 90 L5 90 Z', path2: 'M10 75 Q25 50 40 60 Q55 40 70 55 Q85 42 92 70', label: 'Aurora Wave' },
    { path: 'M50 5 L50 95 M48 15 L35 25 M52 20 L65 30 M47 35 L30 45 M53 40 L70 50 M48 55 L32 65 M52 60 L68 70', label: 'Pine Tree' },
    { path: 'M50 10 L50 90 M50 50 L80 25 M50 50 L20 25 M50 50 L80 75 M50 50 L20 75 M25 50 L75 50', path2: 'M50 20 L55 25 L50 30 L45 25 Z M50 70 L55 75 L50 80 L45 75 Z', label: 'Snowflake' },
  ],

  'wedding-tropical-storm': [
    { path: 'M50 10 L55 30 L50 30 L58 55 L42 45 L50 70 L38 50 L45 80 L30 60 L35 90 L25 70', path2: 'M55 15 L60 35 L55 35 L62 58', label: 'Lightning Bolt' },
    { path: 'M0 55 Q15 45 30 52 Q45 42 60 55 Q75 45 90 55 Q100 48 100 55 L100 90 L0 90 Z', label: 'Storm Wave' },
    { path: 'M50 15 Q60 20 65 35 Q68 50 55 58 Q50 55 45 58 Q32 50 35 35 Q40 20 50 15 Z M50 58 L50 90 M42 65 L35 60 M58 70 L65 65 M42 80 L38 75', label: 'Palm in Wind' },
  ],
  ],

  // ═══ TROPICAL PARADISE NICHE ═══
  'birthday-tropical-fiesta': [
    { path: 'M50 10 Q70 25 65 50 Q60 75 50 90 Q40 75 35 50 Q30 25 50 10 Z', path2: 'M50 30 Q58 40 55 50 Q52 60 50 70', label: 'Tropical Leaf' },
    { path: 'M50 15 L55 35 L75 35 L60 48 L65 68 L50 55 L35 68 L40 48 L25 35 L45 35 Z', label: 'Hibiscus Star' },
    { path: 'M50 5 Q55 15 50 25 Q45 15 50 5 M50 25 L50 95 M30 45 Q40 50 50 45 Q60 50 70 45 M25 65 Q37 72 50 65 Q63 72 75 65', label: 'Palm Tree' },
  ],
  'family-pantai-senja': [
    { path: 'M0 60 Q25 40 50 55 Q75 40 100 60 L100 100 L0 100 Z', path2: 'M0 70 Q25 55 50 65 Q75 55 100 70', label: 'Ocean Wave' },
    { path: 'M50 10 Q65 15 70 30 Q75 45 65 55 Q55 65 50 55 Q45 65 35 55 Q25 45 30 30 Q35 15 50 10 Z', label: 'Seashell' },
    { path: 'M50 5 L52 20 L60 10 L55 25 L70 20 L58 30 L75 30 L60 38 L50 50 L40 38 L25 30 L42 30 L30 20 L45 25 L40 10 L48 20 Z', label: 'Sunset Burst' },
  ],
  'bukber-kelapa-muda': [
    { path: 'M50 20 Q62 22 65 35 Q68 48 58 55 Q48 62 42 55 Q32 48 35 35 Q38 22 50 20 Z', path2: 'M50 55 L48 80 M52 55 L54 78', label: 'Coconut' },
    { path: 'M50 5 Q80 15 85 45 Q90 75 60 90 Q30 95 15 70 Q5 45 20 20 Q35 0 50 5 Z', label: 'Crescent Moon' },
    { path: 'M50 5 L50 95 M50 20 L80 10 M50 35 L75 25 M50 50 L85 40 M50 65 L70 55 M50 80 L75 72', label: 'Palm Frond' },
  ],
  'arisan-paradise-island': [
    { path: 'M30 80 Q35 50 50 40 Q65 50 70 80 Z', path2: 'M50 40 L50 15 M50 15 L35 25 M50 15 L65 25', label: 'Island' },
    { path: 'M10 50 Q25 30 40 45 Q50 25 60 45 Q75 30 90 50', label: 'Wave Pattern' },
    { path: 'M50 15 Q65 20 70 35 Q72 50 60 60 Q50 65 40 60 Q28 50 30 35 Q35 20 50 15 Z M45 35 L50 45 L55 35', label: 'Tropical Fish' },
  ],
  'acara-umum-hawaiian': [
    { path: 'M50 10 Q70 20 65 40 Q80 35 75 55 Q90 50 80 70 Q70 65 60 80 Q50 70 40 80 Q30 65 20 70 Q10 50 25 55 Q20 35 35 40 Q30 20 50 10 Z', label: 'Plumeria' },
    { path: 'M50 5 L50 95 M50 30 L25 15 M50 30 L75 15 M50 55 L20 42 M50 55 L80 42 M50 78 L30 68 M50 78 L70 68', label: 'Tiki Torch' },
    { path: 'M15 50 Q30 20 50 50 Q70 20 85 50 Q70 80 50 50 Q30 80 15 50 Z', label: 'Lei Flower' },
  ],

  // ═══ RETRO & VINTAGE NICHE ═══
  'khitanan-retro-pop': [
    { path: 'M50 5 L58 35 L90 35 L63 55 L73 85 L50 65 L27 85 L37 55 L10 35 L42 35 Z', label: 'Retro Star' },
    { path: 'M20 20 L80 20 L80 80 L20 80 Z M30 30 L70 30 L70 70 L30 70 Z M40 40 L60 40 L60 60 L40 60 Z', label: 'Nested Squares' },
    { path: 'M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10 Z M50 25 A25 25 0 1 1 50 75 A25 25 0 1 1 50 25 Z', label: 'Target Circle' },
  ],
  'aqiqah-vintage-rose': [
    { path: 'M50 20 Q60 15 65 25 Q70 35 60 42 Q65 50 55 55 Q50 60 45 55 Q35 50 40 42 Q30 35 35 25 Q40 15 50 20 Z', path2: 'M50 55 L48 80 Q50 85 52 80 L50 55', label: 'Vintage Rose' },
    { path: 'M50 10 Q55 20 50 30 Q45 20 50 10 M35 20 Q45 25 40 35 Q30 28 35 20 M65 20 Q60 28 60 35 Q55 25 65 20', label: 'Rose Buds' },
    { path: 'M20 50 Q35 30 50 50 Q65 30 80 50 L75 55 Q62 38 50 55 Q38 38 25 55 Z', label: 'Ribbon Bow' },
  ],
  'wisuda-classic-scholar': [
    { path: 'M30 30 L70 30 L70 80 L50 70 L30 80 Z', path2: 'M35 35 L65 35 L65 72 L50 64 L35 72 Z', label: 'Book' },
    { path: 'M25 45 L75 45 L75 50 L25 50 Z M30 40 L70 40 L72 45 L28 45 Z M40 35 L60 35 L62 40 L38 40 Z M48 25 L52 25 L55 35 L45 35 Z', label: 'Pillar' },
    { path: 'M50 15 L55 30 L70 30 L58 40 L62 55 L50 45 L38 55 L42 40 L30 30 L45 30 Z M45 55 L55 55 L53 85 L47 85 Z', label: 'Trophy' },
  ],
  'hajatan-nostalgia': [
    { path: 'M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z M50 20 L50 50 L70 50', label: 'Vintage Clock' },
    { path: 'M25 30 L75 30 L75 75 L25 75 Z M30 35 L70 35 L70 70 L30 70 Z M35 50 Q50 40 65 50 Q50 60 35 50 Z', label: 'Radio' },
    { path: 'M30 20 L70 20 Q75 20 75 25 L75 75 Q75 80 70 80 L30 80 Q25 80 25 75 L25 25 Q25 20 30 20 Z M35 30 L65 30 L65 60 L35 60 Z', label: 'TV Frame' },
  ],
  'syukuran-rumah-art-deco': [
    { path: 'M50 5 L90 30 L90 70 L50 95 L10 70 L10 30 Z M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z', label: 'Art Deco Hex' },
    { path: 'M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M80 20 L20 80', path2: 'M50 30 L50 70 M30 50 L70 50', label: 'Sunburst' },
    { path: 'M10 90 L10 50 L30 50 L30 70 L50 70 L50 30 L70 30 L70 60 L90 60 L90 10', label: 'Art Deco Steps' },
  ],

  // ═══ COSMIC & GALAXY NICHE ═══
  'birthday-stardust': [
    { path: 'M50 5 L55 38 L88 38 L60 58 L70 90 L50 68 L30 90 L40 58 L12 38 L45 38 Z', label: 'Big Star' },
    { path: 'M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20 Z M50 30 A20 20 0 1 1 50 70 A20 20 0 1 1 50 30 Z M50 40 A10 10 0 1 1 50 60 A10 10 0 1 1 50 40 Z', label: 'Planet Rings' },
    { path: 'M10 80 L15 60 L20 75 L25 55 L30 70 L40 40 L50 65 L55 45 L65 60 L70 30 L80 55 L85 35 L90 50', label: 'Stardust Trail' },
  ],
  'lamaran-moonlight': [
    { path: 'M60 10 Q90 15 90 50 Q90 85 60 90 Q35 80 30 50 Q35 20 60 10 Z', path2: 'M55 25 Q75 28 75 50 Q75 72 55 75', label: 'Crescent Moon' },
    { path: 'M50 10 L53 42 L85 42 L58 60 L68 92 L50 72 L32 92 L42 60 L15 42 L47 42 Z', label: 'Evening Star' },
    { path: 'M20 30 L25 28 L23 33 M40 15 L45 13 L43 18 M70 25 L75 23 L73 28 M80 50 L85 48 L83 53 M60 75 L65 73 L63 78 M30 70 L35 68 L33 73', label: 'Scattered Stars' },
  ],
  'wisuda-constellation': [
    { path: 'M20 20 L40 30 L50 15 L60 35 L80 25 M40 30 L45 55 L60 35 M45 55 L35 80 L55 70 L70 85', label: 'Constellation Map' },
    { path: 'M50 5 L50 95 M48 15 L52 15 M46 25 L54 25 M44 35 L56 35 M42 45 L58 45 M40 55 L60 55 M38 65 L62 65 M36 75 L64 75 M34 85 L66 85', label: 'Star Ladder' },
    { path: 'M50 10 L55 25 L70 25 L58 35 L62 50 L50 40 L38 50 L42 35 L30 25 L45 25 Z M50 55 L52 62 L58 62 L53 67 L55 73 L50 69 L45 73 L47 67 L42 62 L48 62 Z', label: 'Double Star' },
  ],
  'pengajian-nebula': [
    { path: 'M50 10 Q80 20 85 50 Q80 80 50 90 Q20 80 15 50 Q20 20 50 10 Z', path2: 'M50 25 Q68 32 70 50 Q68 68 50 75 Q32 68 30 50 Q32 32 50 25 Z', label: 'Nebula Cloud' },
    { path: 'M50 5 Q55 15 50 25 Q45 15 50 5 Z M30 15 Q35 25 30 35 Q25 25 30 15 Z M70 15 Q75 25 70 35 Q65 25 70 15 Z M15 40 Q20 50 15 60 Q10 50 15 40 Z M85 40 Q90 50 85 60 Q80 50 85 40 Z', label: 'Star Cluster' },
    { path: 'M50 10 L50 90 M25 30 L75 70 M75 30 L25 70 M10 50 L90 50', path2: 'M50 35 A15 15 0 1 1 50 65 A15 15 0 1 1 50 35 Z', label: 'Cosmic Cross' },
  ],
  'family-aurora-borealis': [
    { path: 'M0 60 Q15 30 30 50 Q45 20 55 45 Q70 15 80 40 Q90 25 100 55', path2: 'M0 70 Q20 40 40 55 Q55 30 65 50 Q80 25 100 60', label: 'Aurora Wave' },
    { path: 'M50 5 L55 20 L70 10 L60 25 L75 25 L62 35 L80 40 L60 45 L50 60 L40 45 L20 40 L38 35 L25 25 L40 25 L30 10 L45 20 Z', label: 'Northern Star' },
    { path: 'M20 85 L25 55 L30 70 L40 35 L50 60 L55 40 L65 55 L70 25 L80 50 L85 30', label: 'Mountain Aurora' },
  ],

  // ═══ BOTANICAL & GARDEN NICHE ═══
  'tahlilan-zaitun': [
    { path: 'M50 10 Q60 15 60 30 Q60 45 50 50 Q40 45 40 30 Q40 15 50 10 Z M50 50 L50 90 M45 60 L35 55 M55 65 L65 60 M45 75 L38 70', label: 'Olive Branch' },
    { path: 'M50 20 Q58 15 62 22 Q66 29 58 35 Q62 42 55 45 Q48 48 45 42 Q38 45 35 38 Q32 31 40 25 Q36 18 42 18 Q46 15 50 20 Z', label: 'Olive Wreath' },
    { path: 'M30 50 Q40 30 50 50 Q60 30 70 50 L65 55 Q58 38 50 55 Q42 38 35 55 Z', path2: 'M50 55 L50 85 M45 65 Q50 60 55 65', label: 'Dove' },
  ],
  'duka-cita-lily-putih': [
    { path: 'M50 15 Q65 20 65 40 Q65 55 50 60 Q35 55 35 40 Q35 20 50 15 Z M50 60 L50 90', path2: 'M42 35 Q50 28 58 35 Q50 42 42 35 Z', label: 'White Lily' },
    { path: 'M50 10 L50 90 M40 20 Q50 15 60 20 M35 35 Q50 28 65 35 M30 50 Q50 42 70 50 M35 65 Q50 58 65 65 M40 80 Q50 75 60 80', label: 'Memorial Cross' },
    { path: 'M50 20 Q55 10 60 20 Q55 15 55 25 Q55 35 50 40 Q45 35 45 25 Q45 15 50 20 Z M40 25 Q35 15 30 25 Q35 20 35 30 Q35 38 40 42 M60 25 Q65 15 70 25 Q65 20 65 30 Q65 38 60 42', label: 'Candle Flame' },
  ],
  'aqiqah-garden-party': [
    { path: 'M50 15 Q70 20 70 40 Q70 60 50 65 Q30 60 30 40 Q30 20 50 15 Z', path2: 'M40 30 Q50 22 60 30 Q60 40 50 45 Q40 40 40 30 Z', label: 'Sunflower' },
    { path: 'M50 10 Q55 20 50 30 Q45 20 50 10 Z M30 25 Q40 30 35 40 Q25 35 30 25 Z M70 25 Q65 35 75 40 Q80 30 70 25 Z M20 50 Q30 55 25 65 Q15 60 20 50 Z M80 50 Q75 60 85 65 Q90 55 80 50 Z', label: 'Butterfly' },
    { path: 'M50 90 L50 40 M50 40 Q35 25 25 35 M50 40 Q65 25 75 35 M50 55 Q38 45 30 50 M50 55 Q62 45 70 50 M50 70 Q40 62 35 65', label: 'Garden Vine' },
  ],
  'khitanan-bambu-hijau': [
    { path: 'M45 5 L45 95 M55 5 L55 95 M45 20 L55 20 M45 40 L55 40 M45 60 L55 60 M45 80 L55 80', path2: 'M55 15 L75 8 M55 35 L70 28 M55 55 L72 48 M45 45 L25 38 M45 65 L28 58', label: 'Bamboo Stalk' },
    { path: 'M50 10 Q60 15 62 28 Q64 42 55 48 Q65 55 60 68 Q55 82 50 90 Q45 82 40 68 Q35 55 45 48 Q36 42 38 28 Q40 15 50 10 Z', label: 'Bamboo Leaf' },
    { path: 'M20 20 Q35 15 50 20 Q65 15 80 20 M20 45 Q35 40 50 45 Q65 40 80 45 M20 70 Q35 65 50 70 Q65 65 80 70', label: 'Bamboo Fence' },
  ],
  'hajatan-lavender-field': [
    { path: 'M50 90 L50 40 M48 40 Q45 30 42 20 Q48 15 50 10 Q52 15 58 20 Q55 30 52 40 Z', path2: 'M46 35 Q43 28 42 22 M54 35 Q57 28 58 22', label: 'Lavender Stem' },
    { path: 'M20 80 L25 50 Q28 35 25 25 M35 80 L38 55 Q40 40 38 28 M50 80 L50 45 Q50 35 50 22 M65 80 L62 55 Q60 40 62 28 M80 80 L75 50 Q72 35 75 25', label: 'Lavender Field' },
    { path: 'M50 15 Q58 12 62 18 Q65 25 58 30 Q55 35 50 32 Q45 35 42 30 Q35 25 38 18 Q42 12 50 15 Z M42 30 Q38 38 35 50 Q32 62 38 70 M58 30 Q62 38 65 50 Q68 62 62 70', label: 'Butterfly on Lavender' },
  ],
};
