
-- Create table for tracking student enrollments and progress
CREATE TABLE public.student_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  class_type TEXT NOT NULL,
  enrollment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completion_status TEXT NOT NULL DEFAULT 'enrolled' CHECK (completion_status IN ('enrolled', 'in_progress', 'completed', 'paused')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  skills_learned TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for class scheduling
CREATE TABLE public.class_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_title TEXT NOT NULL,
  class_type TEXT NOT NULL,
  age_group TEXT NOT NULL CHECK (age_group IN ('kids', 'adults', 'seniors')),
  instructor_name TEXT NOT NULL DEFAULT 'Upasna',
  scheduled_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_students INTEGER NOT NULL DEFAULT 8,
  current_enrollments INTEGER DEFAULT 0,
  zoom_link TEXT,
  materials_list TEXT[],
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'full', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for class bookings
CREATE TABLE public.class_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  class_schedule_id UUID REFERENCES public.class_schedules(id) NOT NULL,
  booking_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'cancelled', 'completed', 'no_show')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for artwork metadata (for search and filtering)
CREATE TABLE public.artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  collection_name TEXT,
  dominant_colors TEXT[],
  mood_tags TEXT[],
  size_category TEXT CHECK (size_category IN ('small', 'medium', 'large')),
  price DECIMAL(10,2),
  availability_status TEXT NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'sold', 'reserved')),
  created_year INTEGER,
  technique TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for email subscribers and automation tracking
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'unsubscribed', 'bounced')),
  subscription_source TEXT DEFAULT 'website',
  welcome_series_completed BOOLEAN DEFAULT false,
  last_email_sent TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.student_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS policies for student_enrollments
CREATE POLICY "Users can view their own enrollments" 
  ON public.student_enrollments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments" 
  ON public.student_enrollments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" 
  ON public.student_enrollments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for class_schedules (public read access)
CREATE POLICY "Anyone can view class schedules" 
  ON public.class_schedules 
  FOR SELECT 
  TO public 
  USING (true);

-- RLS policies for class_bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.class_bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.class_bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.class_bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for artworks (public read access)
CREATE POLICY "Anyone can view artworks" 
  ON public.artworks 
  FOR SELECT 
  TO public 
  USING (true);

-- RLS policies for email_subscribers
CREATE POLICY "Users can manage their own subscription" 
  ON public.email_subscribers 
  FOR ALL 
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_student_enrollments_user_id ON public.student_enrollments(user_id);
CREATE INDEX idx_class_schedules_date ON public.class_schedules(scheduled_date);
CREATE INDEX idx_class_schedules_age_group ON public.class_schedules(age_group);
CREATE INDEX idx_class_bookings_user_id ON public.class_bookings(user_id);
CREATE INDEX idx_class_bookings_schedule_id ON public.class_bookings(class_schedule_id);
CREATE INDEX idx_artworks_collection ON public.artworks(collection_name);
CREATE INDEX idx_artworks_mood_tags ON public.artworks USING GIN(mood_tags);
CREATE INDEX idx_artworks_colors ON public.artworks USING GIN(dominant_colors);
CREATE INDEX idx_email_subscribers_email ON public.email_subscribers(email);

-- Insert some sample class schedules
INSERT INTO public.class_schedules (class_title, class_type, age_group, scheduled_date, start_time, end_time, max_students, materials_list) VALUES
('Creative Kids Club', 'Little Brushstrokes, Big Dreams', 'kids', '2024-12-20', '10:00:00', '11:00:00', 8, ARRAY['Watercolors', 'Brushes', 'Paper', 'Pencils']),
('Teen Sketch Lab', 'Draw & Grow Together', 'kids', '2024-12-21', '16:00:00', '17:30:00', 6, ARRAY['Sketching pencils', 'Charcoal', 'Drawing paper', 'Erasers']),
('Paint Your Stress Away', 'Evening Escape: Art After Hours', 'adults', '2024-12-22', '19:00:00', '21:00:00', 10, ARRAY['Acrylic paints', 'Canvas', 'Brushes', 'Palette']),
('Golden Hour Painting Sessions', 'Art Therapy for the Soul', 'seniors', '2024-12-23', '11:00:00', '12:30:00', 6, ARRAY['Watercolors', 'Paper', 'Soft brushes', 'Tea & comfort']);

-- Insert sample artworks (fixed apostrophe issue)
INSERT INTO public.artworks (title, description, image_url, collection_name, dominant_colors, mood_tags, size_category, price, technique) VALUES
('Morning Musings', 'A serene watercolor capturing the quiet beauty of dawn', 'https://images.unsplash.com/photo-1472396961693-142e6e269027', 'Dreamscapes', ARRAY['blue', 'yellow', 'white'], ARRAY['peaceful', 'serene', 'contemplative'], 'medium', 8500.00, 'Watercolor'),
('Sunset Solitude', 'Bold brushstrokes express the drama of evening light', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901', 'Abstract Expressions', ARRAY['orange', 'red', 'purple'], ARRAY['dramatic', 'emotional', 'vibrant'], 'large', 12000.00, 'Acrylic'),
('Urban Dreams', 'The heartbeat of the city translated into color and form', 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb', 'Cultural Chronicles', ARRAY['grey', 'blue', 'yellow'], ARRAY['urban', 'modern', 'energetic'], 'large', 15500.00, 'Mixed Media');
