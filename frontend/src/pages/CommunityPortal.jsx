import React, { useState } from 'react';
import { 
  Users, Wind, Droplets, ShieldAlert, AlertTriangle, PhoneCall, Radio, 
  MapPin, CheckCircle2, Flame, Volume2, HelpCircle, Send, X, Bell, 
  Info, Compass, ChevronRight, Check
} from 'lucide-react';

const EMERGENCY_PROTOCOLS = [
  {
    id: 'h2s',
    category: 'Gas Leak / H2S',
    icon: Wind,
    color: 'border-accentRed text-accentRed bg-accentRed/10',
    title: 'H₂S / Toxic Gas Emergency Protocol',
    signal: 'Continuous Oscillating Horn (3 Short, 1 Long Blast)',
    steps: [
      'Immediately check wind direction (look at wind sock or dust movement) and move crosswind/upwind.',
      'Seek higher ground — H₂S gas is heavier than air and settles in low-lying ditches and valleys.',
      'If trapped indoors: Close all windows, doors, and shut down air conditioning / HVAC ventilation systems.',
      'Cover nose and mouth with a wet damp cloth or N95 mask.',
      'Do NOT use matches, lighters, or open flames — natural gas and H₂S are highly flammable.'
    ],
    hotline: '1800-555-H2S-HELP'
  },
  {
    id: 'fire',
    category: 'Fire / Flaring Alert',
    icon: Flame,
    color: 'border-amber-500 text-amber-500 bg-amber-500/10',
    title: 'Flaring & Thermal Heat Radiation Safety',
    signal: 'Intermittent High Flare Stack Glow & Controlled Sound',
    steps: [
      'Maintain a minimum safety distance of 500 meters from rig boundary during controlled emergency flaring.',
      'Keep livestock and pets secured inside sheltered barns or covered enclosures.',
      'Wear natural cotton clothing rather than synthetic fabrics when outside during flaring advisories.',
      'Report any unexpected black smoke or heat radiation outside designated flare stacks immediately.'
    ],
    hotline: '1800-555-FIRE-DEPT'
  },
  {
    id: 'siren',
    category: 'Sirens & Alarms',
    icon: Volume2,
    color: 'border-brandBlue text-brandBlue bg-brandBlue/10',
    title: 'Rig Siren Code & Alarm Decoding Guide',
    signal: 'Audible Rig Sirens & Public Broadcast Horns',
    steps: [
      '1 Continuous Long Siren (3 minutes): ALL CLEAR — Normal operations resumed.',
      'Intermittent Repeating Beeps (30 secs on / 30 secs off): ADVISORY — Controlled maintenance or flaring in progress.',
      'Wailing Oscillating Siren (Continuous): EMERGENCY EVACUATION — Proceed to designated Assembly Shelter immediately.',
      'Tune emergency FM Radio to 104.5 MHz for official district disaster voice updates.'
    ],
    hotline: '1800-444-SIREN'
  },
  {
    id: 'water',
    category: 'Water & Chemical',
    icon: Droplets,
    color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    title: 'Groundwater & Chemical Spill Advisory',
    signal: 'Visual Discoloration, Odor, or Public Water Notice',
    steps: [
      'Do not consume borewell or open river water if unusual odor, oily sheen, or discoloration is detected.',
      'Use free drinking water distribution points set up at Community Assembly Centers.',
      'Report chemical odors or agricultural run-off near well pads immediately to environmental inspectors.',
      'Free residential water testing is available upon request via the PSM Environmental Helpline.'
    ],
    hotline: '1800-444-ENV-WATER'
  }
];

const ASSEMBLY_SHELTERS = [
  { name: 'Upper Assam Sector 4 Primary School Shelter', distance: '1.8 km North-East', capacity: '500 Persons', status: 'OPEN & SAFE', lead: 'District Defense Officer (94350-12345)' },
  { name: 'Cambay Community Center & Safety Hub', distance: '3.2 km West', capacity: '800 Persons', status: 'OPEN & SAFE', lead: 'HSE Safety Officer (98250-67890)' },
  { name: 'Barmer Basin Emergency Relief Station', distance: '4.5 km South-East', capacity: '1,200 Persons', status: 'STANDBY', lead: 'Civil Defense Coordinator (94140-54321)' }
];

