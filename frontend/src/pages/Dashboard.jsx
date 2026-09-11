import React, { useState, useEffect, useRef } from 'react';
import { MapPin, BarChart2, Sparkles, ChevronDown, Droplet, CheckCircle2, AlertTriangle, AlertCircle, Maximize2, FileText, Loader2, Activity, Clock, Crosshair, Filter } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Circle, Tooltip, useMapEvents } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { MOCK_SITES } from '../data/mockSites';
import { HISTORICAL_INCIDENTS, DEMO_DATA } from '../data/intelligenceData';

// Map uploaded synthetic demo data into map pins
const demoPins = DEMO_DATA.wells.map((w, i) => {
  let pos = [26.5 + (i * 0.1), 93.0 + (i * 0.1)]; 
  if (w.basin.includes('Cambay')) pos = [22.5 + (i * 0.1), 71.5 + (i * 0.1)];
  return {
    id: w.well_id,
    pos,
    status: w.scenario.includes('kick') ? 'yellow' : 'red',
    state: w.basin,
    name: w.well_id,
    operator: 'Synthetic Demo',
    spud: 'Simulation',
    td: 'Unknown',
    formation: w.formation,
    rca: w.scenario
  };
});

// Map uploaded historical incidents into map pins
const incidentPins = HISTORICAL_INCIDENTS.map((inc, i) => {
  let pos = [0, 0];
  if (inc.region.includes('Gulf of Mexico')) pos = [28.7, -88.3];
  else if (inc.region.includes('Timor Sea')) pos = [-11.0, 126.0];
  else if (inc.region.includes('North Sea')) pos = [56.5, 3.2];
  return {
    id: inc.incident_id,
    pos: [pos[0] + (i * 0.05), pos[1] + (i * 0.05)], 
    status: 'red',
    state: inc.region,
    name: inc.incident_name,
    operator: inc.operator,
    spud: inc.date,
    td: inc.water_depth,
    formation: 'Major Incident',
    rca: inc.failure_subtype
  };
});

const INITIAL_PINS = [...MOCK_SITES, ...demoPins, ...incidentPins];

// Inside the Dashboard component, we will use useState(INITIAL_PINS)

const BAR_DATA = [
  { day: '3 Sep', active: 10, inactive: 4 },
  { day: '6 Sep', active: 11, inactive: 3 },
  { day: '7 Sep', active: 12, inactive: 4 },
  { day: '8 Sep', active: 13, inactive: 3 },
  { day: '9 Sep', active: 11, inactive: 5 },
  { day: '10 Sep', active: 14, inactive: 2 },
  { day: '11 Sep', active: 14, inactive: 2 },
];

const PIE_DATA = [
  { name: 'High Risk', value: 3, color: '#F43F5E' },
  { name: 'Medium Risk', value: 16, color: '#FBBF24' },
  { name: 'Low-Mod Risk', value: 3, color: '#3B82F6' },
  { name: 'Active', value: 2, color: '#10B981' },
];

