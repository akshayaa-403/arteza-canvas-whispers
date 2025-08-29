-- Security fix: Prevent anonymous access to email subscriber data
-- This addresses the security finding: Customer Email Addresses Could Be Harvested by Spammers

-- Create a restrictive SELECT policy for anonymous users to explicitly deny access
CREATE POLICY "Anonymous users cannot view subscriber data" 
ON public.email_subscribers 
FOR SELECT 
TO anon
USING (false);

-- Ensure authenticated users can only view their own subscription (policy already exists but let's be explicit)
-- This policy already exists: "Users can view their own subscription"

-- Add additional security: Create a policy for service_role that allows admin access if needed
CREATE POLICY "Service role can manage all subscriptions" 
ON public.email_subscribers 
FOR ALL 
TO service_role
USING (true);

-- Log the security fix
COMMENT ON TABLE public.email_subscribers IS 'Email subscriber table with RLS policies to prevent unauthorized access to customer email addresses. Anonymous users cannot view subscriber data.';