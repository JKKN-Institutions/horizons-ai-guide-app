-- Create abroad_alumni table for alumni who studied abroad
CREATE TABLE public.abroad_alumni (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  country TEXT NOT NULL,
  university TEXT NOT NULL,
  course TEXT NOT NULL,
  graduation_year INTEGER NOT NULL,
  current_company TEXT,
  job_title TEXT,
  linkedin_url TEXT,
  bio TEXT,
  expertise TEXT[] DEFAULT '{}',
  is_available_for_mentoring BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alumni_messages table for student-alumni communication
CREATE TABLE public.alumni_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID,
  receiver_id UUID NOT NULL REFERENCES public.abroad_alumni(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.abroad_alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for abroad_alumni
CREATE POLICY "Anyone can view verified alumni"
ON public.abroad_alumni
FOR SELECT
USING (is_verified = true OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can register as alumni"
ON public.abroad_alumni
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Alumni can update their own profile"
ON public.abroad_alumni
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for alumni_messages
CREATE POLICY "Anyone can send messages"
ON public.alumni_messages
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Alumni can view messages sent to them"
ON public.alumni_messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.abroad_alumni 
    WHERE id = receiver_id AND user_id = auth.uid()
  )
  OR sender_id = auth.uid()
);

CREATE POLICY "Alumni can update message read status"
ON public.alumni_messages
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.abroad_alumni 
    WHERE id = receiver_id AND user_id = auth.uid()
  )
);

-- Create updated_at trigger
CREATE TRIGGER update_abroad_alumni_updated_at
BEFORE UPDATE ON public.abroad_alumni
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();