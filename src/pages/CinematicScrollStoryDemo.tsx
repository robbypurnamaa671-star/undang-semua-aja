import { SEO } from "@/components/SEO";
import { CinematicScrollStory } from "@/components/invitation/CinematicScrollStory";
import { createDefaultInvitation } from "@/lib/invitation";

/**
 * Standalone preview of the production "Cinematic Scroll Story" template.
 * Uses sample data so editors / reviewers can see the rendered output.
 * Not indexed.
 */
export default function CinematicScrollStoryDemo() {
  const base = createDefaultInvitation("wedding", "wedding-cinematic-scroll-story");
  const invitation = {
    ...base,
    title: "Pernikahan Egik & Wahyu",
    names: ["Egik Setiawan", "Wahyu Harianti"],
    eventDate: "2026-05-28",
    eventTime: "10:00",
    timezone: "WIB",
    locationName: "Grand Ballroom",
    locationAddress: "Bandar Lampung",
    isPaid: true,
    bankAccounts: [
      { bankName: "BCA", accountNumber: "1234567890", accountHolder: "Egik Setiawan" },
      { bankName: "Mandiri", accountNumber: "9876543210", accountHolder: "Wahyu Harianti" },
    ],
    cinematic: {
      ...base.cinematic,
      firstMeetingYear: "2018",
      journeyCards: [
        { year: "2019", title: "First Date", text: "Makan malam pertama yang menjadi momen tak terlupakan." },
        { year: "2021", title: "First Adventure", text: "Perjalanan ke pantai pertama, di mana janji kecil mulai tercipta." },
        { year: "2024", title: "First Dream Together", text: "Saat kami mulai merangkai mimpi yang sama untuk masa depan." },
      ],
    },
  };

  return (
    <>
      <SEO
        title="Cinematic Scroll Story - Premium Wedding Invitation Demo"
        description="Luxury cinematic wedding invitation experience powered by scroll storytelling."
        canonical="/preview/cinematic-scroll-story"
        noIndex
      />
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
        <span
          className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold px-3 py-1.5 rounded-full border shadow-lg"
          style={{
            background: "rgba(20,16,12,0.75)",
            color: "#E8C98E",
            borderColor: "#D9B679",
            backdropFilter: "blur(8px)",
          }}
        >
          Demo Template — Preview
        </span>
      </div>
      <CinematicScrollStory invitation={invitation} />
    </>
  );
}