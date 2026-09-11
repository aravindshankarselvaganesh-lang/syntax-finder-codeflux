import React from 'react';
import { BookOpen, Award, PlayCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LearningLab() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="text-purple-400"/> Learning Lab & Simulation</h2>
          <p className="text-textMuted text-sm mt-1">Educational platform for drilling mechanics, well control, and georisk.</p>
        </div>
      </div>

      <div className="bg-bgCard border border-borderC rounded-xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-brandBlue/5 pointer-events-none"></div>
        <PlayCircle className="text-purple-400 mb-4" size={48} />
        <h3 className="text-2xl font-bold mb-2">Interactive Drilling Simulator</h3>
        <p className="text-textMuted max-w-lg mb-8">Experiment with Weight on Bit (WOB), RPM, and Mud Weight. Learn how telemetry anomalies like pressure spikes and lost circulation unfold in a safe, educational environment.</p>
        <button 
          onClick={() => navigate('/analytics')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2"
        >
          Launch Simulator <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard title="Level 1: Geology Basics" progress={100} icon={<Award size={16} className="text-accentYellow"/>} />
        <CourseCard title="Level 2: Petroleum Systems" progress={80} />
        <CourseCard title="Level 3: Drilling Mechanics" progress={30} />
        <CourseCard title="Level 4: Well Control" progress={0} />
        <CourseCard title="Level 5: AI & Data Science" progress={0} />
        <CourseCard title="Level 6: Case Studies (Macondo)" progress={0} />
      </div>

      <div className="mt-8 bg-bgPanel border border-borderC rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><ShieldAlert className="text-accentRed"/> Real-World Disaster Case Studies</h3>
        <div className="space-y-4">
          <div className="p-4 border border-borderC rounded-lg bg-bgCard hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center">
            <div>
              <h4 className="font-bold text-brandBlue">Deepwater Horizon (Macondo) - 2010</h4>
              <p className="text-sm text-textMuted mt-1">Study the exact telemetry failure chain that led to the world's largest marine oil spill.</p>
            </div>
            <ArrowRight className="text-textMuted" size={20}/>
          </div>
          <div className="p-4 border border-borderC rounded-lg bg-bgCard hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center">
            <div>
              <h4 className="font-bold text-brandBlue">Montara H1 Blowout - 2009</h4>
              <p className="text-sm text-textMuted mt-1">Analyze cementing failures and missing pressure barriers in the Timor Sea.</p>
            </div>
            <ArrowRight className="text-textMuted" size={20}/>
          </div>
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
