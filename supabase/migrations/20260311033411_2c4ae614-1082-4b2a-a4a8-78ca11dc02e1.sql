CREATE OR REPLACE FUNCTION public.is_user_premium(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.subscriptions
    WHERE user_id = _user_id
      AND status = 'active'
      AND expires_at > now()
  )
$$;

-- Also update all existing invitations for this premium user
UPDATE public.invitations 
SET is_paid = true 
WHERE user_id = '82f62a59-1cc8-45d4-84cb-9c123335e16b' 
AND status = 'published';