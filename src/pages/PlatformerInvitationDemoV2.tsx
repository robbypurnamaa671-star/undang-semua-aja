import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Heart, RotateCcw, Sparkles, Star, Trophy, ArrowDown } from "lucide-react";

/**
 * DEMO ONLY — Platformer Undangan v2 (lebih atraktif).
 * Route: /demo/platformer-invitation-v2
 *
 * Peningkatan vs v1:
 * - Karakter lompat ke lantai berikutnya sambil MENGUMPULKAN hati & bintang
 *   yang melayang di antara section. Setiap koin terkumpul = skor naik +
 *   confetti kecil.
 * - Progress bar emas di atas + skor + medali saat finish.
 * - Parallax langit (awan + bulan + bintang berkelip) + lantai marmer.
 * - Karakter dianimasikan (idle bob, jump squash, trailing sparkles).
 * - Tombol besar "LOMPAT" di mobile + tap di mana saja + spasi/arrow.
 * - Tiap lantai punya "misi mini": tap hati untuk membuka konten section.
 */

const _params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
const COUPLE = `${_params.get("groom") || "Raka"} \u0026 ${_params.get("bride") || "Aulia"}`;
const COUPLE_DATE = _params.get("date") || "Sabtu, 12 September 2026";

const SECTIONS = [
  {
    key: "cover",
    label: "Pembuka",
    title: "The Wedding of",
    mission: "Tap hati untuk membuka undangan",
    content: (
      <>
        <h1 className="text-4xl md:text-6xl font-serif mt-3 bg-gradient-to-r from-[#7a4f1d] via-[#c0392b] to-[#7a4f1d] bg-clip-text text-transparent">
          {COUPLE}
        </h1>
        <p className="mt-3 italic opacity-70">{COUPLE_DATE}</p>
      </>
    ),
  },
  {
    key: "story",
    label: "Kisah",
    title: "Kisah Kami",
    mission: "Kumpulkan bintang kenangan",
    content: (
      <p className="max-w-md mx-auto text-sm leading-relaxed">
        Kami bertemu di sebuah kafe kecil di Jogja pada 2022. Setelah perjalanan
        panjang penuh tawa dan doa, kami memutuskan melanjutkan langkah bersama.
      </p>
    ),
  },
  {
    key: "akad",
    label: "Akad",
    title: "Akad Nikah",
    mission: "Lompat ke prosesi sakral",
    content: (
      <div className="text-sm space-y-1">
        <p>Sabtu, 12 September 2026</p>
        <p>08:00 WIB</p>
        <p>Masjid Al-Hikmah, Jakarta</p>
      </div>
    ),
  },
  {
    key: "resepsi",
    label: "Resepsi",
    title: "Resepsi",
    mission: "Hampir sampai pesta!",
    content: (
      <div className="text-sm space-y-1">
        <p>Sabtu, 12 September 2026</p>
        <p>11:00 — 14:00 WIB</p>
        <p>Graha Bahagia, Jakarta Selatan</p>
      </div>
    ),
  },
  {
    key: "rsvp",
    label: "RSVP",
    title: "Konfirmasi Kehadiran",
    mission: "Selesaikan misi & dapatkan medali",
    content: (
      <p className="max-w-md mx-auto text-sm">
        Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i melalui tombol RSVP di
        undangan asli. Terima kasih atas doa dan restunya.
      </p>
    ),
  },
];

const FLOOR_HEIGHT = 560;

type Coin = { id: string; floor: number; x: number; y: number; kind: "heart" | "star"; taken: boolean };

