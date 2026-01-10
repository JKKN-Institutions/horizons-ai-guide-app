-- Create table for government exam mock test leaderboard
CREATE TABLE public.govt_mock_test_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  category TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  accuracy NUMERIC(5,2) NOT NULL,
  time_taken INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster leaderboard queries
CREATE INDEX idx_govt_scores_category_score ON public.govt_mock_test_scores(category, score DESC);
CREATE INDEX idx_govt_scores_created_at ON public.govt_mock_test_scores(created_at DESC);

-- Enable RLS
ALTER TABLE public.govt_mock_test_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view leaderboard scores
CREATE POLICY "Anyone can view leaderboard scores"
ON public.govt_mock_test_scores
FOR SELECT
USING (true);

-- Policy: Authenticated users can insert their own scores
CREATE POLICY "Authenticated users can insert scores"
ON public.govt_mock_test_scores
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can update their own scores
CREATE POLICY "Users can update own scores"
ON public.govt_mock_test_scores
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Users can delete their own scores
CREATE POLICY "Users can delete own scores"
ON public.govt_mock_test_scores
FOR DELETE
USING (auth.uid() = user_id);