'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { QuickActionModal } from './QuickActionModal';
import { 
  LayoutDashboard, 
  Map, 
  Sprout, 
  IndianRupee, 
  CloudSun, 
  Droplet, 
  CheckSquare, 
  Users, 
  ShieldCheck, 
  Wrench, 
  TrendingUp, 
  Bot, 
  Settings, 
  Plus, 
  Menu, 
  X, 
  ChevronDown, 
  Bell,
  Home
} from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { currentFarm, farms, setCurrentFarmId, profile, role } = useFarm();
  const { t, language } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isFarmDropdownOpen, setIsFarmDropdownOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { href: '/farms', label: t('nav.farms'), icon: Map },
    { href: '/crops', label: t('nav.crops'), icon: Sprout },
    { href: '/finance', label: t('nav.finance'), icon: IndianRupee },
    { href: '/weather', label: t('nav.weather'), icon: CloudSun },
    { href: '/irrigation', label: t('nav.irrigation'), icon: Droplet },
    { href: '/tasks', label: t('nav.tasks'), icon: CheckSquare },
    { href: '/labour', label: t('nav.labour'), icon: Users },
    { href: '/inputs', label: t('nav.inputs'), icon: ShieldCheck },
    { href: '/machinery', label: t('nav.machinery'), icon: Wrench },
    { href: '/mandi', label: t('nav.mandi'), icon: TrendingUp },
    { href: '/ai-assistant', label: t('nav.ai_assistant'), icon: Bot, highlight: true },
    { href: '/settings', label: t('nav.settings'), icon: Settings }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf5]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-emerald-900 hover:bg-emerald-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-sm shadow-emerald-700/20">
                <Sprout className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-lg text-emerald-950 tracking-tight block">
                  {t('app_name')}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold block -mt-0.5">
                  SMART FARMER
                </span>
              </div>
            </Link>

            {/* Farm Selector (Desktop) */}
            <div className="hidden md:block relative ml-6">
              <button
                onClick={() => setIsFarmDropdownOpen(!isFarmDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 text-emerald-950 text-xs font-bold border border-emerald-200 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>{currentFarm.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
              </button>

              {isFarmDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black/5 z-50 py-1.5 border border-emerald-100">
                  <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t('nav.farms')}
                  </div>
                  {farms.map(f => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setCurrentFarmId(f.id);
                        setIsFarmDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                        f.id === currentFarm.id ? 'font-bold text-emerald-800 bg-emerald-50/60' : 'text-gray-700'
                      }`}
                    >
                      <span>{f.name}</span>
                      <span className="text-gray-400 text-[10px]">{f.total_area_acres} एकर</span>
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      href="/farms"
                      onClick={() => setIsFarmDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-xs text-emerald-700 font-semibold hover:bg-emerald-50"
                    >
                      + {t('farms.add_farm')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Action (+) Button */}
            <button
              onClick={() => setIsQuickActionOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-700/20 transition-all hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.quick_actions')}</span>
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Profile Avatar & Role Badge */}
            <Link
              href="/settings"
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-emerald-50 transition-colors ml-1"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-300">
                {profile.full_name ? profile.full_name.slice(0, 1) : 'श'}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-gray-800 leading-none">{profile.full_name.split(' ')[0]}</div>
                <div className="text-[10px] text-emerald-700 font-medium capitalize mt-0.5">
                  {t(`roles.${role}`)}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-1 bg-white p-3 rounded-2xl border border-emerald-100/80 shadow-xs">
            <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              {t('nav.dashboard')}
            </div>

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20 font-bold'
                      : item.highlight
                      ? 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/60'
                      : 'text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-700' : 'text-emerald-600'}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-200 text-amber-900">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Dynamic Page Content */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Menu Drawer (Side overlay) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col z-10">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="font-bold text-emerald-950">{t('app_name')}</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-4 space-y-1 flex-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 font-semibold hover:text-emerald-700"
              >
                <Home className="w-4 h-4" />
                <span>{t('landing.hero_title')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Thumb Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 px-3 py-1.5 shadow-lg flex items-center justify-around">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[11px] font-semibold ${
            pathname === '/dashboard' ? 'text-emerald-700 font-bold' : 'text-gray-500 hover:text-emerald-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>{t('nav.dashboard')}</span>
        </Link>

        <Link
          href="/crops"
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[11px] font-semibold ${
            pathname === '/crops' ? 'text-emerald-700 font-bold' : 'text-gray-500 hover:text-emerald-800'
          }`}
        >
          <Sprout className="w-5 h-5" />
          <span>{t('nav.crops')}</span>
        </Link>

        {/* Center Floating Plus Action */}
        <button
          onClick={() => setIsQuickActionOpen(true)}
          className="w-12 h-12 rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/30 -mt-5 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          title="जलद नोंद"
        >
          <Plus className="w-6 h-6" />
        </button>

        <Link
          href="/finance"
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[11px] font-semibold ${
            pathname === '/finance' ? 'text-emerald-700 font-bold' : 'text-gray-500 hover:text-emerald-800'
          }`}
        >
          <IndianRupee className="w-5 h-5" />
          <span>{t('nav.finance')}</span>
        </Link>

        <Link
          href="/ai-assistant"
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[11px] font-semibold relative ${
            pathname === '/ai-assistant' ? 'text-emerald-700 font-bold' : 'text-gray-500 hover:text-emerald-800'
          }`}
        >
          <Bot className="w-5 h-5 text-emerald-700" />
          <span>{t('nav.ai_assistant')}</span>
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-400"></span>
        </Link>
      </div>

      {/* Global Quick Action Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
      />
    </div>
  );
};
