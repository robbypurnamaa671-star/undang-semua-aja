import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://undanganku.app";

serve(async () => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Static pages
    const staticPages = [
      { loc: "/", priority: "1.0", changefreq: "daily" },
      { loc: "/blog", priority: "0.8", changefreq: "daily" },
      { loc: "/templates", priority: "0.8", changefreq: "weekly" },
      { loc: "/register", priority: "0.7", changefreq: "monthly" },
      { loc: "/login", priority: "0.3", changefreq: "monthly" },
    ];

    // Blog posts
    const { data: blogPosts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("status", "published");

    // SEO pages – fetch all (may exceed 1000)
    let seoPages: { slug: string; updated_at: string }[] = [];
    let seoOffset = 0;
    const pageSize = 1000;
    while (true) {
      const { data } = await supabase
        .from("seo_pages")
        .select("slug, updated_at")
        .eq("status", "published")
        .range(seoOffset, seoOffset + pageSize - 1);
      if (!data || data.length === 0) break;
      seoPages = seoPages.concat(data);
      if (data.length < pageSize) break;
      seoOffset += pageSize;
    }

    // Published invitations (public)
    const { data: invitations } = await supabase
      .from("invitations")
      .select("slug, updated_at")
      .eq("status", "published");

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Blog posts
    if (blogPosts) {
      for (const post of blogPosts) {
        xml += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    }

    // SEO pages
    if (seoPages) {
      for (const page of seoPages) {
        xml += `
  <url>
    <loc>${BASE_URL}/p/${page.slug}</loc>
    <lastmod>${new Date(page.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    }

    // Invitations
    if (invitations) {
      for (const inv of invitations) {
        xml += `
  <url>
    <loc>${BASE_URL}/invite/${inv.slug}</loc>
    <lastmod>${new Date(inv.updated_at).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      }
    }

    xml += `
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new Response("Error generating sitemap", { status: 500 });
  }
});
