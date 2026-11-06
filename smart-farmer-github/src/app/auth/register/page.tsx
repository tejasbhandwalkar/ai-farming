'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Sprout, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { updateProfile } = useFarm();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    updateProfile({ full_name: name, phone, email });
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#f8faf5]">
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
          नवीन शेतकरी नोंदणी
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          डिजिटल शेती व्यासपीठावर मोफत खाते तयार करा
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-emerald-100 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                पूर्ण नाव (Farmer Full Name) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="उदा. रमेश मारुती पाटील"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                मोबाईल नंबर *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  required
                  placeholder="+91 98..."
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ईमेल आयडी
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  placeholder="ramesh@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                पासवर्ड तयार करा *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="किमान ६ अक्षरे"
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
              <span>{loading ? 'नोंदणी होत आहे...' : t('nav.register')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-gray-500">
            आधीच खाते आहे का?{' '}
            <Link href="/auth/login" className="font-bold text-emerald-700 hover:underline">
              {t('nav.login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
