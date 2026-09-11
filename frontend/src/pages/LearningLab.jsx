import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Award, PlayCircle, ShieldAlert, ArrowRight, ArrowLeft, 
  Activity, AlertTriangle, ChevronRight, FileText, CheckCircle2, 
  HelpCircle, Sparkles, Check, RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HISTORICAL_INCIDENTS } from '../data/intelligenceData';

const INITIAL_COURSES = [
  {
    id: 1,
    title: "Level 1: Geology Basics",
    description: "Geological formations, pore pressure, rock strength, fault lines, and lithology identification in onshore basins.",
    defaultProgress: 100,
    concepts: [
      { name: "Lithology & Formation Layers", desc: "Understanding sandstone porosity, tight shale seals, and carbonate reservoir characteristics." },
      { name: "Pore Pressure vs Hydrostatic", desc: "How fluid pressure inside rock pores compares to the hydrostatic column of drilling fluid." },
      { name: "Seismic & Fault Traps", desc: "Identifying structural faults, fault-line hazards, and seismic risk zones prior to spudding." }
    ],
    quiz: {
      question: "What occurs when wellbore mud pressure falls below the formation pore pressure?",
      options: [
        "A) Severe lost circulation in fractured rock",
        "B) Gas Kick / Influx into the wellbore (Correct)",
        "C) Immediate bit balling and torque drop",
        "D) Uncontrolled drill string vibration"
      ],
      correctIndex: 1,
      explanation: "When mud hydrostatic pressure drops below pore pressure, formation fluids (gas/oil/water) flow into the wellbore, creating a kick."
    }
  },
  {
    id: 2,
    title: "Level 2: Petroleum Systems",
    description: "Source rock maturation, migration pathways, reservoir rock porosity, seal integrity, and structural traps.",
    defaultProgress: 80,
    concepts: [
      { name: "Source Rock Maturation", desc: "Organic-rich shale buried under heat and pressure over geological time scales." },
      { name: "Porosity vs Permeability", desc: "Porosity measures void storage space; permeability measures how easily fluids flow through interconnected pores." },
      { name: "Trap Structures", desc: "Anticlinal folds, salt domes, and stratigraphic traps holding oil and gas deposits." }
    ],
    quiz: {
      question: "Which rock property determines how easily oil and gas flow through subsurface reservoir pores?",
      options: [
        "A) Rock Density",
        "B) Permeability (Correct)",
        "C) Mohs Hardness",
        "D) Thermal Conductivity"
      ],
      correctIndex: 1,
      explanation: "Permeability defines the interconnectivity of pore spaces and capacity for fluid flow under pressure gradients."
    }
  },
  {
    id: 3,
    title: "Level 3: Drilling Mechanics",
    description: "Weight on Bit (WOB), Torque, RPM, Rate of Penetration (ROP), and Bottom Hole Assembly (BHA) optimization.",
    defaultProgress: 30,
    concepts: [
      { name: "BHA & Bit Selection", desc: "Selecting PDC vs Roller-Cone bits and positioning MWD/LWD telemetry tools." },
      { name: "ROP Optimization", desc: "Balancing WOB and RPM to maximize drilling speed without inducing thermal bit cutter wear." },
      { name: "Stick-Slip & Torsional Vibration", desc: "Managing rotational drag fluctuations that cause premature cutter destruction." }
    ],
    quiz: {
      question: "What is the primary diagnostic signature of bit balling while drilling through sticky shale?",
      options: [
        "A) Sharp drop in ROP accompanied by rising torque and pressure (Correct)",
        "B) Sudden drop in standpipe pressure",
        "C) Rapid decrease in mud weight",
        "D) Spontaneous increase in rotary RPM"
      ],
      correctIndex: 0,
      explanation: "Cuttings stick to the bit cutters, reducing cutting efficiency (ROP drops) while increasing rotational resistance (torque rises)."
    }
  },
  {
    id: 4,
    title: "Level 4: Well Control & Kick Mitigation",
    description: "Primary well barrier mud weight, secondary BOP pipe/shear rams, choke manifolds, and Driller's Method.",
    defaultProgress: 0,
    concepts: [
      { name: "Primary Hydrostatic Barrier", desc: "Maintaining Equivalent Circulating Density (ECD) inside safe pressure windows." },
      { name: "BOP Stack & Ram Operations", desc: "Pipe rams, blind-shear rams, and annular preventers for emergency well shut-in." },
      { name: "Driller's Method vs Wait & Weight", desc: "Two-step kick circulation methods to safely flush influx gas while maintaining bottomhole pressure." }
    ],
    quiz: {
      question: "When early kick indicators (pit gain, flow line rise) are detected, what is the FIRST action the driller must take?",
      options: [
        "A) Increase mud pump stroke rate",
        "B) Perform flow check and shut in the well (Correct)",
        "C) Mix heavy kill mud immediately",
        "D) Trip the drill pipe out of the hole"
      ],
      correctIndex: 1,
      explanation: "The golden rule of well control: Stop rotating, space out, stop pumps, check for flow, and shut in the BOP immediately if flowing."
    }
  },
  {
    id: 5,
    title: "Level 5: AI & Data Science in Energy",
    description: "Machine learning for predictive drilling, WITSML telemetry anomaly detection, vector RAG embeddings, and digital twins.",
    defaultProgress: 0,
    concepts: [
      { name: "High-Frequency Telemetry Anomaly Detection", desc: "ML models analyzing SPP and torque rolling windows to detect stuck pipe 30 minutes before occurrence." },
      { name: "RAG Vector Architecture", desc: "Retrieving historical disaster case studies and SPE paper embeddings to guide live rig crews." },
      { name: "Automated Early Warning Signals", desc: "Translating sensor threshold anomalies into automated safety alerts and operational SOPs." }
    ],
    quiz: {
      question: "How does Retrieval-Augmented Generation (RAG) assist drilling engineers during unexpected pressure anomalies?",
      options: [
        "A) Automatically replaces driller controls without human oversight",
        "B) Retrieves matching historical disaster logs to provide evidence-backed mitigation steps (Correct)",
        "C) Measures mechanical bit temperature directly downhole",
        "D) Controls diesel generator fuel consumption on the rig"
      ],
      correctIndex: 1,
      explanation: "RAG queries vector databases of past incidents to present verified, historical root causes and recommended engineering actions."
    }
  },
  {
    id: 6,
    title: "Level 6: Real-World Case Studies",
    description: "Deep-dive investigation of major industrial blowouts (Macondo, Montara, Ekofisk Bravo) and safety management systems.",
    defaultProgress: 0,
    concepts: [
      { name: "Barrier Failure Chains", desc: "How multiple minor procedural bypasses align to cause catastrophic blowout failures." },
      { name: "Human & Organizational Factors", desc: "Misinterpreted negative pressure tests, fatigue, and bypassed safety alarms." },
      { name: "Modern Safety Management Systems", desc: "Stop-Work Authority, digital twin surveillance, and independent safety audits." }
    ],
    quiz: {
      question: "What was the primary barrier failure that triggered the Macondo (Deepwater Horizon) blowout in 2010?",
      options: [
        "A) Drill bit fracture at total depth",
        "B) Failed primary cement job and misinterpreted negative pressure test (Correct)",
        "C) Unexpected hurricane weather storm",
        "D) Diesel fuel tank explosion on main deck"
      ],
      correctIndex: 1,
      explanation: "A compromised cement shoe allowed hydrocarbons to enter the casing, and a misinterpreted negative pressure test allowed gas to ascend the riser."
    }
  }
];

