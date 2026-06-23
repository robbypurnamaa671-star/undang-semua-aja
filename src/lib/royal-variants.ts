import javaneseMobile from "@/assets/royal-javanese-opening-mobile.mp4.asset.json";
import javaneseDesktop from "@/assets/royal-javanese-opening-optimized.mp4.asset.json";
import javanesePoster from "@/assets/royal-javanese-opening-poster.jpg.asset.json";
import sundaneseMobile from "@/assets/royal-sundanese-opening-mobile.mp4.asset.json";
import sundaneseDesktop from "@/assets/royal-sundanese-opening-optimized.mp4.asset.json";
import sundanesePoster from "@/assets/royal-sundanese-opening-poster.jpg.asset.json";
import { resolveLovableAssetUrl } from "@/lib/asset-url";

export type RoyalVariant = "javanese" | "sundanese";

export interface RoyalVariantConfig {
  id: RoyalVariant;
  label: string;             // e.g. "Royal Javanese Wedding Story"
  heroEyebrow: string;        // e.g. "The Wedding Of"
  storyTitle: string;         // e.g. "Perjalanan Cinta Kami"
  storyEyebrow: string;       // e.g. "Royal Love Story"
  defaultQuote: string;
  // Theme tokens
  ink: string;               // dark background
  gold: string;
  goldSoft: string;
  champagne: string;         // light text on dark
  parchment: string;         // light section bg
  // Opening assets (CDN-resolved)
  mobileVideoUrl: string;
  desktopVideoUrl: string;
  posterUrl: string;
}

export const ROYAL_VARIANTS: Record<RoyalVariant, RoyalVariantConfig> = {
  javanese: {
    id: "javanese",
    label: "Royal Javanese Wedding Story",
    heroEyebrow: "The Wedding Of",
    storyTitle: "Perjalanan Cinta Kami",
    storyEyebrow: "Royal Love Story",
    defaultQuote: "Sebuah kisah cinta yang ditulis oleh takdir.",
    ink: "#1A1208",
    gold: "#C9A227",
    goldSoft: "#E5C870",
    champagne: "#F5E6C8",
    parchment: "#FBF4DF",
    mobileVideoUrl: resolveLovableAssetUrl(javaneseMobile.url),
    desktopVideoUrl: resolveLovableAssetUrl(javaneseDesktop.url),
    posterUrl: resolveLovableAssetUrl(javanesePoster.url),
  },
  sundanese: {
    id: "sundanese",
    label: "Royal Sundanese Wedding Story",
    heroEyebrow: "The Wedding Of",
    storyTitle: "Lalampahan Asih Kami",
    storyEyebrow: "Royal Sundanese Love Story",
    defaultQuote: "Hiji carita asih nu ditulis ku takdir.",
    ink: "#0F2418",
    gold: "#C9A227",
    goldSoft: "#E5C870",
    champagne: "#F0E4C2",
    parchment: "#F5F0DE",
    mobileVideoUrl: resolveLovableAssetUrl(sundaneseMobile.url),
    desktopVideoUrl: resolveLovableAssetUrl(sundaneseDesktop.url),
    posterUrl: resolveLovableAssetUrl(sundanesePoster.url),
  },
};

export function getRoyalVariant(v?: RoyalVariant): RoyalVariantConfig {
  return ROYAL_VARIANTS[v || "javanese"];
}