import { 
  Farm, 
  Field, 
  Crop, 
  Transaction, 
  IrrigationLog, 
  Task, 
  Worker, 
  WorkerAttendance, 
  AgriculturalInput, 
  Machinery, 
  UserProfile 
} from './types';

export const initialProfile: UserProfile = {
  id: 'usr-farmer-01',
  full_name: 'तानाजीराव पाटील (Tanajirao Patil)',
  phone: '+91 98220 12345',
  language_pref: 'mr', // Marathi is default
  role: 'farmer_owner',
  district: 'पुणे / बारामती (Pune)',
  state: 'महाराष्ट्र (Maharashtra)',
  email: 'tanaji.patil@smartfarmer.in'
};

export const initialFarms: Farm[] = [
  {
    id: 'farm-01',
    name: 'Family Farm (कौटुंबिक शेत)',
    total_area_acres: 18,
    location_address: 'मु. पो. बारामती, जि. पुणे, महाराष्ट्र (Baramati, Pune, MH)',
    latitude: 18.1517,
    longitude: 74.5772,
    soil_type: 'black_soil',
    irrigation_type: 'drip',
    created_at: '2026-06-01'
  }
];

export const initialFields: Field[] = [
  {
    id: 'field-01',
    farm_id: 'farm-01',
    name: 'Field 1 (विहिरीचे रान)',
    area_acres: 5,
    soil_type: 'black_soil',
    irrigation_type: 'drip',
    notes: 'काळी कसदार माती, ठिबक सिंचन जोडलेले आहे.'
  },
  {
    id: 'field-02',
    farm_id: 'farm-01',
    name: 'Field 2 (मळयाचे शेत)',
    area_acres: 4,
    soil_type: 'black_soil',
    irrigation_type: 'drip',
    notes: 'उत्तम निचरा होणारी मध्यम काळी जमीन.'
  },
  {
    id: 'field-03',
    farm_id: 'farm-01',
    name: 'Field 3 (नदीकाठचा तुकडा)',
    area_acres: 6,
    soil_type: 'loamy_soil',
    irrigation_type: 'flood',
    notes: 'कॅनॉल व विहिरीचे पाणी, बारमाही पाण्याची सोय.'
  },
  {
    id: 'field-04',
    farm_id: 'farm-01',
    name: 'Field 4 (ओढ्याकडची जमीन)',
    area_acres: 3,
    soil_type: 'sandy_soil',
    irrigation_type: 'sprinkler',
    notes: 'हलकी मुरमाड जमीन, तुषार सिंचन उपलब्ध.'
  }
];

export const initialCrops: Crop[] = [
  {
    id: 'crop-01',
    farm_id: 'farm-01',
    field_id: 'field-01',
    name: 'सोयाबीन (Soybean)',
    variety: 'JS-335 / फुले कल्याणी',
    area_acres: 5,
    sowing_date: '2026-07-05',
    expected_harvest_date: '2026-10-25',
    growth_stage: 'growth',
    health_status: 'good',
    harvested_quantity_quintals: 0,
    photo_url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    notes: 'नुकतीच खुरपणी झाली आहे, फुटवे चांगले आहेत.'
  },
  {
    id: 'crop-02',
    farm_id: 'farm-01',
    field_id: 'field-02',
    name: 'कापूस (Cotton)',
    variety: 'अजित १५५ (Bt Cotton)',
    area_acres: 4,
    sowing_date: '2026-06-20',
    expected_harvest_date: '2026-12-15',
    growth_stage: 'flowering',
    health_status: 'excellent',
    harvested_quantity_quintals: 0,
    photo_url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    notes: 'फुलोरा आणि बोंड धरण्याचा टप्पा चालू आहे.'
  },
  {
    id: 'crop-03',
    farm_id: 'farm-01',
    field_id: 'field-03',
    name: 'ऊस (Sugarcane)',
    variety: 'को-८६०३२ (Co-86032)',
    area_acres: 6,
    sowing_date: '2026-01-15',
    expected_harvest_date: '2027-01-20',
    growth_stage: 'growth',
    health_status: 'good',
    harvested_quantity_quintals: 0,
    photo_url: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=600&q=80',
    notes: 'मोठी बांधणी पूर्ण झाली आहे, वाढ जोमदार आहे.'
  },
  {
    id: 'crop-04',
    farm_id: 'farm-01',
    field_id: 'field-04',
    name: 'कांदा (Onion)',
    variety: 'भीमा सुपर (Bhima Super)',
    area_acres: 3,
    sowing_date: '2026-08-10',
    expected_harvest_date: '2026-11-20',
    growth_stage: 'growth',
    health_status: 'needs_attention',
    harvested_quantity_quintals: 0,
    photo_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    notes: 'पानांवर करपा रोगाची लक्षणे दिसत आहेत, बुरशीनाशक फवारणी आवश्यक.'
  }
];

