'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Farm,
  Field,
  Crop,
  Transaction,
  Task,
  IrrigationLog,
  Worker,
  WorkerAttendance,
  AgriculturalInput,
  Machinery,
  UserProfile,
  UserRole
} from '@/lib/types';
import {
  initialProfile,
  initialFarms,
  initialFields,
  initialCrops,
  initialTransactions,
  initialTasks,
  initialIrrigationLogs,
  initialWorkers,
  initialAttendance,
  initialInputs,
  initialMachinery
} from '@/lib/demoData';

interface FarmContextType {
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  farms: Farm[];
  currentFarm: Farm;
  setCurrentFarmId: (id: string) => void;
  addFarm: (farm: Omit<Farm, 'id'>) => void;
  updateFarm: (id: string, farm: Partial<Farm>) => void;
  deleteFarm: (id: string) => void;
  fields: Field[];
  addField: (field: Omit<Field, 'id'>) => void;
  updateField: (id: string, field: Partial<Field>) => void;
  deleteField: (id: string) => void;
  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (id: string, crop: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  irrigationLogs: IrrigationLog[];
  addIrrigationLog: (log: Omit<IrrigationLog, 'id'>) => void;
  workers: Worker[];
  addWorker: (worker: Omit<Worker, 'id'>) => void;
  updateWorker: (id: string, worker: Partial<Worker>) => void;
  attendance: WorkerAttendance[];
  recordAttendance: (att: Omit<WorkerAttendance, 'id'>) => void;
  inputs: AgriculturalInput[];
  addInput: (input: Omit<AgriculturalInput, 'id'>) => void;
  machinery: Machinery[];
  addMachinery: (item: Omit<Machinery, 'id'>) => void;
  updateMachinery: (id: string, item: Partial<Machinery>) => void;
  resetToDemoData: () => void;
  // Computed values
  totalFarmArea: number;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  pendingTasksCount: number;
}

const FarmContext = createContext<FarmContextType | null>(null);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [currentFarmId, setCurrentFarmId] = useState<string>(initialFarms[0]?.id || 'farm-01');
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [irrigationLogs, setIrrigationLogs] = useState<IrrigationLog[]>(initialIrrigationLogs);
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [attendance, setAttendance] = useState<WorkerAttendance[]>(initialAttendance);
  const [inputs, setInputs] = useState<AgriculturalInput[]>(initialInputs);
  const [machinery, setMachinery] = useState<Machinery[]>(initialMachinery);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const storedFarms = localStorage.getItem('sf_farms');
      const storedFields = localStorage.getItem('sf_fields');
      const storedCrops = localStorage.getItem('sf_crops');
      const storedTx = localStorage.getItem('sf_transactions');
      const storedTasks = localStorage.getItem('sf_tasks');
      const storedProfile = localStorage.getItem('sf_profile');

