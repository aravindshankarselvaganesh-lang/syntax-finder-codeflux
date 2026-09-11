import React from 'react';
import { 
  BookOpen, MapPin, Activity, BrainCircuit, Database, FileText, 
  ShieldAlert, BarChart2, Users, AlertTriangle, Settings, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function Manual() {
  return (
    <div className="h-full flex flex-col overflow-y-auto pb-8 space-y-8 pr-4">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <BookOpen className="text-brandBlue" size={32}/> 
          PSM User Manual & Operational Guide
        </h2>
        <p className="text-textMuted mt-2 max-w-3xl leading-relaxed">
          Welcome to <strong>PSM (Probing Snag Map) — Intelligent Drilling & Georisk Intelligence Platform</strong>. This comprehensive user manual explains all core modules, real-time telemetry tracking, AI copilot capabilities, worker safety protocols, and intelligence databases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Global Operations & Map */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-brandBlue/10 flex items-center justify-center text-brandBlue">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">1. Live Operations Map</h3>
              <p className="text-sm text-textMuted">Geospatial Dashboard & Offset Correlation</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Interactive Map:</strong> View real-time geospatial locations of all energy assets across regional basins (Assam, Cambay, Permian, North Sea, etc.). Toggle between standard Map and Satellite satellite modes.</p>
            <p><strong>Custom Target Selection:</strong> Click anywhere on the global map to instantly evaluate un-drilled target coordinates. Adjust the <strong>Analysis Radius</strong> slider (10 km to 2000 km) to discover nearby historical offset wells and regional lithology risks.</p>
            <p><strong>Site Details & Timeline:</strong> Click any active rig pin to inspect live well details, target formation, status indicators, and historical event timelines (Spud dates, intermediate casing tests, diagnostic anomalies).</p>
            <p><strong>Scenario Simulator:</strong> Click <code className="text-accentRed bg-accentRed/10 px-1.5 py-0.5 rounded font-mono font-bold">[TRIGGER SCENARIO]</code> to simulate real-life operational anomalies (Normal Drilling → Torque Spike → Stuck Pipe Warning → Safety Evacuation).</p>
          </div>
        </div>

        {/* 2. Telemetry Analytics */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
              <BarChart2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">2. Telemetry Analytics</h3>
              <p className="text-sm text-textMuted">Rig Sensor Monitoring & Trend Graphs</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Real-Time Rig Telemetry:</strong> Track high-frequency sensor streams including Standpipe Pressure (SPP), Weight-on-Bit (WOB), Torque, RPM, Rate of Penetration (ROP), and Mud Flow In/Out.</p>
            <p><strong>Hydraulic & Pressure Windows:</strong> Monitor Equivalent Circulating Density (ECD) against Pore Pressure and Fracture Gradient upper/lower limits to prevent lost circulation or gas kicks.</p>
            <p><strong>Trend Anomalies:</strong> Visual indicators highlight rate-of-change deviations, stick-slip severity, and bit balling signatures before severe NPT occurs.</p>
          </div>
        </div>

        {/* 3. AI Predictor Copilot */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-accentYellow/10 flex items-center justify-center text-accentYellow">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">3. AI Predictor Copilot</h3>
              <p className="text-sm text-textMuted">RAG Intelligence Assistant</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>RAG Engine:</strong> Powered by a specialized geological and drilling engineering vector database containing historical disaster logs, SPE papers, and IADC taxonomies.</p>
            <p><strong>Interactive Querying:</strong> Ask complex engineering questions regarding stuck pipe mitigation, mud weight adjustments, BOP tests, or historical well analogies.</p>
            <p><strong>Real-Time Citations & Maps:</strong> Answers feature interactive map coordinates, confidence scores, and source links to authoritative drilling documentation.</p>
          </div>
        </div>

        {/* 4. Worker Safety Portal */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-accentRed/10 flex items-center justify-center text-accentRed">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">4. Worker Safety Portal</h3>
              <p className="text-sm text-textMuted">Gas Monitoring, Hazards & Stop-Work Authority</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Rig Floor Gas Telemetry:</strong> Live streaming gas sensors for H₂S (Toxic Gas), CH₄ (Methane LEL), CO (Carbon Monoxide), and O₂ percentage with instant threshold alerts.</p>
            <p><strong>Pre-Shift Safety Checklists:</strong> Interactive digital PPE & safety verification for rig workers before shift commencement.</p>
            <p><strong>Hazard Reporting & Stop-Work Authority:</strong> Any crew member can file a hazard report or execute Stop-Work Authority immediately to halt unsafe drilling practices.</p>
            <p><strong>Emergency SOS:</strong> One-click emergency panic evacuation trigger that notifies rig superintendents and safety marshals.</p>
          </div>
        </div>

        {/* 5. Critical Alerts */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-accentYellow/10 flex items-center justify-center text-accentYellow">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">5. Critical Alerts</h3>
              <p className="text-sm text-textMuted">Anomaly Management & Mitigation Action</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Anomaly Queue:</strong> Centralized dashboard listing critical, warning, and informational alerts detected across all active drill sites.</p>
            <p><strong>AI Mitigation Guidance:</strong> Each alert includes actionable engineering recommendations (e.g., "Pick up off bottom to check for bit balling").</p>
            <p><strong>Status Tracking:</strong> Update alert statuses from Unresolved → Investigating → Resolved to keep operational teams aligned.</p>
          </div>
        </div>

        {/* 6. Intelligence Base */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">6. Intelligence Base</h3>
              <p className="text-sm text-textMuted">Global Failure Records & Research</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Engineering Research Report:</strong> Natively rendered technical research documentation on global drilling failures and basin characteristics.</p>
            <p><strong>Major Incidents Database:</strong> Deepwater Horizon, Montara, Ekofisk Bravo case studies with root causes and lessons learned.</p>
            <p><strong>IADC Failure Taxonomy:</strong> Standardized classification of drilling snag types and telemetry signatures.</p>
          </div>
        </div>

        {/* 7. Community & Learning */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">7. Community & Learning Lab</h3>
              <p className="text-sm text-textMuted">Drilling Knowledge Exchange & Training</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Community Portal:</strong> Peer discussion forum for field engineers and driller operators to share lessons learned and best practices.</p>
            <p><strong>Learning Lab:</strong> Interactive training modules, well control simulations, and technical quizzes to upscale rig crew competencies.</p>
          </div>
        </div>

        {/* 8. Daily Reports & System Settings */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-slate-500/10 flex items-center justify-center text-slate-300">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">8. Reports & System Settings</h3>
              <p className="text-sm text-textMuted">IADC Daily Reports & Admin Options</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Daily Drilling Reports (DDR):</strong> Automated daily report generator complying with IADC standards for instant download or printing.</p>
            <p><strong>System Settings:</strong> Configure telemetry update intervals, API connections, notification preferences, and user clearance profiles.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
