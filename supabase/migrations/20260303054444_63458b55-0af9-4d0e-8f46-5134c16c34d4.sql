-- Add guest_list column to invitations table
ALTER TABLE public.invitations 
ADD COLUMN guest_list text[] NOT NULL DEFAULT '{}'::text[];