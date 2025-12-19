-- Create table for rate limiting chat requests
CREATE TABLE public.chat_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_chat_rate_limits_user_time ON public.chat_rate_limits(user_id, created_at);

-- Enable RLS
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can only see their own rate limit entries
CREATE POLICY "Users can view their own rate limits"
ON public.chat_rate_limits
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own rate limit entries
CREATE POLICY "Users can insert their own rate limits"
ON public.chat_rate_limits
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add cleanup function to delete old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.chat_rate_limits
  WHERE created_at < now() - interval '24 hours';
END;
$$;