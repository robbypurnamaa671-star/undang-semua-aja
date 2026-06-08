import { InvitationData, createDefaultInvitation } from "./invitation";
import { Template } from "./templates";

// Sample royalty-free instrumental (SoundHelix) — reliable for demo playback.
export const DEMO_MUSIC_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";

const DEMO_GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=70",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=70",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=70",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=70",
];

const DEMO_COVER =
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=75";

// In ~60 days so countdown looks alive
function futureDateISO(daysAhead = 60): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

/**
 * Build a richly-populated dummy invitation for showcase previews.
 * Adapts copy to the template's primary event type so each preview reads naturally.
 */
export function createDemoInvitation(template: Template): InvitationData {
  const eventType = template.eventTypes[0];
  const base = createDefaultInvitation(eventType, template.id);
  const date = futureDateISO(60);

  const isWedding = eventType === "wedding";
  const isLamaran = eventType === "lamaran";
  const hasTwo = isWedding || isLamaran;

  const names = hasTwo ? ["Raka Pratama", "Aulia Putri"] : ["Keluarga Pratama"];

  let title = "Undangan";
  let message = "";
  let locationName = "Gedung Serbaguna Graha Bahagia";
  let locationAddress = "Jl. Melati No. 17, Jakarta Selatan";
  const locationMapUrl = "https://maps.google.com/?q=Monas+Jakarta";

  if (isWedding) {
    title = "Undangan Pernikahan";
    message =
      "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami. Merupakan suatu kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir.";
  } else if (isLamaran) {
    title = "Undangan Lamaran";
    message =
      "Dengan segala kerendahan hati, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara lamaran kami.";
  } else {
    title = `Undangan ${eventType.replace(/_/g, " ")}`;
    message =
      "Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami. Kehadiran Anda adalah kehormatan bagi keluarga.";
  }

  const events = isWedding
    ? [
        {
          name: "Akad Nikah",
          date,
          time: "08:00",
          endTime: "10:00",
          location: locationName,
        },
        {
          name: "Resepsi",
          date,
          time: "11:00",
          endTime: "14:00",
          location: locationName,
        },
      ]
    : isLamaran
    ? [
        {
          name: "Acara Lamaran",
          date,
          time: "10:00",
          endTime: "12:00",
          location: locationName,
        },
      ]
    : [];

  return {
    ...base,
    title,
    names,
    eventDate: date,
    eventTime: "10:00",
    timezone: "WIB",
    locationName,
    locationAddress,
    locationMapUrl,
    message,
    events: events.length ? events : base.events,
    bankAccounts: [
      {
        bankName: "BCA",
        accountNumber: "1234567890",
        accountHolder: names[0],
      },
      ...(hasTwo
        ? [
            {
              bankName: "Mandiri",
              accountNumber: "9876543210",
              accountHolder: names[1],
            },
          ]
        : []),
    ],
    coverImage: DEMO_COVER,
    galleryImages: DEMO_GALLERY,
    musicUrl: DEMO_MUSIC_URL,
    whatsappNumber: "6281234567890",
  };
}