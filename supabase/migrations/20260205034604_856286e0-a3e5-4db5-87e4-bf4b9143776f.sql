-- Engineering Colleges Table
CREATE TABLE public.engineering_colleges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_name TEXT NOT NULL,
  college_name_tamil TEXT,
  college_code TEXT,
  college_type TEXT NOT NULL CHECK (college_type IN ('Government', 'Government Aided', 'Self-Finance', 'Autonomous')),
  district TEXT NOT NULL,
  city TEXT,
  university TEXT DEFAULT 'Anna University',
  branches_offered JSONB DEFAULT '[]'::jsonb,
  total_seats INTEGER,
  annual_fees_min INTEGER,
  annual_fees_max INTEGER,
  hostel_available BOOLEAN DEFAULT false,
  placement_percentage NUMERIC,
  avg_package_lpa NUMERIC,
  highest_package_lpa NUMERIC,
  naac_grade TEXT,
  nirf_rank INTEGER,
  established_year INTEGER,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Engineering Cutoff History Table
CREATE TABLE public.engineering_cutoffs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID REFERENCES public.engineering_colleges(id) ON DELETE CASCADE,
  branch_code TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  year INTEGER NOT NULL,
  counseling_round INTEGER DEFAULT 1,
  category TEXT NOT NULL CHECK (category IN ('OC', 'BC', 'BCM', 'MBC', 'MBC_V', 'DNC', 'SC', 'SCA', 'ST', 'EWS', 'GOVT_SCHOOL')),
  opening_cutoff NUMERIC,
  closing_cutoff NUMERIC NOT NULL,
  seats_available INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Medical Colleges Table  
CREATE TABLE public.medical_colleges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_name TEXT NOT NULL,
  college_name_tamil TEXT,
  college_type TEXT NOT NULL CHECK (college_type IN ('Government', 'Private', 'Deemed', 'ESI', 'Corporation')),
  district TEXT NOT NULL,
  city TEXT,
  courses_offered JSONB DEFAULT '["MBBS"]'::jsonb,
  mbbs_seats INTEGER,
  bds_seats INTEGER,
  annual_fees_govt INTEGER,
  annual_fees_mgmt INTEGER,
  annual_fees_nri INTEGER,
  hostel_available BOOLEAN DEFAULT true,
  hospital_beds INTEGER,
  established_year INTEGER,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Medical Cutoff History Table
CREATE TABLE public.medical_cutoffs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID REFERENCES public.medical_colleges(id) ON DELETE CASCADE,
  course TEXT NOT NULL CHECK (course IN ('MBBS', 'BDS', 'BAMS', 'BHMS', 'BSMS', 'BNYS')),
  year INTEGER NOT NULL,
  counseling_round INTEGER DEFAULT 1,
  quota_type TEXT NOT NULL CHECK (quota_type IN ('Government', 'Management', 'NRI', 'State')),
  category TEXT NOT NULL CHECK (category IN ('OC', 'BC', 'BCM', 'MBC', 'DNC', 'SC', 'SCA', 'ST', 'EWS')),
  closing_neet_score INTEGER NOT NULL,
  closing_rank INTEGER,
  seats_filled INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User Saved Colleges (for favorites)
CREATE TABLE public.saved_colleges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  college_type TEXT NOT NULL CHECK (college_type IN ('engineering', 'medical')),
  college_id UUID NOT NULL,
  notes TEXT,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.engineering_colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engineering_cutoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_cutoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_colleges ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access for colleges
CREATE POLICY "Anyone can view engineering colleges" ON public.engineering_colleges FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view engineering cutoffs" ON public.engineering_cutoffs FOR SELECT USING (true);
CREATE POLICY "Anyone can view medical colleges" ON public.medical_colleges FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view medical cutoffs" ON public.medical_cutoffs FOR SELECT USING (true);

-- RLS Policies - Saved colleges for authenticated users
CREATE POLICY "Users can view their saved colleges" ON public.saved_colleges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save colleges" ON public.saved_colleges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete saved colleges" ON public.saved_colleges FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_engineering_cutoffs_college ON public.engineering_cutoffs(college_id, year);
CREATE INDEX idx_engineering_cutoffs_branch ON public.engineering_cutoffs(branch_code, category);
CREATE INDEX idx_medical_cutoffs_college ON public.medical_cutoffs(college_id, year);
CREATE INDEX idx_medical_cutoffs_course ON public.medical_cutoffs(course, category);
CREATE INDEX idx_engineering_colleges_district ON public.engineering_colleges(district);
CREATE INDEX idx_medical_colleges_district ON public.medical_colleges(district);