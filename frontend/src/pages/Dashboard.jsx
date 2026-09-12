import React, { useState, useEffect, useRef } from 'react';
import { MapPin, BarChart2, Sparkles, ChevronDown, Droplet, CheckCircle2, AlertTriangle, AlertCircle, Maximize2, FileText, Loader2, Activity, Clock, Crosshair, Filter } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Circle, Tooltip, useMapEvents, useMap } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

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

const INITIAL_PINS = [
  ...MOCK_SITES,
  ...demoPins,
  ...incidentPins
];

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
  const map = useMap();
  
  useEffect(() => {
    const handleGlobalScan = () => {
      let duration = 0;
      
      const scanInterval = setInterval(() => {
        if (duration >= 10000) {
          clearInterval(scanInterval);
          // Return to home center
          map.flyTo([20, 0], 2, { duration: 1.5, easeLinearity: 0.25 });
          return;
        }
        
        // Pick a random pin to fly to
        const randomPin = INITIAL_PINS[Math.floor(Math.random() * INITIAL_PINS.length)];
        const zoom = Math.floor(Math.random() * 3) + 4; // Zoom 4 to 6
        
        map.flyTo(randomPin.pos, zoom, {
          duration: 1.5,
          easeLinearity: 0.25
        });
        
        duration += 2000;
      }, 2000);
      
      // Trigger first jump immediately
      const firstPin = INITIAL_PINS[Math.floor(Math.random() * INITIAL_PINS.length)];
      map.flyTo(firstPin.pos, 5, { duration: 1.5 });
    };

    window.addEventListener('triggerMapScan', handleGlobalScan);
    return () => window.removeEventListener('triggerMapScan', handleGlobalScan);
  }, [map]);

  useMapEvents({
    click(e) {
      setSelectedPinId(null);
      setCustomLocation([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
}

// Haversine formula to compute distance in km between two lat/lng points
function getDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return Infinity;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Reverse geocoding helper to return place/region names for lat/lng coordinates
function getPlaceName(lat, lng) {
  if (lat >= 24 && lat <= 29 && lng >= 90 && lng <= 97) return "Upper Assam Basin (Assam, India)";
  if (lat >= 20 && lat <= 25 && lng >= 70 && lng <= 75) return "Cambay Basin (Gujarat, India)";
  if (lat >= 23 && lat <= 28 && lng >= 69 && lng <= 75) return "Rajasthan Onshore Field (India)";
  if (lat >= 22 && lat <= 25 && lng >= 91 && lng <= 94) return "Tripura Fold Belt (India)";
  if (lat >= 15 && lat <= 19 && lng >= 80 && lng <= 86) return "Krishna-Godavari Offshore (KG Basin)";
  if (lat >= 18 && lat <= 20 && lng >= 70 && lng <= 73) return "Mumbai High Offshore (Arabian Sea)";
  if (lat >= 25 && lat <= 31 && lng >= -97 && lng <= -85) return "Gulf of Mexico (Deepwater MC-252)";
  if (lat >= -15 && lat <= -8 && lng >= 120 && lng <= 130) return "Timor Sea (Montara Block)";
  if (lat >= 54 && lat <= 62 && lng >= -2 && lng <= 6) return "North Sea (Ekofisk Field)";
  return `Coordinates [${lat >= 0 ? lat.toFixed(2) + '°N' : Math.abs(lat).toFixed(2) + '°S'}, ${lng >= 0 ? lng.toFixed(2) + '°E' : Math.abs(lng).toFixed(2) + '°W'}]`;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mapMode, setMapMode] = useState('satellite'); 
  const [aiData, setAiData] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedPinId, setSelectedPinId] = useState('AS-07');
  const [customLocation, setCustomLocation] = useState(null);
  const [customLocationName, setCustomLocationName] = useState(null);
  const [radiusKm, setRadiusKm] = useState(5);
  const [pins, setPins] = useState(INITIAL_PINS);
  const [demoStage, setDemoStage] = useState(0);
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const [showLocationInfo, setShowLocationInfo] = useState(false);
  const [loadingLocationInfo, setLoadingLocationInfo] = useState(false);
  const mapContainerRef = useRef(null);
  
  // Initialize mock telemetry data (e.g. WOB - Weight on Bit)
  const [telemetryData, setTelemetryData] = useState(() => 
    Array.from({length: 20}).map((_, i) => ({ time: i, wob: 20 + Math.random() * 5, torque: 15 + Math.random() * 3 }))
  );

  // Simulate live telemetry stream
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = newData[newData.length - 1].time;
        const lastWob = newData[newData.length - 1].wob;
        const lastTorque = newData[newData.length - 1].torque;
        
        // Add some random walk variation
        newData.push({
          time: lastTime + 1,
          wob: Math.max(10, Math.min(30, lastWob + (Math.random() - 0.5) * 3)),
          torque: Math.max(5, Math.min(25, lastTorque + (Math.random() - 0.5) * 2))
        });
        return newData;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (customLocation) {
      const place = getPlaceName(customLocation[0], customLocation[1]);
      if (place.startsWith("Coordinates")) {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${customLocation[0]}&lon=${customLocation[1]}&format=json`)
          .then(res => res.json())
          .then(data => {
            if (data && data.address) {
              const state = data.address.state || data.address.country || "Unknown Region";
              const city = data.address.city || data.address.town || data.address.village || data.address.county || "";
              setCustomLocationName(city ? `${city}, ${state}` : state);
            } else {
              setCustomLocationName(place);
            }
          }).catch(() => setCustomLocationName(place));
      } else {
        setCustomLocationName(place);
      }
    } else {
      setCustomLocationName(null);
    }
  }, [customLocation]);

  // Calculate nearby offset wells falling inside targeting radius circle
  const nearbyWells = React.useMemo(() => {
    if (!customLocation || !Array.isArray(customLocation)) return [];
    return pins.filter(p => {
      if (!p || !Array.isArray(p.pos) || p.pos.length < 2) return false;
      const dist = getDistanceKm(customLocation[0], customLocation[1], p.pos[0], p.pos[1]);
      return dist <= radiusKm;
    });
  }, [customLocation, radiusKm, pins]);

  const customAnalysis = React.useMemo(() => {
    if (!customLocation) return null;
    const lat = customLocation[0];
    const lng = customLocation[1];
    const placeName = getPlaceName(lat, lng);
    const isRisky = Math.abs((Math.floor(lat * 100) + Math.floor(lng * 100)) % 3) === 0;
    const maxDepth = Math.floor(1500 + Math.abs(lat * lng) % 3000);
    
    const count = nearbyWells.length;
    let operatorText = "";
    let safeTdText = "";
    let statusText = "";
    let recommendationText = "";
    let formationText = "";

    if (count > 0) {
      const names = nearbyWells.map(w => w.name).join(', ');
      const depths = nearbyWells.map(w => w.td).join(', ');
      operatorText = `${count} Offset Well(s) Found near ${placeName} (${radiusKm} km radius)`;
      safeTdText = `Offset Depths: ${depths}`;
      formationText = [...new Set(nearbyWells.map(w => w.formation))].join(', ');
      statusText = `Offset Correlation: ${count} Active/Historical Well(s) [${names}]`;
      recommendationText = `📍 Location: ${placeName}\n` +
        `\n${count} nearby offset well(s) identified within ${radiusKm} km targeting circle:\n\n` +
        nearbyWells.map(w => `• Well ${w.name} (${w.state}): TD ${w.td} — Diagnostic: ${w.rca}`).join('\n') +
        `\n\nAI Guidance: Correlating pore pressure trends with nearby offset well ${nearbyWells[0].name}. Recommended mud weight baseline: 1.22 - 1.28 SG.`;
    } else {
      operatorText = `No Offset Wells Found near ${placeName} (${radiusKm} km radius)`;
      safeTdText = isRisky ? 'RISKY (Cannot Drill Safely)' : `${maxDepth.toLocaleString()} m (Predicted Safe TD)`;
      formationText = isRisky ? 'High Seismic Fault Zone' : 'Analogous Basin Lithology';
      statusText = isRisky ? 'RISKY — Fault Line Hazard' : `Clearance — Safe up to ${maxDepth.toLocaleString()} m`;
      recommendationText = `📍 Location: ${placeName}\n\n` +
        `No existing offset drills found within ${radiusKm} km radius circle.\n\n` +
        (isRisky 
          ? 'RISKY: Cannot drill safely here due to high fault-line probability and severe geomechanical instability.' 
          : `Clearance: Safe to drill up to ${maxDepth.toLocaleString()}m vertically based on regional geological analogues. Expect abnormal pore pressures beyond this depth.`);
    }

    return {
      placeName,
      count,
      isRisky,
      maxDepth,
      operatorText,
      safeTdText,
      formationText,
      statusText,
      recommendationText
    };
  }, [customLocation, radiusKm, nearbyWells]);

  const activeTarget = (selectedPinId ? pins.find(p => p.id === selectedPinId) : null)
    || (customLocation && customAnalysis ? {
        id: 'CUSTOM',
        name: customAnalysis.placeName,
        state: customLocationName || (customAnalysis.placeName.startsWith("Coordinates") ? "Fetching location..." : customAnalysis.placeName),
        operator: customAnalysis.operatorText,
        spud: customAnalysis.count > 0 ? 'Offset Data Hydrated' : 'Pre-Drill Evaluation',
        td: customAnalysis.safeTdText,
        formation: customAnalysis.formationText,
        status: 'custom',
        rca: customAnalysis.statusText
      } : null)
    || pins.find(p => p.id === 'AS-07')
    || pins[0]
    || { id: 'DEFAULT', name: 'Assam-07', state: 'Assam', operator: 'Oil India Ltd', spud: '12 Aug 2026', td: '3,102 m', formation: 'RDFC', status: 'red', rca: 'Pressure Anomaly / Instability' };

  const triggerDemoSequence = () => {
    const nextStage = (demoStage + 1) % 4;
    setDemoStage(nextStage);
    
    setPins(prev => prev.map(p => {
      if (p.id === 'AS-07' || p.id === 'ASSAM-07') {
        if (nextStage === 0) return { ...p, status: 'green', rca: 'Normal Drilling' };
        if (nextStage === 1) return { ...p, status: 'yellow', rca: 'Anomaly Detected: ROP dropping, Torque rising' };
        if (nextStage === 2) return { ...p, status: 'red', rca: 'CRITICAL: Stuck Pipe Risk. AI RAG match found.' };
        if (nextStage === 3) return { ...p, status: 'red', rca: 'INCIDENT ESCALATED: Worker Safety Evacuation' };
      }
      return p;
    }));
    
    if (nextStage > 0) setSelectedPinId('AS-07');
  };

  useEffect(() => {
    const fetchAI = async () => {
      setLoadingAi(true);
      setAiData(null);

      // Execute client-side intelligence evaluation instantly (static mode)
      setTimeout(() => {
        if (activeTarget.status === 'custom' && customAnalysis) {
          setAiData({
            confidence: customAnalysis.count > 0 ? 94 : (customAnalysis.isRisky ? 95 : 84),
            root_cause: customAnalysis.statusText,
            historical_matches: customAnalysis.count > 0 ? HISTORICAL_INCIDENTS.slice(0, nearbyWells.length || 1) : HISTORICAL_INCIDENTS.slice(0, 2),
            recommendation: customAnalysis.recommendationText
          });
        } else {
          setAiData({
            confidence: activeTarget.status === 'red' ? 87 : activeTarget.status === 'yellow' ? 65 : 95,
            root_cause: activeTarget.rca,
            historical_matches: HISTORICAL_INCIDENTS.slice(0, 3),
            recommendation: activeTarget.status === 'red' ? 
              `Critical Alert: ${activeTarget.rca}. Inspect pressure-control equipment immediately.\nHistorical drills in this area reached ${activeTarget.td}.` : 
              `Proceed with normal operations. Parameters are stable.\nCurrent well TD is ${activeTarget.td}. Safe to proceed further.`
          });
        }
        setLoadingAi(false);
      }, 50);
    };
    fetchAI();
  }, [selectedPinId, customLocation, pins, customAnalysis, nearbyWells]);

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
      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        
        {/* MAP SECTION */}
        <div className="flex-[2] flex flex-col space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bgCard p-4 rounded-xl border border-borderC">
            <div>
              <h2 className="text-2xl font-bold">Global Operations Map</h2>
              <p className="text-textMuted text-sm">Real-time geospatial tracking of all energy assets.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button onClick={triggerDemoSequence} className="w-full sm:w-auto bg-accentRed hover:bg-red-600 text-white px-3 py-2 sm:py-1.5 rounded-md text-xs sm:text-sm font-bold shadow-[0_0_10px_rgba(244,63,94,0.4)] transition-colors animate-pulse text-center">
                [{demoStage}] TRIGGER SCENARIO
              </button>
              {/* Radius Slider (Now outside map) */}
              <div className="flex items-center gap-2.5 bg-bgPanel border border-borderC rounded-lg px-3.5 py-1.5 sm:py-2 w-full sm:w-[270px] shrink-0 overflow-hidden">
                <span className="text-xs text-textMuted font-medium uppercase tracking-wide shrink-0">Radius</span>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="1" 
                  value={radiusKm} 
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                  className="flex-1 min-w-0 h-1 bg-borderC rounded-lg cursor-pointer accent-brandBlue outline-none"
                />
                <span className="font-bold text-brandBlue bg-brandBlue/10 px-2 py-0.5 rounded text-xs shrink-0 whitespace-nowrap">{radiusKm} km</span>
              </div>

              {/* Map/Satellite Toggle & Expand row on mobile */}
              <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto">
                <div className="flex bg-bgPanel rounded-md border border-borderC overflow-hidden text-xs sm:text-sm flex-1 sm:flex-initial">
                  <button onClick={() => setMapMode('map')} className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 ${mapMode === 'map' ? 'bg-brandBlue text-white' : 'text-textMuted hover:text-white transition-colors'}`}>Map</button>
                  <button onClick={() => setMapMode('satellite')} className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 ${mapMode === 'satellite' ? 'bg-brandBlue text-white' : 'text-textMuted hover:text-white transition-colors'}`}>Satellite</button>
                </div>

                <button onClick={toggleFullscreen} className="flex items-center justify-center gap-1.5 bg-bgPanel hover:bg-white/5 border border-borderC px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors shrink-0">
                  <Maximize2 size={15}/> <span>Expand</span>
                </button>
              </div>
            </div>
          </div>

          <div ref={mapContainerRef} className="h-[340px] sm:h-[440px] xl:h-auto xl:flex-1 min-h-[340px] sm:min-h-[440px] w-full bg-bgCard rounded-xl border border-borderC overflow-hidden relative shadow-lg">
            
            <MapContainer center={[20, 0]} zoom={2} style={{ width: '100%', height: '100%' }} zoomControl={false} minZoom={2}>
              <MapInteractionHandler setCustomLocation={setCustomLocation} setSelectedPinId={setSelectedPinId} />
              
              {mapMode === 'satellite' ? (
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri" noWrap={true} />
              ) : (
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" attribution="Tiles &copy; Esri" noWrap={true} />
              )}
              
                {customLocation && !selectedPinId && (
                  <>
                    <Circle center={customLocation} radius={radiusKm * 1000} pathOptions={{ color: '#2C81FF', fillColor: '#2C81FF', fillOpacity: 0.15, weight: 2, dashArray: '4 4' }} />
                    <CircleMarker center={customLocation} radius={8} pathOptions={{ fillColor: '#2C81FF', color: '#fff', weight: 3, fillOpacity: 1 }}>
                      <Tooltip permanent direction="bottom" className="bg-bgPanel border border-brandBlue/50 text-white font-bold shadow-2xl" offset={[0, 12]}>
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-brandBlue font-extrabold flex items-center gap-1"><Crosshair size={12}/> {customLocationName || getPlaceName(customLocation[0], customLocation[1])}</span>
                          <span className="text-[10px] text-textMuted font-mono">({radiusKm} km radius)</span>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  </>
                )}
                
                {pins.map(p => {
                  const isSelected = p.id === selectedPinId;
                  const isInsideRadius = customLocation && getDistanceKm(customLocation[0], customLocation[1], p.pos[0], p.pos[1]) <= radiusKm;
                  const showTooltip = isSelected || isInsideRadius;
                  
                  return (
                    <CircleMarker key={p.id} center={p.pos} radius={isSelected ? 9 : isInsideRadius ? 7 : 6} eventHandlers={{ click: () => setSelectedPinId(p.id) }}
                      pathOptions={{ fillColor: p.status === 'red' ? '#F43F5E' : p.status === 'yellow' ? '#FBBF24' : '#10B981', color: isSelected ? '#fff' : isInsideRadius ? '#2C81FF' : 'rgba(255,255,255,0.2)', weight: isSelected || isInsideRadius ? 2 : 1, fillOpacity: 0.9 }} className="cursor-pointer">
                      {showTooltip && (
                        <Tooltip permanent direction="top" className={`border shadow-2xl ${isInsideRadius ? 'bg-bgPanel border-brandBlue text-white' : 'bg-bgPanel border-borderC text-white font-bold'}`} offset={[0, -12]}>
                          <div className="flex flex-col items-center">
                            <span className="text-[11px] font-bold text-white tracking-wide">{p.name}</span>
                            <span className="text-[9px] text-brandBlue font-semibold">TD: {p.td}</span>
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
                  <p className="text-sm text-brandBlue flex items-center gap-1 font-bold">Total Depth: {activeTarget.td}</p>
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
                  <div><p className="text-xs text-textMuted mb-1">Location</p><p className="font-semibold">{activeTarget.state}</p></div>
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
                <div className="flex-1 flex flex-col min-h-0 animate-in fade-in">
                  <div className="flex gap-4 mb-4">
                    <div className="bg-bgMain border border-borderC rounded-lg p-3 flex-1">
                      <div className="text-[10px] text-textMuted uppercase font-semibold mb-1">Weight on Bit (WOB)</div>
                      <div className="text-xl font-bold text-brandBlue flex items-end gap-1">
                        {telemetryData[telemetryData.length - 1].wob.toFixed(1)} <span className="text-xs text-textMuted font-normal pb-1">klbs</span>
                      </div>
                    </div>
                    <div className="bg-bgMain border border-borderC rounded-lg p-3 flex-1">
                      <div className="text-[10px] text-textMuted uppercase font-semibold mb-1">Surface Torque</div>
                      <div className="text-xl font-bold text-accentYellow flex items-end gap-1">
                        {telemetryData[telemetryData.length - 1].torque.toFixed(1)} <span className="text-xs text-textMuted font-normal pb-1">kft-lb</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[150px] bg-bgMain border border-borderC rounded-lg p-2 pb-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={telemetryData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#23324A" vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} domain={['dataMin - 2', 'dataMax + 2']} />
                        <RechartsTooltip 
                          contentStyle={{backgroundColor: '#0E1623', border: '1px solid #23324A', borderRadius: '8px', fontSize: '12px'}}
                          itemStyle={{color: '#fff'}}
                          labelStyle={{display: 'none'}}
                        />
                        <Line type="monotone" dataKey="wob" stroke="#2C81FF" strokeWidth={2} dot={false} isAnimationActive={false} name="WOB" />
                        <Line type="monotone" dataKey="torque" stroke="#FBBF24" strokeWidth={2} dot={false} isAnimationActive={false} name="Torque" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              {activeTab === 'History' && (
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {activeTarget.status === 'custom' ? (
                    <div className="relative border-l border-borderC ml-3 space-y-6 pb-2 animate-in fade-in">
                      <TimelineEvent 
                        date="Projected" 
                        title="Commence Drilling Operations" 
                        desc="Mobilize rig and initiate spud phase upon regulatory clearance." 
                        color="bg-brandBlue" 
                      />
                      <TimelineEvent 
                        date="Current Stage" 
                        title="AI Georisk Profiling" 
                        desc={`Synthesizing historical incident data within ${radiusKm}km radius to compute preliminary well-bore stability model.`} 
                        color="bg-accentYellow" 
                      />
                      <TimelineEvent 
                        date="2 Weeks Ago" 
                        title="Seismic Desktop Study" 
                        desc="2D/3D seismic lines re-processed for fault identification. Initial target depth set." 
                        color="bg-textMuted" 
                      />
                      <TimelineEvent 
                        date="1 Month Ago" 
                        title="Block Acquisition" 
                        desc="Exploration license granted for coordinates by regional authority." 
                        color="bg-borderC" 
                      />
                    </div>
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
                  <div 
                    className="bg-bgPanel rounded-lg border border-borderC p-3 flex flex-col gap-4 cursor-pointer hover:border-brandBlue/50 transition-colors"
                    onClick={() => setShowHistoricalData(!showHistoricalData)}
                  >
                    <div className="flex gap-4 items-center w-full">
                      <div className="bg-brandBlue/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="text-brandBlue" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-textMuted mb-0.5">Historical Similarity (RAG)</p>
                        <p className="text-sm font-medium">{aiData.historical_matches?.length || 0} previous incidents found</p>
                      </div>
                    </div>
                    {showHistoricalData && aiData.historical_matches?.length > 0 && (
                      <div className="text-xs text-textMuted mt-2 border-t border-borderC pt-2">
                        {aiData.historical_matches.map((match, i) => (
                          <div key={i} className="mb-2 last:mb-0">
                            <span className="font-semibold text-textMain">{match.incident_name} ({match.date})</span><br/>
                            <span className="text-brandBlue font-medium">Failure:</span> {match.failure_subtype}<br/>
                            <span className="text-brandBlue font-medium">Cause:</span> {match.root_cause}
                          </div>
                        ))}
                      </div>
                    )}
                    {showHistoricalData && (!aiData.historical_matches || aiData.historical_matches.length === 0) && (
                      <div className="text-xs text-textMuted mt-2 border-t border-borderC pt-2">
                        No previous historical data available for this location.
                      </div>
                    )}
                  </div>
                  <div 
                    className="bg-bgPanel rounded-lg border border-borderC p-3 flex flex-col gap-4 cursor-pointer hover:border-accentYellow/50 transition-colors"
                    onClick={() => {
                      setShowLocationInfo(!showLocationInfo);
                      if (!showLocationInfo) {
                        setLoadingLocationInfo(true);
                        setTimeout(() => setLoadingLocationInfo(false), 1200);
                      }
                    }}
                  >
                    <div className="flex gap-4 items-start w-full">
                      <div className="bg-accentYellow/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                        <Sparkles className="text-accentYellow" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-textMuted mb-1">AI Recommendation</p>
                        <p className="text-xs leading-relaxed text-textMuted whitespace-pre-wrap">{aiData.recommendation}</p>
                      </div>
                    </div>
                    {showLocationInfo && (
                      <div className="text-xs text-textMuted mt-2 border-t border-borderC pt-2">
                        {loadingLocationInfo ? (
                          <div className="flex items-center gap-2 text-accentYellow"><Loader2 className="animate-spin w-4 h-4"/> Connecting to AI Intelligence...</div>
                        ) : (
                          <div className="space-y-2 mt-2">
                            <p><strong className="text-textMain text-sm">Regional Intelligence: {activeTarget.state}</strong></p>
                            <p className="leading-relaxed">
                              {activeTarget.state.includes('Assam') ? 
                                'The Upper Assam Basin is one of India\'s oldest and most prolific hydrocarbon regions. It is characterized by complex geology, thrust belts (like the Naga Thrust), and challenges such as abnormal pore pressures and wellbore instability. Operators frequently encounter tight hole conditions and shear failures in the Upper Oligocene formations here.' :
                                activeTarget.state.includes('Cambay') || activeTarget.state.includes('Gujarat') ?
                                'The Cambay Basin in Gujarat is a major onshore rift basin in western India. It is known for high geothermal gradients, deep heavy oil deposits, and complex faulting systems which present unique drilling challenges like lost circulation and differential sticking.' :
                                'This region features unique geological characteristics and established oil & gas infrastructure. Operators here typically deal with basin-specific challenges ranging from complex fault zones to narrow drilling windows. Local geological surveys recommend continuous pressure monitoring.'
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[1000]">
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
          <h3 className="font-semibold flex items-center gap-2 mb-4 text-accentRed"><AlertTriangle size={18} /> Top Risk Causes ({activeTarget.state})</h3>
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            <CauseRow color="bg-pink-500" label="Wellbore Instability" pct="28%" drills={pins.filter(p => p.state === activeTarget.state && (p.rca.toLowerCase().includes('instability') || p.rca.toLowerCase().includes('pack-off') || p.rca.toLowerCase().includes('stuck'))).map(p => p.name)} />
            <CauseRow color="bg-accentRed" label="Abnormal Pressure Trend" pct="29%" drills={pins.filter(p => p.state === activeTarget.state && (p.rca.toLowerCase().includes('pressure') || p.rca.toLowerCase().includes('kick') || p.rca.toLowerCase().includes('blowout'))).map(p => p.name)} />
            <CauseRow color="bg-accentYellow" label="Equipment Failure" pct="18%" drills={pins.filter(p => p.state === activeTarget.state && p.rca.toLowerCase().includes('equipment')).map(p => p.name)} />
            <CauseRow color="bg-blue-500" label="Economic Abandonment" pct="13%" drills={pins.filter(p => p.state === activeTarget.state && p.rca.toLowerCase().includes('abandon')).map(p => p.name)} />
            <CauseRow color="bg-textMuted" label="Regulatory Shutdown" pct="7%" drills={pins.filter(p => p.state === activeTarget.state && p.rca.toLowerCase().includes('regulatory')).map(p => p.name)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label, sub }) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLegendDetails = (legendLabel) => {
    switch (legendLabel.toLowerCase()) {
      case 'high risk':
        return 'Drilling operations have catastrophically failed or are in immediate danger of a blowout. Mandatory halt of operations. Immediate intervention required by well-control specialists.';
      case 'medium risk':
        return 'Operations are suspended or partially restricted due to significant anomalies like severe fluid loss, dangerous gas kicks, or stuck pipe. Proceeding with caution under revised parameters.';
      case 'low-mod risk':
        return 'Experiencing minor issues such as slow rate of penetration (ROP), minor tool wear, or slight pressure variations. Operations continue while engineers monitor trends closely.';
      case 'active':
        return 'All telemetry data is nominal. Wellbore stability is excellent, and drilling is proceeding according to the planned trajectory and time schedule with no safety concerns.';
      default:
        return 'Status indicator representing current operational telemetry and historical geomechanical modeling.';
    }
  };

  return (
    <div className="flex items-start gap-2 text-xs relative cursor-pointer hover:bg-white/5 p-1.5 -mx-1.5 rounded-md transition-colors" ref={popupRef} onClick={() => setShowPopup(!showPopup)}>
      <div className={`w-2.5 h-2.5 rounded-sm mt-0.5 shrink-0 ${color}`}></div>
      <div>
        <div className="text-textMain font-medium">{label}</div>
        {sub && <div className="text-textMuted scale-90 origin-left">{sub}</div>}
      </div>
      
      {showPopup && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-bgPanel border border-borderC rounded-lg shadow-xl z-[9999] p-3 animate-in fade-in slide-in-from-bottom-2 cursor-default" onClick={e => e.stopPropagation()}>
          <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
            <AlertCircle size={14} className={label === 'High Risk' ? 'text-accentRed' : label === 'Active' ? 'text-accentGreen' : 'text-accentYellow'} /> {label} Details
          </h4>
          <p className="text-[10px] text-textMuted leading-relaxed">
            {getLegendDetails(label)}
          </p>
          <div className="mt-3 text-[9px] uppercase tracking-wider font-semibold text-brandBlue flex justify-between">
            <span>Status: {sub ? sub.replace(/[()]/g, '') : 'Nominal'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CauseRow({ color, label, pct, drills }) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getRiskDetails = (riskLabel) => {
    switch (riskLabel.toLowerCase()) {
      case 'wellbore instability':
        return 'Occurs due to geomechanical stress imbalance, leading to hole collapse, tight spots, or stuck pipe. Mitigation involves careful mud weight management and monitoring cavings.';
      case 'abnormal pressure trend':
        return 'Unexpectedly high formation pore pressures that can cause kicks, blowouts, or severe well control incidents. Requires immediate BOP readiness and mud density adjustments.';
      case 'equipment failure':
        return 'Breakdown of critical rig components like top drives, mud pumps, or downhole tools due to wear, fatigue, or exceeding operating limits. Leads to costly non-productive time (NPT).';
      case 'economic abandonment':
        return 'Decision to halt drilling due to spiraling costs, unviable reservoir discoveries, or severe market shifts rendering the well unprofitable to complete.';
      case 'regulatory shutdown':
        return 'Suspension of operations mandated by governmental or environmental authorities due to non-compliance, safety violations, or geopolitical instability.';
      default:
        return 'General operational risk identified through historical drilling logs and predictive telemetry algorithms.';
    }
  };

  return (
    <div className="flex flex-col gap-1 mb-2 relative" ref={popupRef}>
      <div 
        className="flex items-center gap-3 text-xs cursor-pointer hover:bg-white/5 p-1.5 -mx-1.5 rounded-md transition-colors"
        onClick={() => setShowPopup(!showPopup)}
      >
        <div className={`w-2 h-2 rounded-full shrink-0 ${color}`}></div>
        <div className="flex-1 text-textMain font-medium">{label}</div>
        <div className="font-bold">{pct}</div>
      </div>
      
      {drills && drills.length > 0 && (
        <div className="text-[10px] text-textMuted pl-5 leading-tight">
          Affected Drills: <span className="text-brandBlue">{drills.join(', ')}</span>
        </div>
      )}

      {showPopup && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-bgPanel border border-borderC rounded-lg shadow-xl z-[9999] p-3 animate-in fade-in slide-in-from-top-2">
          <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
            <AlertCircle size={14} className="text-accentYellow" /> {label} Details
          </h4>
          <p className="text-[10px] text-textMuted leading-relaxed">
            {getRiskDetails(label)}
          </p>
          <div className="mt-3 text-[9px] uppercase tracking-wider font-semibold text-brandBlue flex justify-between">
            <span>Probability: {pct}</span>
            <span>Severity: High</span>
          </div>
        </div>
      )}
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
