import React, { useState } from 'react';
import { AlertTriangle, Info, ShieldAlert, CheckCircle2, X, Activity, FileText, Check } from 'lucide-react';

const INITIAL_ALERTS = [
  { id: 1, type: 'critical', site: 'Assam-07', time: '10 mins ago', title: 'Critical Standpipe Pressure Spike', desc: 'Pressure exceeded 3,000 psi. Automatic suspension sequence initiated by driller.', status: 'Unresolved', spp: 3120, rpm: 0, wob: 0, torque: 28.4, recommendation: 'Perform emergency flow check. Inspect BOP pipe rams and standpipe manifold for blockages.' },
  { id: 2, type: 'warning', site: 'Gujarat-12', time: '2 hours ago', title: 'Torque Fluctuation Detected', desc: 'Rotary torque varying by >15% over 10 minute rolling window. Inspect bit.', status: 'Investigating', spp: 2850, rpm: 110, wob: 18, torque: 22.1, recommendation: 'Pick up off bottom and check for bit balling or bottom-hole assembly stick-slip.' },
  { id: 3, type: 'info', site: 'Tripura-02', time: '5 hours ago', title: 'Routine Maintenance Due', desc: 'Mud pump PM scheduled for next shift.', status: 'Resolved', spp: 2780, rpm: 120, wob: 15, torque: 14.2, recommendation: 'Switch to Standby Mud Pump #2 before initiating maintenance.' },
  { id: 4, type: 'critical', site: 'Assam-08', time: 'Yesterday', title: 'Complete Mud Returns Loss', desc: 'Lost circulation in fractured limestone zone. Pumping LCM pills.', status: 'Unresolved', spp: 1950, rpm: 40, wob: 5, torque: 8.5, recommendation: 'Spot LCM (Lost Circulation Material) pill immediately. Monitor annulus pit levels.' },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('nwis_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });
  const [selectedAlert, setSelectedAlert] = useState(null);

  const markAllRead = () => {
    setAlerts(prev => {
      const updated = prev.map(a => ({ ...a, status: a.status === 'Unresolved' ? 'Investigating' : a.status }));
      localStorage.setItem('nwis_alerts', JSON.stringify(updated));
      return updated;
    });
  };

  const resolveAlert = (id) => {
    setAlerts(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a);
      localStorage.setItem('nwis_alerts', JSON.stringify(updated));
      return updated;
    });
    setSelectedAlert(prev => prev && prev.id === id ? { ...prev, status: 'Resolved' } : prev);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="text-accentRed"/> Active Alerts</h2>
          <p className="text-textMuted text-sm">Real-time anomaly detection from rig sensors.</p>
        </div>
        <button 
          onClick={markAllRead} 
          className="text-sm text-brandBlue hover:text-white bg-brandBlue/10 hover:bg-brandBlue px-3 py-1.5 rounded-lg border border-brandBlue/20 transition-all font-medium"
        >
          Mark all as read
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {alerts.map(alert => (
          <div key={alert.id} className={`bg-bgCard border rounded-xl p-5 flex gap-4 transition-all hover:shadow-lg ${
            alert.type === 'critical' ? 'border-accentRed/30' : 
            alert.type === 'warning' ? 'border-accentYellow/30' : 'border-borderC'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              alert.type === 'critical' ? 'bg-accentRed/20 text-accentRed' : 
              alert.type === 'warning' ? 'bg-accentYellow/20 text-accentYellow' : 'bg-bgPanel text-textMuted'
            }`}>
              {alert.type === 'critical' ? <AlertTriangle size={20} /> : 
               alert.type === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-lg">{alert.title}</h3>
                <span className="text-xs text-textMuted flex items-center gap-1"><CheckCircle2 size={12}/> {alert.time}</span>
              </div>
              <p className="text-sm text-textMuted mb-3">{alert.desc}</p>
              
              <div className="flex items-center gap-3 text-xs font-medium">
                <span className="bg-bgPanel border border-borderC px-2 py-1 rounded">Site: {alert.site}</span>
                <span className={`px-2 py-1 rounded ${
                  alert.status === 'Unresolved' ? 'bg-accentRed/10 text-accentRed' :
                  alert.status === 'Investigating' ? 'bg-accentYellow/10 text-accentYellow' :
                  'bg-accentGreen/10 text-accentGreen'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col justify-center">
              <button 
                onClick={() => setSelectedAlert(alert)}
                className="bg-bgPanel hover:bg-brandBlue text-textMain hover:text-white border border-borderC hover:border-brandBlue px-4 py-2 rounded-lg text-sm transition-all font-medium cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ALERT DETAILS MODAL */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bgCard border border-borderC rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-borderC flex justify-between items-center bg-bgPanel">
              <div className="flex items-center gap-2">
                <AlertTriangle className={selectedAlert.type === 'critical' ? 'text-accentRed' : 'text-accentYellow'} size={20}/>
                <h3 className="font-bold text-lg">Alert Details — {selectedAlert.site}</h3>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="text-textMuted hover:text-white"><X size={18}/></button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-1">{selectedAlert.title}</h4>
                <p className="text-sm text-textMuted">{selectedAlert.desc}</p>
              </div>

              <div className="grid grid-cols-4 gap-3 bg-bgPanel p-4 rounded-xl border border-borderC text-center">
                <div>
                  <p className="text-[10px] text-textMuted uppercase font-bold">SPP (psi)</p>
                  <p className={`font-mono text-base font-bold ${selectedAlert.spp > 3000 ? 'text-accentRed' : 'text-white'}`}>{selectedAlert.spp}</p>
                </div>
                <div>
                  <p className="text-[10px] text-textMuted uppercase font-bold">RPM</p>
                  <p className="font-mono text-base font-bold">{selectedAlert.rpm}</p>
                </div>
                <div>
                  <p className="text-[10px] text-textMuted uppercase font-bold">WOB (k-lbs)</p>
                  <p className="font-mono text-base font-bold">{selectedAlert.wob}</p>
                </div>
                <div>
                  <p className="text-[10px] text-textMuted uppercase font-bold">Torque</p>
                  <p className="font-mono text-base font-bold">{selectedAlert.torque}</p>
                </div>
              </div>

              <div className="bg-brandBlue/10 border border-brandBlue/20 rounded-xl p-4">
                <p className="text-xs font-bold text-brandBlue uppercase mb-1">AI Recommendation</p>
                <p className="text-sm text-textMain">{selectedAlert.recommendation}</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-bgPanel border-t border-borderC flex justify-between items-center">
              <span className="text-xs text-textMuted">Status: <strong className="text-white">{selectedAlert.status}</strong></span>
              <div className="flex gap-3">
                <button onClick={() => setSelectedAlert(null)} className="px-4 py-2 border border-borderC rounded-lg text-sm text-textMuted hover:text-white transition-colors">
                  Close
                </button>
                {selectedAlert.status !== 'Resolved' && (
                  <button 
                    onClick={() => resolveAlert(selectedAlert.id)}
                    className="px-4 py-2 bg-accentGreen hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Check size={16}/> Resolve Alert
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
