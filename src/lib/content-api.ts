import { supabase } from "@/integrations/supabase/client";

// Blog posts
export async function fetchBlogPosts(limit = 20, offset = 0) {
  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, author, published_at, tags", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { posts: data || [], total: count || 0 };
}

export async function fetchBlogPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) throw error;
  return data;
}

export async function fetchRelatedPosts(currentSlug: string, tags: string[], limit = 3) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, published_at")
    .eq("status", "published")
    .neq("slug", currentSlug)
    .overlaps("tags", tags)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function fetchAllBlogSlugs() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published");

  if (error) throw error;
  return data || [];
}

// Parse headings from HTML content for Table of Contents
export function parseTableOfContents(html: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([23])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[23]>/gi;
  const toc: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[3].replace(/<[^>]*>/g, "").trim();
    const id = match[2] || text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    toc.push({ id, text, level });
  }

  return toc;
}

// Add IDs to headings in HTML content
export function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (match, level, attrs, text) => {
    const plainText = text.replace(/<[^>]*>/g, "").trim();
    const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (attrs.includes('id="')) return match;
    return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
  });
}
