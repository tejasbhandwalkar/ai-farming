'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useFarm } from '@/context/FarmContext';
import { useTranslation } from '@/context/LanguageContext';
import { Worker, WorkerAttendance, AttendanceStatus } from '@/lib/types';
import { 
  Users, 
  Plus, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Phone, 
  X, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function LabourPage() {
  const { currentFarm, workers, addWorker, updateWorker, attendance, recordAttendance } = useFarm();
  const { t, language } = useTranslation();

  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

  // Add Worker State
  const [workerName, setWorkerName] = useState('');
  const [workerPhone, setWorkerPhone] = useState('');
  const [workerRole, setWorkerRole] = useState('शेत मजूर (Field Labourer)');
  const [dailyWage, setDailyWage] = useState('450');

  // Attendance State
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0]?.id || '');
  const [attDate, setAttDate] = useState('2026-11-06');
  const [attStatus, setAttStatus] = useState<AttendanceStatus>('present');
  const [wagePaid, setWagePaid] = useState('');
  const [attNotes, setAttNotes] = useState('');

  const currentWorkers = workers.filter(w => w.farm_id === currentFarm.id);

  // Financial wage calculations
  const totalWagesEarned = attendance.reduce((sum, a) => sum + Number(a.wage_earned || 0), 0);
  const totalWagesPaid = attendance.reduce((sum, a) => sum + Number(a.wage_paid || 0), 0);
  const totalPendingWages = totalWagesEarned - totalWagesPaid;

  const handleSaveWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName) return;
    addWorker({
      farm_id: currentFarm.id,
      full_name: workerName,
      phone: workerPhone,
      role: workerRole,
      daily_wage: Number(dailyWage) || 400,
      is_active: true
    });
    setIsAddWorkerOpen(false);
    setWorkerName('');
    setWorkerPhone('');
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const worker = workers.find(w => w.id === selectedWorkerId);
    if (!worker) return;

    let earned = worker.daily_wage;
    if (attStatus === 'half_day') earned = worker.daily_wage / 2;
    if (attStatus === 'absent') earned = 0;

    recordAttendance({
      worker_id: selectedWorkerId,
      farm_id: currentFarm.id,
      date: attDate,
      status: attStatus,
      wage_earned: earned,
      wage_paid: Number(wagePaid) || 0,
      notes: attNotes
    });

    setIsAttendanceModalOpen(false);
    setWagePaid('');
    setAttNotes('');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>{t('labour.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-1">
              मजूर हजेरी व रोजंदारी हिशोब
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              दैनिक हजेरी, रोजंदारी, उचल, दिलेली मजुरी आणि शिल्लक देणे बाकी
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAttendanceModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-xs font-bold shadow-xs transition-all"
            >
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>{t('labour.attendance')}</span>
            </button>

            <button
              onClick={() => setIsAddWorkerOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t('labour.add_worker')}</span>
            </button>
          </div>
        </div>

        {/* Wage Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">{t('labour.total_earned')}</span>
            <div className="text-2xl font-black text-gray-900 mt-1">
              ₹ {totalWagesEarned.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">मजुरांचे एकूण काम दिवस</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">{t('labour.amount_paid')}</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              ₹ {totalWagesPaid.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-700 font-medium mt-0.5">रोख किंवा बँक उचल</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs">
            <span className="text-xs font-bold text-gray-500 uppercase">{t('labour.pending_wage')}</span>
            <div className={`text-2xl font-black mt-1 ${totalPendingWages > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
              ₹ {totalPendingWages.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">पुढील आठवड्यात देय रक्कम</div>
          </div>
        </div>

        {/* Workers List Cards */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
          <h3 className="font-extrabold text-base text-gray-900 mb-4">
            शेत मजूर यादी (Active Farm Workers)
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentWorkers.map(w => {
              const workerAtt = attendance.filter(a => a.worker_id === w.id);
              const earned = workerAtt.reduce((s, a) => s + Number(a.wage_earned || 0), 0);
              const paid = workerAtt.reduce((s, a) => s + Number(a.wage_paid || 0), 0);
              const due = earned - paid;

              return (
                <div key={w.id} className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-base text-gray-900">{w.full_name}</h4>
                      <p className="text-xs text-emerald-800 font-semibold">{w.role}</p>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {w.full_name.slice(0, 1)}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{w.phone || 'फोन उपलब्ध नाही'}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-emerald-200/50">
                      <span>रोजंदारी (Daily Wage):</span>
                      <strong className="text-gray-900">₹ {w.daily_wage}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>देणे बाकी (Dues):</span>
                      <strong className={due > 0 ? 'text-amber-800' : 'text-emerald-700'}>₹ {due}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Attendance Log Table */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-emerald-950">
              हजेरी व मजुरी नोंदवही (Attendance & Wage Log)
            </h3>
            <span className="text-xs text-emerald-800">{attendance.length} नोंदी</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 font-bold text-xs uppercase border-b border-gray-100">
                <tr>
                  <th className="p-4">तारीख</th>
                  <th className="p-4">मजुराचे नाव</th>
                  <th className="p-4">हजेरी स्थिती</th>
                  <th className="p-4">झालेली मजुरी</th>
                  <th className="p-4">दिलेली उचल</th>
                  <th className="p-4">काम व टिप्पणी</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendance.map(att => {
                  const worker = workers.find(w => w.id === att.worker_id);
                  return (
                    <tr key={att.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-xs font-bold text-gray-900 whitespace-nowrap">{att.date}</td>
                      <td className="p-4 font-bold text-gray-900">{worker?.full_name || '-'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          att.status === 'present' ? 'bg-emerald-100 text-emerald-800' :
                          att.status === 'half_day' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {t(`labour.${att.status}`)}
                        </span>
                      </td>
                      <td className="p-4 text-xs font-black text-gray-900">₹ {att.wage_earned}</td>
                      <td className="p-4 text-xs font-bold text-emerald-700">₹ {att.wage_paid}</td>
                      <td className="p-4 text-xs text-gray-500">{att.notes || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Worker Modal */}
        {isAddWorkerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('labour.add_worker')}
                </h3>
                <button
                  onClick={() => setIsAddWorkerOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveWorker} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{t('labour.worker_name')} *</label>
                  <input
                    type="text"
                    required
                    value={workerName}
                    onChange={e => setWorkerName(e.target.value)}
                    placeholder="उदा. दत्ता शिंदे / सुमनबाई कांबळे"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('labour.daily_wage')} (₹) *</label>
                    <input
                      type="number"
                      required
                      value={dailyWage}
                      onChange={e => setDailyWage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">{t('labour.phone')}</label>
                    <input
                      type="tel"
                      value={workerPhone}
                      onChange={e => setWorkerPhone(e.target.value)}
                      placeholder="+91 98..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">कामाचे स्वरूप (Role)</label>
                  <input
                    type="text"
                    value={workerRole}
                    onChange={e => setWorkerRole(e.target.value)}
                    placeholder="उदा. खुरपणी, ट्रॅक्टर चालक, औषध फवारणी"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddWorkerOpen(false)}
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

        {/* Record Attendance Modal */}
        {isAttendanceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-base text-gray-900">
                  {t('labour.attendance')}
                </h3>
                <button
                  onClick={() => setIsAttendanceModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAttendance} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">मजूर निवडा *</label>
                  <select
                    value={selectedWorkerId}
                    onChange={e => setSelectedWorkerId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                  >
                    {workers.map(w => (
                      <option key={w.id} value={w.id}>{w.full_name} (₹{w.daily_wage}/दिवस)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">तारीख</label>
                    <input
                      type="date"
                      value={attDate}
                      onChange={e => setAttDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">हजेरी स्थिती</label>
                    <select
                      value={attStatus}
                      onChange={e => setAttStatus(e.target.value as AttendanceStatus)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
                    >
                      <option value="present">{t('labour.present')} (पूर्ण दिवस)</option>
                      <option value="half_day">{t('labour.half_day')} (अर्धा दिवस)</option>
                      <option value="absent">{t('labour.absent')} (गैरहजर)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">आज दिलेली मजुरी/उचल (₹)</label>
                  <input
                    type="number"
                    value={wagePaid}
                    onChange={e => setWagePaid(e.target.value)}
                    placeholder="उदा. ४०० (किंवा ० जर बाकी ठेवायचे असल्यास)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">केलेले काम व टिप्पणी</label>
                  <input
                    type="text"
                    value={attNotes}
                    onChange={e => setAttNotes(e.target.value)}
                    placeholder="उदा. कांदा लागवड, ठिबक दुरुस्ती"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAttendanceModalOpen(false)}
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
