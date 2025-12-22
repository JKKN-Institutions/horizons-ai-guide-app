-- Create categories table
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text,
  jobs_count integer DEFAULT 0,
  display_order integer,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Create employers table
CREATE TABLE public.employers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  company_logo_url text,
  industry text,
  company_size text,
  description text,
  website text,
  contact_name text NOT NULL,
  contact_designation text,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  contact_phone_alt text,
  address text,
  city text,
  state text,
  hiring_categories jsonb,
  job_types jsonb,
  expected_hires text,
  is_verified boolean DEFAULT false,
  verification_status text DEFAULT 'pending',
  verified_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid REFERENCES public.employers(id) ON DELETE CASCADE,
  title text NOT NULL,
  company_name text NOT NULL,
  company_logo_url text,
  category_id uuid REFERENCES public.categories(id),
  description text,
  responsibilities text,
  requirements text,
  salary_min integer,
  salary_max integer,
  salary_type text DEFAULT 'monthly',
  is_salary_negotiable boolean DEFAULT false,
  qualification text,
  experience_min integer DEFAULT 0,
  experience_max integer,
  gender_preference text DEFAULT 'any',
  state text NOT NULL,
  city text NOT NULL,
  area text,
  full_address text NOT NULL,
  pincode text,
  latitude decimal,
  longitude decimal,
  contact_person text NOT NULL,
  phone_primary text NOT NULL,
  phone_secondary text,
  whatsapp_number text,
  email text,
  is_walkin boolean DEFAULT false,
  interview_start_date date,
  interview_end_date date,
  interview_start_time time,
  interview_end_time time,
  interview_venue text,
  documents_required jsonb,
  job_type text DEFAULT 'full-time',
  vacancies integer DEFAULT 1,
  benefits jsonb,
  status text DEFAULT 'active',
  is_featured boolean DEFAULT false,
  views_count integer DEFAULT 0,
  valid_until date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create portal_saved_jobs table (different from existing saved_jobs)
CREATE TABLE public.portal_saved_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  saved_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Create job_alerts table
CREATE TABLE public.job_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text,
  keywords text,
  category_id uuid REFERENCES public.categories(id),
  location text,
  salary_min integer,
  salary_max integer,
  experience text,
  frequency text DEFAULT 'daily',
  is_active boolean DEFAULT true,
  last_sent_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Create contact_logs table
CREATE TABLE public.contact_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  contact_type text NOT NULL,
  contacted_at timestamp with time zone DEFAULT now()
);

-- Create job_notifications table
CREATE TABLE public.job_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_type text DEFAULT 'user',
  type text,
  title text,
  message text,
  link text,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_notifications ENABLE ROW LEVEL SECURITY;

-- Categories: Public read, admin write
CREATE POLICY "Anyone can view active categories" ON public.categories
FOR SELECT USING (is_active = true);

-- Employers: Own data or admin
CREATE POLICY "Employers can view their own data" ON public.employers
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Employers can insert their own data" ON public.employers
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Employers can update their own data" ON public.employers
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view verified employers" ON public.employers
FOR SELECT USING (is_verified = true);

-- Jobs: Public read for active jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs
FOR SELECT USING (status = 'active');

CREATE POLICY "Employers can manage their jobs" ON public.jobs
FOR ALL USING (
  employer_id IN (SELECT id FROM public.employers WHERE user_id = auth.uid())
);

-- Portal Saved Jobs: User's own data
CREATE POLICY "Users can view their saved jobs" ON public.portal_saved_jobs
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save jobs" ON public.portal_saved_jobs
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave jobs" ON public.portal_saved_jobs
FOR DELETE USING (auth.uid() = user_id);

-- Job Alerts: User's own data
CREATE POLICY "Users can manage their job alerts" ON public.job_alerts
FOR ALL USING (auth.uid() = user_id);

-- Contact Logs: Anyone can insert, users view own
CREATE POLICY "Anyone can log contact" ON public.contact_logs
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their contact logs" ON public.contact_logs
FOR SELECT USING (auth.uid() = user_id);

-- Notifications: User's own data
CREATE POLICY "Users can view their notifications" ON public.job_notifications
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" ON public.job_notifications
FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_jobs_category ON public.jobs(category_id);
CREATE INDEX idx_jobs_city ON public.jobs(city);
CREATE INDEX idx_jobs_state ON public.jobs(state);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_created ON public.jobs(created_at DESC);
CREATE INDEX idx_employers_user ON public.employers(user_id);
CREATE INDEX idx_portal_saved_jobs_user ON public.portal_saved_jobs(user_id);
CREATE INDEX idx_job_alerts_user ON public.job_alerts(user_id);

-- Trigger to update jobs_count in categories
CREATE OR REPLACE FUNCTION public.update_category_jobs_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.categories SET jobs_count = jobs_count + 1 WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.categories SET jobs_count = jobs_count - 1 WHERE id = OLD.category_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.category_id IS DISTINCT FROM NEW.category_id THEN
    UPDATE public.categories SET jobs_count = jobs_count - 1 WHERE id = OLD.category_id;
    UPDATE public.categories SET jobs_count = jobs_count + 1 WHERE id = NEW.category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_update_category_jobs_count
AFTER INSERT OR UPDATE OR DELETE ON public.jobs
FOR EACH ROW EXECUTE FUNCTION public.update_category_jobs_count();

-- Trigger to update employer updated_at
CREATE TRIGGER update_employers_updated_at
BEFORE UPDATE ON public.employers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to update jobs updated_at
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();