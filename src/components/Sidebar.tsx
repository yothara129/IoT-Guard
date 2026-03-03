import React from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  Wifi, 
  Activity, 
  Terminal, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils';

export type DashboardTab = 'overview' | 'devices' | 'intelligence' | 'traffic' | 'logs' | 'settings';

interface SidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  onLogout: () => void;
}

export const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'devices', label: 'Devices', icon: <Wifi className="w-5 h-5" /> },
    { id: 'intelligence', label: 'Intelligence', icon: <Shield className="w-5 h-5" /> },
    { id: 'traffic', label: 'Traffic', icon: <Activity className="w-5 h-5" /> },
    { id: 'logs', label: 'Logs', icon: <Terminal className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-72 bg-cyber-card border-r border-cyber-border flex flex-col h-full glass-panel">
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyber-accent rounded-xl shadow-lg shadow-cyber-accent/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">IoT Guard</h1>
            <p className="text-[10px] text-cyber-accent font-mono uppercase tracking-widest">Enterprise</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as DashboardTab)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group",
              activeTab === item.id 
                ? "bg-cyber-accent text-white shadow-lg shadow-cyber-accent/20" 
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-400 hover:bg-cyber-danger/10 hover:text-cyber-danger transition-all group"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
