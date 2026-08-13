import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Compass,
  Users,
  FileCheck2,
  Calculator,
  GitFork,
  Navigation,
  Anchor,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Camera,
  Coins,
  FileText,
  PackageCheck,
  FileSearch,
  Timer,
  Sliders,
  MapPin,
  Bell,
  Settings,
  Shield,
  Layers,
  ChevronRight,
  Plane,
  Truck,
  Train,
  Ship
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: 'core' | 'intelligence' | 'cargoguard' | 'simulation' | 'admin';
  badge?: string;
}

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab } = useAppData();
  const { user } = useAuth();

  const navItems: SidebarItem[] = [
  // CORE — available to everyone
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    category: 'core'
  },

  {
    id: 'tracking',
    label: 'Shipment Tracking',
    icon: <MapPin className="w-4 h-4" />,
    category: 'core'
  },

  {
    id: 'alerts',
    label: 'Intelligent Alerts',
    icon: <Bell className="w-4 h-4" />,
    category: 'core',
    badge: '02'
  },

  // MERCHANT
  ...(user?.role === 'Merchant'
    ? [
        {
          id: 'planner',
          label: 'Trade Planner',
          icon: <Compass className="w-4 h-4" />,
          category: 'core' as const
        },
        {
          id: 'suppliers',
          label: 'Supplier Intelligence',
          icon: <Users className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'landed-cost',
          label: 'Landed Cost Calculator',
          icon: <Calculator className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'routes',
          label: 'Multimodal Optimizer',
          icon: <GitFork className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'risk',
          label: 'Trade Risk Matrix',
          icon: <ShieldAlert className="w-4 h-4" />,
          category: 'intelligence' as const
        }
      ]
    : []),

  // IMPORTER
  ...(user?.role === 'Importer'
    ? [
        {
          id: 'customs',
          label: 'HS Code & Customs',
          icon: <FileCheck2 className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'landed-cost',
          label: 'Landed Cost Calculator',
          icon: <Calculator className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'suppliers',
          label: 'Supplier Intelligence',
          icon: <Users className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'ports',
          label: 'Port Intelligence',
          icon: <Anchor className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'risk',
          label: 'Trade Risk Matrix',
          icon: <ShieldAlert className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'customs-delay',
          label: 'Customs Delay Predictor',
          icon: <Timer className="w-4 h-4" />,
          category: 'cargoguard' as const
        }
      ]
    : []),

  // EXPORTER
  ...(user?.role === 'Exporter'
    ? [
        {
          id: 'planner',
          label: 'Trade Planner',
          icon: <Compass className="w-4 h-4" />,
          category: 'core' as const
        },
        {
          id: 'routes',
          label: 'Multimodal Optimizer',
          icon: <GitFork className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'customs',
          label: 'HS Code & Customs',
          icon: <FileCheck2 className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'risk',
          label: 'Trade Risk Matrix',
          icon: <ShieldAlert className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'ports',
          label: 'Port Intelligence',
          icon: <Anchor className="w-4 h-4" />,
          category: 'intelligence' as const
        }
      ]
    : []),

  // LOGISTICS MANAGER
  ...(user?.role === 'Logistics Manager'
    ? [
        {
          id: 'routes',
          label: 'Multimodal Optimizer',
          icon: <GitFork className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'ports',
          label: 'Port Intelligence',
          icon: <Anchor className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'planner',
          label: 'Trade Planner',
          icon: <Compass className="w-4 h-4" />,
          category: 'core' as const
        },
        {
          id: 'risk',
          label: 'Trade Risk Matrix',
          icon: <ShieldAlert className="w-4 h-4" />,
          category: 'intelligence' as const
        }
      ]
    : []),

  // MARITIME OPERATOR
  ...(user?.role === 'Maritime Operator'
    ? [
        {
          id: 'voyage',
          label: 'Voyage Decision AI',
          icon: <Navigation className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'ports',
          label: 'Port Intelligence',
          icon: <Anchor className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'risk',
          label: 'Trade Risk Matrix',
          icon: <ShieldAlert className="w-4 h-4" />,
          category: 'intelligence' as const
        },
        {
          id: 'routes',
          label: 'Multimodal Optimizer',
          icon: <GitFork className="w-4 h-4" />,
          category: 'intelligence' as const
        }
      ]
    : []),

  // CARGOGUARD — roles that deal with cargo
  ...(user?.role === 'Merchant' ||
  user?.role === 'Importer' ||
  user?.role === 'Exporter' ||
  user?.role === 'Logistics Manager'
    ? [
        {
          id: 'cargoguard',
          label: 'CargoGuard AI',
          icon: <ShieldCheck className="w-4 h-4" />,
          category: 'cargoguard' as const,
          badge: 'NEW'
        },
        {
          id: 'damage-detect',
          label: 'AI Damage Detection',
          icon: <Camera className="w-4 h-4" />,
          category: 'cargoguard' as const
        },
        {
          id: 'claim-generator',
          label: 'Claim Draft Generator',
          icon: <FileText className="w-4 h-4" />,
          category: 'cargoguard' as const
        }
      ]
    : []),

  // SIMULATION — available to operational roles
  ...(user?.role !== 'Admin'
    ? [
        {
          id: 'simulator',
          label: 'What-If Simulator',
          icon: <Sliders className="w-4 h-4" />,
          category: 'simulation' as const
        }
      ]
    : []),

  // SETTINGS — everyone
  {
    id: 'settings',
    label: 'Profile & Settings',
    icon: <Settings className="w-4 h-4" />,
    category: 'admin'
  }
];

