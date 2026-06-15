import { motion } from "framer-motion";
import { useState } from "react";
import { Gamepad2, Crown, Play, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { templates } from "@/lib/templates";

type GameType = NonNullable<ReturnType<typeof getRoute>>;

function getRoute(gameType: string | undefined): string | null {
  switch (gameType) {
    case "memory":
      return "/demo/game-invitation";
    case "platformer":
      return "/demo/platformer-invitation";
    case "platformer-v2":
      return "/demo/platformer-invitation-v2";
    case "love-story":
      return "/demo/love-story-adventure";
    default:
      return null;
  }
}

const TAGLINES: Record<string, string> = {
  "love-story":
    "Tamu memainkan kisah cinta 6 babak singkat sebelum undangan terbuka.",
  "platformer-v2":
    "Karakter melompat antar babak sambil mengumpulkan hati & bintang kenangan.",
  platformer:
    "Versi klasik: lompat turun bersama karakter pengantin menyusuri undangan.",
  memory:
    "Cocokkan kartu foto kenangan — saat semua match, undangan terbuka otomatis.",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function GameCard({
  name,
  description,
  url,
  colors,
  templateId,
}: {
  name: string;
  description: string;
  url: string;
  colors: { primary: string; secondary: string; background: string };
  templateId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={item}
        className="group rounded-2xl overflow-hidden border border-border bg-card shadow-md hover:shadow-2xl transition-shadow flex flex-col"
      >
        {/* Live playable iframe preview */}
        <div
          className="relative aspect-[9/16] overflow-hidden cursor-pointer"
          style={{ background: colors.background }}
          onClick={() => setOpen(true)}
        >
          <iframe
            src={url}
            title={`Preview ${name}`}
            loading="lazy"
            className="absolute top-0 left-0"
            style={{
              width: "200%",
              height: "200%",
              transform: "scale(0.5)",
              transformOrigin: "top left",
              border: 0,
              pointerEvents: "auto",
            }}
          />

          {/* Top badges */}
          <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
            <Badge
              className="shadow-md gap-1 backdrop-blur"
              style={{ background: colors.primary, color: "#fff" }}
            >
              <Gamepad2 className="w-3 h-3" /> GAME
            </Badge>
            <Badge className="bg-primary text-primary-foreground shadow-md">
              <Crown className="w-3 h-3 mr-1" /> Premium
            </Badge>
          </div>

          {/* Bottom "Play" CTA — keeps card tappable to enlarge */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="absolute bottom-2 left-2 right-2 z-20 mx-auto w-fit px-3 py-1.5 rounded-full bg-white/95 text-foreground text-xs font-semibold shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <Play className="w-3 h-3 fill-current" /> Mainkan Layar Penuh
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-semibold text-base flex-1 truncate">
              {name}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.4em]">
            {description}
          </p>
          <Button
            asChild
            size="sm"
            className="mt-1 w-full"
            style={{ background: colors.primary, color: "#fff" }}
          >
            <Link to={`/register?template=${templateId}`}>
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Pakai Template Ini
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Fullscreen playable dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden h-[90vh] flex flex-col">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <div className="px-4 py-2 border-b flex items-center justify-between bg-card">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Template Game
              </p>
              <h3 className="font-serif font-semibold truncate text-sm">{name}</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              className="p-1.5 rounded-full hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            src={url}
            title={`Mainkan ${name}`}
            className="flex-1 w-full border-0 bg-background"
          />
          <div className="p-3 border-t bg-card">
            <Button
              asChild
              className="w-full"
              style={{ background: colors.primary, color: "#fff" }}
            >
              <Link to={`/register?template=${templateId}`}>
                <Sparkles className="w-4 h-4 mr-1" />
                Pakai Template Ini
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function GameTemplatesSection() {
  const gameTemplates = templates.filter((t) => !!t.gameType);
  if (gameTemplates.length === 0) return null;

  return (
    <section id="template-game" className="py-12 bg-gradient-to-b from-rose-50/40 via-background to-amber-50/40">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3">
            <Gamepad2 className="w-3.5 h-3.5" /> BARU · Interaktif
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Template <span className="text-gradient">Game Undangan</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Undangan yang bisa <strong>dimainkan</strong> oleh tamu sebelum dibuka.
            Tap kartu di bawah untuk mencoba langsung — semua sudah playable.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 max-w-6xl mx-auto"
        >
          {gameTemplates.map((t) => {
            const url = getRoute(t.gameType);
            if (!url) return null;
            return (
              <GameCard
                key={t.id}
                name={t.name}
                description={TAGLINES[t.gameType!] || t.description}
                url={url}
                templateId={t.id}
                colors={t.colorScheme}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}