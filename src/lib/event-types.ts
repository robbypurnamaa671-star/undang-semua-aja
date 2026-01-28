// Event types and their configurations
export type EventType = 'wedding' | 'khitanan' | 'hajatan' | 'birthday' | 'family';

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
}

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
  },
];

export const getEventTypeConfig = (eventType: EventType): EventTypeConfig => {
  return eventTypes.find((e) => e.id === eventType) || eventTypes[0];
};
