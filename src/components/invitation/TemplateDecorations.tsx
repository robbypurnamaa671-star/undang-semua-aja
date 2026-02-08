import { TemplateCulturalStyle } from "@/lib/template-styles";

interface DecorativeProps {
  style: TemplateCulturalStyle;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

/** Corner ornaments rendered at the four corners of a section */
export function CornerOrnaments({ style, primaryColor }: DecorativeProps) {
  if (style.cornerMotif === 'none') return null;

  const motifMap: Record<string, string> = {
    floral: '❁',
    geometric: '◇',
    wave: '〰',
    tribal: '◈',
    islamic: '✦',
    royal: '⚜',
  };

  const motif = motifMap[style.cornerMotif] || '✦';
  const size = style.cornerMotif === 'tribal' ? 'text-xl' : 'text-lg';

  return (
    <>
      <span 
        className={`absolute top-2 left-3 ${size} opacity-30 select-none`}
        style={{ color: primaryColor }}
      >
        {motif}
      </span>
      <span 
        className={`absolute top-2 right-3 ${size} opacity-30 select-none`}
        style={{ color: primaryColor, transform: 'scaleX(-1)' }}
      >
        {motif}
      </span>
      <span 
        className={`absolute bottom-2 left-3 ${size} opacity-30 select-none`}
        style={{ color: primaryColor, transform: 'scaleY(-1)' }}
      >
        {motif}
      </span>
      <span 
        className={`absolute bottom-2 right-3 ${size} opacity-30 select-none`}
        style={{ color: primaryColor, transform: 'scale(-1, -1)' }}
      >
        {motif}
      </span>
    </>
  );
}

/** Decorative divider between sections */
export function Divider({ style, primaryColor }: DecorativeProps) {
  const renderDivider = () => {
    switch (style.dividerStyle) {
      case 'ornate':
        return (
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: primaryColor, opacity: 0.3 }} />
            <span className="text-sm opacity-60" style={{ color: primaryColor }}>
              {style.culturalMotifs[0] || '✦'}
            </span>
            <span className="text-xs opacity-40" style={{ color: primaryColor }}>
              {style.culturalMotifs[1] || '✦'}
            </span>
            <span className="text-sm opacity-60" style={{ color: primaryColor }}>
              {style.culturalMotifs[0] || '✦'}
            </span>
            <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: primaryColor, opacity: 0.3 }} />
          </div>
        );

      case 'diamond':
        return (
          <div className="flex items-center justify-center gap-1 my-4">
            <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
            <span className="text-[10px] opacity-40" style={{ color: primaryColor }}>◆</span>
            <span className="text-xs opacity-50" style={{ color: primaryColor }}>◆</span>
            <span className="text-sm opacity-70" style={{ color: primaryColor }}>◆</span>
            <span className="text-xs opacity-50" style={{ color: primaryColor }}>◆</span>
            <span className="text-[10px] opacity-40" style={{ color: primaryColor }}>◆</span>
            <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
          </div>
        );

      case 'wave':
        return (
          <div className="flex items-center justify-center my-4">
            <span className="text-lg tracking-[0.5em] opacity-30" style={{ color: primaryColor }}>
              ∿∿∿∿∿
            </span>
          </div>
        );

      case 'arrow':
        return (
          <div className="flex items-center justify-center gap-1 my-4">
            <span className="text-xs opacity-30" style={{ color: primaryColor }}>▸</span>
            <span className="text-xs opacity-40" style={{ color: primaryColor }}>▸</span>
            <span className="text-sm opacity-60" style={{ color: primaryColor }}>
              {style.culturalMotifs[0] || '◈'}
            </span>
            <span className="text-xs opacity-40" style={{ color: primaryColor }}>◂</span>
            <span className="text-xs opacity-30" style={{ color: primaryColor }}>◂</span>
          </div>
        );

      case 'leaf':
        return (
          <div className="flex items-center justify-center gap-2 my-4">
            <span className="text-sm opacity-40" style={{ color: primaryColor, transform: 'scaleX(-1)' }}>🌿</span>
            <div className="w-2 h-2 rounded-full opacity-30" style={{ backgroundColor: primaryColor }} />
            <span className="text-sm opacity-40" style={{ color: primaryColor }}>🌿</span>
          </div>
        );

      case 'dotted':
        return (
          <div className="flex items-center justify-center gap-1.5 my-4">
            {[0.2, 0.35, 0.5, 0.65, 0.8, 0.65, 0.5, 0.35, 0.2].map((op, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: primaryColor, opacity: op }}
              />
            ))}
          </div>
        );

      default: // simple
        return (
          <div className="flex items-center justify-center my-4">
            <div className="w-16 h-0.5 rounded-full" style={{ backgroundColor: primaryColor, opacity: 0.3 }} />
          </div>
        );
    }
  };

  return renderDivider();
}

/** Cultural greeting text block */
export function GreetingText({ style, primaryColor, textColor }: DecorativeProps) {
  const lines = style.greeting.split('\n');

  return (
    <div className="text-center px-4 py-3 space-y-1">
      {lines.map((line, i) => (
        <p 
          key={i}
          className={`${i === 0 ? 'text-xs font-medium' : 'text-[11px]'} leading-relaxed`}
          style={{ color: i === 0 ? primaryColor : textColor, opacity: i === 0 ? 0.9 : 0.6 }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

/** Closing text block */
export function ClosingText({ style, textColor }: DecorativeProps) {
  return (
    <p 
      className="text-[11px] text-center leading-relaxed italic px-4 py-2"
      style={{ color: textColor, opacity: 0.6 }}
    >
      {style.closingText}
    </p>
  );
}

/** Decorative border wrapper for sections */
export function SectionWrapper({ 
  style, 
  primaryColor, 
  secondaryColor,
  children,
  className = '',
}: DecorativeProps & { children: React.ReactNode; className?: string }) {
  const borderStyles: Record<string, React.CSSProperties> = {
    double: { 
      border: `3px double ${primaryColor}30`,
      borderRadius: style.sectionRadius,
    },
    solid: { 
      border: `1px solid ${primaryColor}20`,
      borderRadius: style.sectionRadius,
    },
    dashed: { 
      border: `1px dashed ${primaryColor}25`,
      borderRadius: style.sectionRadius,
    },
    ornate: {
      border: `2px solid ${primaryColor}20`,
      borderRadius: style.sectionRadius,
      boxShadow: `inset 0 0 0 3px ${secondaryColor}40`,
    },
    none: {
      borderRadius: style.sectionRadius,
    },
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        ...borderStyles[style.borderStyle],
        backgroundColor: secondaryColor + '30',
      }}
    >
      {children}
    </div>
  );
}

/** Background pattern overlay */
export function PatternOverlay({ style }: { style: TemplateCulturalStyle }) {
  if (!style.backgroundPattern) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: style.backgroundPattern }}
    />
  );
}

/** Small cultural motif line for card previews */
export function CulturalMotifLine({ style, primaryColor }: { style: TemplateCulturalStyle; primaryColor: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-2">
      {style.culturalMotifs.slice(0, 3).map((motif, i) => (
        <span 
          key={i} 
          className="text-xs opacity-50"
          style={{ color: primaryColor }}
        >
          {motif}
        </span>
      ))}
    </div>
  );
}
