import React, { createContext, useContext, useState } from 'react';
import { IShipment, ISupplier, IPort, IAlert, IDamageCase } from '../types';
import { initialShipments, initialSuppliers, initialPorts, initialAlerts, initialDamageCases } from '../data/mockData';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppDataContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  shipments: IShipment[];
  suppliers: ISupplier[];
  ports: IPort[];
  alerts: IAlert[];
  damageCases: IDamageCase[];
  toasts: Toast[];
  addToast: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  addDamageCase: (damageCase: IDamageCase) => void;
  updateShipment: (id: string, updates: Partial<IShipment>) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [shipments, setShipments] = useState<IShipment[]>(initialShipments);
  const [suppliers, setSuppliers] = useState<ISupplier[]>(initialSuppliers);
  const [ports, setPorts] = useState<IPort[]>(initialPorts);
  const [alerts, setAlerts] = useState<IAlert[]>(initialAlerts);
  const [damageCases, setDamageCases] = useState<IDamageCase[]>(initialDamageCases);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addDamageCase = (damageCase: IDamageCase) => {
    setDamageCases(prev => [damageCase, ...prev]);
    addToast('Damage Case Created', `Case ${damageCase.caseId} recorded successfully.`, 'warning');
  };

  const updateShipment = (id: string, updates: Partial<IShipment>) => {
    setShipments(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <AppDataContext.Provider
      value={{
        activeTab,
        setActiveTab,
        shipments,
        suppliers,
        ports,
        alerts,
        damageCases,
        toasts,
        addToast,
        removeToast,
        addDamageCase,
        updateShipment
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
};
