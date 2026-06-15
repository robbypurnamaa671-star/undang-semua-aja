import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Heart,
  Play,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCcw,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Mail,
  Music,
  VolumeX,
} from "lucide-react";

/**
 * DEMO ONLY — "Love Story Adventure"
 * Route: /demo/love-story-adventure
 *
 * Short romantic pixel-art-inspired adventure that ends in a wedding invitation.
 * Pure React + Canvas + CSS — no game engine.
 */

type Scene = "cover" | "meeting" | "love" | "proposal" | "wedding" | "invitation";

const SCENES: Scene[] = ["cover", "meeting", "love", "proposal", "wedding", "invitation"];

const NAMES = { groom: "Raka", bride: "Aulia" };
const WEDDING = {
  date: "Sabtu, 12 September 2026",
  time: "08:00 WIB",
  location: "Graha Bahagia, Jakarta",
  mapsUrl: "https://maps.google.com/?q=Monas+Jakarta",
};

const STORAGE_KEY = "love-story-adventure-progress";

/* ---------- Floating background hearts ---------- */
function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        size: 10 + Math.random() * 18,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-rose-400"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: h.opacity,
            animation: `floatUp ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          ❤
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(1.1); opacity: 0; }
        }
        @keyframes petalFall {
          0% { transform: translateY(-10vh) rotate(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulseSoft {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Pixel character (CSS only) ---------- */
function PixelChar({
  variant,
  facing = "right",
  walking = false,
}: {
  variant: "groom" | "bride";
  facing?: "left" | "right";
  walking?: boolean;
}) {
  const hair = variant === "groom" ? "#3b2418" : "#5a2a1a";
  const body = variant === "groom" ? "#1f2937" : "#fff";
  const skin = "#f7d6b5";
  const accent = variant === "groom" ? "#b08642" : "#f9a8d4";
  return (
    <div
      className="relative"
      style={{
        width: 36,
        height: 48,
        imageRendering: "pixelated",
        transform: `scaleX(${facing === "left" ? -1 : 1})`,
        animation: walking ? "pulseSoft 0.4s ease-in-out infinite" : undefined,
      }}
    >
      {/* head */}
      <div className="absolute" style={{ left: 10, top: 0, width: 16, height: 14, background: skin, borderRadius: 3 }} />
      {/* hair */}
      <div className="absolute" style={{ left: 10, top: 0, width: 16, height: 5, background: hair, borderRadius: "3px 3px 0 0" }} />
      {/* eye */}
      <div className="absolute" style={{ left: 19, top: 6, width: 2, height: 2, background: "#000" }} />
      {/* body */}
      <div className="absolute" style={{ left: 8, top: 14, width: 20, height: 18, background: body, borderRadius: 2, border: "1px solid #0002" }} />
      {/* accent (bowtie/flower) */}
      <div className="absolute" style={{ left: 16, top: 14, width: 4, height: 3, background: accent }} />
      {/* legs */}
      <div className="absolute" style={{ left: 11, top: 32, width: 5, height: 12, background: "#2b1d12" }} />
      <div className="absolute" style={{ left: 20, top: 32, width: 5, height: 12, background: "#2b1d12" }} />
      {/* heart in hand */}
      <div className="absolute text-rose-500" style={{ left: 26, top: 18, fontSize: 10 }}>❤</div>
    </div>
  );
}

/* ---------- Shared scene shell ---------- */
function SceneShell({
  children,
  progress,
  onReset,
  className = "",
}: {
  children: React.ReactNode;
  progress: number;
  onReset: () => void;
  className?: string;
}) {
  return (
    <div className={`relative min-h-[100dvh] w-full overflow-hidden ${className}`}>
      <FloatingHearts count={14} />
      {/* Progress bar */}
      <div className="absolute top-0 inset-x-0 z-20 px-3 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-white/50 backdrop-blur border border-white/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-amber-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-semibold text-rose-700 bg-white/60 px-2 py-1 rounded-full">
            {progress}%
          </span>
          <button
            onClick={onReset}
            aria-label="Ulang"
            className="p-1.5 rounded-full bg-white/60 hover:bg-white/80 text-rose-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="relative z-10 min-h-[100dvh] flex flex-col">{children}</div>
    </div>
  );
}

/* ---------- Scene 1 : Cover ---------- */
function CoverScene({ onStart, music, toggleMusic }: { onStart: () => void; music: boolean; toggleMusic: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={toggleMusic}
          className="p-2 rounded-full bg-white/70 text-rose-700 shadow-sm"
          aria-label={music ? "Matikan musik" : "Nyalakan musik"}
        >
          {music ? <Music className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
      <div className="text-5xl mb-3 animate-pulse">❤️</div>
      <p className="text-xs uppercase tracking-[0.4em] text-rose-500">Love Story</p>
      <h1 className="font-serif text-4xl mt-1 mb-2 text-[#5a2a1a]">Adventure</h1>
      <div className="my-4 flex items-center gap-3 text-2xl font-serif text-[#7a3e2c]">
        <span>{NAMES.groom}</span>
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
        <span>{NAMES.bride}</span>
      </div>
      <p className="text-sm italic text-rose-700/80 max-w-xs">
        Mainkan kisah cinta singkat kami sebelum membuka undangan.
      </p>
      <button
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold shadow-lg shadow-rose-300/50 active:scale-95 transition"
      >
        <Play className="w-4 h-4 fill-white" /> Start Journey
      </button>
      <p className="text-[10px] mt-6 opacity-60">Demo template • /demo/love-story-adventure</p>
    </div>
  );
}

/* ---------- Scene 2 : First Meeting (walk to bride) ---------- */
function MeetingScene({ onDone }: { onDone: () => void }) {
  const [x, setX] = useState(20);
  const [jumping, setJumping] = useState(false);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [reached, setReached] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setX((p) => {
        let n = p;
        const w = stageRef.current?.clientWidth ?? 320;
        if (holdRef.current.left) {
          n = Math.max(10, n - 3);
          setFacing("left");
        }
        if (holdRef.current.right) {
          n = Math.min(w - 50, n + 3);
          setFacing("right");
        }
        if (n > (w - 90)) setReached(true);
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const jump = () => {
    if (jumping) return;
    setJumping(true);
    setTimeout(() => setJumping(false), 500);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") holdRef.current.left = true;
      if (e.key === "ArrowRight") holdRef.current.right = true;
      if (e.key === " " || e.key === "ArrowUp") jump();
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") holdRef.current.left = false;
      if (e.key === "ArrowRight") holdRef.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [jumping]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center pt-14 pb-3">
        <h2 className="font-serif text-xl text-[#5a2a1a]">Pertama Kali Bertemu</h2>
        <p className="text-xs text-rose-700/70">Bantu {NAMES.groom} menghampiri {NAMES.bride}</p>
      </div>

      <div
        ref={stageRef}
        className="relative mx-3 flex-1 rounded-2xl border border-rose-200 bg-gradient-to-b from-sky-100 via-rose-50 to-amber-100 overflow-hidden shadow-inner"
      >
        {/* clouds */}
        <div className="absolute top-4 left-8 w-16 h-5 bg-white rounded-full opacity-80" />
        <div className="absolute top-10 right-6 w-12 h-4 bg-white rounded-full opacity-70" />
        {/* ground */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-b from-emerald-300 to-emerald-500" />
        <div className="absolute bottom-12 inset-x-0 h-1 bg-emerald-700/40" />
        {/* groom */}
        <div
          className="absolute transition-[bottom] duration-300"
          style={{ left: x, bottom: jumping ? 80 : 48 }}
        >
          <PixelChar variant="groom" facing={facing} walking={holdRef.current.left || holdRef.current.right} />
        </div>
        {/* bride */}
        <div className="absolute right-3" style={{ bottom: 48 }}>
          <PixelChar variant="bride" facing="left" />
          <div className="text-rose-500 text-xs text-center animate-pulse">❤</div>
        </div>
        {reached && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
            <div className="bg-white rounded-2xl p-5 max-w-xs text-center shadow-2xl animate-in zoom-in-95">
              <div className="text-2xl mb-2">❤️</div>
              <p className="font-serif text-base text-[#5a2a1a]">
                2018 — Saat pertama kali kami bertemu
              </p>
              <button
                onClick={onDone}
                className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}
      </div>

      <TouchControls
        onLeft={(v) => (holdRef.current.left = v)}
        onRight={(v) => (holdRef.current.right = v)}
        onJump={jump}
      />
    </div>
  );
}

/* ---------- Touch controls ---------- */
function TouchControls({
  onLeft,
  onRight,
  onJump,
}: {
  onLeft: (v: boolean) => void;
  onRight: (v: boolean) => void;
  onJump: () => void;
}) {
  const btn =
    "select-none active:scale-95 bg-white/80 backdrop-blur border border-rose-200 text-rose-700 rounded-full shadow-md w-14 h-14 flex items-center justify-center";
  return (
    <div className="px-4 py-4 flex items-center justify-between">
      <div className="flex gap-3">
        <button
          aria-label="Kiri"
          className={btn}
          onPointerDown={() => onLeft(true)}
          onPointerUp={() => onLeft(false)}
          onPointerLeave={() => onLeft(false)}
          onPointerCancel={() => onLeft(false)}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          aria-label="Kanan"
          className={btn}
          onPointerDown={() => onRight(true)}
          onPointerUp={() => onRight(false)}
          onPointerLeave={() => onRight(false)}
          onPointerCancel={() => onRight(false)}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      <button aria-label="Lompat" className={btn} onClick={onJump}>
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

/* ---------- Scene 3 : Falling in love (collect hearts) ---------- */
const HEART_LABELS = ["First Date", "First Gift", "First Trip", "First Laugh", "First Dream"];

function LoveScene({ onDone }: { onDone: () => void }) {
  const [collected, setCollected] = useState<number[]>([]);
  const [popup, setPopup] = useState<string | null>(null);
  const positions = useMemo(
    () => [
      { x: 15, y: 25 },
      { x: 70, y: 18 },
      { x: 40, y: 45 },
      { x: 80, y: 55 },
      { x: 25, y: 70 },
    ],
    []
  );

  const collect = (idx: number) => {
    if (collected.includes(idx)) return;
    setCollected((c) => [...c, idx]);
    setPopup(HEART_LABELS[idx]);
    setTimeout(() => setPopup((p) => (p === HEART_LABELS[idx] ? null : p)), 1200);
  };

  const allDone = collected.length === HEART_LABELS.length;

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center pt-14 pb-3">
        <h2 className="font-serif text-xl text-[#5a2a1a]">Jatuh Cinta</h2>
        <p className="text-xs text-rose-700/70">Kumpulkan 5 hati kenangan ({collected.length}/5)</p>
      </div>
      <div className="relative mx-3 flex-1 rounded-2xl border border-rose-200 bg-gradient-to-b from-rose-100 via-pink-50 to-amber-50 overflow-hidden shadow-inner">
        {positions.map((p, idx) => {
          const done = collected.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => collect(idx)}
              disabled={done}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span
                className={`block text-3xl transition ${
                  done ? "opacity-30 scale-75" : "animate-pulse drop-shadow-[0_4px_10px_rgba(244,114,182,0.6)]"
                }`}
              >
                ❤️
              </span>
            </button>
          );
        })}
        {popup && (
          <div className="absolute inset-x-0 top-6 flex justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-white/90 text-rose-600 text-sm font-semibold shadow animate-in fade-in zoom-in-95">
              ✨ {popup}
            </div>
          </div>
        )}
        {allDone && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
            <div className="bg-white rounded-2xl p-5 max-w-xs text-center shadow-2xl animate-in zoom-in-95">
              <div className="text-2xl mb-2">💖</div>
              <p className="font-serif text-base text-[#5a2a1a]">Perjalanan cinta kami dimulai</p>
              <button
                onClick={onDone}
                className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="h-4" />
    </div>
  );
}

/* ---------- Scene 4 : Proposal ---------- */
function ProposalScene({ onDone }: { onDone: () => void }) {
  const [x, setX] = useState(20);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [reached, setReached] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setX((p) => {
        let n = p;
        const w = stageRef.current?.clientWidth ?? 320;
        if (holdRef.current.left) { n = Math.max(10, n - 3); setFacing("left"); }
        if (holdRef.current.right) { n = Math.min(w - 50, n + 3); setFacing("right"); }
        if (n > (w - 100)) setReached(true);
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") holdRef.current.left = true;
      if (e.key === "ArrowRight") holdRef.current.right = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") holdRef.current.left = false;
      if (e.key === "ArrowRight") holdRef.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center pt-14 pb-3">
        <h2 className="font-serif text-xl text-[#5a2a1a]">Lamaran</h2>
        <p className="text-xs text-rose-700/70">Hampiri cincin spesial 💍</p>
      </div>
      <div
        ref={stageRef}
        className="relative mx-3 flex-1 rounded-2xl border border-rose-200 bg-gradient-to-b from-amber-100 via-rose-50 to-pink-100 overflow-hidden shadow-inner"
      >
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-b from-amber-200 to-amber-400" />
        <div className="absolute" style={{ left: x, bottom: 48 }}>
          <PixelChar variant="groom" facing={facing} walking={holdRef.current.left || holdRef.current.right} />
        </div>
        <div
          className="absolute right-4 text-4xl"
          style={{ bottom: 60, animation: "pulseSoft 1.2s ease-in-out infinite" }}
        >
          💍
        </div>

        {reached && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
            <div className="bg-white rounded-2xl p-5 max-w-xs text-center shadow-2xl animate-in zoom-in-95">
              <div className="text-4xl mb-2 animate-bounce">💍</div>
              <p className="font-serif text-sm text-[#5a2a1a]">
                Dan pada akhirnya kami memutuskan untuk melangkah ke jenjang yang lebih serius.
              </p>
              <button
                onClick={onDone}
                className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}
      </div>
      <TouchControls
        onLeft={(v) => (holdRef.current.left = v)}
        onRight={(v) => (holdRef.current.right = v)}
        onJump={() => {}}
      />
    </div>
  );
}

/* ---------- Scene 5 : Wedding Day (walk to gate, confetti) ---------- */
function WeddingScene({ onDone }: { onDone: () => void }) {
  const [x, setX] = useState(20);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [reached, setReached] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setX((p) => {
        let n = p;
        const w = stageRef.current?.clientWidth ?? 320;
        if (holdRef.current.left) { n = Math.max(10, n - 3); setFacing("left"); }
        if (holdRef.current.right) { n = Math.min(w - 60, n + 3); setFacing("right"); }
        if (n > (w - 110)) setReached(true);
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 5,
        color: ["#fda4af", "#fcd34d", "#fbcfe8", "#fde68a"][i % 4],
      })),
    []
  );

  const confetti = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2.5,
        color: ["#f43f5e", "#f59e0b", "#ec4899", "#fde68a", "#34d399"][i % 5],
        size: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center pt-14 pb-3">
        <h2 className="font-serif text-xl text-[#5a2a1a]">Hari Pernikahan</h2>
        <p className="text-xs text-rose-700/70">Berjalan menuju gerbang taman bunga 🌸</p>
      </div>
      <div
        ref={stageRef}
        className="relative mx-3 flex-1 rounded-2xl border border-rose-200 bg-gradient-to-b from-rose-100 via-pink-100 to-emerald-100 overflow-hidden shadow-inner"
      >
        {petals.map((p) => (
          <span
            key={p.id}
            className="absolute top-0 text-lg"
            style={{
              left: `${p.left}%`,
              color: p.color,
              animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            ✿
          </span>
        ))}
        {/* flowers along the path */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-b from-emerald-300 to-emerald-500" />
        {[15, 35, 55, 75].map((pct) => (
          <span key={pct} className="absolute text-pink-400 text-lg" style={{ left: `${pct}%`, bottom: 46 }}>
            🌸
          </span>
        ))}

        {/* Gate */}
        <div className="absolute right-2 bottom-12 flex flex-col items-center">
          <div className="text-3xl">🏛️</div>
          <div className="text-[10px] text-rose-700 font-semibold">Gate</div>
        </div>

        <div className="absolute" style={{ left: x, bottom: 48 }}>
          <PixelChar variant="groom" facing={facing} walking={holdRef.current.left || holdRef.current.right} />
        </div>

        {reached && (
          <>
            {confetti.map((c) => (
              <span
                key={c.id}
                className="absolute top-0 block rounded-sm"
                style={{
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size,
                  background: c.color,
                  animation: `confettiFall ${c.duration}s ease-in ${c.delay}s forwards`,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
              <div className="bg-white rounded-2xl p-5 max-w-xs text-center shadow-2xl animate-in zoom-in-95">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-serif text-base text-[#5a2a1a]">
                  Selamat! Anda telah menyelesaikan perjalanan cinta kami ❤️
                </p>
                <button
                  onClick={onDone}
                  className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-semibold"
                >
                  Buka Undangan
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <TouchControls
        onLeft={(v) => (holdRef.current.left = v)}
        onRight={(v) => (holdRef.current.right = v)}
        onJump={() => {}}
      />
    </div>
  );
}

/* ---------- Scene 6 : Invitation reveal ---------- */
function InvitationScene({ onRestart }: { onRestart: () => void }) {
  const share = async () => {
    const text = `Undangan Pernikahan ${NAMES.groom} & ${NAMES.bride} — ${WEDDING.date}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Love Story Adventure", text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        alert("Link disalin!");
      }
    } catch {}
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-16 text-center animate-in fade-in">
      <p className="text-xs uppercase tracking-[0.3em] text-rose-500">The Wedding of</p>
      <h2 className="font-serif text-3xl mt-2 text-[#5a2a1a]">{NAMES.groom}</h2>
      <Heart className="w-5 h-5 my-2 text-rose-500 fill-rose-500" />
      <h2 className="font-serif text-3xl text-[#5a2a1a]">{NAMES.bride}</h2>

      <div className="my-6 w-full max-w-sm bg-white/80 backdrop-blur rounded-2xl border border-rose-200 p-5 shadow-xl space-y-3">
        <div className="flex items-center gap-3 text-sm text-[#5a2a1a]">
          <Calendar className="w-4 h-4 text-rose-500" /> {WEDDING.date}
        </div>
        <div className="flex items-center gap-3 text-sm text-[#5a2a1a]">
          <Clock className="w-4 h-4 text-rose-500" /> {WEDDING.time}
        </div>
        <div className="flex items-center gap-3 text-sm text-[#5a2a1a]">
          <MapPin className="w-4 h-4 text-rose-500" /> {WEDDING.location}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        <a
          href={WEDDING.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-4 h-4" /> Lihat Lokasi
        </a>
        <button className="py-2.5 rounded-full bg-amber-500 text-white text-sm font-semibold flex items-center justify-center gap-1.5">
          <Mail className="w-4 h-4" /> RSVP
        </button>
        <button className="py-2.5 rounded-full bg-pink-500 text-white text-sm font-semibold flex items-center justify-center gap-1.5">
          <Heart className="w-4 h-4" /> Ucapan
        </button>
        <button
          onClick={share}
          className="py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold flex items-center justify-center gap-1.5"
        >
          <Share2 className="w-4 h-4" /> Bagikan
        </button>
      </div>

      <button onClick={onRestart} className="mt-6 text-xs text-rose-700 underline">
        Mainkan ulang perjalanan
      </button>
      <p className="text-[10px] mt-3 opacity-50">Demo template • Belum live</p>
    </div>
  );
}

