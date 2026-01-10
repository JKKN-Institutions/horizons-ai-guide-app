-- Create table for forum discussions
CREATE TABLE public.govt_forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for forum comments
CREATE TABLE public.govt_forum_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.govt_forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for post likes (to prevent duplicate likes)
CREATE TABLE public.govt_forum_post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.govt_forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create table for study plans
CREATE TABLE public.govt_study_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  exam_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_weeks INTEGER NOT NULL DEFAULT 12,
  difficulty TEXT NOT NULL DEFAULT 'intermediate',
  phases JSONB NOT NULL DEFAULT '[]'::jsonb,
  resources JSONB NOT NULL DEFAULT '[]'::jsonb,
  daily_hours INTEGER NOT NULL DEFAULT 4,
  followers_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.govt_forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.govt_forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.govt_forum_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.govt_study_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forum posts
CREATE POLICY "Anyone can view forum posts" ON public.govt_forum_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.govt_forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update own posts" ON public.govt_forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON public.govt_forum_posts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for forum comments
CREATE POLICY "Anyone can view comments" ON public.govt_forum_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.govt_forum_comments FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can delete own comments" ON public.govt_forum_comments FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for post likes
CREATE POLICY "Anyone can view likes" ON public.govt_forum_post_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like posts" ON public.govt_forum_post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove own likes" ON public.govt_forum_post_likes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for study plans
CREATE POLICY "Anyone can view study plans" ON public.govt_study_plans FOR SELECT USING (true);

-- Function to update comment count
CREATE OR REPLACE FUNCTION public.update_forum_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.govt_forum_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.govt_forum_posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for comment count
CREATE TRIGGER update_comment_count
AFTER INSERT OR DELETE ON public.govt_forum_comments
FOR EACH ROW EXECUTE FUNCTION public.update_forum_comment_count();

-- Function to update like count
CREATE OR REPLACE FUNCTION public.update_forum_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.govt_forum_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.govt_forum_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for like count
CREATE TRIGGER update_like_count
AFTER INSERT OR DELETE ON public.govt_forum_post_likes
FOR EACH ROW EXECUTE FUNCTION public.update_forum_like_count();

-- Insert sample study plans
INSERT INTO public.govt_study_plans (category, exam_name, title, description, duration_weeks, difficulty, daily_hours, phases, resources) VALUES
('defence', 'NDA', '12-Week NDA Preparation Plan', 'Comprehensive study plan for NDA written exam covering Mathematics and GAT', 12, 'intermediate', 5, 
  '[{"week": "1-2", "title": "Foundation Building", "subjects": ["Basic Mathematics", "English Grammar"], "focus": "Build strong fundamentals"},
    {"week": "3-4", "title": "Core Concepts", "subjects": ["Algebra", "Trigonometry", "Physics Basics"], "focus": "Master key concepts"},
    {"week": "5-6", "title": "Advanced Topics", "subjects": ["Calculus", "Chemistry", "Current Affairs"], "focus": "Advanced problem solving"},
    {"week": "7-8", "title": "History & Geography", "subjects": ["Indian History", "World Geography", "Polity"], "focus": "General knowledge"},
    {"week": "9-10", "title": "Practice Phase", "subjects": ["Previous Papers", "Mock Tests"], "focus": "Time management"},
    {"week": "11-12", "title": "Revision", "subjects": ["All Subjects", "Quick Revision"], "focus": "Final preparation"}]'::jsonb,
  '[{"type": "book", "name": "Mathematics for NDA by R.S. Aggarwal", "priority": "essential"},
    {"type": "book", "name": "Pathfinder for NDA by Arihant", "priority": "essential"},
    {"type": "online", "name": "Unacademy NDA Course", "priority": "recommended"},
    {"type": "practice", "name": "Previous 10 Years Papers", "priority": "essential"}]'::jsonb),

('railway', 'RRB NTPC', '8-Week RRB NTPC Study Plan', 'Complete preparation strategy for RRB NTPC CBT-1 and CBT-2', 8, 'beginner', 4,
  '[{"week": "1-2", "title": "Quantitative Aptitude", "subjects": ["Number System", "Percentage", "Ratio"], "focus": "Speed calculation"},
    {"week": "3-4", "title": "Reasoning", "subjects": ["Coding-Decoding", "Series", "Puzzles"], "focus": "Logical thinking"},
    {"week": "5-6", "title": "General Awareness", "subjects": ["Static GK", "Current Affairs", "Science"], "focus": "Daily news reading"},
    {"week": "7-8", "title": "Mock Tests", "subjects": ["Full Length Tests", "Previous Papers"], "focus": "Exam simulation"}]'::jsonb,
  '[{"type": "book", "name": "RRB NTPC Guide by Arihant", "priority": "essential"},
    {"type": "book", "name": "Lucent GK", "priority": "essential"},
    {"type": "app", "name": "Testbook App", "priority": "recommended"}]'::jsonb),

