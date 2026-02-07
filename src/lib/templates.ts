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

const defaultSections: TemplateSection[] = [
  { id: 'cover', type: 'cover', enabled: true },
  { id: 'names', type: 'names', enabled: true },
  { id: 'countdown', type: 'countdown', enabled: true },
  { id: 'datetime', type: 'datetime', enabled: true },
  { id: 'location', type: 'location', enabled: true },
  { id: 'gallery', type: 'gallery', enabled: true },
  { id: 'message', type: 'message', enabled: true },
];

const simpleSections: TemplateSection[] = [
  { id: 'cover', type: 'cover', enabled: true },
  { id: 'names', type: 'names', enabled: true },
  { id: 'datetime', type: 'datetime', enabled: true },
  { id: 'location', type: 'location', enabled: true },
  { id: 'message', type: 'message', enabled: true },
];

export const templates: Template[] = [
  // ── Wedding Templates (1 free, 4 premium) ──
  {
    id: 'wedding-classic-gold',
    name: 'Emas Klasik',
    description: 'Desain klasik dengan sentuhan emas yang elegan',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-classic.jpg',
    isPremium: false,
    colorScheme: { primary: '#c9a962', secondary: '#f5e6d3', background: '#faf8f5', text: '#3d3d3d' },
    sections: defaultSections,
    style: 'classic',
  },
  {
    id: 'wedding-modern-blush',
    name: 'Blush Modern',
    description: 'Desain modern dengan warna pink lembut',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-modern.jpg',
    isPremium: true,
    colorScheme: { primary: '#d4a5a5', secondary: '#f8e8e8', background: '#ffffff', text: '#4a4a4a' },
    sections: defaultSections,
    style: 'modern',
  },
  {
    id: 'wedding-elegant-navy',
    name: 'Navy Elegan',
    description: 'Desain elegan dengan warna navy dan emas',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-elegant.jpg',
    isPremium: true,
    colorScheme: { primary: '#1e3a5f', secondary: '#c9a962', background: '#f8f9fa', text: '#1e3a5f' },
    sections: defaultSections,
    style: 'elegant',
  },
  {
    id: 'wedding-rustic-sage',
    name: 'Sage Rustic',
    description: 'Nuansa alam dengan warna sage yang menenangkan',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-rustic.jpg',
    isPremium: true,
    colorScheme: { primary: '#7a9e7e', secondary: '#e8f0e8', background: '#fafdf9', text: '#3d4f3d' },
    sections: defaultSections,
    style: 'rustic',
  },
  {
    id: 'wedding-minimalist-mono',
    name: 'Mono Minimalis',
    description: 'Desain minimalis hitam putih yang timeless',
    eventTypes: ['wedding'],
    previewImage: '/templates/wedding-minimalist.jpg',
    isPremium: true,
    colorScheme: { primary: '#2c2c2c', secondary: '#e8e8e8', background: '#ffffff', text: '#1a1a1a' },
    sections: defaultSections,
    style: 'minimalist',
  },

  // ── Khitanan Templates (1 free, 3 premium) ──
  {
    id: 'khitanan-festive-blue',
    name: 'Biru Ceria',
    description: 'Desain ceria dengan warna biru yang menyegarkan',
    eventTypes: ['khitanan'],
    previewImage: '/templates/khitanan-blue.jpg',
    isPremium: false,
    colorScheme: { primary: '#2196f3', secondary: '#e3f2fd', background: '#ffffff', text: '#1565c0' },
    sections: defaultSections,
    style: 'modern',
  },
  {
    id: 'khitanan-islamic-green',
    name: 'Hijau Islami',
    description: 'Desain islami dengan nuansa hijau yang tenang',
    eventTypes: ['khitanan'],
    previewImage: '/templates/khitanan-green.jpg',
    isPremium: true,
    colorScheme: { primary: '#2e7d32', secondary: '#e8f5e9', background: '#fafafa', text: '#1b5e20' },
    sections: defaultSections,
    style: 'classic',
  },
  {
    id: 'khitanan-golden-festive',
    name: 'Emas Meriah',
    description: 'Desain meriah dengan aksen emas dan biru tua',
    eventTypes: ['khitanan'],
    previewImage: '/templates/khitanan-golden.jpg',
    isPremium: true,
    colorScheme: { primary: '#d4a017', secondary: '#fff8e1', background: '#fffef5', text: '#5d4e0e' },
    sections: defaultSections,
    style: 'elegant',
  },
  {
    id: 'khitanan-playful-teal',
    name: 'Teal Playful',
    description: 'Desain playful dengan warna teal yang segar',
    eventTypes: ['khitanan'],
    previewImage: '/templates/khitanan-teal.jpg',
    isPremium: true,
    colorScheme: { primary: '#00897b', secondary: '#e0f2f1', background: '#ffffff', text: '#004d40' },
    sections: defaultSections,
    style: 'modern',
  },

  // ── Hajatan Templates (1 free, 3 premium) ──
  {
    id: 'hajatan-warm-earth',
    name: 'Hangat Bumi',
    description: 'Desain hangat dengan warna tanah yang menenangkan',
    eventTypes: ['hajatan'],
    previewImage: '/templates/hajatan-earth.jpg',
    isPremium: false,
    colorScheme: { primary: '#8d6e63', secondary: '#efebe9', background: '#fafaf9', text: '#5d4037' },
    sections: simpleSections,
    style: 'rustic',
  },
  {
    id: 'hajatan-simple-sage',
    name: 'Sage Sederhana',
    description: 'Desain minimalis dengan warna sage yang elegan',
    eventTypes: ['hajatan'],
    previewImage: '/templates/hajatan-sage.jpg',
    isPremium: true,
    colorScheme: { primary: '#6b8e6b', secondary: '#e8f0e8', background: '#ffffff', text: '#4a5d4a' },
    sections: simpleSections,
    style: 'minimalist',
  },
  {
    id: 'hajatan-classic-maroon',
    name: 'Maroon Klasik',
    description: 'Nuansa maroon klasik yang hangat dan bermartabat',
    eventTypes: ['hajatan'],
    previewImage: '/templates/hajatan-maroon.jpg',
    isPremium: true,
    colorScheme: { primary: '#7b1f3a', secondary: '#fce4ec', background: '#fff8f9', text: '#5a1028' },
    sections: simpleSections,
    style: 'classic',
  },
  {
    id: 'hajatan-modern-teal',
    name: 'Teal Modern',
    description: 'Desain modern dengan warna teal yang segar',
    eventTypes: ['hajatan'],
    previewImage: '/templates/hajatan-teal.jpg',
    isPremium: true,
    colorScheme: { primary: '#00796b', secondary: '#e0f2f1', background: '#ffffff', text: '#004d40' },
    sections: simpleSections,
    style: 'modern',
  },

  // ── Birthday Templates (1 free, 3 premium) ──
  {
    id: 'birthday-colorful-party',
    name: 'Pesta Warna',
    description: 'Desain penuh warna untuk pesta yang meriah',
    eventTypes: ['birthday'],
    previewImage: '/templates/birthday-colorful.jpg',
    isPremium: false,
    colorScheme: { primary: '#9c27b0', secondary: '#f3e5f5', background: '#ffffff', text: '#6a1b9a' },
    sections: defaultSections,
    style: 'modern',
  },
  {
    id: 'birthday-elegant-rose',
    name: 'Mawar Elegan',
    description: 'Desain elegan untuk ulang tahun dewasa',
    eventTypes: ['birthday'],
    previewImage: '/templates/birthday-rose.jpg',
    isPremium: true,
    colorScheme: { primary: '#c2185b', secondary: '#fce4ec', background: '#fff8fa', text: '#880e4f' },
    sections: defaultSections,
    style: 'elegant',
  },
  {
    id: 'birthday-tropical-fun',
    name: 'Tropical Fun',
    description: 'Desain tropis yang ceria dan penuh semangat',
    eventTypes: ['birthday'],
    previewImage: '/templates/birthday-tropical.jpg',
    isPremium: true,
    colorScheme: { primary: '#ff6f00', secondary: '#fff3e0', background: '#fffdf5', text: '#e65100' },
    sections: defaultSections,
    style: 'modern',
  },
  {
    id: 'birthday-pastel-dream',
    name: 'Pastel Dream',
    description: 'Nuansa pastel yang lembut dan bermimpi',
    eventTypes: ['birthday'],
    previewImage: '/templates/birthday-pastel.jpg',
    isPremium: true,
    colorScheme: { primary: '#ab47bc', secondary: '#f3e5f5', background: '#fef9ff', text: '#7b1fa2' },
    sections: defaultSections,
    style: 'minimalist',
  },

  // ── Family Gathering Templates (1 free, 3 premium) ──
  {
    id: 'family-warm-orange',
    name: 'Oranye Hangat',
    description: 'Desain hangat untuk pertemuan keluarga',
    eventTypes: ['family'],
    previewImage: '/templates/family-orange.jpg',
    isPremium: false,
    colorScheme: { primary: '#e65100', secondary: '#fff3e0', background: '#fffbf5', text: '#bf360c' },
    sections: simpleSections,
    style: 'modern',
  },
  {
    id: 'family-classic-brown',
    name: 'Coklat Klasik',
    description: 'Desain klasik yang hangat dan nyaman',
    eventTypes: ['family'],
    previewImage: '/templates/family-brown.jpg',
    isPremium: true,
    colorScheme: { primary: '#795548', secondary: '#efebe9', background: '#faf8f5', text: '#4e342e' },
    sections: simpleSections,
    style: 'classic',
  },
  {
    id: 'family-garden-green',
    name: 'Hijau Taman',
    description: 'Nuansa taman hijau yang menyegarkan',
    eventTypes: ['family'],
    previewImage: '/templates/family-green.jpg',
    isPremium: true,
    colorScheme: { primary: '#388e3c', secondary: '#e8f5e9', background: '#f9fdf9', text: '#1b5e20' },
    sections: simpleSections,
    style: 'rustic',
  },
  {
    id: 'family-sunset-gold',
    name: 'Emas Senja',
    description: 'Warna senja keemasan yang hangat dan indah',
    eventTypes: ['family'],
    previewImage: '/templates/family-sunset.jpg',
    isPremium: true,
    colorScheme: { primary: '#f57c00', secondary: '#ffe0b2', background: '#fffcf5', text: '#e65100' },
    sections: simpleSections,
    style: 'elegant',
  },
];

export const getTemplatesByEventType = (eventType: EventType): Template[] => {
  return templates.filter((t) => t.eventTypes.includes(eventType));
};

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

export const getFreeTemplateCount = (eventType: EventType): number => {
  return templates.filter((t) => t.eventTypes.includes(eventType) && !t.isPremium).length;
};

export const getPremiumTemplateCount = (eventType: EventType): number => {
  return templates.filter((t) => t.eventTypes.includes(eventType) && t.isPremium).length;
};
