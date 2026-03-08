-- Add custom_backgrounds column to store per-section background images for full-custom template
ALTER TABLE public.invitations 
ADD COLUMN custom_backgrounds jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Structure example:
-- {
--   "cover": "https://...",
--   "names": "https://...",
--   "countdown": "https://...",
--   "datetime": "https://...",
--   "location": "https://...",
--   "gallery": "https://...",
--   "rsvp": "https://...",
--   "guestbook": "https://...",
--   "closing": "https://..."
-- }
