import React, { useState, useEffect } from 'react';
import { BarChart2, Activity, Play, Pause, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function Analytics() {
  const [data, setData] = useState([]);
  const [isSimulating, setIsSimulating] = useState(true);

  // Initialize data
  useEffect(() => {
    const initialData = Array.from({ length: 30 }, (_, i) => ({
      time: `-${30 - i}s`,
      wob: 12 + Math.random() * 2,
      rpm: 120 + Math.random() * 5,
      spp: 2800 + Math.random() * 100,
      torque: 15 + Math.random() * 2
    }));
    setData(initialData);
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        
        // Add random walk variations
        newData.push({
          time: 'Now',
          wob: Math.max(5, Math.min(25, last.wob + (Math.random() - 0.5) * 1.5)),
          rpm: Math.max(60, Math.min(180, last.rpm + (Math.random() - 0.5) * 4)),
          spp: Math.max(1500, Math.min(3500, last.spp + (Math.random() - 0.5) * 50)),
          torque: Math.max(5, Math.min(30, last.torque + (Math.random() - 0.5) * 1.5))
        });
        
        // Fix up the time labels for the old points
        return newData.map((d, i) => ({ ...d, time: i === 29 ? 'Now' : `-${29 - i}s` }));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><BarChart2 className="text-brandBlue"/> Telemetry Analytics</h2>
          <p className="text-textMuted text-sm mt-1">Live streaming sensor data from active drilling sites.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isSimulating ? 'bg-accentRed/20 text-accentRed hover:bg-accentRed/30' : 'bg-brandBlue/20 text-brandBlue hover:bg-brandBlue/30'}`}
          >
            {isSimulating ? <Pause size={16}/> : <Play size={16}/>}
            {isSimulating ? 'PAUSE STREAM' : 'RESUME STREAM'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Weight on Bit (WOB)" value={data.length ? data[29].wob.toFixed(1) : '0'} unit="klbs" trend="normal" />
        <MetricCard title="Rotary Speed (RPM)" value={data.length ? data[29].rpm.toFixed(0) : '0'} unit="rpm" trend="normal" />
        <MetricCard title="Standpipe Pressure (SPP)" value={data.length ? data[29].spp.toFixed(0) : '0'} unit="psi" trend="up" />
        <MetricCard title="Torque" value={data.length ? data[29].torque.toFixed(1) : '0'} unit="kft-lb" trend="normal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Weight on Bit vs Time" data={data} dataKey="wob" color="#2C81FF" unit="klbs" yDomain={[0, 30]}/>
        <ChartCard title="Standpipe Pressure vs Time" data={data} dataKey="spp" color="#10B981" unit="psi" yDomain={[1000, 4000]}/>
        <ChartCard title="Rotary Speed vs Time" data={data} dataKey="rpm" color="#FBBF24" unit="rpm" yDomain={[0, 200]}/>
        <ChartCard title="Torque vs Time" data={data} dataKey="torque" color="#F43F5E" unit="kft-lb" yDomain={[0, 40]}/>
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, trend }) {
  return (
    <div className="bg-bgCard border border-borderC rounded-xl p-4 flex flex-col justify-between">
      <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wide mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold font-mono">{value}</span>
        <span className="text-sm text-textMuted mb-1">{unit}</span>
      </div>
    </div>
  );
}

function ChartCard({ title, data, dataKey, color, unit, yDomain }) {
  return (
    <div className="bg-bgCard border border-borderC rounded-xl p-4">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <Activity size={16} className="text-textMuted"/> {title}
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
            <XAxis dataKey="time" stroke="#718096" fontSize={10} tickMargin={10} />
            <YAxis stroke="#718096" fontSize={10} domain={yDomain} tickFormatter={(val) => `${val} ${unit}`} width={60} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#1A202C', borderColor: '#2D3748', borderRadius: '8px' }}
              itemStyle={{ color: '#E2E8F0' }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={false} // Disable recharts animation for smoother live updates
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
