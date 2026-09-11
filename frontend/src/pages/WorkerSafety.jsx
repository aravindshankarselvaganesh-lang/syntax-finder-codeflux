import React, { useState } from 'react';
import { ShieldAlert, Plus, CheckCircle2, AlertTriangle, X } from 'lucide-react';

const INITIAL_HAZARDS = [
  { id: 1, type: 'red', title: 'H2S Monitoring Zone (Wellbay 3)', desc: 'Respirators mandatory past checkpoint Bravo.', status: 'Active' },
  { id: 2, type: 'yellow', title: 'Heavy Lift Operations (Mud Tanks)', desc: 'Crane active. Keep clear of swing radius.', status: 'Active' },
];

export default function WorkerSafety() {
  const [hazards, setHazards] = useState(INITIAL_HAZARDS);
  const [checklist, setChecklist] = useState({
    h2s: true,
    gloves: true,
    route: true,
    jsa: false
  });
  const [showHazardModal, setShowHazardModal] = useState(false);
  const [newHazardTitle, setNewHazardTitle] = useState('');
  const [newHazardDesc, setNewHazardDesc] = useState('');
  const [newHazardType, setNewHazardType] = useState('yellow');

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  const handleAddHazard = (e) => {
    e.preventDefault();
    if (!newHazardTitle) return;
    setHazards([{
      id: Date.now(),
      title: newHazardTitle,
      desc: newHazardDesc || 'Reported by field worker.',
      type: newHazardType,
      status: 'Active'
    }, ...hazards]);
    setShowHazardModal(false);
    setNewHazardTitle('');
    setNewHazardDesc('');
  };

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="text-accentYellow"/> Worker Safety Portal</h2>
          <p className="text-textMuted text-sm mt-1">Location-specific hazard maps and safety checklists.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHazardModal(true)}
            className="bg-accentRed hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-accentRed/20"
          >
            <Plus size={16}/> Report Hazard
          </button>
          <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SITE STATUS: GREEN (NORMAL)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-borderC pb-2 mb-4">
              <h3 className="font-semibold">Active Hazard Zones</h3>
              <span className="text-xs text-textMuted">{hazards.length} Zones Active</span>
            </div>
            <ul className="space-y-3 text-sm">
              {hazards.map(h => (
                <li key={h.id} className="flex items-start gap-3 bg-bgPanel p-3 rounded-lg border border-borderC">
                  <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${h.type === 'red' ? 'bg-accentRed animate-pulse' : 'bg-accentYellow'}`}></span>
                  <div>
                    <p className="font-medium text-textMain">{h.title}</p>
                    <p className="text-xs text-textMuted mt-0.5">{h.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-borderC pb-2 mb-4">
              <h3 className="font-semibold">Pre-Shift Checklist</h3>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${completedCount === 4 ? 'bg-accentGreen/10 text-accentGreen' : 'bg-accentYellow/10 text-accentYellow'}`}>
                {completedCount}/4 Completed
              </span>
            </div>
            <ul className="space-y-3 text-sm text-textMuted">
              <li className="flex items-center gap-3 p-2 bg-bgPanel rounded-lg border border-borderC cursor-pointer" onClick={() => toggleCheck('h2s')}>
                <input type="checkbox" checked={checklist.h2s} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.h2s ? 'text-white font-medium line-through opacity-70' : 'text-textMain'}>H2S monitor calibrated and active</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-bgPanel rounded-lg border border-borderC cursor-pointer" onClick={() => toggleCheck('gloves')}>
                <input type="checkbox" checked={checklist.gloves} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.gloves ? 'text-white font-medium line-through opacity-70' : 'text-textMain'}>Impact gloves & PPE inspected</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-bgPanel rounded-lg border border-borderC cursor-pointer" onClick={() => toggleCheck('route')}>
                <input type="checkbox" checked={checklist.route} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.route ? 'text-white font-medium line-through opacity-70' : 'text-textMain'}>Escape route & muster point verified</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-bgPanel rounded-lg border border-borderC cursor-pointer" onClick={() => toggleCheck('jsa')}>
                <input type="checkbox" checked={checklist.jsa} onChange={() => {}} className="accent-brandBlue w-4 h-4 cursor-pointer" />
                <span className={checklist.jsa ? 'text-white font-medium line-through opacity-70' : 'text-textMain'}>JSA (Job Safety Analysis) signed for current shift</span>
              </li>
            </ul>
          </div>
          {completedCount === 4 && (
            <div className="mt-4 bg-accentGreen/10 border border-accentGreen/20 text-accentGreen p-3 rounded-lg text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16}/> Clearance Granted: You are verified for site work.
            </div>
          )}
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
                  placeholder="e.g. Gas Leak near Pipe Rack B" 
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
    </div>
  );
}