export const initialTransactions: Transaction[] = [
  // Income
  {
    id: 'tx-01',
    farm_id: 'farm-01',
    field_id: 'field-01',
    crop_id: 'crop-01',
    type: 'income',
    category: 'crop_sales',
    amount: 145000,
    date: '2026-10-15',
    description: 'सोयाबीन विक्री (३० क्विंटल @ ₹४,८३३/क्विंटल) - लातूर APMC',
    payment_mode: 'Bank Transfer'
  },
  {
    id: 'tx-02',
    farm_id: 'farm-01',
    field_id: 'field-04',
    crop_id: 'crop-04',
    type: 'income',
    category: 'veg_sales',
    amount: 98000,
    date: '2026-10-28',
    description: 'कांदा विक्री (४० क्विंटल @ ₹२,४५०/क्विंटल) - पिंपळगाव बसवंत',
    payment_mode: 'Cash'
  },
  {
    id: 'tx-03',
    farm_id: 'farm-01',
    type: 'income',
    category: 'other',
    amount: 18000,
    date: '2026-11-02',
    description: 'शेजारील शेतकऱ्याला ट्रॅक्टर नांगरणी भाडे',
    payment_mode: 'UPI'
  },
  // Expenses
  {
    id: 'tx-04',
    farm_id: 'farm-01',
    field_id: 'field-01',
    crop_id: 'crop-01',
    type: 'expense',
    category: 'seeds',
    amount: 12500,
    date: '2026-07-01',
    description: 'सोयाबीन प्रमाणित बियाणे (JS-335) ५ बॅग्स',
    payment_mode: 'Cash'
  },
  {
    id: 'tx-05',
    farm_id: 'farm-01',
    field_id: 'field-03',
    crop_id: 'crop-03',
    type: 'expense',
    category: 'fertilizers',
    amount: 24000,
    date: '2026-07-15',
    description: '१०:२६:२६ आणि युरिया खतांच्या गोण्या (ऊस खत डोस)',
    payment_mode: 'UPI'
  },
  {
    id: 'tx-06',
    farm_id: 'farm-01',
    type: 'expense',
    category: 'labour',
    amount: 18500,
    date: '2026-08-05',
    description: 'सोयाबीन व कांदा खुरपणी आणि फवारणी मजुरी',
    payment_mode: 'Cash'
  },
  {
    id: 'tx-07',
    farm_id: 'farm-01',
    type: 'expense',
    category: 'diesel',
    amount: 8500,
    date: '2026-08-20',
    description: 'ट्रॅक्टर नांगरणी आणि रोटरसाठी डिझेल (९० लिटर)',
    payment_mode: 'Card'
  },
  {
    id: 'tx-08',
    farm_id: 'farm-01',
    field_id: 'field-04',
    crop_id: 'crop-04',
    type: 'expense',
    category: 'pesticides',
    amount: 4200,
    date: '2026-09-02',
    description: 'कांद्यावरील करपा नियंत्रणासाठी साफ (Saaf) बुरशीनाशक व स्टिकर',
    payment_mode: 'UPI'
  },
  {
    id: 'tx-09',
    farm_id: 'farm-01',
    type: 'expense',
    category: 'electricity',
    amount: 3800,
    date: '2026-09-18',
    description: 'कृषी पंप वीज बिल (महावितरण)',
    payment_mode: 'Net Banking'
  }
];

