# SMART FARMER – Comprehensive Project Blueprint & File Reference
### स्मार्ट शेतकरी • संपूर्ण कृषी व्यवस्थापन प्रणाली

---

## 📁 Project Directory Structure

```
smart-farmer/
├── messages/                               # Root Internationalization dictionaries
│   ├── mr.json                             # Marathi translations (DEFAULT)
│   ├── hi.json                             # Hindi translations
│   └── en.json                             # English translations
├── supabase/
│   └── schema.sql                          # Complete PostgreSQL schema with RLS & demo data
├── src/
│   ├── app/
│   │   ├── globals.css                     # Agricultural CSS styles & print stylesheet
│   │   ├── layout.tsx                      # Root layout with Noto Sans Devanagari
│   │   ├── page.tsx                        # Public Landing Page
│   │   ├── dashboard/page.tsx              # Farm Dashboard (Computed statistics & KPIs)
│   │   ├── farms/page.tsx                  # Farm & Land Management (18-acre family farm)
│   │   ├── crops/page.tsx                  # Crop Lifecycle Tracking & stages
│   │   ├── finance/page.tsx                # Financial accounting, Recharts, CSV & PDF export
│   │   ├── weather/page.tsx                # Satellite Weather & Agricultural Advisories
│   │   ├── irrigation/page.tsx             # Irrigation Tracker & Scheduler
│   │   ├── tasks/page.tsx                  # Daily Farm Planner & Activities
│   │   ├── labour/page.tsx                 # Workers, Attendance & Wage Records
│   │   ├── inputs/page.tsx                 # Fertilizers & Agrochemicals with Safety Rules
│   │   ├── machinery/page.tsx              # Tractors & Farm Equipment Management
│   │   ├── mandi/page.tsx                  # APMC Mandi Market Price Tracker (AGMARKNET)
│   │   ├── ai-assistant/page.tsx           # Krishi Mitra AI (Voice input & Plant Disease)
│   │   ├── settings/page.tsx               # Settings, Profile & Supabase Sync
│   │   ├── auth/
│   │   │   ├── login/page.tsx              # Login & 1-click Demo Role Switcher
│   │   │   └── register/page.tsx           # Farmer Registration
│   │   └── api/
│   │       ├── weather/route.ts            # Open-Meteo live satellite weather API
│   │       ├── mandi/route.ts              # APMC Mandi market price lookup API
│   │       └── ai-assistant/route.ts       # Agronomy AI diagnostic engine & Gemini fallback
│   ├── components/
│   │   ├── AppShell.tsx                    # Desktop sidebar & Mobile bottom navigation
│   │   ├── LanguageSelector.tsx            # Three-language switcher
│   │   ├── QuickActionModal.tsx            # Global '+' floating action modal
│   │   ├── WeatherWidget.tsx               # Compact real-time weather card
│   │   └── VoiceInputButton.tsx            # Web Speech API voice dictation
│   ├── context/
│   │   ├── LanguageContext.tsx             # i18n context provider with persistence
│   │   └── FarmContext.tsx                 # Central state store & local storage sync
│   └── lib/
│       ├── types.ts                        # Complete TypeScript interfaces
│       ├── demoData.ts                     # Pre-seeded 18-acre Maharashtra demo data
│       ├── weather.ts                      # Open-Meteo client & district coordinates
│       ├── mandiData.ts                    # AGMARKNET APMC market price database
│       └── supabase.ts                     # Supabase client & environment configuration
├── start-farmer.bat                        # Double-click launcher for Windows
├── start-farmer.ps1                        # PowerShell launcher script
├── .env.example                            # Supabase and Gemini environment template
└── package.json                            # Project dependencies
```

---

## 🛠️ How to Launch the Application

### Method 1: Using the Launcher File
Double-click `start-farmer.bat` inside the project folder. It will start the server and automatically open the application in your browser at `http://localhost:3000`.

### Method 2: Command Line
```bash
cd smart-farmer
npm run dev
# or
npm run start -- -p 3000
```
Open your browser to: [http://localhost:3000](http://localhost:3000)
