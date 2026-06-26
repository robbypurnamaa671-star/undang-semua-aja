import { useParams, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { RoyalJavaneseScrollStory } from "@/components/invitation/RoyalJavaneseScrollStory";
import { createDefaultInvitation } from "@/lib/invitation";
import { getRoyalVariant, type RoyalVariant } from "@/lib/royal-variants";

const VARIANT_TEMPLATE_ID: Record<RoyalVariant, string> = {
  javanese: "wedding-royal-javanese-story",
  sundanese: "wedding-royal-sundanese-story",
  minangkabau: "wedding-royal-minangkabau-story",
  bugis: "wedding-royal-bugis-story",
};

const SAMPLE_GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=70",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=900&q=70",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=70",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=70",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=70",
];

const SAMPLE_NAMES: Record<RoyalVariant, { groom: string; bride: string; nickGroom: string; nickBride: string; hashtag: string }> = {
  javanese: { groom: "Raden Bagas Pratama", bride: "Roro Ayu Wulandari", nickGroom: "Bagas", nickBride: "Ayu", hashtag: "#BagasMeminangAyu" },
  sundanese: { groom: "Raden Galih Wibawa", bride: "Nyai Citra Maharani", nickGroom: "Galih", nickBride: "Citra", hashtag: "#GalihNgalapCitra" },
  minangkabau: { groom: "Sutan Reza Pratama", bride: "Puti Anindya Sari", nickGroom: "Reza", nickBride: "Anindya", hashtag: "#RezaMaminangAnindya" },
  bugis: { groom: "Andi Muhammad Akbar", bride: "Andi Tenri Nurhaliza", nickGroom: "Akbar", nickBride: "Tenri", hashtag: "#AkbarSibawaTenri" },
};

export default function RoyalScrollStoryDemo() {
  const { variant } = useParams<{ variant: string }>();
  const v = (variant as RoyalVariant) || "javanese";
  if (!(v in VARIANT_TEMPLATE_ID)) return <Navigate to="/" replace />;

  const theme = getRoyalVariant(v);
  const base = createDefaultInvitation("wedding", VARIANT_TEMPLATE_ID[v]);
  const names = SAMPLE_NAMES[v];
  const invitation = {
    ...base,
    title: `Pernikahan ${names.nickGroom} & ${names.nickBride}`,
    names: [names.groom, names.bride],
    eventDate: "2026-08-22",
    eventTime: "09:00",
    timezone: "WIB",
    locationName: "Pendopo Agung",
    locationAddress: "Jakarta",
    isPaid: true,
    royalJavanese: {
      ...(base.royalJavanese || {}),
      groomFullName: names.groom,
      brideFullName: names.bride,
      groomNickname: names.nickGroom,
      brideNickname: names.nickBride,
      hashtag: names.hashtag,
      milestones: (base.royalJavanese?.milestones || []).map((m, i) => ({
        ...m,
        year: ["2019", "2021", "2023", "2026"][i] || "",
      })),
      gallery: SAMPLE_GALLERY,
      akad: { date: "2026-08-22", time: "08:00", location: "Pendopo Agung, Jakarta", mapsUrl: "" },
      resepsi: { date: "2026-08-22", time: "11:00", location: "Grand Ballroom, Jakarta", mapsUrl: "" },
      rsvpEnabled: true,
      gift: { bankName: "BCA", accountNumber: "1234567890", accountHolder: names.groom, qrisImage: "" },
    },
  };

  return (
    <>
      <SEO
        title={`${theme.label} - Premium Wedding Invitation Demo`}
        description={`Live demo undangan video sinematik bertema ${theme.label}.`}
        canonical={`/preview/royal-story/${v}`}
        noIndex
      />
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
        <span
          className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold px-3 py-1.5 rounded-full border shadow-lg"
          style={{
            background: "rgba(20,16,12,0.75)",
            color: theme.goldSoft,
            borderColor: theme.gold,
            backdropFilter: "blur(8px)",
          }}
        >
          Demo Template — Preview
        </span>
      </div>
      <RoyalJavaneseScrollStory invitation={invitation as any} variant={v} />
    </>
  );
}