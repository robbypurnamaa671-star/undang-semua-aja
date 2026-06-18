import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Calendar, MapPin, Heart, Gift, Copy, Check } from "lucide-react";
import type { InvitationData, CinematicJourneyCard } from "@/lib/invitation";

/**
 * Production renderer for the "Cinematic Scroll Story" wedding template.
 * Reads everything from the supplied `invitation` (with safe fallbacks) so the
 * editor's input panel maps 1:1 to what's rendered here.
 */

const IVORY = "#FBF7EF";
const CHAMP = "#D9B679";
const CHAMP_SOFT = "#E8C98E";
const INK = "#1A1612";

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=70",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=70",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&q=70",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=70",
];

// ---------------- perf detection ----------------
type PerfTier = "low" | "mid" | "high";
interface Perf {
  tier: PerfTier;
  reduced: boolean;
  particleScale: number;
  enableParallax: boolean;
  enableHeavyShadows: boolean;
}
function detectPerf(): Perf {
  if (typeof window === "undefined") {
    return { tier: "high", reduced: false, particleScale: 1, enableParallax: true, enableHeavyShadows: true };
  }
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const cores = (navigator as any).hardwareConcurrency ?? 4;
  const mem = (navigator as any).deviceMemory ?? 4;
  const w = window.innerWidth;
  const saveData = (navigator as any).connection?.saveData === true;
  const slowNet = ["slow-2g", "2g", "3g"].includes((navigator as any).connection?.effectiveType ?? "");
  let tier: PerfTier = "high";
  if (cores <= 4 || mem <= 2 || w < 380 || saveData || slowNet) tier = "low";
  else if (cores <= 6 || mem <= 4 || w < 768) tier = "mid";
  if (reduced) return { tier: "low", reduced: true, particleScale: 0, enableParallax: false, enableHeavyShadows: false };
  const particleScale = tier === "low" ? 0.25 : tier === "mid" ? 0.55 : 1;
  return { tier, reduced: false, particleScale, enableParallax: tier !== "low", enableHeavyShadows: tier === "high" };
}
function usePerf(): Perf {
  const [perf, setPerf] = useState<Perf>(() => detectPerf());
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPerf(detectPerf());
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return perf;
}
function LazyMount({ children, minHeight = "100vh", rootMargin = "400px 0px" }: { children: React.ReactNode; minHeight?: string; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (shown || !ref.current || typeof IntersectionObserver === "undefined") { if (!shown) setShown(true); return; }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect(); } }, { rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown, rootMargin]);
  return <div ref={ref} style={{ minHeight: shown ? undefined : minHeight }}>{shown ? children : null}</div>;
}
function useInView(ref: React.RefObject<HTMLElement>, rootMargin = "200px 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

function Particles({ count = 30, color = CHAMP, opacity = 0.5 }: { count?: number; color?: string; opacity?: number }) {
  const perf = usePerf();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, "100px 0px");
  const finalCount = Math.max(0, Math.round(count * perf.particleScale));
  const items = useMemo(() => Array.from({ length: finalCount }).map((_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 8, duration: 8 + Math.random() * 10,
    size: 2 + Math.random() * 4, drift: (Math.random() - 0.5) * 40,
  })), [finalCount]);
  if (perf.reduced || finalCount === 0) return <div ref={wrapRef} className="pointer-events-none absolute inset-0" aria-hidden />;
  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {inView && items.map((p) => (
        <span key={p.id} style={{
          position: "absolute", left: `${p.left}%`, bottom: -20, width: p.size, height: p.size,
          background: color, opacity, borderRadius: "50%",
          ...(perf.enableHeavyShadows ? { filter: "blur(0.5px)", boxShadow: `0 0 8px ${color}` } : null),
          animation: `csFloat ${p.duration}s linear ${p.delay}s infinite`,
          animationPlayState: inView ? "running" : "paused",
          willChange: "transform, opacity",
          ["--drift" as any]: `${p.drift}px`,
        }} />
      ))}
    </div>
  );
}
function Petals({ count = 14 }: { count?: number }) {
  const perf = usePerf();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, "100px 0px");
  const finalCount = Math.max(0, Math.round(count * perf.particleScale));
  const items = useMemo(() => Array.from({ length: finalCount }).map((_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 6, duration: 9 + Math.random() * 8,
    rotate: Math.random() * 360, size: 10 + Math.random() * 14,
  })), [finalCount]);
  if (perf.reduced || finalCount === 0) return <div ref={wrapRef} className="pointer-events-none absolute inset-0" aria-hidden />;
  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {inView && items.map((p) => (
        <span key={p.id} style={{
          position: "absolute", top: -30, left: `${p.left}%`, width: p.size, height: p.size,
          transform: `rotate(${p.rotate}deg)`,
          animation: `csPetal ${p.duration}s linear ${p.delay}s infinite`,
          animationPlayState: inView ? "running" : "paused",
          willChange: "transform, opacity",
        }}>
          <svg viewBox="0 0 20 20" width="100%" height="100%">
            <path d="M10 1 C14 5 18 8 10 19 C2 8 6 5 10 1 Z" fill="#F4D3D8" stroke="#E2A6AE" strokeWidth="0.4" opacity="0.9" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function useCountdown(target: number) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => { const id = setInterval(() => setT(diff(target)), 1000); return () => clearInterval(id); }, [target]);
  return t;
}
function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}
function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative min-w-[68px] sm:min-w-[88px] px-3 py-4 sm:py-5 rounded-2xl border" style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(251,247,239,0.7))",
        borderColor: CHAMP_SOFT,
        boxShadow: `0 10px 30px -12px ${CHAMP}55, inset 0 1px 0 rgba(255,255,255,0.8)`,
        backdropFilter: "blur(8px)",
      }}>
        <AnimatePresence mode="popLayout">
          <motion.div key={value} initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-5xl text-center tabular-nums" style={{ color: INK }}>
            {String(value).padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase" style={{ color: CHAMP }}>{label}</div>
    </div>
  );
}
function Scene({ id, children, style }: { id: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return <section id={id} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={style}>{children}</section>;
}

// ---------------- helpers ----------------
function buildEventDate(invitation: InvitationData): { iso: string; ms: number; valid: boolean } {
  const date = invitation.eventDate;
  const time = invitation.eventTime || "10:00";
  if (date) {
    const iso = `${date}T${time}:00`;
    const ms = new Date(iso).getTime();
    if (!isNaN(ms)) return { iso, ms, valid: true };
  }
  const fallback = new Date(Date.now() + 90 * 86400000);
  return { iso: fallback.toISOString(), ms: fallback.getTime(), valid: false };
}

interface Props { invitation: InvitationData }

export function CinematicScrollStory({ invitation }: Props) {
  const groom = invitation.names?.[0] || "Mempelai Pria";
  const bride = invitation.names?.[1] || invitation.names?.[0] || "Mempelai Wanita";
  const venue = invitation.locationName || "Lokasi Acara";
  const location = invitation.locationAddress || invitation.locationName || "";
  const { iso: eventIso, ms: eventMs } = buildEventDate(invitation);

  const cin = invitation.cinematic || {};
  const gallery = invitation.galleryImages || [];

  const cards: CinematicJourneyCard[] = (cin.journeyCards && cin.journeyCards.length > 0
    ? cin.journeyCards
    : [
        { year: "", title: "First Date", text: "Momen pertama yang tak terlupakan." },
        { year: "", title: "First Adventure", text: "Perjalanan kecil yang mempererat janji kami." },
        { year: "", title: "First Dream Together", text: "Saat kami mulai merangkai mimpi yang sama." },
      ]
  ).slice(0, 3);

  const firstMeetingImg = cin.firstMeetingImage || invitation.coverImage || gallery[0] || FALLBACK_PHOTOS[0];
  const venueHero = cin.venueHeroImage || gallery[gallery.length - 1] || FALLBACK_PHOTOS[4];
  const cardImg = (i: number) => cards[i]?.image || gallery[i + 1] || FALLBACK_PHOTOS[(i + 1) % FALLBACK_PHOTOS.length];

  return (
    <main
      data-template="wedding-cinematic-scroll-story"
      className="w-full"
      style={{ background: IVORY, color: INK, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes csFloat { 0% { transform: translate3d(0,0,0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate3d(var(--drift,0), -110vh, 0); opacity: 0; } }
        @keyframes csPetal { 0% { transform: translate3d(0,0,0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate3d(40px, 110vh, 0) rotate(540deg); opacity: 0; } }
      `}</style>
      <ScrollProgress />

      <HeroScene groom={groom} bride={bride} tagline={cin.heroTagline || "A Love Story Written By Destiny"} />
      <LazyMount>
        <FirstMeetingScene
          year={cin.firstMeetingYear || ""}
          title={cin.firstMeetingTitle || "Pertama Kali Bertemu"}
          story={cin.firstMeetingStory || "Awal kisah kami dimulai dari pertemuan sederhana yang tak akan pernah kami lupakan."}
          image={firstMeetingImg}
        />
      </LazyMount>
      <LazyMount minHeight="260vh">
        <JourneyScene cards={cards} cardImg={cardImg} />
      </LazyMount>
      <LazyMount>
        <ProposalScene headline={cin.proposalHeadline || "Will You Marry Me?"} />
      </LazyMount>
      <LazyMount>
        <CountdownScene targetMs={eventMs} eventIso={eventIso} timezone={invitation.timezone} />
      </LazyMount>
      <LazyMount>
        <VenueScene venue={venue} location={location} image={venueHero} />
      </LazyMount>
      <LazyMount>
        <DetailsScene eventIso={eventIso} venue={venue} location={location} timezone={invitation.timezone} mapUrl={invitation.locationMapUrl} groom={groom} bride={bride} />
      </LazyMount>
      <LazyMount>
        <RSVPScene />
      </LazyMount>
      {invitation.bankAccounts && invitation.bankAccounts.length > 0 && (
        <LazyMount><GiftScene accounts={invitation.bankAccounts} /></LazyMount>
      )}
      <LazyMount>
        <ClosingScene groom={groom} bride={bride} tagline={cin.closingTagline || "We Look Forward To Celebrating With You"} />
      </LazyMount>
    </main>
  );
}

// ---------------- scenes ----------------
function HeroScene({ groom, bride, tagline }: { groom: string; bride: string; tagline: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const perf = usePerf();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  return (
    <div ref={ref}>
      <Scene id="scene-1" style={{ background: `radial-gradient(120% 80% at 50% 30%, #2a221b 0%, #14100c 60%, #0a0806 100%)` }}>
        <motion.div style={perf.enableParallax ? { scale } : undefined} className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(60% 40% at 50% 45%, rgba(217,182,121,0.18), transparent 70%)" }} />
          <Particles count={45} color={CHAMP} opacity={0.65} />
        </motion.div>
        <motion.div style={perf.enableParallax ? { y, opacity } : undefined} className="relative z-10 text-center px-6 max-w-2xl">
          <motion.p initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.4, ease: "easeOut" }} className="text-[10px] sm:text-xs uppercase mb-6" style={{ color: CHAMP_SOFT }}>The Wedding Of</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="font-serif text-5xl sm:text-7xl leading-tight" style={{ color: IVORY, textShadow: "0 4px 30px rgba(217,182,121,0.35)" }}>{groom.split(" ")[0]}</motion.h1>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="my-3 sm:my-4 font-serif text-3xl sm:text-5xl italic" style={{ color: CHAMP }}>&amp;</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }} className="font-serif text-5xl sm:text-7xl leading-tight" style={{ color: IVORY, textShadow: "0 4px 30px rgba(217,182,121,0.35)" }}>{bride.split(" ")[0]}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.8 }} className="mt-8 text-sm sm:text-base italic" style={{ color: "#E9DCC2" }}>“{tagline}”</motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2.4 }} className="mt-12 flex flex-col items-center gap-2" style={{ color: CHAMP_SOFT }}>
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-px h-10" style={{ background: `linear-gradient(180deg, ${CHAMP}, transparent)` }} />
          </motion.div>
        </motion.div>
      </Scene>
    </div>
  );
}

