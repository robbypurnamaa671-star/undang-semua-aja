import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
  };
}

function getReferrer(): string | null {
  const ref = document.referrer;
  if (!ref) return null;
  try {
    const url = new URL(ref);
    // Exclude same-site referrer
    if (url.hostname === window.location.hostname) return null;
    return url.hostname;
  } catch {
    return ref;
  }
}

export function usePageViewTracker(pageId: string | undefined, slug: string | undefined) {
  useEffect(() => {
    if (!pageId || !slug) return;

    const utm = getUtmParams();

    supabase
      .from("seo_page_views")
      .insert({
        seo_page_id: pageId,
        slug,
        referrer: getReferrer(),
        user_agent: navigator.userAgent,
        device_type: getDeviceType(),
        ...utm,
      })
      .then(({ error }) => {
        if (error) console.error("Page view tracking error:", error);
      });
  }, [pageId, slug]);
}
