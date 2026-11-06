# SMART FARMER (स्मार्ट शेतकरी)
### Smart Agriculture Management System – आधुनिक कृषी व्यवस्थापन प्रणाली

An all-in-one digital agriculture management platform built for Indian farmers to manage land, crops, finances, weather, irrigation, tasks, labour, machinery, mandi prices, and AI agronomy advice.

---

## 🌟 Key Features

1. **Three-Language Internationalization (i18n)**:
   - **मराठी (Marathi)** — Default language
   - **हिन्दी (Hindi)**
   - **English**
   - Noto Sans Devanagari font rendering, instant persistence across sessions.
   - Translation dictionaries located at `/messages/mr.json`, `/messages/hi.json`, `/messages/en.json`.

2. **Farm & Land Management**:
   - Multi-farm and field parcel tracking.
   - Pre-configured demo: **Family Farm (18 Acres)** in Baramati, Maharashtra:
     - Field 1: 5 Acres (Soybean)
     - Field 2: 4 Acres (Cotton)
     - Field 3: 6 Acres (Sugarcane)
     - Field 4: 3 Acres (Onion)
   - Acreage calculation, soil profiles, and irrigation methods.

3. **Crop Lifecycle Management**:
   - Visual growth stages: Land Preparation → Sowing → Germination → Growth → Flowering → Harvesting.
   - Crop health monitoring (Excellent, Good, Needs Attention, Diseased).
   - Fertilizer and irrigation histories, photo storage, yield tracking.

4. **Financial Accounting & Profitability**:
   - Expense categories: Seeds, Fertilizers, Pesticides, Labour, Tractor, Diesel, Electricity, Irrigation, Machinery, Transport, Other.
   - Income categories: Crop sales, Vegetable sales, Grain sales, Other agricultural revenue.
   - Automatic live calculation: Total Income, Total Expenses, Net Profit margin.
   - Recharts visual analytics (Monthly cash flow & category breakdown).
   - Real CSV data export and Print/PDF financial report generator.

5. **Real-time Satellite Weather Dashboard**:
   - Powered by the real-time **Open-Meteo Meteorological API** (100% reliable, zero API key required).
   - Displays temperature, apparent feel, precipitation probability, humidity, wind speed, WMO weather condition.
   - 7-day daily forecast and district selector for Maharashtra (Pune, Nashik, Sambhajinagar, Kolhapur, Latur, Nagpur, Solapur, Jalgaon, Amravati).
   - Weather-based agricultural advisories for spray windows and irrigation timing.

6. **Irrigation Tracker**:
   - Field-level watering records (Drip, Sprinkler, Traditional Flood).
   - Water volume in liters and scheduled future reminders.

7. **Daily Tasks & Activity Planner**:
   - Field tasks categorized by Land prep, Sowing, Spraying, Fertilization, Weeding, Harvesting, Machinery.
   - Priority tags (Urgent, High, Medium, Low), worker assignments, due dates, completion checkbox.

8. **Labour Management**:
   - Worker directory with daily wage rates.
   - Daily attendance logging (Present, Half Day, Absent).
   - Automated wage earned, wage paid, and balance due calculations.

9. **Fertilizer & Crop Protection Records**:
   - Agrochemicals and organic inputs logger.
   - Mandatory verified agricultural university and CIBRC safety guidelines banner (PPE, wind caution, zero invented dosages).

10. **Machinery & Equipment Management**:
    - Tractors, Water Pumps, Sprayers, Harvesters, Cultivators.
    - Purchase info, maintenance logs, fuel costs, and rental revenue.

11. **APMC Mandi Market Price Tracker**:
    - Live and benchmark APMC mandi market price rates (Lasalgaon Onion, Latur Soybean, Jalna Cotton, Narayangaon Tomato, etc.).
    - Min, Max, Modal prices (₹/Quintal), date of update, and historical trend Recharts line chart.
    - AGMARKNET / MSAMB legal and official market transparency.

12. **Krishi Mitra AI Assistant**:
    - Multilingual AI chat in Marathi, Hindi, and English.
    - Voice Speech-to-Text input via Web Speech API (`mr-IN`, `hi-IN`, `en-IN`).
    - Text-to-Speech audio pronunciation using browser `speechSynthesis`.
    - Plant leaf photo upload and preliminary disease diagnosis (Leaf Blight, Chlorosis, Yellow Mosaic, etc.) with agronomy solutions.
    - Server-side API endpoint with uncertainty disclaimers and university recommendations.

13. **Supabase & PostgreSQL Cloud Integration**:
    - Full PostgreSQL database schema with Row Level Security (RLS) in `supabase/schema.sql`.
    - Ready for direct Supabase Auth and Database connection (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
    - Dual-mode offline-first local storage fallback for immediate zero-config testing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20.20.2)
- npm or pnpm

### Running Locally
```bash
cd smart-farmer
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

### Setting Active Workspace
To set this project directory as your active workspace in Antigravity IDE, select the folder:
`C:\Users\Admin\.gemini\antigravity\scratch\smart-farmer`
