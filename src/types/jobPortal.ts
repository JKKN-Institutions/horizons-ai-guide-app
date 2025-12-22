export interface Category {
  id: string;
  name: string;
  icon: string;
  jobs_count: number;
  display_order: number;
  is_active: boolean;
}

export interface Job {
  id: string;
  employer_id: string | null;
  title: string;
  company_name: string;
  company_logo_url: string | null;
  category_id: string | null;
  category?: Category;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_type: string;
  is_salary_negotiable: boolean;
  qualification: string | null;
  experience_min: number;
  experience_max: number | null;
  gender_preference: string;
  state: string;
  city: string;
  area: string | null;
  full_address: string;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  contact_person: string;
  phone_primary: string;
  phone_secondary: string | null;
  whatsapp_number: string | null;
  email: string | null;
  is_walkin: boolean;
  interview_start_date: string | null;
  interview_end_date: string | null;
  interview_start_time: string | null;
  interview_end_time: string | null;
  interview_venue: string | null;
  documents_required: string[] | null;
  job_type: string;
  vacancies: number;
  benefits: string[] | null;
  status: string;
  is_featured: boolean;
  views_count: number;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface Employer {
  id: string;
  user_id: string | null;
  company_name: string;
  company_logo_url: string | null;
  industry: string | null;
  company_size: string | null;
  description: string | null;
  website: string | null;
  contact_name: string;
  contact_designation: string | null;
  contact_email: string;
  contact_phone: string;
  contact_phone_alt: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  hiring_categories: string[] | null;
  job_types: string[] | null;
  expected_hires: string | null;
  is_verified: boolean;
  verification_status: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  saved_at: string;
  job?: Job;
}

export interface JobAlert {
  id: string;
  user_id: string;
  name: string | null;
  keywords: string | null;
  category_id: string | null;
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  experience: string | null;
  frequency: string;
  is_active: boolean;
  last_sent_at: string | null;
  created_at: string;
}

export interface JobFilters {
  category?: string;
  city?: string;
  state?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceMin?: number;
  experienceMax?: number;
  jobType?: string;
  isWalkin?: boolean;
  search?: string;
}
