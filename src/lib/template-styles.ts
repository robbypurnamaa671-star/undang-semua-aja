/**
 * Cultural style configurations for each template.
 * Defines unique decorative elements, greetings, ornaments, and patterns
 * that reflect the cultural identity of each template design.
 */

export interface TemplateCulturalStyle {
  greeting: string;
  closingText: string;
  ornamentEmoji: string;
  cornerMotif: 'floral' | 'geometric' | 'wave' | 'tribal' | 'islamic' | 'royal' | 'none';
  dividerStyle: 'ornate' | 'simple' | 'dotted' | 'wave' | 'diamond' | 'arrow' | 'leaf';
  borderStyle: 'double' | 'solid' | 'dashed' | 'ornate' | 'none';
  patternOverlay: string | null;
  sectionRadius: string;
  fontAccent: 'serif' | 'sans' | 'script';
  culturalMotifs: string[];
  backgroundPattern: string | null;
  /** Cultural icons displayed as subtle background decorations */
  culturalIcons?: { emoji: string; label: string }[];
}

const defaultStyle: TemplateCulturalStyle = {
  greeting: 'Dengan memohon rahmat Tuhan Yang Maha Esa',
  closingText: 'Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir',
  ornamentEmoji: '✦',
  cornerMotif: 'none',
  dividerStyle: 'simple',
  borderStyle: 'none',
  patternOverlay: null,
  sectionRadius: '0.75rem',
  fontAccent: 'serif',
  culturalMotifs: [],
  backgroundPattern: null,
};

