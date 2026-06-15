import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Upload, RotateCcw, Sparkles } from "lucide-react";

/**
 * DEMO ONLY — Game-style wedding invitation template.
 * Route: /demo/game-invitation
 * Belum di-deploy ke flow undangan. Untuk review tampilan & mekanik game.
 *
 * Mekanik: Memory Match 4x3 (6 pasang). Setelah semua kartu cocok,
 * undangan "terbuka" dengan animasi.
 */

const _params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
const COUPLE_GROOM = _params.get("groom") || "Raka";
const COUPLE_BRIDE = _params.get("bride") || "Aulia";
const COUPLE_DATE = _params.get("date") || "Sabtu, 12 September 2026";

const DEFAULT_PHOTOS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=70",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=70",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=70",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=70",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=70",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=70",
];

type Card = {
  id: number;
  pairKey: string;
  img: string;
  matched: boolean;
  flipped: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(photos: string[]): Card[] {
  const pairs = photos.slice(0, 6);
  const deck: Card[] = [];
  pairs.forEach((img, idx) => {
    deck.push({ id: idx * 2, pairKey: `p${idx}`, img, matched: false, flipped: false });
    deck.push({ id: idx * 2 + 1, pairKey: `p${idx}`, img, matched: false, flipped: false });
  });
  return shuffle(deck);
}

export default function GameInvitationDemo() {
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);
  const [deck, setDeck] = useState<Card[]>(() => buildDeck(DEFAULT_PHOTOS));
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const lockRef = useRef(false);

  const matchedCount = useMemo(() => deck.filter((c) => c.matched).length, [deck]);

  useEffect(() => {
    if (matchedCount === deck.length && deck.length > 0) {
      setTimeout(() => setWon(true), 500);
    }
  }, [matchedCount, deck.length]);

  const flip = (id: number) => {
    if (lockRef.current) return;
    setDeck((prev) => {
      const card = prev.find((c) => c.id === id);
      if (!card || card.flipped || card.matched) return prev;
      const next = prev.map((c) => (c.id === id ? { ...c, flipped: true } : c));
      const newPicked = [...picked, id];
      setPicked(newPicked);
      if (newPicked.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = newPicked.map((pid) => next.find((c) => c.id === pid)!);
        if (a.pairKey === b.pairKey) {
          setTimeout(() => {
            setDeck((d) => d.map((c) => (c.pairKey === a.pairKey ? { ...c, matched: true } : c)));
            setPicked([]);
          }, 400);
        } else {
          lockRef.current = true;
          setTimeout(() => {
            setDeck((d) => d.map((c) => (newPicked.includes(c.id) ? { ...c, flipped: false } : c)));
            setPicked([]);
            lockRef.current = false;
          }, 800);
        }
      }
      return next;
    });
  };

  const reset = (newPhotos = photos) => {
    setDeck(buildDeck(newPhotos));
    setPicked([]);
    setMoves(0);
    setWon(false);
    lockRef.current = false;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    if (files.length === 0) return;
    const urls = files.map((f) => URL.createObjectURL(f));
    // Fill remaining slots with defaults
    const merged = [...urls, ...DEFAULT_PHOTOS].slice(0, 6);
    setPhotos(merged);
    reset(merged);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf6ec] via-[#f7e7c8] to-[#eccfa3] text-[#4a2c1a]">
      <div className="max-w-md mx-auto px-4 py-8 font-serif">
        <header className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b08642]">The Wedding of</p>
          <h1 className="text-3xl mt-2 mb-1">{COUPLE_GROOM} & {COUPLE_BRIDE}</h1>
          <p className="text-sm italic opacity-70">Cocokkan kenangan kami untuk membuka undangan</p>
        </header>

        <div className="rounded-2xl bg-white/60 backdrop-blur border border-[#e6cfa3] p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-rose-500" /> {matchedCount / 2}/6 pasang</span>
            <span className="opacity-70">{moves} langkah</span>
            <button
              onClick={() => reset()}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-[#b08642] text-white hover:opacity-90"
            >
              <RotateCcw className="w-3 h-3" /> Ulang
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {deck.map((card) => {
              const show = card.flipped || card.matched;
              return (
                <button
                  key={card.id}
                  onClick={() => flip(card.id)}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#d4b483] [perspective:800px]"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]"
                    style={{ transform: show ? "rotateY(180deg)" : "rotateY(0deg)" }}
                  >
                    {/* back */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#b08642] to-[#7a4f1d] flex items-center justify-center [backface-visibility:hidden]">
                      <Heart className="w-6 h-6 text-[#fdf6ec]" />
                    </div>
                    {/* front */}
                    <div
                      className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                      style={{
                        backgroundImage: `url(${card.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    {card.matched && (
                      <div className="absolute inset-0 bg-rose-500/20 [transform:rotateY(180deg)] [backface-visibility:hidden]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <label className="mt-4 flex items-center justify-center gap-2 text-sm cursor-pointer px-3 py-2 rounded-md border border-dashed border-[#b08642] text-[#7a4f1d] hover:bg-white/70">
            <Upload className="w-4 h-4" />
            Upload foto pasangan (maks 6)
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          </label>
          <p className="text-[10px] text-center mt-1 opacity-60">Foto hanya tersimpan di browser untuk demo.</p>
        </div>

        {won && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
            <div className="bg-gradient-to-b from-[#fdf6ec] to-[#eccfa3] rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-[#b08642] animate-in zoom-in-95">
              <Sparkles className="w-8 h-8 mx-auto text-[#b08642] mb-2" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08642]">Undangan Terbuka</p>
              <h2 className="text-2xl font-serif mt-3">{COUPLE_GROOM} & {COUPLE_BRIDE}</h2>
              <p className="text-sm italic mt-1 opacity-70">{COUPLE_DATE}</p>
              <div className="my-4 h-px bg-[#b08642]/40" />
              <p className="text-sm leading-relaxed">
                Dengan memohon rahmat Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.
              </p>
              <div className="mt-4 text-xs space-y-1">
                <p><strong>Akad:</strong> 08.00 WIB</p>
                <p><strong>Resepsi:</strong> 11.00 WIB</p>
                <p><strong>Lokasi:</strong> Graha Bahagia, Jakarta</p>
              </div>
              <button
                onClick={() => reset()}
                className="mt-5 w-full py-2 rounded-md bg-[#b08642] text-white text-sm hover:opacity-90"
              >
                Main Lagi
              </button>
              <p className="text-[10px] mt-3 opacity-50">Demo template • Belum live</p>
            </div>
          </div>
        )}

        <p className="text-center text-xs mt-6 opacity-60">Preview Template Game • /demo/game-invitation</p>
      </div>
    </div>
  );
}