function FirstMeetingScene({ year, title, story, image }: { year: string; title: string; story: string; image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const perf = usePerf();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yText = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  return (
    <div ref={ref}>
      <Scene id="scene-2" style={{ background: IVORY }}>
        <Particles count={20} color={CHAMP} opacity={0.35} />
        <div className="relative z-10 max-w-4xl w-full px-6 grid sm:grid-cols-2 gap-10 items-center">
          <motion.div style={perf.enableParallax ? { y: yPhoto } : undefined} className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden" style={{ boxShadow: `0 30px 60px -20px ${INK}40` }}>
              <img src={image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -inset-3 rounded-2xl border pointer-events-none" style={{ borderColor: CHAMP, opacity: 0.4 }} />
          </motion.div>
          <motion.div style={perf.enableParallax ? { y: yText } : undefined}>
            <div className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: CHAMP }}>Scene · 02</div>
            {year && (
              <div className="font-serif text-7xl sm:text-8xl leading-none mb-3" style={{ color: CHAMP, textShadow: `0 2px 0 ${INK}10` }}>{year}</div>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: INK }}>{title}</h2>
            <div className="w-16 h-px mb-4" style={{ background: CHAMP }} />
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#3a3128" }}>{story}</p>
          </motion.div>
        </div>
      </Scene>
    </div>
  );
}

