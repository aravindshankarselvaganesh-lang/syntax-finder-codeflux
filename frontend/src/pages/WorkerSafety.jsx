import React, { useState, useEffect } from 'react';
import { ShieldAlert, Plus, CheckCircle2, AlertTriangle, X, Gauge, Users, Siren, AlertCircle, PhoneCall, Check, Zap, FileText } from 'lucide-react';

const INITIAL_HAZARDS = [
  { id: 1, type: 'red', title: 'H2S Monitoring Zone (Wellbay 3)', desc: 'Respirators mandatory past checkpoint Bravo.', status: 'Active' },
  { id: 2, type: 'yellow', title: 'Heavy Lift Operations (Mud Tanks)', desc: 'Crane active. Keep clear of swing radius.', status: 'Active' },
  { id: 3, type: 'yellow', title: 'High Pressure Pipe Manifold B', desc: 'Vibration detected during pump #1 start-up.', status: 'Active' },
];

const INITIAL_CREW = [
  { name: 'Vikram Singh', role: 'Toolpusher', status: 'On Rig Floor', cert: 'IWCF Level 4', ready: true },
  { name: 'Rajesh Kumar', role: 'Driller', status: 'Control Cabin', cert: 'H2S Alive & BOSIET', ready: true },
  { name: 'Ananya Sharma', role: 'Mud Engineer', status: 'Mud Lab', cert: 'Rig Chemical Safety', ready: true },
  { name: 'David Miller', role: 'HSE Safety Officer', status: 'Deck Inspection', cert: 'NEBOSH IGC', ready: true },
];