export default function LearningLab() {
  const [activeView, setActiveView] = useState('home'); // 'home', 'simulator', 'case', 'course'
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courseProgress, setCourseProgress] = useState(() => {
    const saved = localStorage.getItem('psm_course_progress');
    if (saved) return JSON.parse(saved);
    return { 1: 100, 2: 80, 3: 30, 4: 0, 5: 0, 6: 0 };
  });

  const handleUpdateProgress = (courseId, newProgress) => {
    setCourseProgress(prev => {
      const updated = { ...prev, [courseId]: newProgress };
      localStorage.setItem('psm_course_progress', JSON.stringify(updated));
      return updated;
    });
  };

  if (activeView === 'simulator') {
    return <InteractiveSimulator onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'case') {
    return <CaseStudyViewer caseData={selectedCase} onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'course') {
    return (
      <CourseViewer 
        course={selectedCourse} 
        progress={courseProgress[selectedCourse.id] || 0} 
        onUpdateProgress={(p) => handleUpdateProgress(selectedCourse.id, p)}
        onBack={() => setActiveView('home')} 
      />
    );
  }

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8 pr-2">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-purple-400" size={28}/> 
            Learning Lab & Operational Simulation
          </h2>
          <p className="text-textMuted text-sm mt-1">Interactive educational platform for drilling mechanics, well control, and georisk intelligence.</p>
        </div>
      </div>

      {/* Simulator Hero */}
      <div className="bg-bgCard border border-borderC rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden shrink-0 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-brandBlue/10 pointer-events-none"></div>
        <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4 shrink-0">
          <PlayCircle className="text-purple-400" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Interactive Drilling Mechanics Simulator</h3>
        <p className="text-textMuted max-w-xl text-sm mb-6 leading-relaxed">
          Experiment with Weight on Bit (WOB), RPM, and Mud Weight. Learn how telemetry anomalies like pressure spikes, kicks, and bit balling unfold in a safe virtual environment.
        </p>
        <button 
          onClick={() => setActiveView('simulator')}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer z-10"
        >
          Launch Simulator <ArrowRight size={18} />
        </button>
      </div>

      {/* Interactive Course Grid */}
      <div>
        <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Award className="text-accentYellow" size={20} /> Professional Certification Curriculum
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_COURSES.map(course => {
            const prog = courseProgress[course.id] ?? course.defaultProgress;
            return (
              <CourseCard 
                key={course.id}
                course={course}
                progress={prog}
                onClick={() => {
                  setSelectedCourse(course);
                  setActiveView('course');
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Real World Cases */}
      <div className="mt-8 bg-bgPanel border border-borderC rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
          <ShieldAlert className="text-accentRed" size={20}/> Real-World Disaster Case Studies
        </h3>
        <div className="space-y-4">
          {HISTORICAL_INCIDENTS.map((inc, i) => (
            <div 
              key={i} 
              onClick={() => { setSelectedCase(inc); setActiveView('case'); }}
              className="p-4 border border-borderC rounded-lg bg-bgCard hover:border-purple-500/50 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center group"
            >
              <div>
                <h4 className="font-bold group-hover:text-purple-400 transition-colors text-white">{inc.incident_name} — {inc.year}</h4>
                <p className="text-sm text-textMuted mt-1">{inc.root_cause.substring(0, 110)}...</p>
              </div>
              <ArrowRight className="text-textMuted group-hover:text-purple-400 transition-colors shrink-0 ml-4" size={20}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
// COMPONENT: COURSE CARD
// -----------------------------------------
function CourseCard({ course, progress, onClick }) {
  const isComplete = progress === 100;

  return (
    <div 
      onClick={onClick}
      className="bg-bgCard border border-borderC hover:border-purple-500/60 rounded-xl p-6 flex flex-col justify-between transition-all cursor-pointer group shadow-md hover:shadow-purple-500/10"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors text-base">
            {course.title}
          </h3>
          {isComplete ? (
            <div className="p-1 rounded-full bg-accentYellow/10 text-accentYellow shrink-0">
              <Award size={18} />
            </div>
          ) : (
            <div className="p-1 text-textMuted group-hover:text-purple-400 transition-colors shrink-0">
              <ChevronRight size={18} />
            </div>
          )}
        </div>
        <p className="text-xs text-textMuted leading-relaxed mb-6">
          {course.description}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-xs text-textMuted mb-2 font-medium">
          <span>Module Progress</span>
          <span className={isComplete ? "text-accentGreen font-bold" : "text-purple-400 font-bold"}>
            {progress}% {isComplete && "✓ Passed"}
          </span>
        </div>
        <div className="h-2 w-full bg-bgMain rounded-full overflow-hidden border border-borderC/50">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              isComplete ? "bg-accentGreen" : "bg-purple-500"
            }`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
// COMPONENT: INTERACTIVE COURSE VIEWER
// -----------------------------------------
function CourseViewer({ course, progress, onUpdateProgress, onBack }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === course.quiz.correctIndex;
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      onUpdateProgress(100);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8 pr-2">
      <button onClick={onBack} className="flex items-center gap-2 text-textMuted hover:text-white w-fit transition-colors text-sm font-medium cursor-pointer">
        <ArrowLeft size={16}/> Back to Learning Lab
      </button>

      {/* Course Banner */}
      <div className="bg-bgCard border border-borderC rounded-xl p-8 max-w-4xl relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-brandBlue/10 pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 border-b border-borderC pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">PSM Training Curriculum</span>
              {progress === 100 && (
                <span className="text-[10px] bg-accentGreen/10 text-accentGreen border border-accentGreen/20 px-2 py-0.5 rounded font-bold">COMPLETED & VERIFIED</span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white">{course.title}</h2>
          </div>

          <div className="bg-bgPanel border border-borderC px-4 py-2 rounded-lg text-right shrink-0">
            <span className="text-xs text-textMuted block">Current Status</span>
            <span className="text-lg font-bold text-purple-400">{progress}% Completed</span>
          </div>
        </div>

        <p className="text-sm text-textMuted leading-relaxed mb-6">
          {course.description}
        </p>

        {/* Key Concepts Grid */}
        <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
          <BookOpen className="text-brandBlue" size={20} /> Core Technical Knowledge Units
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {course.concepts.map((c, i) => (
            <div key={i} className="bg-bgPanel border border-borderC p-4 rounded-xl space-y-2">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center">
                {i + 1}
              </span>
              <h4 className="font-bold text-sm text-white">{c.name}</h4>
              <p className="text-xs text-textMuted leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Knowledge Quiz */}
        <div className="bg-bgPanel border border-borderC rounded-xl p-6">
          <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
            <HelpCircle className="text-accentYellow" size={20} /> Knowledge Evaluation & Certification Test
          </h3>
          <p className="text-xs text-textMuted mb-6">Answer the technical evaluation question correctly to unlock your module completion badge.</p>

          <form onSubmit={handleQuizSubmit} className="space-y-4">
            <h4 className="font-bold text-sm text-slate-200 leading-relaxed bg-bgCard p-4 rounded-lg border border-borderC">
              {course.quiz.question}
            </h4>

            <div className="space-y-2">
              {course.quiz.options.map((opt, idx) => (
                <div 
                  key={idx}
                  onClick={() => !submitted && setSelectedAnswer(idx)}
                  className={`p-3.5 rounded-lg border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                    selectedAnswer === idx 
                      ? 'bg-purple-600/20 border-purple-500 text-white' 
                      : 'bg-bgCard border-borderC text-slate-300 hover:border-slate-500'
                  } ${submitted && idx === course.quiz.correctIndex ? 'border-accentGreen bg-accentGreen/15 text-white font-bold' : ''}`}
                >
                  <span>{opt}</span>
                  {selectedAnswer === idx && <CheckCircle2 size={16} className="text-purple-400 shrink-0" />}
                </div>
              ))}
            </div>

            {submitted ? (
              <div className={`p-4 rounded-lg border space-y-2 ${isCorrect ? 'bg-accentGreen/10 border-accentGreen/30 text-accentGreen' : 'bg-accentRed/10 border-accentRed/30 text-accentRed'}`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isCorrect ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  <span>{isCorrect ? "Correct Answer! Module Certified." : "Incorrect Answer. Try Again."}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {course.quiz.explanation}
                </p>
                {!isCorrect && (
                  <button 
                    type="button" 
                    onClick={handleResetQuiz}
                    className="mt-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={12} /> Retry Evaluation
                  </button>
                )}
              </div>
            ) : (
              <button 
                type="submit"
                disabled={selectedAnswer === null}
                className={`w-full py-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedAnswer !== null 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-bgCard border border-borderC text-textMuted cursor-not-allowed'
                }`}
              >
                Submit Evaluation Answer <Check size={16} />
              </button>
            )}
          </form>
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
          newSpp -= 500;
          newTorque += 5;
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
      <button onClick={onBack} className="flex items-center gap-2 text-textMuted hover:text-white w-fit transition-colors text-sm font-medium cursor-pointer">
        <ArrowLeft size={16}/> Back to Learning Lab
      </button>
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><PlayCircle className="text-purple-400"/> Simulator Sandbox</h2>
          <p className="text-sm text-textMuted">Adjust parameters to see how the wellbore responds in real time.</p>
        </div>
        {alert && (
          <div className="bg-accentRed/20 text-accentRed border border-accentRed/30 px-4 py-2 rounded flex items-center gap-2 animate-pulse font-bold text-xs">
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
            <input type="range" min="5" max="35" value={wob} onChange={e => setWob(Number(e.target.value))} className="w-full accent-brandBlue cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-bold text-sm">RPM</label>
              <span className="text-brandBlue font-bold">{rpm}</span>
            </div>
            <input type="range" min="40" max="220" value={rpm} onChange={e => setRpm(Number(e.target.value))} className="w-full accent-brandBlue cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-bold text-sm">Mud Weight (SG)</label>
              <span className="text-brandBlue font-bold">{mudWeight}</span>
            </div>
            <input type="range" min="0.8" max="1.8" step="0.05" value={mudWeight} onChange={e => setMudWeight(Number(e.target.value))} className="w-full accent-brandBlue cursor-pointer" />
          </div>
          
          <div className="mt-auto bg-bgPanel p-4 rounded-lg text-xs text-textMuted border border-borderC">
            <strong>Challenge:</strong> Try lowering Mud Weight below 1.0 SG to trigger a Kick, or increasing WOB above 25k to stall the bit.
          </div>
        </div>

        <div className="flex-1 bg-bgCard border border-borderC rounded-xl p-6 flex flex-col">
          <h3 className="font-bold mb-4 text-white text-base">Live Telemetry Response</h3>
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
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8 pr-2">
      <button onClick={onBack} className="flex items-center gap-2 text-textMuted hover:text-white w-fit transition-colors text-sm font-medium cursor-pointer">
        <ArrowLeft size={16}/> Back to Learning Lab
      </button>

      <div className="bg-bgCard border border-borderC rounded-xl p-8 max-w-4xl shadow-lg">
        <div className="flex items-center gap-3 mb-6 border-b border-borderC pb-4">
          <ShieldAlert className="text-accentRed" size={32} />
          <div>
            <h2 className="text-3xl font-bold text-white">{caseData.incident_name}</h2>
            <p className="text-textMuted text-sm">{caseData.region}, {caseData.country} — {caseData.year}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-bgPanel p-4 rounded-lg border border-borderC">
            <p className="text-xs text-textMuted mb-1 uppercase tracking-wider">Operator / Contractor</p>
            <p className="font-bold text-white text-sm">{caseData.operator} / {caseData.contractor}</p>
          </div>
          <div className="bg-bgPanel p-4 rounded-lg border border-borderC">
            <p className="text-xs text-textMuted mb-1 uppercase tracking-wider">Fatalities / Outcome</p>
            <p className="font-bold text-accentRed text-sm">{caseData.fatalities} Fatalities — {caseData.outcome}</p>
          </div>
        </div>

        <div className="space-y-6 text-sm">
          <div>
            <h3 className="text-lg font-bold text-brandBlue mb-2 border-b border-borderC pb-2">Root Cause</h3>
            <p className="leading-relaxed text-slate-300">{caseData.root_cause}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accentYellow mb-2 border-b border-borderC pb-2">Contributing Factors</h3>
            <p className="leading-relaxed text-slate-300">{caseData.contributing_factors}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-400 mb-2 border-b border-borderC pb-2">Human & Procedural Factors</h3>
            <p className="leading-relaxed text-slate-300">{caseData.human_factors}</p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-borderC flex justify-between items-center">
          <a href={caseData.source_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brandBlue hover:underline text-xs font-bold">
            <FileText size={16} /> Read Official Investigation Report
          </a>
          <span className="px-3 py-1 bg-white/5 border border-borderC rounded-full text-xs font-mono text-textMuted">{caseData.incident_id}</span>
        </div>
      </div>
    </div>
  );
}
