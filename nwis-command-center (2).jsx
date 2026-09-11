import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search, Bell, User, ChevronRight, ChevronLeft, AlertTriangle, Activity,
  Radio, MapPin, Layers, Filter, Maximize2, X, Command, Play, RotateCcw,
  ArrowUp, ArrowDown, Brain, FileText, Cpu, Database, ShieldAlert,
  Gauge, GitBranch, Settings2, Minus
} from 'lucide-react';

/* ============================== DESIGN TOKENS ============================== */
const C = {
  bg0: '#060A0E', bg1: '#080D12', bg2: '#0B1117', bg3: '#0F161D',
  s1: '#121A22', s2: '#151F28', s3: '#19252F', s4: '#1E2B35',
  b1: '#24323D', b2: '#2B3B47', b3: '#344652',
  amber: '#F2A900', amberBright: '#FFB51B', amberDark: '#D99400',
  cyan: '#19D3E6', cyanBright: '#24E0F0', cyanDark: '#0FB5C7',
  success: '#27D17F', warning: '#FFB020', high: '#FF7A2F', critical: '#FF3B4D',
  info: '#5B9CFF',
  tx0: '#EAF1F6', tx1: '#B9C6D0', tx2: '#8496A3', tx3: '#576573',
};

const STATE_COLOR = {
  NORMAL: C.success, ACTIVE: C.cyan, WARNING: C.warning, HIGH: C.high, CRITICAL: C.critical,
};

const FONT = "'Inter', -apple-system, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

/* ============================== DEMO DATA ============================== */
const BASE_SITES = [
  { id: 'ASSAM-01', field: 'Duliajan Field', region: 'Assam', well: 'OIL-AS-01', rig: 'OIL-RIG-11', state: 'NORMAL', risk: 28, depth: 2210, rop: 21.2, wob: 18, rpm: 102, spp: 2510, torque: 11.4, temp: 78, flow: 1080, updated: 8, x: 70, y: 20 },
  { id: 'ASSAM-03', field: 'Duliajan Field', region: 'Assam', well: 'OIL-AS-03', rig: 'OIL-RIG-15', state: 'ACTIVE', risk: 34, depth: 2980, rop: 22.6, wob: 20, rpm: 110, spp: 2605, torque: 12.0, temp: 81, flow: 1150, updated: 5, x: 78, y: 28 },
  { id: 'ASSAM-07', field: 'Duliajan Field', region: 'Assam', well: 'OIL-AS-07', rig: 'OIL-RIG-24', state: 'NORMAL', risk: 38, depth: 3842, rop: 20.7, wob: 22, rpm: 118, spp: 2710, torque: 12.6, temp: 84, flow: 1210, updated: 12, x: 62, y: 38, isFocus: true },
  { id: 'ASSAM-12', field: 'Naharkatiya Field', region: 'Assam', well: 'OIL-AS-12', rig: 'OIL-RIG-08', state: 'WARNING', risk: 58, depth: 3110, rop: 16.9, wob: 24, rpm: 121, spp: 2810, torque: 13.9, temp: 88, flow: 1190, updated: 19, x: 84, y: 18 },
  { id: 'ASSAM-18', field: 'Lakwa Field', region: 'Assam', well: 'OIL-AS-18', rig: 'OIL-RIG-31', state: 'CRITICAL', risk: 94, depth: 4102, rop: 9.8, wob: 28, rpm: 96, spp: 3180, torque: 16.2, temp: 93, flow: 980, updated: 6, x: 70, y: 46 },
  { id: 'GUJARAT-02', field: 'Ankleshwar Field', region: 'Gujarat', well: 'OIL-GJ-02', rig: 'OIL-RIG-42', state: 'NORMAL', risk: 22, depth: 1870, rop: 24.1, wob: 16, rpm: 98, spp: 2320, torque: 10.1, temp: 74, flow: 1020, updated: 9, x: 20, y: 58 },
  { id: 'GUJARAT-05', field: 'Cambay Field', region: 'Gujarat', well: 'OIL-GJ-05', rig: 'OIL-RIG-46', state: 'ACTIVE', risk: 31, depth: 2540, rop: 23.0, wob: 19, rpm: 105, spp: 2470, torque: 11.0, temp: 77, flow: 1090, updated: 14, x: 28, y: 67 },
  { id: 'GUJARAT-09', field: 'Kalol Field', region: 'Gujarat', well: 'OIL-GJ-09', rig: 'OIL-RIG-19', state: 'NORMAL', risk: 19, depth: 1420, rop: 25.4, wob: 15, rpm: 92, spp: 2210, torque: 9.6, temp: 71, flow: 960, updated: 11, x: 16, y: 74 },
  { id: 'GUJARAT-14', field: 'Mehsana Field', region: 'Gujarat', well: 'OIL-GJ-14', rig: 'OIL-RIG-27', state: 'WARNING', risk: 52, depth: 2990, rop: 17.8, wob: 23, rpm: 115, spp: 2780, torque: 13.2, temp: 86, flow: 1140, updated: 22, x: 24, y: 82 },
  { id: 'GUJARAT-21', field: 'Ankleshwar Field', region: 'Gujarat', well: 'OIL-GJ-21', rig: 'OIL-RIG-33', state: 'NORMAL', risk: 26, depth: 2050, rop: 22.9, wob: 17, rpm: 100, spp: 2380, torque: 10.6, temp: 76, flow: 1010, updated: 7, x: 33, y: 60 },
];

