'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Language } from '@/lib/types';
import { Globe, Check } from 'lucide-react';

export const LanguageSelector: React.FC<{ variant?: 'compact' | 'full' }> = ({ variant = 'compact' }) => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; native: string; badge: string }[] = [
    { code: 'mr', label: 'मराठी', native: 'मराठी (Default)', badge: 'म' },
    { code: 'hi', label: 'हिन्दी', native: 'हिन्दी', badge: 'हि' },
    { code: 'en', label: 'English', native: 'English', badge: 'EN' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-900 transition-colors shadow-sm text-sm font-medium"
        title="भाषा निवडा / Choose Language"
      >
        <Globe className="w-4 h-4 text-emerald-700" />
        <span className="font-semibold">{currentLang.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black/5 z-50 py-1.5 border border-emerald-100 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
            भाषा निवडा / Select Language
          </div>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                language === lang.code ? 'text-emerald-800 font-semibold bg-emerald-50/70' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                  {lang.badge}
                </span>
                <span>{lang.native}</span>
              </div>
              {language === lang.code && <Check className="w-4 h-4 text-emerald-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
