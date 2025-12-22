-- Add status tracking columns to saved_jobs table
ALTER TABLE public.saved_jobs 
ADD COLUMN status text NOT NULL DEFAULT 'saved',
ADD COLUMN applied_date timestamp with time zone,
ADD COLUMN interview_date timestamp with time zone,
ADD COLUMN notes text;

-- Add a check constraint for valid status values
ALTER TABLE public.saved_jobs
ADD CONSTRAINT valid_job_status CHECK (status IN ('saved', 'applied', 'interview', 'offer', 'rejected'));