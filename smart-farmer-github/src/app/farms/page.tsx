'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { Farm, Field, SoilType, IrrigationType } from '@/lib/types';
import { 
  Map, 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  MapPin, 
  Droplet, 
  Sprout, 
  AlertTriangle,
  X
} from 'lucide-react';

export default function FarmsPage() {
  const { 
    farms, 
    currentFarm, 
    setCurrentFarmId, 
    addFarm, 
    updateFarm, 
    deleteFarm, 
    fields, 
    addField, 
    updateField, 
    deleteField,
    crops
  } = useFarm();
  const { t } = useTranslation();

  // Modals state
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Farm Form State
  const [farmName, setFarmName] = useState('');
  const [farmArea, setFarmArea] = useState('18');
  const [farmLocation, setFarmLocation] = useState('बारामती, पुणे (Baramati, Pune)');
  const [farmSoil, setFarmSoil] = useState<SoilType>('black_soil');
  const [farmIrrigation, setFarmIrrigation] = useState<IrrigationType>('drip');

  // Field Form State
  const [fieldName, setFieldName] = useState('');
  const [fieldArea, setFieldArea] = useState('4');
  const [fieldSoil, setFieldSoil] = useState<SoilType>('black_soil');
  const [fieldIrrigation, setFieldIrrigation] = useState<IrrigationType>('drip');
  const [fieldNotes, setFieldNotes] = useState('');

  const currentFarmFields = fields.filter(f => f.farm_id === currentFarm.id);
  const totalFieldsAcreage = currentFarmFields.reduce((sum, f) => sum + Number(f.area_acres), 0);

  const handleSaveFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFarm) {
      updateFarm(editingFarm.id, {
        name: farmName,
        total_area_acres: Number(farmArea),
        location_address: farmLocation,
        soil_type: farmSoil,
        irrigation_type: farmIrrigation
      });
      setEditingFarm(null);
    } else {
      addFarm({
        name: farmName,
        total_area_acres: Number(farmArea),
        location_address: farmLocation,
        latitude: 18.1517,
        longitude: 74.5772,
        soil_type: farmSoil,
        irrigation_type: farmIrrigation
      });
      setIsAddFarmOpen(false);
    }
    setFarmName('');
  };

  const handleSaveField = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingField) {
      updateField(editingField.id, {
        name: fieldName,
        area_acres: Number(fieldArea),
        soil_type: fieldSoil,
        irrigation_type: fieldIrrigation,
        notes: fieldNotes
      });
      setEditingField(null);
    } else {
      addField({
        farm_id: currentFarm.id,
        name: fieldName,
        area_acres: Number(fieldArea),
        soil_type: fieldSoil,
        irrigation_type: fieldIrrigation,
        notes: fieldNotes
      });
      setIsAddFieldOpen(false);
    }
    setFieldName('');
    setFieldNotes('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Map className="w-4 h-4" />
              <span>{t('farms.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              {currentFarm.name}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {currentFarm.location_address} • एकूण जमीन: {totalFieldsAcreage} / {currentFarm.total_area_acres} एकर
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setFarmName('');
                setFarmArea('10');
                setIsAddFarmOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4 text-emerald-600" />
              <span>{t('farms.add_farm')}</span>
            </button>

            <button
              onClick={() => {
                setFieldName('');
                setFieldArea('3');
                setIsAddFieldOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t('farms.add_field')}</span>
            </button>
          </div>
        </div>

        {/* Multi-Farm Switcher Cards */}
        {farms.length > 1 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {farms.map(f => (
              <div
                key={f.id}
                onClick={() => setCurrentFarmId(f.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  f.id === currentFarm.id
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white border-emerald-100 text-gray-800 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{f.name}</span>
                  {f.id === currentFarm.id && <Check className="w-4 h-4 text-emerald-300" />}
                </div>
                <div className={`text-xs mt-1 ${f.id === currentFarm.id ? 'text-emerald-200' : 'text-gray-500'}`}>
                  {f.total_area_acres} एकर • {f.location_address}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visual Land Map / Layout representation */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-extrabold text-base text-gray-900">
                शेतातील तुकडे (Field Parcels Map)
              </h2>
              <p className="text-xs text-gray-500">
                एकूण {currentFarmFields.length} तुकडे • {totalFieldsAcreage} एकर लागवड क्षेत्र
              </p>
            </div>

            <button
              onClick={() => {
                setEditingFarm(currentFarm);
                setFarmName(currentFarm.name);
                setFarmArea(String(currentFarm.total_area_acres));
                setFarmLocation(currentFarm.location_address);
                setFarmSoil(currentFarm.soil_type);
                setFarmIrrigation(currentFarm.irrigation_type);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t('farms.edit')} शेत तपशील</span>
            </button>
          </div>

          {/* Visual parcels grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentFarmFields.map((field, idx) => {
              const activeCrop = crops.find(c => c.field_id === field.id);
              const colorHues = [
                'from-emerald-50 to-emerald-100/60 border-emerald-300',
                'from-amber-50 to-amber-100/60 border-amber-300',
                'from-sky-50 to-sky-100/60 border-sky-300',
                'from-purple-50 to-purple-100/60 border-purple-300'
              ];

              return (
                <div
                  key={field.id}
                  className={`rounded-3xl p-5 border-2 bg-gradient-to-br ${colorHues[idx % 4]} flex flex-col justify-between shadow-xs relative group`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-xl bg-white shadow-xs text-gray-800 font-extrabold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingField(field);
                            setFieldName(field.name);
                            setFieldArea(String(field.area_acres));
                            setFieldSoil(field.soil_type);
                            setFieldIrrigation(field.irrigation_type);
                            setFieldNotes(field.notes || '');
                          }}
                          className="p-1 rounded-lg hover:bg-white/80 text-gray-600 transition-colors"
                          title="बदला"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(field.id)}
                          className="p-1 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          title="हटवा"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-base text-gray-900 mt-3">
                      {field.name}
                    </h3>
                    <div className="text-2xl font-black text-emerald-950 mt-1">
                      {field.area_acres} <span className="text-sm font-semibold text-gray-600">{t('dashboard.acres')}</span>
                    </div>

                    <div className="mt-4 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="font-medium">माती:</span>
                        <span className="font-bold">{t(`farms.${field.soil_type}`)}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="font-medium">सिंचन:</span>
                        <span className="font-bold">{t(`farms.${field.irrigation_type}`)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Crop Pill */}
                  <div className="mt-5 pt-3 border-t border-black/10">
                    <span className="text-[11px] font-bold text-gray-500 block mb-1">
                      चालू पीक (Active Crop):
                    </span>
                    {activeCrop ? (
                      <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-xl border border-black/5 shadow-xs">
                        <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-xs font-bold text-gray-900">{activeCrop.name}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">सध्या रिकामे रान</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">तुकडा हटवायचा आहे का?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t('farms.delete_confirm')}
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={() => {
                    deleteField(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold"
                >
                  {t('farms.delete')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add / Edit Farm Modal */}
        {(isAddFarmOpen || editingFarm) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {editingFarm ? t('farms.edit') : t('farms.add_farm')}
                </h3>
                <button
                  onClick={() => { setIsAddFarmOpen(false); setEditingFarm(null); }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveFarm} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.farm_name')} *</label>
                  <input
                    type="text"
                    required
                    value={farmName}
                    onChange={e => setFarmName(e.target.value)}
                    placeholder="उदा. Family Farm / कौटुंबिक शेत"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.total_area')} *</label>
                    <input
                      type="number"
                      required
                      step="0.5"
                      value={farmArea}
                      onChange={e => setFarmArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.soil_type')}</label>
                    <select
                      value={farmSoil}
                      onChange={e => setFarmSoil(e.target.value as SoilType)}
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.location')}</label>
                  <input
                    type="text"
                    value={farmLocation}
                    onChange={e => setFarmLocation(e.target.value)}
                    placeholder="उदा. बारामती, जि. पुणे, महाराष्ट्र"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsAddFarmOpen(false); setEditingFarm(null); }}
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

        {/* Add / Edit Field Modal */}
        {(isAddFieldOpen || editingField) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {editingField ? t('farms.edit') : t('farms.add_field')}
                </h3>
                <button
                  onClick={() => { setIsAddFieldOpen(false); setEditingField(null); }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveField} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.field_name')} *</label>
                  <input
                    type="text"
                    required
                    value={fieldName}
                    onChange={e => setFieldName(e.target.value)}
                    placeholder="उदा. Field 5 (विहिरीचे रान)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('farms.field_area')} *</label>
                    <input
                      type="number"
                      required
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">नोंदी व वैशिष्ट्ये</label>
                  <input
                    type="text"
                    value={fieldNotes}
                    onChange={e => setFieldNotes(e.target.value)}
                    placeholder="उदा. ठिबक सिंचन जोडलेले, पाण्याचा चांगला निचरा"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsAddFieldOpen(false); setEditingField(null); }}
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
