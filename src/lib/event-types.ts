// Event types and their configurations
export type EventType = 
  | 'wedding' 
  | 'khitanan' 
  | 'hajatan' 
  | 'birthday' 
  | 'family'
  | 'aqiqah'
  | 'tahlilan'
  | 'pengajian'
  | 'wisuda'
  | 'lamaran'
  | 'syukuran_rumah'
  | 'duka_cita'
  | 'bukber'
  | 'arisan'
  | 'acara_umum';

export interface EventFeatureFlags {
  hasRSVP: boolean;
  hasGuestBook: boolean;
  hasDigitalEnvelope: boolean;
  hasGallery: boolean;
  hasMusic: boolean;
  hasCountdown: boolean;
  hasEventSessions: boolean;
  hasCalendar: boolean;
}

export interface EventTypeConfig {
  id: EventType;
  name: string;
  nameIndonesian: string;
  description: string;
  icon: string;
  color: string;
  lightColor: string;
  defaultLabels: {
    title: string;
    names: string;
    dateLabel: string;
    locationLabel: string;
  };
  features: EventFeatureFlags;
}

const allFeatures: EventFeatureFlags = {
  hasRSVP: true,
  hasGuestBook: true,
  hasDigitalEnvelope: true,
  hasGallery: true,
  hasMusic: true,
  hasCountdown: true,
  hasEventSessions: true,
  hasCalendar: true,
};

const standardFeatures: EventFeatureFlags = {
  hasRSVP: true,
  hasGuestBook: true,
  hasDigitalEnvelope: false,
  hasGallery: true,
  hasMusic: true,
  hasCountdown: true,
  hasEventSessions: false,
  hasCalendar: true,
};

const simpleFeatures: EventFeatureFlags = {
  hasRSVP: true,
  hasGuestBook: false,
  hasDigitalEnvelope: false,
  hasGallery: true,
  hasMusic: true,
  hasCountdown: true,
  hasEventSessions: false,
  hasCalendar: true,
};

