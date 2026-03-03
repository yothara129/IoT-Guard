import React from 'react';
import { 
  Activity, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Info,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '../../utils';

const TRAFFIC_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  inbound: Math.floor(Math.random() * 100) + 20,
  outbound: Math.floor(Math.random() * 60) + 10,
}));

const THREATS = [
  { id: 1, device: 'Smart Bulb', message: 'Anomalous data upload blocked', severity: 'medium', time: '2m ago', type: 'Data Leak' },
  { id: 2, device: 'Smart Router', message: 'Brute force attempt detected', severity: 'high', time: '15m ago', type: 'Intrusion' },
  { id: 3, device: 'Living Room Camera', message: 'Unauthorized access attempt', severity: 'high', time: '1h ago', type: 'Privacy' },
];

const ACTIONS = [
  { id: 1, action: 'Isolated Device', target: 'MAC: 00:1A:2B:3C:4D:5E', time: '10:45:22', status: 'SUCCESS' },
  { id: 2, action: 'Blocked IP', target: '192.168.1.105', time: '10:42:15', status: 'SUCCESS' },
  { id: 3, action: 'Encrypted Tunnel', target: 'Camera Stream #4', time: '10:30:01', status: 'SUCCESS' },
];

const SCORE_DATA = [
  { name: 'Secure', value: 85 },
  { name: 'Vulnerable', value: 15 },
];

const COLORS = ['#3b82f6', '#1e293b'];

interface OverviewProps {
  status: string;
  onNavigate: (tab: any) => void;
}

