'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { IrrigationLog, IrrigationType } from '@/lib/types';
import { 
  Droplet, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Layers, 
  Activity 
} from 'lucide-react';

export default function IrrigationPage() {
  const { currentFarm, fields, irrigationLogs, addIrrigationLog } = useFarm();
  const { t, language } = useTranslation();

  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [fieldId, setFieldId] = useState(fields[0]?.id || '');
  const [date, setDate] = useState('2026-11-06');
  const [duration, setDuration] = useState('180');
  const [method, setMethod] = useState<IrrigationType>('drip');
  const [waterLiters, setWaterLiters] = useState('15000');
  const [nextSchedule, setNextSchedule] = useState('');
  const [notes, setNotes] = useState('');

  const currentLogs = irrigationLogs.filter(log => log.farm_id === currentFarm.id);
  const totalWaterUsed = currentLogs.reduce((sum, l) => sum + Number(l.water_liters || 0), 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addIrrigationLog({
      farm_id: currentFarm.id,
      field_id: fieldId || fields[0]?.id || 'field-01',
      date,
      duration_minutes: Number(duration),
      method,
      water_liters: Number(waterLiters),
      next_scheduled_date: nextSchedule || undefined,
      notes
    });
    setIsAddOpen(false);
    setNotes('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Droplet className="w-4 h-4" />
              <span>{t('irrigation.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              सिंचन ट्रॅकिंग व जल व्यवस्थापन
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              ठिबक, तुषार आणि पाट पाण्याचे अचूक नियोजन व पाण्याचे संवर्धन
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('irrigation.record_irrigation')}</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">एकूण सिंचन नोंदी</span>
            <div className="text-2xl font-black text-emerald-950 mt-1">{currentLogs.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">नियमित पाण्याचे वेळापत्रक</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">अंदाजे पाणी वापर</span>
            <div className="text-2xl font-black text-blue-600 mt-1">
              {(totalWaterUsed / 1000).toFixed(1)}k लिटर
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-0.5">ठिबकमुळे ४०% पाण्याची बचत</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">पुढील नियोजित पाणी</span>
            <div className="text-xl font-black text-amber-700 mt-1">०८ नोव्हेंबर २०२६</div>
            <div className="text-xs text-gray-500 mt-0.5">Field 4 (कांदा तुषार संच)</div>
          </div>
        </div>

        {/* Field Irrigation Status Cards */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <h3 className="font-extrabold text-base text-gray-900 mb-4">
            तुकडानिहाय सिंचन पद्धती (Field-wise Irrigation Status)
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fields.filter(f => f.farm_id === currentFarm.id).map(field => {
              const lastIrr = currentLogs.find(l => l.field_id === field.id);
              return (
                <div key={field.id} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">{field.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {t(`farms.${field.irrigation_type}`)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    क्षेत्र: <strong>{field.area_acres} एकर</strong>
                  </div>
                  <div className="text-xs text-emerald-800 font-medium pt-1 border-t border-emerald-200/50">
                    शेवटचे पाणी: {lastIrr ? lastIrr.date : 'नुकतेच दिलेले'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Irrigation History Table */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-emerald-950">
              {t('irrigation.history')} (पाणी भरल्याच्या नोंदी)
            </h3>
            <span className="text-xs text-emerald-800">{currentLogs.length} नोंदी</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 font-bold text-xs uppercase border-b border-gray-100">
                <tr>
                  <th className="p-4">{t('irrigation.date')}</th>
                  <th className="p-4">{t('irrigation.field')}</th>
                  <th className="p-4">{t('irrigation.method')}</th>
                  <th className="p-4">{t('irrigation.duration')}</th>
                  <th className="p-4">{t('irrigation.water_liters')}</th>
                  <th className="p-4">पुढील वेळ</th>
                  <th className="p-4">नोंद</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentLogs.map(log => {
                  const field = fields.find(f => f.id === log.field_id);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-xs font-bold text-gray-900 whitespace-nowrap">{log.date}</td>
                      <td className="p-4 font-semibold text-emerald-900">{field?.name || '-'}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                          {t(`farms.${log.method}`)}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-gray-700 font-medium">{log.duration_minutes} मिनिटे ({Math.round(log.duration_minutes / 60)} तास)</td>
                      <td className="p-4 text-xs font-bold text-gray-900">{log.water_liters ? `${log.water_liters.toLocaleString()} L` : '-'}</td>
                      <td className="p-4 text-xs text-amber-700 font-semibold">{log.next_scheduled_date || '-'}</td>
                      <td className="p-4 text-xs text-gray-500">{log.notes || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Irrigation Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('irrigation.record_irrigation')}
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('irrigation.field')}</label>
                  <select
                    value={fieldId}
                    onChange={e => setFieldId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    {fields.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.area_acres} एकर)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('irrigation.date')}</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('irrigation.method')}</label>
                    <select
                      value={method}
                      onChange={e => setMethod(e.target.value as IrrigationType)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="drip">{t('farms.drip')}</option>
                      <option value="sprinkler">{t('farms.sprinkler')}</option>
                      <option value="flood">{t('farms.flood')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">वेळ (Duration in Min)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      placeholder="उदा. १८०"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">अंदाजे लिटर (Liters)</label>
                    <input
                      type="number"
                      value={waterLiters}
                      onChange={e => setWaterLiters(e.target.value)}
                      placeholder="उदा. १५०००"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पुढील सिंचनाची तारीख (Next Schedule)</label>
                  <input
                    type="date"
                    value={nextSchedule}
                    onChange={e => setNextSchedule(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">टिप्पणी (Notes)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="उदा. खताचा डोस व्हेंचुरीने दिला, दाबाचे प्रमाण योग्य"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
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
