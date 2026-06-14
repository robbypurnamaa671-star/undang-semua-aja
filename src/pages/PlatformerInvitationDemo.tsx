import { useEffect, useRef, useState, useCallback } from "react";
import { Heart, ArrowDown, RotateCcw } from "lucide-react";

/**
 * DEMO ONLY — Platformer-style wedding invitation.
 * Route: /demo/platformer-invitation
 *
 * Konsep: undangan disusun vertikal (beberapa "lantai"). Ada karakter kecil
 * di sisi kanan layar. Tekan SPASI / panah bawah / tap layar agar karakter
 * melompat turun ke lantai berikutnya — saat mendarat, halaman ikut
 * ter-scroll ke section tersebut. Karakter membantu pengunjung menelusuri
 * undangan dari atas ke bawah.
 */

const SECTIONS = [
  {
    key: "cover",
    label: "Pembuka",
    title: "The Wedding of",
    content: (
      <>
        <h1 className="text-4xl md:text-5xl font-serif mt-3">Raka & Aulia</h1>
        <p className="mt-3 italic opacity-70">Sabtu, 12 September 2026</p>
        <p className="mt-6 text-sm opacity-70">Lompat turun bersama karakter kami ↓</p>
      </>
    ),
  },
  {
    key: "story",
    label: "Kisah",
    title: "Kisah Kami",
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
    content: (
      <p className="max-w-md mx-auto text-sm">
        Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i melalui tombol RSVP di
        undangan asli. Terima kasih atas doa dan restunya.
      </p>
    ),
  },
];

const FLOOR_HEIGHT = 520; // px per section

export default function PlatformerInvitationDemo() {
  const [floor, setFloor] = useState(0); // current platform index
  const [jumping, setJumping] = useState(false);
  const [facing, setFacing] = useState<"left" | "right">("left");
  const containerRef = useRef<HTMLDivElement>(null);

  const jumpDown = useCallback(() => {
    setFloor((f) => {
      if (f >= SECTIONS.length - 1) return f;
      const next = f + 1;
      setJumping(true);
      setFacing((prev) => (prev === "left" ? "right" : "left"));
      // scroll page to next section
      const el = document.getElementById(`floor-${next}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setJumping(false), 600);
      return next;
    });
  }, []);

  const reset = () => {
    setFloor(0);
    setJumping(false);
    setFacing("left");
    const el = document.getElementById(`floor-0`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowDown" || e.code === "Enter") {
        e.preventDefault();
        jumpDown();
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        setFloor((f) => Math.max(0, f - 1));
        const prev = Math.max(0, floor - 1);
        const el = document.getElementById(`floor-${prev}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jumpDown, floor]);

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#fdf6ec] via-[#f7e7c8] to-[#c89865] text-[#4a2c1a] font-serif"
      onClick={jumpDown}
    >
      {/* HUD */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-[#b08642] shadow text-xs">
        <Heart className="w-3 h-3 text-rose-500" />
        <span>Lantai {floor + 1} / {SECTIONS.length}</span>
        <span className="opacity-50">•</span>
        <span className="hidden sm:inline">Tap / Spasi untuk lompat</span>
        <span className="sm:hidden">Tap untuk lompat</span>
        <button
          onClick={(e) => { e.stopPropagation(); reset(); }}
          className="ml-1 p-1 rounded-full hover:bg-[#b08642]/20"
          aria-label="Reset"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Floors */}
      {SECTIONS.map((s, i) => (
        <section
          key={s.key}
          id={`floor-${i}`}
          className="relative flex flex-col items-center justify-center text-center px-6 border-b border-[#b08642]/20"
          style={{
            height: `${FLOOR_HEIGHT}px`,
            background:
              i % 2 === 0
                ? "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0))"
                : "linear-gradient(180deg, rgba(176,134,66,0.08), rgba(176,134,66,0))",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#b08642]">{s.label}</p>
          <h2 className="font-serif text-2xl mt-2 mb-3">{s.title}</h2>
          {s.content}

          {/* Platform ledge */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#7a4f1d] via-[#b08642] to-[#7a4f1d] shadow-[0_-4px_10px_rgba(122,79,29,0.4)]" />

          {/* Hint arrow on current floor */}
          {floor === i && i < SECTIONS.length - 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#b08642] flex flex-col items-center text-xs">
              <ArrowDown className="w-5 h-5" />
              <span>Lompat</span>
            </div>
          )}

          {/* Character placed on the platform when this is the current floor */}
          {floor === i && (
            <Character jumping={jumping} facing={facing} />
          )}
        </section>
      ))}

      {/* End */}
      {floor === SECTIONS.length - 1 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#b08642] text-white text-xs shadow-lg animate-in fade-in">
          🎉 Kamu sudah sampai akhir undangan!
        </div>
      )}

      <footer className="text-center text-[10px] py-6 opacity-60">
        Demo Template Platformer • /demo/platformer-invitation
      </footer>
    </div>
  );
}

function Character({ jumping, facing }: { jumping: boolean; facing: "left" | "right" }) {
  return (
    <div
      className="absolute pointer-events-none transition-all duration-500 ease-out"
      style={{
        right: facing === "right" ? "10%" : undefined,
        left: facing === "left" ? "10%" : undefined,
        bottom: jumping ? "60%" : "12px",
        transform: `scaleX(${facing === "right" ? -1 : 1}) ${jumping ? "rotate(-15deg)" : ""}`,
      }}
    >
      {/* Tiny pixel-ish character: tuxedo on top of hat? Use simple SVG. */}
      <svg width="46" height="60" viewBox="0 0 46 60" fill="none">
        {/* shadow */}
        <ellipse cx="23" cy="58" rx="14" ry="2" fill="#000" opacity="0.18" />
        {/* legs */}
        <rect x="16" y="44" width="6" height="12" rx="2" fill="#2b1b0f" />
        <rect x="24" y="44" width="6" height="12" rx="2" fill="#2b1b0f" />
        {/* body / suit */}
        <rect x="12" y="26" width="22" height="22" rx="4" fill="#1f1209" />
        {/* shirt */}
        <path d="M19 26 L23 36 L27 26 Z" fill="#fff" />
        {/* bowtie */}
        <path d="M20 28 L23 30 L26 28 L26 32 L23 30 L20 32 Z" fill="#c0392b" />
        {/* head */}
        <circle cx="23" cy="18" r="10" fill="#f1c79b" />
        {/* hair */}
        <path d="M13 16 Q23 4 33 16 L33 12 Q23 2 13 12 Z" fill="#2b1b0f" />
        {/* eyes */}
        <circle cx="20" cy="19" r="1.2" fill="#1f1209" />
        <circle cx="26" cy="19" r="1.2" fill="#1f1209" />
        {/* smile */}
        <path d="M20 23 Q23 25 26 23" stroke="#1f1209" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* heart in hand */}
        <path d="M36 32 c -1 -2 -4 -2 -4 1 c 0 2 4 4 4 4 c 0 0 4 -2 4 -4 c 0 -3 -3 -3 -4 -1 z" fill="#e94560" />
      </svg>
    </div>
  );
}