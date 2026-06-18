## Tujuan

Template **Cinematic Scroll Story** punya 10 scene dengan konten yang TIDAK ada di form editor undangan umum:

- Tagline hero (mis. "A Love Story Written By Destiny")
- Scene 2 "First Meeting" → tahun, judul, narasi, 1 foto khusus
- Scene 3 "Our Love Story" → 3 kartu timeline (tahun, judul, deskripsi, foto)
- Scene 4 headline lamaran (mis. "Will You Marry Me?")
- Scene 10 closing tagline

Kalau template ini didorong ke form generic seperti template lain (cover + galeri + pesan), banyak scene akan kosong/mismatch. Plan ini menyiapkan input khusus + rendering produksi.

## Perubahan

### 1. Model data (`src/lib/invitation.ts`)
Tambah field opsional `cinematic` di `InvitationData`:

```ts
export interface CinematicJourneyCard {
  year: string; title: string; text: string; image?: string;
}
export interface CinematicConfig {
  heroTagline?: string;            // "A Love Story Written By Destiny"
  firstMeetingYear?: string;       // "2018"
  firstMeetingTitle?: string;      // "Pertama Kali Bertemu"
  firstMeetingStory?: string;      // narasi 2-3 kalimat
  firstMeetingImage?: string;      // 1 foto
  journeyCards?: CinematicJourneyCard[]; // 3 kartu
  proposalHeadline?: string;       // "Will You Marry Me?"
  venueHeroImage?: string;         // background Scene 6
  closingTagline?: string;         // "We Look Forward To Celebrating With You"
}
```
Tambahkan `cinematic?: CinematicConfig` ke `InvitationData` dan defaults di `createDefaultInvitation` saat `templateId === 'wedding-cinematic-scroll-story'`.

### 2. Daftarkan template (`src/lib/templates.ts`)
Tambah entry baru:

```ts
{
  id: 'wedding-cinematic-scroll-story',
  name: 'Cinematic Scroll Story',
  eventTypes: ['wedding'],
  isPremium: true,
  style: 'custom',
  // flag baru
  isCinematic: true,
}
```
Tambah `isCinematic?: boolean` ke interface `Template`.

### 3. Editor khusus (`src/components/builder/CinematicEditor.tsx` — baru)
Komponen kolapsibel yang muncul HANYA jika `template.isCinematic`:

- Input tagline hero (maxLength 80)
- Section "Kisah Pertemuan": tahun, judul, narasi (textarea, maxLength 240), upload foto via `ImageUpload` (folder `cinematic`)
- Section "Timeline Cinta" (FIXED 3 kartu): masing-masing year/title/text/image
- Input headline lamaran (maxLength 40)
- Upload "Foto Venue Hero" (background Scene 6)
- Input closing tagline (maxLength 100)

Validasi zod sederhana di sisi klien (length limits).

### 4. Integrasi ke `InvitationBuilder.tsx`
- Jika `template.isCinematic`:
  - Sembunyikan editor galeri generik (gallery 6 foto tidak dipakai oleh scene cinematic)
  - Sembunyikan `SectionBackgroundsEditor` (tidak relevan)
  - TAMPILKAN `<CinematicEditor>` setelah field tanggal/lokasi
- Field standar yang TETAP dipakai: title, names[2], eventDate/Time/timezone, locationName/Address/mapUrl, message, bankAccounts (→ Scene 9), closingMessage/Prayer (boleh), whatsappNumber, musicUrl, guestList.

### 5. Rendering produksi
Refactor `CinematicScrollStoryDemo.tsx` jadi komponen reusable `CinematicScrollStory({ invitation })` di `src/components/invitation/CinematicScrollStory.tsx`. Konstanta GROOM/BRIDE/EVENT_DATE_ISO/VENUE/PHOTOS diganti membaca dari `invitation` + `invitation.cinematic`. Demo page tinggal memanggil komponen dengan data dummy.

Di `InvitationPreview.tsx` & `PublicInvitation.tsx`: jika `template.isCinematic`, render `<CinematicScrollStory>` dan lewati layout default.

### 6. Fallback aman
Setiap field cinematic kosong → pakai default placeholder elegan (mis. tahun = tahun pernikahan - 5, narasi = "Kisah kami dimulai…") supaya preview tidak rusak. Maksimal 3 kartu timeline; kalau user hanya isi 1-2, sisanya disembunyikan (grid menyesuaikan).

## Out of scope
- Tidak menambah field foto galeri 6 (template ini cuma butuh 5 foto: 1 first meeting + 3 timeline + 1 venue)
- Tidak mengubah skema database; field `cinematic` disimpan di kolom JSON config undangan yang sudah ada.
- Tidak menambahkan editor scene-by-scene drag-and-drop.

## File yang disentuh
- `src/lib/invitation.ts` (tambah tipe & default)
- `src/lib/templates.ts` (tambah template + flag)
- `src/components/builder/CinematicEditor.tsx` (baru)
- `src/components/invitation/CinematicScrollStory.tsx` (baru, dari demo)
- `src/components/builder/InvitationBuilder.tsx` (conditional render)
- `src/components/builder/InvitationPreview.tsx` (branch render)
- `src/pages/PublicInvitation.tsx` (branch render)
- `src/pages/CinematicScrollStoryDemo.tsx` (jadi tipis, panggil komponen)