export default function PlatformerInvitationDemoV2() {
  const [floor, setFloor] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [facing, setFacing] = useState<"left" | "right">("left");
  const [score, setScore] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [unlocked, setUnlocked] = useState<boolean[]>(() => SECTIONS.map((_, i) => i === 0));

  // Generate floating coins between floors (deterministic so they don't jitter on re-render).
  const coins = useMemo<Coin[]>(() => {
    const out: Coin[] = [];
    SECTIONS.forEach((_, i) => {
      const n = 3 + (i % 2);
      for (let k = 0; k < n; k++) {
        out.push({
          id: `c-${i}-${k}`,
          floor: i,
          x: 15 + ((k * 73 + i * 31) % 70),
          y: 25 + ((k * 41 + i * 17) % 50),
          kind: k % 2 === 0 ? "heart" : "star",
          taken: false,
        });
      }
    });
    return out;
  }, []);
  const [taken, setTaken] = useState<Record<string, boolean>>({});

  const collect = (c: Coin, e: React.MouseEvent) => {
    if (taken[c.id]) return;
    e.stopPropagation();
    setTaken((t) => ({ ...t, [c.id]: true }));
    setScore((s) => s + (c.kind === "heart" ? 10 : 5));
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 700);
  };

  const jumpDown = useCallback(() => {
    setFloor((f) => {
      if (f >= SECTIONS.length - 1) return f;
      const next = f + 1;
      setJumping(true);
      setFacing((p) => (p === "left" ? "right" : "left"));
      setUnlocked((u) => {
        const c = [...u];
        c[next] = true;
        return c;
      });
      setScore((s) => s + 20);
      const el = document.getElementById(`floor-${next}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setJumping(false), 650);
      return next;
    });
  }, []);

  const reset = () => {
    setFloor(0);
    setScore(0);
    setTaken({});
    setUnlocked(SECTIONS.map((_, i) => i === 0));
    document.getElementById("floor-0")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["Space", "ArrowDown", "Enter"].includes(e.code)) {
        e.preventDefault();
        jumpDown();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jumpDown]);

  const progress = ((floor + 1) / SECTIONS.length) * 100;
  const finished = floor === SECTIONS.length - 1;

  return (
    <div className="relative bg-gradient-to-b from-[#1a0f2e] via-[#2a1845] to-[#fdf6ec] text-[#3a1f0a] font-serif overflow-hidden">
      {/* Parallax sky for first viewport */}
      <Sky />

      {/* Top HUD */}
      <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-2xl px-3 pt-3 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/85 backdrop-blur border border-amber-300/70 shadow-lg text-xs">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-bold tabular-nums text-amber-700">{score}</span>
            <span className="opacity-50">•</span>
            <span>Lantai {floor + 1}/{SECTIONS.length}</span>
            <div className="flex-1 mx-2 h-1.5 rounded-full bg-amber-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button
              onClick={reset}
              className="p-1.5 rounded-full hover:bg-amber-100 text-amber-700"
              aria-label="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floors */}
      <div onClick={jumpDown} className="cursor-pointer select-none">
        {SECTIONS.map((s, i) => (
          <section
            key={s.key}
            id={`floor-${i}`}
            className="relative flex flex-col items-center justify-center text-center px-6"
            style={{
              height: `${FLOOR_HEIGHT}px`,
              background:
                i === 0
                  ? "transparent"
                  : i % 2 === 0
                  ? "linear-gradient(180deg, rgba(253,246,236,0.0), rgba(253,246,236,0.95))"
                  : "linear-gradient(180deg, rgba(247,231,200,0.0), rgba(247,231,200,0.95))",
            }}
          >
            {/* Floating coins for this floor */}
            {coins
              .filter((c) => c.floor === i)
              .map((c) => (
                <button
                  key={c.id}
                  onClick={(e) => collect(c, e)}
                  disabled={taken[c.id] || floor < i}
                  className={`absolute z-20 transition-all duration-300 ${
                    taken[c.id]
                      ? "opacity-0 scale-0"
                      : floor < i
                      ? "opacity-30"
                      : "opacity-100 hover:scale-125 animate-bounce"
                  }`}
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                    animationDelay: `${(c.x % 7) * 0.15}s`,
                  }}
                  aria-label="coin"
                >
                  {c.kind === "heart" ? (
                    <Heart className="w-7 h-7 text-rose-500 fill-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  ) : (
                    <Star className="w-7 h-7 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
                  )}
                </button>
              ))}

            {/* Section content card */}
            <div
              className={`relative z-10 max-w-lg w-full mx-auto px-6 py-8 rounded-3xl backdrop-blur-md border shadow-2xl transition-all duration-700 ${
                unlocked[i]
                  ? "bg-white/85 border-amber-200 opacity-100 translate-y-0"
                  : "bg-white/40 border-white/40 opacity-50 translate-y-4 blur-sm"
              } ${i === 0 ? "text-[#3a1f0a]" : ""}`}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-600">
                {s.label}
              </p>
              <h2 className="font-serif text-3xl mt-2 mb-3">{s.title}</h2>
              {s.content}
              <p className="mt-5 text-[11px] italic text-amber-700/70 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                {s.mission}
              </p>
            </div>

            {/* Marble platform ledge */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#7a4f1d] via-[#e7c98a] to-[#7a4f1d] shadow-[0_-6px_20px_rgba(122,79,29,0.5)]">
              <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_18px,rgba(0,0,0,0.15)_18px,rgba(0,0,0,0.15)_19px)]" />
            </div>

            {/* Hint */}
            {floor === i && i < SECTIONS.length - 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-amber-700 flex flex-col items-center text-[11px] font-sans font-bold">
                <ArrowDown className="w-5 h-5" />
                <span>TAP / SPASI</span>
              </div>
            )}

            {/* Character */}
            {floor === i && <Character jumping={jumping} facing={facing} />}
          </section>
        ))}
      </div>

      {/* Big jump button (mobile-friendly) */}
      {!finished && (
        <button
          onClick={jumpDown}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white font-sans font-bold text-sm shadow-2xl shadow-rose-500/40 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 border-2 border-white/60"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          LOMPAT
        </button>
      )}

      {/* Finish modal */}
      {finished && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-3xl shadow-2xl border-2 border-amber-300 px-6 py-5 max-w-sm w-full text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-lg mb-2">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-serif text-2xl">Selamat!</h3>
            <p className="text-sm opacity-70 mt-1">
              Kamu menyelesaikan undangan dengan skor
            </p>
            <p className="text-3xl font-bold text-amber-600 tabular-nums my-2">
              {score}
            </p>
            <button
              onClick={reset}
              className="mt-2 px-5 py-2 rounded-full bg-amber-500 text-white text-xs font-sans font-bold hover:bg-amber-600"
            >
              Main lagi
            </button>
          </div>
        </div>
      )}

      {/* Click bursts */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="fixed z-[70] pointer-events-none"
          style={{ left: b.x - 20, top: b.y - 20 }}
        >
          <div className="w-10 h-10 rounded-full bg-amber-300/60 animate-ping" />
        </div>
      ))}

      <footer className="text-center text-[10px] py-6 opacity-60">
        Demo Template Platformer v2 • /demo/platformer-invitation-v2
      </footer>
    </div>
  );
}

function Sky() {
  // Twinkling stars + moon, fixed in top viewport, fades as user scrolls past cover.
  const stars = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        x: (i * 53) % 100,
        y: (i * 31) % 60,
        d: (i % 5) * 0.4,
        s: 1 + (i % 3),
      })),
    []
  );
  return (
    <div className="absolute inset-x-0 top-0 h-[560px] overflow-hidden pointer-events-none">
      {/* moon */}
      <div className="absolute top-12 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 shadow-[0_0_60px_rgba(251,191,36,0.5)]" />
      {/* stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
      {/* clouds */}
      <div className="absolute bottom-20 left-[-10%] w-48 h-12 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-32 right-[-10%] w-64 h-14 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}

function Character({ jumping, facing }: { jumping: boolean; facing: "left" | "right" }) {
  return (
    <div
      className="absolute pointer-events-none transition-all duration-[650ms] ease-out"
      style={{
        right: facing === "right" ? "12%" : undefined,
        left: facing === "left" ? "12%" : undefined,
        bottom: jumping ? "65%" : "16px",
        transform: `scaleX(${facing === "right" ? -1 : 1}) ${
          jumping ? "rotate(-20deg) scale(1.05)" : "scale(1)"
        }`,
        filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.25))",
      }}
    >
      {/* Sparkle trail when jumping */}
      {jumping && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
          <Sparkles className="w-3 h-3 text-amber-300 animate-ping" />
          <Sparkles className="w-2 h-2 text-rose-300 animate-ping" style={{ animationDelay: "0.1s" }} />
        </div>
      )}
      <div className={jumping ? "" : "animate-[bob_1.4s_ease-in-out_infinite]"}>
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <ellipse cx="27" cy="68" rx="16" ry="2.5" fill="#000" opacity="0.2" />
          {/* legs */}
          <rect x="19" y="52" width="6" height="14" rx="2" fill="#1f1209" />
          <rect x="29" y="52" width="6" height="14" rx="2" fill="#1f1209" />
          {/* body */}
          <rect x="13" y="30" width="28" height="26" rx="5" fill="#1f1209" />
          <path d="M22 30 L27 42 L32 30 Z" fill="#fff" />
          {/* bowtie */}
          <path d="M22 32 L27 35 L32 32 L32 38 L27 35 L22 38 Z" fill="#c0392b" />
          {/* head */}
          <circle cx="27" cy="20" r="11" fill="#f1c79b" />
          <path d="M15 18 Q27 4 39 18 L39 13 Q27 1 15 13 Z" fill="#1f1209" />
          {/* blush */}
          <circle cx="21" cy="23" r="1.5" fill="#f9a8d4" opacity="0.7" />
          <circle cx="33" cy="23" r="1.5" fill="#f9a8d4" opacity="0.7" />
          {/* eyes */}
          <circle cx="23" cy="20" r="1.4" fill="#1f1209" />
          <circle cx="31" cy="20" r="1.4" fill="#1f1209" />
          {/* smile */}
          <path d="M23 25 Q27 28 31 25" stroke="#1f1209" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          {/* heart */}
          <path
            d="M44 36 c -1 -2.5 -5 -2.5 -5 1 c 0 2.5 5 5 5 5 c 0 0 5 -2.5 5 -5 c 0 -3.5 -4 -3.5 -5 -1 z"
            fill="#e94560"
          />
        </svg>
      </div>
      <style>{`@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </div>
  );
}