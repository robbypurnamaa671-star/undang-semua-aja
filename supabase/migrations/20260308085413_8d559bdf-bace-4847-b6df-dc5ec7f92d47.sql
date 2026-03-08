
-- Function to get subscriptions with user emails (admin only)
CREATE OR REPLACE FUNCTION public.get_subscriptions_with_emails()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT json_agg(r ORDER BY r.created_at DESC) INTO result FROM (
    SELECT 
      s.id,
      s.user_id,
      u.email,
      s.status,
      s.amount,
      s.paid_at,
      s.expires_at,
      s.invoice_number,
      s.created_at
    FROM subscriptions s
    JOIN auth.users u ON u.id = s.user_id
    ORDER BY s.created_at DESC
    LIMIT 200
  ) r;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

-- Function to get all users with their premium status (admin only)
CREATE OR REPLACE FUNCTION public.get_all_users_admin()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT json_agg(r ORDER BY r.created_at DESC) INTO result FROM (
    SELECT 
      u.id as user_id,
      u.email,
      u.created_at,
      (
        SELECT json_build_object(
          'id', s.id,
          'status', s.status,
          'expires_at', s.expires_at,
          'paid_at', s.paid_at,
          'invoice_number', s.invoice_number,
          'amount', s.amount
        )
        FROM subscriptions s 
        WHERE s.user_id = u.id AND s.status = 'active'
        ORDER BY s.created_at DESC
        LIMIT 1
      ) as active_subscription
    FROM auth.users u
    ORDER BY u.created_at DESC
    LIMIT 500
  ) r;

  RETURN COALESCE(result, '[]'::json);
END;
$$;

-- Admin can manage subscriptions
CREATE POLICY "Admins can insert subscriptions"
ON public.subscriptions
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update subscriptions"
ON public.subscriptions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete subscriptions"
ON public.subscriptions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
