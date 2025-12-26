-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;

-- Create a new policy that only allows authenticated users to view settings
CREATE POLICY "Authenticated users can view site settings"
ON public.site_settings
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);