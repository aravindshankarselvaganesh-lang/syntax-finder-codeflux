import React from 'react';
import { ShieldAlert, Users, BookOpen } from 'lucide-react';

export default function WorkerSafety() {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="text-accentYellow"/> Worker Safety Portal</h2>
          <p className="text-textMuted text-sm mt-1">Location-specific hazard maps and safety checklists.</p>
        </div>
        <div className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded text-sm font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          SITE STATUS: GREEN (NORMAL)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bgCard rounded-xl border border-borderC p-6">
          <h3 className="font-semibold border-b border-borderC pb-2 mb-4">Active Hazard Zones</h3>
          <ul className="space-y-3 text-sm text-textMuted">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-accentRed mt-1"></span>
              <div>
                <p className="font-medium text-textMain">H2S Monitoring Zone (Wellbay 3)</p>
                <p className="text-xs">Respirators mandatory past checkpoint Bravo.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-accentYellow mt-1"></span>
              <div>
                <p className="font-medium text-textMain">Heavy Lift Operations (Mud Tanks)</p>
                <p className="text-xs">Crane active. Keep clear of swing radius.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-bgCard rounded-xl border border-borderC p-6">
          <h3 className="font-semibold border-b border-borderC pb-2 mb-4">Pre-Shift Checklist</h3>
          <ul className="space-y-2 text-sm text-textMuted">
            <li className="flex items-center gap-2"><input type="checkbox" className="accent-brandBlue" /> H2S monitor calibrated and active</li>
            <li className="flex items-center gap-2"><input type="checkbox" className="accent-brandBlue" /> Impact gloves inspected</li>
            <li className="flex items-center gap-2"><input type="checkbox" className="accent-brandBlue" /> Escape route verified</li>
            <li className="flex items-center gap-2"><input type="checkbox" className="accent-brandBlue" /> JSA signed for current operation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
