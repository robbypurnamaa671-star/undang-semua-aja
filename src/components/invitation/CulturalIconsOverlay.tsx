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
  // Left side — more visible
  { top: 3, left: -2, rotate: -12, scale: 1.1, opacity: 0.13 },
  { top: 25, left: 1, rotate: 18, scale: 0.9, opacity: 0.10 },
  { top: 50, left: -1, rotate: -25, scale: 1.0, opacity: 0.11 },
  { top: 75, left: 2, rotate: 8, scale: 0.85, opacity: 0.09 },
  // Right side
  { top: 10, left: 78, rotate: 22, scale: 1.0, opacity: 0.13 },
  { top: 38, left: 80, rotate: -15, scale: 1.1, opacity: 0.10 },
  { top: 60, left: 76, rotate: 30, scale: 0.9, opacity: 0.11 },
  { top: 85, left: 79, rotate: -8, scale: 1.0, opacity: 0.09 },
  // Sparse center accents (subtler)
  { top: 18, left: 40, rotate: 5, scale: 0.7, opacity: 0.06 },
  { top: 45, left: 50, rotate: -10, scale: 0.75, opacity: 0.05 },
  { top: 70, left: 42, rotate: 12, scale: 0.65, opacity: 0.06 },
];

function MotifSVG({ 
  motif, 
  color, 
  size = 110,
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
        fillOpacity={0.6}
        stroke={color}
        strokeWidth={1.5}
        strokeOpacity={0.7}
      />
      {motif.path2 && (
        <path
          d={motif.path2}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeOpacity={0.5}
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
