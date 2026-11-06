'use client';

import React, { useState, useMemo } from 'react';
import { AppShell } from '@/components/AppShell';
import { useTranslation } from '@/context/LanguageContext';
import { MANDI_MARKETS_DATA, MANDI_COMMODITIES } from '@/lib/mandiData';
import { MandiPriceItem } from '@/lib/types';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Info,
  Scale
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function MandiPage() {
  const { t, language } = useTranslation();

  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<MandiPriceItem>(MANDI_MARKETS_DATA[0]);

  const filteredMandiList = useMemo(() => {
    return MANDI_MARKETS_DATA.filter(item => {
      if (selectedCrop !== 'all' && item.crop_en.toLowerCase() !== selectedCrop.toLowerCase()) return false;
      if (selectedDistrict !== 'all' && item.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
      return true;
    });
  }, [selectedCrop, selectedDistrict]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>{t('mandi.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              थेट कृषी बाजार भाव (APMC Mandi Tracker)
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              महाराष्ट्रातील लासलगाव, लातूर, पुणे, जालना मुख्य बाजार समित्यांचे थेट दर
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>अधिकृत ॲगमार्कनेट (AGMARKNET) डेटा</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Crop selector */}
            <select
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">सर्व पिके (All Commodities)</option>
              {MANDI_COMMODITIES.map(c => (
                <option key={c.key} value={c.key}>
                  {language === 'mr' ? c.label_mr : language === 'hi' ? c.label_hi : c.label_en}
                </option>
              ))}
            </select>

            {/* District selector */}
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">सर्व जिल्हे (All Districts)</option>
              <option value="Latur">Latur (लातूर)</option>
              <option value="Nashik">Nashik (नाशिक / लासलगाव)</option>
              <option value="Pune">Pune (पुणे)</option>
              <option value="Jalna">Jalna (जालना)</option>
              <option value="Akola">Akola (अकोला)</option>
              <option value="Amravati">Amravati (अमरावती)</option>
              <option value="Solapur">Solapur (सोलापूर)</option>
            </select>
          </div>

          <span className="text-xs text-gray-400">
            {filteredMandiList.length} बाजारभाव उपलब्ध
          </span>
        </div>

        {/* Active Mandi Item Detailed Trend Banner */}
        {activeItem && (
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-emerald-950 inline-block">
                निवडलेली मुख्य मंडी
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {activeItem.crop_mr} ({activeItem.crop_en})
              </h2>
              <p className="text-xs text-emerald-200 font-medium">
                {activeItem.market} • {activeItem.district}, {activeItem.state}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                  <div className="text-[10px] text-emerald-300 font-semibold">{t('mandi.min_price')}</div>
                  <div className="text-base font-black text-white">₹ {activeItem.min_price}</div>
                </div>

                <div className="bg-amber-400/20 p-3 rounded-2xl border border-amber-300/30">
                  <div className="text-[10px] text-amber-300 font-bold">{t('mandi.modal_price')}</div>
                  <div className="text-lg font-black text-amber-300">₹ {activeItem.modal_price}</div>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                  <div className="text-[10px] text-emerald-300 font-semibold">{t('mandi.max_price')}</div>
                  <div className="text-base font-black text-white">₹ {activeItem.max_price}</div>
                </div>
              </div>

              <div className="text-[11px] text-emerald-300 flex items-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>अद्यतन तारीख: <strong>{activeItem.updated_date}</strong> (दर प्रति क्विंटल)</span>
              </div>
            </div>

            {/* Historical Trend Line Chart */}
            <div className="lg:col-span-7 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/15">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold text-amber-300">गेल्या आठवड्यातील भाव कल (Historical Trend)</span>
                <span className="text-[10px] text-emerald-200">₹ / क्विंटल</span>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeItem.historical_trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="date" stroke="#a7f3d0" tick={{ fill: '#a7f3d0', fontSize: 11 }} />
                    <YAxis stroke="#a7f3d0" tick={{ fill: '#a7f3d0', fontSize: 11 }} domain={['dataMin - 100', 'dataMax + 100']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#064e3b', borderColor: '#047857', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      formatter={(val: any) => [`₹${val}`, 'सरासरी भाव']}
                    />
                    <Line type="monotone" dataKey="price" stroke="#facc15" strokeWidth={3} dot={{ fill: '#facc15', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Mandi Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMandiList.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                activeItem.id === item.id
                  ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {item.crop_mr}
                </span>
                <span className="text-xs text-gray-400">{item.variety}</span>
              </div>

              <h3 className="font-extrabold text-base text-gray-900">{item.market}</h3>
              <p className="text-xs text-gray-500 mb-4">{item.district}, {item.state}</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 block">{t('mandi.modal_price')}</span>
                  <span className="text-xl font-black text-emerald-800">₹ {item.modal_price}</span>
                </div>

                <div className="text-right text-xs text-gray-500">
                  <div>किमान: ₹{item.min_price}</div>
                  <div>कमाल: ₹{item.max_price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Source Note & Disclaimer */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{t('mandi.source_note')}</span>
          </div>
          <span className="font-semibold text-emerald-700">थेट / कायदेशीर बाजार माहिती</span>
        </div>
      </div>
    </AppShell>
  );
}