function JourneyScene({ cards, cardImg }: { cards: CinematicJourneyCard[]; cardImg: (i: number) => string }) {
  const ref = useRef<HTMLDivElement>(null);
  const perf = usePerf();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-65%"]);
  const xSmooth = useSpring(x, { stiffness: perf.tier === "low" ? 120 : 80, damping: perf.tier === "low" ? 30 : 20, mass: 0.4 });
  return (
    <div ref={ref} style={{ height: perf.tier === "low" ? "200vh" : "260vh", background: "#0f0c08", position: "relative" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <Particles count={25} color={CHAMP} opacity={0.4} />
        <div className="relative z-10 pt-16 pb-8 text-center px-6">
          <div className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: CHAMP }}>Scene · 03</div>
          <h2 className="font-serif text-3xl sm:text-5xl" style={{ color: IVORY }}>Our Love Story</h2>
        </div>
        <div className="flex-1 flex items-center">
          <motion.div style={{ x: perf.enableParallax ? xSmooth : x }} className="flex gap-6 sm:gap-10 pl-[5%] pr-[10%] will-change-transform">
            {cards.map((c, i) => (
              <div key={i} className="shrink-0 w-[78vw] sm:w-[42vw] max-w-[460px] rounded-2xl overflow-hidden border" style={{
                background: "linear-gradient(180deg, #1c160f, #110d08)",
                borderColor: `${CHAMP}55`,
                boxShadow: perf.enableHeavyShadows ? `0 30px 80px -30px ${CHAMP}55` : `0 8px 20px -10px #00000088`,
              }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cardImg(i)} alt={c.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 sm:p-6">
                  {c.year && <div className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: CHAMP }}>{c.year}</div>}
                  <h3 className="font-serif text-2xl sm:text-3xl mb-2" style={{ color: IVORY }}>{c.title}</h3>
                  <p className="text-sm" style={{ color: "#cdbf9d" }}>{c.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProposalScene({ headline }: { headline: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const perf = usePerf();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.1, 1.3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 25]);
  return (
    <div ref={ref}>
      <Scene id="scene-4" style={{ background: "radial-gradient(circle at 50% 50%, #1a1410 0%, #0a0806 70%)" }}>
        <Particles count={30} color={CHAMP} opacity={0.5} />
        <motion.div style={perf.enableParallax ? { scale, rotate } : undefined} className="relative z-10 flex items-center justify-center">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <defs>
              <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={CHAMP_SOFT} stopOpacity="0.7" /><stop offset="100%" stopColor={CHAMP} stopOpacity="0" /></radialGradient>
              <linearGradient id="ringBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#F8E3B5" /><stop offset="50%" stopColor={CHAMP} /><stop offset="100%" stopColor="#8B6A35" /></linearGradient>
            </defs>
            <circle cx="110" cy="120" r="100" fill="url(#ringGlow)" />
            <circle cx="110" cy="130" r="55" fill="none" stroke="url(#ringBody)" strokeWidth="10" />
            <polygon points="110,40 100,60 120,60" fill="url(#ringBody)" stroke="#FFF1CC" strokeWidth="1" />
            <circle cx="110" cy="48" r="6" fill="#FFFDF6" opacity="0.9" />
          </svg>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="absolute bottom-24 left-0 right-0 text-center font-serif text-3xl sm:text-5xl italic px-6" style={{ color: IVORY, textShadow: `0 4px 30px ${CHAMP}80` }}>{headline}</motion.h2>
      </Scene>
    </div>
  );
}

function CountdownScene({ targetMs, eventIso, timezone }: { targetMs: number; eventIso: string; timezone?: string }) {
  const t = useCountdown(targetMs);
  const display = new Date(eventIso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  return (
    <Scene id="scene-5" style={{ background: `linear-gradient(180deg, ${IVORY} 0%, #F3E8D2 100%)` }}>
      <Particles count={18} color={CHAMP} opacity={0.4} />
      <div className="relative z-10 text-center px-6">
        <div className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: CHAMP }}>Scene · 05</div>
        <h2 className="font-serif text-3xl sm:text-5xl mb-2" style={{ color: INK }}>Menuju Hari Bahagia</h2>
        <p className="text-sm mb-10" style={{ color: "#6b5b40" }}>{display}{timezone ? ` (${timezone})` : ""}</p>
        <div className="flex justify-center gap-3 sm:gap-5">
          <CountUnit value={t.d} label="Days" /><CountUnit value={t.h} label="Hours" /><CountUnit value={t.m} label="Minutes" /><CountUnit value={t.s} label="Seconds" />
        </div>
      </div>
    </Scene>
  );
}

function VenueScene({ venue, location, image }: { venue: string; location: string; image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const perf = usePerf();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const midY = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]);
  return (
    <div ref={ref}>
      <Scene id="scene-6" style={{ background: "#0a0806" }}>
        <motion.div style={perf.enableParallax ? { y: bgY, scale: bgScale } : undefined} className="absolute inset-0">
          <img src={image} alt={venue} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.25) 40%, rgba(10,8,6,0.85) 100%)" }} />
        </motion.div>
        <motion.div style={perf.enableParallax ? { y: midY } : undefined} className="relative z-10 text-center px-6">
          <div className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: CHAMP_SOFT }}>Scene · 06</div>
          <h2 className="font-serif text-4xl sm:text-6xl mb-3" style={{ color: IVORY }}>The Venue</h2>
          <div className="w-16 h-px mx-auto mb-4" style={{ background: CHAMP }} />
          <p className="text-lg sm:text-xl" style={{ color: CHAMP_SOFT }}>{venue}</p>
          {location && <p className="text-sm mt-1" style={{ color: "#cdbf9d" }}>{location}</p>}
        </motion.div>
      </Scene>
    </div>
  );
}

