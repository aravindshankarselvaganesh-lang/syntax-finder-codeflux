import React from 'react';
import { AlertTriangle, Info, ShieldAlert, CheckCircle2 } from 'lucide-react';

const ALERTS = [
  { id: 1, type: 'critical', site: 'Assam-07', time: '10 mins ago', title: 'Critical Standpipe Pressure Spike', desc: 'Pressure exceeded 3,000 psi. Automatic suspension sequence initiated by driller.', status: 'Unresolved' },
  { id: 2, type: 'warning', site: 'Gujarat-12', time: '2 hours ago', title: 'Torque Fluctuation Detected', desc: 'Rotary torque varying by >15% over 10 minute rolling window. Inspect bit.', status: 'Investigating' },
  { id: 3, type: 'info', site: 'Tripura-02', time: '5 hours ago', title: 'Routine Maintenance Due', desc: 'Mud pump PM scheduled for next shift.', status: 'Resolved' },
  { id: 4, type: 'critical', site: 'Assam-08', time: 'Yesterday', title: 'Complete Mud Returns Loss', desc: 'Lost circulation in fractured limestone zone. Pumping LCM pills.', status: 'Unresolved' },
];

export default function Alerts() {
  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="text-accentRed"/> Active Alerts</h2>
          <p className="text-textMuted text-sm">Real-time anomaly detection from rig sensors.</p>
        </div>
        <button className="text-sm text-brandBlue hover:underline">Mark all as read</button>
      </div>

      <div className="flex-1 space-y-4">
        {ALERTS.map(alert => (
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
              <button className="bg-bgPanel hover:bg-white/5 border border-borderC px-4 py-2 rounded text-sm transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
