import React, { useState, useEffect } from 'react';
import { BookOpen, Award, PlayCircle, ShieldAlert, ArrowRight, ArrowLeft, Activity, AlertTriangle, ChevronRight, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HISTORICAL_INCIDENTS } from '../data/intelligenceData';

export default function LearningLab() {
  const [activeView, setActiveView] = useState('home'); // 'home', 'simulator', 'case'
  const [selectedCase, setSelectedCase] = useState(null);

  if (activeView === 'simulator') {
    return <InteractiveSimulator onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'case') {
    return <CaseStudyViewer caseData={selectedCase} onBack={() => setActiveView('home')} />;
  }

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="text-purple-400"/> Learning Lab & Simulation</h2>
          <p className="text-textMuted text-sm mt-1">Educational platform for drilling mechanics, well control, and georisk.</p>
        </div>
      </div>

      {/* Simulator Hero */}
      <div className="bg-bgCard border border-borderC rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden shrink-0 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-brandBlue/10 pointer-events-none"></div>
        <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4 shrink-0">
          <PlayCircle className="text-purple-400" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Interactive Drilling Simulator</h3>
        <p className="text-textMuted max-w-xl text-sm mb-6 leading-relaxed">
          Experiment with Weight on Bit (WOB), RPM, and Mud Weight. Learn how telemetry anomalies like pressure spikes and lost circulation unfold in a safe environment.
        </p>
        <button 
          onClick={() => setActiveView('simulator')}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer z-10"
        >
          Launch Simulator <ArrowRight size={18} />
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard title="Level 1: Geology Basics" progress={100} icon={<Award size={16} className="text-accentYellow"/>} />
        <CourseCard title="Level 2: Petroleum Systems" progress={80} />
        <CourseCard title="Level 3: Drilling Mechanics" progress={30} />
        <CourseCard title="Level 4: Well Control" progress={0} />
        <CourseCard title="Level 5: AI & Data Science" progress={0} />
        <CourseCard title="Level 6: Case Studies" progress={0} />
      </div>

      {/* Real World Cases */}
      <div className="mt-8 bg-bgPanel border border-borderC rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><ShieldAlert className="text-accentRed"/> Real-World Disaster Case Studies</h3>
        <div className="space-y-4">
          {HISTORICAL_INCIDENTS.map((inc, i) => (
            <div 
              key={i} 
              onClick={() => { setSelectedCase(inc); setActiveView('case'); }}
              className="p-4 border border-borderC rounded-lg bg-bgCard hover:border-purple-500/50 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center group"
            >
              <div>
                <h4 className="font-bold group-hover:text-purple-400 transition-colors">{inc.incident_name} - {inc.year}</h4>
                <p className="text-sm text-textMuted mt-1">{inc.root_cause.substring(0, 100)}...</p>
              </div>
              <ArrowRight className="text-textMuted group-hover:text-purple-400 transition-colors" size={20}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
// COMPONENT: INTERACTIVE SIMULATOR
// -----------------------------------------
function InteractiveSimulator({ onBack }) {
  const [wob, setWob] = useState(15);
  const [rpm, setRpm] = useState(120);
  const [mudWeight, setMudWeight] = useState(1.2);
  const [data, setData] = useState(Array.from({ length: 30 }, (_, i) => ({ time: i, spp: 2800, torque: 15 })));
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        
        let newSpp = 2800 + (mudWeight * 100) + Math.random() * 50;
        let newTorque = 10 + (wob * 0.5) + (rpm * 0.05) + Math.random() * 2;
        
        // Physics Rules
        let currentAlert = null;
        if (mudWeight < 1.0) {
          newSpp -= 500; // Pressure drops
          newTorque += 5; // Hole collapses
          currentAlert = "WARNING: KICK DETECTED! Mud weight too low for formation pressure.";
        } else if (wob > 25) {
          newTorque += 15;
          currentAlert = "WARNING: BIT STALLED! Excessive Weight on Bit.";
        } else if (rpm > 180) {
          currentAlert = "WARNING: HIGH VIBRATION! RPM exceeding safe limits.";
        }
        
        setAlert(currentAlert);

        return [...prev.slice(1), { time: last.time + 1, spp: newSpp, torque: newTorque }];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [wob, rpm, mudWeight]);

  return (
    <div className="h-full flex flex-col space-y-4">
      <button onClick={onBack} className="flex items-center gap-2 text-textMuted hover:text-white w-fit transition-colors">
        <ArrowLeft size={16}/> Back to Learning Lab
      </button>
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><PlayCircle className="text-purple-400"/> Simulator Sandbox</h2>
          <p className="text-sm text-textMuted">Adjust parameters to see how the wellbore responds.</p>
        </div>
        {alert && (
          <div className="bg-accentRed/20 text-accentRed border border-accentRed/30 px-4 py-2 rounded flex items-center gap-2 animate-pulse font-bold">
            <AlertTriangle size={16} /> {alert}
          </div>
        )}
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        <div className="w-80 bg-bgCard border border-borderC rounded-xl p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-bold text-sm">Weight on Bit (k-lbs)</label>
              <span className="text-brandBlue font-bold">{wob}</span>
            </div>
            <input type="range" min="5" max="35" value={wob} onChange={e => setWob(Number(e.target.value))} className="w-full accent-brandBlue" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-bold text-sm">RPM</label>
              <span className="text-brandBlue font-bold">{rpm}</span>
            </div>
            <input type="range" min="40" max="220" value={rpm} onChange={e => setRpm(Number(e.target.value))} className="w-full accent-brandBlue" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-bold text-sm">Mud Weight (SG)</label>
              <span className="text-brandBlue font-bold">{mudWeight}</span>
            </div>
            <input type="range" min="0.8" max="1.8" step="0.05" value={mudWeight} onChange={e => setMudWeight(Number(e.target.value))} className="w-full accent-brandBlue" />
          </div>
          
          <div className="mt-auto bg-bgPanel p-4 rounded-lg text-xs text-textMuted border border-borderC">
            <strong>Challenge:</strong> Try lowering the Mud Weight below 1.0 SG to trigger a simulated Kick, or increasing WOB above 25k to stall the bit.
          </div>
        </div>

        <div className="flex-1 bg-bgCard border border-borderC rounded-xl p-6 flex flex-col">
          <h3 className="font-bold mb-4">Live Telemetry Response</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="time" hide />
                <YAxis yAxisId="left" stroke="#718096" domain={['auto', 'auto']} />
                <YAxis yAxisId="right" orientation="right" stroke="#718096" domain={[0, 40]} />
                <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: '#2D3748' }} />
                <Line yAxisId="left" type="monotone" dataKey="spp" stroke="#2C81FF" strokeWidth={2} name="Standpipe Pressure (psi)" isAnimationActive={false} />
                <Line yAxisId="right" type="monotone" dataKey="torque" stroke="#F43F5E" strokeWidth={2} name="Torque (k-ft)" isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
// COMPONENT: CASE STUDY VIEWER
// -----------------------------------------
function CaseStudyViewer({ caseData, onBack }) {
  if (!caseData) return null;

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <button onClick={onBack} className="flex items-center gap-2 text-textMuted hover:text-white w-fit transition-colors">
        <ArrowLeft size={16}/> Back to Learning Lab
      </button>

      <div className="bg-bgCard border border-borderC rounded-xl p-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="text-accentRed" size={32} />
          <div>
            <h2 className="text-3xl font-bold">{caseData.incident_name}</h2>
            <p className="text-textMuted">{caseData.region}, {caseData.country} — {caseData.year}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-bgPanel p-4 rounded-lg border border-borderC">
            <p className="text-xs text-textMuted mb-1 uppercase tracking-wider">Operator / Contractor</p>
            <p className="font-bold">{caseData.operator} / {caseData.contractor}</p>
          </div>
          <div className="bg-bgPanel p-4 rounded-lg border border-borderC">
            <p className="text-xs text-textMuted mb-1 uppercase tracking-wider">Fatalities / Outcome</p>
            <p className="font-bold text-accentRed">{caseData.fatalities} Fatalities — {caseData.outcome}</p>
          </div>
        </div>

        <div className="space-y-6 text-sm">
          <div>
            <h3 className="text-lg font-bold text-brandBlue mb-2 border-b border-borderC pb-2">Root Cause</h3>
            <p className="leading-relaxed text-textMain">{caseData.root_cause}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accentYellow mb-2 border-b border-borderC pb-2">Contributing Factors</h3>
            <p className="leading-relaxed text-textMain">{caseData.contributing_factors}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-400 mb-2 border-b border-borderC pb-2">Human & Procedural Factors</h3>
            <p className="leading-relaxed text-textMain">{caseData.human_factors}</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-borderC flex justify-between items-center">
          <a href={caseData.source_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brandBlue hover:underline">
            <FileText size={16} /> Read Official Investigation Report
          </a>
          <span className="px-3 py-1 bg-white/5 border border-borderC rounded-full text-xs font-mono text-textMuted">{caseData.incident_id}</span>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ title, progress, icon }) {
  return (
    <div className="bg-bgCard border border-borderC rounded-xl p-6 flex flex-col hover:border-purple-500/50 transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-8">
        <h3 className="font-bold group-hover:text-purple-400 transition-colors">{title}</h3>
        {icon}
      </div>
      <div className="mt-auto">
        <div className="flex justify-between text-xs text-textMuted mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-bgMain rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
