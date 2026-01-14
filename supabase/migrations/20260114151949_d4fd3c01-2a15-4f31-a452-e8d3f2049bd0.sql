-- Create TN University Forum Posts table
CREATE TABLE public.tn_forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  university TEXT,
  course TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  has_ai_answer BOOLEAN NOT NULL DEFAULT false,
  ai_answer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create TN University Forum Comments table
CREATE TABLE public.tn_forum_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.tn_forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonymous',
  content TEXT NOT NULL,
  is_ai_response BOOLEAN NOT NULL DEFAULT false,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create TN Forum Post Likes table
CREATE TABLE public.tn_forum_post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.tn_forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS
ALTER TABLE public.tn_forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tn_forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tn_forum_post_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for posts
CREATE POLICY "Anyone can view forum posts" 
  ON public.tn_forum_posts FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create posts" 
  ON public.tn_forum_posts FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own posts" 
  ON public.tn_forum_posts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
  ON public.tn_forum_posts FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for comments
CREATE POLICY "Anyone can view comments" 
  ON public.tn_forum_comments FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create comments" 
  ON public.tn_forum_comments FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own comments" 
  ON public.tn_forum_comments FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for likes
CREATE POLICY "Anyone can view likes" 
  ON public.tn_forum_post_likes FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can like posts" 
  ON public.tn_forum_post_likes FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can remove their likes" 
  ON public.tn_forum_post_likes FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger for updating comment count
CREATE OR REPLACE FUNCTION public.update_tn_forum_comment_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.tn_forum_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.tn_forum_posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER update_tn_comment_count
  AFTER INSERT OR DELETE ON public.tn_forum_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_tn_forum_comment_count();

-- Trigger for updating like count
CREATE OR REPLACE FUNCTION public.update_tn_forum_like_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.tn_forum_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.tn_forum_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER update_tn_like_count
  AFTER INSERT OR DELETE ON public.tn_forum_post_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_tn_forum_like_count();

-- Trigger for updated_at
CREATE TRIGGER update_tn_forum_posts_updated_at
  BEFORE UPDATE ON public.tn_forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();