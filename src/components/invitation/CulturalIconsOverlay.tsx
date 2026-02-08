import { TemplateCulturalStyle } from "@/lib/template-styles";
import { culturalMotifSets, CulturalMotifSVG } from "@/lib/cultural-motifs";

interface CulturalIconsOverlayProps {
  style: TemplateCulturalStyle;
  primaryColor: string;
  templateId: string;
}

/**
 * Predefined positions for scattered cultural SVG motifs.
 * Uses percentage-based placement for responsive design.
 * Each position: top%, left%, rotation (deg), scale, opacity.
 */
const motifPositions = [
  // Left side
  { top: 5, left: 2, rotate: -12, scale: 0.8, opacity: 0.06 },
  { top: 30, left: 4, rotate: 18, scale: 0.6, opacity: 0.05 },
  { top: 55, left: 1, rotate: -25, scale: 0.7, opacity: 0.05 },
  { top: 78, left: 5, rotate: 8, scale: 0.65, opacity: 0.04 },
  // Right side
  { top: 12, left: 82, rotate: 22, scale: 0.7, opacity: 0.06 },
  { top: 42, left: 85, rotate: -15, scale: 0.75, opacity: 0.05 },
  { top: 65, left: 80, rotate: 30, scale: 0.6, opacity: 0.05 },
  { top: 88, left: 84, rotate: -8, scale: 0.7, opacity: 0.04 },
  // Sparse center accents (very subtle)
  { top: 22, left: 45, rotate: 5, scale: 0.5, opacity: 0.025 },
  { top: 48, left: 52, rotate: -10, scale: 0.55, opacity: 0.02 },
  { top: 72, left: 48, rotate: 12, scale: 0.45, opacity: 0.025 },
];

function MotifSVG({ 
  motif, 
  color, 
  size = 80,
}: { 
  motif: CulturalMotifSVG; 
  color: string; 
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={motif.label}
    >
      <path
        d={motif.path}
        fill={color}
        fillOpacity={0.4}
        stroke={color}
        strokeWidth={1.2}
        strokeOpacity={0.5}
      />
      {motif.path2 && (
        <path
          d={motif.path2}
          fill="none"
          stroke={color}
          strokeWidth={0.8}
          strokeOpacity={0.35}
        />
      )}
    </svg>
  );
}

/**
 * Renders cultural SVG motifs as subtle, scattered background decorations.
 * Lightweight: pure SVG with CSS positioning, no JS animations.
 * Only renders when the template has matching motif definitions.
 */
export function CulturalIconsOverlay({ templateId, primaryColor }: CulturalIconsOverlayProps) {
  const motifs = culturalMotifSets[templateId];
  if (!motifs || motifs.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {motifPositions.map((pos, i) => {
        const motif = motifs[i % motifs.length];
        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
              opacity: pos.opacity,
            }}
          >
            <MotifSVG motif={motif} color={primaryColor} />
          </div>
        );
      })}
    </div>
  );
}
