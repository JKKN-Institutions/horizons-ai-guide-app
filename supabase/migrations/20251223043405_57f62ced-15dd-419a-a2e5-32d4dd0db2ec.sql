-- Add district and place columns to registrations_learners table
ALTER TABLE public.registrations_learners 
ADD COLUMN district TEXT,
ADD COLUMN place TEXT;