// The anomaly progression driving ASSAM-07 — "the moment of magic" (spec §68-69)
const SIM = [
  { state: 'NORMAL', displayState: 'NORMAL', risk: 38, spp: 2710, rop: 20.7, torque: 12.6,
    ai: 'All monitored operations within expected conditions. No anomalies detected.',
    conf: null, event: null },
  { state: 'WARNING', displayState: 'WATCH', risk: 50, spp: 2760, rop: 20.1, torque: 12.9,
    ai: 'Pressure trending 1.8% above baseline over the last 10 minutes. Continuing to monitor — no action required yet.',
    conf: null, event: { time: '14:18', label: 'Pressure begins deviating from baseline' } },
  { state: 'WARNING', displayState: 'ANOMALY DETECTED', risk: 62, spp: 2830, rop: 19.4, torque: 13.4,
    ai: 'Anomaly detected — standpipe pressure is 4.4% above expected range for current depth and mud weight.',
    conf: 92, event: { time: '14:24', label: 'AI detects anomaly' } },
  { state: 'HIGH', displayState: 'HIGH RISK', risk: 71, spp: 2890, rop: 18.7, torque: 14.0,
    ai: 'Risk elevated to HIGH. ROP has declined 9.7% and torque variance has increased over the last 20 minutes — consistent with a formation-related pressure response.',
    conf: null, event: { time: '14:32', label: 'Risk escalates to HIGH' } },
  { state: 'HIGH', displayState: 'HIGH RISK', risk: 79, spp: 2920, rop: 18.5, torque: 14.4,
    ai: 'Searching the drilling knowledge base for offset wells with comparable pressure, ROP and torque signatures...',
    conf: null, event: { time: '14:38', label: 'Historical retrieval in progress' } },
  { state: 'HIGH', displayState: 'HIGH RISK', risk: 87, spp: 2940, rop: 18.4, torque: 14.8,
    ai: '7 historically similar cases found — 5 in Assam, 2 in comparable formation conditions. 3 resulted in significant operational intervention. Likely cause: formation pressure transition.',
    conf: 87, event: { time: '14:52', label: 'Root cause identified — 7 historical matches found' } },
];

const RISK_CONTRIBUTORS = [
  { label: 'Pressure anomaly', pct: 34, color: C.critical },
  { label: 'ROP deviation', pct: 22, color: C.high },
  { label: 'Torque instability', pct: 18, color: C.warning },
  { label: 'Historical similarity', pct: 13, color: C.cyan },
  { label: 'Other', pct: 13, color: C.tx3 },
];

const WHY_HIGH_RISK = [
  'Standpipe pressure is 8.5% above the expected range for current depth.',
  'Rate of penetration has decreased 11% over the last 20 minutes.',
  'Torque variance has increased beyond the normal operating band.',
  '7 historical wells in the knowledge base show similar combined behavior.',
  '3 of those 7 incidents escalated to formation-related drilling complications.',
];

const EVIDENCE = [
  { id: '01', title: 'Daily Drilling Report', ref: 'Assam Well 2019-042', similarity: 91, excerpt: 'Standpipe pressure rose ahead of a lithology change; ROP declined before crew intervened at the same interval depth.' },
  { id: '02', title: 'Drilling Incident Report', ref: 'Assam Well 2020-018', similarity: 84, excerpt: 'Formation pressure transition flagged after correlated torque and pressure deviation during a comparable drilling phase.' },
  { id: '03', title: 'Mud Logging Report', ref: 'Assam Well 2021-006', similarity: 79, excerpt: 'Gas readings and pressure trend matched a known transition zone documented in this offset well.' },
];

const NAV = [
  { group: 'COMMAND', items: [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'opsmap', label: 'Operations Map', icon: MapPin },
  ]},
  { group: 'ASSETS', items: [
    { id: 'sites', label: 'Sites', icon: Layers },
    { id: 'wells', label: 'Wells', icon: GitBranch },
    { id: 'rigs', label: 'Rigs', icon: Cpu },
  ]},
  { group: 'INTELLIGENCE', items: [
    { id: 'risk', label: 'Risk Intelligence', icon: ShieldAlert },
    { id: 'copilot', label: 'AI Copilot', icon: Brain },
    { id: 'historical', label: 'Historical Intelligence', icon: Database },
  ]},
  { group: 'OPERATIONS', items: [
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
    { id: 'reports', label: 'Reports', icon: FileText },
  ]},
  { group: 'SYSTEM', items: [
    { id: 'datasources', label: 'Data Sources', icon: Radio },
    { id: 'settings', label: 'Settings', icon: Settings2 },
  ]},
];

const COMMANDS = (actions) => [
  { id: 'goto-assam07', label: 'Go to Assam-07', hint: 'Open site drawer', run: actions.gotoAssam07 },
  { id: 'high-risk', label: 'Show high-risk wells', hint: 'Filter operations map', run: actions.showHighRisk },
  { id: 'clear-filter', label: 'Clear map filters', hint: 'Reset map view', run: actions.clearFilter },
  { id: 'critical-alerts', label: 'Open critical alerts', hint: 'Jump to alert center', run: actions.gotoCritical },
  { id: 'start-sim', label: 'Start anomaly simulation', hint: 'Run Assam-07 scenario', run: actions.startSim },
  { id: 'reset-sim', label: 'Reset simulation', hint: 'Return Assam-07 to normal', run: actions.resetSim },
];