function DetailsScene({ eventIso, venue, location, timezone, mapUrl, groom, bride }: { eventIso: string; venue: string; location: string; timezone?: string; mapUrl?: string; groom: string; bride: string }) {
  const dt = new Date(eventIso);
  const date = dt.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const time = dt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + (timezone ? ` ${timezone}` : "");
  const mapsUrl = mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue + " " + location)}`;
  const calStart = dt.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const calEnd = new Date(dt.getTime() + 4 * 3600000).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Pernikahan " + groom + " & " + bride)}&dates=${calStart}/${calEnd}&location=${encodeURIComponent(venue + ", " + location)}`;
  return (
    <Scene id="scene-7" style={{ background: IVORY }}>
      <Particles count={14} color={CHAMP} opacity={0.3} />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 w-full max-w-md mx-auto px-6 text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: CHAMP }}>Scene · 07</div>
        <h2 className="font-serif text-3xl sm:text-4xl mb-6" style={{ color: INK }}>Wedding Details</h2>
        <div className="rounded-2xl p-6 sm:p-8 mb-5 border" style={{ background: "linear-gradient(180deg, #ffffff, #FBF4E3)", borderColor: CHAMP_SOFT, boxShadow: `0 20px 60px -20px ${CHAMP}55` }}>
          <div className="flex items-center justify-center gap-2 mb-3" style={{ color: CHAMP }}><Calendar className="w-4 h-4" /><span className="text-[10px] tracking-[0.4em] uppercase">Tanggal &amp; Waktu</span></div>
          <p className="font-serif text-xl sm:text-2xl" style={{ color: INK }}>{date}</p>
          <p className="text-sm mt-1" style={{ color: "#6b5b40" }}>{time}</p>
          <div className="my-5 h-px" style={{ background: CHAMP_SOFT, opacity: 0.5 }} />
          <div className="flex items-center justify-center gap-2 mb-2" style={{ color: CHAMP }}><MapPin className="w-4 h-4" /><span className="text-[10px] tracking-[0.4em] uppercase">Lokasi</span></div>
          <p className="font-serif text-lg" style={{ color: INK }}>{venue}</p>
          {location && <p className="text-sm" style={{ color: "#6b5b40" }}>{location}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-full text-sm font-medium tracking-wide transition-transform hover:scale-[1.02]" style={{ background: INK, color: IVORY }}>Lihat Lokasi</a>
          <a href={calUrl} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-full text-sm font-medium tracking-wide border transition-transform hover:scale-[1.02]" style={{ borderColor: CHAMP, color: INK, background: "transparent" }}>Simpan Kalender</a>
        </div>
      </motion.div>
    </Scene>
  );
}

