import { EventType } from './event-types';

export interface InvitationData {
  id?: string;
  userId?: string;
  slug?: string;
  eventType: EventType;
  templateId: string;
  status: 'draft' | 'published';
  isPaid: boolean;
  
  // Content
  title: string;
  names: string[];
  eventDate: string;
  eventTime: string;
  locationName: string;
  locationAddress: string;
  locationMapUrl?: string;
  message: string;
  
  // Customization
  coverImage?: string;
  galleryImages: string[];
  themeColor?: string;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
}

export const createDefaultInvitation = (eventType: EventType, templateId: string): InvitationData => {
  return {
    eventType,
    templateId,
    status: 'draft',
    isPaid: false,
    title: '',
    names: ['', ''],
    eventDate: '',
    eventTime: '',
    locationName: '',
    locationAddress: '',
    locationMapUrl: '',
    message: '',
    galleryImages: [],
  };
};

// Generate a random slug
export const generateSlug = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';
  for (let i = 0; i < 8; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
};
