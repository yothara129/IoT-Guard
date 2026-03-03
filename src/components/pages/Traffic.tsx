import React from 'react';
import { 
  Activity, 
  Globe, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  Calendar,
  Download,
  Filter,
  Zap,
  Shield
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../../utils';

const TRAFFIC_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  inbound: Math.floor(Math.random() * 100) + 20,
  outbound: Math.floor(Math.random() * 60) + 10,
  threats: Math.floor(Math.random() * 5),
}));

const STATS = [
  { label: 'Total Inbound', value: '42.8 GB', icon: <ArrowDown className="w-5 h-5 text-cyber-accent" />, trend: '+12%' },
  { label: 'Total Outbound', value: '18.4 GB', icon: <ArrowUp className="w-5 h-5 text-cyber-warning" />, trend: '+5%' },
  { label: 'Peak Traffic', value: '1.2 Gbps', icon: <Zap className="w-5 h-5 text-cyber-success" />, trend: '-2%' },
  { label: 'Blocked Attacks', value: '1,284', icon: <Shield className="w-5 h-5 text-cyber-danger" />, trend: '+18%' },
];

export const TrafficPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Traffic Analytics</h2>
          <p className="text-slate-500 mt-1">Comprehensive analysis of network throughput and security events.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-cyber-card border border-cyber-border rounded-xl p-1">
            <button className="px-4 py-1.5 bg-cyber-accent text-white rounded-lg text-xs font-bold">24h</button>
            <button className="px-4 py-1.5 text-slate-500 hover:text-white rounded-lg text-xs font-bold transition-all">7d</button>
            <button className="px-4 py-1.5 text-slate-500 hover:text-white rounded-lg text-xs font-bold transition-all">30d</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-cyber-card border border-cyber-border rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">
            <Download className="w-4 h-4" />
            Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-cyber-card border border-cyber-border rounded-[2rem] p-8 card-3d">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-white/5 rounded-2xl">
                {stat.icon}
              </div>
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-lg",
                stat.trend.startsWith('+') ? "bg-cyber-success/10 text-cyber-success" : "bg-cyber-danger/10 text-cyber-danger"
              )}>{stat.trend}</span>
            </div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-cyber-card border border-cyber-border rounded-[2.5rem] p-10 card-3d">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-bold text-white">Throughput History</h3>
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
          <div className="h-[400px] w-full">
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
        </div>

        <div className="bg-cyber-card border border-cyber-border rounded-[2.5rem] p-10 card-3d">
          <h3 className="text-lg font-bold text-white mb-10">Threat Distribution</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRAFFIC_DATA.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#141820', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                />
                <Bar dataKey="threats" radius={[4, 4, 0, 0]}>
                  {TRAFFIC_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.threats > 3 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
            Distribution of blocked security events per hour. Red bars indicate high-volume anomaly periods.
          </p>
        </div>
      </div>
    </div>
  );
};
