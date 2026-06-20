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

// ---- Royal Javanese Wedding Story template-specific config ----
export interface RoyalJavaneseMilestone {
  title: string;
  year: string;
  description: string;
  photo?: string;
}

export interface RoyalJavaneseEventDetail {
  date?: string;       // YYYY-MM-DD
  time?: string;       // HH:mm
  location?: string;
  mapsUrl?: string;
}

export interface RoyalJavaneseGift {
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  qrisImage?: string;
}

export interface RoyalJavaneseConfig {
  // Section A — Couple
  groomFullName?: string;
  brideFullName?: string;
  groomNickname?: string;
  brideNickname?: string;
  hashtag?: string;
  // Section B — Opening video (9:16 MP4, max 30MB)
  openingVideoUrl?: string;
  // Section C — Opening quote (max 150 chars)
  openingQuote?: string;
  // Section D — 4 milestones
  milestones?: RoyalJavaneseMilestone[];
  // Section E — Gallery (5–20 photos)
  gallery?: string[];
  // Section F — Wedding events
  akad?: RoyalJavaneseEventDetail;
  resepsi?: RoyalJavaneseEventDetail;
  // Section G — RSVP
  rsvpEnabled?: boolean;
  // Section H — Gift
  gift?: RoyalJavaneseGift;
  // Section I — Music
  musicUrl?: string;
  musicLibraryId?: string;
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

  // Royal Javanese Wedding Story template-specific content (only used by that template)
  royalJavanese?: RoyalJavaneseConfig;
  
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
    ...(templateId === 'wedding-cinematic-scroll-story'
      ? {
          cinematic: {
            heroTagline: 'A Love Story Written By Destiny',
            firstMeetingYear: '',
            firstMeetingTitle: 'Pertama Kali Bertemu',
            firstMeetingStory:
              'Sebuah pertemuan sederhana yang menjadi awal dari sebuah kisah panjang yang tidak pernah kami duga akan membawa kami ke hari ini.',
            firstMeetingImage: '',
            journeyCards: [
              { year: '', title: 'First Date', text: 'Momen pertama yang tak terlupakan.' },
              { year: '', title: 'First Adventure', text: 'Perjalanan kecil yang mempererat janji kami.' },
              { year: '', title: 'First Dream Together', text: 'Saat kami mulai merangkai mimpi yang sama.' },
            ],
            proposalHeadline: 'Will You Marry Me?',
            venueHeroImage: '',
            closingTagline: 'We Look Forward To Celebrating With You',
          },
        }
      : {}),
    ...(templateId === 'wedding-royal-javanese-story'
      ? {
          royalJavanese: {
            groomFullName: '',
            brideFullName: '',
            groomNickname: '',
            brideNickname: '',
            hashtag: '',
            openingVideoUrl: '',
            openingQuote: 'Sebuah kisah cinta yang ditulis oleh takdir.',
            milestones: [
              { title: 'Pertama Bertemu', year: '', description: 'Awal mula segalanya — sebuah pertemuan yang tidak kami sangka akan mengubah hidup kami selamanya.' },
              { title: 'Mulai Dekat', year: '', description: 'Hari-hari yang dipenuhi tawa, cerita, dan rasa nyaman yang tak bisa dijelaskan.' },
              { title: 'Janji Sehidup', year: '', description: 'Momen ketika kami yakin bahwa kami ingin menjalani sisa hidup bersama.' },
              { title: 'Menuju Pelaminan', year: '', description: 'Persiapan menyongsong hari sakral yang dinanti — keluarga, doa, dan restu menyatu.' },
            ],
            gallery: [],
            akad: { date: '', time: '', location: '', mapsUrl: '' },
            resepsi: { date: '', time: '', location: '', mapsUrl: '' },
            rsvpEnabled: true,
            gift: { bankName: '', accountNumber: '', accountHolder: '', qrisImage: '' },
            musicUrl: '',
            musicLibraryId: '',
          },
        }
      : {}),
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