/* ============================== HELPERS ============================== */
function pct(v) { return `${v > 0 ? '+' : ''}${v.toFixed(1)}%`; }

function Spark({ values, color, width = 130, height = 34, baseline }) {
  const all = baseline != null ? [...values, baseline] : values;
  const min = Math.min(...all), max = Math.max(...all);
  const range = (max - min) || 1;
  const pad = range * 0.15;
  const lo = min - pad, hi = max + pad, r2 = hi - lo || 1;
  const pts = values.map((v, i) => {
    const x = values.length > 1 ? (i / (values.length - 1)) * width : width;
    const y = height - ((v - lo) / r2) * height;
    return [x, y];
  });
  const path = pts.map((p) => p.join(',')).join(' ');
  const baseY = baseline != null ? height - ((baseline - lo) / r2) * height : null;
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} style={{ overflow: 'visible', flexShrink: 0 }}>
      {baseY != null && (
        <line x1="0" x2={width} y1={baseY} y2={baseY} stroke={C.b3} strokeWidth="1" strokeDasharray="3,3" />
      )}
      <polyline points={path} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {last && <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />}
    </svg>
  );
}

function StatusDot({ state, size = 8, pulse = false }) {
  const color = STATE_COLOR[state] || C.tx3;
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size, flexShrink: 0 }}>
      {pulse && (
        <span
          style={{
            position: 'absolute', inset: -4, borderRadius: '9999px', background: color,
            opacity: 0.35, animation: 'psmPulse 2s ease-out infinite',
          }}
        />
      )}
      <span style={{ width: size, height: size, borderRadius: '9999px', background: color, position: 'relative' }} />
    </span>
  );
}

function StateTag({ state, label }) {
  const color = STATE_COLOR[state] || C.tx3;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px',
        borderRadius: 4, border: `1px solid ${color}55`, background: `${color}18`,
        color, fontSize: 11, fontWeight: 600, letterSpacing: 0.3, fontFamily: FONT,
      }}
    >
      <StatusDot state={state} size={6} pulse={state === 'CRITICAL' || state === 'HIGH'} />
      {label || state}
    </span>
  );
}

