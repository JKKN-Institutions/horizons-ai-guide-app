-- JKKN Colleges
CREATE TABLE public.jkkn_colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_name text NOT NULL,
  courses jsonb NOT NULL DEFAULT '[]',
  branches jsonb NOT NULL DEFAULT '[]',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jkkn_colleges ENABLE ROW LEVEL SECURITY;

-- Anyone can view colleges
CREATE POLICY "Anyone can view jkkn colleges" ON public.jkkn_colleges FOR SELECT USING (true);

-- JKKN Learners (Students who register)
CREATE TABLE public.learners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_number serial UNIQUE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  photo_url text,
  college text NOT NULL,
  course text NOT NULL,
  branch text NOT NULL,
  year_of_study text NOT NULL,
  graduation_year integer NOT NULL,
  skills jsonb DEFAULT '[]',
  career_interest text,
  linkedin_url text,
  github_url text,
  registered_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learners ENABLE ROW LEVEL SECURITY;

-- Anyone can view learners
CREATE POLICY "Anyone can view learners" ON public.learners FOR SELECT USING (true);

-- Anyone can register as a learner (no auth required)
CREATE POLICY "Anyone can register as learner" ON public.learners FOR INSERT WITH CHECK (true);

-- Index for sorting by newest first
CREATE INDEX idx_learners_registered_at ON public.learners(registered_at DESC);

-- Enable realtime for learners
ALTER PUBLICATION supabase_realtime ADD TABLE public.learners;

-- Courses
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  instructor_name text,
  thumbnail_url text,
  duration_hours integer,
  lessons_count integer,
  rating decimal DEFAULT 0,
  students_count integer DEFAULT 0,
  level text DEFAULT 'Beginner',
  external_link text,
  is_free boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- Coding Problems
CREATE TABLE public.coding_problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  difficulty text NOT NULL,
  category text NOT NULL,
  examples jsonb DEFAULT '[]',
  constraints text,
  hints jsonb DEFAULT '[]',
  solution_approaches jsonb DEFAULT '[]',
  external_links jsonb DEFAULT '[]',
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.coding_problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view coding problems" ON public.coding_problems FOR SELECT USING (true);

-- Career Roadmaps
CREATE TABLE public.roadmaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  duration_months integer,
  steps_count integer DEFAULT 0,
  followers_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view roadmaps" ON public.roadmaps FOR SELECT USING (true);

-- Roadmap Steps
CREATE TABLE public.roadmap_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id uuid REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  title text NOT NULL,
  description text,
  duration_weeks integer,
  resources jsonb DEFAULT '[]',
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.roadmap_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view roadmap steps" ON public.roadmap_steps FOR SELECT USING (true);

-- Hackathons/Competitions
CREATE TABLE public.competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL,
  organizer text,
  banner_url text,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  registration_deadline timestamp with time zone,
  venue text,
  mode text DEFAULT 'Online',
  team_size text,
  prize_pool text,
  register_link text,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view competitions" ON public.competitions FOR SELECT USING (true);

-- Articles
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  excerpt text,
  author text,
  category text NOT NULL,
  thumbnail_url text,
  read_time_minutes integer DEFAULT 5,
  views_count integer DEFAULT 0,
  published_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view articles" ON public.articles FOR SELECT USING (true);

-- Scholarships (new table separate from existing)
CREATE TABLE public.jkkn_scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  provider text NOT NULL,
  description text,
  amount text,
  type text,
  eligibility text,
  deadline date,
  apply_link text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.jkkn_scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view jkkn scholarships" ON public.jkkn_scholarships FOR SELECT USING (true);

-- Mentors
CREATE TABLE public.mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  photo_url text,
  designation text,
  company text,
  college text,
  expertise jsonb DEFAULT '[]',
  linkedin_url text,
  rating decimal DEFAULT 4.5,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view mentors" ON public.mentors FOR SELECT USING (true);

-- JKKN Jobs (separate from existing jobs table)
CREATE TABLE public.jkkn_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  company_logo_url text,
  title text NOT NULL,
  description text,
  type text NOT NULL,
  work_mode text DEFAULT 'On-site',
  location text,
  stipend_min integer,
  stipend_max integer,
  salary_min integer,
  salary_max integer,
  duration text,
  skills_required jsonb DEFAULT '[]',
  eligibility text,
  application_deadline date,
  apply_link text,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.jkkn_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view jkkn jobs" ON public.jkkn_jobs FOR SELECT USING (true);