export const initialTasks: Task[] = [
  {
    id: 'task-01',
    farm_id: 'farm-01',
    field_id: 'field-04',
    crop_id: 'crop-04',
    title: 'कांद्यावर बुरशीनाशक फवारणी',
    description: 'करपा रोगासाठी मँकोझेब + कार्बेन्डाझिम फवारणी सकाळी वाऱ्याचा वेग कमी असताना करावी.',
    category: 'फवारणी',
    due_date: '2026-11-08',
    priority: 'urgent',
    assigned_worker_id: 'w-01',
    is_completed: false
  },
  {
    id: 'task-02',
    farm_id: 'farm-01',
    field_id: 'field-03',
    crop_id: 'crop-03',
    title: 'उसाला ठिबकद्वारे विद्राव्य खत डोस',
    description: '१९:१९:१९ विद्राव्य खत व्हेंचुरीद्वारे २ तास द्यावे.',
    category: 'खत व्यवस्थापन',
    due_date: '2026-11-10',
    priority: 'high',
    assigned_worker_id: 'w-02',
    is_completed: false
  },
  {
    id: 'task-03',
    farm_id: 'farm-01',
    field_id: 'field-02',
    crop_id: 'crop-02',
    title: 'कापसाची बोंड अळी पाहणी',
    description: 'गुलाबी बोंड अळीसाठी कामगंध सापळे तपासा आणि निरीक्षण नोंदवा.',
    category: 'पीक तपासणी',
    due_date: '2026-11-12',
    priority: 'medium',
    assigned_worker_id: 'w-03',
    is_completed: false
  },
  {
    id: 'task-04',
    farm_id: 'farm-01',
    title: 'ट्रॅक्टर ऑइल आणि फिल्टर बदलणे',
    description: 'महिंद्रा ट्रॅक्टर ५० तास पूर्ण झाले आहेत, सर्व्हिसिंग आवश्यक आहे.',
    category: 'यंत्र देखभाल',
    due_date: '2026-11-04',
    priority: 'low',
    is_completed: true
  }
];

export const initialIrrigationLogs: IrrigationLog[] = [
  {
    id: 'irr-01',
    farm_id: 'farm-01',
    field_id: 'field-01',
    date: '2026-11-05',
    duration_minutes: 180,
    method: 'drip',
    water_liters: 15000,
    notes: 'ठिबक सिंचनाने पाणी दिले, दाबाचे प्रमाण १.५ kg/cm² ठेवले.',
    next_scheduled_date: '2026-11-09'
  },
  {
    id: 'irr-02',
    farm_id: 'farm-01',
    field_id: 'field-03',
    date: '2026-11-03',
    duration_minutes: 240,
    method: 'flood',
    water_liters: 32000,
    notes: 'उसाच्या सऱ्यांना पाट पाणी दिले.',
    next_scheduled_date: '2026-11-11'
  },
  {
    id: 'irr-03',
    farm_id: 'farm-01',
    field_id: 'field-04',
    date: '2026-11-04',
    duration_minutes: 120,
    method: 'sprinkler',
    water_liters: 8500,
    notes: 'कांदा पिकाला तुषार संचाने २ तास हलके पाणी दिले.',
    next_scheduled_date: '2026-11-08'
  }
];

export const initialWorkers: Worker[] = [
  {
    id: 'w-01',
    farm_id: 'farm-01',
    full_name: 'दत्तात्रय शिंदे (Dattatray Shinde)',
    phone: '+91 97654 32100',
    role: 'मुख्य शेत मजूर (Head Field Worker)',
    daily_wage: 450,
    is_active: true
  },
  {
    id: 'w-02',
    farm_id: 'farm-01',
    full_name: 'मारुती वाघमारे (Maruti Waghmare)',
    phone: '+91 98901 23456',
    role: 'सिंचन व ट्रॅक्टर चालक (Irrigation & Driver)',
    daily_wage: 500,
    is_active: true
  },
  {
    id: 'w-03',
    farm_id: 'farm-01',
    full_name: 'सुमनबाई कांबळे (Sumanbai Kamble)',
    phone: '+91 94231 87654',
    role: 'मजूर (खुरपणी व काढणी तज्ज्ञ)',
    daily_wage: 350,
    is_active: true
  }
];

