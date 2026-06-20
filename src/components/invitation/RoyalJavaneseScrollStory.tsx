import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Gift, Heart, Copy, Check, Crown, Volume2, VolumeX } from "lucide-react";
import type { InvitationData, RoyalJavaneseConfig, RoyalJavaneseMilestone } from "@/lib/invitation";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { RSVPForm } from "@/components/invitation/RSVPForm";
import { GuestBook } from "@/components/invitation/GuestBook";
import { getMusicTrack } from "@/lib/royal-javanese-music";
import defaultOpeningVideo from "@/assets/royal-javanese-opening.mp4.asset.json";

const GOLD = "#C9A227";
const GOLD_SOFT = "#E5C870";
const CHAMPAGNE = "#F5E6C8";
const INK = "#1A1208";
const PARCHMENT = "#FBF4DF";

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=70",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=70",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=70",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=70",
];

// ---- perf detection (lightweight) ----
type PerfTier = "low" | "mid" | "high";
function detectPerf() {
  if (typeof window === "undefined") return { tier: "high" as PerfTier, reduced: false, parallax: true };
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const cores = (navigator as any).hardwareConcurrency ?? 4;
  const mem = (navigator as any).deviceMemory ?? 4;
  const w = window.innerWidth;
  let tier: PerfTier = "high";
  if (cores <= 4 || mem <= 2 || w < 380) tier = "low";
  else if (cores <= 6 || mem <= 4 || w < 768) tier = "mid";
  if (reduced) return { tier: "low" as PerfTier, reduced: true, parallax: false };
  return { tier, reduced: false, parallax: tier !== "low" };
}

function useInView(ref: React.RefObject<HTMLElement>, rootMargin = "200px 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver((e) => setInView(e.some((x) => x.isIntersecting)), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

function BatikBorder() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{
      background: `repeating-linear-gradient(90deg, ${GOLD} 0 6px, transparent 6px 12px, ${GOLD_SOFT} 12px 18px, transparent 18px 24px)`,
      opacity: 0.85,
    }} />
  );
}

