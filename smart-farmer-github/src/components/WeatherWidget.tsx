'use client';

import React, { useState, useEffect } from 'react';
import { CloudRain, Droplets, Wind, Sun, AlertTriangle, RefreshCw } from 'lucide-react';
import { WeatherData } from '@/lib/types';
import { useTranslation } from '@/context/LanguageContext';

export const WeatherWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t, language } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/weather?lat=18.1517&lon=74.5772');
      if (!res.ok) throw new Error('Failed to load weather');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm animate-pulse flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-emerald-100 rounded"></div>
          <div className="h-8 w-16 bg-emerald-100 rounded"></div>
        </div>
        <div className="h-10 w-10 bg-emerald-100 rounded-full"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-800 text-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>{language === 'mr' ? 'हवामान माहिती सध्या उपलब्ध नाही.' : 'Weather currently unavailable.'}</span>
        </div>
        <button
          onClick={fetchWeather}
          className="px-2 py-1 bg-white border border-amber-300 rounded text-xs font-medium hover:bg-amber-100"
        >
          {language === 'mr' ? 'पुन्हा प्रयत्न करा' : 'Retry'}
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50/80 border border-emerald-200/70 px-3.5 py-1.5 rounded-xl text-emerald-950">
        <Sun className="w-5 h-5 text-amber-500 fill-amber-400" />
        <div>
          <span className="text-sm font-bold">{weather.temperature}°C</span>
          <span className="text-xs text-emerald-800 ml-1.5">{weather.weather_description}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-700 ml-2 border-l border-emerald-200 pl-2">
          <CloudRain className="w-3.5 h-3.5 text-blue-500" />
          <span>{weather.precipitation_probability}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
      {/* Background soft glow decorative circles */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-600/20 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold tracking-wide uppercase">
            <span>पुणे / बारामती (महाराष्ट्र)</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-extrabold tracking-tight">{weather.temperature}°C</span>
            <span className="text-sm text-emerald-200 font-medium">
              (जाणवणारे {weather.apparent_temperature}°C)
            </span>
          </div>
          <p className="text-emerald-100 font-medium text-sm mt-0.5">{weather.weather_description}</p>
        </div>

        <button
          onClick={fetchWeather}
          className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-800/50 transition-colors"
          title="ताजे करा"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-700/50 relative z-10">
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-sky-300" />
          <div>
            <div className="text-[10px] text-emerald-300">पाऊस शक्यता</div>
            <div className="text-xs font-bold">{weather.precipitation_probability}%</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-emerald-300" />
          <div>
            <div className="text-[10px] text-emerald-300">हवेतील आर्द्रता</div>
            <div className="text-xs font-bold">{weather.relative_humidity}%</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-teal-300" />
          <div>
            <div className="text-[10px] text-emerald-300">वाऱ्याचा वेग</div>
            <div className="text-xs font-bold">{weather.wind_speed} km/h</div>
          </div>
        </div>
      </div>

      {/* Real-time Agricultural Advisory */}
      <div className="mt-3.5 bg-emerald-900/60 border border-emerald-700/60 rounded-xl p-2.5 text-xs text-emerald-100 flex items-start gap-2 relative z-10">
        <span className="font-bold text-amber-300 shrink-0">कृषी सल्ला:</span>
        <span className="line-clamp-2">{weather.agricultural_advisory}</span>
      </div>
    </div>
  );
};
