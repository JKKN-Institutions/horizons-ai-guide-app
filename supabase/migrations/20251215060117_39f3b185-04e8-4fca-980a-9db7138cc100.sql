-- Create registrations_12th_learners table
CREATE TABLE public.registrations_12th_learners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT,
  school_name TEXT,
  board TEXT,
  stream TEXT,
  percentage TEXT,
  preferred_course TEXT,
  preferred_institution TEXT,
  career_interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create registrations_learners table
CREATE TABLE public.registrations_learners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT,
  institution TEXT,
  degree TEXT,
  specialization TEXT,
  graduation_year TEXT,
  experience TEXT,
  job_role TEXT,
  skills TEXT,
  preferred_role TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create registrations_employers table
CREATE TABLE public.registrations_employers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT,
  website TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  designation TEXT,
  roles_hiring TEXT,
  experience_level TEXT,
  job_location TEXT,
  hiring_timeline TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.registrations_12th_learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations_learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations_employers ENABLE ROW LEVEL SECURITY;

-- RLS policies for registrations_12th_learners
CREATE POLICY "Anyone can insert 12th learner registrations"
ON public.registrations_12th_learners
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own 12th learner registrations"
ON public.registrations_12th_learners
FOR SELECT
USING (auth.uid() = user_id);

-- RLS policies for registrations_learners
CREATE POLICY "Anyone can insert learner registrations"
ON public.registrations_learners
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own learner registrations"
ON public.registrations_learners
FOR SELECT
USING (auth.uid() = user_id);

-- RLS policies for registrations_employers
CREATE POLICY "Anyone can insert employer registrations"
ON public.registrations_employers
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own employer registrations"
ON public.registrations_employers
FOR SELECT
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_registrations_12th_learners_updated_at
BEFORE UPDATE ON public.registrations_12th_learners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_registrations_learners_updated_at
BEFORE UPDATE ON public.registrations_learners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_registrations_employers_updated_at
BEFORE UPDATE ON public.registrations_employers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();