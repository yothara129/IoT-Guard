import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Cpu, 
  Lock, 
  ChevronRight, 
  Bell, 
  User,
  Globe,
  ChevronDown,
  Wifi,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar, type DashboardTab } from './components/Sidebar';
import { Overview } from './components/pages/Overview';
import { DevicesPage } from './components/pages/Devices';
import { IntelligencePage } from './components/pages/Intelligence';
import { TrafficPage } from './components/pages/Traffic';
import { LogsPage } from './components/pages/Logs';
import { cn } from './utils';

// --- Mock Data ---
const DEVICES_DROPDOWN = ['All Devices', 'Smart Router', 'Living Room Camera', 'Smart Lock', 'Kitchen Hub', 'Thermostat'];

// --- Components ---

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Enterprise IoT Protection",
      description: "Secure your smart environment with autonomous agentic intelligence. Professional-grade security for the modern home.",
      icon: <Shield className="w-24 h-24 text-cyber-accent" />,
      bg: "bg-blue-900/5"
    },
    {
      title: "Autonomous Decision Making",
      description: "Our AI agents perceive threats, reason through complex attack vectors, and act within milliseconds to protect your data.",
      icon: <Cpu className="w-24 h-24 text-cyber-warning" />,
      bg: "bg-amber-900/5"
    },
    {
      title: "Privacy First Architecture",
      description: "End-to-end encryption and local-first processing ensure your home remains your private sanctuary.",
      icon: <Lock className="w-24 h-24 text-cyber-success" />,
      bg: "bg-emerald-900/5"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-bg overflow-hidden">
      <div className="scanline" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "w-full max-w-4xl p-16 rounded-[2rem] border border-cyber-border flex flex-col items-center text-center relative overflow-hidden glass-panel",
            slides[currentSlide].bg
          )}
        >
          <div className="mb-10 p-8 rounded-3xl bg-cyber-bg border border-cyber-border shadow-2xl">
            {slides[currentSlide].icon}
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-14 leading-relaxed">
            {slides[currentSlide].description}
          </p>
          
          <div className="flex gap-6 w-full max-w-md">
            <button 
              onClick={onComplete}
              className="flex-1 py-4 px-8 rounded-2xl border border-white/10 text-slate-400 hover:bg-white/5 transition-all font-semibold"
            >
              Skip
            </button>
            <button 
              onClick={nextSlide}
              className="flex-1 py-4 px-8 rounded-2xl bg-cyber-accent text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-3"
            >
              {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-16 flex gap-3">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-500",
                  i === currentSlide ? "w-10 bg-cyber-accent" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const AuthModal = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg p-12 bg-cyber-card rounded-[2.5rem] border border-cyber-border shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-accent to-transparent opacity-50" />
        
        <div className="flex justify-center mb-10">
          <div className="p-5 rounded-3xl bg-cyber-accent/5 border border-cyber-accent/20">
            <Shield className="w-12 h-12 text-cyber-accent" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-3">Enterprise Login</h2>
        <p className="text-slate-500 text-center mb-10">Access your secure IoT management console</p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">Identity</label>
            <input 
              type="email" 
              placeholder="admin@enterprise.ai"
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyber-accent/20 focus:border-cyber-accent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">Access Key</label>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyber-accent/20 focus:border-cyber-accent transition-all"
            />
          </div>
          <button 
            onClick={onLogin}
            className="w-full py-5 bg-cyber-accent text-white font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all mt-6 text-lg"
          >
            Authenticate
          </button>
          <div className="flex justify-between items-center text-sm text-slate-500 mt-8 px-2">
            <span className="cursor-pointer hover:text-cyber-accent transition-colors">Forgot Key?</span>
            <span className="cursor-pointer hover:text-cyber-accent transition-colors">Request Access</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [selectedDevice, setSelectedDevice] = useState(DEVICES_DROPDOWN[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState<'Active' | 'Monitoring' | 'Resolving'>('Monitoring');

  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: ('Active' | 'Monitoring' | 'Resolving')[] = ['Active', 'Monitoring', 'Resolving'];
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview status={status} onNavigate={setActiveTab} />;
      case 'devices': return <DevicesPage />;
      case 'intelligence': return <IntelligencePage />;
      case 'traffic': return <TrafficPage />;
      case 'logs': return <LogsPage />;
      case 'settings': return (
        <div className="p-12 bg-cyber-card border border-cyber-border rounded-[2.5rem] glass-panel text-center">
          <Settings className="w-16 h-16 text-slate-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
          <p className="text-slate-500">Configuration options for the Agentic AI core and network protocols.</p>
        </div>
      );
      default: return <Overview status={status} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-cyber-bg overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-12 glass-panel z-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-64 px-5 py-2.5 bg-black/20 border border-white/5 rounded-xl text-slate-300 hover:border-cyber-accent transition-all"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-cyber-accent" />
                  <span className="font-semibold text-sm">{selectedDevice}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isDropdownOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-cyber-card border border-cyber-border rounded-xl overflow-hidden z-30 shadow-2xl glass-panel"
                  >
                    {DEVICES_DROPDOWN.map((device) => (
                      <button
                        key={device}
                        onClick={() => {
                          setSelectedDevice(device);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-5 py-3.5 hover:bg-cyber-accent/10 hover:text-cyber-accent transition-colors text-sm font-medium"
                      >
                        {device}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-cyber-success/5 border border-cyber-success/10 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-cyber-success animate-pulse" />
              <span className="text-[10px] font-bold text-cyber-success uppercase tracking-widest">System Secure</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2.5 text-slate-400 hover:text-white transition-all relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyber-danger rounded-full ring-2 ring-cyber-bg" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">Security Admin</p>
                <p className="text-[10px] text-slate-500 font-mono">ID: 8842-X</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyber-accent to-blue-700 flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'onboarding' | 'auth' | 'dashboard'>('onboarding');

  return (
    <div className="min-h-screen selection:bg-cyber-accent/30 selection:text-white">
      <AnimatePresence mode="wait">
        {view === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Onboarding onComplete={() => setView('auth')} />
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthModal onLogin={() => setView('dashboard')} />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Dashboard onLogout={() => setView('auth')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