export default function CommunityPortal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportForm, setReportForm] = useState({ type: 'Smell / Gas Odor', location: '', desc: '', contact: '' });
  
  const [simulatedAlert, setSimulatedAlert] = useState(false);

  const [checklistState, setChecklistState] = useState({
    knowAssembly: true,
    radioTuned: false,
    wetClothReady: true,
    registeredSMS: true,
    emergencyBag: false
  });

  const toggleCheck = (key) => {
    setChecklistState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setShowReportModal(false);
      setReportForm({ type: 'Smell / Gas Odor', location: '', desc: '', contact: '' });
    }, 2000);
  };

  const filteredProtocols = activeCategory === 'All' 
    ? EMERGENCY_PROTOCOLS 
    : EMERGENCY_PROTOCOLS.filter(p => p.category === activeCategory);

  const completedChecklistCount = Object.values(checklistState).filter(Boolean).length;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-full flex items-center justify-center animate-in fade-in">
        <div className="bg-bgCard border border-borderC rounded-xl p-8 shadow-2xl max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brandBlue/10 rounded-full flex items-center justify-center">
              <Users className="text-brandBlue" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Community Portal Access</h2>
          <p className="text-textMuted text-sm text-center mb-8">Please log in with your resident or agency credentials to access safety protocols.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Username / ID</label>
              <input 
                type="text" 
                className="w-full bg-bgPanel border border-borderC rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brandBlue transition-colors"
                placeholder="Enter your ID"
                value={loginForm.username}
                onChange={e => { setLoginForm({...loginForm, username: e.target.value}); setLoginError(false); }}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Password</label>
              <input 
                type="password" 
                className="w-full bg-bgPanel border border-borderC rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brandBlue transition-colors"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={e => { setLoginForm({...loginForm, password: e.target.value}); setLoginError(false); }}
                required
              />
            </div>
            {loginError && (
              <div className="text-accentRed text-xs font-bold bg-accentRed/10 p-2 rounded border border-accentRed/20 flex items-center gap-2">
                <AlertTriangle size={14} /> Invalid credentials. Please use admin / admin.
              </div>
            )}
            <button 
              type="submit"
              className="w-full bg-brandBlue hover:bg-blue-600 text-white font-bold text-sm px-4 py-3 rounded-lg mt-2 shadow-[0_0_15px_rgba(44,129,255,0.3)] transition-all cursor-pointer"
            >
              Sign In to Portal
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-borderC text-center">
            <p className="text-xs text-textMuted flex items-center justify-center gap-1">
              <ShieldAlert size={12} className="text-accentRed" /> In case of immediate emergency, dial 911.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8 pr-2">
      
      {/* HEADER & EMERGENCY STATUS */}
      <div className="bg-bgCard border border-borderC rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Users className="text-brandBlue" size={28}/> 
            Community Safety & Crisis Response Portal
          </h2>
          <p className="text-textMuted text-sm mt-1 max-w-2xl">
            Official public safety protocols, emergency instructions, live environmental sensors, and evacuation guidance for communities near drilling operations.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={() => setShowReportModal(true)}
            className="flex-1 md:flex-none bg-brandBlue hover:bg-blue-600 text-white font-bold text-sm px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(44,129,255,0.3)] transition-all cursor-pointer"
          >
            <ShieldAlert size={18} /> Report Community Anomaly
          </button>
          
          <button 
            onClick={() => setSimulatedAlert(!simulatedAlert)}
            className={`px-3 py-2.5 rounded-lg text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
              simulatedAlert 
                ? 'bg-accentRed text-white border-red-500 animate-pulse' 
                : 'bg-bgPanel border-borderC text-textMuted hover:text-white'
            }`}
          >
            <Bell size={14} /> {simulatedAlert ? 'DRILL ACTIVE' : 'TEST SIREN DRILL'}
          </button>
        </div>
      </div>

      {/* LIVE EMERGENCY BANNER IF DRILL / ALERT IS ACTIVE */}
      {simulatedAlert && (
        <div className="bg-accentRed/15 border-2 border-accentRed text-white p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accentRed flex items-center justify-center text-white shrink-0 animate-bounce">
              <Volume2 size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-accentRed text-base uppercase tracking-wider flex items-center gap-2">
                🚨 COMMUNITY SAFETY DRILL IN PROGRESS
              </h4>
              <p className="text-xs text-slate-200 mt-0.5">
                Simulated H₂S gas release alert at Assam-07 site. All nearby sector residents proceed to upwind assembly points.
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <a href="tel:18005557447" className="bg-accentRed hover:bg-red-600 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 shrink-0">
              <PhoneCall size={14} /> Call Hotline
            </a>
            <button onClick={() => setSimulatedAlert(false)} className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 rounded-lg shrink-0 cursor-pointer">
              Dismiss Drill
            </button>
          </div>
        </div>
      )}

      {/* ENVIRONMENTAL SENSORS & PUBLIC METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-bgCard border border-borderC rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-textMuted text-xs font-semibold uppercase mb-1">
              <Wind size={16} className="text-brandBlue"/> Air Quality (AQI)
            </div>
            <p className="text-2xl font-bold text-accentGreen">42 <span className="text-xs font-normal text-textMuted">/ Good (Safe)</span></p>
          </div>
          <div className="w-9 h-9 rounded-full bg-accentGreen/10 flex items-center justify-center text-accentGreen font-bold text-xs">
            AQI
          </div>
        </div>

        <div className="bg-bgCard border border-borderC rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-textMuted text-xs font-semibold uppercase mb-1">
              <Droplets size={16} className="text-brandBlue"/> Groundwater Status
            </div>
            <p className="text-2xl font-bold text-accentGreen">Nominal <span className="text-xs font-normal text-textMuted">(Tested Today)</span></p>
          </div>
          <div className="w-9 h-9 rounded-full bg-accentGreen/10 flex items-center justify-center text-accentGreen font-bold text-xs">
            H₂O
          </div>
        </div>

        <div className="bg-bgCard border border-borderC rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-textMuted text-xs font-semibold uppercase mb-1">
              <Radio size={16} className="text-brandBlue"/> Gas Sensor Perimeter
            </div>
            <p className="text-2xl font-bold text-accentGreen">0.0 ppm <span className="text-xs font-normal text-textMuted">H₂S Level</span></p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brandBlue/10 flex items-center justify-center text-brandBlue font-bold text-xs">
            PPM
          </div>
        </div>

        <div className="bg-bgCard border border-borderC rounded-xl p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-textMuted text-xs font-semibold uppercase mb-1">
              <MapPin size={16} className="text-brandBlue"/> Active Buffer Zone
            </div>
            <p className="text-2xl font-bold text-white">2.5 km <span className="text-xs font-normal text-textMuted">Perimeter Clearance</span></p>
          </div>
          <div className="w-9 h-9 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-xs">
            KM
          </div>
        </div>
      </div>

      {/* SECTION: WHAT TO DO WHEN THINGS GO WRONG (SAFETY INSTRUCTIONS) */}
      <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-borderC pb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <ShieldAlert className="text-accentRed" size={22} /> 
              What to Do When Things Go Wrong (Emergency SOPs)
            </h3>
            <p className="text-textMuted text-xs mt-0.5">
              Step-by-step instructions for citizens and local communities during industrial or drilling emergencies.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Gas Leak / H2S', 'Fire / Flaring', 'Sirens & Alarms', 'Water & Chemical'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-brandBlue text-white shadow-md' 
                    : 'bg-bgPanel border border-borderC text-textMuted hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Protocol Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProtocols.map(proto => {
            const IconComp = proto.icon;
            return (
              <div key={proto.id} className="bg-bgPanel border border-borderC rounded-xl p-5 flex flex-col justify-between hover:border-brandBlue/50 transition-all shadow-md">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-borderC/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg border ${proto.color}`}>
                        <IconComp size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white">{proto.title}</h4>
                        <span className="text-[11px] text-textMuted font-mono uppercase tracking-wider">{proto.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bgCard/80 border border-borderC p-2.5 rounded-lg mb-4 text-xs font-semibold text-brandBlue flex items-center gap-2">
                    <Volume2 size={14} className="shrink-0 text-accentYellow" />
                    <span>Alarm Signal: <strong className="text-white">{proto.signal}</strong></span>
                  </div>

                  <h5 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-2">Required Actions:</h5>
                  <ul className="space-y-2 mb-4 text-xs text-slate-300">
                    {proto.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-4 h-4 rounded-full bg-brandBlue/20 text-brandBlue text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-borderC/60 flex items-center justify-between text-xs">
                  <span className="text-textMuted flex items-center gap-1">
                    <PhoneCall size={12} className="text-brandBlue" /> Emergency Hotline:
                  </span>
                  <a href={`tel:${proto.hotline}`} className="font-mono font-bold text-brandBlue bg-brandBlue/10 hover:bg-brandBlue hover:text-white px-2.5 py-1 rounded border border-brandBlue/20 transition-all">
                    {proto.hotline}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMN SECTION: COMMUNITY READINESS & ASSEMBLY SHELTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Interactive Readiness Checklist */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-borderC pb-3 mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                <CheckCircle2 className="text-accentGreen" size={20} /> 
                Community Household Emergency Readiness
              </h3>
              <span className="text-xs font-bold text-accentGreen bg-accentGreen/10 px-2.5 py-1 rounded-full border border-accentGreen/20">
                {completedChecklistCount} / 5 Completed
              </span>
            </div>

            <p className="text-xs text-textMuted mb-4">
              Complete this safety readiness checklist to ensure your household is prepared in the event of an unexpected industrial emergency.
            </p>

            <div className="space-y-3">
              {[
                { key: 'knowAssembly', label: 'Know location of your nearest Emergency Assembly Shelter', desc: 'Sector primary schools & public centers' },
                { key: 'radioTuned', label: 'Emergency FM Radio tuned to 104.5 MHz', desc: 'Official disaster broadcast frequency' },
                { key: 'wetClothReady', label: 'Damp cloth or N95 masks accessible for family', desc: 'Blocks particulate & toxic fumes' },
                { key: 'registeredSMS', label: 'Registered mobile number for Emergency SMS Alerts', desc: 'Direct broadcast from District Emergency Desk' },
                { key: 'emergencyBag', label: 'Prepared Emergency Grab Bag (Water, Flashlight, First Aid)', desc: 'Kept near main exit door' }
              ].map(item => (
                <div 
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                    checklistState[item.key]
                      ? 'bg-accentGreen/10 border-accentGreen/30 text-white'
                      : 'bg-bgPanel border-borderC text-textMuted hover:border-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    checklistState[item.key] ? 'bg-accentGreen border-accentGreen text-white' : 'border-borderC bg-bgCard'
                  }`}>
                    {checklistState[item.key] && <Check size={12} strokeWidth={3} />}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${checklistState[item.key] ? 'text-white' : 'text-slate-300'}`}>{item.label}</p>
                    <p className="text-[11px] text-textMuted mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Assembly Shelters & Evacuation Map */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2 text-white border-b border-borderC pb-3 mb-4">
              <MapPin className="text-brandBlue" size={20} /> 
              Nearest Emergency Assembly Shelters
            </h3>

            <p className="text-xs text-textMuted mb-4">
              Reinforced public shelters equipped with filtered ventilation, emergency medical supplies, and clean drinking water.
            </p>

            <div className="space-y-3">
              {ASSEMBLY_SHELTERS.map((s, i) => (
                <div key={i} className="bg-bgPanel border border-borderC p-4 rounded-xl flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                      <Compass size={14} className="text-brandBlue" /> {s.name}
                    </h4>
                    <span className="text-[10px] font-bold bg-accentGreen/10 text-accentGreen px-2 py-0.5 rounded border border-accentGreen/20">
                      {s.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-textMuted pt-1 border-t border-borderC/50">
                    <span>📍 Distance: <strong className="text-slate-200">{s.distance}</strong></span>
                    <span>👥 Capacity: <strong className="text-slate-200">{s.capacity}</strong></span>
                  </div>
                  <div className="text-[10px] text-brandBlue font-mono">
                    📞 Contact: {s.lead}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-brandBlue/10 border border-brandBlue/20 p-3 rounded-lg flex items-center gap-3">
            <Info size={18} className="text-brandBlue shrink-0" />
            <p className="text-[11px] text-textMuted leading-relaxed">
              Evacuation buses will arrive at local school pick-up points within 15 minutes of an official wailing siren trigger.
            </p>
          </div>
        </div>

      </div>

      {/* VERIFIED PUBLIC ADVISORIES & ANNOUNCEMENTS */}
      <div className="bg-bgCard rounded-xl border border-borderC p-6">
        <h3 className="font-bold text-lg text-white border-b border-borderC pb-3 mb-4 flex items-center gap-2">
          <Bell className="text-brandBlue" size={20} /> Verified Public Safety Bulletins & Maintenance Advisories
        </h3>
        <div className="space-y-3">
          <div className="bg-bgPanel border border-borderC p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-brandBlue font-bold uppercase tracking-wider">Sept 11, 2026 — Controlled Routine Flaring</span>
              <span className="text-[10px] bg-brandBlue/20 text-brandBlue px-2 py-0.5 rounded font-mono font-bold">SCHEDULED</span>
            </div>
            <p className="text-xs text-textMuted leading-relaxed">
              Standard pressure-relief flaring is scheduled at the Gujarat-12 site between 14:00 and 16:00. High flare stack glow will be visible. This is a standard safety procedure and does not pose an offsite hazard.
            </p>
          </div>

          <div className="bg-bgPanel border border-borderC p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-brandBlue font-bold uppercase tracking-wider">Sept 09, 2026 — Heavy Rig Logistics Movement</span>
              <span className="text-[10px] bg-slate-500/20 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">INFO</span>
            </div>
            <p className="text-xs text-textMuted leading-relaxed">
              Heavy equipment transport convoy along Highway 4 between 22:00 and 04:00. Expect temporary traffic slowdowns near the Upper Assam sector entrance.
            </p>
          </div>
        </div>
      </div>

      {/* REPORT ANOMALY MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-bgCard border border-borderC rounded-xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button 
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 text-textMuted hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-borderC pb-3">
              <div className="w-10 h-10 rounded-lg bg-accentRed/10 flex items-center justify-center text-accentRed">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Report Community Anomaly</h3>
                <p className="text-xs text-textMuted">Direct dispatch to PSM Environmental & HSE Safety Officers</p>
              </div>
            </div>

            {reportSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-accentGreen/20 text-accentGreen flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-bold text-lg text-white">Report Dispatched Successfully</h4>
                <p className="text-xs text-textMuted max-w-xs mx-auto">
                  An HSE inspector has been notified. You will receive an SMS update at your registered number.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Anomaly Category</label>
                  <select 
                    value={reportForm.type}
                    onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
                    className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-xs text-white focus:border-brandBlue outline-none"
                  >
                    <option>Smell / Gas Odor</option>
                    <option>Unexplained Loud Noise / Vibration</option>
                    <option>Water Discoloration / Oily Sheen</option>
                    <option>Siren Sounding without Notice</option>
                    <option>Other Environmental Concern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Your Location / Village Sector</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sector 4, Upper Assam Near Milestone 12"
                    value={reportForm.location}
                    onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                    className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-xs text-white focus:border-brandBlue outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Description of What You Observed</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe the smell, timing, direction, or visual observation..."
                    value={reportForm.desc}
                    onChange={(e) => setReportForm({ ...reportForm, desc: e.target.value })}
                    className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-xs text-white focus:border-brandBlue outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMuted uppercase mb-1">Mobile Contact Number (For Updates)</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={reportForm.contact}
                    onChange={(e) => setReportForm({ ...reportForm, contact: e.target.value })}
                    className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-xs text-white focus:border-brandBlue outline-none"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brandBlue hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send size={14} /> Submit Emergency Report
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
