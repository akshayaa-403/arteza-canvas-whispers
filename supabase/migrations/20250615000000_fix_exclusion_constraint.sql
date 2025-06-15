
-- Fix the exclusion constraint by using btree_gist extension and proper operator classes

-- Enable btree_gist extension for UUID and date operators in GIST
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Drop the existing constraint if it exists
ALTER TABLE IF EXISTS public.class_schedules DROP CONSTRAINT IF EXISTS class_schedules_instructor_id_scheduled_date_tstzrange_excl;

-- Create the corrected exclusion constraint with proper operator classes
ALTER TABLE public.class_schedules 
ADD CONSTRAINT class_schedules_no_overlap 
EXCLUDE USING GIST (
  instructor_id WITH =,
  scheduled_date WITH =,
  tstzrange(
    (scheduled_date + start_time)::timestamptz,
    (scheduled_date + end_time)::timestamptz
  ) WITH &&
) WHERE (instructor_id IS NOT NULL);