export const templateCulturalStyles: Record<string, TemplateCulturalStyle> = {
  // ══════════════════ WEDDING TEMPLATES ══════════════════

  'wedding-classic-gold': {
    ...defaultStyle,
    greeting: 'Dengan memohon rahmat Tuhan Yang Maha Esa',
    closingText: 'Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir',
    ornamentEmoji: '❧',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['⚜', '❦', '❧'],
    backgroundPattern: 'radial-gradient(circle at 20% 80%, rgba(201,169,98,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,169,98,0.05) 0%, transparent 50%)',
  },

  'wedding-modern-blush': {
    ...defaultStyle,
    greeting: 'Together with our families',
    closingText: 'We would be honored by your presence',
    ornamentEmoji: '◇',
    cornerMotif: 'geometric',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['◇', '▽', '△'],
    backgroundPattern: 'linear-gradient(135deg, rgba(212,165,165,0.03) 25%, transparent 25%, transparent 75%, rgba(212,165,165,0.03) 75%)',
  },

  'wedding-elegant-navy': {
    ...defaultStyle,
    greeting: 'With the blessing of the Almighty',
    closingText: 'Your gracious presence would be a great honor',
    ornamentEmoji: '⚜',
    cornerMotif: 'royal',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['⚜', '♔', '✧'],
    backgroundPattern: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(30,58,95,0.02) 35px, rgba(30,58,95,0.02) 70px)',
  },

  'wedding-rustic-sage': {
    ...defaultStyle,
    greeting: 'Dengan penuh syukur dan bahagia',
    closingText: 'Kehadiran Anda akan menjadi kebahagiaan tersendiri bagi kami',
    ornamentEmoji: '🌿',
    cornerMotif: 'floral',
    dividerStyle: 'leaf',
    borderStyle: 'none',
    fontAccent: 'serif',
    culturalMotifs: ['🌿', '🍃', '☘'],
    backgroundPattern: 'radial-gradient(ellipse at 10% 90%, rgba(122,158,126,0.06) 0%, transparent 50%)',
  },

  'wedding-minimalist-mono': {
    ...defaultStyle,
    greeting: 'We invite you to celebrate',
    closingText: 'Your presence is the greatest gift',
    ornamentEmoji: '—',
    cornerMotif: 'geometric',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['—', '|', '·'],
    backgroundPattern: null,
  },

  // ── Suku Templates ──

  'wedding-jawa-classic': {
    ...defaultStyle,
    greeting: 'Assalamu\'alaikum Wr. Wb.\nNgaturaken sedaya puji syukur dhumateng Gusti Allah SWT',
    closingText: 'Wonten pangajab kula, mugi Bapak/Ibu/Saudara kersa rawuh ing pawiwahan punika',
    ornamentEmoji: '꧁',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['꧁', '꧂', '❁'],
    backgroundPattern: 'repeating-conic-gradient(rgba(139,105,20,0.03) 0% 25%, transparent 0% 50%) 0 0 / 40px 40px',
    sectionRadius: '0.25rem',
    culturalIcons: [
      { emoji: '🏯', label: 'Candi Borobudur' },
      { emoji: '👘', label: 'Batik' },
      { emoji: '🎭', label: 'Wayang Kulit' },
    ],
  },

  'wedding-sunda-elegant': {
    ...defaultStyle,
    greeting: 'Assalamu\'alaikum Wr. Wb.\nKu berkahna Allah SWT, sim kuring ngahaturkeun',
    closingText: 'Hatur nuhun tina kasumpingan Bapa/Ibu/Saudara sadayana',
    ornamentEmoji: '❋',
    cornerMotif: 'floral',
    dividerStyle: 'leaf',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['❋', '✿', '❁'],
    backgroundPattern: 'radial-gradient(circle at 50% 0%, rgba(46,125,50,0.05) 0%, transparent 60%)',
    sectionRadius: '1rem',
    culturalIcons: [
      { emoji: '🎶', label: 'Angklung' },
      { emoji: '🏔️', label: 'Gunung Tangkuban Parahu' },
      { emoji: '👘', label: 'Batik Sunda' },
    ],
  },

  'wedding-madura-bold': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nSanambhi asokkor ka Gusti Allah SWT',
    closingText: 'Kasokan kaula bileh Bapak/Ibu/Saudara kersa rabuwe',
    ornamentEmoji: '✦',
    cornerMotif: 'geometric',
    dividerStyle: 'diamond',
    borderStyle: 'ornate',
    fontAccent: 'serif',
    culturalMotifs: ['✦', '◆', '✧'],
    backgroundPattern: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(183,28,28,0.03) 20px, rgba(183,28,28,0.03) 21px)',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '🐂', label: 'Karapan Sapi' },
      { emoji: '🛶', label: 'Perahu Madura' },
      { emoji: '👘', label: 'Batik Madura' },
    ],
  },

  'wedding-batak-megah': {
    ...defaultStyle,
    greeting: 'Dalam nama Tuhan Yang Maha Kuasa\nHoras! Dengan penuh sukacita',
    closingText: 'Mauliate godang di hamu sude na boi ro mangalehen pasu-pasu',
    ornamentEmoji: '⊞',
    cornerMotif: 'geometric',
    dividerStyle: 'diamond',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['⊞', '⊟', '◈'],
    backgroundPattern: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(139,0,0,0.02) 30px, rgba(139,0,0,0.02) 31px), repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(139,0,0,0.02) 30px, rgba(139,0,0,0.02) 31px)',
    sectionRadius: '0.25rem',
    culturalIcons: [
      { emoji: '🏠', label: 'Rumah Bolon' },
      { emoji: '🎶', label: 'Gondang Batak' },
      { emoji: '🧣', label: 'Ulos' },
    ],
  },

  'wedding-minang-indah': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Kahadiran Ibuk/Apak/Sudaro/i sangaik kami harokkan',
    ornamentEmoji: '▲',
    cornerMotif: 'geometric',
    dividerStyle: 'arrow',
    borderStyle: 'ornate',
    fontAccent: 'serif',
    culturalMotifs: ['▲', '△', '◆'],
    backgroundPattern: 'linear-gradient(60deg, rgba(198,40,40,0.03) 25%, transparent 25%, transparent 75%, rgba(198,40,40,0.03) 75%), linear-gradient(-60deg, rgba(198,40,40,0.03) 25%, transparent 25%, transparent 75%, rgba(198,40,40,0.03) 75%)',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '🏠', label: 'Rumah Gadang' },
      { emoji: '🗡️', label: 'Keris Minang' },
      { emoji: '🍽️', label: 'Rendang' },
    ],
  },

  'wedding-betawi-meriah': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Aye ame keluarga ngundang ente semua buat dateng ye!',
    ornamentEmoji: '⊛',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'ornate',
    fontAccent: 'serif',
    culturalMotifs: ['⊛', '❀', '✿'],
    backgroundPattern: 'radial-gradient(circle at 15% 15%, rgba(230,81,0,0.05) 0%, transparent 40%), radial-gradient(circle at 85% 85%, rgba(230,81,0,0.05) 0%, transparent 40%)',
    sectionRadius: '1rem',
    culturalIcons: [
      { emoji: '🎭', label: 'Ondel-ondel' },
      { emoji: '🎶', label: 'Gambang Kromong' },
      { emoji: '👕', label: 'Baju Sadariah' },
    ],
  },

  'wedding-bugis-megah': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Tarima kasi loppo ri lao-laongnge nenniya',
    ornamentEmoji: '◈',
    cornerMotif: 'royal',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['◈', '❖', '✧'],
    backgroundPattern: 'repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(136,14,79,0.02) 40px, rgba(136,14,79,0.02) 41px)',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '⛵', label: 'Perahu Pinisi' },
      { emoji: '🗡️', label: 'Badik' },
      { emoji: '📜', label: 'Lontara' },
    ],
  },

  'wedding-banten-klasik': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Mugi-mugi Allah SWT ngalebetkeun berkah ka urang sadaya',
    ornamentEmoji: '⬡',
    cornerMotif: 'geometric',
    dividerStyle: 'diamond',
    borderStyle: 'solid',
    fontAccent: 'serif',
    culturalMotifs: ['⬡', '⬢', '◇'],
    backgroundPattern: 'radial-gradient(circle at 50% 50%, rgba(93,64,55,0.04) 0%, transparent 70%)',
    sectionRadius: '0.25rem',
    culturalIcons: [
      { emoji: '🕌', label: 'Masjid Agung Banten' },
      { emoji: '🗡️', label: 'Golok' },
      { emoji: '👘', label: 'Batik Banten' },
    ],
  },

  'wedding-banjar-indah': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Terima kasih lawan kehadiran Pian sekalian',
    ornamentEmoji: '✦',
    cornerMotif: 'royal',
    dividerStyle: 'wave',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['✦', '❋', '✧'],
    backgroundPattern: 'linear-gradient(180deg, rgba(249,168,37,0.05) 0%, transparent 30%), linear-gradient(0deg, rgba(249,168,37,0.05) 0%, transparent 30%)',
    sectionRadius: '0.75rem',
    culturalIcons: [
      { emoji: '🏠', label: 'Rumah Bubungan Tinggi' },
      { emoji: '🚣', label: 'Jukung' },
      { emoji: '👘', label: 'Sasirangan' },
    ],
  },

  'wedding-bali-sakral': {
    ...defaultStyle,
    greeting: 'Om Swastiastu\nAtas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa',
    closingText: 'Om Shanti, Shanti, Shanti Om',
    ornamentEmoji: '☸',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'ornate',
    fontAccent: 'serif',
    culturalMotifs: ['☸', '❁', '✿'],
    backgroundPattern: 'radial-gradient(circle at 50% 0%, rgba(78,52,46,0.06) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(78,52,46,0.06) 0%, transparent 50%)',
    sectionRadius: '0.25rem',
    culturalIcons: [
      { emoji: '🛕', label: 'Pura' },
      { emoji: '💃', label: 'Tari Kecak' },
      { emoji: '👘', label: 'Kain Kamen' },
    ],
  },

  'wedding-sasak-anggun': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Tampaq side dateng jari penggembira hati kami',
    ornamentEmoji: '✧',
    cornerMotif: 'geometric',
    dividerStyle: 'diamond',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['✧', '◇', '❖'],
    backgroundPattern: 'repeating-linear-gradient(45deg, rgba(106,27,154,0.02) 0px, rgba(106,27,154,0.02) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(106,27,154,0.02) 0px, rgba(106,27,154,0.02) 1px, transparent 1px, transparent 20px)',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '🏡', label: 'Bale Tani' },
      { emoji: '🧣', label: 'Tenun Lombok' },
      { emoji: '🎶', label: 'Gendang Beleq' },
    ],
  },

  'wedding-aceh-mulia': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Ureueng nyang kamoe peumulia, lon teurimong gaseh that mandum na hadir',
    ornamentEmoji: '✦',
    cornerMotif: 'islamic',
    dividerStyle: 'diamond',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['✦', '✶', '✸'],
    backgroundPattern: 'repeating-conic-gradient(rgba(27,94,32,0.03) 0% 25%, transparent 0% 50%) 0 0 / 30px 30px',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '🕌', label: 'Masjid Raya Baiturrahman' },
      { emoji: '🗡️', label: 'Rencong' },
      { emoji: '💃', label: 'Tari Saman' },
    ],
  },

  'wedding-dayak-agung': {
    ...defaultStyle,
    greeting: 'Tabe Salamat\nDengan mengucap syukur kepada Jubata/Tuhan Yang Maha Esa',
    closingText: 'Terima kasih atas kehadiran Saudara/i dalam perayaan ini',
    ornamentEmoji: '⟐',
    cornerMotif: 'tribal',
    dividerStyle: 'arrow',
    borderStyle: 'ornate',
    fontAccent: 'serif',
    culturalMotifs: ['⟐', '⏣', '⬡'],
    backgroundPattern: 'repeating-linear-gradient(90deg, rgba(216,67,21,0.03) 0px, rgba(216,67,21,0.03) 2px, transparent 2px, transparent 15px)',
    sectionRadius: '0.25rem',
    culturalIcons: [
      { emoji: '🗿', label: 'Patung Totem' },
      { emoji: '🪶', label: 'Hiasan Bulu' },
      { emoji: '🏠', label: 'Rumah Panjang' },
    ],
  },

  'wedding-makassar-gagah': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Tarima kasi maega ri sininna tau battu mannyame',
    ornamentEmoji: '❖',
    cornerMotif: 'royal',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['❖', '◆', '✦'],
    backgroundPattern: 'radial-gradient(circle at 0% 50%, rgba(198,40,40,0.04) 0%, transparent 50%), radial-gradient(circle at 100% 50%, rgba(198,40,40,0.04) 0%, transparent 50%)',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '⛵', label: 'Perahu Phinisi' },
      { emoji: '🗡️', label: 'Badik' },
      { emoji: '🧢', label: 'Passapu' },
    ],
  },

  'wedding-melayu-pesona': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Sembah sujud dan setinggi-tinggi terima kasih atas kehadiran Tuan/Puan',
    ornamentEmoji: '♛',
    cornerMotif: 'royal',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['♛', '❦', '⚜'],
    backgroundPattern: 'linear-gradient(45deg, rgba(251,192,45,0.04) 25%, transparent 25%, transparent 75%, rgba(251,192,45,0.04) 75%), linear-gradient(-45deg, rgba(251,192,45,0.04) 25%, transparent 25%, transparent 75%, rgba(251,192,45,0.04) 75%)',
    sectionRadius: '0.75rem',
    culturalIcons: [
      { emoji: '👑', label: 'Tanjak' },
      { emoji: '🕌', label: 'Masjid Melayu' },
      { emoji: '🎶', label: 'Zapin' },
    ],
  },

  'wedding-toraja-sakral': {
    ...defaultStyle,
    greeting: 'Puang Matua umbai makarorroi\nDengan berkat dari Yang Maha Kuasa',
    closingText: 'Kurre sumanga\' na lan tu battu mangrara tondok',
    ornamentEmoji: '▽',
    cornerMotif: 'tribal',
    dividerStyle: 'arrow',
    borderStyle: 'ornate',
    fontAccent: 'serif',
    culturalMotifs: ['▽', '△', '◈'],
    backgroundPattern: 'repeating-linear-gradient(0deg, transparent, transparent 25px, rgba(183,28,28,0.03) 25px, rgba(183,28,28,0.03) 26px), repeating-linear-gradient(90deg, transparent, transparent 25px, rgba(33,33,33,0.03) 25px, rgba(33,33,33,0.03) 26px)',
    sectionRadius: '0.25rem',
    culturalIcons: [
      { emoji: '🏠', label: 'Tongkonan' },
      { emoji: '🐃', label: 'Kerbau' },
      { emoji: '🗿', label: 'Patung Tau-Tau' },
    ],
  },

  'wedding-ambon-cerah': {
    ...defaultStyle,
    greeting: 'Salam Sejahtera\nDengan mengucap syukur kepada Tuhan Yang Maha Esa',
    closingText: 'Katong samua berharap Bapa/Mama/Saudara datang par kasi berkat',
    ornamentEmoji: '🐚',
    cornerMotif: 'wave',
    dividerStyle: 'wave',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['〰', '≋', '∿'],
    backgroundPattern: 'radial-gradient(ellipse at 50% 100%, rgba(2,119,189,0.06) 0%, transparent 60%)',
    sectionRadius: '1rem',
    culturalIcons: [
      { emoji: '🎵', label: 'Tifa' },
      { emoji: '🎶', label: 'Musik Totobuang' },
      { emoji: '⚓', label: 'Budaya Bahari' },
    ],
  },

  'wedding-papua-mulia': {
    ...defaultStyle,
    greeting: 'Nabeluk! Wa... Wa... Wa...\nDengan berkat Tuhan Yang Maha Esa',
    closingText: 'Terima kasih. Kami menanti kehadiran Bapak/Ibu/Saudara/i',
    ornamentEmoji: '◈',
    cornerMotif: 'tribal',
    dividerStyle: 'arrow',
    borderStyle: 'ornate',
    fontAccent: 'serif',
    culturalMotifs: ['◈', '⬡', '⏣'],
    backgroundPattern: 'repeating-linear-gradient(60deg, rgba(109,76,65,0.03) 0px, rgba(109,76,65,0.03) 2px, transparent 2px, transparent 12px)',
    sectionRadius: '0.25rem',
    culturalIcons: [
      { emoji: '🪶', label: 'Koteka' },
      { emoji: '🎵', label: 'Tifa Papua' },
      { emoji: '🏞️', label: 'Pegunungan Papua' },
    ],
  },

  'wedding-tionghoa-harmoni': {
    ...defaultStyle,
    greeting: '囍 Shuāngxǐ 囍\nDengan penuh sukacita dan syukur',
    closingText: 'Xièxiè — Terima kasih atas kehadiran dan doa restu',
    ornamentEmoji: '囍',
    cornerMotif: 'geometric',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['囍', '福', '❀'],
    backgroundPattern: 'radial-gradient(circle at 10% 10%, rgba(211,47,47,0.05) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(211,47,47,0.05) 0%, transparent 40%)',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '🧧', label: 'Lampion Merah' },
      { emoji: '🐉', label: 'Barongsai' },
      { emoji: '🧨', label: 'Imlek' },
    ],
  },

  'wedding-lampung-agung': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nTabik pun, ngiring kilu ampun',
    closingText: 'Tabik pun, terima kasih atas kehadiran Bapak/Ibu/Saudara',
    ornamentEmoji: '⬢',
    cornerMotif: 'geometric',
    dividerStyle: 'diamond',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['⬢', '◆', '✧'],
    backgroundPattern: 'repeating-linear-gradient(120deg, transparent, transparent 35px, rgba(141,110,99,0.03) 35px, rgba(141,110,99,0.03) 36px)',
    sectionRadius: '0.5rem',
    culturalIcons: [
      { emoji: '👑', label: 'Siger' },
      { emoji: '👘', label: 'Kain Tapis' },
      { emoji: '🏠', label: 'Nuwo Sesat' },
    ],
  },

  // ══════════════════ KHITANAN TEMPLATES ══════════════════

  'khitanan-festive-blue': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Semoga Allah SWT memberikan keberkahan',
    ornamentEmoji: '⭐',
    cornerMotif: 'geometric',
    dividerStyle: 'dotted',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['⭐', '✦', '◇'],
    backgroundPattern: 'radial-gradient(circle at 80% 20%, rgba(33,150,243,0.06) 0%, transparent 50%)',
    sectionRadius: '1rem',
  },

  'khitanan-islamic-green': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Jazakumullahu khairan atas doa dan kehadiran',
    ornamentEmoji: '☪',
    cornerMotif: 'islamic',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['☪', '✦', '✶'],
    backgroundPattern: 'repeating-conic-gradient(rgba(46,125,50,0.03) 0% 25%, transparent 0% 50%) 0 0 / 35px 35px',
    sectionRadius: '0.5rem',
  },

  'khitanan-golden-festive': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nDengan mengharap ridho Allah SWT',
    closingText: 'Terima kasih atas doa dan kehadirannya',
    ornamentEmoji: '✨',
    cornerMotif: 'royal',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['✨', '⚜', '✦'],
    backgroundPattern: 'linear-gradient(180deg, rgba(212,160,23,0.05) 0%, transparent 40%)',
    sectionRadius: '0.75rem',
  },

  'khitanan-playful-teal': {
    ...defaultStyle,
    greeting: 'Assalamu\'alaikum Wr. Wb.\nDengan rasa syukur dan bahagia',
    closingText: 'Kehadiran Anda sangat berarti bagi kami',
    ornamentEmoji: '🎊',
    cornerMotif: 'geometric',
    dividerStyle: 'dotted',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['◇', '△', '○'],
    backgroundPattern: 'radial-gradient(circle at 20% 80%, rgba(0,137,123,0.05) 0%, transparent 50%)',
    sectionRadius: '1rem',
  },

  // ══════════════════ HAJATAN TEMPLATES ══════════════════

  'hajatan-warm-earth': {
    ...defaultStyle,
    greeting: 'Alhamdulillah\nDengan penuh rasa syukur',
    closingText: 'Kehadiran Bapak/Ibu menjadi kebahagiaan tersendiri',
    ornamentEmoji: '🌾',
    cornerMotif: 'floral',
    dividerStyle: 'leaf',
    borderStyle: 'none',
    fontAccent: 'serif',
    culturalMotifs: ['🌾', '🍂', '🌻'],
    backgroundPattern: 'radial-gradient(ellipse at 50% 100%, rgba(141,110,99,0.05) 0%, transparent 60%)',
    sectionRadius: '0.75rem',
  },

  'hajatan-simple-sage': {
    ...defaultStyle,
    greeting: 'Dengan penuh rasa syukur',
    closingText: 'Terima kasih atas kehadiran dan doa restu',
    ornamentEmoji: '✿',
    cornerMotif: 'floral',
    dividerStyle: 'simple',
    borderStyle: 'none',
    fontAccent: 'sans',
    culturalMotifs: ['✿', '❀', '·'],
    backgroundPattern: null,
    sectionRadius: '1rem',
  },

  'hajatan-classic-maroon': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAlhamdulillahi Rabbil \'Alamin',
    closingText: 'Jazakumullahu khairan katsiran atas kehadiran Bapak/Ibu',
    ornamentEmoji: '❦',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['❦', '❧', '✦'],
    backgroundPattern: 'radial-gradient(circle at 50% 0%, rgba(123,31,58,0.04) 0%, transparent 50%)',
    sectionRadius: '0.5rem',
  },

  'hajatan-modern-teal': {
    ...defaultStyle,
    greeting: 'Dengan rasa syukur dan bahagia',
    closingText: 'Terima kasih atas kehadiran dan doa terbaik Anda',
    ornamentEmoji: '◆',
    cornerMotif: 'geometric',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['◆', '◇', '·'],
    backgroundPattern: 'linear-gradient(135deg, rgba(0,121,107,0.03) 0%, transparent 50%)',
    sectionRadius: '1rem',
  },

  // ══════════════════ BIRTHDAY TEMPLATES ══════════════════

  'birthday-colorful-party': {
    ...defaultStyle,
    greeting: '🎉 You\'re Invited! 🎉',
    closingText: 'Can\'t wait to celebrate with you!',
    ornamentEmoji: '🎈',
    cornerMotif: 'geometric',
    dividerStyle: 'dotted',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['🎈', '🎁', '🎊'],
    backgroundPattern: 'radial-gradient(circle at 10% 20%, rgba(156,39,176,0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(156,39,176,0.05) 0%, transparent 40%)',
    sectionRadius: '1.5rem',
  },

  'birthday-elegant-rose': {
    ...defaultStyle,
    greeting: 'Dengan penuh sukacita',
    closingText: 'Kehadiran Anda menjadi hadiah terindah',
    ornamentEmoji: '🌹',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['🌹', '❀', '✿'],
    backgroundPattern: 'radial-gradient(circle at 80% 20%, rgba(194,24,91,0.04) 0%, transparent 50%)',
    sectionRadius: '0.75rem',
  },

  'birthday-tropical-fun': {
    ...defaultStyle,
    greeting: '🌴 Let\'s Party! 🌴',
    closingText: 'Ayo rayakan bersama di bawah langit tropis!',
    ornamentEmoji: '🌺',
    cornerMotif: 'wave',
    dividerStyle: 'wave',
    borderStyle: 'none',
    fontAccent: 'sans',
    culturalMotifs: ['🌺', '🌴', '🍹'],
    backgroundPattern: 'linear-gradient(180deg, rgba(255,111,0,0.04) 0%, transparent 30%), linear-gradient(0deg, rgba(255,111,0,0.04) 0%, transparent 30%)',
    sectionRadius: '1.5rem',
  },

  'birthday-pastel-dream': {
    ...defaultStyle,
    greeting: '✨ Selamat Datang di Pesta Impian ✨',
    closingText: 'Kehadiran Anda membuat hari ini semakin spesial',
    ornamentEmoji: '🦋',
    cornerMotif: 'floral',
    dividerStyle: 'dotted',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['🦋', '✨', '💜'],
    backgroundPattern: 'radial-gradient(circle at 30% 70%, rgba(171,71,188,0.04) 0%, transparent 50%)',
    sectionRadius: '1.5rem',
  },

  // ══════════════════ FAMILY TEMPLATES ══════════════════

  'family-warm-orange': {
    ...defaultStyle,
    greeting: 'Dengan penuh kebahagiaan',
    closingText: 'Kebersamaan kita adalah harta yang paling berharga',
    ornamentEmoji: '🏡',
    cornerMotif: 'geometric',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['🏡', '❤', '🌟'],
    backgroundPattern: 'radial-gradient(circle at 50% 50%, rgba(230,81,0,0.04) 0%, transparent 60%)',
    sectionRadius: '1rem',
  },

  'family-classic-brown': {
    ...defaultStyle,
    greeting: 'Dengan penuh rasa syukur dan cinta',
    closingText: 'Keluarga adalah tempat cinta bertumbuh',
    ornamentEmoji: '🌳',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['🌳', '🍂', '❦'],
    backgroundPattern: 'radial-gradient(ellipse at 50% 0%, rgba(121,85,72,0.05) 0%, transparent 50%)',
    sectionRadius: '0.5rem',
  },

  'family-garden-green': {
    ...defaultStyle,
    greeting: 'Alhamdulillah, dengan rasa syukur',
    closingText: 'Berkumpul bersama di taman kebahagiaan',
    ornamentEmoji: '🌻',
    cornerMotif: 'floral',
    dividerStyle: 'leaf',
    borderStyle: 'none',
    fontAccent: 'serif',
    culturalMotifs: ['🌻', '🌿', '🍃'],
    backgroundPattern: 'radial-gradient(ellipse at 20% 80%, rgba(56,142,60,0.05) 0%, transparent 50%)',
    sectionRadius: '0.75rem',
  },

  'family-sunset-gold': {
    ...defaultStyle,
    greeting: 'Dengan kehangatan dan cinta keluarga',
    closingText: 'Bersama kita merajut kenangan indah',
    ornamentEmoji: '🌅',
    cornerMotif: 'royal',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['🌅', '✦', '⚜'],
    backgroundPattern: 'linear-gradient(180deg, rgba(245,124,0,0.05) 0%, transparent 40%)',
    sectionRadius: '0.75rem',
  },

  // ══════════════════ AQIQAH TEMPLATES ══════════════════

  'aqiqah-soft-pink': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Semoga Allah SWT memberikan keberkahan pada putra/putri kami',
    ornamentEmoji: '👶',
    cornerMotif: 'floral',
    dividerStyle: 'dotted',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['👶', '🌸', '✿'],
    backgroundPattern: 'radial-gradient(circle at 80% 20%, rgba(233,30,99,0.04) 0%, transparent 50%)',
    sectionRadius: '1rem',
  },

  'aqiqah-islamic-teal': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nDengan mengharap ridho Allah SWT',
    closingText: 'Jazakumullahu khairan atas doa dan kehadirannya',
    ornamentEmoji: '☪',
    cornerMotif: 'islamic',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['☪', '✦', '❁'],
    backgroundPattern: 'repeating-conic-gradient(rgba(0,105,92,0.03) 0% 25%, transparent 0% 50%) 0 0 / 35px 35px',
    sectionRadius: '0.5rem',
  },

  // ══════════════════ TAHLILAN TEMPLATES ══════════════════

  'tahlilan-serene-green': {
    ...defaultStyle,
    greeting: 'Innaa lillaahi wa innaa ilaihi raaji\'uun\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Semoga amal ibadah almarhum/ah diterima di sisi Allah SWT',
    ornamentEmoji: '☪',
    cornerMotif: 'islamic',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'serif',
    culturalMotifs: ['☪', '✦', '·'],
    backgroundPattern: 'radial-gradient(circle at 50% 50%, rgba(46,125,50,0.04) 0%, transparent 60%)',
    sectionRadius: '0.5rem',
  },

  'tahlilan-calm-grey': {
    ...defaultStyle,
    greeting: 'Innaa lillaahi wa innaa ilaihi raaji\'uun',
    closingText: 'Semoga Allah SWT mengampuni dan merahmati almarhum/ah',
    ornamentEmoji: '·',
    cornerMotif: 'none',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['·', '—', '·'],
    backgroundPattern: null,
    sectionRadius: '0.75rem',
  },

  // ══════════════════ PENGAJIAN TEMPLATES ══════════════════

  'pengajian-green-gold': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
    closingText: 'Jazakumullahu khairan katsiran',
    ornamentEmoji: '☪',
    cornerMotif: 'islamic',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['☪', '✶', '✦'],
    backgroundPattern: 'repeating-conic-gradient(rgba(27,94,32,0.03) 0% 25%, transparent 0% 50%) 0 0 / 30px 30px',
    sectionRadius: '0.5rem',
  },

  'pengajian-royal-blue': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Kehadiran Bapak/Ibu sangat kami harapkan',
    ornamentEmoji: '🕌',
    cornerMotif: 'islamic',
    dividerStyle: 'diamond',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['🕌', '☪', '✦'],
    backgroundPattern: 'radial-gradient(circle at 50% 0%, rgba(21,101,192,0.05) 0%, transparent 50%)',
    sectionRadius: '0.5rem',
  },

  // ══════════════════ WISUDA TEMPLATES ══════════════════

  'wisuda-navy-gold': {
    ...defaultStyle,
    greeting: 'Dengan penuh kebahagiaan dan rasa syukur',
    closingText: 'Terima kasih atas doa dan dukungan yang telah diberikan',
    ornamentEmoji: '🎓',
    cornerMotif: 'royal',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['🎓', '⚜', '✦'],
    backgroundPattern: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(26,35,126,0.02) 40px, rgba(26,35,126,0.02) 41px)',
    sectionRadius: '0.5rem',
  },

  'wisuda-maroon-classic': {
    ...defaultStyle,
    greeting: 'Dengan rasa syukur kepada Tuhan Yang Maha Esa',
    closingText: 'Dukungan dan doa Anda sangat berarti bagi kami',
    ornamentEmoji: '📜',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['📜', '❦', '✦'],
    backgroundPattern: 'radial-gradient(circle at 50% 0%, rgba(123,31,58,0.04) 0%, transparent 50%)',
    sectionRadius: '0.5rem',
  },

  // ══════════════════ LAMARAN TEMPLATES ══════════════════

  'lamaran-rose-gold': {
    ...defaultStyle,
    greeting: 'Dengan memohon rahmat Tuhan Yang Maha Esa',
    closingText: 'Merupakan kehormatan bagi kami apabila Bapak/Ibu berkenan hadir memberikan doa restu',
    ornamentEmoji: '💍',
    cornerMotif: 'floral',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['💍', '❦', '✿'],
    backgroundPattern: 'radial-gradient(circle at 20% 80%, rgba(183,110,121,0.05) 0%, transparent 50%)',
    sectionRadius: '0.75rem',
  },

  'lamaran-sage-romantic': {
    ...defaultStyle,
    greeting: 'Dengan penuh sukacita dan bahagia',
    closingText: 'Kehadiran Anda akan melengkapi kebahagiaan kami',
    ornamentEmoji: '🌿',
    cornerMotif: 'floral',
    dividerStyle: 'leaf',
    borderStyle: 'none',
    fontAccent: 'serif',
    culturalMotifs: ['🌿', '🍃', '💍'],
    backgroundPattern: 'radial-gradient(ellipse at 10% 90%, rgba(122,158,126,0.06) 0%, transparent 50%)',
    sectionRadius: '0.75rem',
  },

  // ══════════════════ SYUKURAN RUMAH TEMPLATES ══════════════════

  'syukuran-rumah-warm': {
    ...defaultStyle,
    greeting: 'Alhamdulillah\nDengan penuh rasa syukur',
    closingText: 'Kehadiran Bapak/Ibu menjadi berkah tersendiri bagi kami',
    ornamentEmoji: '🏠',
    cornerMotif: 'geometric',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['🏠', '✦', '🌟'],
    backgroundPattern: 'radial-gradient(circle at 50% 50%, rgba(191,54,12,0.04) 0%, transparent 60%)',
    sectionRadius: '1rem',
  },

  'syukuran-rumah-green': {
    ...defaultStyle,
    greeting: 'Bismillahirrahmanirrahim\nAlhamdulillahi Rabbil \'Alamin',
    closingText: 'Semoga rumah/usaha ini menjadi berkah bagi kami dan sekitar',
    ornamentEmoji: '🌿',
    cornerMotif: 'floral',
    dividerStyle: 'leaf',
    borderStyle: 'none',
    fontAccent: 'serif',
    culturalMotifs: ['🌿', '🏡', '✿'],
    backgroundPattern: 'radial-gradient(ellipse at 50% 100%, rgba(56,142,60,0.05) 0%, transparent 50%)',
    sectionRadius: '0.75rem',
  },

  // ══════════════════ DUKA CITA TEMPLATES ══════════════════

  'duka-cita-sombre': {
    ...defaultStyle,
    greeting: 'Innaa lillaahi wa innaa ilaihi raaji\'uun',
    closingText: 'Turut berduka cita yang sedalam-dalamnya',
    ornamentEmoji: '🕊',
    cornerMotif: 'none',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'serif',
    culturalMotifs: ['🕊', '·', '—'],
    backgroundPattern: null,
    sectionRadius: '0.5rem',
  },

  'duka-cita-white': {
    ...defaultStyle,
    greeting: 'Turut Berduka Cita',
    closingText: 'Semoga almarhum/ah diberikan tempat terbaik di sisi-Nya',
    ornamentEmoji: '🕊',
    cornerMotif: 'none',
    dividerStyle: 'simple',
    borderStyle: 'none',
    fontAccent: 'sans',
    culturalMotifs: ['🕊', '·', '·'],
    backgroundPattern: null,
    sectionRadius: '0.75rem',
  },

  // ══════════════════ BUKBER TEMPLATES ══════════════════

  'bukber-ramadan-gold': {
    ...defaultStyle,
    greeting: 'Marhaban Yaa Ramadhan\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Semoga ibadah puasa kita diterima. Aamiin.',
    ornamentEmoji: '🌙',
    cornerMotif: 'islamic',
    dividerStyle: 'ornate',
    borderStyle: 'double',
    fontAccent: 'serif',
    culturalMotifs: ['🌙', '☪', '✦'],
    backgroundPattern: 'linear-gradient(180deg, rgba(249,168,37,0.05) 0%, transparent 30%), linear-gradient(0deg, rgba(46,125,50,0.03) 0%, transparent 30%)',
    sectionRadius: '0.75rem',
  },

  'bukber-crescent-blue': {
    ...defaultStyle,
    greeting: 'Ramadhan Mubarak\nAssalamu\'alaikum Wr. Wb.',
    closingText: 'Mari berbuka bersama dan mempererat tali silaturahmi',
    ornamentEmoji: '🌙',
    cornerMotif: 'islamic',
    dividerStyle: 'diamond',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['🌙', '⭐', '✦'],
    backgroundPattern: 'radial-gradient(circle at 80% 10%, rgba(21,101,192,0.05) 0%, transparent 50%)',
    sectionRadius: '1rem',
  },

  // ══════════════════ ARISAN TEMPLATES ══════════════════

  'arisan-fun-coral': {
    ...defaultStyle,
    greeting: 'Hai! 👋\nAyo kumpul lagi',
    closingText: 'Ditunggu kehadirannya ya!',
    ornamentEmoji: '💰',
    cornerMotif: 'geometric',
    dividerStyle: 'dotted',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['💰', '🎉', '✦'],
    backgroundPattern: 'radial-gradient(circle at 80% 80%, rgba(255,87,34,0.04) 0%, transparent 50%)',
    sectionRadius: '1.5rem',
  },

  'arisan-soft-purple': {
    ...defaultStyle,
    greeting: 'Halo semuanya! 💜',
    closingText: 'Sampai jumpa di arisan berikutnya!',
    ornamentEmoji: '✨',
    cornerMotif: 'none',
    dividerStyle: 'dotted',
    borderStyle: 'none',
    fontAccent: 'sans',
    culturalMotifs: ['✨', '💜', '·'],
    backgroundPattern: 'radial-gradient(circle at 20% 80%, rgba(123,31,162,0.04) 0%, transparent 50%)',
    sectionRadius: '1.5rem',
  },

  // ══════════════════ ACARA UMUM TEMPLATES ══════════════════

  'acara-umum-professional': {
    ...defaultStyle,
    greeting: 'Dengan hormat',
    closingText: 'Atas perhatian dan kehadirannya, kami ucapkan terima kasih',
    ornamentEmoji: '📋',
    cornerMotif: 'geometric',
    dividerStyle: 'simple',
    borderStyle: 'solid',
    fontAccent: 'sans',
    culturalMotifs: ['📋', '◇', '·'],
    backgroundPattern: 'linear-gradient(135deg, rgba(21,101,192,0.03) 0%, transparent 50%)',
    sectionRadius: '0.75rem',
  },

  'acara-umum-casual': {
    ...defaultStyle,
    greeting: 'Halo! 👋',
    closingText: 'Ditunggu kehadirannya ya!',
    ornamentEmoji: '🎯',
    cornerMotif: 'none',
    dividerStyle: 'dotted',
    borderStyle: 'none',
    fontAccent: 'sans',
    culturalMotifs: ['🎯', '·', '·'],
    backgroundPattern: null,
    sectionRadius: '1rem',
  },
};

export function getTemplateCulturalStyle(templateId: string): TemplateCulturalStyle {
  return templateCulturalStyles[templateId] || defaultStyle;
}
