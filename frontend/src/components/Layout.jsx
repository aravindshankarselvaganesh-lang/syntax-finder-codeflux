import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Activity, MapPin, BarChart2, FileText, Bell, Sparkles, Settings,
  AlertTriangle, BrainCircuit, Database, ChevronDown, Droplet, BookOpen, ShieldAlert, Users, X, Menu
} from 'lucide-react';

export default function Layout() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-bgMain text-textMain font-sans overflow-hidden">
      
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 bg-black/80 backdrop-blur-xs z-[9998] md:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-bgPanel border-r border-borderC flex flex-col z-[9999] md:z-30 transition-transform duration-300 md:static md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-borderC shrink-0">
          <div className="flex items-center">
            <img src="/logo.png" alt="PSM Probing Snag Map" className="h-9 object-contain mix-blend-screen" />
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-textMuted hover:text-white cursor-pointer p-1">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto" onClick={() => setMobileMenuOpen(false)}>
          <NavLink to="/" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><MapPin className="mr-3" size={18}/> Global Assets</NavLink>
          <NavLink to="/analytics" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><BarChart2 className="mr-3" size={18}/> Telemetry Analytics</NavLink>
          <NavLink to="/insights" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><BrainCircuit className="mr-3" size={18}/> AI Predictor</NavLink>
          <NavLink to="/alerts" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><AlertTriangle className="mr-3" size={18}/> Critical Alerts</NavLink>
          <NavLink to="/intelligence" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><Database className="mr-3" size={18}/> Intelligence Base</NavLink>
          
          <div className="mt-6 mb-2 px-3 text-xs font-semibold text-textMuted uppercase tracking-wider">Portals</div>
          <NavLink to="/worker" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><ShieldAlert className="mr-3" size={18}/> Worker Safety</NavLink>
          <NavLink to="/community" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><Users className="mr-3" size={18}/> Community Portal</NavLink>
          <NavLink to="/learning" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><BookOpen className="mr-3" size={18}/> Learning Lab</NavLink>
          
          <div className="mt-6 mb-2 px-3 text-xs font-semibold text-textMuted uppercase tracking-wider">System</div>
          <NavLink to="/reports" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><FileText className="mr-3" size={18}/> Daily Reports</NavLink>
          <NavLink to="/settings" className={({isActive}) => `flex items-center px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`}><Settings className="mr-3" size={18}/> System Settings</NavLink>
        </nav>
        
        <div className="p-4 border-t border-borderC">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accentGreen animate-pulse"></div>
            <div className="text-xs">
              <p className="font-semibold">Enterprise Operations</p>
              <p className="text-textMuted">Energy Intelligence Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER */}
        <header className="h-16 bg-bgPanel border-b border-borderC flex items-center justify-between px-4 sm:px-8 shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-textMuted hover:text-white p-1 cursor-pointer">
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-sm sm:text-lg font-bold flex items-center gap-2">
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-extrabold">PSM</span> — Probing Snag Map
              </h2>
              <p className="hidden sm:block text-[10px] sm:text-xs text-brandBlue uppercase tracking-widest font-semibold mt-0.5">Intelligent Drilling & Georisk Intelligence Platform</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold text-textMuted uppercase tracking-widest">
            <span>Understand the Drill.</span>
            <span>Predict the Risk.</span>
            <span>Protect the People.</span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <NavLink to="/manual" className="flex items-center gap-1.5 text-xs sm:text-sm text-brandBlue hover:text-white bg-brandBlue/10 hover:bg-brandBlue px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-brandBlue/20 transition-colors font-medium shrink-0">
              <BookOpen size={16} /> <span className="hidden sm:inline">User Manual</span>
            </NavLink>
            
            <div className="relative" ref={notifRef}>
              <button onClick={() => setShowNotifs(!showNotifs)} className={`text-textMuted hover:text-white transition-colors relative p-2 rounded-full ${showNotifs ? 'bg-white/10' : ''}`}>
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accentRed rounded-full border-2 border-bgPanel"></span>
              </button>
              
              {showNotifs && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-bgCard border border-borderC rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-borderC flex justify-between items-center bg-bgPanel">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <button onClick={() => setShowNotifs(false)} className="text-textMuted hover:text-white"><X size={14}/></button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 border-b border-borderC/50 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <AlertTriangle className="text-accentRed shrink-0 mt-0.5" size={16}/>
                        <div>
                          <p className="text-sm font-semibold text-white">Assam-07 Pressure Anomaly</p>
                          <p className="text-xs text-textMuted mt-1">High risk of wellbore instability detected. AI recommends checking mud weight.</p>
                          <p className="text-[10px] text-textMuted mt-2">Just now</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <Sparkles className="text-brandBlue shrink-0 mt-0.5" size={16}/>
                        <div>
                          <p className="text-sm font-semibold text-white">New Risk Model Deployed</p>
                          <p className="text-xs text-textMuted mt-1">Canonical Data Catalog successfully ingested and synced globally.</p>
                          <p className="text-[10px] text-textMuted mt-2">2h ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-hidden p-3 sm:p-6 relative">
          <Outlet />
        </main>
        
        {/* APP FOOTER */}
        <footer className="h-10 bg-bgPanel border-t border-borderC flex items-center justify-between px-6 text-[10px] text-textMuted shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accentGreen shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div> System Online</span>
            <span>|</span>
            <span>Last updated: 11 Sep 2026, 16:33 IST</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by AI</span>
            <span>|</span>
            <span>Built for a Smarter Tomorrow</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

function NavItem({ to, icon, label, badge }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center justify-between px-4 py-2.5 rounded-lg mb-1 cursor-pointer transition-colors ${isActive ? 'bg-brandBlue text-white' : 'text-textMuted hover:bg-white/5 hover:text-textMain'}`
      }
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-accentRed text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
      )}
    </NavLink>
  );
}
