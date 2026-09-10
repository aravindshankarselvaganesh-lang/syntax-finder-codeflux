import React, { useState, useEffect, useRef } from 'react';
import { MapPin, BarChart2, Sparkles, ChevronDown, Droplet, CheckCircle2, AlertTriangle, AlertCircle, Maximize2, FileText, Loader2, Activity, Clock } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Circle, Tooltip } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock Data
const PINS = [
  { id: 1, pos: [23.0225, 72.5714], status: 'green', state: 'Gujarat' },
  { id: 2, pos: [22.3, 71.5], status: 'red', state: 'Gujarat' },
  { id: 3, pos: [23.5, 73.0], status: 'yellow', state: 'Gujarat' },
  { id: 4, pos: [22.8, 72.1], status: 'green', state: 'Gujarat' },
  { id: 5, pos: [26.1445, 91.7362], status: 'green', state: 'Assam' },
  { id: 6, pos: [27.0, 93.0], status: 'red', state: 'Assam' },
  { id: 7, pos: [26.5, 92.5], status: 'yellow', state: 'Assam' },
  { id: 8, pos: [27.5, 94.0], status: 'green', state: 'Assam' },
  { id: 9, pos: [27.2, 95.0], status: 'red', state: 'Assam', selected: true },
];

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mapMode, setMapMode] = useState('map'); // 'map' or 'satellite'
  const [aiData, setAiData] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Fetch AI insights from the backend RAG pipeline
    const fetchAI = async () => {
      setLoadingAi(true);
      try {
        const res = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            well_id: "Assam-07",
            region: "Assam",
            telemetry_state: { spp: 2940, rop: 18.4, torque: 14.8 }
          })
        });
        if (res.ok) {
          const data = await res.json();
          setAiData(data);
        }
      } catch (err) {
        console.error("Failed to fetch AI insights", err);
      } finally {
        setLoadingAi(false);
      }
    };
    fetchAI();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="space-y-6">
      {/* TOP METRICS */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">Welcome, Astha 👋</h2>
          <p className="text-textMuted text-sm">Let's find your next viable site.</p>
        </div>
        <div className="flex space-x-4">
          <MetricCard title="Total Offset Wells" value="5km" bg="bg-bgCard border-borderC" text="text-textMain" />
          <MetricCard title="High Risk Failures" value="3" bg="bg-accentRed/10 border-accentRed/20" text="text-accentRed" />
          <MetricCard title="Med Risk / Suspended" value="16" bg="bg-accentYellow/10 border-accentYellow/20" text="text-accentYellow" />
          <MetricCard title="Minor Issues / Active" value="3/3" bg="bg-accentGreen/10 border-accentGreen/20" text="text-accentGreen" />
        </div>
      </div>

      <div className="flex gap-6 h-[500px]">
        {/* MAP SECTION */}
        <div ref={mapContainerRef} className="flex-[2] bg-bgCard rounded-xl border border-borderC flex flex-col relative overflow-hidden">
          {/* Map Overlay Controls */}
          <div className="absolute top-4 left-4 z-[400] flex bg-bgPanel/80 backdrop-blur rounded-md border border-borderC overflow-hidden text-sm shadow-xl p-1 gap-1">
            <button 
              onClick={() => setMapMode('map')}
              className={`px-4 py-1.5 rounded transition-all duration-300 font-medium ${mapMode === 'map' ? 'bg-brandBlue text-white shadow-md' : 'text-textMuted hover:bg-white/10 hover:text-white'}`}
            >
              Map
            </button>
            <button 
              onClick={() => setMapMode('satellite')}
              className={`px-4 py-1.5 rounded transition-all duration-300 font-medium ${mapMode === 'satellite' ? 'bg-brandBlue text-white shadow-md' : 'text-textMuted hover:bg-white/10 hover:text-white'}`}
            >
              Satellite
            </button>
          </div>
          <button 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-[400] bg-bgPanel/80 backdrop-blur border border-borderC p-2 rounded-md cursor-pointer hover:bg-white/10 hover:text-white transition-all text-textMuted shadow-xl"
            title="Toggle Fullscreen"
          >
            <Maximize2 size={18} />
          </button>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 right-4 z-[400] flex justify-center pointer-events-none">
            <div className="bg-bgPanel/90 backdrop-blur border border-borderC rounded-full px-6 py-2 flex items-center gap-6 text-xs text-textMuted shadow-2xl pointer-events-auto transition-transform hover:scale-105 duration-300">
              <LegendItem color="bg-accentRed" label="High Risk" />
              <LegendItem color="bg-accentYellow" label="Medium Risk" />
              <LegendItem color="bg-pink-500" label="Abandoned" />
              <LegendItem color="bg-blue-500" label="Minor Issues" />
              <LegendItem color="bg-accentGreen" label="Active" />
            </div>
          </div>

          <MapContainer 
            center={[22.0, 80.0]} 
            zoom={5} 
            className="w-full h-full z-0 bg-[#060B14]"
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            {mapMode === 'satellite' ? (
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri"
                className="brightness-75 contrast-125 saturate-50"
              />
            ) : (
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution="&copy; OpenStreetMap contributors &copy; CARTO"
              />
            )}
            
            {/* Radius Rings around Assam */}
            <Circle center={[26.5, 93.0]} radius={500000} pathOptions={{ color: '#2C81FF', fillColor: '#2C81FF', fillOpacity: 0.05, weight: 1, dashArray: '4 4' }} />
            <Circle center={[26.5, 93.0]} radius={300000} pathOptions={{ color: '#2C81FF', fillColor: '#2C81FF', fillOpacity: 0.1, weight: 1.5 }} />
            
            {/* Pins */}
            {PINS.map(p => (
              <CircleMarker 
                key={p.id} 
                center={p.pos} 
                radius={p.selected ? 8 : 6} 
                pathOptions={{ 
                  fillColor: p.status === 'red' ? '#F43F5E' : p.status === 'yellow' ? '#FBBF24' : '#10B981', 
                  color: p.selected ? '#fff' : 'rgba(255,255,255,0.2)', 
                  weight: p.selected ? 2 : 1, 
                  fillOpacity: 0.9 
                }}
              >
                {p.selected && (
                  <Tooltip permanent direction="top" className="bg-bgPanel border-borderC text-white font-bold shadow-2xl" offset={[0, -12]}>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase text-textMuted tracking-wider mb-1">Assam-07</span>
                      <MapPin size={16} className="text-white" />
                    </div>
                  </Tooltip>
                )}
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* RIGHT SIDEBAR (Site Details) */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Site Overview Card */}
          <div className="bg-bgCard rounded-xl border border-borderC flex flex-col p-5 h-[280px]">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded border border-borderC flex items-center justify-center bg-bgPanel">
                  <Droplet className="text-textMuted" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-accentRed/20 text-accentRed px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                      <AlertCircle size={12} /> High Risk
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">Well - Assam-07</h3>
                  <p className="text-xs text-textMuted flex items-center gap-1"><MapPin size={12} /> Dibrugarh, Assam</p>
                </div>
              </div>
              <span className="text-xs bg-accentGreen/20 text-accentGreen px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                <CheckCircle2 size={12} /> Active
              </span>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-borderC mb-4 text-sm font-medium">
              {['Overview', 'Telemetry', 'History'].map(t => (
                <div 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`pb-2 cursor-pointer transition-colors ${activeTab === t ? 'text-brandBlue border-b-2 border-brandBlue' : 'text-textMuted hover:text-textMain'}`}
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Content */}
            {activeTab === 'Overview' && (
              <div className="flex-1 text-sm grid grid-cols-3 gap-y-4">
                <div>
                  <p className="text-xs text-textMuted mb-1">Operator</p>
                  <p className="font-semibold">Oil India Ltd</p>
                </div>
                <div>
                  <p className="text-xs text-textMuted mb-1">Spud Date</p>
                  <p className="font-semibold">12 Aug 2026</p>
                </div>
                <div>
                  <p className="text-xs text-textMuted mb-1">Total Depth (TD)</p>
                  <p className="font-semibold">3,102 m</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-textMuted mb-1">Target Formation</p>
                  <p className="font-semibold">RDFC</p>
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-xs text-textMuted underline cursor-pointer hover:text-textMain">Risk Factors</span>
                </div>
                <div className="col-span-3">
                  <p className="text-xs text-textMuted mb-2">Cessation Reason</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-accentYellow/10 text-accentYellow border border-accentYellow/20 px-2 py-1 rounded">Wellbore Instability</span>
                    <span className="text-xs bg-accentRed/10 text-accentRed border border-accentRed/20 px-2 py-1 rounded">Economic Abandonment</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Telemetry' && (
              <div className="flex-1 flex flex-col gap-3 justify-center">
                <div className="flex items-center justify-between p-2 rounded bg-bgPanel border border-borderC">
                  <div className="flex items-center gap-2"><Activity size={14} className="text-brandBlue"/> <span className="text-sm font-medium">Standpipe Pressure</span></div>
                  <div className="text-accentRed font-bold">2,940 psi <span className="text-[10px] text-textMuted font-normal">↑ 14%</span></div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-bgPanel border border-borderC">
                  <div className="flex items-center gap-2"><Activity size={14} className="text-accentGreen"/> <span className="text-sm font-medium">Rate of Penetration</span></div>
                  <div className="text-textMain font-bold">18.4 m/hr</div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-bgPanel border border-borderC">
                  <div className="flex items-center gap-2"><Activity size={14} className="text-accentYellow"/> <span className="text-sm font-medium">Rotary Torque</span></div>
                  <div className="text-textMain font-bold">14.8 kNm</div>
                </div>
              </div>
            )}

            {activeTab === 'History' && (
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-accentRed/20 flex items-center justify-center shrink-0 mt-0.5"><Clock size={12} className="text-accentRed"/></div>
                  <div>
                    <p className="text-xs text-textMuted">Today, 09:41 AM</p>
                    <p className="text-sm">Pressure spike detected. Drilling halted.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-accentYellow/20 flex items-center justify-center shrink-0 mt-0.5"><Clock size={12} className="text-accentYellow"/></div>
                  <div>
                    <p className="text-xs text-textMuted">Yesterday, 14:20 PM</p>
                    <p className="text-sm">Minor torque fluctuations recorded.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-borderC flex items-center justify-center shrink-0 mt-0.5"><Clock size={12} className="text-textMuted"/></div>
                  <div>
                    <p className="text-xs text-textMuted">12 Aug 2026</p>
                    <p className="text-sm">Spud initiated successfully.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights Card */}
          <div className="bg-bgCard rounded-xl border border-borderC flex flex-col flex-1 p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold flex items-center gap-2"><Sparkles className="text-brandBlue" size={18} /> AI-Powered Operational Insights</h3>
              <span className="text-xs text-brandBlue hover:underline cursor-pointer">AI Insights</span>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-2">
              {loadingAi ? (
                <div className="flex flex-col items-center justify-center h-full text-textMuted space-y-4">
                  <Loader2 className="animate-spin text-brandBlue" size={32} />
                  <p className="text-xs text-center">Querying RAG Pipeline...<br/>Searching PDF reports for similar incidents</p>
                </div>
              ) : aiData ? (
                <>
                  <div className="bg-bgPanel rounded-lg border border-borderC p-3 flex gap-4">
                    <div className="bg-accentYellow/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      <AlertTriangle className="text-accentYellow" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs text-textMuted">Likely Root Cause</p>
                        <span className="text-[10px] bg-accentRed/20 text-accentRed px-2 py-0.5 rounded-full">{aiData.confidence}% Confidence</span>
                      </div>
                      <p className="text-sm font-medium">{aiData.root_cause}</p>
                    </div>
                  </div>

                  <div className="bg-bgPanel rounded-lg border border-borderC p-3 flex gap-4 items-center cursor-pointer hover:border-textMuted transition-colors">
                    <div className="bg-brandBlue/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="text-brandBlue" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-textMuted mb-0.5">Historical Similarity (RAG)</p>
                      <p className="text-sm font-medium">{aiData.historical_matches?.length || 0} previous incidents found in PDFs</p>
                    </div>
                    <ChevronDown className="rotate-[-90deg] text-textMuted" size={16} />
                  </div>

                  <div className="bg-bgPanel rounded-lg border border-borderC p-3 flex gap-4">
                    <div className="bg-accentYellow/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      <Sparkles className="text-accentYellow" size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted mb-1">AI Recommendation</p>
                      <p className="text-xs leading-relaxed text-textMuted">
                        {aiData.recommendation}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-textMuted text-xs mt-10">AI data not available. Ensure backend is running.</div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM CHARTS */}
      <div className="grid grid-cols-3 gap-6 h-64">
        {/* Drilling Activity */}
        <div className="bg-bgCard rounded-xl border border-borderC p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center gap-2"><BarChart2 size={18} className="text-textMuted"/> Drilling Activity</h3>
            <span className="text-xs bg-bgPanel border border-borderC px-2 py-1 rounded cursor-pointer flex items-center gap-1">Last 7 Days <ChevronDown size={12}/></span>
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

        {/* Risk Distribution */}
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

        {/* Top Risk Causes */}
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

// Subcomponents
function MetricCard({ title, value, bg, text }) {
  return (
    <div className={`rounded-lg border px-4 py-3 min-w-[140px] flex flex-col justify-center ${bg}`}>
      <span className="text-xs text-textMuted mb-1">{title}</span>
      <span className={`text-xl font-bold ${text}`}>{value}</span>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
      <span>{label}</span>
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
