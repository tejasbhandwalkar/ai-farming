'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { Machinery } from '@/lib/types';
import { 
  Wrench, 
  Plus, 
  Calendar, 
  Fuel, 
  IndianRupee, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  X,
  Gauge
} from 'lucide-react';

export default function MachineryPage() {
  const { currentFarm, machinery, addMachinery } = useFarm();
  const { t, language } = useTranslation();

  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [type, setType] = useState('ट्रॅक्टर (Tractor)');
  const [model, setModel] = useState('');
  const [purchaseYear, setPurchaseYear] = useState('2022');
  const [purchasePrice, setPurchasePrice] = useState('650000');
  const [maintenanceStatus, setMaintenanceStatus] = useState('उत्कृष्ट कार्यरत स्थिती (Good Condition)');
  const [lastServiceDate, setLastServiceDate] = useState('2026-11-06');
  const [fuelExpenses, setFuelExpenses] = useState('8500');

  const currentMachinery = machinery.filter(m => m.farm_id === currentFarm.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addMachinery({
      farm_id: currentFarm.id,
      name,
      type,
      model: model || 'Standard Agricultural Model',
      purchase_year: Number(purchaseYear) || 2022,
      purchase_price: Number(purchasePrice) || 0,
      maintenance_status: maintenanceStatus,
      last_service_date: lastServiceDate,
      fuel_expenses: Number(fuelExpenses) || 0,
      rental_earnings: 0
    });
    setIsAddOpen(false);
    setName('');
    setModel('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Wrench className="w-4 h-4" />
              <span>{t('machinery.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              कृषी यंत्रसामग्री व अवजारे
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              ट्रॅक्टर, कृषी पंप, फवारणी यंत्रे, देखभाल नोंद, डिझेल खर्च आणि भाडे हिशोब
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('machinery.add_machine')}</span>
          </button>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMachinery.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                    ⚙️
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.model}</p>
                </div>

                <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span>खरेदी वर्ष व किंमत:</span>
                    <strong className="text-gray-900">{item.purchase_year} • ₹ {item.purchase_price.toLocaleString()}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>शेवटची सर्व्हिसिंग:</span>
                    <strong className="text-emerald-800">{item.last_service_date}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>इंधन / डिझेल खर्च:</span>
                    <strong className="text-red-600">₹ {item.fuel_expenses.toLocaleString()}</strong>
                  </div>
                  {item.rental_earnings ? (
                    <div className="flex items-center justify-between">
                      <span>भाडे कमाई (Rental):</span>
                      <strong className="text-emerald-700">+₹ {item.rental_earnings.toLocaleString()}</strong>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-medium text-gray-500">स्थिती:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{item.maintenance_status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Machine Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('machinery.add_machine')}
                </h3>
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('machinery.machine_name')} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="उदा. महिंद्रा ५७५ डीआय, किर्लोस्कर बोरवेल पंप"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('machinery.type')}</label>
                    <select
                      value={type}
                      onChange={e => setType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="ट्रॅक्टर (Tractor)">ट्रॅक्टर (Tractor)</option>
                      <option value="कृषी पंप (Water Pump)">कृषी पंप (Water Pump)</option>
                      <option value="फवारणी यंत्र (Sprayer)">फवारणी यंत्र (Sprayer)</option>
                      <option value="रोटाव्हेटर / कल्टीव्हेटर">रोटाव्हेटर / कल्टीव्हेटर</option>
                      <option value="हार्वेस्टर (Harvester)">हार्वेस्टर (Harvester)</option>
                      <option value="इतर अवजारे">इतर अवजारे</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">मॉडेल / तपशील</label>
                    <input
                      type="text"
                      value={model}
                      onChange={e => setModel(e.target.value)}
                      placeholder="उदा. 45 HP 4WD"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('machinery.purchase_year')}</label>
                    <input
                      type="number"
                      value={purchaseYear}
                      onChange={e => setPurchaseYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">खरेदी किंमत (₹)</label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={e => setPurchasePrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('machinery.last_service')}</label>
                    <input
                      type="date"
                      value={lastServiceDate}
                      onChange={e => setLastServiceDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('machinery.fuel_expenses')} (₹)</label>
                    <input
                      type="number"
                      value={fuelExpenses}
                      onChange={e => setFuelExpenses(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
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
