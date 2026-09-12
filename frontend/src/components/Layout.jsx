import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Activity, MapPin, BarChart2, FileText, Bell, Sparkles, Settings,
  AlertTriangle, BrainCircuit, Database, ChevronDown, Droplet, BookOpen, ShieldAlert, Users, X, Menu, Mail, Phone
} from 'lucide-react';
import bgHero from '../assets/bg-hero.jpg';

export default function Layout() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showDrillPopUp, setShowDrillPopUp] = useState(false);
  const [showRiskPopUp, setShowRiskPopUp] = useState(false);
  const [showAboutPopUp, setShowAboutPopUp] = useState(false);
  const [riskSearchQuery, setRiskSearchQuery] = useState('');
  const [riskSearchResult, setRiskSearchResult] = useState(null);
  const [isSearchingRisk, setIsSearchingRisk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifRef = useRef(null);
  const drillRef = useRef(null);
  const riskRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
      if (drillRef.current && !drillRef.current.contains(event.target)) {
        setShowDrillPopUp(false);
      }
      if (riskRef.current && !riskRef.current.contains(event.target)) {
        setShowRiskPopUp(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setShowAboutPopUp(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRiskSearch = (e) => {
    e.preventDefault();
    if (!riskSearchQuery.trim()) return;
    
    setIsSearchingRisk(true);
    setRiskSearchResult(null);
    
    setTimeout(() => {
      const query = riskSearchQuery.toLowerCase();
      if (query.includes('assam') || query.includes('as-07')) {
        setRiskSearchResult({
          status: 'high',
          title: 'Assam-07 High-Risk Field',
          description: 'Geomechanical fault-line instability detected. High ROP drop and torque spike indicates pipe sticking and kick vulnerability.',
          action: 'Inspect ECD and mud weight immediately.'
        });
      } else if (query.includes('gujarat') || query.includes('cambay')) {
        setRiskSearchResult({
          status: 'medium',
          title: 'Cambay Basin Georisk',
          description: 'Moderate pore pressure anomaly detected in fractured carbonate reservoir.',
          action: 'Prepare LCM pills for lost circulation.'
        });
      } else {
        setRiskSearchResult({
          status: 'safe',
          title: 'Safe Clearance',
          description: `Current telemetry at ${riskSearchQuery} shows stable parameters with no critical fault lines detected in the immediate vicinity.`,
          action: 'Safe to proceed with normal operations.'
        });
      }
      setIsSearchingRisk(false);
    }, 1200);
  };

  return (
    <div className="flex h-[100dvh] bg-bgMain text-textMain font-sans overflow-hidden relative">
      
      {/* DIRECT VISUAL REFINERY BACKGROUND LAYER */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-55 animate-slow-zoom"
        style={{ backgroundImage: `url(${bgHero})` }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#060B14]/40 via-[#060B14]/75 to-[#060B14]/92"
      />
      
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
            <img 
              src="/logo.png" 
              alt="PSM Probing Snag Map" 
              className="h-9 object-contain mix-blend-screen cursor-pointer" 
              onClick={() => {
                if (window.location.pathname === '/') {
                  window.dispatchEvent(new Event('triggerMapScan'));
                }
              }}
            />
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
        <header className="h-16 bg-bgPanel border-b border-borderC flex items-center justify-between px-4 sm:px-8 shrink-0 z-[1000] relative">
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
          <div className="hidden md:flex gap-8 text-xs font-bold text-textMuted uppercase tracking-widest relative">
            <div className="relative" ref={drillRef}>
              <button 
                onClick={() => setShowDrillPopUp(!showDrillPopUp)} 
                className={`transition-colors uppercase tracking-widest cursor-pointer ${showDrillPopUp ? 'text-white' : 'hover:text-white'}`}
              >
                Understand the Drill.
              </button>
              
              {showDrillPopUp && (
                <div className="absolute top-full left-0 mt-6 w-80 bg-bgCard border border-borderC rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[9999] p-4 animate-in fade-in slide-in-from-top-2 normal-case tracking-normal text-textMain before:content-[''] before:absolute before:-top-2 before:left-8 before:w-4 before:h-4 before:bg-bgCard before:border-t before:border-l before:border-borderC before:rotate-45">
                  <h3 className="font-bold text-sm text-brandBlue mb-2 flex items-center gap-2">
                    <BookOpen size={16} /> Understanding The Drill
                  </h3>
                  <p className="text-xs text-textMuted leading-relaxed mb-4">
                    Learn the core principles of petroleum engineering, well control operations, and drilling risk mitigation.
                  </p>
                  
                  <div className="space-y-2">
                    <a href="https://www.youtube.com/results?search_query=how+oil+drilling+works" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 rounded-lg bg-bgPanel border border-borderC hover:border-brandBlue transition-colors group">
                      <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-textMain group-hover:text-brandBlue transition-colors">How Oil Drilling Works</div>
                        <div className="text-[10px] text-textMuted mt-0.5">YouTube Fundamentals</div>
                      </div>
                    </a>
                    
                    <a href="https://www.youtube.com/results?search_query=blowout+preventer+animation+explained" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 rounded-lg bg-bgPanel border border-borderC hover:border-brandBlue transition-colors group">
                      <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-textMain group-hover:text-brandBlue transition-colors">Well Control & BOPs</div>
                        <div className="text-[10px] text-textMuted mt-0.5">YouTube Safety Case</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={riskRef}>
              <button 
                onClick={() => setShowRiskPopUp(!showRiskPopUp)} 
                className={`transition-colors uppercase tracking-widest cursor-pointer flex items-center ${showRiskPopUp ? 'text-white' : 'hover:text-white'}`}
              >
                See the current drilling and risk
              </button>
              
              {showRiskPopUp && (
                <div className="absolute top-full left-0 mt-6 w-80 bg-bgCard border border-borderC rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[9999] p-4 animate-in fade-in slide-in-from-top-2 normal-case tracking-normal text-textMain before:content-[''] before:absolute before:-top-2 before:left-8 before:w-4 before:h-4 before:bg-bgCard before:border-t before:border-l before:border-borderC before:rotate-45">
                  <h3 className="font-bold text-sm text-brandBlue mb-2 flex items-center gap-2">
                    <Activity size={16} /> Live Risk Assessment
                  </h3>
                  <p className="text-xs text-textMuted leading-relaxed mb-4">
                    Enter any global mining or drilling location to fetch real-time geomechanical stability telemetry.
                  </p>
                  
                  <form onSubmit={handleRiskSearch} className="mb-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="e.g. Assam, Macondo, Cambay..." 
                        className="w-full bg-bgMain border border-borderC rounded-md pl-3 pr-10 py-2 text-xs focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue/50 text-white placeholder-textMuted/50"
                        value={riskSearchQuery}
                        onChange={(e) => setRiskSearchQuery(e.target.value)}
                      />
                      <button type="submit" className="absolute right-2 top-1.5 text-textMuted hover:text-brandBlue transition-colors">
                        {isSearchingRisk ? <div className="w-4 h-4 border-2 border-brandBlue border-t-transparent rounded-full animate-spin"></div> : <Activity size={14} />}
                      </button>
                    </div>
                  </form>

                  {riskSearchResult && (
                    <div className={`p-3 rounded-md border ${riskSearchResult.status === 'danger' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'} animate-in fade-in slide-in-from-bottom-2`}>
                      <div className={`flex items-center gap-2 text-xs font-bold mb-1 ${riskSearchResult.status === 'danger' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {riskSearchResult.status === 'danger' ? <AlertTriangle size={14} /> : <ShieldAlert size={14} />}
                        {riskSearchResult.title}
                      </div>
                      <p className="text-[10px] text-textMuted mb-2">{riskSearchResult.description}</p>
                      <div className={`text-[10px] font-semibold ${riskSearchResult.status === 'danger' ? 'text-red-300' : 'text-emerald-300'}`}>
                        Action: {riskSearchResult.action}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative" ref={aboutRef}>
              <button 
                onClick={() => setShowAboutPopUp(!showAboutPopUp)} 
                className={`transition-colors uppercase tracking-widest cursor-pointer flex items-center ${showAboutPopUp ? 'text-white' : 'hover:text-white'}`}
              >
                About
              </button>
              
              {showAboutPopUp && (
                <div className="absolute top-full right-0 md:left-0 md:right-auto mt-6 w-64 bg-bgCard border border-borderC rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[9999] p-4 animate-in fade-in slide-in-from-top-2 normal-case tracking-normal text-textMain before:content-[''] before:absolute before:-top-2 before:right-8 md:before:left-8 md:before:right-auto before:w-4 before:h-4 before:bg-bgCard before:border-t before:border-l before:border-borderC before:rotate-45">
                  <h3 className="font-bold text-sm text-brandBlue mb-4 flex items-center gap-2">
                    <Users size={16} /> Team Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] text-textMuted uppercase font-semibold mb-1">Team Name</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles size={14} className="text-accentYellow" /> Syntax Finder
                      </div>
                    </div>
                    
                    <div className="h-px w-full bg-borderC"></div>
                    
                    <div className="space-y-3">
                      <div className="text-[10px] text-textMuted uppercase font-semibold">Contact Details</div>
                      
                      <a href="mailto:mirfawad1@gmail.com" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-brandBlue/10 flex items-center justify-center shrink-0 group-hover:bg-brandBlue/20 transition-colors">
                          <Mail className="w-4 h-4 text-brandBlue" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-textMain group-hover:text-brandBlue transition-colors">Email Us</div>
                          <div className="text-[10px] text-textMuted font-mono">mirfawad1@gmail.com</div>
                        </div>
                      </a>
                      
                      <a href="tel:6006624246" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-accentGreen/10 flex items-center justify-center shrink-0 group-hover:bg-accentGreen/20 transition-colors">
                          <Phone className="w-4 h-4 text-accentGreen" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-textMain group-hover:text-accentGreen transition-colors">Call Us</div>
                          <div className="text-[10px] text-textMuted font-mono">600 662 4246</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
