export type Language = 'mr' | 'hi' | 'en';

export type UserRole = 'farmer_owner' | 'worker' | 'admin';

export type SoilType = 'black_soil' | 'red_soil' | 'loamy_soil' | 'sandy_soil';

export type IrrigationType = 'drip' | 'sprinkler' | 'flood';

export type CropStage = 'land_prep' | 'sowing' | 'germination' | 'growth' | 'flowering' | 'harvesting';

export type CropHealth = 'excellent' | 'good' | 'needs_attention' | 'diseased';

export type TransactionType = 'income' | 'expense';

export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';

export type AttendanceStatus = 'present' | 'half_day' | 'absent';

export interface UserProfile {
  id: string;
  full_name: string;
  phone: string;
  language_pref: Language;
  role: UserRole;
  district: string;
  state: string;
  email?: string;
}

export interface Farm {
  id: string;
  name: string;
  total_area_acres: number;
  location_address: string;
  latitude: number;
  longitude: number;
  soil_type: SoilType;
  irrigation_type: IrrigationType;
  created_at?: string;
}

export interface Field {
  id: string;
  farm_id: string;
  name: string;
  area_acres: number;
  soil_type: SoilType;
  irrigation_type: IrrigationType;
  notes?: string;
}

export interface Crop {
  id: string;
  farm_id: string;
  field_id: string;
  name: string;
  variety: string;
  area_acres: number;
  sowing_date: string;
  expected_harvest_date: string;
  growth_stage: CropStage;
  health_status: CropHealth;
  harvested_quantity_quintals?: number;
  photo_url?: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  farm_id: string;
  field_id?: string;
  crop_id?: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  description: string;
  payment_mode?: string;
}

export interface IrrigationLog {
  id: string;
  farm_id: string;
  field_id: string;
  date: string;
  duration_minutes: number;
  method: IrrigationType;
  water_liters?: number;
  notes?: string;
  next_scheduled_date?: string;
}

export interface Task {
  id: string;
  farm_id: string;
  field_id?: string;
  crop_id?: string;
  title: string;
  description: string;
  category: string;
  due_date: string;
  priority: TaskPriority;
  assigned_worker_id?: string;
  is_completed: boolean;
}

export interface Worker {
  id: string;
  farm_id: string;
  full_name: string;
  phone: string;
  role: string;
  daily_wage: number;
  is_active: boolean;
}

export interface WorkerAttendance {
  id: string;
  worker_id: string;
  farm_id: string;
  date: string;
  status: AttendanceStatus;
  wage_earned: number;
  wage_paid: number;
  notes?: string;
}

export interface AgriculturalInput {
  id: string;
  farm_id: string;
  field_id?: string;
  crop_id?: string;
  product_name: string;
  category: string;
  application_date: string;
  quantity_used: string;
  method?: string;
  notes?: string;
}

export interface Machinery {
  id: string;
  farm_id: string;
  name: string;
  type: string;
  model: string;
  purchase_year: number;
  purchase_price: number;
  maintenance_status: string;
  last_service_date: string;
  fuel_expenses: number;
  rental_earnings?: number;
}

export interface MandiPriceItem {
  id: string;
  crop_en: string;
  crop_mr: string;
  crop_hi: string;
  market: string;
  district: string;
  state: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  updated_date: string;
  variety: string;
  historical_trend: { date: string; price: number }[];
}

export interface WeatherData {
  temperature: number;
  apparent_temperature: number;
  relative_humidity: number;
  precipitation_probability: number;
  wind_speed: number;
  weather_code: number;
  weather_description: string;
  daily: {
    date: string;
    max_temp: number;
    min_temp: number;
    rain_probability: number;
    condition: string;
  }[];
  agricultural_advisory: string;
}
