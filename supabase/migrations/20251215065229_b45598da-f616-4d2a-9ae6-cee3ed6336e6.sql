
-- Create enum for assessment types
CREATE TYPE public.assessment_type AS ENUM ('psychometric', 'career_interest', 'emotional_intelligence', 'skill_gap');

-- Create user_assessment_attempts table
CREATE TABLE public.user_assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  assessment_type assessment_type NOT NULL,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  current_question INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  score JSONB,
  narrative_result TEXT,
  is_paused BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_question_history table
CREATE TABLE public.user_question_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  assessment_type assessment_type NOT NULL,
  attempt_id UUID REFERENCES public.user_assessment_attempts(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_hash TEXT NOT NULL,
  options JSONB NOT NULL,
  user_answer TEXT,
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_question_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_assessment_attempts
CREATE POLICY "Users can view their own attempts"
ON public.user_assessment_attempts
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts"
ON public.user_assessment_attempts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attempts"
ON public.user_assessment_attempts
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for user_question_history
CREATE POLICY "Users can view their own question history"
ON public.user_question_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own question history"
ON public.user_question_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own question history"
ON public.user_question_history
FOR UPDATE
USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_user_assessment_attempts_user_id ON public.user_assessment_attempts(user_id);
CREATE INDEX idx_user_assessment_attempts_type ON public.user_assessment_attempts(assessment_type);
CREATE INDEX idx_user_question_history_user_id ON public.user_question_history(user_id);
CREATE INDEX idx_user_question_history_attempt_id ON public.user_question_history(attempt_id);
CREATE INDEX idx_user_question_history_hash ON public.user_question_history(question_hash);

-- Add trigger for updated_at
CREATE TRIGGER update_user_assessment_attempts_updated_at
BEFORE UPDATE ON public.user_assessment_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
