'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import mrMessages from '@/messages/mr.json';
import hiMessages from '@/messages/hi.json';
import enMessages from '@/messages/en.json';

type TranslationRecord = Record<string, any>;

const messagesMap: Record<Language, TranslationRecord> = {
  mr: mrMessages,
  hi: hiMessages,
  en: enMessages,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'mr',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Marathi is DEFAULT
  const [language, setLanguageState] = useState<Language>('mr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('smart_farmer_lang') as Language;
      if (saved && (saved === 'mr' || saved === 'hi' || saved === 'en')) {
        setLanguageState(saved);
      } else {
        setLanguageState('mr');
      }
    } catch {
      setLanguageState('mr');
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('smart_farmer_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const dict = messagesMap[language] || messagesMap.mr;
    const keys = key.split('.');
    let current: any = dict;

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to Marathi if key missing in other language
        let fallbackVal: any = messagesMap.mr;
        for (const fbK of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && fbK in fallbackVal) {
            fallbackVal = fallbackVal[fbK];
          } else {
            fallbackVal = null;
            break;
          }
        }
        return (typeof fallbackVal === 'string' ? fallbackVal : fallback || key);
      }
    }

    return typeof current === 'string' ? current : (fallback || key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