function GoldDivider({ width = 120 }: { width?: number }) {
  return (
    <div className="flex items-center justify-center gap-2 my-4" aria-hidden>
      <span className="h-px" style={{ width, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      <Crown className="w-3.5 h-3.5" style={{ color: GOLD }} />
      <span className="h-px" style={{ width, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
    </div>
  );
}

function formatDate(s?: string) {
  if (!s) return "—";
  try { return format(new Date(s), "EEEE, d MMMM yyyy", { locale: idLocale }); } catch { return s; }
}

// ============================ Scenes ============================

function SceneOpening({ cfg, perf }: { cfg: RoyalJavaneseConfig; perf: ReturnType<typeof detectPerf> }) {
  const videoUrl = cfg.openingVideoUrl || defaultOpeningVideo.url;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], perf.parallax ? [0, 120] : [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const couple = cfg.groomNickname && cfg.brideNickname
    ? `${cfg.groomNickname} & ${cfg.brideNickname}`
    : `${cfg.groomFullName || "Mempelai Pria"} & ${cfg.brideFullName || "Mempelai Wanita"}`;

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: INK }}>
      <motion.video
        key={videoUrl}
        src={videoUrl}
        autoPlay muted loop playsInline preload="metadata"
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${INK}50 0%, ${INK}90 70%, ${INK} 100%)` }} />
      <BatikBorder />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2 }}
        className="relative z-10 text-center px-6 max-w-xl"
      >
        <p className="text-xs uppercase tracking-[0.5em]" style={{ color: GOLD_SOFT }}>The Wedding Of</p>
        <GoldDivider width={80} />
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight" style={{ color: CHAMPAGNE, fontFamily: '"Playfair Display", serif' }}>
          {couple}
        </h1>
        {cfg.hashtag && (
          <p className="mt-4 text-sm tracking-widest" style={{ color: GOLD_SOFT }}>{cfg.hashtag}</p>
        )}
        <p className="mt-6 text-xs uppercase tracking-[0.4em] animate-pulse" style={{ color: GOLD_SOFT }}>Scroll untuk membuka cerita ↓</p>
      </motion.div>
    </section>
  );
}

function SceneQuote({ quote }: { quote: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center px-6 py-20" style={{ background: PARCHMENT }}>
      <div aria-hidden className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(${GOLD}30 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }} />
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl text-center"
      >
        <span className="font-serif text-6xl leading-none" style={{ color: GOLD }}>"</span>
        <p className="font-serif text-2xl sm:text-3xl italic leading-relaxed mt-2" style={{ color: INK, fontFamily: '"Playfair Display", serif' }}>
          {quote}
        </p>
        <GoldDivider />
      </motion.blockquote>
    </section>
  );
}

function SceneTimeline({ milestones }: { milestones: RoyalJavaneseMilestone[] }) {
  return (
    <section className="relative py-20 px-6" style={{ background: INK }}>
      <BatikBorder />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD_SOFT }}>Royal Love Story</p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2" style={{ color: CHAMPAGNE, fontFamily: '"Playfair Display", serif' }}>
            Perjalanan Cinta Kami
          </h2>
          <GoldDivider />
        </div>
        <div className="relative">
          <div aria-hidden className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
          {milestones.map((m, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref);
            const isLeft = i % 2 === 0;
            return (
              <div key={i} ref={ref} className={`relative flex flex-col sm:flex-row mb-12 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full mt-2" style={{ background: GOLD, boxShadow: `0 0 0 4px ${INK}, 0 0 12px ${GOLD}` }} />
                <div className="pl-12 sm:pl-0 sm:w-1/2 sm:px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="rounded-lg p-4 border"
                    style={{ background: `${CHAMPAGNE}10`, borderColor: `${GOLD}40` }}
                  >
                    <div className="text-xs tracking-widest" style={{ color: GOLD_SOFT }}>{m.year || "—"}</div>
                    <h3 className="font-serif text-xl mt-1" style={{ color: CHAMPAGNE, fontFamily: '"Playfair Display", serif' }}>
                      {m.title || "Milestone"}
                    </h3>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: `${CHAMPAGNE}cc` }}>
                      {m.description || "Belum diisi."}
                    </p>
                    {m.photo && (
                      <img src={m.photo} alt={m.title} loading="lazy" decoding="async" className="mt-3 w-full rounded object-cover aspect-video" />
                    )}
                  </motion.div>
                </div>
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SceneGallery({ photos }: { photos: string[] }) {
  const list = photos.length > 0 ? photos : FALLBACK_GALLERY;
  return (
    <section className="relative py-20 px-6" style={{ background: PARCHMENT }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>Galeri</p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2" style={{ color: INK, fontFamily: '"Playfair Display", serif' }}>
            Momen Berharga
          </h2>
          <GoldDivider />
        </div>
        <div className="columns-2 sm:columns-3 gap-3 space-y-3 [&>*]:break-inside-avoid">
          {list.map((url, i) => (
            <motion.img
              key={url + i}
              src={url}
              alt={`Foto ${i + 1}`}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="w-full rounded-md object-cover"
              style={{ border: `1px solid ${GOLD}30` }}
            />
          ))}
        </div>
        {photos.length === 0 && (
          <p className="text-center text-xs mt-6 opacity-60">Pasangan belum mengunggah foto — preview menggunakan ilustrasi.</p>
        )}
      </div>
    </section>
  );
}

function EventCard({ title, ev }: { title: string; ev?: { date?: string; time?: string; location?: string; mapsUrl?: string } }) {
  if (!ev || (!ev.date && !ev.location)) return null;
  return (
    <div className="rounded-lg p-5 border text-center" style={{ background: `${CHAMPAGNE}10`, borderColor: `${GOLD}40` }}>
      <h3 className="font-serif text-xl mb-3" style={{ color: GOLD, fontFamily: '"Playfair Display", serif' }}>{title}</h3>
      <div className="flex items-center justify-center gap-2 text-sm" style={{ color: CHAMPAGNE }}>
        <Calendar className="w-4 h-4" />{formatDate(ev.date)}
      </div>
      {ev.time && <div className="mt-1 text-sm" style={{ color: CHAMPAGNE }}>{ev.time} WIB</div>}
      {ev.location && (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-sm" style={{ color: `${CHAMPAGNE}cc` }}>
          <MapPin className="w-4 h-4" />{ev.location}
        </div>
      )}
      {ev.mapsUrl && (
        <a href={ev.mapsUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 px-4 py-2 text-xs rounded font-medium" style={{ background: GOLD, color: INK }}>
          Buka di Google Maps
        </a>
      )}
    </div>
  );
}

function SceneDetails({ cfg }: { cfg: RoyalJavaneseConfig }) {
  return (
    <section className="relative py-20 px-6" style={{ background: INK }}>
      <BatikBorder />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD_SOFT }}>Save The Date</p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2" style={{ color: CHAMPAGNE, fontFamily: '"Playfair Display", serif' }}>Rangkaian Acara</h2>
          <GoldDivider />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <EventCard title="Akad Nikah" ev={cfg.akad} />
          <EventCard title="Resepsi" ev={cfg.resepsi} />
        </div>
      </div>
    </section>
  );
}

