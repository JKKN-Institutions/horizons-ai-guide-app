-- Make email column optional in registrations_12th_learners table
ALTER TABLE public.registrations_12th_learners 
ALTER COLUMN email DROP NOT NULL;