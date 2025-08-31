-- Fix security linter warnings from the previous migration

-- Fix 1: Update the view to not use SECURITY DEFINER (it's not needed for a simple select view)
DROP VIEW IF EXISTS public.class_schedules_public;

CREATE VIEW public.class_schedules_public AS
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

-- Fix 2: Update the function to set search_path for security
DROP FUNCTION IF EXISTS public.get_class_zoom_link(UUID);

CREATE OR REPLACE FUNCTION public.get_class_zoom_link(class_id UUID)
RETURNS TEXT 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Re-grant access to the updated function
GRANT EXECUTE ON FUNCTION public.get_class_zoom_link(UUID) TO authenticated;

-- Allow public read access to the safe view
GRANT SELECT ON public.class_schedules_public TO anon, authenticated;