/* ---------- Main ---------- */
export default function LoveStoryAdventureDemo() {
  const [scene, setScene] = useState<Scene>("cover");
  const [music, setMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // restore progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Scene | null;
      if (saved && SCENES.includes(saved)) setScene(saved);
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, scene); } catch {}
  }, [scene]);

  const progress = Math.round(((SCENES.indexOf(scene)) / (SCENES.length - 1)) * 100);

  const next = useCallback(() => {
    setScene((s) => {
      const i = SCENES.indexOf(s);
      return SCENES[Math.min(i + 1, SCENES.length - 1)];
    });
  }, []);

  const reset = useCallback(() => {
    setScene("cover");
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const toggleMusic = () => {
    setMusic((m) => {
      const next = !m;
      if (audioRef.current) {
        if (next) audioRef.current.play().catch(() => {});
        else audioRef.current.pause();
      }
      return next;
    });
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Wedding of ${NAMES.groom} & ${NAMES.bride}`,
    startDate: "2026-09-12T08:00:00+07:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: WEDDING.location,
      address: "Jakarta, Indonesia",
    },
    description:
      "Undangan pernikahan interaktif berupa game petualangan singkat bertema cinta.",
  };

  return (
    <>
      <Helmet>
        <title>Love Story Adventure - Undangan Pernikahan Interaktif</title>
        <meta
          name="description"
          content="Mainkan kisah cinta singkat sebelum membuka undangan pernikahan interaktif Love Story Adventure."
        />
        <meta property="og:title" content="Love Story Adventure - Undangan Pernikahan Interaktif" />
        <meta
          property="og:description"
          content="Undangan pernikahan dalam bentuk game romantis singkat. Selesaikan perjalanan cinta dalam 60 detik."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
      </Helmet>

      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        loop
        preload="none"
      />

      <div className="bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 min-h-[100dvh] font-sans">
        <SceneShell progress={progress} onReset={reset}>
          {scene === "cover" && <CoverScene onStart={next} music={music} toggleMusic={toggleMusic} />}
          {scene === "meeting" && <MeetingScene onDone={next} />}
          {scene === "love" && <LoveScene onDone={next} />}
          {scene === "proposal" && <ProposalScene onDone={next} />}
          {scene === "wedding" && <WeddingScene onDone={next} />}
          {scene === "invitation" && <InvitationScene onRestart={reset} />}
        </SceneShell>
      </div>
    </>
  );
}