'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { Crop, CropStage, CropHealth } from '@/lib/types';
import { 
  Sprout, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  HeartPulse, 
  X, 
  Grid, 
  List, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

export default function CropsPage() {
  const { currentFarm, fields, crops, addCrop, updateCrop, deleteCrop, inputs, irrigationLogs } = useFarm();
  const { t, language } = useTranslation();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [variety, setVariety] = useState('');
  const [fieldId, setFieldId] = useState(fields[0]?.id || '');
  const [area, setArea] = useState('4');
  const [sowingDate, setSowingDate] = useState('2026-07-01');
  const [harvestDate, setHarvestDate] = useState('2026-11-15');
  const [stage, setStage] = useState<CropStage>('growth');
  const [health, setHealth] = useState<CropHealth>('good');
  const [harvestedQty, setHarvestedQty] = useState('0');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');

  const currentCrops = crops.filter(c => c.farm_id === currentFarm.id);

  const stagesList: { id: CropStage; label: string; icon: string }[] = [
    { id: 'land_prep', label: t('crops.stages.land_prep'), icon: '🚜' },
    { id: 'sowing', label: t('crops.stages.sowing'), icon: '🌱' },
    { id: 'germination', label: t('crops.stages.germination'), icon: '🌿' },
    { id: 'growth', label: t('crops.stages.growth'), icon: '🌾' },
    { id: 'flowering', label: t('crops.stages.flowering'), icon: '🌸' },
    { id: 'harvesting', label: t('crops.stages.harvesting'), icon: '🌾' }
  ];

  const handleOpenAdd = () => {
    setName('');
    setVariety('');
    setFieldId(fields[0]?.id || '');
    setArea('3');
    setSowingDate(new Date().toISOString().split('T')[0]);
    setHarvestDate('');
    setStage('growth');
    setHealth('good');
    setHarvestedQty('0');
    setPhotoUrl('https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80');
    setNotes('');
    setIsAddOpen(true);
  };

  const handleOpenEdit = (crop: Crop) => {
    setEditingCrop(crop);
    setName(crop.name);
    setVariety(crop.variety);
    setFieldId(crop.field_id);
    setArea(String(crop.area_acres));
    setSowingDate(crop.sowing_date);
    setHarvestDate(crop.expected_harvest_date);
    setStage(crop.growth_stage);
    setHealth(crop.health_status);
    setHarvestedQty(String(crop.harvested_quantity_quintals || 0));
    setPhotoUrl(crop.photo_url || '');
    setNotes(crop.notes || '');
  };

  const handleSaveCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCrop) {
      updateCrop(editingCrop.id, {
        name,
        variety,
        field_id: fieldId,
        area_acres: Number(area),
        sowing_date: sowingDate,
        expected_harvest_date: harvestDate,
        growth_stage: stage,
        health_status: health,
        harvested_quantity_quintals: Number(harvestedQty),
        photo_url: photoUrl,
        notes
      });
      setEditingCrop(null);
    } else {
      addCrop({
        farm_id: currentFarm.id,
        field_id: fieldId || fields[0]?.id || 'field-01',
        name,
        variety: variety || 'सुधारित वाण',
        area_acres: Number(area),
        sowing_date: sowingDate,
        expected_harvest_date: harvestDate,
        growth_stage: stage,
        health_status: health,
        harvested_quantity_quintals: Number(harvestedQty),
        photo_url: photoUrl || 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
        notes
      });
      setIsAddOpen(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Sprout className="w-4 h-4" />
              <span>{t('crops.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              चालू पिके आणि जीवनचक्र (Active Crops)
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {currentCrops.length} पिके नोंदवलेली आहेत • पेरणी ते काढणीपर्यंत संपूर्ण ट्रॅकिंग
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="कार्ड व्ह्यू"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'table' ? 'bg-white text-emerald-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="टेबल व्ह्यू"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t('crops.add_crop')}</span>
            </button>
          </div>
        </div>

        {/* Crops Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCrops.map(crop => {
              const field = fields.find(f => f.id === crop.field_id);
              const cropInputs = inputs.filter(i => i.crop_id === crop.id);

              return (
                <div
                  key={crop.id}
                  className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Crop Top Banner & Photo */}
                    <div className="relative h-40 w-full overflow-hidden bg-emerald-900">
                      {crop.photo_url ? (
                        <img
                          src={crop.photo_url}
                          alt={crop.name}
                          className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-emerald-400">
                          <ImageIcon className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Health badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md bg-white/90 text-gray-900 shadow-xs">
                        <HeartPulse className={`w-3.5 h-3.5 ${
                          crop.health_status === 'excellent' ? 'text-emerald-600' :
                          crop.health_status === 'good' ? 'text-blue-600' :
                          crop.health_status === 'needs_attention' ? 'text-amber-600' : 'text-red-600'
                        }`} />
                        <span>{t(`crops.health.${crop.health_status}`)}</span>
                      </div>

                      {/* Crop Title on banner */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                          {field?.name || 'मुख्य शेत'} • {crop.area_acres} {t('dashboard.acres')}
                        </span>
                        <h3 className="text-xl font-extrabold">{crop.name}</h3>
                        <p className="text-xs text-gray-200">{crop.variety}</p>
                      </div>
                    </div>

                    {/* Crop Lifecycle Visual Stepper */}
                    <div className="p-5 border-b border-gray-100">
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                        {t('crops.growth_stage')}: <span className="text-emerald-700 font-extrabold">{t(`crops.stages.${crop.growth_stage}`)}</span>
                      </div>
                      <div className="grid grid-cols-6 gap-1 bg-emerald-50/60 p-2 rounded-2xl">
                        {stagesList.map((st, i) => {
                          const currentIndex = stagesList.findIndex(s => s.id === crop.growth_stage);
                          const isDone = i <= currentIndex;
                          const isCurrent = st.id === crop.growth_stage;

                          return (
                            <button
                              key={st.id}
                              onClick={() => updateCrop(crop.id, { growth_stage: st.id })}
                              className={`py-1.5 px-1 rounded-xl text-center transition-all ${
                                isCurrent
                                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                                  : isDone
                                  ? 'text-emerald-800 font-semibold'
                                  : 'text-gray-400 opacity-60'
                              }`}
                              title={st.label}
                            >
                              <div className="text-base">{st.icon}</div>
                              <div className="text-[9px] mt-0.5 truncate">{st.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sowing & Harvest Dates */}
                    <div className="p-5 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                          <span className="text-gray-400 block mb-0.5">{t('crops.sowing_date')}</span>
                          <span className="font-bold text-gray-800">{crop.sowing_date}</span>
                        </div>

                        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                          <span className="text-gray-400 block mb-0.5">{t('crops.harvest_date')}</span>
                          <span className="font-bold text-gray-800">{crop.expected_harvest_date || 'अंदाजे ३ महिने'}</span>
                        </div>
                      </div>

                      {crop.notes && (
                        <p className="text-xs text-gray-600 bg-amber-50/60 border border-amber-100/70 p-3 rounded-2xl">
                          <span className="font-bold text-amber-900">शेतातील नोंद:</span> {crop.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Action buttons */}
                  <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCrop(crop)}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>तपशील व खत इतिहास</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(crop)}
                        className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                        title={t('farms.edit')}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('हे पीक नक्की हटवायचे आहे का?')) {
                            deleteCrop(crop.id);
                          }
                        }}
                        className="p-1.5 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50"
                        title={t('farms.delete')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-emerald-50/70 text-emerald-950 font-bold text-xs uppercase border-b border-emerald-100">
                  <tr>
                    <th className="p-4">{t('crops.crop_name')}</th>
                    <th className="p-4">{t('crops.variety')}</th>
                    <th className="p-4">{t('crops.farm_and_field')}</th>
                    <th className="p-4">{t('crops.cultivated_area')}</th>
                    <th className="p-4">{t('crops.growth_stage')}</th>
                    <th className="p-4">{t('crops.health_status')}</th>
                    <th className="p-4 text-right">{t('farms.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentCrops.map(crop => {
                    const field = fields.find(f => f.id === crop.field_id);
                    return (
                      <tr key={crop.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-bold text-gray-900">{crop.name}</td>
                        <td className="p-4 text-gray-600">{crop.variety}</td>
                        <td className="p-4 text-gray-600">{field?.name || '-'}</td>
                        <td className="p-4 font-bold text-emerald-800">{crop.area_acres} एकर</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            {t(`crops.stages.${crop.growth_stage}`)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            crop.health_status === 'excellent' ? 'bg-green-100 text-green-800' :
                            crop.health_status === 'good' ? 'bg-blue-100 text-blue-800' :
                            crop.health_status === 'needs_attention' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {t(`crops.health.${crop.health_status}`)}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(crop)}
                              className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('हे पीक नक्की हटवायचे आहे का?')) deleteCrop(crop.id);
                              }}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Crop Details & Input History Drawer */}
        {selectedCrop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-black text-lg text-gray-900">{selectedCrop.name}</h3>
                  <p className="text-xs text-gray-500">{selectedCrop.variety} • {selectedCrop.area_acres} एकर</p>
                </div>
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Verified Fertilizer / Agrochemical Inputs for this crop */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  वापरलेली खते व कीटकनाशके (Agricultural Inputs Log)
                </h4>
                <div className="space-y-2">
                  {inputs.filter(i => i.crop_id === selectedCrop.id).length > 0 ? (
                    inputs.filter(i => i.crop_id === selectedCrop.id).map(inp => (
                      <div key={inp.id} className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs">
                        <div className="font-bold text-gray-900">{inp.product_name}</div>
                        <div className="text-gray-600 mt-0.5">प्रमाण: {inp.quantity_used} • तारीख: {inp.application_date}</div>
                        {inp.notes && <div className="text-emerald-800 text-[11px] mt-1">{inp.notes}</div>}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-500">
                      या पिकासाठी अद्याप कोणतीही खते नोंदवलेली नाहीत.
                    </div>
                  )}
                </div>
              </div>

              {/* Yield & Output */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                <div className="font-bold text-amber-900">अपेक्षित काढणी व उत्पादन:</div>
                <div className="text-amber-800">
                  काढणी उत्पादन: <strong>{selectedCrop.harvested_quantity_quintals || 0} क्विंटल</strong>
                </div>
              </div>

              <button
                onClick={() => setSelectedCrop(null)}
                className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-sm"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        )}

        {/* Add / Edit Crop Modal */}
        {(isAddOpen || editingCrop) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {editingCrop ? t('crops.title') : t('crops.add_crop')}
                </h3>
                <button
                  onClick={() => { setIsAddOpen(false); setEditingCrop(null); }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCrop} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.crop_name')} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="उदा. सोयाबीन, कापूस, ऊस, कांदा"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.variety')}</label>
                    <input
                      type="text"
                      value={variety}
                      onChange={e => setVariety(e.target.value)}
                      placeholder="उदा. JS-335, भीमा सुपर, को-८६०३२"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.cultivated_area')} *</label>
                    <input
                      type="number"
                      required
                      step="0.5"
                      value={area}
                      onChange={e => setArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.farm_and_field')}</label>
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
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.sowing_date')}</label>
                    <input
                      type="date"
                      value={sowingDate}
                      onChange={e => setSowingDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.harvest_date')}</label>
                    <input
                      type="date"
                      value={harvestDate}
                      onChange={e => setHarvestDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.growth_stage')}</label>
                    <select
                      value={stage}
                      onChange={e => setStage(e.target.value as CropStage)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="land_prep">{t('crops.stages.land_prep')}</option>
                      <option value="sowing">{t('crops.stages.sowing')}</option>
                      <option value="germination">{t('crops.stages.germination')}</option>
                      <option value="growth">{t('crops.stages.growth')}</option>
                      <option value="flowering">{t('crops.stages.flowering')}</option>
                      <option value="harvesting">{t('crops.stages.harvesting')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.health_status')}</label>
                    <select
                      value={health}
                      onChange={e => setHealth(e.target.value as CropHealth)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="excellent">{t('crops.health.excellent')}</option>
                      <option value="good">{t('crops.health.good')}</option>
                      <option value="needs_attention">{t('crops.health.needs_attention')}</option>
                      <option value="diseased">{t('crops.health.diseased')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.photo')} (URL)</label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('crops.notes')}</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="उदा. खुरपणी पूर्ण, वाढ जोमदार आहे"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsAddOpen(false); setEditingCrop(null); }}
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