function RSVPScene() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "maybe" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  return (
    <Scene id="scene-8" style={{ background: "linear-gradient(180deg, #F3E8D2 0%, #FBF7EF 100%)" }}>
      <Particles count={12} color={CHAMP} opacity={0.35} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9 }} className="relative z-10 w-full max-w-md mx-auto px-6 text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: CHAMP }}>Scene · 08</div>
        <h2 className="font-serif text-3xl sm:text-4xl mb-2" style={{ color: INK }}>Kindly RSVP</h2>
        <p className="text-sm mb-6" style={{ color: "#6b5b40" }}>Konfirmasi kehadiran Anda untuk kami.</p>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} onSubmit={(e) => { e.preventDefault(); if (name && attendance) setSubmitted(true); }} className="rounded-2xl p-6 border" style={{ background: "#fff", borderColor: CHAMP_SOFT, boxShadow: `0 20px 50px -20px ${CHAMP}55` }}>
              <input type="text" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" className="w-full px-4 py-3 rounded-full text-sm border outline-none mb-4 focus:ring-2" style={{ borderColor: CHAMP_SOFT, color: INK, background: IVORY }} />
              <div className="grid grid-cols-3 gap-2 mb-4">
                {([["yes", "Hadir"], ["maybe", "Mungkin"], ["no", "Tidak"]] as const).map(([v, l]) => (
                  <button type="button" key={v} onClick={() => setAttendance(v)} className="py-2.5 text-xs rounded-full border transition-all" style={{ borderColor: attendance === v ? CHAMP : CHAMP_SOFT, background: attendance === v ? CHAMP : "transparent", color: attendance === v ? "#fff" : INK }}>{l}</button>
                ))}
              </div>
              <button type="submit" disabled={!name || !attendance} className="w-full py-3 rounded-full text-sm font-medium disabled:opacity-40 transition-transform hover:scale-[1.02]" style={{ background: INK, color: IVORY }}>Kirim RSVP</button>
            </motion.form>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-8 border" style={{ background: "#fff", borderColor: CHAMP_SOFT, boxShadow: `0 20px 50px -20px ${CHAMP}55` }}>
              <Heart className="w-10 h-10 mx-auto mb-3" style={{ color: CHAMP }} />
              <p className="font-serif text-xl" style={{ color: INK }}>Terima kasih, {name}!</p>
              <p className="text-sm mt-2" style={{ color: "#6b5b40" }}>Konfirmasi Anda telah kami terima.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Scene>
  );
}

