import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';

// Import All 20+ Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TradePlannerPage } from './pages/TradePlannerPage';
import { SupplierIntelligencePage } from './pages/SupplierIntelligencePage';
import { HSCustomsPage } from './pages/HSCustomsPage';
import { LandedCostPage } from './pages/LandedCostPage';
import { RouteOptimizerPage } from './pages/RouteOptimizerPage';
import { VoyageOptimizerPage } from './pages/VoyageOptimizerPage';
import { PortIntelligencePage } from './pages/PortIntelligencePage';
import { TradeRiskPage } from './pages/TradeRiskPage';
import { CargoGuardPage } from './pages/CargoGuardPage';
import { SmartContainerPage } from './pages/SmartContainerPage';
import { DamageDetectionPage } from './pages/DamageDetectionPage';
import { CargoLossEstimatorPage } from './pages/CargoLossEstimatorPage';
import { ComplaintGeneratorPage } from './pages/ComplaintGeneratorPage';
import { EvidencePackagePage } from './pages/EvidencePackagePage';
import { DocumentDetectorPage } from './pages/DocumentDetectorPage';
import { CustomsDelayPredictorPage } from './pages/CustomsDelayPredictorPage';
import { WhatIfSimulatorPage } from './pages/WhatIfSimulatorPage';
import { ShipmentTrackingPage } from './pages/ShipmentTrackingPage';
import { IntelligentAlertsPage } from './pages/IntelligentAlertsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, toasts, removeToast } = useAppData();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Full-screen pages
  if (activeTab === 'landing') return <LandingPage />;
  if (activeTab === 'login') return <LoginPage />;
  if (activeTab === 'register') return <RegisterPage />;

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user?.role === 'Admin') {
          return <AdminDashboardPage />;
        }

        return <DashboardPage />;
      case 'planner': return <TradePlannerPage />;
      case 'suppliers': return <SupplierIntelligencePage />;
      case 'customs': return <HSCustomsPage />;
      case 'landed-cost': return <LandedCostPage />;
      case 'routes': return <RouteOptimizerPage />;
      case 'voyage': return <VoyageOptimizerPage />;
      case 'ports': return <PortIntelligencePage />;
      case 'risk': return <TradeRiskPage />;
      case 'cargoguard': return <CargoGuardPage />;
      case 'container-iot': return <SmartContainerPage />;
      case 'damage-detect': return <DamageDetectionPage />;
      case 'loss-estimator': return <CargoLossEstimatorPage />;
      case 'claim-generator': return <ComplaintGeneratorPage />;
      case 'evidence': return <EvidencePackagePage />;
      case 'doc-detector': return <DocumentDetectorPage />;
      case 'customs-delay': return <CustomsDelayPredictorPage />;
      case 'simulator': return <WhatIfSimulatorPage />;
      case 'tracking': return <ShipmentTrackingPage />;
      case 'alerts': return <IntelligentAlertsPage />;
      case 'admin': return <AdminDashboardPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 flex flex-col font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Toast Notifications Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`p-3.5 rounded-xl border shadow-2xl flex items-start justify-between text-xs backdrop-blur-md transition-all ${
              t.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
                : t.type === 'warning'
                ? 'bg-amber-950/90 text-amber-200 border-amber-500/50'
                : t.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/50'
                : 'bg-navy-850/90 text-cyan-200 border-cyan-500/50'
            }`}
          >
            <div>
              <span className="font-bold block text-white font-sans">{t.title}</span>
              <span className="text-slate-300 mt-0.5 block">{t.message}</span>
            </div>
            <button onClick={() => removeToast(t.id)} className="text-slate-400 hover:text-white ml-2">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <AppContent />
      </AppDataProvider>
    </AuthProvider>
  );
}

export default App;
