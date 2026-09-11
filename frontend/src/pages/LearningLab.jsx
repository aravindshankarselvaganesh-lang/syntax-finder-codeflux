import React from 'react';
import { BookOpen, Award, PlayCircle } from 'lucide-react';

export default function LearningLab() {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="text-purple-400"/> Learning Lab & Simulation</h2>
          <p className="text-textMuted text-sm mt-1">Educational platform for drilling mechanics, well control, and georisk.</p>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-8 text-center">
        <PlayCircle size={48} className="mx-auto text-purple-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Interactive Drilling Simulator</h3>
        <p className="text-sm text-textMuted max-w-lg mx-auto mb-6">Experiment with Weight on Bit (WOB), RPM, and Mud Weight. Learn how telemetry anomalies like pressure spikes and lost circulation unfold in a safe, educational environment.</p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          Launch Simulator
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard title="Level 1: Geology Basics" progress={100} />
        <CourseCard title="Level 2: Petroleum Systems" progress={80} />
        <CourseCard title="Level 3: Drilling Mechanics" progress={30} />
        <CourseCard title="Level 4: Well Control" progress={0} />
        <CourseCard title="Level 5: AI & Data Science" progress={0} />
        <CourseCard title="Level 6: Case Studies" progress={0} />
      </div>
    </div>
  );
}

function CourseCard({ title, progress }) {
  return (
    <div className="bg-bgCard border border-borderC p-5 rounded-xl flex flex-col hover:border-purple-500/50 transition-colors cursor-pointer group">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-sm">{title}</h4>
        {progress === 100 && <Award size={16} className="text-accentYellow" />}
      </div>
      <div className="mt-auto">
        <div className="flex justify-between text-xs text-textMuted mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-bgMain rounded-full h-1.5">
          <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
