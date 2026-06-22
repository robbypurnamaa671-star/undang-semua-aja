const LOVABLE_ASSET_ORIGIN = "https://undang-semua-aja.lovable.app";

export function resolveLovableAssetUrl(url: string) {
  return url.startsWith("/__l5e/") ? `${LOVABLE_ASSET_ORIGIN}${url}` : url;
}