-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('saved', 'in_progress', 'documents_pending', 'applied', 'under_review', 'accepted', 'rejected');

-- Create scholarship applications table
CREATE TABLE public.scholarship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scholarship_id TEXT NOT NULL,
  scholarship_name TEXT NOT NULL,
  scholarship_provider TEXT NOT NULL,
  scholarship_amount TEXT,
  scholarship_deadline TEXT,
  status application_status NOT NULL DEFAULT 'saved',
  applied_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  reminder_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, scholarship_id)
);

-- Enable RLS
ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies - users can only manage their own applications
CREATE POLICY "Users can view their own applications"
ON public.scholarship_applications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
ON public.scholarship_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
ON public.scholarship_applications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications"
ON public.scholarship_applications
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_scholarship_applications_updated_at
BEFORE UPDATE ON public.scholarship_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();