export const initialAttendance: WorkerAttendance[] = [
  {
    id: 'att-01',
    worker_id: 'w-01',
    farm_id: 'farm-01',
    date: '2026-11-05',
    status: 'present',
    wage_earned: 450,
    wage_paid: 450,
    notes: 'ठिबक दुरुस्ती व औषध फवारणी'
  },
  {
    id: 'att-02',
    worker_id: 'w-02',
    farm_id: 'farm-01',
    date: '2026-11-05',
    status: 'present',
    wage_earned: 500,
    wage_paid: 0,
    notes: 'ट्रॅक्टर रोटर व उसाला पाणी'
  },
  {
    id: 'att-03',
    worker_id: 'w-03',
    farm_id: 'farm-01',
    date: '2026-11-05',
    status: 'half_day',
    wage_earned: 175,
    wage_paid: 175,
    notes: 'दुपारपर्यंत कांदा खुरपणी'
  }
];

export const initialInputs: AgriculturalInput[] = [
  {
    id: 'inp-01',
    farm_id: 'farm-01',
    field_id: 'field-01',
    crop_id: 'crop-01',
    product_name: '१९:१९:१९ विद्राव्य खत (NPK Water Soluble)',
    category: 'खत (Fertilizer)',
    application_date: '2026-08-12',
    quantity_used: '५ किलो / एकर',
    method: 'ठिबक सिंचनाद्वारे (Fertigation)',
    notes: 'शाखीय वाढीसाठी झाडांना चांगला फायदा झाला.'
  },
  {
    id: 'inp-02',
    farm_id: 'farm-01',
    field_id: 'field-04',
    crop_id: 'crop-04',
    product_name: 'साफ (Saaf - Carbendazim 12% + Mancozeb 63% WP)',
    category: 'बुरशीनाशक (Fungicide)',
    application_date: '2026-09-02',
    quantity_used: '२ ग्रॅम प्रति लिटर पाणी',
    method: 'नॅपसॅक पंपाने फवारणी',
    notes: 'करपा नियंत्रणासाठी शिफारसीत मात्रेनुसार फवारले.'
  },
  {
    id: 'inp-03',
    farm_id: 'farm-01',
    field_id: 'field-02',
    crop_id: 'crop-02',
    product_name: 'निमार्क ५००० ppm (Neem Oil Bio-Pesticide)',
    category: 'सेंद्रिय कीटकनाशक (Organic)',
    application_date: '2026-09-15',
    quantity_used: '५ मिली प्रति लिटर पाणी',
    method: 'फवारणी',
    notes: 'रसशोषक किडींच्या प्रतिबंधात्मक नियंत्रणासाठी.'
  }
];

export const initialMachinery: Machinery[] = [
  {
    id: 'mac-01',
    farm_id: 'farm-01',
    name: 'महिंद्रा ५७५ डीआय ट्रॅक्टर (Mahindra 575 DI)',
    type: 'Tractor (ट्रॅक्टर)',
    model: 'Mahindra 45 HP 2021 Model',
    purchase_year: 2021,
    purchase_price: 685000,
    maintenance_status: 'उत्कृष्ट कार्यरत स्थिती (Good Working Condition)',
    last_service_date: '2026-11-04',
    fuel_expenses: 8500,
    rental_earnings: 18000
  },
  {
    id: 'mac-02',
    farm_id: 'farm-01',
    name: 'किर्लोस्कर ७.५ HP सबमर्सिबल पंप (Kirloskar Water Pump)',
    type: 'Water Pump (कृषी पंप)',
    model: 'Kirloskar Borewell 7.5 HP 3-Phase',
    purchase_year: 2022,
    purchase_price: 42000,
    maintenance_status: 'कार्यरत (Operational)',
    last_service_date: '2026-06-10',
    fuel_expenses: 0
  },
  {
    id: 'mac-03',
    farm_id: 'farm-01',
    name: 'बॅटरी ऑपरेटेड नॅपसॅक स्प्रेयर (Battery Sprayer 16L)',
    type: 'Sprayer (फवारणी यंत्र)',
    model: 'Agrimate 16 Liters Double Motor',
    purchase_year: 2023,
    purchase_price: 3800,
    maintenance_status: 'कार्यरत (Operational)',
    last_service_date: '2026-09-01',
    fuel_expenses: 0
  }
];
