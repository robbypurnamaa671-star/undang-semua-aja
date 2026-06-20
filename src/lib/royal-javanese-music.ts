// Built-in music library for the Royal Javanese Wedding Story template.
// All tracks are royalty-free instrumental loops suitable for autoplay on
// invitations. Users can also upload their own MP3 instead.
export interface RoyalJavaneseTrack {
  id: string;
  name: string;
  description: string;
  url: string;
}

export const ROYAL_JAVANESE_MUSIC: RoyalJavaneseTrack[] = [
  {
    id: "gending-keraton",
    name: "Gending Keraton",
    description: "Instrumental gamelan halus bernuansa keraton — ideal untuk pembukaan sakral.",
    url: "https://cdn.pixabay.com/audio/2023/09/05/audio_91d5e2c1cf.mp3",
  },
  {
    id: "javanese-piano",
    name: "Javanese Piano Story",
    description: "Piano lembut dengan sentuhan etnik Jawa, cocok untuk timeline cinta.",
    url: "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3",
  },
  {
    id: "cinematic-wedding",
    name: "Cinematic Wedding",
    description: "Orkestra ringan sinematik untuk momen yang megah dan emosional.",
    url: "https://cdn.pixabay.com/audio/2022/08/02/audio_2dde668ca0.mp3",
  },
];

export function getMusicTrack(id?: string): RoyalJavaneseTrack | undefined {
  if (!id) return undefined;
  return ROYAL_JAVANESE_MUSIC.find((t) => t.id === id);
}