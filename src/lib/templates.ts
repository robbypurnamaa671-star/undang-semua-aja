import { EventType } from './event-types';

export interface TemplateSection {
  id: string;
  type: 'cover' | 'names' | 'datetime' | 'location' | 'gallery' | 'message' | 'countdown';
  enabled: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  eventTypes: EventType[];
  previewImage: string;
  isPremium: boolean;
  colorScheme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  sections: TemplateSection[];
  style: 'classic' | 'modern' | 'minimalist' | 'elegant' | 'rustic';
}

export const templates: Template[] = [
  // Wedding Templates
  {
    id: 'wedding-classic-gold',
    name: 'Emas Klasik',
    description: 'Desain klasik dengan sentuhan emas yang elegan',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-classic.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#c9a962',
      secondary: '#f5e6d3',
      background: '#faf8f5',
      text: '#3d3d3d',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'countdown', type: 'countdown', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'gallery', type: 'gallery', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'classic',
  },
  {
    id: 'wedding-modern-blush',
    name: 'Blush Modern',
    description: 'Desain modern dengan warna pink lembut',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-modern.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#d4a5a5',
      secondary: '#f8e8e8',
      background: '#ffffff',
      text: '#4a4a4a',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'countdown', type: 'countdown', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'gallery', type: 'gallery', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'modern',
  },
  {
    id: 'wedding-elegant-navy',
    name: 'Navy Elegan',
    description: 'Desain elegan dengan warna navy dan emas',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-elegant.jpg',
    isPremium: true,
    colorScheme: {
      primary: '#1e3a5f',
      secondary: '#c9a962',
      background: '#f8f9fa',
      text: '#1e3a5f',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'countdown', type: 'countdown', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'gallery', type: 'gallery', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'elegant',
  },
  // Khitanan Templates
  {
    id: 'khitanan-festive-blue',
    name: 'Biru Ceria',
    description: 'Desain ceria dengan warna biru yang menyegarkan',
    eventTypes: ['khitanan'],
    previewImage: '/templates/khitanan-blue.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#2196f3',
      secondary: '#e3f2fd',
      background: '#ffffff',
      text: '#1565c0',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'countdown', type: 'countdown', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'gallery', type: 'gallery', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'modern',
  },
  {
    id: 'khitanan-islamic-green',
    name: 'Hijau Islami',
    description: 'Desain islami dengan nuansa hijau yang tenang',
    eventTypes: ['khitanan'],
    previewImage: '/templates/khitanan-green.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#2e7d32',
      secondary: '#e8f5e9',
      background: '#fafafa',
      text: '#1b5e20',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'countdown', type: 'countdown', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'gallery', type: 'gallery', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'classic',
  },
  // Hajatan Templates
  {
    id: 'hajatan-warm-earth',
    name: 'Hangat Bumi',
    description: 'Desain hangat dengan warna tanah yang menenangkan',
    eventTypes: ['hajatan'],
    previewImage: '/templates/hajatan-earth.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#8d6e63',
      secondary: '#efebe9',
      background: '#fafaf9',
      text: '#5d4037',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'rustic',
  },
  {
    id: 'hajatan-simple-sage',
    name: 'Sage Sederhana',
    description: 'Desain minimalis dengan warna sage yang elegan',
    eventTypes: ['hajatan'],
    previewImage: '/templates/hajatan-sage.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#6b8e6b',
      secondary: '#e8f0e8',
      background: '#ffffff',
      text: '#4a5d4a',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'minimalist',
  },
  // Birthday Templates
  {
    id: 'birthday-colorful-party',
    name: 'Pesta Warna',
    description: 'Desain penuh warna untuk pesta yang meriah',
    eventTypes: ['birthday'],
    previewImage: '/templates/birthday-colorful.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#9c27b0',
      secondary: '#f3e5f5',
      background: '#ffffff',
      text: '#6a1b9a',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'countdown', type: 'countdown', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'gallery', type: 'gallery', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'modern',
  },
  {
    id: 'birthday-elegant-rose',
    name: 'Mawar Elegan',
    description: 'Desain elegan untuk ulang tahun dewasa',
    eventTypes: ['birthday'],
    previewImage: '/templates/birthday-rose.jpg',
    isPremium: true,
    colorScheme: {
      primary: '#c2185b',
      secondary: '#fce4ec',
      background: '#fff8fa',
      text: '#880e4f',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'countdown', type: 'countdown', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'gallery', type: 'gallery', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'elegant',
  },
  // Family Gathering Templates
  {
    id: 'family-warm-orange',
    name: 'Oranye Hangat',
    description: 'Desain hangat untuk pertemuan keluarga',
    eventTypes: ['family'],
    previewImage: '/templates/family-orange.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#e65100',
      secondary: '#fff3e0',
      background: '#fffbf5',
      text: '#bf360c',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'modern',
  },
  {
    id: 'family-classic-brown',
    name: 'Coklat Klasik',
    description: 'Desain klasik yang hangat dan nyaman',
    eventTypes: ['family'],
    previewImage: '/templates/family-brown.jpg',
    isPremium: false,
    colorScheme: {
      primary: '#795548',
      secondary: '#efebe9',
      background: '#faf8f5',
      text: '#4e342e',
    },
    sections: [
      { id: 'cover', type: 'cover', enabled: true },
      { id: 'names', type: 'names', enabled: true },
      { id: 'datetime', type: 'datetime', enabled: true },
      { id: 'location', type: 'location', enabled: true },
      { id: 'message', type: 'message', enabled: true },
    ],
    style: 'classic',
  },
];

export const getTemplatesByEventType = (eventType: EventType): Template[] => {
  return templates.filter((t) => t.eventTypes.includes(eventType));
};

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};
