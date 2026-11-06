import { WeatherData } from './types';

export const MAHARASHTRA_DISTRICTS = [
  { name_mr: 'बारामती / पुणे', name_hi: 'बारामती / पुणे', name_en: 'Baramati / Pune', lat: 18.1517, lon: 74.5772 },
  { name_mr: 'नाशिक (Nashik)', name_hi: 'नासिक (Nashik)', name_en: 'Nashik', lat: 19.9975, lon: 73.7898 },
  { name_mr: 'छत्रपती संभाजीनगर', name_hi: 'छत्रपति संभाजीनगर', name_en: 'Chhatrapati Sambhajinagar', lat: 19.8762, lon: 75.3433 },
  { name_mr: 'कोल्हापूर (Kolhapur)', name_hi: 'कोल्हापुर (Kolhapur)', name_en: 'Kolhapur', lat: 16.7050, lon: 74.2433 },
  { name_mr: 'लातूर (Latur)', name_hi: 'लातूर (Latur)', name_en: 'Latur', lat: 18.4088, lon: 76.5604 },
  { name_mr: 'नागपूर (Nagpur)', name_hi: 'नागपुर (Nagpur)', name_en: 'Nagpur', lat: 21.1458, lon: 79.0882 },
  { name_mr: 'सोलापूर (Solapur)', name_hi: 'सोलापुर (Solapur)', name_en: 'Solapur', lat: 17.6599, lon: 75.9064 },
  { name_mr: 'जळगाव (Jalgaon)', name_hi: 'जलगांव (Jalgaon)', name_en: 'Jalgaon', lat: 21.0077, lon: 75.5626 },
  { name_mr: 'अमरावती (Amravati)', name_hi: 'अमरावती (Amravati)', name_en: 'Amravati', lat: 20.9374, lon: 77.7796 }
];

export function getWmoCondition(code: number): { condition_en: string; condition_mr: string; condition_hi: string } {
  if (code === 0) return { condition_en: 'Clear Sky', condition_mr: 'निरभ्र आकाश', condition_hi: 'साफ आसमान' };
  if (code === 1 || code === 2) return { condition_en: 'Partly Cloudy', condition_mr: 'अंशतः ढगाळ', condition_hi: 'आंशिक बादल' };
  if (code === 3) return { condition_en: 'Overcast', condition_mr: 'पूर्ण ढगाळ वातावरण', condition_hi: 'घने बादल' };
  if (code >= 51 && code <= 55) return { condition_en: 'Light Drizzle', condition_mr: 'हलकी रिमझिम', condition_hi: 'हल्की बूंदाबांदी' };
  if (code >= 61 && code <= 65) return { condition_en: 'Rain', condition_mr: 'पाऊस', condition_hi: 'बारिश' };
  if (code >= 80 && code <= 82) return { condition_en: 'Rain Showers', condition_mr: 'पावसाच्या सरी', condition_hi: 'तेज बारिश की बौछारें' };
  if (code >= 95) return { condition_en: 'Thunderstorm', condition_mr: 'वादळी पाऊस / विजांचा कडकडाट', condition_hi: 'गरज के साथ तूफान' };
  return { condition_en: 'Moderate Clouds', condition_mr: 'मध्यम ढगाळ', condition_hi: 'मध्यम बादल' };
}

export async function fetchLiveWeather(lat: number = 18.1517, lon: number = 74.5772): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata`;
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) {
      throw new Error(`Weather API status: ${res.status}`);
    }
    const data = await res.json();
    const current = data.current;
    const daily = data.daily;
    const conditionInfo = getWmoCondition(current.weather_code);

    // Weather-based agronomy advisory
    let advisory = 'हवामान अनुकूल आहे. नियमित शेती कामे चालू ठेवावीत.';
    const rainProb = current.precipitation_probability || daily.precipitation_probability_max?.[0] || 0;
    const humidity = current.relative_humidity_2m;

    if (rainProb > 60) {
      advisory = 'पावसाची दाट शक्यता आहे. कीटकनाशके किंवा विद्राव्य खतांची फवारणी तात्काळ पुढे ढकला. शेतात पाण्याचा निचरा नीट असल्याची खात्री करा.';
    } else if (humidity > 80) {
      advisory = 'हवेतील आर्द्रता ८०% पेक्षा जास्त आहे. कांदा, सोयाबीन व टोमॅटो पिकांवर बुरशीजन्य करपा व भुरी रोगाचा प्रादुर्भाव वाढू शकतो. पिकांचे बारकाईने निरीक्षण करा.';
    } else if (current.temperature_2m > 36) {
      advisory = 'उष्णता वाढलेली आहे. पिकांना बाष्पीभवनापासून वाचवण्यासाठी ठिबक सिंचनाने सकाळी किंवा संध्याकाळी पाणी द्या.';
    } else {
      advisory = 'हवामान फवारणी आणि आंतरमशागतीसाठी अत्यंत अनुकूल आहे. सिंचनाचे नियोजन वेळापत्रकानुसार करा.';
    }

    const dailyForecast = (daily.time || []).slice(0, 7).map((d: string, index: number) => {
      const code = daily.weather_code[index] || 0;
      const cond = getWmoCondition(code);
      return {
        date: d,
        max_temp: Math.round(daily.temperature_2m_max[index]),
        min_temp: Math.round(daily.temperature_2m_min[index]),
        rain_probability: daily.precipitation_probability_max[index] || 0,
        condition: cond.condition_mr
      };
    });

    return {
      temperature: Math.round(current.temperature_2m),
      apparent_temperature: Math.round(current.apparent_temperature),
      relative_humidity: current.relative_humidity_2m,
      precipitation_probability: rainProb,
      wind_speed: Math.round(current.wind_speed_10m),
      weather_code: current.weather_code,
      weather_description: conditionInfo.condition_mr,
      daily: dailyForecast,
      agricultural_advisory: advisory
    };
  } catch (err) {
    console.error('Failed to fetch weather from Open-Meteo:', err);
    return null;
  }
}
