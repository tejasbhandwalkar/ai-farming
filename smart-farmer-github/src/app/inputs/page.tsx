'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { AgriculturalInput } from '@/lib/types';
import { 
  ShieldCheck, 
  Plus, 
  AlertTriangle, 
  Calendar, 
  Sprout, 
  Layers, 
  X, 
  CheckCircle,
  FileText
} from 'lucide-react';

export default function InputsPage() {
  const { currentFarm, fields, crops, inputs, addInput } = useFarm();
  const { t, language } = useTranslation();

  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('खत (Fertilizer)');
  const [cropId, setCropId] = useState(crops[0]?.id || '');
  const [fieldId, setFieldId] = useState(fields[0]?.id || '');
  const [date, setDate] = useState('2026-11-06');
  const [quantity, setQuantity] = useState('');
  const [method, setMethod] = useState('ठिबक सिंचनाद्वारे (Fertigation)');
  const [notes, setNotes] = useState('');

  const currentInputs = inputs.filter(i => i.farm_id === currentFarm.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !quantity) return;
    addInput({
      farm_id: currentFarm.id,
      field_id: fieldId || undefined,
      crop_id: cropId || undefined,
      product_name: productName,
      category,
      application_date: date,
      quantity_used: quantity,
      method,
      notes
    });
    setIsAddOpen(false);
    setProductName('');
    setQuantity('');
    setNotes('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('inputs.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              खते आणि पीक संरक्षण नोंदवही
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              रासायनिक व सेंद्रिय खते, कीटकनाशक फवारणी आणि अधिकृत सुरक्षितता नियम
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('inputs.add_input')}</span>
          </button>
        </div>

        {/* Official Safety Guidance Banner (MANDATORY REQUIREMENT) */}
        <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-300 text-amber-950 space-y-2 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <h3 className="font-extrabold text-sm text-amber-900">
              {t('inputs.safety_guideline_title')}
            </h3>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            {t('inputs.safety_guideline_desc')}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-bold text-amber-900">
            <span className="px-2.5 py-1 rounded-lg bg-amber-200/70">✓ मास्क आणि हातमोजे अनिवार्य</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-200/70">✓ शांत हवेतच फवारणी करा</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-200/70">✓ रिकामे डबे जमिनीत गाडून नष्ट करा</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-200/70">✓ लेबलवरील शिफारसीत प्रमाणच वापरा</span>
          </div>
        </div>

        {/* Inputs Log Table */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-emerald-950">
              वापरलेल्या निविष्ठांचा इतिहास (Application History)
            </h3>
            <span className="text-xs text-emerald-800 font-bold">{currentInputs.length} नोंदी</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 font-bold text-xs uppercase border-b border-gray-100">
                <tr>
                  <th className="p-4">{t('inputs.application_date')}</th>
                  <th className="p-4">{t('inputs.product_name')}</th>
                  <th className="p-4">{t('inputs.product_type')}</th>
                  <th className="p-4">{t('inputs.crop')}</th>
                  <th className="p-4">{t('inputs.quantity')}</th>
                  <th className="p-4">वापराची पद्धत</th>
                  <th className="p-4">नोंद</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentInputs.map(inp => {
                  const crop = crops.find(c => c.id === inp.crop_id);
                  const field = fields.find(f => f.id === inp.field_id);

                  return (
                    <tr key={inp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-xs font-bold text-gray-900 whitespace-nowrap">{inp.application_date}</td>
                      <td className="p-4 font-bold text-emerald-950">{inp.product_name}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {inp.category}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-semibold text-gray-800">{crop?.name || field?.name || '-'}</td>
                      <td className="p-4 text-xs font-black text-gray-900">{inp.quantity_used}</td>
                      <td className="p-4 text-xs text-gray-600">{inp.method || '-'}</td>
                      <td className="p-4 text-xs text-gray-500">{inp.notes || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Input Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('inputs.add_input')}
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('inputs.product_name')} *</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="उदा. १९:१९:१९ विद्राव्य खत, साफ बुरशीनाशक, निमार्क"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('inputs.product_type')}</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="खत (Fertilizer)">खत (Fertilizer)</option>
                      <option value="बुरशीनाशक (Fungicide)">बुरशीनाशक (Fungicide)</option>
                      <option value="कीटकनाशक (Pesticide)">कीटकनाशक (Pesticide)</option>
                      <option value="सेंद्रिय निविष्ठा (Organic)">सेंद्रिय निविष्ठा (Organic)</option>
                      <option value="सूक्ष्मअन्नद्रव्ये (Micronutrients)">सूक्ष्मअन्नद्रव्ये (Micronutrients)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('inputs.quantity')} *</label>
                    <input
                      type="text"
                      required
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      placeholder="उदा. २ ग्रॅम/लिटर किंवा ५ किलो/एकर"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('inputs.crop')}</label>
                    <select
                      value={cropId}
                      onChange={e => setCropId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      {crops.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('inputs.application_date')}</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">वापराची पद्धत</label>
                  <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    <option value="नॅपसॅक पंपाने फवारणी">नॅपसॅक पंपाने फवारणी (Foliar Spray)</option>
                    <option value="ठिबक सिंचनाद्वारे (Fertigation)">ठिबक सिंचनाद्वारे (Fertigation)</option>
                    <option value="जमिनीत मिसळून (Basal Dose)">जमिनीत मिसळून (Basal Dose)</option>
                    <option value="आळवणी (Drenching)">आळवणी (Drenching)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">टिप्पणी / परिणाम</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="उदा. पांढऱ्या माशीचे नियंत्रण झाले, वाढ जोमदार झाली"
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