function SceneRSVP({ invitation }: { invitation: InvitationData }) {
  return (
    <section className="relative py-20 px-6" style={{ background: PARCHMENT }}>
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>RSVP</p>
        <h2 className="font-serif text-3xl sm:text-4xl mt-2" style={{ color: INK, fontFamily: '"Playfair Display", serif' }}>Konfirmasi Kehadiran</h2>
        <GoldDivider />
      </div>
      {invitation.slug && (
        <div className="max-w-xl mx-auto space-y-6 mt-6">
          <RSVPForm invitationId={invitation.id || ""} primaryColor={GOLD} backgroundColor="#ffffff" textColor={INK} />
          <GuestBook invitationId={invitation.id || ""} primaryColor={GOLD} backgroundColor="#ffffff" textColor={INK} />
        </div>
      )}
    </section>
  );
}

function SceneGift({ cfg }: { cfg: RoyalJavaneseConfig }) {
  const [copied, setCopied] = useState(false);
  const g = cfg.gift;
  if (!g || (!g.bankName && !g.qrisImage)) return null;
  const copy = () => {
    if (!g.accountNumber) return;
    navigator.clipboard?.writeText(g.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="relative py-20 px-6" style={{ background: INK }}>
      <BatikBorder />
      <div className="max-w-md mx-auto text-center">
        <Gift className="w-8 h-8 mx-auto" style={{ color: GOLD }} />
        <h2 className="font-serif text-3xl mt-2" style={{ color: CHAMPAGNE, fontFamily: '"Playfair Display", serif' }}>Wedding Gift</h2>
        <GoldDivider />
        {g.bankName && (
          <div className="rounded-lg p-5 border mt-4" style={{ background: `${CHAMPAGNE}10`, borderColor: `${GOLD}40` }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: GOLD_SOFT }}>{g.bankName}</p>
            <p className="font-mono text-xl mt-2 tracking-wider" style={{ color: CHAMPAGNE }}>{g.accountNumber || "—"}</p>
            <p className="text-sm mt-1" style={{ color: `${CHAMPAGNE}cc` }}>a.n. {g.accountHolder || "—"}</p>
            {g.accountNumber && (
              <button onClick={copy} className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium" style={{ background: GOLD, color: INK }}>
                {copied ? <><Check className="w-3 h-3" /> Tersalin</> : <><Copy className="w-3 h-3" /> Salin No. Rekening</>}
              </button>
            )}
          </div>
        )}
        {g.qrisImage && (
          <div className="mt-4">
            <img src={g.qrisImage} alt="QRIS" className="w-48 h-48 mx-auto object-contain rounded bg-white p-2" />
            <p className="text-xs mt-2" style={{ color: GOLD_SOFT }}>Scan QRIS untuk memberikan tanda cinta</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SceneClosing({ cfg }: { cfg: RoyalJavaneseConfig }) {
  const couple = `${cfg.groomFullName || "Mempelai Pria"} & ${cfg.brideFullName || "Mempelai Wanita"}`;
  return (
    <section className="relative py-24 px-6" style={{ background: INK }}>
      <BatikBorder />
      <div className="max-w-xl mx-auto text-center">
        <Heart className="w-8 h-8 mx-auto" style={{ color: GOLD }} />
        <GoldDivider />
        <p className="text-sm leading-relaxed" style={{ color: `${CHAMPAGNE}cc` }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <p className="font-serif text-2xl mt-6" style={{ color: CHAMPAGNE, fontFamily: '"Playfair Display", serif' }}>{couple}</p>
        {cfg.hashtag && <p className="mt-3 text-xs tracking-[0.3em]" style={{ color: GOLD_SOFT }}>{cfg.hashtag}</p>}
        <p className="mt-10 text-[10px] uppercase tracking-[0.4em] opacity-50" style={{ color: GOLD_SOFT }}>Royal Javanese Wedding Story</p>
      </div>
    </section>
  );
}

// ============================ Main ============================

export function RoyalJavaneseScrollStory({ invitation }: { invitation: InvitationData }) {
  const [perf] = useState(detectPerf);
  const cfg: RoyalJavaneseConfig = invitation.royalJavanese || {};
  const milestones: RoyalJavaneseMilestone[] = (cfg.milestones && cfg.milestones.length > 0 ? cfg.milestones : [
    { title: "Pertama Bertemu", year: "", description: "Belum diisi." },
    { title: "Mulai Dekat", year: "", description: "Belum diisi." },
    { title: "Janji Sehidup", year: "", description: "Belum diisi." },
    { title: "Menuju Pelaminan", year: "", description: "Belum diisi." },
  ]);
  const quote = cfg.openingQuote || "Sebuah kisah cinta yang ditulis oleh takdir.";
  const gallery = cfg.gallery || [];

  // Music
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const musicSrc = useMemo(() => cfg.musicUrl || getMusicTrack(cfg.musicLibraryId)?.url, [cfg.musicUrl, cfg.musicLibraryId]);

  useEffect(() => {
    if (!musicSrc) return;
    const a = new Audio(musicSrc);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    return () => { a.pause(); audioRef.current = null; };
  }, [musicSrc]);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (muted) { a.play().catch(() => {}); setMuted(false); }
    else { a.pause(); setMuted(true); }
  };

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative w-full" style={{ background: INK, color: CHAMPAGNE }}>
      {/* Top progress bar */}
      {!perf.reduced && (
        <motion.div
          aria-hidden
          style={{ scaleX: progressScale, transformOrigin: "0% 50%", background: `linear-gradient(90deg, ${GOLD_SOFT}, ${GOLD})` }}
          className="fixed top-0 left-0 right-0 h-[3px] z-50"
        />
      )}

      {/* Music toggle */}
      {musicSrc && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: GOLD, color: INK }}
          aria-label={muted ? "Mainkan musik" : "Matikan musik"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      <SceneOpening cfg={cfg} perf={perf} />
      <SceneQuote quote={quote} />
      <SceneTimeline milestones={milestones.slice(0, 4)} />
      <SceneGallery photos={gallery} />
      <SceneDetails cfg={cfg} />
      {cfg.rsvpEnabled !== false && <SceneRSVP invitation={invitation} />}
      <SceneGift cfg={cfg} />
      <SceneClosing cfg={cfg} />
    </div>
  );
}

export default RoyalJavaneseScrollStory;