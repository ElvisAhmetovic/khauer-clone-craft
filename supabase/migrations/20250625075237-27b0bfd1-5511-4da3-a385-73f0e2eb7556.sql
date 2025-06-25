
-- Create customers table for managing customer information
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vehicles table for customer vehicles
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  vin TEXT UNIQUE,
  license_plate TEXT,
  mileage INTEGER,
  color TEXT,
  fuel_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table for different service types
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  estimated_duration INTEGER, -- in minutes
  base_price DECIMAL(10,2),
  category TEXT NOT NULL, -- 'maintenance', 'repair', 'inspection', etc.
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table for booking system
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table for website contact form
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a business website)
-- For now, we'll make services publicly readable
CREATE POLICY "Services are publicly readable" 
  ON public.services 
  FOR SELECT 
  USING (active = true);

-- Contact messages can be inserted by anyone (contact form)
CREATE POLICY "Anyone can submit contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Insert some sample services
INSERT INTO public.services (name, description, estimated_duration, base_price, category) VALUES
('Ölwechsel', 'Kompletter Ölwechsel mit Filteraustausch', 30, 89.99, 'maintenance'),
('Inspektion', 'Große Inspektion nach Herstellervorgaben', 120, 249.99, 'maintenance'),
('TÜV/AU', 'Hauptuntersuchung und Abgasuntersuchung', 60, 129.99, 'inspection'),
('Bremsenservice', 'Überprüfung und Wartung der Bremsanlage', 90, 159.99, 'maintenance'),
('Klimaservice', 'Wartung und Befüllung der Klimaanlage', 45, 99.99, 'maintenance'),
('Reifenwechsel', 'Saisonaler Reifenwechsel mit Einlagerung', 30, 49.99, 'service'),
('Motordiagnose', 'Computergestützte Fahrzeugdiagnose', 60, 79.99, 'diagnostic'),
('Zahnriemenwechsel', 'Austausch des Zahnriemens', 180, 299.99, 'repair');
