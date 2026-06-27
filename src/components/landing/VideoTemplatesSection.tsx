import { motion } from "framer-motion";
import { useState } from "react";
import { Film, Play, Sparkles, X, Crown, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { templates, Template } from "@/lib/templates";

function getRoute(t: Template): string | null {
  if (t.isCinematic) return "/preview/cinematic-scroll-story";
  if (t.isRoyalJavanese) return "/preview/royal-story/javanese";
  if (t.isRoyalSundanese) return "/preview/royal-story/sundanese";
  if (t.isRoyalMinangkabau) return "/preview/royal-story/minangkabau";
  if (t.isRoyalBugis) return "/preview/royal-story/bugis";
  return null;
}

const TAGLINES: Record<string, string> = {
  "wedding-cinematic-scroll-story":
    "10 scene scroll-driven — cinematic seperti film pernikahan mewah.",
  "wedding-royal-javanese-story":
    "Opening video adat Jawa + timeline kisah cinta dengan ornamen keraton.",
  "wedding-royal-sundanese-story":
    "Nuansa Parahyangan hijau-emas dengan opening video adat Sunda.",
  "wedding-royal-minangkabau-story":
    "Opening video Minangkabau, palet merah-emas khas Rumah Gadang.",
  "wedding-royal-bugis-story":
    "Opening video Bugis dengan ornamen maroon-emas kerajaan Sulawesi.",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function VideoCard({
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
        className="group shrink-0 snap-start w-[150px] sm:w-[170px] lg:w-[185px] rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow flex flex-col"
      >
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

          <div className="absolute top-1.5 left-1.5 right-1.5 z-20 flex items-center justify-between pointer-events-none">
            <Badge
              className="text-[9px] px-1.5 py-0.5 shadow-md gap-1 backdrop-blur"
              style={{ background: colors.primary, color: "#fff" }}
            >
              <Film className="w-2.5 h-2.5" /> VIDEO
            </Badge>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="absolute bottom-1.5 left-1.5 right-1.5 z-20 mx-auto w-fit px-2 py-1 rounded-full bg-white/95 text-foreground text-[10px] font-semibold shadow-md flex items-center gap-1 hover:scale-105 transition-transform"
          >
            <Play className="w-2.5 h-2.5 fill-current" /> Layar Penuh
          </button>
        </div>

        <div className="p-2 flex flex-col gap-1">
          <h3 className="font-serif font-semibold text-xs leading-tight truncate">
            {name}
          </h3>
          <p className="text-[10px] text-muted-foreground line-clamp-2 min-h-[2.4em]">
            {description}
          </p>
          <Button
            asChild
            size="sm"
            className="mt-1 w-full h-7 text-[10px]"
            style={{ background: colors.primary, color: "#fff" }}
          >
            <Link to={`/create?template=${templateId}`}>
              <Wand2 className="w-3 h-3 mr-1" />
              Buat dari Template
            </Link>
          </Button>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden h-[90vh] flex flex-col">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <div className="px-4 py-2 border-b flex items-center justify-between bg-card">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Template Elit Video
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
            title={`Pratinjau ${name}`}
            className="flex-1 w-full border-0 bg-background"
          />
          <div className="p-3 border-t bg-card">
            <Button
              asChild
              className="w-full"
              style={{ background: colors.primary, color: "#fff" }}
            >
              <Link to={`/create?template=${templateId}`}>
                <Wand2 className="w-4 h-4 mr-1" />
                Buat Undangan dari Template
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function VideoTemplatesSection() {
  const videoTemplates = templates.filter(
    (t) =>
      t.isCinematic ||
      t.isRoyalJavanese ||
      t.isRoyalSundanese ||
      t.isRoyalMinangkabau ||
      t.isRoyalBugis,
  );
  if (videoTemplates.length === 0) return null;

  return (
    <section
      id="template-video"
      className="py-10 bg-gradient-to-b from-amber-50/40 via-background to-amber-50/20"
    >
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold mb-2">
            <Crown className="w-3 h-3" /> ELIT · Sinematik Video
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Template <span className="text-gradient">Elit Video</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Undangan sinematik dengan <strong>opening video</strong> dan scene
            scroll-driven. Geser kartu untuk melihat semua, tap untuk pratinjau
            penuh.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-nowrap gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 -mx-4 px-4 sm:-mx-2 sm:px-2 lg:mx-0 lg:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {videoTemplates.map((t) => {
            const url = getRoute(t);
            if (!url) return null;
            return (
              <VideoCard
                key={t.id}
                name={t.name}
                description={TAGLINES[t.id] || t.description}
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