      if (storedFarms) setFarms(JSON.parse(storedFarms));
      if (storedFields) setFields(JSON.parse(storedFields));
      if (storedCrops) setCrops(JSON.parse(storedCrops));
      if (storedTx) setTransactions(JSON.parse(storedTx));
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedProfile) setProfile(JSON.parse(storedProfile));
    } catch (e) {
      console.warn('Storage sync initialized', e);
    }
  }, []);

  // Save changes to LocalStorage
  const saveState = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...data };
      saveState('sf_profile', updated);
      return updated;
    });
  };

  const setRole = (role: UserRole) => {
    updateProfile({ role });
  };

  const currentFarm = useMemo(() => {
    return farms.find(f => f.id === currentFarmId) || farms[0] || initialFarms[0];
  }, [farms, currentFarmId]);

  const addFarm = (farmData: Omit<Farm, 'id'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: `farm-${Date.now()}`
    };
    const updated = [...farms, newFarm];
    setFarms(updated);
    saveState('sf_farms', updated);
    setCurrentFarmId(newFarm.id);
  };

  const updateFarm = (id: string, farmData: Partial<Farm>) => {
    const updated = farms.map(f => f.id === id ? { ...f, ...farmData } : f);
    setFarms(updated);
    saveState('sf_farms', updated);
  };

  const deleteFarm = (id: string) => {
    if (farms.length <= 1) return; // Prevent deleting the last remaining farm
    const updated = farms.filter(f => f.id !== id);
    setFarms(updated);
    saveState('sf_farms', updated);
    setCurrentFarmId(updated[0].id);
  };

  const addField = (fieldData: Omit<Field, 'id'>) => {
    const newField: Field = {
      ...fieldData,
      id: `field-${Date.now()}`
    };
    const updated = [...fields, newField];
    setFields(updated);
    saveState('sf_fields', updated);
  };

  const updateField = (id: string, fieldData: Partial<Field>) => {
    const updated = fields.map(f => f.id === id ? { ...f, ...fieldData } : f);
    setFields(updated);
    saveState('sf_fields', updated);
  };

  const deleteField = (id: string) => {
    const updated = fields.filter(f => f.id !== id);
    setFields(updated);
    saveState('sf_fields', updated);
  };

  const addCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`
    };
    const updated = [...crops, newCrop];
    setCrops(updated);
    saveState('sf_crops', updated);
  };

  const updateCrop = (id: string, cropData: Partial<Crop>) => {
    const updated = crops.map(c => c.id === id ? { ...c, ...cropData } : c);
    setCrops(updated);
    saveState('sf_crops', updated);
  };

  const deleteCrop = (id: string) => {
    const updated = crops.filter(c => c.id !== id);
    setCrops(updated);
    saveState('sf_crops', updated);
  };

  const addTransaction = (txData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...txData,
      id: `tx-${Date.now()}`
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    saveState('sf_transactions', updated);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    saveState('sf_transactions', updated);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveState('sf_tasks', updated);
  };

  const toggleTaskCompleted = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, is_completed: !t.is_completed } : t);
    setTasks(updated);
    saveState('sf_tasks', updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveState('sf_tasks', updated);
  };

  const addIrrigationLog = (logData: Omit<IrrigationLog, 'id'>) => {
    const newLog: IrrigationLog = {
      ...logData,
      id: `irr-${Date.now()}`
    };
    setIrrigationLogs(prev => [newLog, ...prev]);
  };

  const addWorker = (workerData: Omit<Worker, 'id'>) => {
    const newWorker: Worker = {
      ...workerData,
      id: `w-${Date.now()}`
    };
    setWorkers(prev => [...prev, newWorker]);
  };

  const updateWorker = (id: string, workerData: Partial<Worker>) => {
    setWorkers(prev => prev.map(w => w.id === id ? { ...w, ...workerData } : w));
  };

  const recordAttendance = (attData: Omit<WorkerAttendance, 'id'>) => {
    const newAtt: WorkerAttendance = {
      ...attData,
      id: `att-${Date.now()}`
    };
    setAttendance(prev => [newAtt, ...prev]);
  };

  const addInput = (inputData: Omit<AgriculturalInput, 'id'>) => {
    const newInput: AgriculturalInput = {
      ...inputData,
      id: `inp-${Date.now()}`
    };
    setInputs(prev => [newInput, ...prev]);
  };

  const addMachinery = (itemData: Omit<Machinery, 'id'>) => {
    const newItem: Machinery = {
      ...itemData,
      id: `mac-${Date.now()}`
    };
    setMachinery(prev => [...prev, newItem]);
  };

  const updateMachinery = (id: string, itemData: Partial<Machinery>) => {
    setMachinery(prev => prev.map(m => m.id === id ? { ...m, ...itemData } : m));
  };

  const resetToDemoData = () => {
    setProfile(initialProfile);
    setFarms(initialFarms);
    setCurrentFarmId(initialFarms[0].id);
    setFields(initialFields);
    setCrops(initialCrops);
    setTransactions(initialTransactions);
    setTasks(initialTasks);
    setIrrigationLogs(initialIrrigationLogs);
    setWorkers(initialWorkers);
    setAttendance(initialAttendance);
    setInputs(initialInputs);
    setMachinery(initialMachinery);
    localStorage.clear();
  };

  // Real database-calculated stats
  const totalFarmArea = useMemo(() => {
    const farmFields = fields.filter(f => f.farm_id === currentFarm.id);
    if (farmFields.length > 0) {
      return farmFields.reduce((sum, f) => sum + Number(f.area_acres || 0), 0);
    }
    return currentFarm.total_area_acres || 0;
  }, [fields, currentFarm]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }, [transactions]);

  const netProfit = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const pendingTasksCount = useMemo(() => {
    return tasks.filter(t => !t.is_completed).length;
  }, [tasks]);

  return (
    <FarmContext.Provider
      value={{
        profile,
        updateProfile,
        role: profile.role,
        setRole,
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
        crops,
        addCrop,
        updateCrop,
        deleteCrop,
        transactions,
        addTransaction,
        deleteTransaction,
        tasks,
        addTask,
        toggleTaskCompleted,
        deleteTask,
        irrigationLogs,
        addIrrigationLog,
        workers,
        addWorker,
        updateWorker,
        attendance,
        recordAttendance,
        inputs,
        addInput,
        machinery,
        addMachinery,
        updateMachinery,
        resetToDemoData,
        totalFarmArea,
        totalIncome,
        totalExpenses,
        netProfit,
        pendingTasksCount
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