function Panel({ title, icon: Icon, right, children, style, bodyStyle }) {
  return (
    <div style={{ background: C.s1, border: `1px solid ${C.b1}`, borderRadius: 8, display: 'flex', flexDirection: 'column', minHeight: 0, ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: `1px solid ${C.b1}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {Icon && <Icon size={13} color={C.tx2} />}
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, color: C.tx1, fontFamily: FONT }}>{title}</span>
          </div>
          {right}
        </div>
      )}
      <div style={{ padding: 14, overflow: 'auto', flex: 1, minHeight: 0, ...bodyStyle }}>{children}</div>
    </div>
  );
}

function Metric({ label, value, unit, trend, trendGood }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 16px', borderRight: `1px solid ${C.b1}`, minWidth: 108 }}>
      <span style={{ fontSize: 10, color: C.tx3, fontFamily: FONT, letterSpacing: 0.4 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: C.tx0, fontFamily: MONO }}>{value}</span>
        {unit && <span style={{ fontSize: 11, color: C.tx3, fontFamily: FONT }}>{unit}</span>}
      </div>
      {trend != null && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: trendGood ? C.success : C.high, fontFamily: MONO }}>
          {trend >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
          {Math.abs(trend)}
        </div>
      )}
    </div>
  );
}

/* ============================== MAIN APP ============================== */
export default function PSMCommandCenter() {
  const [sites, setSites] = useState(BASE_SITES);
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');
  const [drawerId, setDrawerId] = useState(null);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [mapFilter, setMapFilter] = useState(null); // null | 'high'
  const [clock, setClock] = useState(12);
  const alertsRef = useRef(null);
  const intervalRef = useRef(null);

  // fake "last sync" ticking
  useEffect(() => {
    const t = setInterval(() => setClock((c) => (c >= 30 ? 3 : c + 1)), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const startSim = () => {
    if (playing) return;
    setPlaying(true);
    setTick(0);
    let t = 0;
    intervalRef.current = setInterval(() => {
      t += 1;
      if (t >= SIM.length - 1) {
        setTick(SIM.length - 1);
        clearInterval(intervalRef.current);
        setPlaying(false);
      } else {
        setTick(t);
      }
    }, 1300);
  };
  const resetSim = () => {
    clearInterval(intervalRef.current);
    setPlaying(false);
    setTick(0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const assam07Live = useMemo(() => {
    const base = sites.find((s) => s.id === 'ASSAM-07');
    const t = SIM[tick];
    return { ...base, state: t.state, displayState: t.displayState, risk: t.risk, spp: t.spp, rop: t.rop, torque: t.torque, aiText: t.ai, confidence: t.conf };
  }, [sites, tick]);

  const liveSites = useMemo(
    () => sites.map((s) => (s.id === 'ASSAM-07' ? assam07Live : s)),
    [sites, assam07Live]
  );

  const sppHistory = SIM.slice(0, tick + 1).map((t) => t.spp);
  const ropHistory = SIM.slice(0, tick + 1).map((t) => t.rop);
  const torqueHistory = SIM.slice(0, tick + 1).map((t) => t.torque);
  const eventLog = SIM.slice(0, tick + 1).filter((t) => t.event).map((t) => t.event);

  const highRiskCount = liveSites.filter((s) => s.risk >= 65).length;
  const criticalCount = liveSites.filter((s) => s.state === 'CRITICAL').length;
  const avgRop = (liveSites.reduce((a, s) => a + s.rop, 0) / liveSites.length).toFixed(1);

  const drawerSite = liveSites.find((s) => s.id === drawerId) || null;

  const actions = {
    gotoAssam07: () => { setDrawerId('ASSAM-07'); setPaletteOpen(false); },
    showHighRisk: () => { setMapFilter('high'); setPaletteOpen(false); },
    clearFilter: () => { setMapFilter(null); setPaletteOpen(false); },
    gotoCritical: () => { setPaletteOpen(false); setActiveNav('overview'); setTimeout(() => alertsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50); },
    startSim: () => { setDrawerId(null); setPaletteOpen(false); startSim(); },
    resetSim: () => { setPaletteOpen(false); resetSim(); },
  };
  const cmds = COMMANDS(actions).filter((c) => c.label.toLowerCase().includes(paletteQuery.toLowerCase()));

  const mainScreens = ['overview', 'opsmap'];

  return (
    <div style={{ fontFamily: FONT, background: C.bg0, color: C.tx0, width: '100%', height: '100vh', display: 'flex', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @keyframes psmPulse { 0% { transform: scale(0.6); opacity: 0.5; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes psmFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${C.b2}; border-radius: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        button { font-family: inherit; cursor: pointer; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: collapsed ? 56 : 208, flexShrink: 0, background: C.bg1, borderRight: `1px solid ${C.b1}`, display: 'flex', flexDirection: 'column', transition: 'width 200ms ease' }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? 0 : '0 14px', borderBottom: `1px solid ${C.b1}` }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: `linear-gradient(135deg, ${C.amber}, ${C.amberDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#1a1200' }}>N</div>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>PSM</span>
            </div>
          )}
          <button onClick={() => setCollapsed((c) => !c)} style={{ background: 'none', border: 'none', color: C.tx3, padding: 4 }}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
          {NAV.map((group) => (
            <div key={group.group} style={{ marginBottom: 14 }}>
              {!collapsed && <div style={{ fontSize: 9.5, color: C.tx3, letterSpacing: 0.8, padding: '0 8px 6px' }}>{group.group}</div>}
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    title={collapsed ? item.label : undefined}
                    onClick={() => setActiveNav(item.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: collapsed ? '9px 0' : '8px 10px', justifyContent: collapsed ? 'center' : 'flex-start',
                      borderRadius: 6, border: 'none', marginBottom: 2,
                      background: active ? C.s3 : 'transparent',
                      borderLeft: active && !collapsed ? `2px solid ${C.amber}` : '2px solid transparent',
                      color: active ? C.tx0 : C.tx2, transition: 'background 150ms ease',
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = C.s2; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <Icon size={14} />
                    {!collapsed && <span style={{ fontSize: 12.5, fontWeight: active ? 600 : 500 }}>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${C.b1}`, padding: collapsed ? '10px 0' : '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {!collapsed && <div style={{ fontSize: 9.5, color: C.tx3, letterSpacing: 0.8, marginBottom: 2 }}>SYSTEM HEALTH</div>}
          {['Telemetry', 'RAG', 'AI Service'].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', gap: 6 }}>
              {!collapsed && <span style={{ fontSize: 10.5, color: C.tx2 }}>{s}</span>}
              <StatusDot state="NORMAL" size={6} />
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* TOPBAR */}
        <div style={{ height: 52, flexShrink: 0, borderBottom: `1px solid ${C.b1}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16, background: C.bg1 }}>
          <button
            onClick={() => setPaletteOpen(true)}
            style={{
              flex: 1, maxWidth: 420, display: 'flex', alignItems: 'center', gap: 8, background: C.s2,
              border: `1px solid ${C.b1}`, borderRadius: 6, padding: '7px 10px', color: C.tx3, fontSize: 12,
            }}
          >
            <Search size={13} />
            <span style={{ flex: 1, textAlign: 'left' }}>Search wells, sites, incidents…</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 10, border: `1px solid ${C.b2}`, borderRadius: 4, padding: '1px 5px', fontFamily: MONO }}>
              <Command size={9} />K
            </span>
          </button>

          <span
            style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: C.amberBright,
              border: `1px solid ${C.amberDark}66`, background: `${C.amber}14`, padding: '4px 8px', borderRadius: 4,
            }}
          >
            DEMO / SIMULATION
          </span>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: C.tx1 }}>
            <StatusDot state="ACTIVE" size={7} pulse />
            <span style={{ fontWeight: 600 }}>LIVE</span>
            <span style={{ color: C.tx3, fontFamily: MONO }}>· {clock}s ago</span>
          </div>

          <button style={{ position: 'relative', background: 'none', border: 'none', color: C.tx2, padding: 6 }}>
            <Bell size={16} />
            {(highRiskCount + criticalCount) > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: 9999, background: C.critical }} />
            )}
          </button>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: C.s3, border: `1px solid ${C.b1}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={13} color={C.tx2} />
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {!mainScreens.includes(activeNav) ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', maxWidth: 380 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.tx1, marginBottom: 6 }}>
                  {NAV.flatMap((g) => g.items).find((i) => i.id === activeNav)?.label}
                </div>
                <p style={{ fontSize: 12, color: C.tx3, lineHeight: 1.6 }}>
                  This screen is defined in the PSM specification but isn't built out in this prototype —
                  it focuses on the Command Center to demonstrate the core map → telemetry → risk → AI chain.
                </p>
                <button
                  onClick={() => setActiveNav('overview')}
                  style={{ marginTop: 14, background: C.s3, border: `1px solid ${C.b2}`, color: C.tx1, padding: '7px 14px', borderRadius: 6, fontSize: 12 }}
                >
                  Back to Command Center
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.3 }}>DRILLING OPERATIONS</div>
                  <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Assam + Gujarat · Command Center</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 11, color: C.tx2, fontFamily: MONO }}>
                  Friday, Sep 11 2026
                </div>
              </div>

              {/* KPI RIBBON */}
              <div style={{ display: 'flex', flexWrap: 'wrap', background: C.s1, border: `1px solid ${C.b1}`, borderRadius: 8, marginBottom: 16, overflow: 'hidden' }}>
                <Metric label="ACTIVE SITES" value={liveSites.length} />
                <Metric label="ACTIVE WELLS" value={liveSites.length} />
                <Metric label="DRILLING" value={8} />
                <Metric label="HIGH RISK" value={String(highRiskCount).padStart(2, '0')} trend={highRiskCount > 1 ? 1 : 0} trendGood={false} />
                <Metric label="CRITICAL ALERTS" value={String(criticalCount).padStart(2, '0')} />
                <Metric label="NPT" value="3.2" unit="%" />
                <Metric label="AVG ROP" value={avgRop} unit="m/hr" />
                <Metric label="SYSTEM" value="99.4" unit="%" />
              </div>

              {/* GRID: MAP + CRITICAL EVENTS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, marginBottom: 16 }}>
                {/* MAP */}
                <Panel
                  title="OPERATIONS MAP"
                  icon={MapPin}
                  bodyStyle={{ padding: 0 }}
                  right={
                    <div style={{ display: 'flex', gap: 6 }}>
                      {mapFilter && (
                        <button onClick={() => setMapFilter(null)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: `${C.amber}18`, border: `1px solid ${C.amberDark}66`, color: C.amberBright, borderRadius: 4, padding: '3px 7px', fontSize: 10 }}>
                          High risk only <X size={10} />
                        </button>
                      )}
                      <IconBtn icon={Filter} />
                      <IconBtn icon={Layers} />
                      <IconBtn icon={Maximize2} />
                    </div>
                  }
                >
                  <div style={{ position: 'relative', height: 420, background: `radial-gradient(circle at 20% 20%, ${C.bg3}, ${C.bg0} 70%)`, backgroundImage: `radial-gradient(circle at 20% 20%, ${C.bg3}, ${C.bg0} 70%), radial-gradient(${C.b1} 1px, transparent 1px)`, backgroundSize: 'auto, 22px 22px', overflow: 'hidden' }}>
                    {/* region blobs */}
                    <div style={{ position: 'absolute', left: '55%', top: '8%', width: '38%', height: '46%', borderRadius: '38% 42% 45% 40%', background: `${C.cyan}08`, border: `1px solid ${C.cyan}22` }} />
                    <span style={{ position: 'absolute', left: '58%', top: '10%', fontSize: 10, letterSpacing: 1, color: `${C.cyan}99`, fontFamily: MONO }}>ASSAM</span>
                    <div style={{ position: 'absolute', left: '6%', top: '48%', width: '34%', height: '42%', borderRadius: '40% 38% 44% 42%', background: `${C.amber}08`, border: `1px solid ${C.amber}22` }} />
                    <span style={{ position: 'absolute', left: '9%', top: '50%', fontSize: 10, letterSpacing: 1, color: `${C.amber}99`, fontFamily: MONO }}>GUJARAT</span>

                    {liveSites.map((s) => {
                      const dim = mapFilter === 'high' && s.risk < 65;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setDrawerId(s.id)}
                          title={`${s.id} — ${s.displayState || s.state}`}
                          style={{
                            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)',
                            background: 'none', border: 'none', padding: 8, opacity: dim ? 0.25 : 1,
                            transition: 'opacity 200ms ease',
                          }}
                        >
                          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {(s.state === 'CRITICAL' || s.state === 'HIGH') && (
                              <span style={{ position: 'absolute', width: 22, height: 22, borderRadius: 9999, background: STATE_COLOR[s.state], opacity: 0.3, animation: 'psmPulse 1.8s ease-out infinite' }} />
                            )}
                            <span style={{ width: 10, height: 10, borderRadius: 9999, background: STATE_COLOR[s.state], border: `2px solid ${C.bg0}`, position: 'relative', boxShadow: `0 0 0 1px ${STATE_COLOR[s.state]}55` }} />
                          </span>
                          <div style={{ fontSize: 9, color: C.tx2, marginTop: 3, fontFamily: MONO, whiteSpace: 'nowrap' }}>{s.id}</div>
                        </button>
                      );
                    })}

                    {/* legend */}
                    <div style={{ position: 'absolute', right: 12, bottom: 44, display: 'flex', flexDirection: 'column', gap: 4, background: `${C.bg1}cc`, border: `1px solid ${C.b1}`, borderRadius: 6, padding: '8px 10px' }}>
                      {Object.entries(STATE_COLOR).map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9.5, color: C.tx2 }}>
                          <span style={{ width: 6, height: 6, borderRadius: 9999, background: v }} /> {k}
                        </div>
                      ))}
                    </div>

                    {/* timeline scrubber */}
                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 36, borderTop: `1px solid ${C.b1}`, background: `${C.bg1}dd`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16 }}>
                      {['08:00', '10:00', '12:00', '14:00', 'NOW'].map((t) => (
                        <span key={t} style={{ fontSize: 9.5, color: t === 'NOW' ? C.cyan : C.tx3, fontFamily: MONO }}>{t}</span>
                      ))}
                      <div style={{ flex: 1, height: 1, background: C.b2, position: 'relative' }}>
                        {eventLog.length > 0 && (
                          <span style={{ position: 'absolute', left: '78%', top: -3, width: 7, height: 7, borderRadius: 9999, background: C.high }} />
                        )}
                      </div>
                    </div>
                  </div>
                </Panel>

                {/* CRITICAL EVENTS */}
                <div ref={alertsRef}>
                  <Panel title="CRITICAL EVENTS" icon={AlertTriangle} style={{ height: 420 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <AlertRow
                        severity="CRITICAL"
                        title="Stuck-pipe indicators"
                        meta="Assam-18 · OIL-AS-18"
                        time={`${sites.find(s=>s.id==='ASSAM-18').updated}s ago`}
                        onClick={() => setDrawerId('ASSAM-18')}
                      />
                      <AlertRow
                        severity="WARNING"
                        title="4 correlated signals — drilling performance anomaly"
                        meta="Assam-12 · pressure, torque, ROP, flow"
                        time="19s ago"
                        onClick={() => setDrawerId('ASSAM-12')}
                      />
                      {tick >= 2 && (
                        <AlertRow
                          key={`sim-${tick}`}
                          severity={assam07Live.risk >= 85 ? 'HIGH' : 'WARNING'}
                          title={tick >= 5 ? 'Formation pressure transition — likely cause identified' : 'Pressure deviation detected'}
                          meta={`Assam-07 · OIL-AS-07 · confidence ${assam07Live.confidence ?? '—'}%`}
                          time="just now"
                          highlight
                          onClick={() => setDrawerId('ASSAM-07')}
                        />
                      )}
                      <AlertRow
                        severity="WARNING"
                        title="ROP trending below target"
                        meta="Gujarat-14 · OIL-GJ-14"
                        time="22s ago"
                        onClick={() => setDrawerId('GUJARAT-14')}
                      />
                    </div>
                  </Panel>
                </div>
              </div>

              {/* GRID: TELEMETRY + AI BRIEF */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <Panel
                  title="TELEMETRY SNAPSHOT — ASSAM-07"
                  icon={Gauge}
                  right={<StateTag state={assam07Live.state} label={assam07Live.displayState} />}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <TelemetryRow label="SPP" unit="psi" value={assam07Live.spp} baseline={2710} history={sppHistory} color={C.critical} />
                    <TelemetryRow label="ROP" unit="m/hr" value={assam07Live.rop} baseline={20.7} invert history={ropHistory} color={C.warning} />
                    <TelemetryRow label="Torque" unit="kN·m" value={assam07Live.torque} baseline={12.6} history={torqueHistory} color={C.cyan} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    {!playing ? (
                      <button onClick={startSim} style={btnPrimary}>
                        <Play size={12} /> {tick > 0 ? 'Replay scenario' : 'Start anomaly simulation'}
                      </button>
                    ) : (
                      <span style={{ ...btnPrimary, background: C.s3, color: C.tx2, cursor: 'default' }}>
                        <StatusDot state="ACTIVE" size={6} pulse /> Simulating…
                      </span>
                    )}
                    <button onClick={resetSim} style={btnGhost}><RotateCcw size={12} /> Reset</button>
                  </div>
                </Panel>

                <Panel title="AI OPERATIONAL BRIEF" icon={Brain}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ fontSize: 11, color: C.tx3 }}>Assam region · generated from live telemetry + drilling knowledge base</div>
                    <p style={{ fontSize: 12.5, color: C.tx0, lineHeight: 1.6, margin: 0 }}>{assam07Live.aiText}</p>
                    {assam07Live.confidence != null && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 10, color: C.tx3 }}>CONFIDENCE</span>
                        <div style={{ flex: 1, height: 4, background: C.s3, borderRadius: 9999, overflow: 'hidden' }}>
                          <div style={{ width: `${assam07Live.confidence}%`, height: '100%', background: C.cyan }} />
                        </div>
                        <span style={{ fontSize: 11, fontFamily: MONO, color: C.cyan }}>{assam07Live.confidence}%</span>
                      </div>
                    )}
                    <button onClick={() => setDrawerId('ASSAM-07')} style={{ ...btnGhost, alignSelf: 'flex-start', marginTop: 2 }}>
                      Investigate <ChevronRight size={12} />
                    </button>
                  </div>
                </Panel>
              </div>

              {/* ACTIVE OPERATIONS TABLE */}
              <Panel title="ACTIVE OPERATIONS" icon={Activity}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ textAlign: 'left', color: C.tx3, fontSize: 10, letterSpacing: 0.5 }}>
                      <th style={th}>SITE</th><th style={th}>FIELD</th><th style={th}>STATUS</th>
                      <th style={th}>RISK</th><th style={th}>ROP</th><th style={th}>UPDATED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveSites.map((s) => (
                      <tr key={s.id} onClick={() => setDrawerId(s.id)} style={{ borderTop: `1px solid ${C.b1}`, cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = C.s2}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ ...td, fontFamily: MONO, fontWeight: 600 }}>{s.id}</td>
                        <td style={td}>{s.field}</td>
                        <td style={td}><StateTag state={s.state} label={s.displayState || s.state} /></td>
                        <td style={{ ...td, fontFamily: MONO }}>{s.risk}</td>
                        <td style={{ ...td, fontFamily: MONO }}>{s.rop.toFixed(1)}</td>
                        <td style={{ ...td, color: C.tx3 }}>{s.updated ?? 0}s ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
            </>
          )}
        </div>
      </div>

      {/* SITE DRAWER */}
      {drawerSite && (
        <>
          <div onClick={() => setDrawerId(null)} style={{ position: 'absolute', inset: 0, background: '#00000066', animation: 'psmFade 150ms ease' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 380, background: C.bg1, borderLeft: `1px solid ${C.b2}`, display: 'flex', flexDirection: 'column', animation: 'psmFade 200ms ease', boxShadow: '-8px 0 24px #00000055' }}>
            <div style={{ padding: 16, borderBottom: `1px solid ${C.b1}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, fontFamily: MONO }}>{drawerSite.id}</div>
                <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>{drawerSite.field} · {drawerSite.region}</div>
                <div style={{ marginTop: 8 }}><StateTag state={drawerSite.state} label={drawerSite.displayState || drawerSite.state} /></div>
              </div>
              <button onClick={() => setDrawerId(null)} style={{ background: 'none', border: 'none', color: C.tx2 }}><X size={16} /></button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <SectionLabel>WELL / RIG</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                  <KV label="WELL" value={drawerSite.well} /><KV label="RIG" value={drawerSite.rig} />
                </div>
              </div>

              <div>
                <SectionLabel>LIVE TELEMETRY</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
                  <KV label="DEPTH (MD)" value={`${drawerSite.depth.toLocaleString()} m`} />
                  <KV label="ROP" value={`${drawerSite.rop.toFixed(1)} m/hr`} />
                  <KV label="WOB" value={`${drawerSite.wob} klbf`} />
                  <KV label="RPM" value={drawerSite.rpm} />
                  <KV label="SPP" value={`${drawerSite.spp.toLocaleString()} psi`} />
                  <KV label="TORQUE" value={`${drawerSite.torque.toFixed(1)} kN·m`} />
                </div>
              </div>

              <div>
                <SectionLabel>RISK</SectionLabel>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, fontFamily: MONO, color: STATE_COLOR[drawerSite.state] }}>{drawerSite.risk}</span>
                  <span style={{ fontSize: 12, color: C.tx3 }}>/ 100</span>
                </div>
                <div style={{ height: 5, background: C.s3, borderRadius: 9999, overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{ width: `${drawerSite.risk}%`, height: '100%', background: STATE_COLOR[drawerSite.state] }} />
                </div>
                {drawerSite.id === 'ASSAM-07' && tick >= 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {RISK_CONTRIBUTORS.map((r) => (
                      <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                        <span style={{ width: 110, color: C.tx2 }}>{r.label}</span>
                        <div style={{ flex: 1, height: 4, background: C.s3, borderRadius: 9999, overflow: 'hidden' }}>
                          <div style={{ width: `${r.pct}%`, height: '100%', background: r.color }} />
                        </div>
                        <span style={{ width: 28, textAlign: 'right', fontFamily: MONO, color: C.tx1 }}>{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {drawerSite.id === 'ASSAM-07' && tick >= 5 && (
                <div>
                  <SectionLabel>WHY IS THIS HIGH RISK?</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {WHY_HIGH_RISK.map((w, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, lineHeight: 1.5 }}>
                        <span style={{ color: C.amber, fontFamily: MONO, fontSize: 11 }}>{i + 1}</span>
                        <span style={{ color: C.tx1 }}>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <SectionLabel>AI BRIEF</SectionLabel>
                <p style={{ fontSize: 12.5, color: C.tx1, lineHeight: 1.6, margin: 0 }}>
                  {drawerSite.id === 'ASSAM-07' ? assam07Live.aiText : 'No active anomalies. Telemetry is within expected operating conditions.'}
                </p>
              </div>

              {drawerSite.id === 'ASSAM-07' && tick >= 5 && (
                <div>
                  <SectionLabel>EVIDENCE</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {EVIDENCE.map((e) => (
                      <div key={e.id} style={{ border: `1px solid ${C.b1}`, borderRadius: 6, padding: 10, background: C.s2 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11.5, fontWeight: 600 }}>[{e.id}] {e.title}</span>
                          <span style={{ fontSize: 10.5, color: C.cyan, fontFamily: MONO }}>{e.similarity}% match</span>
                        </div>
                        <div style={{ fontSize: 10.5, color: C.tx3, marginBottom: 4 }}>{e.ref}</div>
                        <div style={{ fontSize: 11, color: C.tx2, lineHeight: 1.5 }}>{e.excerpt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {drawerSite.id === 'ASSAM-07' && eventLog.length > 0 && (
                <div>
                  <SectionLabel>INCIDENT TIMELINE</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {eventLog.map((e, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: 12, position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ width: 7, height: 7, borderRadius: 9999, background: C.amber, flexShrink: 0 }} />
                          {i < eventLog.length - 1 && <span style={{ width: 1, flex: 1, background: C.b2, marginTop: 2 }} />}
                        </div>
                        <div>
                          <div style={{ fontSize: 10.5, color: C.tx3, fontFamily: MONO }}>{e.time}</div>
                          <div style={{ fontSize: 12, color: C.tx1 }}>{e.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: 14, borderTop: `1px solid ${C.b1}`, display: 'flex', gap: 8 }}>
              <button style={{ ...btnPrimary, flex: 1, justifyContent: 'center' }}>Recommended Investigation</button>
              <button style={{ ...btnGhost, flex: 1, justifyContent: 'center' }}>Open Site</button>
            </div>
          </div>
        </>
      )}

      {/* COMMAND PALETTE */}
      {paletteOpen && (
        <div onClick={() => setPaletteOpen(false)} style={{ position: 'fixed', inset: 0, background: '#00000088', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '14vh', zIndex: 50 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 480, background: C.bg1, border: `1px solid ${C.b2}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 24px 60px #000000aa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderBottom: `1px solid ${C.b1}` }}>
              <Search size={14} color={C.tx3} />
              <input
                autoFocus
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                placeholder="Type a command…"
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: C.tx0, fontSize: 13, fontFamily: FONT }}
              />
              <span style={{ fontSize: 10, color: C.tx3, border: `1px solid ${C.b2}`, borderRadius: 4, padding: '1px 5px' }}>ESC</span>
            </div>
            <div style={{ padding: 6, maxHeight: 260, overflow: 'auto' }}>
              {cmds.length === 0 && <div style={{ padding: 14, fontSize: 12, color: C.tx3 }}>No matching commands.</div>}
              {cmds.map((c) => (
                <button
                  key={c.id}
                  onClick={c.run}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 10px', background: 'none', border: 'none', borderRadius: 6, color: C.tx1, fontSize: 12.5 }}
                  onMouseEnter={(e) => e.currentTarget.style.background = C.s2}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span>{c.label}</span>
                  <span style={{ fontSize: 10.5, color: C.tx3 }}>{c.hint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== SMALL COMPONENTS ============================== */
function IconBtn({ icon: Icon }) {
  return (
    <button style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.s2, border: `1px solid ${C.b1}`, borderRadius: 5, color: C.tx2 }}>
      <Icon size={12} />
    </button>
  );
}

function AlertRow({ severity, title, meta, time, onClick, highlight }) {
  const color = STATE_COLOR[severity] || C.info;
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left', display: 'flex', gap: 10, padding: 10, borderRadius: 6,
        border: `1px solid ${highlight ? color + '55' : C.b1}`, background: highlight ? `${color}12` : C.s2,
        animation: highlight ? 'psmFade 300ms ease' : undefined,
      }}
    >
      <StatusDot state={severity} size={7} pulse={severity === 'CRITICAL' || severity === 'HIGH'} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.tx0, lineHeight: 1.35 }}>{title}</div>
        <div style={{ fontSize: 10.5, color: C.tx3, marginTop: 3 }}>{meta}</div>
      </div>
      <span style={{ fontSize: 10, color: C.tx3, whiteSpace: 'nowrap' }}>{time}</span>
    </button>
  );
}

function TelemetryRow({ label, unit, value, baseline, history, color, invert }) {
  const dev = ((value - baseline) / baseline) * 100;
  const bad = invert ? dev < -1 : dev > 1;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 78 }}>
        <div style={{ fontSize: 10, color: C.tx3 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 600, fontFamily: MONO }}>{Number.isInteger(value) ? value : value.toFixed(1)}</div>
        <div style={{ fontSize: 9.5, color: C.tx3 }}>{unit}</div>
      </div>
      <Spark values={history} color={color} baseline={baseline} width={100} height={30} />
      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
        <div style={{ fontSize: 9.5, color: C.tx3 }}>vs expected</div>
        <div style={{ fontSize: 11.5, fontFamily: MONO, color: bad ? C.high : C.success }}>{pct(dev)}</div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 10, letterSpacing: 0.6, color: C.tx3, marginBottom: 8 }}>{children}</div>;
}
function KV({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, color: C.tx3 }}>{label}</div>
      <div style={{ fontSize: 13, fontFamily: MONO, color: C.tx0, marginTop: 1 }}>{value}</div>
    </div>
  );
}

const th = { padding: '6px 10px', borderBottom: `1px solid ${C.b1}` };
const td = { padding: '9px 10px', color: C.tx1 };
const btnPrimary = { display: 'inline-flex', alignItems: 'center', gap: 6, background: C.amber, color: '#1a1200', border: 'none', borderRadius: 6, padding: '8px 12px', fontSize: 12, fontWeight: 600 };
const btnGhost = { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: `1px solid ${C.b2}`, color: C.tx1, borderRadius: 6, padding: '8px 12px', fontSize: 12 };
