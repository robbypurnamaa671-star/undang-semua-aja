import { TemplateCulturalStyle } from "@/lib/template-styles";

interface CulturalIconsOverlayProps {
  style: TemplateCulturalStyle;
  primaryColor: string;
}

/**
 * Predefined positions for scattered cultural icons.
 * Uses percentage-based placement so it works on any screen size.
 * Each position has: top%, left%, rotation (deg), scale, opacity.
 */
const iconPositions = [
  // Left side scattered
  { top: 8, left: 5, rotate: -15, scale: 1.4, opacity: 0.07 },
  { top: 28, left: 8, rotate: 20, scale: 1.0, opacity: 0.05 },
  { top: 52, left: 3, rotate: -30, scale: 1.2, opacity: 0.06 },
  { top: 72, left: 10, rotate: 10, scale: 0.9, opacity: 0.05 },
  { top: 90, left: 6, rotate: -20, scale: 1.1, opacity: 0.06 },
  // Right side scattered
  { top: 15, left: 88, rotate: 25, scale: 1.1, opacity: 0.06 },
  { top: 38, left: 92, rotate: -10, scale: 1.3, opacity: 0.07 },
  { top: 60, left: 85, rotate: 35, scale: 1.0, opacity: 0.05 },
  { top: 80, left: 90, rotate: -25, scale: 1.2, opacity: 0.06 },
  // Center-ish accents (very subtle)
  { top: 45, left: 50, rotate: 0, scale: 1.8, opacity: 0.03 },
  { top: 20, left: 45, rotate: 15, scale: 1.0, opacity: 0.04 },
  { top: 65, left: 55, rotate: -15, scale: 1.1, opacity: 0.04 },
];

/**
 * Renders cultural emoji icons as subtle, scattered background decorations.
 * Lightweight: pure CSS positioning with no JS animations.
 * Only renders when the template has culturalIcons defined.
 */
export function CulturalIconsOverlay({ style, primaryColor }: CulturalIconsOverlayProps) {
  const icons = style.culturalIcons;
  if (!icons || icons.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {iconPositions.map((pos, i) => {
        const icon = icons[i % icons.length];
        return (
          <span
            key={i}
            className="absolute select-none leading-none"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
              opacity: pos.opacity,
              fontSize: '2rem',
              filter: `drop-shadow(0 0 1px ${primaryColor}20)`,
            }}
            title={icon.label}
          >
            {icon.emoji}
          </span>
        );
      })}
    </div>
  );
}
