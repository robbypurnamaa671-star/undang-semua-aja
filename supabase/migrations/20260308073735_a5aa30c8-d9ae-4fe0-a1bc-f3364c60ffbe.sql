-- Admin can view all invitations (not just published or own)
CREATE POLICY "Admins can view all invitations"
ON public.invitations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete any invitation
CREATE POLICY "Admins can delete any invitation"
ON public.invitations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update any invitation
CREATE POLICY "Admins can update any invitation"
ON public.invitations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can view all blog posts (not just published)
CREATE POLICY "Admins can view all blog posts"
ON public.blog_posts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update blog posts
CREATE POLICY "Admins can update blog posts"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete blog posts
CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can view all subscriptions
CREATE POLICY "Admins can view all subscriptions"
ON public.subscriptions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can view all RSVP responses
CREATE POLICY "Admins can view all rsvp responses"
ON public.rsvp_responses
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
