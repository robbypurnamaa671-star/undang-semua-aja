## Royal Javanese Wedding Story — Premium Cinematic Template

A fully self-contained wedding template with its own data model, editor, validation, and renderer. Nothing is shared with the standard invitation form; cinematic-style isolation similar to the existing `wedding-cinematic-scroll-story` pattern (`isCinematic` flag) but using a new `isRoyalJavanese` flag and `royalJavanese` config branch.

### 1. Data Model — `src/lib/invitation.ts`

Add new types and a `royalJavanese?: RoyalJavaneseConfig` field on `InvitationData`.

```ts
export interface RoyalJavaneseMilestone {
  title: string;        // "Pertama Bertemu"
  year: string;         // "2019"
  description: string;  // 1–3 sentences
  photo?: string;       // optional uploaded URL
}

export interface RoyalJavaneseBankAccount {
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  qrisImage?: string;
}

export interface RoyalJavaneseEvent {
  date?: string;          // YYYY-MM-DD
  time?: string;          // HH:mm
  location?: string;
  mapsUrl?: string;
}

export interface RoyalJavaneseConfig {
  // Section A — Couple
  groomFullName: string;
  brideFullName: string;
  groomNickname?: string;
  brideNickname?: string;
  hashtag?: string;
  // Section B — Opening video
  openingVideoUrl?: string;   // 9:16 MP4 in invitation-images bucket
  // Section C — Opening quote
  openingQuote: string;       // max 150 chars
  // Section D — Royal Love Story (exactly 4)
  milestones: RoyalJavaneseMilestone[];
  // Section E — Gallery
  gallery: string[];          // 5–20 photos
  // Section F — Wedding details
  akad: RoyalJavaneseEvent;       // required
  resepsi?: RoyalJavaneseEvent;   // optional
  // Section G — RSVP
  rsvpEnabled: boolean;
  // Section H — Gift
  gift?: RoyalJavaneseBankAccount;
  // Section I — Music
  musicUrl?: string;          // upload OR built-in id
  musicLibraryId?: string;    // e.g. "gending-jawa-1"
}
```

`createDefaultInvitation` is extended: when `templateId === "wedding-royal-javanese-story"`, seed `royalJavanese` with 4 sample milestones, an empty gallery, an empty `akad`, `rsvpEnabled: true`, and a default opening quote.

### 2. Template Registry — `src/lib/templates.ts`

Add a new entry:

```ts
{
  id: "wedding-royal-javanese-story",
  name: "Royal Javanese Wedding Story",
  category: "premium",
  eventType: "pernikahan",
  premium: true,
  isRoyalJavanese: true,
  description: "Cinematic Javanese royal love story with scroll-driven scenes.",
  thumbnail: "...",
}
```

### 3. Custom Editor — `src/components/builder/RoyalJavaneseEditor.tsx` (new)

Collapsible accordion organized **scene-by-scene** so users see how each input maps to the story:

```
Scene 1 — Opening (Section A + B)
  • Groom / Bride names, nicknames, hashtag
  • Opening video upload (9:16 MP4, ≤30MB)
Scene 2 — Opening Quote (Section C)
  • Quote input with 150-char counter
Scene 3 — Royal Love Story (Section D)
  • 4 fixed milestone cards (title / year / description / optional photo)
Scene 4 — Gallery (Section E)
  • GalleryUpload (5–20, portrait+landscape, auto-optimized)
Scene 5 — Wedding Details (Section F)
  • Akad (required) + Resepsi (optional) subforms
Scene 6 — RSVP (Section G)
  • Toggle + preview of public RSVP form (name / status / message)
Scene 7 — Wedding Gift (Section H)
  • Bank fields + optional QRIS image upload
Scene 8 — Music (Section I)
  • Upload MP3 OR pick from built-in library (radio list)
```

All inputs zod-validated. Counts/limits enforced inline. Reuses existing `ImageUpload`, `GalleryUpload`, and `useImageUpload`. New `VideoUpload` helper component handles the 30MB / MP4 / 9:16 check (client-side metadata read).

### 4. Storage

Reuse `invitation-images` bucket (public) for video uploads under a `videos/` prefix. No new bucket needed.

### 5. Renderer — `src/components/invitation/RoyalJavaneseScrollStory.tsx` (new)

Scroll-driven Framer Motion experience with batik motifs (gold / champagne / deep wood). Scenes:

```
Scene 1: Opening — vertical hero video + couple names + hashtag
Scene 2: Quote — full-bleed gold serif quote on parchment texture
Scene 3: Royal Love Story — 4 milestone cards parallax timeline
Scene 4: Gallery — masonry grid, portrait+landscape aware
Scene 5: Akad + Resepsi — split cards with maps button & calendar links
Scene 6: RSVP — embedded RSVPForm
Scene 7: Gift — bank card + QRIS modal
Footer: Hashtag + closing
```

Uses existing `usePerf` lazy/perf pattern from cinematic template. Premium placeholders shown when video / milestones / gallery missing (e.g. blurred royal still, sample timeline grayed with "Belum diisi" pill). Watermark logic unchanged.

### 6. Builder Integration — `src/components/builder/InvitationBuilder.tsx`

```ts
if (template.isRoyalJavanese) {
  return <RoyalJavaneseEditor ... />;   // hides ALL standard sections
}
```

Same publish flow but with a new validator:

```ts
function validateRoyalJavanese(cfg): string[] {
  // returns missing-required messages
  // required: groomFullName, brideFullName, openingVideoUrl,
  //           openingQuote, 4 milestones with title+year+description,
  //           gallery.length >= 5, akad.date+time+location
}
```

If errors exist, publish button is disabled and a setup warning panel lists missing items. Draft save is still allowed.

### 7. Public Rendering — `src/pages/PublicInvitation.tsx` + `InvitationPreview.tsx`

```ts
if (template.isRoyalJavanese) {
  return <RoyalJavaneseScrollStory invitation={inv} />;
}
```

### 8. Music Library

Static array in `src/lib/royal-javanese-music.ts` with 3–5 royalty-free gending-jawa tracks (urls hosted via lovable-assets). Editor radio picks from this OR the user uploads MP3.

### 9. Opening video asset

Upload the provided `Opening Jawa.mp4` via `lovable-assets` and use it as the default placeholder shown in preview when the user hasn't uploaded their own video.

### Files to add / touch

- new `src/components/builder/RoyalJavaneseEditor.tsx`
- new `src/components/builder/VideoUpload.tsx`
- new `src/components/invitation/RoyalJavaneseScrollStory.tsx`
- new `src/lib/royal-javanese-music.ts`
- new `src/assets/royal-javanese-opening.mp4.asset.json` (CDN pointer from upload)
- edit `src/lib/invitation.ts` — add schema + defaults
- edit `src/lib/templates.ts` — register template + `isRoyalJavanese`
- edit `src/components/builder/InvitationBuilder.tsx` — branch + validator
- edit `src/components/builder/InvitationPreview.tsx` — branch render
- edit `src/pages/PublicInvitation.tsx` — branch render

### Out of scope

- No DB schema change — config stored inside existing `invitations` JSON columns (`custom_backgrounds` JSON or a generic `extra` field already used by cinematic; same pattern reused).
- No editor drag-and-drop reorder of scenes (fixed order by design).
- No new translation system.

### After approval

I'll implement in this order: data model → template flag → video upload component → editor → renderer → builder branching/validator → public render → wire default opening video asset → smoke test build.
