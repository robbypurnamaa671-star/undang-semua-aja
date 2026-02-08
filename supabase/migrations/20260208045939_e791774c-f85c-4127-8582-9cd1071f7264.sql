
-- Add new columns to invitations table for enhanced wedding features
ALTER TABLE public.invitations 
  ADD COLUMN IF NOT EXISTS timezone TEXT NOT NULL DEFAULT 'WIB',
  ADD COLUMN IF NOT EXISTS events JSONB[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS bank_accounts JSONB[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS closing_message TEXT,
  ADD COLUMN IF NOT EXISTS closing_prayer TEXT,
  ADD COLUMN IF NOT EXISTS music_url TEXT;

-- Create RSVP responses table
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL DEFAULT 'hadir',
  guest_count INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create guest messages / buku tamu table
CREATE TABLE public.guest_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_messages ENABLE ROW LEVEL SECURITY;

-- RSVP policies: anyone can submit (public invitation), owners can read
CREATE POLICY "Anyone can submit RSVP to published invitations"
  ON public.rsvp_responses
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND status = 'published'
    )
  );

CREATE POLICY "Anyone can view RSVP for published invitations"
  ON public.rsvp_responses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND (status = 'published' OR user_id = auth.uid())
    )
  );

CREATE POLICY "Invitation owners can delete RSVP"
  ON public.rsvp_responses
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND user_id = auth.uid()
    )
  );

-- Guest messages policies: anyone can submit, public read for approved, owners full access
CREATE POLICY "Anyone can submit guest messages to published invitations"
  ON public.guest_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND status = 'published'
    )
  );

CREATE POLICY "Anyone can view approved messages for published invitations"
  ON public.guest_messages
  FOR SELECT
  USING (
    (is_approved = true AND EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND status = 'published'
    ))
    OR
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Invitation owners can update guest messages"
  ON public.guest_messages
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Invitation owners can delete guest messages"
  ON public.guest_messages
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE id = invitation_id AND user_id = auth.uid()
    )
  );

-- Add indexes for performance
CREATE INDEX idx_rsvp_invitation_id ON public.rsvp_responses(invitation_id);
CREATE INDEX idx_guest_messages_invitation_id ON public.guest_messages(invitation_id);
CREATE INDEX idx_guest_messages_approved ON public.guest_messages(invitation_id, is_approved);
