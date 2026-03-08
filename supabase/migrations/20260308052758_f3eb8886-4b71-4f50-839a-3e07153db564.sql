
-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL DEFAULT '',
  meta_title text,
  meta_description text,
  featured_image text,
  author text NOT NULL DEFAULT 'Undanganlink',
  status text NOT NULL DEFAULT 'draft',
  tags text[] NOT NULL DEFAULT '{}',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- SEO pages table (programmatic)
CREATE TABLE public.seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  h1 text,
  meta_title text,
  meta_description text,
  content text NOT NULL DEFAULT '',
  keywords text[] NOT NULL DEFAULT '{}',
  internal_links jsonb NOT NULL DEFAULT '[]',
  faq jsonb NOT NULL DEFAULT '[]',
  status text NOT NULL DEFAULT 'draft',
  page_type text NOT NULL DEFAULT 'landing',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Anyone can view published seo pages"
  ON public.seo_pages FOR SELECT
  USING (status = 'published');

-- Indexes for performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX idx_seo_pages_slug ON public.seo_pages(slug);
CREATE INDEX idx_seo_pages_status ON public.seo_pages(status);
CREATE INDEX idx_seo_pages_page_type ON public.seo_pages(page_type);
