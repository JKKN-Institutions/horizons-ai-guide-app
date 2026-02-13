
-- Startup progress tracking
CREATE TABLE public.startup_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  current_stage INTEGER NOT NULL DEFAULT 1,
  lessons_completed INTEGER[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.startup_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own startup progress" ON public.startup_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own startup progress" ON public.startup_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own startup progress" ON public.startup_progress FOR UPDATE USING (auth.uid() = user_id);

-- Readiness scores (10 dimensions)
CREATE TABLE public.startup_readiness_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  dimension TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, dimension)
);

ALTER TABLE public.startup_readiness_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own readiness scores" ON public.startup_readiness_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own readiness scores" ON public.startup_readiness_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own readiness scores" ON public.startup_readiness_scores FOR UPDATE USING (auth.uid() = user_id);

-- Simulator decisions
CREATE TABLE public.startup_simulator_decisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scenario_id INTEGER NOT NULL,
  choice_id INTEGER NOT NULL,
  outcome TEXT,
  cash_impact INTEGER DEFAULT 0,
  morale_impact INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, scenario_id)
);

ALTER TABLE public.startup_simulator_decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own simulator decisions" ON public.startup_simulator_decisions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own simulator decisions" ON public.startup_simulator_decisions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own simulator decisions" ON public.startup_simulator_decisions FOR UPDATE USING (auth.uid() = user_id);

-- Quiz scores (Money Minute, Problem of the Day, etc.)
CREATE TABLE public.startup_quiz_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  quiz_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  quiz_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.startup_quiz_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz scores" ON public.startup_quiz_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz scores" ON public.startup_quiz_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at on startup_progress
CREATE TRIGGER update_startup_progress_updated_at
  BEFORE UPDATE ON public.startup_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
