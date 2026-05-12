import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Template } from "@/lib/templates";
import { InvitationPreview } from "@/components/builder/InvitationPreview";
import { createDefaultInvitation } from "@/lib/invitation";

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

  const invitation = createDefaultInvitation(
    template.eventTypes[0],
    template.id
  );

  return (
    <div className="card-interactive group overflow-hidden relative max-w-[240px] mx-auto">
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
            className={`absolute inset-0 overflow-y-auto overscroll-contain scrollbar-thin transition-opacity duration-300 ${
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
        <p className="text-[11px] text-muted-foreground mt-2 italic">
          Geser ke bawah untuk lihat preview penuh
        </p>
      </div>
    </div>
  );
}