if (user?.role === 'Admin') {
  navItems.push(
    {
      id: 'admin',
      label: 'Admin Dashboard',
      icon: <Shield className="w-4 h-4" />,
      category: 'admin'
    },
    {
      id: 'routes',
      label: 'Multimodal Optimizer',
      icon: <GitFork className="w-4 h-4" />,
      category: 'intelligence'
    },
    {
      id: 'voyage',
      label: 'Voyage Decision AI',
      icon: <Navigation className="w-4 h-4" />,
      category: 'intelligence'
    },
    {
      id: 'customs',
      label: 'HS Code & Customs',
      icon: <FileCheck2 className="w-4 h-4" />,
      category: 'intelligence'
    },
    {
      id: 'suppliers',
      label: 'Supplier Intelligence',
      icon: <Users className="w-4 h-4" />,
      category: 'intelligence'
    },
    {
      id: 'ports',
      label: 'Port Intelligence',
      icon: <Anchor className="w-4 h-4" />,
      category: 'intelligence'
    }
  );
}

  const renderGroup = (category: string, title: string) => {
    const items = navItems.filter(i => i.category === category);
    if (items.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{title}</h4>
        <div className="space-y-0.5">
          {items.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    item.badge === 'NEW' ? 'bg-cyan-500 text-navy-950' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-navy-900 border-r border-slate-800 z-50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 font-mono font-black text-sm">
              TN
            </div>
            <div>
              <div className="font-bold text-slate-100 tracking-wide text-sm flex items-center space-x-1">
                <span>TRADE NAV AI</span>
              </div>
              <p className="text-[10px] text-cyan-400 font-mono tracking-wider">MULTIMODAL INTELLIGENCE</p>
            </div>
          </div>
        </div>

        {/* Transport Modes Quick Bar */}
        <div className="px-4 py-2.5 bg-navy-850 border-b border-slate-800/80 flex items-center justify-around text-slate-400">
          <div title="Sea Freight 🚢" className="flex items-center space-x-1 text-[11px] text-cyan-400 font-medium">
            <Ship className="w-3.5 h-3.5" />
            <span>Sea</span>
          </div>
          <div title="Air Cargo ✈️" className="flex items-center space-x-1 text-[11px] text-blue-400 font-medium">
            <Plane className="w-3.5 h-3.5" />
            <span>Air</span>
          </div>
          <div title="Rail Cargo 🚆" className="flex items-center space-x-1 text-[11px] text-amber-400 font-medium">
            <Train className="w-3.5 h-3.5" />
            <span>Rail</span>
          </div>
          <div title="Road Trucking 🚛" className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium">
            <Truck className="w-3.5 h-3.5" />
            <span>Road</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3">
          {renderGroup('core', 'Core Platform')}
          {renderGroup('intelligence', 'Trade & Route Intelligence')}
          {renderGroup('cargoguard', 'CargoGuard & Claim Protection')}
          {renderGroup('simulation', 'Simulation & Analytics')}
          {renderGroup('admin', 'Account & System')}
        </div>

        {/* User Role Footer */}
        <div className="p-3 border-t border-slate-800 bg-navy-850/60 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-slate-200 truncate text-[11px]">{user?.name || 'User'}</p>
              <p className="text-[10px] text-cyan-400 font-mono font-medium truncate">{user?.role || 'Merchant'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
