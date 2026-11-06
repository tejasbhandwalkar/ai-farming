'use client';

import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { 
  X, 
  Sprout, 
  TrendingDown, 
  TrendingUp, 
  Layers, 
  Droplet, 
  CheckSquare, 
  Plus 
} from 'lucide-react';
import { CropStage, CropHealth, IrrigationType, TaskPriority, SoilType } from '@/lib/types';

export const QuickActionModal: React.FC<{
  isOpen: boolean;
  initialTab?: 'crop' | 'expense' | 'income' | 'field' | 'irrigation' | 'task';
  onClose: () => void;
}> = ({ isOpen, initialTab = 'crop', onClose }) => {
  const { 
    currentFarm, 
    fields, 
    crops, 
    addCrop, 
    addTransaction, 
    addField, 
    addIrrigationLog, 
    addTask,
    workers
  } = useFarm();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<'crop' | 'expense' | 'income' | 'field' | 'irrigation' | 'task'>(initialTab);

  // Form states
  // Crop
  const [cropName, setCropName] = useState('');
  const [cropVariety, setCropVariety] = useState('');
  const [cropFieldId, setCropFieldId] = useState(fields[0]?.id || '');
  const [cropArea, setCropArea] = useState('2');
  const [cropSowingDate, setCropSowingDate] = useState('2026-11-06');
  const [cropHarvestDate, setCropHarvestDate] = useState('');
  const [cropStage, setCropStage] = useState<CropStage>('sowing');
  const [cropHealth, setCropHealth] = useState<CropHealth>('good');

  // Transaction
  const [txCategory, setTxCategory] = useState('fertilizers');
  const [txAmount, setTxAmount] = useState('');
  const [txDescription, setTxDescription] = useState('');
  const [txDate, setTxDate] = useState('2026-11-06');
  const [txCropId, setTxCropId] = useState(crops[0]?.id || '');

  // Field
  const [fieldName, setFieldName] = useState('');
  const [fieldArea, setFieldArea] = useState('3');
  const [fieldSoil, setFieldSoil] = useState<SoilType>('black_soil');
  const [fieldIrrigation, setFieldIrrigation] = useState<IrrigationType>('drip');

  // Irrigation
  const [irrFieldId, setIrrFieldId] = useState(fields[0]?.id || '');
  const [irrDuration, setIrrDuration] = useState('120');
  const [irrMethod, setIrrMethod] = useState<IrrigationType>('drip');
  const [irrDate, setIrrDate] = useState('2026-11-06');
  const [irrWaterLiters, setIrrWaterLiters] = useState('10000');

  // Task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('फवारणी / पीक संरक्षण');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('medium');
  const [taskDueDate, setTaskDueDate] = useState('2026-11-06');
  const [taskWorkerId, setTaskWorkerId] = useState(workers[0]?.id || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'crop') {
      if (!cropName) return;
      addCrop({
        farm_id: currentFarm.id,
        field_id: cropFieldId || fields[0]?.id || 'field-01',
        name: cropName,
        variety: cropVariety || 'सुधारित वाण',
        area_acres: Number(cropArea) || 1,
        sowing_date: cropSowingDate,
        expected_harvest_date: cropHarvestDate || cropSowingDate,
        growth_stage: cropStage,
        health_status: cropHealth,
        photo_url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
        notes: ''
      });
    } else if (activeTab === 'expense') {
      if (!txAmount) return;
      addTransaction({
        farm_id: currentFarm.id,
        field_id: cropFieldId,
        crop_id: txCropId,
        type: 'expense',
        category: txCategory,
        amount: Number(txAmount),
        date: txDate,
        description: txDescription || t(`finance.categories.${txCategory}`)
      });
    } else if (activeTab === 'income') {
      if (!txAmount) return;
      addTransaction({
        farm_id: currentFarm.id,
        crop_id: txCropId,
        type: 'income',
        category: txCategory === 'fertilizers' ? 'crop_sales' : txCategory,
        amount: Number(txAmount),
        date: txDate,
        description: txDescription || 'पीक विक्री उत्पन्न'
      });
    } else if (activeTab === 'field') {
      if (!fieldName) return;
      addField({
        farm_id: currentFarm.id,
        name: fieldName,
        area_acres: Number(fieldArea) || 1,
        soil_type: fieldSoil,
        irrigation_type: fieldIrrigation
      });
    } else if (activeTab === 'irrigation') {
      addIrrigationLog({
        farm_id: currentFarm.id,
        field_id: irrFieldId || fields[0]?.id || 'field-01',
        date: irrDate,
        duration_minutes: Number(irrDuration) || 60,
        method: irrMethod,
        water_liters: Number(irrWaterLiters) || 5000,
        notes: 'नियमित सिंचन'
      });
    } else if (activeTab === 'task') {
      if (!taskTitle) return;
      addTask({
        farm_id: currentFarm.id,
        title: taskTitle,
        description: taskDescription,
        category: taskCategory,
        due_date: taskDueDate,
        priority: taskPriority,
        assigned_worker_id: taskWorkerId,
        is_completed: false
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-emerald-100 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/80 flex items-center justify-center">
              <Plus className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base font-bold">{t('dashboard.quick_actions')}</h2>
              <p className="text-xs text-emerald-200">{currentFarm.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-6 gap-1 p-2 bg-emerald-50/70 border-b border-emerald-100 text-xs font-semibold text-center overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('crop')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeTab === 'crop' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span className="text-[11px] leading-tight">पीक</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('expense'); setTxCategory('fertilizers'); }}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeTab === 'expense' ? 'bg-red-600 text-white shadow-xs' : 'text-red-900 hover:bg-red-50'
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            <span className="text-[11px] leading-tight">खर्च</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('income'); setTxCategory('crop_sales'); }}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeTab === 'income' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-[11px] leading-tight">उत्पन्न</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('field')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeTab === 'field' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-900 hover:bg-amber-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[11px] leading-tight">तुकडा</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('irrigation')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeTab === 'irrigation' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-900 hover:bg-blue-50'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span className="text-[11px] leading-tight">सिंचन</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('task')}
            className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeTab === 'task' ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-900 hover:bg-purple-50'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span className="text-[11px] leading-tight">काम</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'crop' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.crop_name')} *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. सोयाबीन, कापूस, कांदा, ऊस"
                  value={cropName}
                  onChange={e => setCropName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.variety')}</label>
                  <input
                    type="text"
                    placeholder="उदा. फुले कल्याणी / भीमा सुपर"
                    value={cropVariety}
                    onChange={e => setCropVariety(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.cultivated_area')}</label>
                  <input
                    type="number"
                    step="0.5"
                    value={cropArea}
                    onChange={e => setCropArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.farm_and_field')}</label>
                <select
                  value={cropFieldId}
                  onChange={e => setCropFieldId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  {fields.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.area_acres} एकर)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.sowing_date')}</label>
                  <input
                    type="date"
                    value={cropSowingDate}
                    onChange={e => setCropSowingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.growth_stage')}</label>
                  <select
                    value={cropStage}
                    onChange={e => setCropStage(e.target.value as CropStage)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    <option value="sowing">{t('crops.stages.sowing')}</option>
                    <option value="germination">{t('crops.stages.germination')}</option>
                    <option value="growth">{t('crops.stages.growth')}</option>
                    <option value="flowering">{t('crops.stages.flowering')}</option>
                    <option value="harvesting">{t('crops.stages.harvesting')}</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {(activeTab === 'expense' || activeTab === 'income') && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('finance.amount')} *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-gray-500 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="0"
                    value={txAmount}
                    onChange={e => setTxAmount(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-base font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('finance.category')}</label>
                  <select
                    value={txCategory}
                    onChange={e => setTxCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    {activeTab === 'expense' ? (
                      <>
                        <option value="seeds">{t('finance.categories.seeds')}</option>
                        <option value="fertilizers">{t('finance.categories.fertilizers')}</option>
                        <option value="pesticides">{t('finance.categories.pesticides')}</option>
                        <option value="labour">{t('finance.categories.labour')}</option>
                        <option value="tractor">{t('finance.categories.tractor')}</option>
                        <option value="diesel">{t('finance.categories.diesel')}</option>
                        <option value="electricity">{t('finance.categories.electricity')}</option>
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
                    value={txDate}
                    onChange={e => setTxDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('finance.description')}</label>
                <input
                  type="text"
                  placeholder="उदा. ५ बॅग्स युरिया, लातूर APMC विक्री"
                  value={txDescription}
                  onChange={e => setTxDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </>
          )}

          {activeTab === 'field' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.field_name')} *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. विहिरीचे रान, बांधावरचा तुकडा"
                  value={fieldName}
                  onChange={e => setFieldName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.field_area')}</label>
                  <input
                    type="number"
                    step="0.5"
                    value={fieldArea}
                    onChange={e => setFieldArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.soil_type')}</label>
                  <select
                    value={fieldSoil}
                    onChange={e => setFieldSoil(e.target.value as SoilType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    <option value="black_soil">{t('farms.black_soil')}</option>
                    <option value="red_soil">{t('farms.red_soil')}</option>
                    <option value="loamy_soil">{t('farms.loamy_soil')}</option>
                    <option value="sandy_soil">{t('farms.sandy_soil')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.irrigation_type')}</label>
                <select
                  value={fieldIrrigation}
                  onChange={e => setFieldIrrigation(e.target.value as IrrigationType)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                >
                  <option value="drip">{t('farms.drip')}</option>
                  <option value="sprinkler">{t('farms.sprinkler')}</option>
                  <option value="flood">{t('farms.flood')}</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'irrigation' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('irrigation.field')}</label>
                <select
                  value={irrFieldId}
                  onChange={e => setIrrFieldId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                >
                  {fields.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.area_acres} एकर)</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('irrigation.method')}</label>
                  <select
                    value={irrMethod}
                    onChange={e => setIrrMethod(e.target.value as IrrigationType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    <option value="drip">{t('farms.drip')}</option>
                    <option value="sprinkler">{t('farms.sprinkler')}</option>
                    <option value="flood">{t('farms.flood')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('irrigation.duration')}</label>
                  <input
                    type="number"
                    value={irrDuration}
                    onChange={e => setIrrDuration(e.target.value)}
                    placeholder="उदा. १२० मिनिटे"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'task' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.task_title')} *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. उसाला खत देणे, कीटकनाशक फवारणी"
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.due_date')}</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={e => setTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.priority')}</label>
                  <select
                    value={taskPriority}
                    onChange={e => setTaskPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    <option value="urgent">{t('tasks.priority_urgent')}</option>
                    <option value="high">{t('tasks.priority_high')}</option>
                    <option value="medium">{t('tasks.priority_medium')}</option>
                    <option value="low">{t('tasks.priority_low')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.assigned_to')}</label>
                <select
                  value={taskWorkerId}
                  onChange={e => setTaskWorkerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                >
                  <option value="">स्वतः शेतकरी (Self)</option>
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.full_name} ({w.role})</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Action buttons */}
          <div className="pt-3 flex gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md shadow-emerald-700/20 transition-all"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
