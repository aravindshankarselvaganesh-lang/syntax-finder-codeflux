import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Award, PlayCircle, ShieldAlert, ArrowRight, ArrowLeft, 
  Activity, AlertTriangle, ChevronRight, FileText, CheckCircle2, 
  HelpCircle, Sparkles, Check, RefreshCw, ExternalLink, Compass, 
  Terminal, Layers
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HISTORICAL_INCIDENTS } from '../data/intelligenceData';

const INITIAL_COURSES = [
  {
    id: 1,
    title: "Level 1: Geology Basics & Subsurface Formations",
    description: "Master sedimentary rock layers, pore pressure calculations, fault traps, and lithology identification in regional basins.",
    defaultProgress: 100,
    roadmap: [
      "Step 1: Learn lithology identification (Sandstone vs Shale vs Carbonates)",
      "Step 2: Understand Hydrostatic Pressure vs Pore Pressure gradients (0.433 - 0.465 psi/ft)",
      "Step 3: Analyze seismic fault trap mechanics and fault-line hazards",
      "Step 4: Explore DGH NDR Indian Basin lithology records and USGS geological maps"
    ],
    studyNotes: [
      {
        section: "Lithology Classification & Reservoirs",
        content: "Sedimentary rocks constitute over 90% of petroleum reservoirs globally. Sandstone offers high intergranular porosity (15-30%), while tight shale acts as an impermeable seal (permeability < 0.001 mD). Carbonate reservoirs (limestone/dolomite) rely heavily on secondary fracture porosity."
      },
      {
        section: "Subsurface Pressure Windows",
        content: "Normal hydrostatic pressure gradient in fresh water is 0.433 psi/ft (0.098 bar/m) and saline water is 0.465 psi/ft. When clay compaction is hindered during rapid burial, undercompacted shales retain trapped pore fluids, causing abnormal high pore pressure (P_pore > P_hydrostatic)."
      },
      {
        section: "Fault Traps & Georisk Signals",
        content: "Fault lines can act as either permeable fluid migration conduits or impermeable structural traps. Drilling near active seismic fault zones introduces severe risk of lost circulation and wellbore instability."
      }
    ],
    tools: [
      "Schlumberger Oilfield Log Interpreter Handbook",
      "DGH NDR (National Data Repository India) Geospatial Viewer",
      "USGS Global Subsurface Stratigraphy Maps"
    ],
    referenceLinks: [
      { name: "DGH India National Data Repository (NDR)", url: "https://ndr.dghindia.gov.in/", desc: "Official Indian basin lithology & well log data repository (Assam, Cambay, KG Basin)." },
      { name: "USGS Energy Resources Program", url: "https://www.usgs.gov/energy-and-minerals/energy-resources-program", desc: "Free public geological surveys, subsurface stratigraphy maps, and hydrocarbon assessments." },
      { name: "SEPM Strata Sequence Stratigraphy Guide", url: "https://www.sepmstrata.org/", desc: "Open-access sequence stratigraphy, sedimentology guides, and depositional models." },
      { name: "AAPG Educational Resources", url: "https://www.aapg.org/", desc: "American Association of Petroleum Geologists papers on subsurface structural traps." }
    ],
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
    title: "Level 2: Petroleum Systems & Basin Analysis",
    description: "Study source rock maturation, kerogen conversion, thermal windows, permeability Darcy laws, and seal integrity.",
    defaultProgress: 80,
    roadmap: [
      "Step 1: Understand source rock TOC (Total Organic Carbon) & Vitrinite Reflectance (Ro)",
      "Step 2: Calculate fluid flow using Darcy's Law: Q = (k * A * ΔP) / (μ * L)",
      "Step 3: Evaluate migration pathways and seal entry pressure",
      "Step 4: Study OnePetro SPE technical papers on basin modeling"
    ],
    studyNotes: [
      {
        section: "Source Rock Maturation & Thermal Window",
        content: "Hydrocarbon generation requires Total Organic Carbon (TOC > 2%) and thermal maturation within the oil window (60°C - 120°C, Vitrinite Reflectance Ro = 0.6% - 1.3%). Beyond 150°C, thermal cracking converts heavy oil to dry gas (CH4)."
      },
      {
        section: "Fluid Flow & Darcy's Law",
        content: "Flow rate through porous media is governed by Darcy's Law: Q = (k * A * ΔP) / (μ * L) where k is permeability in Darcys, A is cross-sectional area, ΔP is pressure differential, and μ is fluid viscosity."
      },
      {
        section: "Seal Capacity & Entry Pressure",
        content: "Capillary entry pressure of top-seal shales dictates the maximum hydrocarbon column height (H_max) a reservoir trap can retain before leaking through pore throats."
      }
    ],
    tools: [
      "Schlumberger Petrel Basin & Petroleum Systems Modeling",
      "OnePetro SPE Research Engine",
      "EIA International Basin Data Explorer"
    ],
    referenceLinks: [
      { name: "SPE OnePetro Research Library", url: "https://www.onepetro.org/", desc: "Global repository of over 200,000 peer-reviewed Society of Petroleum Engineers technical papers." },
      { name: "Schlumberger Oilfield Glossary", url: "https://glossary.slb.com/", desc: "Definitive technical glossary of petroleum engineering, well logging, and geology." },
      { name: "EIA International Energy Data Explorer", url: "https://www.eia.gov/international/data/explorer", desc: "US Energy Information Administration global production and basin statistics." }
    ],
    concepts: [
      { name: "Source Rock Maturation", desc: "Organic-rich shale buried under heat and pressure over geological time scales." },
      { name: "Porosity vs Permeability", desc: "Porosity measures void storage space; permeability measures how easily fluids flow through interconnected pores." },
      { name: "Trap Structures", desc: "Anticlinal folds, salt domes, and stratigraphic traps holding oil and gas deposits." }
    ],
    quiz: {
      question: "Which rock property determines how easily oil and gas flow through subsurface reservoir pores under pressure?",
      options: [
        "A) Rock Bulk Density",
        "B) Permeability (Correct)",
        "C) Mohs Hardness Scale",
        "D) Thermal Conductivity"
      ],
      correctIndex: 1,
      explanation: "Permeability defines the interconnectivity of pore spaces and capacity for fluid flow under pressure gradients."
    }
  },
  {
    id: 3,
    title: "Level 3: Drilling Mechanics & Rig Hydraulics",
    description: "Master Weight-on-Bit (WOB), Torque & Drag, RPM, Rate of Penetration (ROP), and Equivalent Circulating Density (ECD).",
    defaultProgress: 30,
    roadmap: [
      "Step 1: Master bit mechanics (PDC vs Roller-Cone cutter interaction)",
      "Step 2: Calculate Standpipe Pressure (SPP) and Equivalent Circulating Density (ECD)",
      "Step 3: Diagnose telemetry anomalies (Bit balling, stick-slip vibration, tight hole)",
      "Step 4: Practice real-time parameter tuning in the PSM Drilling Simulator"
    ],
    studyNotes: [
      {
        section: "Hydraulics & Equivalent Circulating Density (ECD)",
        content: "Circulating mud exerts dynamic pressure on the formation. ECD accounts for annular friction loss: ECD = MW + (ΔP_annular / (0.052 * TVD)). Maintaining ECD strictly between Pore Pressure (P_pore) and Fracture Gradient (P_frac) prevents lost circulation and well kicks."
      },
      {
        section: "Torque & Drag Modeling",
        content: "Excessive pick-up or slack-off hook load weight indicates differential sticking or keyseating. Torque spikes accompanied by ROP drops indicate bit balling in sticky clay shales."
      },
      {
        section: "BHA Telemetry (MWD/LWD)",
        content: "Measurement-While-Drilling (MWD) pulse telemetry transmits inclination, azimuth, downhole WOB, and gamma ray logs in real time."
      }
    ],
    tools: [
      "IADC Drilling Manual & DDR Specifications",
      "Halliburton Landmark WellPlan & COMPASS",
      "Corva AI Real-Time Drilling Telemetry Engine"
    ],
    referenceLinks: [
      { name: "IADC (International Association of Drilling Contractors)", url: "https://www.iadc.org/", desc: "Standard industry organization providing drilling manuals, DDR specs, and safety guidelines." },
      { name: "Corva AI Real-Time Drilling Analytics", url: "https://www.corva.ai/", desc: "Modern cloud platform for rig telemetry visualization, ROP optimization, and BHA tracking." },
      { name: "Offshore Technology Technical Reports", url: "https://www.offshore-technology.com/", desc: "Technical news and deepwater drilling equipment reviews." }
    ],
    concepts: [
      { name: "BHA & Bit Selection", desc: "Selecting PDC vs Roller-Cone bits and positioning MWD/LWD telemetry tools." },
      { name: "ROP Optimization", desc: "Balancing WOB and RPM to maximize drilling speed without inducing thermal bit cutter wear." },
      { name: "Stick-Slip & Torsional Vibration", desc: "Managing rotational drag fluctuations that cause premature cutter destruction." }
    ],
    quiz: {
      question: "What is the primary diagnostic signature of bit balling while drilling through sticky shale?",
      options: [
        "A) Sharp drop in ROP accompanied by rising torque and standpipe pressure (Correct)",
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
    description: "Learn primary mud barrier management, secondary BOP ram shut-in procedures, choke manifolds, and Driller's Method.",
    defaultProgress: 0,
    roadmap: [
      "Step 1: Recognize primary kick signatures (Pit gain, flow line rise, pump pressure drop)",
      "Step 2: Practice hard vs soft shut-in procedures on BOP pipe and annular preventers",
      "Step 3: Calculate Kill Mud Weight (KMW): KMW = MW + (SIDPP / (0.052 * TVD))",
      "Step 4: Execute two-circulation Driller's Method kick circulation"
    ],
    studyNotes: [
      {
        section: "Kick Detection Signals",
        content: "Early kick warning signals include: 1) Increase in flow returns rate, 2) Pit volume gain, 3) Sudden ROP drilling break, 4) Drop in Standpipe Pressure (influx entering annulus)."
      },
      {
        section: "Kill Mud Weight Calculation",
        content: "To regain primary well control after shutting in a kick, calculate Kill Mud Weight (KMW): KMW = MW + (SIDPP / (0.052 * TVD)) where SIDPP is Shut-In Drill Pipe Pressure and TVD is True Vertical Depth."
      },
      {
        section: "Driller's Method Step-by-Step",
        content: "1st Circulation: Pump out influx gas using original mud weight while holding ICP (Initial Circulating Pressure). 2nd Circulation: Pump kill mud weight to replace light mud while holding FCP (Final Circulating Pressure)."
      }
    ],
    tools: [
      "IADC WellSharp Certification Manual",
      "IWCF Well Control Formula Sheet",
      "BSEE Offshore Well Control Regulations"
    ],
    referenceLinks: [
      { name: "IWCF (International Well Control Forum)", url: "https://www.iwcf.org/", desc: "Free well control safety manuals, formula sheets, and certification study guides." },
      { name: "IADC WellSharp Program", url: "https://www.iadc.org/wellsharp/", desc: "Official well control accreditation standards and driller training curriculum." },
      { name: "BSEE Safety & Environmental Enforcement", url: "https://www.bsee.gov/", desc: "US Federal agency regulating well control safety, BOP testing, and offshore incident investigations." }
    ],
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
    description: "Build machine learning models for streaming WITSML telemetry, vector RAG embeddings, and automated anomaly warnings.",
    defaultProgress: 0,
    roadmap: [
      "Step 1: Understand WITSML XML/JSON data structures for 1Hz rig sensors",
      "Step 2: Implement time-series anomaly detection algorithms (Isolation Forests, LSTM, Z-Score)",
      "Step 3: Download Equinor Volve open dataset (Free well logs & production history)",
      "Step 4: Build a Retrieval-Augmented Generation (RAG) pipeline for historical incident retrieval"
    ],
    studyNotes: [
      {
        section: "WITSML Real-Time Telemetry Parsing",
        content: "WITSML (Wellsite Information Transfer Standard Markup Language) standardizes real-time XML data exchange between rig acquisition systems and cloud analytics platforms."
      },
      {
        section: "Predictive Anomaly Detection",
        content: "Machine learning algorithms compute rolling statistics over 10-minute sensor windows. Rapid variance spikes in torque combined with ROP drop serve as early indicators of stuck pipe 30-45 minutes before pipe freeze."
      },
      {
        section: "Vector RAG Architectures for Energy",
        content: "High-dimensional embeddings index historical incident reports (IADC DDR, CSB reports). Cosine similarity enables instant retrieval of matching historical well anomalies."
      }
    ],
    tools: [
      "Equinor Volve Open Data Repository (Free Norwegian Well Logs)",
      "Energistics WITSML Standard Schema v1.4 / v2.0",
      "Python PyDrilling & LASIO Open-Source Libraries"
    ],
    referenceLinks: [
      { name: "Equinor Volve Open Data Sharing", url: "https://www.equinor.com/energy/volve-data-sharing", desc: "Complete real-world Norwegian continental shelf dataset (Well logs, production, seismic) free for AI research." },
      { name: "Energistics WITSML Data Standard", url: "https://www.energistics.org/witsml-standards/", desc: "Open data standard for real-time wellsite telemetry transmission." },
      { name: "Python LASIO GitHub Library", url: "https://github.com/kinverarity1/lasio", desc: "Python package for reading and parsing LAS (Log ASCII Standard) borehole log files." }
    ],
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
    title: "Level 6: Real-World Case Studies & Forensic Engineering",
    description: "Analyze major industrial disasters (Macondo, Montara, Ekofisk Bravo) and safety management systems.",
    defaultProgress: 0,
    roadmap: [
      "Step 1: Read US Chemical Safety Board (CSB) Deepwater Horizon Investigation",
      "Step 2: Analyze barrier failure chains (Swiss Cheese Model in industrial HSE)",
      "Step 3: Study Norwegian Petroleum Directorate (NPD) FactPages incident logs",
      "Step 4: Apply Stop-Work Authority & Safety Management System (SMS) protocols"
    ],
    studyNotes: [
      {
        section: "Macondo Deepwater Horizon (2010)",
        content: "Root Cause: Hydrocarbons bypassed a compromised cement shoe seal into the casing. Negative pressure test results were misinterpreted as 'bladder effect', allowing gas influx to ascend unhindered into the riser."
      },
      {
        section: "Montara Blowout (Timor Sea 2009)",
        content: "Root Cause: Single pressure barrier installation without secondary cementing verification cap. Influx rose through the 9-5/8'' casing string, resulting in an uncontained 105-day oil spill."
      },
      {
        section: "Swiss Cheese Model & Safety Culture",
        content: "Industrial disasters occur when multiple independent safety barriers (design, testing, procedure, human vigilance) fail simultaneously. Stop-Work Authority empowers any crew member to halt operations."
      }
    ],
    tools: [
      "US CSB (Chemical Safety Board) Investigation Reports",
      "NPD FactPages (Norwegian Petroleum Directorate Database)",
      "Oil India Limited (OIL) HSE Guidelines"
    ],
    referenceLinks: [
      { name: "US Chemical Safety Board (CSB) Deepwater Horizon Investigation", url: "https://www.csb.gov/", desc: "Official forensic engineering report and video breakdown of the 2010 Macondo blowout." },
      { name: "Sodir FactPages (Norwegian Petroleum Database)", url: "https://factpages.sodir.no/", desc: "Open Norwegian wellbores, drilling data, and historical incident repository." },
      { name: "Oil India Limited (OIL) HSE Guidelines", url: "https://www.oil-india.com/", desc: "Safety protocols and HSE policies for onshore Naga thrust belt & Assam drilling operations." }
    ],
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
      <div className="bg-bgCard border border-borderC rounded-xl p-8 max-w-4xl relative overflow-hidden shadow-lg space-y-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-brandBlue/10 pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 border-b border-borderC pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">PSM Training Curriculum</span>
              {progress === 100 && (
                <span className="text-[10px] bg-accentGreen/10 text-accentGreen border border-accentGreen/20 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> CERTIFIED
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white">{course.title}</h2>
          </div>

          <div className="bg-bgPanel border border-borderC px-4 py-2 rounded-lg text-right shrink-0">
            <span className="text-xs text-textMuted block">Completion Status</span>
            <span className="text-lg font-bold text-purple-400">{progress}% Completed</span>
          </div>
        </div>

        <p className="text-sm text-textMuted leading-relaxed">
          {course.description}
        </p>

        {/* 1. STEP-BY-STEP LEARNING ROADMAP */}
        {course.roadmap && (
          <div className="bg-bgPanel border border-borderC rounded-xl p-6">
            <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
              <Compass className="text-brandBlue" size={20} /> 
              How to Learn This Level (Step-by-Step Roadmap)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.roadmap.map((step, idx) => (
                <div key={idx} className="bg-bgCard border border-borderC p-3 rounded-lg flex items-start gap-2 text-xs text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-brandBlue/20 text-brandBlue font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. DETAILED STUDY NOTES */}
        {course.studyNotes && (
          <div>
            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
              <FileText className="text-purple-400" size={20} /> 
              Engineering Study Notes & Equations
            </h3>

            <div className="space-y-4">
              {course.studyNotes.map((note, idx) => (
                <div key={idx} className="bg-bgPanel border border-borderC p-5 rounded-xl space-y-2">
                  <h4 className="font-bold text-sm text-purple-300 flex items-center gap-2">
                    <Layers size={16} /> {note.section}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* 3. AUTHORITATIVE EXTERNAL REFERENCE LINKS */}
        {course.referenceLinks && (
          <div className="bg-bgPanel border border-borderC rounded-xl p-6">
            <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
              <ExternalLink className="text-accentGreen" size={20} /> 
              Authoritative External Reference Links & Resources
            </h3>
            <p className="text-xs text-textMuted mb-4">
              Official government databases, SPE research portals, and industry manuals required for mastery:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.referenceLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-bgCard border border-borderC hover:border-brandBlue p-4 rounded-xl flex flex-col justify-between transition-all group shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-xs text-brandBlue group-hover:underline flex items-center gap-1.5">
                        {link.name} <ExternalLink size={12} />
                      </h4>
                      <span className="text-[10px] bg-brandBlue/10 text-brandBlue px-2 py-0.5 rounded font-mono">OFFICIAL</span>
                    </div>
                    <p className="text-[11px] text-textMuted leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 4. RECOMMENDED TOOLS & SOFTWARE */}
        {course.tools && (
          <div className="bg-bgPanel border border-borderC rounded-xl p-6">
            <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
              <Terminal className="text-accentYellow" size={18} /> 
              Recommended Industry Tools & Data Standards
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.tools.map((t, idx) => (
                <span key={idx} className="bg-bgCard border border-borderC text-slate-200 text-xs px-3 py-1.5 rounded-lg font-mono">
                  🛠️ {t}
                </span>
              ))}
            </div>
          </div>
        )}

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
