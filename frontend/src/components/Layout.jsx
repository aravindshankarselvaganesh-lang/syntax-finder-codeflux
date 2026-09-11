import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Activity, MapPin, BarChart2, FileText, Bell, Sparkles, Settings,
  AlertTriangle, BrainCircuit, Database, ChevronDown, Droplet, BookOpen
} from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex h-screen bg-bgMain text-textMain overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-bgPanel flex flex-col border-r border-borderC">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-borderC shrink-0">
          <Droplet className="text-brandBlue mr-3" fill="currentColor" size={24} />
          <span className="text-xl font-bold tracking-wide">NWIS</span>
        </div>
        
        {/* Nav */}
        <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
          <NavItem to="/" icon={<Activity size={20} />} label="Live Operations" />
          <NavItem to="/sites" icon={<MapPin size={20} />} label="Global Assets" />
          <NavItem to="/analytics" icon={<BarChart2 size={20} />} label="Telemetry Analytics" />
          <NavItem to="/insights" icon={<BrainCircuit size={20} />} label="AI Predictor" />
          <NavItem to="/alerts" icon={<AlertTriangle size={20} />} label="Critical Alerts" />
          <NavItem to="/intelligence" icon={<Database size={20} />} label="Intelligence Base" />
          <NavItem to="/reports" icon={<FileText size={20} />} label="Daily Reports" />
          <NavItem to="/settings" icon={<Settings size={20} />} label="System Settings" />
        </nav>

        {/* Footer Logo */}
        <div className="p-6 border-t border-borderC shrink-0">
          <div className="flex items-center space-x-3 text-xs text-textMuted">
            <div className="w-8 h-8 rounded-full border border-borderC flex items-center justify-center">
              <div className="w-4 h-4 bg-accentRed rounded-full" />
            </div>
            <div>
              <p className="font-semibold text-textMain">Enterprise Operations</p>
              <p className="scale-90 origin-left whitespace-nowrap">Energy Intelligence Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-bgPanel flex items-center justify-between px-6 border-b border-borderC shrink-0">
          <div>
            <h1 className="text-sm font-semibold">Intelligent Drilling Intelligence System</h1>
            <p className="text-xs text-textMuted">Global Energy Operations</p>
          </div>
          <div className="flex items-center space-x-6 text-sm text-textMuted hidden md:flex">
            <span>Smarter Insights</span>
            <span>Faster Responses</span>
            <span>Zero Failures</span>
          </div>

          <div className="flex items-center space-x-4">
            <NavLink to="/manual" className="flex items-center gap-2 text-sm text-brandBlue hover:text-white bg-brandBlue/10 hover:bg-brandBlue px-4 py-2 rounded-lg border border-brandBlue/20 transition-colors font-medium">
              <BookOpen size={16} /> User Manual
            </NavLink>
            <button className="text-textMuted hover:text-white transition-colors relative p-2">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accentRed rounded-full border-2 border-bgPanel"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-hidden p-6 relative">
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