function MapInteractionHandler({ setCustomLocation, setSelectedPinId }) {
  useMapEvents({
    click(e) {
      setSelectedPinId(null);
      setCustomLocation([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mapMode, setMapMode] = useState('satellite'); 
  const [aiData, setAiData] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedPinId, setSelectedPinId] = useState('AS-07');
  const [customLocation, setCustomLocation] = useState(null);
  const [radiusKm, setRadiusKm] = useState(100);
  const [pins, setPins] = useState(INITIAL_PINS);
  const [demoStage, setDemoStage] = useState(0);
  const mapContainerRef = useRef(null);

  const activeTarget = selectedPinId 
    ? pins.find(p => p.id === selectedPinId)
    : customLocation ? {
        id: 'CUSTOM',
        name: `Lat: ${customLocation[0].toFixed(2)}, Lng: ${customLocation[1].toFixed(2)}`,
        state: 'Custom Target',
        operator: 'N/A (No Drilling History)',
        spud: 'Pre-Drill Phase',
        td: 'TBD',
        formation: 'Survey Area',
        status: 'custom',
        rca: 'Predictive assessment based on regional analogues.'
      } : pins.find(p => p.id === 'AS-07');

  const triggerDemoSequence = () => {
    const nextStage = (demoStage + 1) % 4;
    setDemoStage(nextStage);
    
    setPins(prev => prev.map(p => {
      // Assuming 'ASSAM-07' is the ID in the demo data
      if (p.id === 'ASSAM-07') {
        if (nextStage === 0) return { ...p, status: 'green', rca: 'Normal Drilling' };
        if (nextStage === 1) return { ...p, status: 'yellow', rca: 'Anomaly Detected: ROP dropping, Torque rising' };
        if (nextStage === 2) return { ...p, status: 'red', rca: 'CRITICAL: Stuck Pipe Risk. AI RAG match found.' };
        if (nextStage === 3) return { ...p, status: 'red', rca: 'INCIDENT ESCALATED: Worker Safety Evacuation' };
      }
      return p;
    }));
    
    if (nextStage > 0) setSelectedPinId('ASSAM-07');
  };

  useEffect(() => {
    const fetchAI = async () => {
      setLoadingAi(true);
      setAiData(null);
      try {
        const res = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            well_id: activeTarget.id,
            region: activeTarget.state,
            telemetry_state: { spp: 2940, rop: 18.4, torque: 14.8 }
          })
        });
        if (res.ok) {
          const data = await res.json();
          setAiData(data);
        } else {
          throw new Error("API not ready");
        }
      } catch (err) {
        setTimeout(() => {
          if (activeTarget.status === 'custom') {
            const lat = customLocation?.[0] || 0;
            const lng = customLocation?.[1] || 0;
            // Generate a deterministic risk based on coordinates
            const isRisky = Math.abs((Math.floor(lat * 100) + Math.floor(lng * 100)) % 3) === 0;
            const maxDepth = Math.floor(1500 + Math.abs(lat * lng) % 3000);
            
            setAiData({
              confidence: isRisky ? 95 : 82,
              root_cause: isRisky ? "High Georisk Zone" : "Area Pre-Assessment",
              historical_matches: [4,5],
              recommendation: `No existing drills found in this radius. Based on predictive analogues:\n\n${isRisky ? 'RISKY: Cannot drill safely here due to high fault-line probability and poor geomechanics.' : `Clearance: Safe to drill up to ${maxDepth}m vertically. Expect abnormal pore pressures beyond this depth.`}`
            });
          } else {
            setAiData({
              confidence: activeTarget.status === 'red' ? 87 : activeTarget.status === 'yellow' ? 65 : 95,
              root_cause: activeTarget.rca,
              historical_matches: [1,2,3],
              recommendation: activeTarget.status === 'red' ? 
                `Critical Alert: ${activeTarget.rca}. Inspect pressure-control equipment immediately.\nHistorical drills in this area reached ${activeTarget.td}.` : 
                `Proceed with normal operations. Parameters are stable.\nCurrent well TD is ${activeTarget.td}. Safe to proceed further.`
            });
          }
          setLoadingAi(false);
        }, 50); // Immediate response per user request
      }
    };
    fetchAI();
  }, [selectedPinId, customLocation, pins]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      
      {/* TOP SECTION */}
      <div className="flex gap-6 h-[500px]">
        
        {/* MAP SECTION */}
        <div className="flex-[2] flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bgCard p-4 rounded-xl border border-borderC">
            <div>
              <h2 className="text-2xl font-bold">Global Operations Map</h2>
              <p className="text-textMuted text-sm">Real-time geospatial tracking of all energy assets.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button onClick={triggerDemoSequence} className="bg-accentRed hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-bold shadow-[0_0_10px_rgba(244,63,94,0.4)] transition-colors animate-pulse">
                [{demoStage}] TRIGGER SCENARIO
              </button>
              {/* Radius Slider (Now outside map) */}
              <div className="flex items-center gap-3 bg-bgPanel border border-borderC rounded-lg px-4 py-2 w-full sm:w-64">
                <span className="text-xs text-textMuted font-medium uppercase tracking-wide shrink-0">Radius</span>
                <input 
                  type="range" 
                  min="10" 
                  max="2000" 
                  step="10" 
                  value={radiusKm} 
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                  className="flex-1 h-1 bg-borderC rounded-lg appearance-none cursor-pointer accent-brandBlue outline-none"
                />
                <span className="font-bold text-brandBlue bg-brandBlue/10 px-2 py-0.5 rounded text-xs shrink-0">{radiusKm} km</span>
              </div>

              {/* Map/Satellite Toggle (Now outside map) */}
              <div className="flex bg-bgPanel rounded-md border border-borderC overflow-hidden text-sm shrink-0">
                <button onClick={() => setMapMode('map')} className={`px-4 py-1.5 ${mapMode === 'map' ? 'bg-brandBlue text-white' : 'text-textMuted hover:text-white transition-colors'}`}>Map</button>
                <button onClick={() => setMapMode('satellite')} className={`px-4 py-1.5 ${mapMode === 'satellite' ? 'bg-brandBlue text-white' : 'text-textMuted hover:text-white transition-colors'}`}>Satellite</button>
              </div>

              <button onClick={toggleFullscreen} className="flex items-center gap-2 bg-bgPanel hover:bg-white/5 border border-borderC px-3 py-1.5 rounded-md text-sm transition-colors shrink-0">
                <Maximize2 size={16}/> Expand
              </button>
            </div>
          </div>

          <div ref={mapContainerRef} className="flex-1 bg-bgCard rounded-xl border border-borderC overflow-hidden relative shadow-lg">
            
            <MapContainer center={[20, 0]} zoom={2} style={{ width: '100%', height: '100%' }} zoomControl={false} minZoom={2}>
              <MapInteractionHandler setCustomLocation={setCustomLocation} setSelectedPinId={setSelectedPinId} />
              
              {mapMode === 'satellite' ? (
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri" />
              ) : (
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri" />
              )}
              
              {customLocation && !selectedPinId && (
                <Circle center={customLocation} radius={radiusKm * 1000} pathOptions={{ color: '#2C81FF', fillColor: '#2C81FF', fillOpacity: 0.15, weight: 2, dashArray: '4 4' }} />
              )}
              
              {pins.map(p => {
                const isSelected = p.id === selectedPinId;
                return (
                  <CircleMarker key={p.id} center={p.pos} radius={isSelected ? 8 : 6} eventHandlers={{ click: () => setSelectedPinId(p.id) }}
                    pathOptions={{ fillColor: p.status === 'red' ? '#F43F5E' : p.status === 'yellow' ? '#FBBF24' : '#10B981', color: isSelected ? '#fff' : 'rgba(255,255,255,0.2)', weight: isSelected ? 2 : 1, fillOpacity: 0.9 }} className="cursor-pointer">
                    {isSelected && (
                      <Tooltip permanent direction="top" className="bg-bgPanel border-borderC text-white font-bold shadow-2xl" offset={[0, -12]}>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] uppercase text-textMuted tracking-wider mb-1">{p.name}</span>
                          <MapPin size={16} className="text-white" />
                        </div>
                      </Tooltip>
                    )}
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        </div>

        {/* RIGHT SIDEBAR (Site Details) */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          
          <div className="flex-1 bg-bgCard rounded-xl border border-borderC p-5 flex flex-col min-h-0">
            <div className="flex justify-between items-start mb-6 border-b border-borderC pb-4 shrink-0">
              <div>
                <h3 className="font-bold text-lg mb-1">{activeTarget.id === 'CUSTOM' ? 'Area Analysis' : `Well - ${activeTarget.name}`}</h3>
                <div className="flex flex-col gap-1 mt-2">
                  <p className="text-sm text-textMuted flex items-center gap-1"><MapPin size={12}/> {activeTarget.state}</p>
                  {activeTarget.id !== 'CUSTOM' && (
                    <p className="text-sm text-brandBlue flex items-center gap-1 font-medium">Total Depth: {activeTarget.td}</p>
                  )}
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                activeTarget.status === 'green' ? 'bg-accentGreen/10 text-accentGreen border-accentGreen/20' :
                activeTarget.status === 'yellow' ? 'bg-accentYellow/10 text-accentYellow border-accentYellow/20' :
                activeTarget.status === 'custom' ? 'bg-brandBlue/10 text-brandBlue border-brandBlue/20' :
                'bg-accentRed/10 text-accentRed border-accentRed/20'
              }`}>
                {activeTarget.status === 'custom' ? <Crosshair size={12}/> : <CheckCircle2 size={12} />} 
                {activeTarget.status === 'green' ? 'Active' : activeTarget.status === 'yellow' ? 'Warning' : activeTarget.status === 'custom' ? 'Target' : 'High Risk'}
              </span>
            </div>

            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-2">
              <div className="flex space-x-6 border-b border-borderC mb-4 text-sm font-medium shrink-0">
                {['Overview', 'Telemetry', 'History'].map(t => (
                  <div key={t} onClick={() => setActiveTab(t)} className={`pb-2 cursor-pointer transition-colors ${activeTab === t ? 'text-brandBlue border-b-2 border-brandBlue' : 'text-textMuted hover:text-textMain'}`}>{t}</div>
                ))}
              </div>

              {activeTab === 'Overview' && (
                <div className="flex-1 text-sm grid grid-cols-3 gap-y-4">
                  <div><p className="text-xs text-textMuted mb-1">Operator</p><p className="font-semibold">{activeTarget.operator}</p></div>
                  <div><p className="text-xs text-textMuted mb-1">Status Date</p><p className="font-semibold">{activeTarget.spud}</p></div>
                  <div><p className="text-xs text-textMuted mb-1">Total Depth (TD)</p><p className="font-semibold">{activeTarget.td}</p></div>
                  <div className="col-span-2"><p className="text-xs text-textMuted mb-1">Target Formation</p><p className="font-semibold">{activeTarget.formation}</p></div>
                  <div className="col-span-3">
                    <p className="text-xs text-textMuted mb-2">Diagnostic Status</p>
                    <div className="flex gap-2">
                      <span className={`text-xs border px-2 py-1 rounded ${
                        activeTarget.status === 'green' ? 'bg-accentGreen/10 text-accentGreen border-accentGreen/20' :
                        activeTarget.status === 'yellow' ? 'bg-accentYellow/10 text-accentYellow border-accentYellow/20' :
                        activeTarget.status === 'custom' ? 'bg-brandBlue/10 text-brandBlue border-brandBlue/20' :
                        'bg-accentRed/10 text-accentRed border-accentRed/20'
                      }`}>
                        {activeTarget.rca}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'Telemetry' && (
                <div className="flex-1 flex flex-col justify-center text-center text-textMuted text-sm">Telemetry sensors offline or not connected for this target.</div>
              )}
              {activeTab === 'History' && (
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {activeTarget.status === 'custom' ? (
                    <div className="flex flex-col justify-center text-center text-textMuted text-sm h-full">No historical drilling logs exist for this un-drilled coordinate.</div>
                  ) : (
                    <div className="relative border-l border-borderC ml-3 space-y-6 pb-2">
                      <TimelineEvent 
                        date="Current" 
                        title={activeTarget.rca} 
                        desc={activeTarget.status === 'green' ? "Drilling ahead smoothly. Parameters normal." : "Operations halted or adjusted pending engineering review."} 
                        color={activeTarget.status === 'green' ? 'bg-accentGreen' : activeTarget.status === 'yellow' ? 'bg-accentYellow' : 'bg-accentRed'} 
                      />
                      <TimelineEvent 
                        date="2 Days Ago" 
                        title="Formation Evaluation" 
                        desc="LWD tools deployed. Resistivity logs indicate expected lithology transition." 
                        color="bg-brandBlue" 
                      />
                      <TimelineEvent 
                        date="1 Week Ago" 
                        title="Intermediate Casing Set" 
                        desc="Ran and cemented 9-5/8'' casing string. BOP tested to 5,000 psi successfully." 
                        color="bg-textMuted" 
                      />
                      <TimelineEvent 
                        date={activeTarget.spud} 
                        title="Spud Date" 
                        desc={`Rig mobilized and well spudded by ${activeTarget.operator}.`} 
                        color="bg-borderC" 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-bgCard rounded-xl border border-borderC p-5 flex-1 relative overflow-hidden flex flex-col min-h-0">
            <h3 className="font-semibold flex items-center gap-2 mb-4 relative z-10"><Sparkles className="text-brandBlue" size={18} /> RAG AI Intelligence</h3>
            <div className="flex-1 overflow-y-auto relative z-10 space-y-3 pr-2">
              {loadingAi ? (
                <div className="h-full flex flex-col items-center justify-center text-textMuted gap-3">
                  <Loader2 className="animate-spin" size={24} />
                  <p className="text-xs">Querying Geological Vector DB...</p>
                </div>
              ) : aiData ? (
                <>
                  <div className="flex gap-3 items-center mb-1">
                    <div className="w-10 h-10 rounded-full border-2 border-brandBlue flex items-center justify-center text-brandBlue font-bold text-sm bg-brandBlue/10">
                      {aiData.confidence}%
                    </div>
                    <div>
                      <p className="text-xs text-textMuted">Confidence Score</p>
                      <p className="text-sm font-semibold text-textMain">{aiData.root_cause}</p>
                    </div>
                  </div>
                  <div className="bg-bgPanel rounded-lg border border-borderC p-3 flex gap-4 items-center">
                    <div className="bg-brandBlue/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="text-brandBlue" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-textMuted mb-0.5">Historical Similarity (RAG)</p>
                      <p className="text-sm font-medium">{aiData.historical_matches?.length || 0} previous incidents found</p>
                    </div>
                  </div>
                  <div className="bg-bgPanel rounded-lg border border-borderC p-3 flex gap-4">
                    <div className="bg-accentYellow/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      <Sparkles className="text-accentYellow" size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted mb-1">AI Recommendation</p>
                      <p className="text-xs leading-relaxed text-textMuted">{aiData.recommendation}</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-64">
        <div className="bg-bgCard rounded-xl border border-borderC p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4 relative">
            <h3 className="font-semibold flex items-center gap-2"><BarChart2 size={18} className="text-textMuted"/> Drilling Activity</h3>
          </div>
          <div className="flex justify-center gap-4 text-xs mb-4">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accentGreen"></div> Active</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-borderC"></div> Inactive</span>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#23324A" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <RechartsTooltip cursor={{fill: '#23324A'}} contentStyle={{backgroundColor: '#0E1623', border: '1px solid #23324A'}}/>
                <Bar dataKey="active" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} barSize={12} />
                <Bar dataKey="inactive" stackId="a" fill="#23324A" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bgCard rounded-xl border border-borderC p-5 flex flex-col relative">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><AlertTriangle size={18} className="text-textMuted"/> Risk Distribution</h3>
          <div className="flex-1 min-h-0 flex items-center">
            <div className="w-1/2 h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                    {PIE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold">24</span>
                <span className="text-[10px] text-textMuted">Total Sites</span>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-3 justify-center pl-4">
              <LegendRow color="bg-accentRed" label="High Risk" sub="(Failed)" />
              <LegendRow color="bg-accentYellow" label="Medium Risk" sub="(Suspended/Partial)" />
              <LegendRow color="bg-blue-500" label="Low-Mod Risk" sub="(Minor Issues)" />
              <LegendRow color="bg-accentGreen" label="Active" />
            </div>
          </div>
        </div>

        <div className="bg-bgCard rounded-xl border border-borderC p-5 flex flex-col">
          <h3 className="font-semibold flex items-center gap-2 mb-4 text-accentRed"><AlertTriangle size={18} /> Top Risk Causes</h3>
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            <CauseRow color="bg-pink-500" label="Wellbore Instability" pct="28%" />
            <CauseRow color="bg-accentRed" label="Abnormal Pressure Trend" pct="29%" />
            <CauseRow color="bg-accentYellow" label="Equipment Failure" pct="18%" />
            <CauseRow color="bg-blue-500" label="Economic Abandonment" pct="13%" />
            <CauseRow color="bg-textMuted" label="Regulatory Shutdown" pct="7%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label, sub }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <div className={`w-2.5 h-2.5 rounded-sm mt-0.5 shrink-0 ${color}`}></div>
      <div>
        <div className="text-textMain">{label}</div>
        {sub && <div className="text-textMuted scale-90 origin-left">{sub}</div>}
      </div>
    </div>
  );
}

function CauseRow({ color, label, pct }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <div className={`w-2 h-2 rounded-full shrink-0 ${color}`}></div>
      <div className="flex-1 text-textMain">{label}</div>
      <div className="font-medium">{pct}</div>
    </div>
  );
}

function TimelineEvent({ date, title, desc, color }) {
  return (
    <div className="relative pl-6">
      <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}></div>
      <div className="text-[10px] font-bold uppercase text-textMuted mb-0.5 tracking-wider">{date}</div>
      <div className="text-sm font-semibold text-textMain mb-1">{title}</div>
      <div className="text-xs text-textMuted leading-relaxed">{desc}</div>
    </div>
  );
}