('ssc', 'SSC CGL', '16-Week SSC CGL Master Plan', 'Detailed study plan for SSC CGL Tier 1 and Tier 2', 16, 'advanced', 6,
  '[{"week": "1-3", "title": "English Mastery", "subjects": ["Grammar Rules", "Vocabulary", "Reading Comprehension"], "focus": "Strong foundation"},
    {"week": "4-6", "title": "Quantitative Focus", "subjects": ["Arithmetic", "Algebra", "Geometry"], "focus": "Speed and accuracy"},
    {"week": "7-9", "title": "Reasoning Excellence", "subjects": ["Verbal Reasoning", "Non-Verbal", "Analytical"], "focus": "Pattern recognition"},
    {"week": "10-12", "title": "General Awareness", "subjects": ["Polity", "Economics", "History", "Geography"], "focus": "Comprehensive coverage"},
    {"week": "13-14", "title": "Intensive Practice", "subjects": ["Sectional Tests", "Topic-wise Tests"], "focus": "Weak area improvement"},
    {"week": "15-16", "title": "Final Sprint", "subjects": ["Full Mocks", "Revision"], "focus": "Exam readiness"}]'::jsonb,
  '[{"type": "book", "name": "SSC Mathematics by Kiran", "priority": "essential"},
    {"type": "book", "name": "Word Power Made Easy", "priority": "essential"},
    {"type": "book", "name": "A Modern Approach to Verbal Reasoning by Aggarwal", "priority": "essential"},
    {"type": "online", "name": "SSC Adda247 Course", "priority": "recommended"}]'::jsonb),

('banking', 'IBPS PO', '10-Week IBPS PO Preparation', 'Strategic study plan for IBPS PO Prelims and Mains', 10, 'intermediate', 5,
  '[{"week": "1-2", "title": "Quantitative Aptitude", "subjects": ["DI", "Arithmetic", "Number Series"], "focus": "Speed building"},
    {"week": "3-4", "title": "Reasoning Ability", "subjects": ["Puzzles", "Seating Arrangement", "Syllogism"], "focus": "Complex puzzles"},
    {"week": "5-6", "title": "English Language", "subjects": ["RC", "Cloze Test", "Error Spotting"], "focus": "Comprehension skills"},
    {"week": "7-8", "title": "General Awareness", "subjects": ["Banking Awareness", "Current Affairs", "Financial News"], "focus": "Daily updates"},
    {"week": "9-10", "title": "Mock Tests & Revision", "subjects": ["Full Mocks", "Sectional Tests"], "focus": "Time management"}]'::jsonb,
  '[{"type": "book", "name": "Quantitative Aptitude by Arun Sharma", "priority": "essential"},
    {"type": "book", "name": "Banking Awareness by Arihant", "priority": "essential"},
    {"type": "online", "name": "Oliveboard Banking Course", "priority": "recommended"}]'::jsonb),

('state', 'TNPSC Group 2', '12-Week TNPSC Group 2 Plan', 'Tamil Nadu state exam preparation with focus on state-specific topics', 12, 'intermediate', 5,
  '[{"week": "1-2", "title": "Tamil & English", "subjects": ["Tamil Grammar", "English Comprehension"], "focus": "Language proficiency"},
    {"week": "3-4", "title": "History", "subjects": ["Indian History", "Tamil Nadu History", "Freedom Movement"], "focus": "Chronological learning"},
    {"week": "5-6", "title": "Geography & Economics", "subjects": ["Indian Geography", "TN Geography", "Indian Economy"], "focus": "Map-based learning"},
    {"week": "7-8", "title": "Polity & Constitution", "subjects": ["Indian Polity", "TN Administration"], "focus": "Constitutional provisions"},
    {"week": "9-10", "title": "Science & Aptitude", "subjects": ["General Science", "Aptitude", "Mental Ability"], "focus": "Conceptual clarity"},
    {"week": "11-12", "title": "Revision & Mocks", "subjects": ["Previous Papers", "Mock Tests"], "focus": "Exam simulation"}]'::jsonb,
  '[{"type": "book", "name": "TNPSC General Studies by Sura", "priority": "essential"},
    {"type": "book", "name": "Tamil Nadu History by Tamil Nadu Textbook Corporation", "priority": "essential"},
    {"type": "online", "name": "TNPSC Portal Free Materials", "priority": "recommended"}]'::jsonb);