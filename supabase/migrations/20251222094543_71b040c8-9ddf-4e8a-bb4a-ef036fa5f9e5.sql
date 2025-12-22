-- Create saved_jobs table for users to bookmark jobs
CREATE TABLE public.saved_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_title TEXT NOT NULL,
  job_company TEXT NOT NULL,
  job_location TEXT NOT NULL,
  job_salary TEXT NOT NULL,
  job_requirement TEXT NOT NULL,
  job_sector TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint to prevent duplicate saves
ALTER TABLE public.saved_jobs ADD CONSTRAINT unique_user_job UNIQUE (user_id, job_title, job_company);

-- Enable Row Level Security
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own saved jobs" 
ON public.saved_jobs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save jobs" 
ON public.saved_jobs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave jobs" 
ON public.saved_jobs 
FOR DELETE 
USING (auth.uid() = user_id);