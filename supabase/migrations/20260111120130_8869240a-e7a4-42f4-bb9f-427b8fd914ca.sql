-- Create table for user achievement progress (for leaderboard comparison)
CREATE TABLE public.user_achievement_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  total_achievements INTEGER NOT NULL DEFAULT 0,
  bronze_count INTEGER NOT NULL DEFAULT 0,
  silver_count INTEGER NOT NULL DEFAULT 0,
  gold_count INTEGER NOT NULL DEFAULT 0,
  platinum_count INTEGER NOT NULL DEFAULT 0,
  diamond_count INTEGER NOT NULL DEFAULT 0,
  total_study_hours NUMERIC(10,2) NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  mock_tests_completed INTEGER NOT NULL DEFAULT 0,
  goals_achieved INTEGER NOT NULL DEFAULT 0,
  achievement_points INTEGER NOT NULL DEFAULT 0,
  week_start DATE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient leaderboard queries
CREATE INDEX idx_achievement_progress_points ON public.user_achievement_progress(achievement_points DESC);
CREATE INDEX idx_achievement_progress_week ON public.user_achievement_progress(week_start);
CREATE INDEX idx_achievement_progress_user ON public.user_achievement_progress(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_achievement_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Anyone can view achievement leaderboard" 
ON public.user_achievement_progress 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own achievement progress" 
ON public.user_achievement_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own achievement progress" 
ON public.user_achievement_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE TRIGGER update_achievement_progress_updated_at
BEFORE UPDATE ON public.user_achievement_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();