export default function WorkerSafety() {
  const [hazards, setHazards] = useState(() => {
    const saved = localStorage.getItem('nwis_hazards');
    return saved ? JSON.parse(saved) : INITIAL_HAZARDS;
  });
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('nwis_checklist');
    return saved ? JSON.parse(saved) : { h2s: true, gloves: true, route: true, jsa: false };
  });

  const [sosActive, setSosActive] = useState(false);
  const [showHazardModal, setShowHazardModal] = useState(false);
  const [showStopWorkModal, setShowStopWorkModal] = useState(false);
  const [stopWorkList, setStopWorkList] = useState([
    { id: 1, title: 'Mud Pump #2 Pressure Spike', reporter: 'Rajesh K.', time: '2h ago', status: 'Resolved' }
  ]);

  const [newHazardTitle, setNewHazardTitle] = useState('');
  const [newHazardDesc, setNewHazardDesc] = useState('');
  const [newHazardType, setNewHazardType] = useState('yellow');

  const [stopWorkTitle, setStopWorkTitle] = useState('');
  const [stopWorkReason, setStopWorkReason] = useState('');

  // Simulated Gas Telemetry
  const [gasLevels, setGasLevels] = useState({
    h2s: 0.0,
    ch4: 1.2,
    co: 4.0,
    o2: 20.9
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGasLevels({
        h2s: +(Math.random() * 0.4).toFixed(1),
        ch4: +(1.0 + Math.random() * 0.5).toFixed(1),
        co: +(3.5 + Math.random() * 1.0).toFixed(1),
        o2: +(20.8 + Math.random() * 0.2).toFixed(1)
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleCheck = (key) => {
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('nwis_checklist', JSON.stringify(updated));
      return updated;
    });
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const handleAddHazard = (e) => {
    e.preventDefault();
    if (!newHazardTitle) return;
    const updated = [{
      id: Date.now(),
      title: newHazardTitle,
      desc: newHazardDesc || 'Reported by field worker.',
      type: newHazardType,
      status: 'Active'
    }, ...hazards];
    setHazards(updated);
    localStorage.setItem('nwis_hazards', JSON.stringify(updated));
    setShowHazardModal(false);
    setNewHazardTitle('');
    setNewHazardDesc('');
  };

  const handleStopWorkSubmit = (e) => {
    e.preventDefault();
    if (!stopWorkTitle) return;
    setStopWorkList([
      { id: Date.now(), title: stopWorkTitle, reporter: 'You (Driller)', time: 'Just now', status: 'HALTED — Under Review' },
      ...stopWorkList
    ]);
    setShowStopWorkModal(false);
    setStopWorkTitle('');
    setStopWorkReason('');
  };

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8 pr-1">
      
      {/* SOS EMERGENCY BANNER */}
      {sosActive && (
        <div className="bg-accentRed text-white p-4 rounded-xl border border-red-500 shadow-2xl animate-pulse flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Siren size={28} className="animate-bounce" />
            <div>
              <h3 className="font-extrabold text-lg uppercase tracking-wider">🚨 EMERGENCY RIG EVACUATION TRIGGERED</h3>
              <p className="text-xs text-red-100">All personnel proceed immediately to Muster Point Alpha (Helideck). Rig floor operations suspended.</p>
            </div>
          </div>
          <button 
            onClick={() => setSosActive(false)} 
            className="bg-white text-accentRed font-bold px-4 py-1.5 rounded-lg text-xs hover:bg-red-100 transition-colors cursor-pointer"
          >
            DISMISS ALARM
          </button>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bgCard p-5 rounded-xl border border-borderC">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="text-accentYellow"/> Worker Safety & Field Protocol</h2>
          <p className="text-textMuted text-sm mt-0.5">Real-time rig floor hazards, gas detector telemetry, STOP Work authority, and emergency muster status.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setSosActive(true)}
            className="bg-accentRed hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-accentRed/30 animate-pulse"
          >
            <Siren size={18}/> TRIGGER SOS ALARM
          </button>
          <button 
            onClick={() => setShowStopWorkModal(true)}
            className="bg-accentYellow hover:bg-yellow-500 text-black px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <AlertCircle size={16}/> STOP Work Order
          </button>
          <button 
            onClick={() => setShowHazardModal(true)}
            className="bg-brandBlue hover:bg-blue-600 text-white px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus size={16}/> Report Hazard
          </button>
        </div>
      </div>

      {/* GAS TELEMETRY MONITOR & MUSTER POINTS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Gas Detector Telemetry */}
        <div className="lg:col-span-3 bg-bgCard rounded-xl border border-borderC p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-borderC pb-3 mb-4">
            <h3 className="font-bold flex items-center gap-2 text-brandBlue"><Gauge size={18}/> Live Gas Detector Telemetry (Wireless Sensors)</h3>
            <span className="text-xs text-textMuted font-mono">Sensors: ONLINE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-bgPanel p-3.5 rounded-xl border border-borderC">
              <p className="text-xs text-textMuted uppercase font-bold mb-1">H2S (Hydrogen Sulfide)</p>
              <p className={`text-xl font-extrabold font-mono ${gasLevels.h2s > 5 ? 'text-accentRed animate-pulse' : 'text-accentGreen'}`}>{gasLevels.h2s} <span className="text-xs font-normal">ppm</span></p>
              <span className="text-[10px] text-textMuted mt-1 block">Threshold: &lt; 10.0 ppm</span>
            </div>

            <div className="bg-bgPanel p-3.5 rounded-xl border border-borderC">
              <p className="text-xs text-textMuted uppercase font-bold mb-1">CH4 (Methane % LEL)</p>
              <p className="text-xl font-extrabold font-mono text-accentGreen">{gasLevels.ch4} <span className="text-xs font-normal">%</span></p>
              <span className="text-[10px] text-textMuted mt-1 block">Threshold: &lt; 10.0 %</span>
            </div>

            <div className="bg-bgPanel p-3.5 rounded-xl border border-borderC">
              <p className="text-xs text-textMuted uppercase font-bold mb-1">CO (Carbon Monoxide)</p>
              <p className="text-xl font-extrabold font-mono text-accentGreen">{gasLevels.co} <span className="text-xs font-normal">ppm</span></p>
              <span className="text-[10px] text-textMuted mt-1 block">Threshold: &lt; 35.0 ppm</span>
            </div>

            <div className="bg-bgPanel p-3.5 rounded-xl border border-borderC">
              <p className="text-xs text-textMuted uppercase font-bold mb-1">O2 (Oxygen Level)</p>
              <p className="text-xl font-extrabold font-mono text-accentGreen">{gasLevels.o2} <span className="text-xs font-normal">%</span></p>
              <span className="text-[10px] text-textMuted mt-1 block">Normal: 19.5 - 23.5%</span>
            </div>
          </div>
        </div>

        {/* Emergency Muster Status */}
        <div className="bg-bgCard rounded-xl border border-borderC p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold border-b border-borderC pb-3 mb-3 text-white flex items-center gap-2"><PhoneCall size={16} className="text-accentRed"/> Muster Stations</h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-bgPanel rounded-lg border border-borderC flex justify-between items-center">
                <span>Muster Alpha (Helideck)</span>
                <span className="px-2 py-0.5 rounded bg-accentGreen/10 text-accentGreen font-bold border border-accentGreen/20">CLEAR</span>
              </div>
              <div className="p-2.5 bg-bgPanel rounded-lg border border-borderC flex justify-between items-center">
                <span>Muster Bravo (Lifeboats)</span>
                <span className="px-2 py-0.5 rounded bg-accentGreen/10 text-accentGreen font-bold border border-accentGreen/20">CLEAR</span>
              </div>
              <div className="p-2.5 bg-bgPanel rounded-lg border border-borderC flex justify-between items-center">
                <span>Muster Charlie (Deck East)</span>
                <span className="px-2 py-0.5 rounded bg-accentYellow/10 text-accentYellow font-bold border border-accentYellow/20">STANDBY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HAZARDS & SHIFT CHECKLIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Hazard Map */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-borderC pb-3 mb-4">
              <h3 className="font-bold text-base">Active Hazard Zones ({hazards.length})</h3>
              <span className="text-xs text-textMuted">Live Field Monitoring</span>
            </div>
            <ul className="space-y-3 text-sm">
              {hazards.map(h => (
                <li key={h.id} className="flex items-start gap-3 bg-bgPanel p-3.5 rounded-xl border border-borderC">
                  <span className={`w-3 h-3 rounded-full mt-1 shrink-0 ${h.type === 'red' ? 'bg-accentRed animate-pulse' : 'bg-accentYellow'}`}></span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-textMain">{h.title}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${h.type === 'red' ? 'bg-accentRed/10 text-accentRed border border-accentRed/20' : 'bg-accentYellow/10 text-accentYellow border border-accentYellow/20'}`}>{h.type === 'red' ? 'High Risk' : 'Caution'}</span>
                    </div>
                    <p className="text-xs text-textMuted mt-1">{h.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Interactive Pre-Shift Checklist */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-borderC pb-3 mb-4">
              <h3 className="font-bold text-base">Pre-Shift Safety Verification</h3>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${completedCount === 4 ? 'bg-accentGreen/10 text-accentGreen border border-accentGreen/20' : 'bg-accentYellow/10 text-accentYellow border border-accentYellow/20'}`}>
                {completedCount}/4 Completed
              </span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 p-3 bg-bgPanel rounded-xl border border-borderC cursor-pointer hover:border-brandBlue/50 transition-colors" onClick={() => toggleCheck('h2s')}>
                <input type="checkbox" checked={checklist.h2s} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.h2s ? 'text-white font-medium line-through opacity-70' : 'text-textMain font-medium'}>Wireless H2S personal monitor calibrated & zeroed</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-bgPanel rounded-xl border border-borderC cursor-pointer hover:border-brandBlue/50 transition-colors" onClick={() => toggleCheck('gloves')}>
                <input type="checkbox" checked={checklist.gloves} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.gloves ? 'text-white font-medium line-through opacity-70' : 'text-textMain font-medium'}>Impact gloves, safety harness & PPE inspected</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-bgPanel rounded-xl border border-borderC cursor-pointer hover:border-brandBlue/50 transition-colors" onClick={() => toggleCheck('route')}>
                <input type="checkbox" checked={checklist.route} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.route ? 'text-white font-medium line-through opacity-70' : 'text-textMain font-medium'}>Escape route, windsock direction & muster point verified</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-bgPanel rounded-xl border border-borderC cursor-pointer hover:border-brandBlue/50 transition-colors" onClick={() => toggleCheck('jsa')}>
                <input type="checkbox" checked={checklist.jsa} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.jsa ? 'text-white font-medium line-through opacity-70' : 'text-textMain font-medium'}>JSA (Job Safety Analysis) reviewed & signed for current shift</span>
              </li>
            </ul>
          </div>
          {completedCount === 4 && (
            <div className="mt-4 bg-accentGreen/10 border border-accentGreen/20 text-accentGreen p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16}/> Clearance Granted: Driller verified for active rig floor operations.
            </div>
          )}
        </div>
      </div>

      {/* CREW ROSTER & STOP WORK ORDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Rig Floor Crew Roster */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6">
          <h3 className="font-bold border-b border-borderC pb-3 mb-4 text-white flex items-center gap-2"><Users size={18} className="text-brandBlue"/> Active Rig Floor Shift Roster</h3>
          <div className="space-y-3">
            {INITIAL_CREW.map((c, idx) => (
              <div key={idx} className="p-3 bg-bgPanel rounded-xl border border-borderC flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold text-white">{c.name} <span className="text-xs text-textMuted font-normal">({c.role})</span></p>
                  <p className="text-xs text-brandBlue mt-0.5">Cert: {c.cert}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-accentGreen/10 text-accentGreen text-xs font-bold border border-accentGreen/20 flex items-center gap-1">
                  <Check size={12}/> {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STOP Work Authority Log */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6">
          <div className="flex justify-between items-center border-b border-borderC pb-3 mb-4">
            <h3 className="font-bold text-white flex items-center gap-2"><AlertCircle size={18} className="text-accentYellow"/> STOP Work Authority Log</h3>
            <span className="text-xs text-textMuted">{stopWorkList.length} Orders Issued</span>
          </div>
          <div className="space-y-3">
            {stopWorkList.map(item => (
              <div key={item.id} className="p-3.5 bg-bgPanel rounded-xl border border-borderC text-sm">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-textMain">{item.title}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${item.status.includes('HALTED') ? 'bg-accentRed/10 text-accentRed border border-accentRed/20' : 'bg-accentGreen/10 text-accentGreen border border-accentGreen/20'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-textMuted">Logged by {item.reporter} — {item.time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* REPORT HAZARD MODAL */}
      {showHazardModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddHazard} className="bg-bgCard border border-borderC rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6">
            <div className="flex justify-between items-center mb-4 border-b border-borderC pb-3">
              <h3 className="font-bold text-xl flex items-center gap-2"><ShieldAlert className="text-accentRed"/> Report Field Hazard</h3>
              <button type="button" onClick={() => setShowHazardModal(false)} className="text-textMuted hover:text-white"><X size={18}/></button>
            </div>
            <div className="space-y-4 mb-6 text-sm">
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Hazard Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. High Vibration on Mud Manifold B" 
                  value={newHazardTitle} 
                  onChange={e => setNewHazardTitle(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Description / Mandatory Precautions</label>
                <textarea 
                  placeholder="e.g. Wear full SCBA gear when approaching..." 
                  value={newHazardDesc} 
                  onChange={e => setNewHazardDesc(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue h-24" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Severity Level</label>
                <select 
                  value={newHazardType} 
                  onChange={e => setNewHazardType(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue"
                >
                  <option value="yellow">Caution (Yellow)</option>
                  <option value="red">Critical Hazard (Red)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowHazardModal(false)} className="flex-1 py-2.5 border border-borderC rounded-lg text-sm text-textMuted hover:text-white">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 bg-accentRed hover:bg-red-600 text-white font-bold rounded-lg text-sm transition-colors">Broadcast Hazard</button>
            </div>
          </form>
        </div>
      )}

      {/* STOP WORK AUTHORITY MODAL */}
      {showStopWorkModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleStopWorkSubmit} className="bg-bgCard border border-borderC rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6">
            <div className="flex justify-between items-center mb-4 border-b border-borderC pb-3">
              <h3 className="font-bold text-xl flex items-center gap-2"><AlertCircle className="text-accentYellow"/> Issue STOP Work Order</h3>
              <button type="button" onClick={() => setShowStopWorkModal(false)} className="text-textMuted hover:text-white"><X size={18}/></button>
            </div>
            <div className="space-y-4 mb-6 text-sm">
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Unsafe Condition / Equipment Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Uncalibrated Pressure Gauge on Standpipe" 
                  value={stopWorkTitle} 
                  onChange={e => setStopWorkTitle(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Justification for Halting Work</label>
                <textarea 
                  placeholder="Explain why drilling must halt immediately until safety review..." 
                  value={stopWorkReason} 
                  onChange={e => setStopWorkReason(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue h-24" 
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowStopWorkModal(false)} className="flex-1 py-2.5 border border-borderC rounded-lg text-sm text-textMuted hover:text-white">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 bg-accentYellow hover:bg-yellow-500 text-black font-extrabold rounded-lg text-sm transition-colors">Halt Operations</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
