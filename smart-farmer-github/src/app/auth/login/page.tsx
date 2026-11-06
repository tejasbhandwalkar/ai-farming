'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserRole } from '@/lib/types';
import { Sprout, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole, updateProfile } = useFarm();
  const { t, language } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleQuickDemoLogin = (role: UserRole, name: string) => {
    setRole(role);
    updateProfile({ full_name: name });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#f8faf5]">
      {/* Top Bar with Language Selector */}
      <div className="absolute top-5 right-5 sm:right-10">
        <LanguageSelector />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-lg shadow-emerald-700/25">
            <Sprout className="w-7 h-7" />
          </div>
          <span className="font-extrabold text-2xl text-emerald-950 tracking-tight">
            {t('app_name')}
          </span>
        </Link>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          शेतकरी खात्यात प्रवेश करा
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          {t('tagline')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-emerald-100 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ईमेल आयडी किंवा मोबाईल नंबर
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="tanaji.patil@smartfarmer.in"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                पासवर्ड
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'लॉगिन होत आहे...' : t('nav.login')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Role Switcher Demo Buttons */}
          <div className="pt-4 border-t border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block text-center mb-3">
              त्वरित डेमो प्रवेश (1-Click Demo Login)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('farmer_owner', 'तानाजीराव पाटील')}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-950 text-xs font-bold text-center"
              >
                🌾 शेत मालक
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('worker', 'दत्तात्रय शिंदे')}
                className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-950 text-xs font-bold text-center"
              >
                👷 शेत मजूर
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin', 'प्रशासक अधिकारी')}
                className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 text-xs font-bold text-center"
              >
                👑 अ‍ॅडमिन
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            नवीन शेतकरी आहात का?{' '}
            <Link href="/auth/register" className="font-bold text-emerald-700 hover:underline">
              {t('nav.register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
