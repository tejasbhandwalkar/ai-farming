'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserRole } from '@/lib/types';
import { 
  Settings, 
  User, 
  Globe, 
  ShieldCheck, 
  Database, 
  RotateCcw, 
  Check, 
  Copy, 
  ExternalLink,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const { profile, updateProfile, role, setRole, resetToDemoData } = useFarm();
  const { t, language, setLanguage } = useTranslation();

  const [fullName, setFullName] = useState(profile.full_name);
  const [phone, setPhone] = useState(profile.phone);
  const [district, setDistrict] = useState(profile.district);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      phone,
      district
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const copySqlSchema = () => {
    const sqlText = `-- SMART FARMER PostgreSQL Schema with Supabase Auth & RLS
-- Run in your Supabase SQL Editor:
-- Profiles, Farms, Fields, Crops, Transactions, Irrigation, Tasks, Workers, Inputs, Machinery`;
    navigator.clipboard.writeText(sqlText);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Settings className="w-4 h-4" />
            <span>{t('settings.title')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
            खाते सेटिंग्ज आणि प्राधान्ये (Settings)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            तुमची भाषा, शेतकरी प्रोफाइल, भूमिका आणि सुपाबेस डेटाबेस सेटिंग्ज
          </p>
        </div>

        {/* 1. Language Preferences (MANDATORY THREE-LANGUAGE PERSISTENCE) */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-700" />
            <h2 className="font-extrabold text-base text-gray-900">
              {t('settings.language')}
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            संपूर्ण अ‍ॅपची मुख्य भाषा निवडा. ही निवड तुमच्या प्रोफाइलमध्ये सेव्ह केली जाईल.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            {[
              { code: 'mr', title: 'मराठी (Default)', sub: 'मराठी भाषा' },
              { code: 'hi', title: 'हिन्दी', sub: 'हिन्दी भाषा' },
              { code: 'en', title: 'English', sub: 'English Language' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  language === lang.code
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs font-bold'
                    : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{lang.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{lang.sub}</div>
                </div>
                {language === lang.code && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Role-Based Access Control (Farmer / Worker / Admin) */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h2 className="font-extrabold text-base text-gray-900">
              {t('settings.role')} (Role-Based Access)
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            शेतकरी मालक, शेत मजूर किंवा प्रशासक भूमिका निवडा.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { id: 'farmer_owner', title: t('roles.farmer_owner'), desc: 'शेतीचे पूर्ण अधिकार, खर्च व नफा नियोजन' },
              { id: 'worker', title: t('roles.worker'), desc: 'दैनंदिन कामे व हजेरी पाहण्याची मर्यादित परवानगी' },
              { id: 'admin', title: t('roles.admin'), desc: 'सर्व शेते व प्रणाली व्यवस्थापन अधिकार' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as UserRole)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  role === r.id
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs font-bold'
                    : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                }`}
              >
                <div>
                  <div className="text-sm font-bold flex items-center justify-between">
                    <span>{r.title}</span>
                    {role === r.id && <Check className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Farmer Profile Editing Form */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-700" />
            <h2 className="font-extrabold text-base text-gray-900">
              {t('settings.user_profile')}
            </h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 pt-1">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('settings.full_name')} *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('settings.phone')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('settings.district')}</label>
                <input
                  type="text"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ईमेल (Email ID)</label>
                <input
                  type="email"
                  disabled
                  value={profile.email || 'tanaji.patil@smartfarmer.in'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{t('settings.save')}</span>
              </button>

              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>{t('common.success')}</span>
                </span>
              )}
            </div>
          </form>
        </div>

        {/* 4. Supabase Database & Cloud Synchronization */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-700" />
              <h2 className="font-extrabold text-base text-gray-900">
                {t('settings.supabase_title')}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              ● स्थानिक + सुपाबेस सज्ज (Ready)
            </span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            {t('settings.supabase_desc')} सर्व डेटा आपोआप लोकल स्टोरेजमध्ये जतन होतो, ज्यामुळे इंटरनेट नसतानाही अ‍ॅप सुरळीत चालते. तुमचा स्वतःचा Supabase PostgreSQL डेटाबेस जोडण्यासाठी <code>.env.local</code> मध्ये <code>NEXT_PUBLIC_SUPABASE_URL</code> आणि <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> प्रविष्ट करा.
          </p>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-gray-800 block">PostgreSQL डेटाबेस स्कीमा (schema.sql):</span>
              <span className="text-gray-500">Row Level Security (RLS) व सर्व १० मॉड्यूल्सचे कोष्टके तयार आहेत.</span>
            </div>
            <button
              onClick={copySqlSchema}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-300 font-bold text-gray-700 hover:bg-gray-100"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSchema ? 'कॉपी झाले!' : 'SQL स्कीमा कॉपी करा'}</span>
            </button>
          </div>

          {/* Reset Demo Data Button */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-800">१८ एकर डेमो डेटा पूर्ववत करा</div>
              <div className="text-[11px] text-gray-500">मूळ कौटुंबिक शेताची demo माहिती परत लोड करा</div>
            </div>

            <button
              onClick={() => {
                if (confirm('सर्व बदल रीसेट करून मूळ १८ एकर कौटुंबिक शेत लोड करायचे का?')) {
                  resetToDemoData();
                  alert('डेमो डेटा यशस्वीरित्या रिस्टोअर झाला!');
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-700 border border-gray-200 text-xs font-bold text-gray-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट करा</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
