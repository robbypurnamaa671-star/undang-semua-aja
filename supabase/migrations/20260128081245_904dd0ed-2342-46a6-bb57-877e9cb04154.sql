-- Create storage bucket for invitation images
INSERT INTO storage.buckets (id, name, public)
VALUES ('invitation-images', 'invitation-images', true);

-- Create RLS policy for public read access
CREATE POLICY "Public can view invitation images"
ON storage.objects FOR SELECT
USING (bucket_id = 'invitation-images');

-- Create RLS policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload invitation images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'invitation-images' AND auth.role() = 'authenticated');

-- Create RLS policy for users to update their own images
CREATE POLICY "Users can update their own invitation images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'invitation-images' AND auth.role() = 'authenticated');

-- Create RLS policy for users to delete their own images
CREATE POLICY "Users can delete their own invitation images"
ON storage.objects FOR DELETE
USING (bucket_id = 'invitation-images' AND auth.role() = 'authenticated');