function GiftScene({ accounts }: { accounts: { bankName: string; accountNumber: string; accountHolder: string }[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (val: string) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(() => setCopied(null), 1500); };
  return (
    <Scene id="scene-9" style={{ background: "radial-gradient(80% 60% at 50% 40%, #2a221b 0%, #14100c 70%, #0a0806 100%)" }}>
      <Particles count={25} color={CHAMP} opacity={0.45} />
      <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center">
        <div className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: CHAMP_SOFT }}>Scene · 09</div>
        <Gift className="w-8 h-8 mx-auto mb-3" style={{ color: CHAMP }} />
        <h2 className="font-serif text-3xl sm:text-4xl mb-2" style={{ color: IVORY }}>Wedding Gift</h2>
        <p className="text-sm mb-6" style={{ color: "#cdbf9d" }}>Doa restu Anda adalah hadiah terindah.</p>
        <div className="space-y-3">
          {accounts.map((a, i) => (
            <motion.div key={`${a.accountNumber}-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl p-5 border text-left flex items-center justify-between" style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(217,182,121,0.35)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: CHAMP }}>{a.bankName}</div>
                <div className="font-serif text-lg mt-1" style={{ color: IVORY }}>{a.accountNumber}</div>
                <div className="text-xs mt-0.5" style={{ color: "#cdbf9d" }}>a.n. {a.accountHolder}</div>
              </div>
              <button onClick={() => copy(a.accountNumber)} className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-transform hover:scale-110" style={{ borderColor: CHAMP, color: CHAMP }} aria-label="Salin nomor rekening">
                {copied === a.accountNumber ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

function ClosingScene({ groom, bride, tagline }: { groom: string; bride: string; tagline: string }) {
  return (
    <Scene id="scene-10" style={{ background: `linear-gradient(180deg, ${IVORY} 0%, #F5E9CF 100%)` }}>
      <Petals count={18} />
      <Particles count={15} color={CHAMP} opacity={0.4} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative z-10 text-center px-6">
        <Heart className="w-8 h-8 mx-auto mb-4" style={{ color: CHAMP }} />
        <h2 className="font-serif text-5xl sm:text-7xl italic mb-4" style={{ color: INK }}>Thank You</h2>
        <p className="max-w-md mx-auto text-sm sm:text-base" style={{ color: "#5a4a30" }}>{tagline}</p>
        <div className="mt-10">
          <div className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: CHAMP }}>With Love</div>
          <p className="font-serif text-2xl" style={{ color: INK }}>{groom} &amp; {bride}</p>
        </div>
      </motion.div>
    </Scene>
  );
}

function ScrollProgress() {
  const perf = usePerf();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  if (perf.reduced) return null;
  return <motion.div style={{ scaleX: perf.tier === "low" ? scrollYProgress : scaleX, transformOrigin: "0% 50%", background: CHAMP }} className="fixed top-0 left-0 right-0 h-[2px] z-50" />;
}