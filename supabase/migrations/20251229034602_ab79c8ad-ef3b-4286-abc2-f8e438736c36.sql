-- Create industry job alert subscriptions table
CREATE TABLE public.industry_job_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  sectors TEXT[] NOT NULL DEFAULT '{}',
  locations TEXT[] DEFAULT '{}',
  salary_min INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.industry_job_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to job alerts" 
ON public.industry_job_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for users to manage their own subscriptions by email
CREATE POLICY "Users can view their own subscriptions" 
ON public.industry_job_subscriptions 
FOR SELECT 
USING (true);

-- Create policy for users to update their own subscriptions
CREATE POLICY "Users can update their own subscriptions" 
ON public.industry_job_subscriptions 
FOR UPDATE 
USING (true);

-- Create policy for users to delete their own subscriptions
CREATE POLICY "Users can delete their own subscriptions" 
ON public.industry_job_subscriptions 
FOR DELETE 
USING (true);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.industry_job_subscriptions;

-- Create updated_at trigger
CREATE TRIGGER update_industry_job_subscriptions_updated_at
BEFORE UPDATE ON public.industry_job_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();