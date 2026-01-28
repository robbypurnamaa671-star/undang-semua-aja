-- Create invitations table to store user invitations
CREATE TABLE public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  template_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_paid BOOLEAN NOT NULL DEFAULT false,
  
  -- Content
  title TEXT NOT NULL DEFAULT '',
  names TEXT[] NOT NULL DEFAULT '{}',
  event_date TEXT,
  event_time TEXT,
  location_name TEXT,
  location_address TEXT,
  location_map_url TEXT,
  message TEXT,
  
  -- Customization
  cover_image TEXT,
  gallery_images TEXT[] NOT NULL DEFAULT '{}',
  theme_color TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_invitations_user_id ON public.invitations(user_id);
CREATE INDEX idx_invitations_slug ON public.invitations(slug);

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own invitations
CREATE POLICY "Users can view their own invitations"
ON public.invitations FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own invitations
CREATE POLICY "Users can create their own invitations"
ON public.invitations FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own invitations
CREATE POLICY "Users can update their own invitations"
ON public.invitations FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own invitations
CREATE POLICY "Users can delete their own invitations"
ON public.invitations FOR DELETE
USING (auth.uid() = user_id);

-- Public can view published invitations by slug
CREATE POLICY "Public can view published invitations"
ON public.invitations FOR SELECT
USING (status = 'published');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_invitations_updated_at
BEFORE UPDATE ON public.invitations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();