export const eventTypes: EventTypeConfig[] = [
  {
    id: 'wedding',
    name: 'Wedding',
    nameIndonesian: 'Pernikahan',
    description: 'Undangan pernikahan yang elegan dan romantis',
    icon: '💒',
    color: 'wedding',
    lightColor: 'wedding-light',
    defaultLabels: {
      title: 'Undangan Pernikahan',
      names: 'Mempelai',
      dateLabel: 'Hari Bahagia',
      locationLabel: 'Lokasi Acara',
    },
    features: allFeatures,
  },
  {
    id: 'lamaran',
    name: 'Engagement',
    nameIndonesian: 'Lamaran / Tunangan',
    description: 'Undangan lamaran dan pertunangan yang berkesan',
    icon: '💍',
    color: 'wedding',
    lightColor: 'wedding-light',
    defaultLabels: {
      title: 'Undangan Lamaran',
      names: 'Calon Mempelai',
      dateLabel: 'Hari Istimewa',
      locationLabel: 'Lokasi Acara',
    },
    features: { ...allFeatures, hasEventSessions: false },
  },
  {
    id: 'khitanan',
    name: 'Khitanan',
    nameIndonesian: 'Khitanan / Sunatan',
    description: 'Undangan khitanan yang berkesan',
    icon: '🎉',
    color: 'khitanan',
    lightColor: 'khitanan-light',
    defaultLabels: {
      title: 'Undangan Khitanan',
      names: 'Putra Kami',
      dateLabel: 'Hari Pelaksanaan',
      locationLabel: 'Lokasi Acara',
    },
    features: standardFeatures,
  },
  {
    id: 'aqiqah',
    name: 'Aqiqah',
    nameIndonesian: 'Aqiqah',
    description: 'Undangan aqiqah untuk menyambut buah hati',
    icon: '👶',
    color: 'khitanan',
    lightColor: 'khitanan-light',
    defaultLabels: {
      title: 'Undangan Aqiqah',
      names: 'Putra/Putri Kami',
      dateLabel: 'Hari Pelaksanaan',
      locationLabel: 'Lokasi Acara',
    },
    features: standardFeatures,
  },
  {
    id: 'hajatan',
    name: 'Hajatan',
    nameIndonesian: 'Hajatan / Syukuran',
    description: 'Undangan syukuran dan hajatan keluarga',
    icon: '🙏',
    color: 'hajatan',
    lightColor: 'hajatan-light',
    defaultLabels: {
      title: 'Undangan Syukuran',
      names: 'Keluarga',
      dateLabel: 'Waktu Acara',
      locationLabel: 'Lokasi Acara',
    },
    features: standardFeatures,
  },
  {
    id: 'tahlilan',
    name: 'Tahlilan',
    nameIndonesian: 'Tahlilan / Yasinan',
    description: 'Undangan tahlilan, yasinan, dan doa bersama',
    icon: '📿',
    color: 'hajatan',
    lightColor: 'hajatan-light',
    defaultLabels: {
      title: 'Undangan Tahlilan',
      names: 'Almarhum/ah',
      dateLabel: 'Waktu Pelaksanaan',
      locationLabel: 'Lokasi Acara',
    },
    features: {
      hasRSVP: true,
      hasGuestBook: true,
      hasDigitalEnvelope: false,
      hasGallery: false,
      hasMusic: false,
      hasCountdown: true,
      hasEventSessions: false,
      hasCalendar: true,
    },
  },
  {
    id: 'pengajian',
    name: 'Pengajian',
    nameIndonesian: 'Pengajian / Maulid',
    description: 'Undangan pengajian, maulid, dan isra mi\'raj',
    icon: '🕌',
    color: 'hajatan',
    lightColor: 'hajatan-light',
    defaultLabels: {
      title: 'Undangan Pengajian',
      names: 'Penyelenggara',
      dateLabel: 'Waktu Pelaksanaan',
      locationLabel: 'Lokasi Acara',
    },
    features: {
      hasRSVP: true,
      hasGuestBook: false,
      hasDigitalEnvelope: false,
      hasGallery: false,
      hasMusic: false,
      hasCountdown: true,
      hasEventSessions: true,
      hasCalendar: true,
    },
  },
  {
    id: 'wisuda',
    name: 'Graduation',
    nameIndonesian: 'Wisuda',
    description: 'Undangan wisuda sekolah, kampus, atau tahfidz',
    icon: '🎓',
    color: 'birthday',
    lightColor: 'birthday-light',
    defaultLabels: {
      title: 'Undangan Wisuda',
      names: 'Wisudawan/ti',
      dateLabel: 'Hari Wisuda',
      locationLabel: 'Lokasi Wisuda',
    },
    features: { ...standardFeatures, hasGallery: true },
  },
  {
    id: 'birthday',
    name: 'Birthday',
    nameIndonesian: 'Ulang Tahun',
    description: 'Undangan ulang tahun yang meriah',
    icon: '🎂',
    color: 'birthday',
    lightColor: 'birthday-light',
    defaultLabels: {
      title: 'Undangan Ulang Tahun',
      names: 'Yang Berulang Tahun',
      dateLabel: 'Hari Spesial',
      locationLabel: 'Lokasi Perayaan',
    },
    features: simpleFeatures,
  },
  {
    id: 'family',
    name: 'Family Gathering',
    nameIndonesian: 'Kumpul Keluarga',
    description: 'Undangan pertemuan keluarga besar',
    icon: '👨‍👩‍👧‍👦',
    color: 'family',
    lightColor: 'family-light',
    defaultLabels: {
      title: 'Undangan Kumpul Keluarga',
      names: 'Keluarga Besar',
      dateLabel: 'Waktu Berkumpul',
      locationLabel: 'Tempat Berkumpul',
    },
    features: simpleFeatures,
  },
  {
    id: 'syukuran_rumah',
    name: 'Housewarming',
    nameIndonesian: 'Syukuran Rumah / Usaha',
    description: 'Undangan syukuran rumah baru atau usaha baru',
    icon: '🏠',
    color: 'family',
    lightColor: 'family-light',
    defaultLabels: {
      title: 'Undangan Syukuran',
      names: 'Tuan Rumah',
      dateLabel: 'Waktu Acara',
      locationLabel: 'Lokasi Acara',
    },
    features: simpleFeatures,
  },
  {
    id: 'duka_cita',
    name: 'Condolence',
    nameIndonesian: 'Duka Cita',
    description: 'Pemberitahuan duka cita dan pemakaman',
    icon: '🕊️',
    color: 'hajatan',
    lightColor: 'hajatan-light',
    defaultLabels: {
      title: 'Berita Duka Cita',
      names: 'Almarhum/ah',
      dateLabel: 'Waktu Pemakaman',
      locationLabel: 'Lokasi Pemakaman',
    },
    features: {
      hasRSVP: false,
      hasGuestBook: true,
      hasDigitalEnvelope: false,
      hasGallery: false,
      hasMusic: false,
      hasCountdown: false,
      hasEventSessions: false,
      hasCalendar: false,
    },
  },
  {
    id: 'bukber',
    name: 'Iftar',
    nameIndonesian: 'Buka Puasa Bersama',
    description: 'Undangan buka puasa bersama di bulan Ramadan',
    icon: '🌙',
    color: 'hajatan',
    lightColor: 'hajatan-light',
    defaultLabels: {
      title: 'Undangan Buka Puasa',
      names: 'Penyelenggara',
      dateLabel: 'Waktu Pelaksanaan',
      locationLabel: 'Lokasi Acara',
    },
    features: { ...simpleFeatures, hasCountdown: true },
  },
  {
    id: 'arisan',
    name: 'Arisan',
    nameIndonesian: 'Arisan',
    description: 'Undangan arisan rutin atau pertemuan komunitas',
    icon: '💰',
    color: 'family',
    lightColor: 'family-light',
    defaultLabels: {
      title: 'Undangan Arisan',
      names: 'Penyelenggara',
      dateLabel: 'Waktu Pelaksanaan',
      locationLabel: 'Lokasi Pertemuan',
    },
    features: {
      hasRSVP: true,
      hasGuestBook: false,
      hasDigitalEnvelope: false,
      hasGallery: false,
      hasMusic: false,
      hasCountdown: true,
      hasEventSessions: false,
      hasCalendar: true,
    },
  },
  {
    id: 'acara_umum',
    name: 'General Event',
    nameIndonesian: 'Acara Umum',
    description: 'Undangan acara sekolah, seminar, dan kegiatan umum',
    icon: '📋',
    color: 'family',
    lightColor: 'family-light',
    defaultLabels: {
      title: 'Undangan Acara',
      names: 'Penyelenggara',
      dateLabel: 'Waktu Acara',
      locationLabel: 'Lokasi Acara',
    },
    features: standardFeatures,
  },
];

export const getEventTypeConfig = (eventType: EventType): EventTypeConfig => {
  return eventTypes.find((e) => e.id === eventType) || eventTypes[0];
};
