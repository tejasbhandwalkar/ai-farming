'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { 
  Sprout, 
  Map, 
  IndianRupee, 
  CloudSun, 
  TrendingUp, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Droplet, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf5]">
      {/* Public Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-emerald-950 tracking-tight block">
                {t('app_name')}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block -mt-1 tracking-wider uppercase">
                Smart Agriculture System
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition-all hover:scale-102 active:scale-98"
            >
              {t('landing.cta_demo')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/60 via-white to-[#f8faf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>{t('landing.hero_title')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 tracking-tight leading-[1.15]">
                {t('landing.hero_title')}
              </h1>

              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed">
                {t('landing.hero_subtitle')}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                <Link
                  href="/dashboard"
                  className="px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-base font-bold shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 hover:gap-3"
                >
                  <span>{t('landing.cta_start')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/crops"
                  className="px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-base font-bold shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  <span>{t('nav.crops')}</span>
                </Link>
              </div>

              {/* Farmer Trust Stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-100 text-center sm:text-left">
                <div>
                  <div className="text-2xl font-black text-emerald-900">१८ एकर</div>
                  <div className="text-xs font-semibold text-gray-500">डेमो शेतजमीन तयार</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-900">३ भाषा</div>
                  <div className="text-xs font-semibold text-gray-500">मराठी, हिंदी, इंग्रजी</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-900">२४x७ AI</div>
                  <div className="text-xs font-semibold text-gray-500">रोग निदान व सल्ला</div>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Agricultural Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100">
                {/* Header card preview */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      कौटुंबिक शेत (Family Farm)
                    </span>
                    <h3 className="text-lg font-extrabold text-gray-900">१८ एकर - बारामती, पुणे</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    सक्रिय (Active)
                  </span>
                </div>

                {/* Crop Previews */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        🌱
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">सोयाबीन (५ एकर)</div>
                        <div className="text-xs text-gray-500">वाढीचा टप्पा • तब्येत चांगली</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">JS-335</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                        🌸
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">कापूस (४ एकर)</div>
                        <div className="text-xs text-gray-500">फुलोरा व बोंड धारणा</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-700">Bt Cotton</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/70 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                        🧅
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">कांदा (३ एकर)</div>
                        <div className="text-xs text-gray-500">भीमा सुपर • ठिबक सिंचन</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-purple-700">लासलगाव ₹२,५२०</span>
                  </div>
                </div>

                {/* Financial Summary Highlight */}
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-emerald-300 font-semibold">अंदाजे निव्वळ नफा (Net Profit)</div>
                    <div className="text-xl font-black">₹ १,७३,०००</div>
                  </div>
                  <Link
                    href="/finance"
                    className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors"
                  >
                    हिशोब पहा
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 bg-white border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase">
              SMART FARMER वैशिष्ट्ये
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
              {t('landing.features_title')}
            </h2>
            <p className="text-base text-gray-600">
              {t('landing.features_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#f8faf5] rounded-3xl p-6 border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t('landing.feat_farm_title')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.feat_farm_desc')}
              </p>
              <Link href="/farms" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
                <span>तुकडे पहा</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#f8faf5] rounded-3xl p-6 border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t('landing.feat_crop_title')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.feat_crop_desc')}
              </p>
              <Link href="/crops" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
                <span>पिके पहा</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f8faf5] rounded-3xl p-6 border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t('landing.feat_finance_title')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.feat_finance_desc')}
              </p>
              <Link href="/finance" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
                <span>हिशोब तपासा</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#f8faf5] rounded-3xl p-6 border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t('landing.feat_weather_title')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.feat_weather_desc')}
              </p>
              <Link href="/weather" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
                <span>हवामान अंदाज</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#f8faf5] rounded-3xl p-6 border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">
                {t('landing.feat_mandi_title')}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.feat_mandi_desc')}
              </p>
              <Link href="/mandi" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
                <span>APMC भाव पहा</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-5">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                {t('landing.feat_ai_title')}
              </h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                {t('landing.feat_ai_desc')}
              </p>
              <Link href="/ai-assistant" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:underline">
                <span>AI कृषी मित्राशी बोला</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 lg:py-24 bg-[#f8faf5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-extrabold text-emerald-950">
              {t('landing.how_it_works')}
            </h2>
            <p className="text-gray-600 text-sm">४ सोप्या टप्प्यांमध्ये डिजिटल शेती व्यवस्थापन</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg mx-auto">
                १
              </div>
              <h3 className="font-bold text-base text-gray-900">{t('landing.step1_title')}</h3>
              <p className="text-xs text-gray-600">{t('landing.step1_desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg mx-auto">
                २
              </div>
              <h3 className="font-bold text-base text-gray-900">{t('landing.step2_title')}</h3>
              <p className="text-xs text-gray-600">{t('landing.step2_desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg mx-auto">
                ३
              </div>
              <h3 className="font-bold text-base text-gray-900">{t('landing.step3_title')}</h3>
              <p className="text-xs text-gray-600">{t('landing.step3_desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg mx-auto">
                ४
              </div>
              <h3 className="font-bold text-base text-gray-900">{t('landing.step4_title')}</h3>
              <p className="text-xs text-gray-600">{t('landing.step4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                शेतकऱ्यांचा फायदा
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
                {t('landing.benefits_title')}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                पारंपारिक वही-खात्यांची जागा आता एका क्लिकवर मोबाईल अ‍ॅपने घेतली आहे. शेतीचा प्रत्येक निर्णय वैज्ञानिक माहिती व अचूक आकडेवारीवर आधारित घ्या.
              </p>

              <div className="space-y-3.5">
                {[
                  t('landing.benefit1'),
                  t('landing.benefit2'),
                  t('landing.benefit3'),
                  t('landing.benefit4')
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20"
                >
                  <span>डॅशबोर्ड उघडा</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Responsive Screenshot mockup banner */}
            <div className="bg-emerald-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
              <div className="relative z-10 space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-emerald-950 inline-block">
                  मराठीत पूर्ण समर्थन
                </span>
                <h3 className="text-2xl font-bold">सोपे, जलद आणि शेतकऱ्यांसाठी समर्पित</h3>
                <p className="text-emerald-200 text-sm">
                  मोबाईलवर एका हाताने वापरता येणारे मोठे बटन्स, स्पष्ट अक्षरे आणि व्हॉइस इनपुट सुविधा.
                </p>
                <div className="pt-4 flex gap-4 text-xs font-medium text-emerald-300">
                  <span>✓ ऑफलाइन स्थानिक साठा</span>
                  <span>✓ सुपाबेस क्लाऊड सिंक</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#f8faf5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-emerald-950">
            {t('landing.contact_title')}
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            {t('landing.contact_desc')}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 flex flex-col items-center gap-2">
              <Phone className="w-6 h-6 text-emerald-700" />
              <div className="text-xs text-gray-500">हेल्पलाईन</div>
              <div className="text-sm font-bold text-gray-900">+91 1800-FARMER</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 flex flex-col items-center gap-2">
              <Mail className="w-6 h-6 text-emerald-700" />
              <div className="text-xs text-gray-500">ईमेल</div>
              <div className="text-sm font-bold text-gray-900">support@smartfarmer.in</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 flex flex-col items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-700" />
              <div className="text-xs text-gray-500">स्थान</div>
              <div className="text-sm font-bold text-gray-900">महाराष्ट्र, भारत</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white pt-12 pb-8 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-800">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-lg tracking-tight">{t('app_name')}</span>
              </div>
              <p className="text-xs text-emerald-300 leading-relaxed">
                {t('tagline')} — भारताच्या प्रगतीसाठी स्मार्ट तंत्रज्ञान.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">मॉड्यूल्स</h4>
              <ul className="space-y-2 text-xs text-emerald-200">
                <li><Link href="/farms" className="hover:text-white">{t('nav.farms')}</Link></li>
                <li><Link href="/crops" className="hover:text-white">{t('nav.crops')}</Link></li>
                <li><Link href="/finance" className="hover:text-white">{t('nav.finance')}</Link></li>
                <li><Link href="/irrigation" className="hover:text-white">{t('nav.irrigation')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">माहिती व सेवा</h4>
              <ul className="space-y-2 text-xs text-emerald-200">
                <li><Link href="/weather" className="hover:text-white">{t('nav.weather')}</Link></li>
                <li><Link href="/mandi" className="hover:text-white">{t('nav.mandi')}</Link></li>
                <li><Link href="/ai-assistant" className="hover:text-white">{t('nav.ai_assistant')}</Link></li>
                <li><Link href="/inputs" className="hover:text-white">{t('nav.inputs')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">अधिकृत संदर्भ</h4>
              <ul className="space-y-2 text-xs text-emerald-200">
                <li><span className="text-emerald-300">AGMARKNET (एग्मार्कनेट)</span></li>
                <li><span className="text-emerald-300">महात्मा फुले कृषी विद्यापीठ (MPKV)</span></li>
                <li><span className="text-emerald-300">Open-Meteo उपग्रह हवामान</span></li>
                <li><Link href="/settings" className="hover:text-white">{t('nav.settings')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400">
            <div>
              © 2026 SMART FARMER – सर्व हक्क सुरक्षित. (All Rights Reserved)
            </div>
            <div className="mt-2 sm:mt-0">
              मराठी (Default) • हिन्दी • English
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
