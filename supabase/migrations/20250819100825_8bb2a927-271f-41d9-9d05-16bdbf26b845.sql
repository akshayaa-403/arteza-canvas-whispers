-- Fix email_subscribers table security issue
-- The current RLS policy may not be working correctly for SELECT operations
-- We need to ensure proper access control for email subscriber data

-- First, let's check if RLS is properly enabled (it should be, but let's be explicit)
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Drop the existing overly broad policy
DROP POLICY IF EXISTS "Users can manage their own subscription" ON public.email_subscribers;

-- Create specific, more secure policies

-- Policy 1: Users can only view their own subscription
CREATE POLICY "Users can view their own subscription" 
ON public.email_subscribers 
FOR SELECT 
USING (email = (SELECT auth.users.email FROM auth.users WHERE auth.users.id = auth.uid()));

-- Policy 2: Users can only insert their own subscription
CREATE POLICY "Users can insert their own subscription" 
ON public.email_subscribers 
FOR INSERT 
WITH CHECK (email = (SELECT auth.users.email FROM auth.users WHERE auth.users.id = auth.uid()));

-- Policy 3: Users can only update their own subscription
CREATE POLICY "Users can update their own subscription" 
ON public.email_subscribers 
FOR UPDATE 
USING (email = (SELECT auth.users.email FROM auth.users WHERE auth.users.id = auth.uid()))
WITH CHECK (email = (SELECT auth.users.email FROM auth.users WHERE auth.users.id = auth.uid()));

-- Policy 4: Allow anonymous users to subscribe (for newsletter signup)
CREATE POLICY "Anonymous users can subscribe" 
ON public.email_subscribers 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Note: No DELETE policy - subscribers should not be able to delete their records
-- This prevents accidental data loss and maintains subscription history