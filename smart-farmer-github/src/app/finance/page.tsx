'use client';

import React, { useState, useMemo } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { Transaction, TransactionType } from '@/lib/types';
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download, 
  Printer, 
  Filter, 
  Trash2, 
  Calendar, 
  Check, 
  X,
  PieChart as PieIcon,
  BarChart3
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

export default function FinancePage() {
  const { currentFarm, crops, fields, transactions, addTransaction, deleteTransaction, totalIncome, totalExpenses, netProfit } = useFarm();
  const { t, language } = useTranslation();

  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('fertilizers');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('2026-11-06');
  const [description, setDescription] = useState('');
  const [cropId, setCropId] = useState(crops[0]?.id || '');
  const [paymentMode, setPaymentMode] = useState('UPI');

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (filterType !== 'all' && tx.type !== filterType) return false;
      if (filterCrop !== 'all' && tx.crop_id !== filterCrop) return false;
      if (filterCategory !== 'all' && tx.category !== filterCategory) return false;
      return true;
    });
  }, [transactions, filterType, filterCrop, filterCategory]);

  // Expenses breakdown by category
  const expenseByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + Number(t.amount);
      });
    return Object.entries(map).map(([key, value], idx) => ({
      name: t(`finance.categories.${key}`, key),
      value,
      color: ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#16a34a', '#0284c7', '#7c3aed', '#db2777'][idx % 8]
    }));
  }, [transactions, t]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Type', 'Category', 'Amount (INR)', 'Date', 'Description', 'Payment Mode'];
    const rows = filteredTransactions.map(tx => [
      tx.id,
      tx.type,
      tx.category,
      tx.amount,
      tx.date,
      `"${tx.description.replace(/"/g, '""')}"`,
      tx.payment_mode || 'Cash'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SmartFarmer_Finance_${currentFarm.name}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    addTransaction({
      farm_id: currentFarm.id,
      crop_id: cropId || undefined,
      type,
      category,
      amount: Number(amount),
      date,
      description: description || t(`finance.categories.${category}`),
      payment_mode: paymentMode
    });
    setIsAddOpen(false);
    setAmount('');
    setDescription('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs no-print">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <IndianRupee className="w-4 h-4" />
              <span>{t('finance.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              शेती हिशोब व नफा-तोटा विश्लेषण
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              खर्च, उत्पन्न आणि निव्वळ नफ्याची अचूक संगणकीय आकडेमोड
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all shadow-xs"
              title="CSV डाउनलोड करा"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">{t('finance.export_csv')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all shadow-xs"
              title="अहवाल प्रिंट करा"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">{t('finance.print_report')}</span>
            </button>

            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t('finance.add_transaction')}</span>
            </button>
          </div>
        </div>

        {/* Real KPI Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Income */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('finance.income')}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-700">
              ₹ {totalIncome.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium mt-1">
              एकूण {transactions.filter(t => t.type === 'income').length} विक्री व्यवहार
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('finance.expense')}</span>
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-red-600">
              ₹ {totalExpenses.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium mt-1">
              बियाणे, खते, मजुरी, डिझेल व इतर खर्च
            </div>
          </div>

          {/* Net Profit */}
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('finance.net_profit')}</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-3xl font-black ${netProfit >= 0 ? 'text-emerald-800' : 'text-red-600'}`}>
              ₹ {netProfit.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              नफा प्रमाण: {totalIncome > 0 ? `${Math.round((netProfit / totalIncome) * 100)}%` : '०%'}
            </div>
          </div>
        </div>

        {/* Expense Category Breakdown Chart */}
        <div className="grid lg:grid-cols-12 gap-6 no-print">
          <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <h3 className="font-extrabold text-base text-gray-900 mb-1">
              खर्च प्रवर्ग विश्लेषण (Expense Categories)
            </h3>
            <p className="text-xs text-gray-500 mb-4">कशावर किती खर्च झाला ते तपासा</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {expenseByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'रक्कम']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Expense Breakdown List */}
          <div className="lg:col-span-6 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-gray-900 mb-1">
                मोठे खर्च (Expense Items)
              </h3>
              <p className="text-xs text-gray-500 mb-4">रक्कमनिहाय उतरता क्रम</p>

              <div className="space-y-2.5">
                {expenseByCategory.slice(0, 5).map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs p-2 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span className="font-bold text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-extrabold text-gray-900">₹ {item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
              <span>एकूण खर्च:</span>
              <strong className="text-red-600">₹ {totalExpenses.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>फिल्टर:</span>
            </span>

            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'all' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              सर्व ({transactions.length})
            </button>

            <button
              onClick={() => setFilterType('income')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'income' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              उत्पन्न (Income)
            </button>

            <button
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              खर्च (Expense)
            </button>

            {/* Filter by Crop */}
            <select
              value={filterCrop}
              onChange={e => setFilterCrop(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium bg-white"
            >
              <option value="all">सर्व पिके (All Crops)</option>
              {crops.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <span className="text-xs text-gray-500 font-medium">
            {filteredTransactions.length} नोंदी सापडल्या
          </span>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-emerald-50/70 text-emerald-950 font-bold text-xs uppercase border-b border-emerald-100">
                <tr>
                  <th className="p-4">{t('finance.date')}</th>
                  <th className="p-4">{t('finance.description')}</th>
                  <th className="p-4">{t('finance.category')}</th>
                  <th className="p-4">पीक / शेत</th>
                  <th className="p-4 text-right">{t('finance.amount')}</th>
                  <th className="p-4 text-right no-print">कृती</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map(tx => {
                  const crop = crops.find(c => c.id === tx.crop_id);
                  const isIncome = tx.type === 'income';

                  return (
                    <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 text-xs font-medium text-gray-600 whitespace-nowrap">{tx.date}</td>
                      <td className="p-4 font-bold text-gray-900">{tx.description}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isIncome ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {t(`finance.categories.${tx.category}`, tx.category)}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-gray-600">{crop ? crop.name.split(' ')[0] : '-'}</td>
                      <td className={`p-4 text-right font-black ${isIncome ? 'text-emerald-700' : 'text-red-600'}`}>
                        {isIncome ? '+' : '-'} ₹ {Number(tx.amount).toLocaleString()}
                      </td>
                      <td className="p-4 text-right no-print">
                        <button
                          onClick={() => {
                            if (confirm('ही नोंद कायमची हटवायची आहे का?')) deleteTransaction(tx.id);
                          }}
                          className="p-1 rounded-lg text-red-500 hover:bg-red-50"
                          title="हटवा"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Transaction Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('finance.add_transaction')}
                </h3>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTransaction} className="space-y-4">
                {/* Type Switcher */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => { setType('expense'); setCategory('fertilizers'); }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      type === 'expense' ? 'bg-red-600 text-white shadow-xs' : 'text-gray-700'
                    }`}
                  >
                    {t('finance.expense')} (खर्च)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setType('income'); setCategory('crop_sales'); }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      type === 'income' ? 'bg-emerald-700 text-white shadow-xs' : 'text-gray-700'
                    }`}
                  >
                    {t('finance.income')} (उत्पन्न)
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('finance.amount')} *</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-gray-500 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-base font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('finance.category')}</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      {type === 'expense' ? (
                        <>
                          <option value="seeds">{t('finance.categories.seeds')}</option>
                          <option value="fertilizers">{t('finance.categories.fertilizers')}</option>
                          <option value="pesticides">{t('finance.categories.pesticides')}</option>
                          <option value="labour">{t('finance.categories.labour')}</option>
                          <option value="tractor">{t('finance.categories.tractor')}</option>
                          <option value="diesel">{t('finance.categories.diesel')}</option>
                          <option value="electricity">{t('finance.categories.electricity')}</option>
                          <option value="irrigation">{t('finance.categories.irrigation')}</option>
                          <option value="machinery">{t('finance.categories.machinery')}</option>
                          <option value="transport">{t('finance.categories.transport')}</option>
                          <option value="other">{t('finance.categories.other')}</option>
                        </>
                      ) : (
                        <>
                          <option value="crop_sales">{t('finance.categories.crop_sales')}</option>
                          <option value="veg_sales">{t('finance.categories.veg_sales')}</option>
                          <option value="grain_sales">{t('finance.categories.grain_sales')}</option>
                          <option value="other">{t('finance.categories.other')}</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('finance.date')}</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('finance.description')} *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. १०:२६:२६ खताच्या गोण्या, लातूर APMC कांदा विक्री"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">संबंधित पीक (Crop)</label>
                    <select
                      value={cropId}
                      onChange={e => setCropId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="">सामान्य शेत खर्च</option>
                      {crops.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">पद्धत (Payment)</label>
                    <select
                      value={paymentMode}
                      onChange={e => setPaymentMode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="UPI">UPI (Google Pay / PhonePe)</option>
                      <option value="Cash">रोख (Cash)</option>
                      <option value="Bank Transfer">बँक ट्रान्सफर (NEFT/RTGS)</option>
                      <option value="Card">डेबिट/क्रेडिट कार्ड</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-50"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold"
                  >
                    {t('common.save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
