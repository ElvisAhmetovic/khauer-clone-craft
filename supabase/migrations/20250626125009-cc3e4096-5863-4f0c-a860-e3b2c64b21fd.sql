
-- Create table to store scraped vehicle data
CREATE TABLE public.scraped_vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT NOT NULL UNIQUE, -- AutoScout24 listing ID
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  year TEXT,
  mileage TEXT,
  fuel TEXT,
  transmission TEXT,
  images TEXT[], -- Array of image URLs
  description TEXT,
  location TEXT,
  phone TEXT,
  features TEXT[], -- Array of features
  url TEXT, -- Direct link to the listing
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (making it publicly readable since it's for a public website)
ALTER TABLE public.scraped_vehicles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Scraped vehicles are publicly readable" 
  ON public.scraped_vehicles 
  FOR SELECT 
  USING (true);

-- Create index for better performance
CREATE INDEX idx_scraped_vehicles_scraped_at ON public.scraped_vehicles(scraped_at DESC);
CREATE INDEX idx_scraped_vehicles_external_id ON public.scraped_vehicles(external_id);
