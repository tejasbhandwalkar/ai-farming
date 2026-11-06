'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { useTranslation } from '@/context/LanguageContext';
import { MAHARASHTRA_DISTRICTS } from '@/lib/weather';
import { WeatherData } from '@/lib/types';
import { 
  CloudSun, 
  CloudRain, 
  Droplets, 
  Wind, 
  Thermometer, 
  Sun, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  MapPin, 
  Calendar 
} from 'lucide-react';

export default function WeatherPage() {
  const { t, language } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState(MAHARASHTRA_DISTRICTS[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDistrictWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistrictWeather(selectedDistrict.lat, selectedDistrict.lon);
  }, [selectedDistrict]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header & District Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <CloudSun className="w-4 h-4" />
              <span>{t('weather.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              उपग्रह हवामान व कृषी सल्ला
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              थेट ओपन-मेटिओ (Open-Meteo) हवामान मॉडेल • सात दिवसांचा पाऊस व तापमान अंदाज
            </p>
          </div>

          {/* District Switcher */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <select
              value={selectedDistrict.name_en}
              onChange={e => {
                const found = MAHARASHTRA_DISTRICTS.find(d => d.name_en === e.target.value);
                if (found) setSelectedDistrict(found);
              }}
              className="px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50/60 text-emerald-950 font-bold text-xs focus:ring-2 focus:ring-emerald-500"
            >
              {MAHARASHTRA_DISTRICTS.map(d => (
                <option key={d.name_en} value={d.name_en}>
                  {language === 'mr' ? d.name_mr : language === 'hi' ? d.name_hi : d.name_en}
                </option>
              ))}
            </select>

            <button
              onClick={() => fetchDistrictWeather(selectedDistrict.lat, selectedDistrict.lon)}
              className="p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
              title="ताजे करा"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-700' : ''}`} />
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">हवामान सेवा सध्या उपलब्ध नाही</h4>
                <p className="text-xs text-amber-700 mt-0.5">
                  कृषी हवामान सर्व्हरशी संपर्क होऊ शकला नाही. कृपया तुमचे इंटरनेट कनेक्शन तपासा किंवा पुन्हा प्रयत्न करा.
                </p>
              </div>
            </div>
            <button
              onClick={() => fetchDistrictWeather(selectedDistrict.lat, selectedDistrict.lon)}
              className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
            >
              पुन्हा प्रयत्न करा
            </button>
          </div>
        )}

        {/* Current Weather Highlights Card */}
        {weather && (
          <>
            <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{language === 'mr' ? selectedDistrict.name_mr : selectedDistrict.name_en} • थेट स्थिती</span>
                  </div>

                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl sm:text-6xl font-black tracking-tight">
                      {weather.temperature}°C
                    </span>
                    <span className="text-lg text-emerald-200 font-medium">
                      जाणवणारे {weather.apparent_temperature}°C
                    </span>
                  </div>

                  <p className="text-xl font-bold text-emerald-100">
                    {weather.weather_description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-200">
                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                      <CloudRain className="w-4 h-4 text-sky-300" />
                      <span>पाऊस शक्यता: <strong className="text-white">{weather.precipitation_probability}%</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                      <Droplets className="w-4 h-4 text-teal-300" />
                      <span>आर्द्रता: <strong className="text-white">{weather.relative_humidity}%</strong></span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                      <Wind className="w-4 h-4 text-emerald-300" />
                      <span>वाऱ्याचा वेग: <strong className="text-white">{weather.wind_speed} km/h</strong></span>
                    </div>
                  </div>
                </div>

                {/* Agricultural Advisory Card Banner */}
                <div className="md:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4" />
                    <span>कृषी शास्त्रज्ञ सल्ला (Agri Advisory)</span>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    {weather.agricultural_advisory}
                  </p>
                  <div className="text-[10px] text-emerald-300/80 italic">
                    स्रोत: भारतीय हवामान शास्त्र विभाग (IMD) व राहुरी कृषी विद्यापीठ शिफारशी
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast Grid */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-extrabold text-base text-gray-900">
                    {t('weather.weekly_forecast')} (७ दिवसांचा अंदाज)
                  </h3>
                </div>
                <span className="text-xs text-gray-400">रोजचे तापमान व पाऊस</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {weather.daily.map((day, idx) => (
                  <div
                    key={day.date}
                    className={`p-4 rounded-2xl border text-center flex flex-col justify-between ${
                      idx === 0
                        ? 'bg-emerald-50/80 border-emerald-300 font-bold'
                        : 'bg-gray-50/60 border-gray-100'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-700">
                        {idx === 0 ? 'आज (Today)' : idx === 1 ? 'उद्या (Tomorrow)' : day.date.slice(5)}
                      </div>
                      <div className="text-xs text-emerald-800 font-semibold mt-1">
                        {day.condition}
                      </div>
                    </div>

                    <div className="my-3">
                      <div className="text-lg font-black text-gray-900">{day.max_temp}°</div>
                      <div className="text-xs text-gray-400">{day.min_temp}°</div>
                    </div>

                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 py-1 px-2 rounded-xl">
                      <CloudRain className="w-3 h-3 text-sky-500" />
                      <span>{day.rain_probability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Practical Farming Reminders Based on Weather */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">
            हवामानानुसार महत्त्वाच्या शेती मार्गदर्शक सूचना
          </h3>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
              <span className="font-bold text-emerald-900 block">फवारणीसाठी योग्य वेळ:</span>
              <p className="text-emerald-800">
                वाऱ्याचा वेग ताशी १० किमी पेक्षा कमी असताना व पावसाची शक्यता नसतानाच सकाळी ८ ते ११ दरम्यान फवारणी करावी.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
              <span className="font-bold text-blue-900 block">ठिबक सिंचन नियोजन:</span>
              <p className="text-blue-800">
                उष्ण तापमान असल्यास बाष्पीभवन टाळण्यासाठी दुपारी पाणी देणे टाळावे. संध्याकाळी किंवा पहाटे ठिबक चालवावे.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
              <span className="font-bold text-purple-900 block">बुरशीजन्य रोग प्रतिबंध:</span>
              <p className="text-purple-800">
                ढगाळ वातावरण व जास्त आर्द्रता असल्यास कांदा आणि डाळिंब बागेत बुरशीनाशकाची प्रतिबंधात्मक फवारणी वेळेत पूर्ण करावी.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
