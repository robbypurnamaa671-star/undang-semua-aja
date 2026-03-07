
-- Subscriptions table to track premium payments
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  invoice_number text NOT NULL UNIQUE,
  amount integer NOT NULL DEFAULT 12000,
  payment_method text,
  doku_payment_url text,
  doku_payment_token text,
  paid_at timestamp with time zone,
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscriptions
CREATE POLICY "Users can view their own subscriptions"
ON public.subscriptions FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Users can create their own subscriptions
CREATE POLICY "Users can insert their own subscriptions"
ON public.subscriptions FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow service role (edge functions) to update subscriptions via anon for webhook
CREATE POLICY "Allow public update for webhook processing"
ON public.subscriptions FOR UPDATE
USING (true)
WITH CHECK (true);

-- Trigger to update updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
