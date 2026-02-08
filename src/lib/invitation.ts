import { EventType } from './event-types';

export interface EventSession {
  name: string;
  date: string;
  time: string;
  endTime?: string;
  location?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

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
  timezone: string;
  locationName: string;
  locationAddress: string;
  locationMapUrl?: string;
  message: string;
  
  // Event sessions (Akad, Resepsi, etc.)
  events: EventSession[];
  
  // Digital envelope
  bankAccounts: BankAccount[];
  
  // Closing
  closingMessage?: string;
  closingPrayer?: string;
  
  // Media
  coverImage?: string;
  galleryImages: string[];
  musicUrl?: string;
  themeColor?: string;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
}

export const createDefaultInvitation = (eventType: EventType, templateId: string): InvitationData => {
  const isWedding = eventType === 'wedding';
  return {
    eventType,
    templateId,
    status: 'draft',
    isPaid: false,
    title: '',
    names: ['', ''],
    eventDate: '',
    eventTime: '',
    timezone: 'WIB',
    locationName: '',
    locationAddress: '',
    locationMapUrl: '',
    message: '',
    galleryImages: [],
    events: isWedding ? [
      { name: 'Akad Nikah', date: '', time: '', endTime: '' },
      { name: 'Resepsi', date: '', time: '', endTime: '' },
    ] : [],
    bankAccounts: [],
    closingMessage: isWedding ? 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.' : '',
    closingPrayer: isWedding ? '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang." — QS. Ar-Rum: 21' : '',
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
