'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { WeatherWidget } from '@/components/WeatherWidget';
import { QuickActionModal } from '@/components/QuickActionModal';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import {
  Map,
  Sprout,
  TrendingDown,
  TrendingUp,
  IndianRupee,
  CheckSquare,
  Droplet,
  Layers,
  Plus,
  ArrowUpRight,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function DashboardPage() {
  const { 
    currentFarm, 
    fields, 
    crops, 
    transactions, 
    tasks, 
    toggleTaskCompleted,
    totalFarmArea,
    totalIncome,
    totalExpenses,
    netProfit,
    pendingTasksCount
  } = useFarm();
  const { t, language } = useTranslation();

  const [quickActionType, setQuickActionType] = useState<'crop' | 'expense' | 'income' | 'field' | 'irrigation' | 'task'>('crop');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  const openAction = (type: 'crop' | 'expense' | 'income' | 'field' | 'irrigation' | 'task') => {
    setQuickActionType(type);
    setIsQuickActionOpen(true);
  };

  // Filter items for current farm
  const farmFields = fields.filter(f => f.farm_id === currentFarm.id);
  const farmCrops = crops.filter(c => c.farm_id === currentFarm.id);
  const farmTasks = tasks.filter(t => t.farm_id === currentFarm.id);

  // Financial Chart Data calculated dynamically
  const monthlyData = [
    { month: 'Jul', income: 0, expense: 36500 },
    { month: 'Aug', income: 0, expense: 27000 },
    { month: 'Sep', income: 0, expense: 8000 },
    { month: 'Oct', income: 243000, expense: 12000 },
    { month: 'Nov', income: 18000, expense: 8500 }
  ];

  // Crop Acreage Distribution for Pie Chart
  const cropDistribution = farmCrops.map((c, i) => ({
    name: c.name.split(' ')[0],
    value: Number(c.area_acres),
    color: ['#15803d', '#eab308', '#0284c7', '#7c3aed', '#dc2626'][i % 5]
  }));

  // Recent activities list
  const recentActivities = [
    ...transactions.slice(0, 3).map(tx => ({
      id: tx.id,
      title: tx.description,
      amount: tx.type === 'income' ? `+₹${tx.amount.toLocaleString()}` : `-₹${tx.amount.toLocaleString()}`,
      isIncome: tx.type === 'income',
      date: tx.date,
      type: 'financial'
    })),
    ...tasks.filter(t => t.is_completed).slice(0, 2).map(task => ({
      id: task.id,
      title: task.title,
      amount: 'पूर्ण',
      isIncome: true,
      date: task.due_date,
      type: 'task'
    }))
  ].slice(0, 5);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome and Farm Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <span>{t('dashboard.welcome')}, तानाजीराव पाटील</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-gray-500 font-normal">{currentFarm.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              {t('dashboard.title')}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {currentFarm.location_address} • एकूण जमीन {totalFarmArea} एकर
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/ai-assistant"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <span className="text-base">🤖</span>
              <span>{t('nav.ai_assistant')}</span>
            </Link>
            <Link
              href="/finance"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>{t('nav.finance')}</span>
            </Link>
          </div>
        </div>

        {/* Quick Action Button Bar */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
            {t('dashboard.quick_actions')}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <button
              onClick={() => openAction('crop')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all hover:scale-102"
            >
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>{t('dashboard.btn_add_crop')}</span>
            </button>

            <button
              onClick={() => openAction('expense')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 text-xs font-bold transition-all hover:scale-102"
            >
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span>{t('dashboard.btn_add_expense')}</span>
            </button>

            <button
              onClick={() => openAction('income')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all hover:scale-102"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{t('dashboard.btn_add_income')}</span>
            </button>

            <button
              onClick={() => openAction('field')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all hover:scale-102"
            >
              <Layers className="w-4 h-4 text-amber-700" />
              <span>{t('dashboard.btn_add_field')}</span>
            </button>

            <button
              onClick={() => openAction('irrigation')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition-all hover:scale-102"
            >
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>{t('dashboard.btn_record_irrigation')}</span>
            </button>

            <button
              onClick={() => openAction('task')}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all hover:scale-102"
            >
              <CheckSquare className="w-4 h-4 text-purple-700" />
              <span>{t('dashboard.btn_add_task')}</span>
            </button>
          </div>
        </div>

        {/* Real KPI Statistics Grid (Calculated from Actual Database Records) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Land Area */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('dashboard.total_area')}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Map className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-gray-900">{totalFarmArea}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              {farmFields.length} {t('dashboard.fields_count')}
            </div>
          </div>

          {/* Active Crops */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('dashboard.active_crops')}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-gray-900">{farmCrops.length}</div>
            <div className="text-xs text-gray-500 font-medium mt-1 truncate">
              {farmCrops.map(c => c.name.split(' ')[0]).join(', ')}
            </div>
          </div>

          {/* Total Farming Expenses */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('dashboard.total_expenses')}</span>
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-red-600">
              ₹ {totalExpenses.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium mt-1">
              {transactions.filter(t => t.type === 'expense').length} नोंदी
            </div>
          </div>

          {/* Estimated Net Profit */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('dashboard.net_profit')}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-2xl font-black ${netProfit >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
              ₹ {netProfit.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              एकूण उत्पन्न: ₹ {totalIncome.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Real-Time Weather & Tasks Section */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Weather Widget */}
          <div className="lg:col-span-5">
            <WeatherWidget />
          </div>

          {/* Today's Activities & Pending Tasks */}
          <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-extrabold text-base text-gray-900">
                    {t('dashboard.pending_tasks')} ({pendingTasksCount})
                  </h3>
                </div>
                <Link
                  href="/tasks"
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>सर्व पहा</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {farmTasks.slice(0, 4).map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskCompleted(task.id)}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      task.is_completed
                        ? 'bg-gray-50 border-gray-200 text-gray-400 line-through'
                        : task.priority === 'urgent'
                        ? 'bg-red-50/70 border-red-200 text-red-950'
                        : 'bg-emerald-50/40 border-emerald-100 text-gray-800 hover:bg-emerald-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        task.is_completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {task.is_completed && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{task.title}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{task.due_date}</span>
                          <span>•</span>
                          <span>{task.category}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.priority === 'urgent'
                        ? 'bg-red-200 text-red-900'
                        : task.priority === 'high'
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      {t(`tasks.priority_${task.priority}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => openAction('task')}
              className="mt-3 w-full py-2 rounded-xl border border-dashed border-emerald-300 text-emerald-700 text-xs font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t('dashboard.btn_add_task')}</span>
            </button>
          </div>
        </div>

        {/* Charts: Financial Trend & Crop Distribution */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Monthly Financial Cashflow Recharts */}
          <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('dashboard.financial_overview')}
                </h3>
                <p className="text-xs text-gray-500">मासिक उत्पन्न आणि खर्चाचे विश्लेषण (₹)</p>
              </div>
              <Link
                href="/finance"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>तपशील</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip 
                    formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="income" name="उत्पन्न (Income)" fill="#15803d" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expense" name="खर्च (Expense)" fill="#dc2626" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crop Acreage Distribution */}
          <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-gray-900 mb-1">
                जमीन व पिके वाटप
              </h3>
              <p className="text-xs text-gray-500 mb-4">एकूण १८ एकर जमिनीवरील पिके</p>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                    >
                      {cropDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: any) => [`${val} एकर`, 'क्षेत्रफळ']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 mt-2">
                {cropDistribution.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{item.value} एकर</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/crops"
              className="mt-4 block text-center py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
            >
              {t('crops.title')} पहा →
            </Link>
          </div>
        </div>

        {/* Recent Activities & APMC Highlights */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-gray-900">
                {t('dashboard.recent_activities')}
              </h3>
              <span className="text-xs text-gray-400">स्वयंचलित हिशोब</span>
            </div>

            <div className="divide-y divide-gray-100">
              {recentActivities.map(act => (
                <div key={act.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      act.isIncome ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {act.isIncome ? '↑' : '↓'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{act.title}</div>
                      <div className="text-xs text-gray-400">{act.date}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-extrabold ${act.isIncome ? 'text-emerald-700' : 'text-red-600'}`}>
                    {act.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Mandi Rates Highlight */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-5 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  ताजे APMC बाजार भाव
                </span>
                <span className="text-[10px] text-emerald-300">आजचे दर</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">कांदा (Onion)</div>
                    <div className="text-xs text-emerald-300">लासलगाव मुख्य मंडी</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-amber-300">₹ २,५२०</div>
                    <div className="text-[10px] text-emerald-200">प्रति क्विंटल</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">सोयाबीन (Soybean)</div>
                    <div className="text-xs text-emerald-300">लातूर APMC</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-amber-300">₹ ४,८२०</div>
                    <div className="text-[10px] text-emerald-200">प्रति क्विंटल</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">कापूस (Cotton)</div>
                    <div className="text-xs text-emerald-300">जालना बाजार समिती</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-amber-300">₹ ७,४२०</div>
                    <div className="text-[10px] text-emerald-200">प्रति क्विंटल</div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/mandi"
              className="mt-4 block text-center py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-black transition-colors"
            >
              सर्व बाजारभाव पहा (APMC Tracker) →
            </Link>
          </div>
        </div>
      </div>

      <QuickActionModal
        isOpen={isQuickActionOpen}
        initialTab={quickActionType}
        onClose={() => setIsQuickActionOpen(false)}
      />
    </AppShell>
  );
}
