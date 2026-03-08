-- Analytics table for SEO page views
CREATE TABLE public.seo_page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seo_page_id uuid REFERENCES public.seo_pages(id) ON DELETE CASCADE NOT NULL,
  slug text NOT NULL,
  referrer text,
  user_agent text,
  device_type text DEFAULT 'desktop',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  country text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast analytics queries
CREATE INDEX idx_seo_page_views_slug ON public.seo_page_views(slug);
CREATE INDEX idx_seo_page_views_created_at ON public.seo_page_views(created_at);
CREATE INDEX idx_seo_page_views_seo_page_id ON public.seo_page_views(seo_page_id);

-- Enable RLS
ALTER TABLE public.seo_page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (anonymous page views)
CREATE POLICY "Anyone can insert page views"
  ON public.seo_page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read analytics
CREATE POLICY "Admins can view page views"
  ON public.seo_page_views
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- DB function for aggregated analytics
CREATE OR REPLACE FUNCTION public.get_seo_analytics(
  days_back integer DEFAULT 30
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT json_build_object(
    'total_views', (SELECT count(*) FROM seo_page_views WHERE created_at >= now() - (days_back || ' days')::interval),
    'views_today', (SELECT count(*) FROM seo_page_views WHERE created_at >= CURRENT_DATE),
    'views_yesterday', (SELECT count(*) FROM seo_page_views WHERE created_at >= CURRENT_DATE - interval '1 day' AND created_at < CURRENT_DATE),
    'top_pages', (
      SELECT json_agg(r) FROM (
        SELECT sp.slug, sp.title, sp.h1, count(*) as views
        FROM seo_page_views spv
        JOIN seo_pages sp ON sp.id = spv.seo_page_id
        WHERE spv.created_at >= now() - (days_back || ' days')::interval
        GROUP BY sp.slug, sp.title, sp.h1
        ORDER BY views DESC
        LIMIT 20
      ) r
    ),
    'top_cities', (
      SELECT json_agg(r) FROM (
        SELECT 
          CASE 
            WHEN sp.slug LIKE '%-jakarta' THEN 'Jakarta'
            WHEN sp.slug LIKE '%-bandung' THEN 'Bandung'
            WHEN sp.slug LIKE '%-surabaya' THEN 'Surabaya'
            WHEN sp.slug LIKE '%-yogyakarta' THEN 'Yogyakarta'
            WHEN sp.slug LIKE '%-semarang' THEN 'Semarang'
            WHEN sp.slug LIKE '%-medan' THEN 'Medan'
            WHEN sp.slug LIKE '%-makassar' THEN 'Makassar'
            WHEN sp.slug LIKE '%-denpasar' THEN 'Denpasar'
            WHEN sp.slug LIKE '%-bogor' THEN 'Bogor'
            WHEN sp.slug LIKE '%-bekasi' THEN 'Bekasi'
            WHEN sp.slug LIKE '%-tangerang' THEN 'Tangerang'
            WHEN sp.slug LIKE '%-depok' THEN 'Depok'
            WHEN sp.slug LIKE '%-malang' THEN 'Malang'
            WHEN sp.slug LIKE '%-solo' THEN 'Solo'
            WHEN sp.slug LIKE '%-palembang' THEN 'Palembang'
            WHEN sp.slug LIKE '%-balikpapan' THEN 'Balikpapan'
            WHEN sp.slug LIKE '%-pontianak' THEN 'Pontianak'
            WHEN sp.slug LIKE '%-pekanbaru' THEN 'Pekanbaru'
            WHEN sp.slug LIKE '%-padang' THEN 'Padang'
            WHEN sp.slug LIKE '%-banjarmasin' THEN 'Banjarmasin'
            ELSE 'Other'
          END as city,
          count(*) as views
        FROM seo_page_views spv
        JOIN seo_pages sp ON sp.id = spv.seo_page_id
        WHERE spv.created_at >= now() - (days_back || ' days')::interval
        GROUP BY city
        ORDER BY views DESC
      ) r
    ),
    'top_events', (
      SELECT json_agg(r) FROM (
        SELECT 
          CASE 
            WHEN sp.slug LIKE '%pernikahan%' THEN 'Pernikahan'
            WHEN sp.slug LIKE '%khitanan%' THEN 'Khitanan'
            WHEN sp.slug LIKE '%aqiqah%' THEN 'Aqiqah'
            WHEN sp.slug LIKE '%ulang-tahun%' THEN 'Ulang Tahun'
            WHEN sp.slug LIKE '%syukuran%' THEN 'Syukuran'
            ELSE 'Other'
          END as event_type,
          count(*) as views
        FROM seo_page_views spv
        JOIN seo_pages sp ON sp.id = spv.seo_page_id
        WHERE spv.created_at >= now() - (days_back || ' days')::interval
        GROUP BY event_type
        ORDER BY views DESC
      ) r
    ),
    'top_styles', (
      SELECT json_agg(r) FROM (
        SELECT 
          CASE 
            WHEN sp.slug LIKE '%minimalis%' THEN 'Minimalis'
            WHEN sp.slug LIKE '%elegan%' THEN 'Elegan'
            WHEN sp.slug LIKE '%modern%' THEN 'Modern'
            WHEN sp.slug LIKE '%islami%' THEN 'Islami'
            WHEN sp.slug LIKE '%rustic%' THEN 'Rustic'
            WHEN sp.slug LIKE '%aesthetic%' THEN 'Aesthetic'
            ELSE 'Other'
          END as style,
          count(*) as views
        FROM seo_page_views spv
        JOIN seo_pages sp ON sp.id = spv.seo_page_id
        WHERE spv.created_at >= now() - (days_back || ' days')::interval
        GROUP BY style
        ORDER BY views DESC
      ) r
    ),
    'device_breakdown', (
      SELECT json_agg(r) FROM (
        SELECT device_type, count(*) as views
        FROM seo_page_views
        WHERE created_at >= now() - (days_back || ' days')::interval
        GROUP BY device_type
        ORDER BY views DESC
      ) r
    ),
    'top_referrers', (
      SELECT json_agg(r) FROM (
        SELECT COALESCE(referrer, 'Direct') as referrer, count(*) as views
        FROM seo_page_views
        WHERE created_at >= now() - (days_back || ' days')::interval
        GROUP BY referrer
        ORDER BY views DESC
        LIMIT 10
      ) r
    ),
    'daily_views', (
      SELECT json_agg(r) FROM (
        SELECT date_trunc('day', created_at)::date as date, count(*) as views
        FROM seo_page_views
        WHERE created_at >= now() - (days_back || ' days')::interval
        GROUP BY date
        ORDER BY date ASC
      ) r
    )
  ) INTO result;

  RETURN result;
END;
$$;