import React from 'react';
import { 
  Server, 
  Eye, 
  Lock, 
  Smartphone, 
  Settings, 
  HardDrive, 
  RefreshCw, 
  ShieldOff, 
  Power,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { cn } from '../../utils';

const DEVICES_LIST = [
  { id: 1, name: 'Smart Router', status: 'online', health: 98, icon: <Server className="w-6 h-6" />, ip: '192.168.1.1', mac: '00:1A:2B:3C:4D:5E' },
  { id: 2, name: 'Living Room Camera', status: 'online', health: 92, icon: <Eye className="w-6 h-6" />, ip: '192.168.1.102', mac: '00:1A:2B:3C:4D:5F' },
  { id: 3, name: 'Smart Lock', status: 'online', health: 100, icon: <Lock className="w-6 h-6" />, ip: '192.168.1.105', mac: '00:1A:2B:3C:4D:60' },
  { id: 4, name: 'Kitchen Hub', status: 'warning', health: 75, icon: <Smartphone className="w-6 h-6" />, ip: '192.168.1.108', mac: '00:1A:2B:3C:4D:61' },
  { id: 5, name: 'Thermostat', status: 'online', health: 95, icon: <Settings className="w-6 h-6" />, ip: '192.168.1.110', mac: '00:1A:2B:3C:4D:62' },
  { id: 6, name: 'NAS Storage', status: 'offline', health: 0, icon: <HardDrive className="w-6 h-6" />, ip: '192.168.1.200', mac: '00:1A:2B:3C:4D:63' },
];

export const DevicesPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Device Management</h2>
          <p className="text-slate-500 mt-1">Manage and monitor all connected IoT nodes in your network.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search devices..." 
              className="pl-10 pr-4 py-2.5 bg-cyber-card border border-cyber-border rounded-xl text-sm focus:outline-none focus:border-cyber-accent transition-all w-64"
            />
          </div>
          <button className="p-2.5 bg-cyber-card border border-cyber-border rounded-xl text-slate-400 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DEVICES_LIST.map((device) => (
          <div key={device.id} className="bg-cyber-card border border-cyber-border rounded-3xl p-6 card-3d group">
            <div className="flex items-start justify-between mb-6">
              <div className={cn(
                "p-4 rounded-2xl bg-white/5 text-slate-400 group-hover:text-cyber-accent transition-colors",
                device.status === 'warning' && "text-cyber-warning",
                device.status === 'offline' && "text-cyber-danger"
              )}>
                {device.icon}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  device.status === 'online' ? "bg-cyber-success/10 text-cyber-success" : 
                  device.status === 'warning' ? "bg-cyber-warning/10 text-cyber-warning" : 
                  "bg-cyber-danger/10 text-cyber-danger"
                )}>
                  {device.status}
                </div>
                <button className="p-1 text-slate-600 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-1">{device.name}</h4>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-500 font-mono">IP: {device.ip}</p>
                <p className="text-xs text-slate-500 font-mono">MAC: {device.mac}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-2">
                  <span>Device Health</span>
                  <span>{device.health}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      device.health > 80 ? "bg-cyber-success" : 
                      device.health > 50 ? "bg-cyber-warning" : "bg-cyber-danger"
                    )} 
                    style={{ width: `${device.health}%` }} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reboot
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 bg-cyber-danger/10 border border-cyber-danger/20 rounded-xl text-xs font-bold text-cyber-danger hover:bg-cyber-danger/20 transition-all">
                  <ShieldOff className="w-3.5 h-3.5" />
                  Isolate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
