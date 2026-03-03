import React from 'react';
import { 
  ShieldAlert, 
  Info, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight,
  Search,
  Filter,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { cn } from '../../utils';

const THREATS = [
  { id: 1, device: 'Smart Bulb', message: 'Anomalous data upload blocked', severity: 'medium', time: '2m ago', type: 'Data Leak', details: 'Device attempted to connect to unknown IP in RU region.' },
  { id: 2, device: 'Smart Router', message: 'Brute force attempt detected', severity: 'high', time: '15m ago', type: 'Intrusion', details: 'Multiple failed SSH login attempts from 10.2.44.12.' },
  { id: 3, device: 'Living Room Camera', message: 'Unauthorized access attempt', severity: 'high', time: '1h ago', type: 'Privacy', details: 'Encrypted stream request from unauthenticated client.' },
  { id: 4, device: 'Smart Lock', message: 'Firmware integrity check passed', severity: 'low', time: '3h ago', type: 'System', details: 'Scheduled integrity scan completed successfully.' },
  { id: 5, device: 'Kitchen Hub', message: 'New device connection request', severity: 'medium', time: '5h ago', type: 'Network', details: 'Unknown MAC address attempted to join local network.' },
  { id: 6, device: 'Thermostat', message: 'Unusual temperature spike report', severity: 'low', time: '8h ago', type: 'Anomaly', details: 'Sensor reported 45°C, verified as false positive.' },
];

export const IntelligencePage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Security Intelligence</h2>
          <p className="text-slate-500 mt-1">Real-time threat detection and autonomous mitigation history.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-cyber-card border border-cyber-border rounded-2xl px-6 py-3 flex items-center gap-4">
            <div className="p-2 bg-cyber-danger/10 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-cyber-danger" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Active Threats</p>
              <p className="text-xl font-bold text-white">02</p>
            </div>
          </div>
          <div className="bg-cyber-card border border-cyber-border rounded-2xl px-6 py-3 flex items-center gap-4">
            <div className="p-2 bg-cyber-success/10 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-cyber-success" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Mitigated</p>
              <p className="text-xl font-bold text-white">1,284</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cyber-card border border-cyber-border rounded-[2rem] overflow-hidden glass-panel">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-cyber-accent text-white rounded-xl text-sm font-bold">All Events</button>
            <button className="px-4 py-2 text-slate-400 hover:text-white rounded-xl text-sm font-bold transition-colors">Critical</button>
            <button className="px-4 py-2 text-slate-400 hover:text-white rounded-xl text-sm font-bold transition-colors">Warnings</button>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search intelligence..." 
                className="pl-10 pr-4 py-2 bg-black/20 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-cyber-accent transition-all w-64"
              />
            </div>
            <button className="p-2 bg-black/20 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                <th className="px-8 py-6">Severity</th>
                <th className="px-8 py-6">Device / Type</th>
                <th className="px-8 py-6">Incident Description</th>
                <th className="px-8 py-6">Timestamp</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {THREATS.map((threat) => (
                <tr key={threat.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      threat.severity === 'high' ? "bg-cyber-danger/10 text-cyber-danger" : 
                      threat.severity === 'medium' ? "bg-cyber-warning/10 text-cyber-warning" : 
                      "bg-cyber-success/10 text-cyber-success"
                    )}>
                      {threat.severity === 'high' ? <ShieldAlert className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                      {threat.severity}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-white">{threat.device}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{threat.type}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-slate-300">{threat.message}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{threat.details}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-slate-400 font-mono">{threat.time}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 rounded-xl border border-white/5 text-slate-500 hover:text-cyber-accent hover:border-cyber-accent/30 transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/10">
          <p className="text-xs text-slate-500 font-medium">Showing 6 of 1,284 intelligence events</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/10 transition-all disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/10 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
