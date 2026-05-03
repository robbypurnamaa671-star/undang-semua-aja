
-- Remove broad public SELECT policy that exposed user_id
DROP POLICY IF EXISTS "Public can view published invitations" ON public.invitations;

-- Secure RPC to fetch a published invitation by slug without exposing user_id
CREATE OR REPLACE FUNCTION public.get_published_invitation(_slug text)
RETURNS json
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  SELECT to_json(r) INTO result FROM (
    SELECT
      i.id,
      i.slug,
      i.event_type,
      i.template_id,
      i.status,
      -- expose effective paid status (true if owner has active premium)
      (i.is_paid OR public.is_user_premium(i.user_id)) AS is_paid,
      i.title,
      i.names,
      i.event_date,
      i.event_time,
      i.timezone,
      i.location_name,
      i.location_address,
      i.location_map_url,
      i.message,
      i.cover_image,
      i.gallery_images,
      i.theme_color,
      i.events,
      i.bank_accounts,
      i.closing_message,
      i.closing_prayer,
      i.music_url,
      i.whatsapp_number,
      i.guest_list,
      i.custom_backgrounds,
      i.created_at,
      i.updated_at,
      public.is_user_premium(i.user_id) AS owner_is_premium
    FROM public.invitations i
    WHERE i.slug = _slug AND i.status = 'published'
    LIMIT 1
  ) r;

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_published_invitation(text) TO anon, authenticated;
