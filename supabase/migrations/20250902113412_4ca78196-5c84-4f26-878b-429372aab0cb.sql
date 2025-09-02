-- Fix security definer view and create book_class function
DROP VIEW IF EXISTS public.class_schedules_public;

-- Recreate view without SECURITY DEFINER
CREATE VIEW public.class_schedules_public AS
SELECT 
    id,
    title,
    description,
    instructor_name,
    date,
    start_time,
    end_time,
    max_participants,
    status,
    created_at,
    updated_at,
    -- Exclude zoom_link from public view for security
    NULL::text as zoom_link
FROM public.class_schedules;

-- Grant public access to the view
GRANT SELECT ON public.class_schedules_public TO public;

-- Create book_class function that was missing
CREATE OR REPLACE FUNCTION public.book_class(
    p_class_schedule_id uuid,
    p_special_requests text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if user is authenticated
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'Authentication required';
    END IF;

    -- Check if class exists and is available
    IF NOT EXISTS (
        SELECT 1 FROM public.class_schedules 
        WHERE id = p_class_schedule_id 
        AND status = 'scheduled'
    ) THEN
        RAISE EXCEPTION 'Class not available for booking';
    END IF;

    -- Check if user already has a booking
    IF EXISTS (
        SELECT 1 FROM public.class_bookings 
        WHERE class_schedule_id = p_class_schedule_id 
        AND user_id = auth.uid()
    ) THEN
        RAISE EXCEPTION 'You have already booked this class';
    END IF;

    -- Check capacity
    IF (
        SELECT COUNT(*) FROM public.class_bookings 
        WHERE class_schedule_id = p_class_schedule_id 
        AND booking_status = 'confirmed'
    ) >= (
        SELECT max_participants FROM public.class_schedules 
        WHERE id = p_class_schedule_id
    ) THEN
        RAISE EXCEPTION 'Class is full';
    END IF;

    -- Create booking
    INSERT INTO public.class_bookings (
        class_schedule_id,
        user_id,
        booking_status,
        special_requests
    ) VALUES (
        p_class_schedule_id,
        auth.uid(),
        'confirmed',
        p_special_requests
    );
END;
$$;