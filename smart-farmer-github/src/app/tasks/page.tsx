'use client';

import React, { useState, useMemo } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { Task, TaskPriority } from '@/lib/types';
import { 
  CheckSquare, 
  Plus, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  User, 
  Trash2, 
  Filter, 
  X,
  Layers,
  Sprout
} from 'lucide-react';

export default function TasksPage() {
  const { currentFarm, fields, crops, workers, tasks, addTask, toggleTaskCompleted, deleteTask } = useFarm();
  const { t, language } = useTranslation();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('फवारणी / पीक संरक्षण');
  const [fieldId, setFieldId] = useState(fields[0]?.id || '');
  const [cropId, setCropId] = useState(crops[0]?.id || '');
  const [dueDate, setDueDate] = useState('2026-11-06');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [workerId, setWorkerId] = useState('');

  const currentTasks = tasks.filter(t => t.farm_id === currentFarm.id);

  const filteredTasks = useMemo(() => {
    return currentTasks.filter(task => {
      if (filterStatus === 'pending' && task.is_completed) return false;
      if (filterStatus === 'completed' && !task.is_completed) return false;
      if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
      return true;
    });
  }, [currentTasks, filterStatus, filterPriority]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTask({
      farm_id: currentFarm.id,
      field_id: fieldId || undefined,
      crop_id: cropId || undefined,
      title,
      description,
      category,
      due_date: dueDate,
      priority,
      assigned_worker_id: workerId || undefined,
      is_completed: false
    });
    setIsAddOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <CheckSquare className="w-4 h-4" />
              <span>{t('tasks.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              दैनंदिन शेती कामे व स्मरणपत्रे
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              शेतातील सर्व मशागत, पेरणी, फवारणी, सिंचन व काढणी कामांचे डिजिटल नियोजन
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('tasks.add_task')}</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === 'all' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              सर्व ({currentTasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === 'pending' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              प्रलंबित ({currentTasks.filter(t => !t.is_completed).length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === 'completed' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              पूर्ण झालेले ({currentTasks.filter(t => t.is_completed).length})
            </button>

            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium bg-white"
            >
              <option value="all">सर्व प्राधान्यक्रम (All Priorities)</option>
              <option value="urgent">{t('tasks.priority_urgent')}</option>
              <option value="high">{t('tasks.priority_high')}</option>
              <option value="medium">{t('tasks.priority_medium')}</option>
              <option value="low">{t('tasks.priority_low')}</option>
            </select>
          </div>

          <span className="text-xs text-gray-500 font-medium">
            {filteredTasks.length} कामे दाखवत आहे
          </span>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map(task => {
            const field = fields.find(f => f.id === task.field_id);
            const crop = crops.find(c => c.id === task.crop_id);
            const worker = workers.find(w => w.id === task.assigned_worker_id);

            return (
              <div
                key={task.id}
                className={`p-5 rounded-3xl border transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  task.is_completed
                    ? 'border-gray-200 bg-gray-50/60 opacity-70'
                    : task.priority === 'urgent'
                    ? 'border-red-300 shadow-xs'
                    : 'border-emerald-100 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTaskCompleted(task.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      task.is_completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-gray-300 hover:border-emerald-600 bg-white'
                    }`}
                  >
                    {task.is_completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        task.priority === 'high' ? 'bg-amber-100 text-amber-800' :
                        task.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {t(`tasks.priority_${task.priority}`)}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {task.category}
                      </span>
                      {field && <span className="text-xs text-gray-500">📍 {field.name}</span>}
                    </div>

                    <h3 className={`text-base font-extrabold ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <div className="flex items-center gap-1 font-semibold text-gray-700">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>मुदत: {task.due_date}</span>
                      </div>
                      {worker && (
                        <div className="flex items-center gap-1 text-emerald-800 font-semibold">
                          <User className="w-3.5 h-3.5" />
                          <span>मजूर: {worker.full_name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <button
                    onClick={() => {
                      if (confirm('हे काम हटवायचे आहे का?')) deleteTask(task.id);
                    }}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    title="हटवा"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Task Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('tasks.add_task')}
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.task_title')} *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="उदा. कांद्यावर बुरशीनाशक फवारणी"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">प्रवर्ग (Category)</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="फवारणी / पीक संरक्षण">फवारणी / पीक संरक्षण</option>
                      <option value="खत व्यवस्थापन">खत व्यवस्थापन</option>
                      <option value="मशागत व नांगरणी">मशागत व नांगरणी</option>
                      <option value="पेरणी व लागवड">पेरणी व लागवड</option>
                      <option value="सिंचन व पाणी">सिंचन व पाणी</option>
                      <option value="खुरपणी व तण नियंत्रण">खुरपणी व तण नियंत्रण</option>
                      <option value="काढणी व मळणी">काढणी व मळणी</option>
                      <option value="यंत्र देखभाल">यंत्र देखभाल</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.priority')}</label>
                    <select
                      value={priority}
                      onChange={e => setPriority(e.target.value as TaskPriority)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="urgent">{t('tasks.priority_urgent')}</option>
                      <option value="high">{t('tasks.priority_high')}</option>
                      <option value="medium">{t('tasks.priority_medium')}</option>
                      <option value="low">{t('tasks.priority_low')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.due_date')}</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('tasks.assigned_to')}</label>
                    <select
                      value={workerId}
                      onChange={e => setWorkerId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="">स्वतः शेतकरी (Self)</option>
                      {workers.map(w => (
                        <option key={w.id} value={w.id}>{w.full_name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">कामाचे सविस्तर वर्णन</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="उदा. सकाळी वाऱ्याचा वेग कमी असताना मँकोझेब + स्टिकरची फवारणी करावी."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm"
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
