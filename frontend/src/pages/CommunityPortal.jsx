import React from 'react';
import { Users, Wind, Droplets } from 'lucide-react';

export default function CommunityPortal() {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Users className="text-brandBlue"/> Community Safety & Information</h2>
          <p className="text-textMuted text-sm mt-1">Verified public safety statuses and environmental metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-bgCard border border-borderC rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="text-brandBlue"/>
            <h3 className="font-semibold text-textMuted">Air Quality (AQI)</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">42 <span className="text-sm font-normal text-textMuted">/ Good</span></p>
        </div>
        <div className="bg-bgCard border border-borderC rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="text-brandBlue"/>
            <h3 className="font-semibold text-textMuted">Water Safety</h3>
          </div>
          <p className="text-3xl font-bold text-green-500">Nominal</p>
        </div>
        <div className="bg-bgCard border border-borderC rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-brandBlue"/>
            <h3 className="font-semibold text-textMuted">Active Operations</h3>
          </div>
          <p className="text-3xl font-bold">2 Sites <span className="text-sm font-normal text-textMuted">within 50km</span></p>
        </div>
      </div>

      <div className="bg-bgCard rounded-xl border border-borderC p-6">
        <h3 className="font-semibold border-b border-borderC pb-2 mb-4">Verified Public Updates</h3>
        <div className="space-y-4">
          <div className="bg-bgPanel border border-borderC p-4 rounded-lg">
            <p className="text-xs text-brandBlue font-bold uppercase mb-1">Sept 11, 2026 - Routine Maintenance</p>
            <p className="text-sm text-textMuted">Normal flaring activity is scheduled at the Gujarat-05 site between 14:00 and 16:00. This is a standard safety procedure and does not indicate an emergency.</p>
          </div>
          <div className="bg-bgPanel border border-borderC p-4 rounded-lg">
            <p className="text-xs text-brandBlue font-bold uppercase mb-1">Sept 09, 2026 - Noise Advisory</p>
            <p className="text-sm text-textMuted">Heavy equipment transport near Route 4. Minor noise disturbances expected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
