
-- Create stream type enum
CREATE TYPE public.student_stream AS ENUM ('pcm', 'pcb', 'pcmb', 'commerce', 'arts');

-- Create student profiles table
CREATE TABLE public.student_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  stream public.student_stream NOT NULL,
  marks_range TEXT,
  entrance_exams TEXT[],
  specific_interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create student assessment attempts table
CREATE TABLE public.student_assessment_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  stream public.student_stream NOT NULL,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  current_question INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 30,
  is_paused BOOLEAN NOT NULL DEFAULT false,
  questions_json JSONB,
  answers_json JSONB,
  course_recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student question history table
CREATE TABLE public.student_question_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  attempt_id UUID REFERENCES public.student_assessment_attempts(id),
  stream public.student_stream NOT NULL,
  question_text TEXT NOT NULL,
  question_hash TEXT NOT NULL,
  options JSONB NOT NULL,
  user_answer TEXT,
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_question_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for student_profiles
CREATE POLICY "Users can view their own profile"
ON public.student_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
ON public.student_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.student_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for student_assessment_attempts
CREATE POLICY "Users can view their own attempts"
ON public.student_assessment_attempts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts"
ON public.student_assessment_attempts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attempts"
ON public.student_assessment_attempts FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for student_question_history
CREATE POLICY "Users can view their own questions"
ON public.student_question_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own questions"
ON public.student_question_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questions"
ON public.student_question_history FOR UPDATE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_student_profiles_user_id ON public.student_profiles(user_id);
CREATE INDEX idx_student_attempts_user_id ON public.student_assessment_attempts(user_id);
CREATE INDEX idx_student_attempts_stream ON public.student_assessment_attempts(stream);
CREATE INDEX idx_student_questions_user_id ON public.student_question_history(user_id);
CREATE INDEX idx_student_questions_hash ON public.student_question_history(question_hash);

-- Triggers for updated_at
CREATE TRIGGER update_student_profiles_updated_at
BEFORE UPDATE ON public.student_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_attempts_updated_at
BEFORE UPDATE ON public.student_assessment_attempts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
