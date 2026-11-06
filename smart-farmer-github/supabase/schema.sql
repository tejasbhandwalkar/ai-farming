-- SMART FARMER - Smart Agriculture Management System
-- Complete PostgreSQL Schema with Supabase Auth & Row Level Security (RLS)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER ROLES ENUM
CREATE TYPE user_role AS ENUM ('farmer_owner', 'worker', 'admin');
CREATE TYPE soil_type AS ENUM ('black_soil', 'red_soil', 'loamy_soil', 'sandy_soil', 'other');
CREATE TYPE irrigation_type AS ENUM ('drip', 'sprinkler', 'flood', 'rainfed');
CREATE TYPE crop_stage AS ENUM ('land_prep', 'sowing', 'germination', 'growth', 'flowering', 'harvesting');
CREATE TYPE crop_health AS ENUM ('excellent', 'good', 'needs_attention', 'diseased');
CREATE TYPE transaction_type AS ENUM ('income', 'expense');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE attendance_status AS ENUM ('present', 'half_day', 'absent');

-- 3. PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    language_pref TEXT NOT NULL DEFAULT 'mr', -- Default: Marathi
    role user_role NOT NULL DEFAULT 'farmer_owner',
    district TEXT DEFAULT 'Maharashtra',
    state TEXT DEFAULT 'Maharashtra',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FARMS TABLE
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    total_area_acres NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    location_address TEXT NOT NULL,
    latitude NUMERIC(9, 6) DEFAULT 18.5204,  -- Default Maharashtra/Pune
    longitude NUMERIC(9, 6) DEFAULT 73.8567,
    soil_type soil_type NOT NULL DEFAULT 'black_soil',
    irrigation_type irrigation_type NOT NULL DEFAULT 'drip',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FIELDS TABLE
CREATE TABLE IF NOT EXISTS public.fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    area_acres NUMERIC(6, 2) NOT NULL,
    soil_type soil_type NOT NULL DEFAULT 'black_soil',
    irrigation_type irrigation_type NOT NULL DEFAULT 'drip',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CROPS TABLE
CREATE TABLE IF NOT EXISTS public.crops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    variety TEXT,
    area_acres NUMERIC(6, 2) NOT NULL,
    sowing_date DATE NOT NULL,
    expected_harvest_date DATE,
    growth_stage crop_stage NOT NULL DEFAULT 'growth',
    health_status crop_health NOT NULL DEFAULT 'good',
    harvested_quantity_quintals NUMERIC(8, 2) DEFAULT 0,
    photo_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FINANCIAL TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
    crop_id UUID REFERENCES public.crops(id) ON DELETE SET NULL,
    type transaction_type NOT NULL,
    category TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    payment_mode TEXT DEFAULT 'Cash',
    receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. IRRIGATION LOGS TABLE
CREATE TABLE IF NOT EXISTS public.irrigation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    duration_minutes INTEGER NOT NULL,
    method irrigation_type NOT NULL DEFAULT 'drip',
    water_liters NUMERIC(10, 2),
    notes TEXT,
    next_scheduled_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TASKS AND PLANNER TABLE
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
    crop_id UUID REFERENCES public.crops(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    due_date DATE NOT NULL,
    priority task_priority NOT NULL DEFAULT 'medium',
    assigned_worker_id UUID,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. WORKERS / LABOUR TABLE
CREATE TABLE IF NOT EXISTS public.workers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'Farm Labourer',
    daily_wage NUMERIC(8, 2) NOT NULL DEFAULT 400.00,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. WORKER ATTENDANCE & WAGES
CREATE TABLE IF NOT EXISTS public.worker_attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID NOT NULL REFERENCES public.workers(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status attendance_status NOT NULL DEFAULT 'present',
    wage_earned NUMERIC(8, 2) NOT NULL DEFAULT 400.00,
    wage_paid NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. FERTILIZER & AGROCHEMICAL INPUTS TABLE
CREATE TABLE IF NOT EXISTS public.agricultural_inputs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
    crop_id UUID REFERENCES public.crops(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL, -- Fertilizer, Bio-fertilizer, Pesticide, Fungicide, Micronutrient
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    quantity_used TEXT NOT NULL,
    method TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. MACHINERY AND EQUIPMENT TABLE
CREATE TABLE IF NOT EXISTS public.machinery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- Tractor, Pump, Sprayer, Harvester, Cultivator
    model TEXT,
    purchase_year INTEGER,
    purchase_price NUMERIC(10, 2),
    maintenance_status TEXT DEFAULT 'Good Working Condition',
    last_service_date DATE,
    fuel_expenses NUMERIC(10, 2) DEFAULT 0,
    rental_earnings NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.irrigation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agricultural_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machinery ENABLE ROW LEVEL SECURITY;

-- Profile policy: users can read and update their own profile
CREATE POLICY "Users can manage own profile" ON public.profiles
    FOR ALL USING (auth.uid() = id);

-- Farm policies: farm owners manage their own farms
CREATE POLICY "Owners can manage own farms" ON public.farms
    FOR ALL USING (auth.uid() = user_id);

-- Field policies: cascade from farm ownership
CREATE POLICY "Users can manage fields of own farms" ON public.fields
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.farms WHERE farms.id = fields.farm_id AND farms.user_id = auth.uid()
        )
    );

-- Crop policies
CREATE POLICY "Users can manage crops of own farms" ON public.crops
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.farms WHERE farms.id = crops.farm_id AND farms.user_id = auth.uid()
        )
    );

-- Transaction policies
CREATE POLICY "Users can manage transactions of own farms" ON public.transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.farms WHERE farms.id = transactions.farm_id AND farms.user_id = auth.uid()
        )
    );

-- Similar cascading policies for all other tables
CREATE POLICY "Users can manage irrigation of own farms" ON public.irrigation_logs
    FOR ALL USING (EXISTS (SELECT 1 FROM public.farms WHERE farms.id = irrigation_logs.farm_id AND farms.user_id = auth.uid()));

CREATE POLICY "Users can manage tasks of own farms" ON public.tasks
    FOR ALL USING (EXISTS (SELECT 1 FROM public.farms WHERE farms.id = tasks.farm_id AND farms.user_id = auth.uid()));

CREATE POLICY "Users can manage workers of own farms" ON public.workers
    FOR ALL USING (EXISTS (SELECT 1 FROM public.farms WHERE farms.id = workers.farm_id AND farms.user_id = auth.uid()));

CREATE POLICY "Users can manage attendance of own farms" ON public.worker_attendance
    FOR ALL USING (EXISTS (SELECT 1 FROM public.farms WHERE farms.id = worker_attendance.farm_id AND farms.user_id = auth.uid()));

CREATE POLICY "Users can manage inputs of own farms" ON public.agricultural_inputs
    FOR ALL USING (EXISTS (SELECT 1 FROM public.farms WHERE farms.id = agricultural_inputs.farm_id AND farms.user_id = auth.uid()));

CREATE POLICY "Users can manage machinery of own farms" ON public.machinery
    FOR ALL USING (EXISTS (SELECT 1 FROM public.farms WHERE farms.id = machinery.farm_id AND farms.user_id = auth.uid()));

-- DEMO SEED DATA (Maharashtra 18-Acre Family Farm):
-- Farm Name: Family Farm (18 Acres)
-- Field 1: 5 Acres (Soybean)
-- Field 2: 4 Acres (Cotton)
-- Field 3: 6 Acres (Sugarcane)
-- Field 4: 3 Acres (Onion)