export const Overview = ({ status, onNavigate }: OverviewProps) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 preserve-3d">
        
        {/* Security Score Gauge */}
        <section 
          onClick={() => onNavigate('intelligence')}
          className="col-span-1 md:col-span-2 lg:col-span-3 bg-cyber-card rounded-[2rem] border border-cyber-border p-8 card-3d flex flex-col items-center justify-center text-center cursor-pointer"
        >
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 w-full text-left">Security Score</h3>
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SCORE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {SCORE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white tracking-tighter">85</span>
              <span className="text-[10px] uppercase font-bold text-cyber-accent tracking-widest">Optimal</span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            <div className="text-left">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Risk Level</p>
              <p className="text-sm font-bold text-cyber-success">Minimal</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Last Audit</p>
              <p className="text-sm font-bold text-white">12m ago</p>
            </div>
          </div>
        </section>

        {/* Widget A: System Status */}
        <section className="col-span-1 md:col-span-2 lg:col-span-3 bg-cyber-card rounded-[2rem] border border-cyber-border p-8 card-3d flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity className="w-32 h-32 text-cyber-accent" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-10">Agent Status</h3>
            <div className="flex items-center gap-6 mb-6">
              <div className={cn(
                "w-5 h-5 rounded-full",
                status === 'Active' ? "bg-cyber-success shadow-[0_0_20px_#10b981]" : 
                status === 'Monitoring' ? "bg-cyber-accent shadow-[0_0_20px_#3b82f6]" : 
                "bg-cyber-danger shadow-[0_0_20px_#ef4444]"
              )} />
              <span className="text-4xl font-bold text-white tracking-tight">{status}</span>
            </div>
            <p className="text-base text-slate-400 leading-relaxed">
              {status === 'Active' && "AI agents are proactively securing all nodes."}
              {status === 'Monitoring' && "Analyzing network packets for behavioral anomalies."}
              {status === 'Resolving' && "Neutralizing unauthorized access attempt on Node-04."}
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-end">
            <div className="flex gap-1.5 h-12 items-end">
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className="w-2 bg-cyber-accent/10 rounded-full overflow-hidden">
                  <div className="w-full bg-cyber-accent h-[40%]" />
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-slate-500 uppercase">System Uptime</p>
              <p className="text-sm font-mono text-cyber-accent font-bold">142:12:05:11</p>
            </div>
          </div>
        </section>

        {/* Widget C: Network Traffic */}
        <section 
          onClick={() => onNavigate('traffic')}
          className="col-span-1 md:col-span-2 lg:col-span-6 bg-cyber-card rounded-[2rem] border border-cyber-border p-8 card-3d cursor-pointer"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Global Traffic Analysis</h3>
            <div className="flex gap-6">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-cyber-accent" />
                <span className="text-xs font-bold text-slate-400">Inbound</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-cyber-warning" />
                <span className="text-xs font-bold text-slate-400">Outbound</span>
              </div>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAFFIC_DATA}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141820', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="inbound" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIn)" strokeWidth={3} />
                <Area type="monotone" dataKey="outbound" stroke="#f59e0b" fillOpacity={1} fill="url(#colorOut)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="col-span-1 md:col-span-2 lg:col-span-4 bg-cyber-card rounded-[2rem] border border-cyber-border p-8 card-3d flex flex-col gap-6">
          <div 
            onClick={() => onNavigate('intelligence')}
            className="flex-1 p-6 bg-black/20 rounded-2xl border border-white/5 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-all"
          >
            <div className="p-3 bg-cyber-accent/10 rounded-xl">
              <Zap className="w-6 h-6 text-cyber-accent" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Threats Blocked</p>
              <p className="text-3xl font-bold text-white">1,284</p>
            </div>
          </div>
          <div 
            onClick={() => onNavigate('devices')}
            className="flex-1 p-6 bg-black/20 rounded-2xl border border-white/5 flex items-center gap-6 cursor-pointer hover:bg-white/5 transition-all"
          >
            <div className="p-3 bg-cyber-success/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-cyber-success" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Devices Secure</p>
              <p className="text-3xl font-bold text-white">24 / 24</p>
            </div>
          </div>
        </section>

        {/* Widget B: Active Threats/Alerts */}
        <section 
          onClick={() => onNavigate('intelligence')}
          className="col-span-1 md:col-span-2 lg:col-span-4 bg-cyber-card rounded-[2rem] border border-cyber-border p-8 card-3d cursor-pointer"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Security Intelligence</h3>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
          <div className="space-y-4">
            {THREATS.map((threat) => (
              <div key={threat.id} className="p-5 bg-black/20 rounded-2xl border border-white/5 flex items-start justify-between group hover:bg-white/[0.02] transition-all">
                <div className="flex gap-5">
                  <div className={cn(
                    "p-3 rounded-xl mt-1",
                    threat.severity === 'high' ? "bg-cyber-danger/10 text-cyber-danger" : 
                    threat.severity === 'medium' ? "bg-cyber-warning/10 text-cyber-warning" : 
                    "bg-cyber-success/10 text-cyber-success"
                  )}>
                    {threat.severity === 'high' ? <ShieldAlert className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-white">{threat.device}</p>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">{threat.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Widget D: Agent Actions */}
        <section 
          onClick={() => onNavigate('logs')}
          className="col-span-1 md:col-span-2 lg:col-span-4 bg-cyber-card rounded-[2rem] border border-cyber-border p-8 card-3d overflow-hidden flex flex-col cursor-pointer"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Agent Execution Log</h3>
            <Terminal className="w-4 h-4 text-cyber-accent" />
          </div>
          <div className="flex-1 bg-black/40 rounded-2xl p-6 font-mono text-[10px] space-y-3 border border-white/5 overflow-hidden">
            {ACTIONS.map((action) => (
              <div key={action.id} className="flex flex-col gap-1 py-1 border-b border-white/5 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">[{action.time}]</span>
                  <span className={cn(
                    "text-[8px] font-bold px-1.5 py-0.5 rounded",
                    action.status === 'SUCCESS' ? "bg-cyber-success/10 text-cyber-success" : "bg-cyber-warning/10 text-cyber-warning"
                  )}>{action.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyber-accent font-bold">{action.action}</span>
                  <span className="text-slate-300 truncate">{action.target}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
