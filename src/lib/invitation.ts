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

export interface CustomBackgrounds {
  cover?: string;
  names?: string;
  countdown?: string;
  datetime?: string;
  location?: string;
  gallery?: string;
  rsvp?: string;
  guestbook?: string;
  envelope?: string;
  closing?: string;
}

// ---- Cinematic Scroll Story template-specific config ----
export interface CinematicJourneyCard {
  year: string;
  title: string;
  text: string;
  image?: string;
}

export interface CinematicConfig {
  heroTagline?: string;          // tagline kecil di scene 1
  firstMeetingYear?: string;     // "2018"
  firstMeetingTitle?: string;    // "Pertama Kali Bertemu"
  firstMeetingStory?: string;    // narasi pendek 2-3 kalimat
  firstMeetingImage?: string;    // 1 foto khusus scene 2
  journeyCards?: CinematicJourneyCard[]; // sampai 3 kartu timeline
  proposalHeadline?: string;     // headline scene 4
  venueHeroImage?: string;       // background besar scene 6
  closingTagline?: string;       // tagline scene 10
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
  
  // Full Custom backgrounds per section
  customBackgrounds?: CustomBackgrounds;

  // Cinematic Scroll Story template-specific content (only used by that template)
  cinematic?: CinematicConfig;
  
  // Guest list for personalized links
  guestList: string[];
  
  // Contact
  whatsappNumber?: string;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
}

export const createDefaultInvitation = (eventType: EventType, templateId: string): InvitationData => {
  const isWedding = eventType === 'wedding';
  const isLamaran = eventType === 'lamaran';
  const isDuka = eventType === 'duka_cita';
  const isTahlilan = eventType === 'tahlilan';
  const isReligious = ['tahlilan', 'pengajian', 'bukber'].includes(eventType);
  
  let closingMessage = '';
  let closingPrayer = '';
  let events: EventSession[] = [];
  
  if (isWedding) {
    closingMessage = 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.';
    closingPrayer = '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang." — QS. Ar-Rum: 21';
    events = [
      { name: 'Akad Nikah', date: '', time: '', endTime: '' },
      { name: 'Resepsi', date: '', time: '', endTime: '' },
    ];
  } else if (isLamaran) {
    closingMessage = 'Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.';
  } else if (isDuka) {
    closingMessage = 'Turut berduka cita yang sedalam-dalamnya. Semoga almarhum/ah diberikan tempat yang terbaik di sisi-Nya.';
    closingPrayer = '"Innaa lillaahi wa innaa ilaihi raaji\'uun"';
  } else if (isTahlilan) {
    closingMessage = 'Kehadiran Bapak/Ibu/Saudara/i untuk mendoakan almarhum/ah sangat kami harapkan.';
    closingPrayer = '"Allahummaghfirlahu warhamhu wa\'aafihi wa\'fu \'anhu"';
  } else if (isReligious) {
    closingMessage = 'Kehadiran Bapak/Ibu/Saudara/i sangat kami harapkan. Jazakumullahu khairan.';
  } else {
    closingMessage = 'Kehadiran Bapak/Ibu/Saudara/i merupakan kehormatan bagi kami.';
  }
  
  return {
    eventType,
    templateId,
    status: 'draft',
    isPaid: false,
    title: '',
    names: isWedding || isLamaran ? ['', ''] : [''],
    eventDate: '',
    eventTime: '',
    timezone: 'WIB',
    locationName: '',
    locationAddress: '',
    locationMapUrl: '',
    message: '',
    galleryImages: [],
    events,
    bankAccounts: [],
    closingMessage,
    closingPrayer,
    guestList: [],
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
