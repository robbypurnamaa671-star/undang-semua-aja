DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'seo_pages_slug_key'
  ) THEN
    ALTER TABLE public.seo_pages ADD CONSTRAINT seo_pages_slug_key UNIQUE (slug);
  END IF;
END $$;