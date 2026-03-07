
-- Fix: Remove overly permissive UPDATE policy and replace with proper one
DROP POLICY "Allow public update for webhook processing" ON public.subscriptions;

-- Only allow updates via service role (edge functions use service role key)
-- No public UPDATE policy needed since edge functions use service_role
CREATE POLICY "Users can view updated subscriptions"
ON public.subscriptions FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
