import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { Crown, Eye, Music, Pause, Play, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Template } from "@/lib/templates";
import { InvitationPreview } from "@/components/builder/InvitationPreview";
import { createDemoInvitation, DEMO_MUSIC_URL } from "@/lib/demo-invitation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  template: Template;
}

// Virtual mobile width the InvitationPreview is rendered at, then scaled
// down to fit the card. Matches the editor's mobile preview proportions.
const VIRTUAL_WIDTH = 360;

export function TemplatePreviewCard({ template }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Lazy-mount when card scrolls near viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  // Compute scale so VIRTUAL_WIDTH fits the card width
  useLayoutEffect(() => {
    if (!visible) return;
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / VIRTUAL_WIDTH);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visible]);

  // Defer "ready" one frame so first paint shows skeleton, then preview fades in
  useEffect(() => {
    if (!visible) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [visible]);

  const invitation = useMemo(() => createDemoInvitation(template), [template]);

  // Pause music when modal closes
  useEffect(() => {
    if (!open && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [open]);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
    <div
      role="button"
      tabIndex={0}
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
        }
      }}
      className="card-interactive group overflow-hidden relative max-w-[240px] mx-auto w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Lihat preview ${template.name}`}
    >
      <div
        ref={wrapperRef}
        className="aspect-[9/16] relative overflow-hidden bg-muted"
        style={{ backgroundColor: template.colorScheme.background }}
      >
        {/* Skeleton placeholder */}
        {!ready && (
          <div className="absolute inset-0 p-4 flex flex-col gap-3">
            <Skeleton className="h-3 w-2/3 mx-auto" />
            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
            <Skeleton className="h-4 w-4/5 mx-auto" />
            <Skeleton className="h-4 w-3/5 mx-auto" />
            <Skeleton className="h-24 w-full mt-2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        )}

        {/* Real preview, scaled to fit */}
        {visible && (
          <div
            className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-300 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              style={{
                width: VIRTUAL_WIDTH,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <InvitationPreview template={template} invitation={invitation} />
            </div>
          </div>
        )}

        {/* Sticky title bar */}
        <div className="absolute top-0 inset-x-0 z-20 px-3 py-2 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none">
          <h3 className="font-serif text-sm font-semibold text-white text-center drop-shadow line-clamp-1">
            {template.name}
          </h3>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-primary text-primary-foreground rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Lihat Preview
          </span>
        </div>
      </div>

      {/* Badge */}
      <div className="absolute top-3 right-3 z-30">
        {template.isPremium ? (
          <Badge className="bg-primary text-primary-foreground shadow-lg">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-background/90 text-primary border-primary">
            Gratis
          </Badge>
        )}
      </div>

      {/* Info footer */}
      <div className="p-4 bg-card">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold truncate">{template.name}</h4>
            <p className="text-sm text-muted-foreground capitalize truncate">
              {template.eventTypes[0]}
            </p>
          </div>
          <Badge variant="secondary" className="capitalize shrink-0">
            {template.isPremium && <Crown className="w-3 h-3 mr-1" />}
            {template.style}
          </Badge>
        </div>
        <Button
          asChild
          size="sm"
          className="w-full mt-3 btn-hero"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={`/create?template=${template.id}`}>
            <Wand2 className="w-3.5 h-3.5 mr-1" />
            Buat Undangan dari Template
          </Link>
        </Button>
        <p className="text-[11px] text-muted-foreground mt-2 text-center">
          atau klik kartu untuk preview penuh
        </p>
      </div>
    </div>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm p-0 gap-0 overflow-hidden max-h-[92vh] flex flex-col">
        <DialogTitle className="sr-only">Preview {template.name}</DialogTitle>
        <div className="px-4 py-3 border-b flex items-center justify-between bg-card">
          <div className="min-w-0">
            <h3 className="font-serif font-semibold truncate">{template.name}</h3>
            <p className="text-xs text-muted-foreground capitalize truncate">
              {template.eventTypes[0]} · {template.style}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              size="sm"
              variant={playing ? "default" : "outline"}
              onClick={toggleMusic}
              className="h-8 px-2 gap-1"
              aria-label={playing ? "Jeda musik" : "Putar musik"}
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <Music className="w-3.5 h-3.5" />
            </Button>
            {template.isPremium ? (
              <Badge className="bg-primary text-primary-foreground">
                <Crown className="w-3 h-3 mr-1" /> Premium
              </Badge>
            ) : (
              <Badge variant="outline" className="text-primary border-primary">Gratis</Badge>
            )}
          </div>
        </div>
        <audio ref={audioRef} src={DEMO_MUSIC_URL} preload="none" loop />
        <div
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{ backgroundColor: template.colorScheme.background }}
        >
          <InvitationPreview template={template} invitation={invitation} />
        </div>
        <div className="p-3 border-t bg-card">
          <Button asChild className="w-full btn-hero">
            <Link to={`/create?template=${template.id}`}>
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
