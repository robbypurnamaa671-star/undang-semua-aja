import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://www.undanganlink.com";
const SITEMAP_FUNCTION_URL_BASE = `${BASE_URL}/sitemap`;

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const headers = {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    };

    // Sub-sitemap: static pages + templates
    if (type === "static") {
      const staticPages = [
        { loc: "/", priority: "1.0", changefreq: "daily" },
        { loc: "/blog", priority: "0.8", changefreq: "daily" },
        { loc: "/templates", priority: "0.8", changefreq: "weekly" },
        { loc: "/register", priority: "0.7", changefreq: "monthly" },
        { loc: "/login", priority: "0.3", changefreq: "monthly" },
      ];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (const page of staticPages) {
        xml += `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      }

      xml += `
</urlset>`;
      return new Response(xml, { headers });
    }

    // Sub-sitemap: blog posts
    if (type === "blog") {
      const allPosts = await fetchAll(supabase, "blog_posts", "slug, updated_at", "status", "published");

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (const post of allPosts) {
        xml += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${toDate(post.updated_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }

      xml += `
</urlset>`;
      return new Response(xml, { headers });
    }

    // Sub-sitemap: invitations
    if (type === "invitations") {
      const allInvitations = await fetchAll(supabase, "invitations", "slug, updated_at", "status", "published");

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (const inv of allInvitations) {
        xml += `
  <url>
    <loc>${BASE_URL}/invite/${inv.slug}</loc>
    <lastmod>${toDate(inv.updated_at)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      }

      xml += `
</urlset>`;
      return new Response(xml, { headers });
    }

    // Sub-sitemap: SEO pages
    if (type === "seo-pages") {
      const allPages = await fetchAll(supabase, "seo_pages", "slug, updated_at", "status", "published");

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (const page of allPages) {
        xml += `
  <url>
    <loc>${BASE_URL}/p/${page.slug}</loc>
    <lastmod>${toDate(page.updated_at)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }

      xml += `
</urlset>`;
      return new Response(xml, { headers });
    }

    // Default: Sitemap Index
    const now = toDate(new Date().toISOString());

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-static.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-invitations.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-seo-pages.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new Response(xml, { headers });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
});

function toDate(isoString: string): string {
  return new Date(isoString).toISOString().split("T")[0];
}

async function fetchAll(
  supabase: any,
  table: string,
  select: string,
  filterCol: string,
  filterVal: string
): Promise<any[]> {
  const PAGE_SIZE = 1000;
  let all: any[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq(filterCol, filterVal)
      .range(offset, offset + PAGE_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return all;
}
