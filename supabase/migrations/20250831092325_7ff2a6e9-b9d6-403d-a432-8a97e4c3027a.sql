-- Security fix: Restrict access to private class meeting links
-- This addresses the security finding: Private Class Meeting Links Could Be Accessed by Unauthorized Users

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can view class schedules" ON public.class_schedules;

-- Create a public view for class browsing without sensitive information
CREATE OR REPLACE VIEW public.class_schedules_public AS
SELECT 
    id,
    class_title,
    class_type,
    age_group,
    instructor_name,
    scheduled_date,
    start_time,
    end_time,
    max_students,
    current_enrollments,
    materials_list,
    status,
    created_at,
    updated_at
FROM public.class_schedules
WHERE status = 'scheduled';

-- Allow public read access to the safe view
GRANT SELECT ON public.class_schedules_public TO anon, authenticated;

-- Create restrictive RLS policies for the main table
CREATE POLICY "Enrolled students can view their class details" 
ON public.class_schedules 
FOR SELECT 
USING (
    id IN (
        SELECT cb.class_schedule_id 
        FROM public.class_bookings cb 
        WHERE cb.user_id = auth.uid() 
        AND cb.booking_status = 'confirmed'
    )
);

-- Create a secure function for enrolled students to get zoom links
CREATE OR REPLACE FUNCTION public.get_class_zoom_link(class_id UUID)
RETURNS TEXT AS $$
DECLARE
    zoom_url TEXT;
BEGIN
    -- Check if user is enrolled in this class
    IF NOT EXISTS (
        SELECT 1 
        FROM public.class_bookings cb 
        WHERE cb.class_schedule_id = class_id 
        AND cb.user_id = auth.uid() 
        AND cb.booking_status = 'confirmed'
    ) THEN
        RAISE EXCEPTION 'Access denied: You are not enrolled in this class';
    END IF;

    -- Get the zoom link for enrolled user
    SELECT zoom_link INTO zoom_url
    FROM public.class_schedules 
    WHERE id = class_id 
    AND status = 'scheduled';

    RETURN zoom_url;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant access to the function
GRANT EXECUTE ON FUNCTION public.get_class_zoom_link(UUID) TO authenticated;

-- Add service role policy for admin management
CREATE POLICY "Service role can manage all class schedules" 
ON public.class_schedules 
FOR ALL 
TO service_role
USING (true);

-- Log the security fix
COMMENT ON TABLE public.class_schedules IS 'Class schedules table with restricted access. Public users can only view basic info via class_schedules_public view. Enrolled students can access zoom links via get_class_zoom_link function.';