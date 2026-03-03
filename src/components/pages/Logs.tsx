import React from 'react';
import { 
  Terminal, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Play,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../utils';

const ACTIONS = [
  { id: 1, action: 'Isolated Device', target: 'MAC: 00:1A:2B:3C:4D:5E', time: '10:45:22', status: 'SUCCESS', details: 'Device Smart Bulb isolated due to unauthorized outbound traffic to known malicious IP 45.12.33.1.' },
  { id: 2, action: 'Blocked IP', target: '192.168.1.105', time: '10:42:15', status: 'SUCCESS', details: 'Inbound connection from 192.168.1.105 blocked by firewall rule #442.' },
  { id: 3, action: 'Encrypted Tunnel', target: 'Camera Stream #4', time: '10:30:01', status: 'SUCCESS', details: 'Established secure TLS 1.3 tunnel for Living Room Camera stream.' },
  { id: 4, action: 'Revoked Token', target: 'User: Guest_02', time: '09:15:44', status: 'SUCCESS', details: 'Session token for Guest_02 expired and revoked.' },
  { id: 5, action: 'Firmware Patch', target: 'Smart Lock v2.1', time: '08:22:10', status: 'PENDING', details: 'Downloading security patch v2.1.4 for Smart Lock. Integrity check in progress.' },
  { id: 6, action: 'Network Scan', target: 'Subnet 192.168.1.0/24', time: '08:00:00', status: 'SUCCESS', details: 'Full network vulnerability scan completed. 24 devices found, 0 critical vulnerabilities.' },
  { id: 7, action: 'Heuristic Update', target: 'Agent Core v4.2', time: '07:45:12', status: 'SUCCESS', details: 'New threat signatures downloaded and applied to agent reasoning engine.' },
];

export const LogsPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Execution Logs</h2>
          <p className="text-slate-500 mt-1">Detailed audit trail of all autonomous agent actions and system events.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-cyber-danger/10 border border-cyber-danger/20 rounded-xl text-sm font-bold text-cyber-danger hover:bg-cyber-danger/20 transition-all">
            <Trash2 className="w-4 h-4" />
            Clear Logs
          </button>
        </div>
      </div>

      <div className="flex-1 bg-cyber-card border border-cyber-border rounded-[2rem] overflow-hidden flex flex-col glass-panel">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyber-accent/10 rounded-lg">
              <Terminal className="w-5 h-5 text-cyber-accent" />
            </div>
            <span className="text-sm font-mono font-bold text-white tracking-widest">REALTIME_EXECUTION_LOG</span>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Filter logs..." 
                className="pl-10 pr-4 py-2 bg-black/40 border border-white/5 rounded-xl text-sm font-mono focus:outline-none focus:border-cyber-accent transition-all w-64"
              />
            </div>
            <button className="p-2 bg-black/40 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 font-mono text-sm space-y-6 custom-scrollbar bg-black/40">
          {ACTIONS.map((action, index) => (
            <motion.div 
              key={action.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center gap-2 mt-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    action.status === 'SUCCESS' ? "bg-cyber-success shadow-[0_0_8px_#10b981]" : "bg-cyber-warning shadow-[0_0_8px_#f59e0b]"
                  )} />
                  <div className="w-px h-full bg-white/5 min-h-[40px]" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-600 font-bold">[{action.time}]</span>
                      <span className="text-cyber-accent font-bold uppercase tracking-widest">{action.action}</span>
                      <span className="text-slate-500">::</span>
                      <span className="text-white font-bold">{action.target}</span>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded border",
                      action.status === 'SUCCESS' ? "bg-cyber-success/10 text-cyber-success border-cyber-success/20" : "bg-cyber-warning/10 text-cyber-warning border-cyber-warning/20"
                    )}>{action.status}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed max-w-4xl group-hover:text-slate-300 transition-colors">
                    {action.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="flex items-center gap-3 animate-pulse">
            <span className="text-slate-600 font-bold">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-cyber-accent font-bold">AWAITING_NEXT_EVENT</span>
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-cyber-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
