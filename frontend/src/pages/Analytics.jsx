import React from 'react';
import { BarChart2, TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const DEPTH_DATA = [
  { day: 'Day 1', rop: 12, depth: 500 },
  { day: 'Day 2', rop: 14, depth: 850 },
  { day: 'Day 3', rop: 18, depth: 1300 },
  { day: 'Day 4', rop: 15, depth: 1600 },
  { day: 'Day 5', rop: 9, depth: 1750 },
  { day: 'Day 6', rop: 5, depth: 1800 },
  { day: 'Day 7', rop: 2, depth: 1820 },
];

export default function Analytics() {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Performance Analytics</h2>
          <p className="text-textMuted text-sm">Fleet-wide rate of penetration and non-productive time analysis.</p>
        </div>
        <div className="bg-bgPanel border border-borderC rounded-lg p-1 flex text-sm">
          <button className="px-4 py-1.5 bg-brandBlue text-white rounded shadow">Fleet View</button>
          <button className="px-4 py-1.5 text-textMuted hover:text-white transition-colors">Assam-07</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Average ROP" value="14.2 m/hr" trend="+2.4%" positive={true} icon={<Activity size={20} className="text-brandBlue"/>} />
        <StatCard title="Total NPT" value="48 hrs" trend="-12%" positive={true} icon={<Clock size={20} className="text-accentYellow"/>} />
        <StatCard title="Cost / Meter" value="$1,240" trend="+5.1%" positive={false} icon={<TrendingUp size={20} className="text-accentRed"/>} />
        <StatCard title="Carbon Footprint" value="412 MT" trend="-2.1%" positive={true} icon={<TrendingDown size={20} className="text-accentGreen"/>} />
      </div>

      <div className="grid grid-cols-2 gap-6 h-[400px]">
        {/* Chart 1 */}
        <div className="bg-bgCard border border-borderC rounded-xl p-5 flex flex-col">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><BarChart2 size={18} className="text-textMuted"/> Depth vs Rate of Penetration</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DEPTH_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#23324A" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <RechartsTooltip cursor={{stroke: '#23324A'}} contentStyle={{backgroundColor: '#0E1623', border: '1px solid #23324A'}}/>
                <Line yAxisId="left" type="monotone" dataKey="depth" stroke="#2C81FF" strokeWidth={3} dot={false} name="Depth (m)" />
                <Line yAxisId="right" type="monotone" dataKey="rop" stroke="#10B981" strokeWidth={2} dot={false} name="ROP (m/hr)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-bgCard border border-borderC rounded-xl p-5 flex flex-col">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><Activity size={18} className="text-textMuted"/> Fleet Pressure Trends (Standpipe)</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEPTH_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#23324A" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <RechartsTooltip cursor={{stroke: '#23324A'}} contentStyle={{backgroundColor: '#0E1623', border: '1px solid #23324A'}}/>
                <Area type="monotone" dataKey="rop" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorRop)" name="Pressure Anomaly Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, positive, icon }) {
  return (
    <div className="bg-bgCard border border-borderC rounded-xl p-5 relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
        {React.cloneElement(icon, { size: 100 })}
      </div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <p className="text-sm font-medium text-textMuted">{title}</p>
        <div className="p-2 rounded-lg bg-bgPanel border border-borderC">{icon}</div>
      </div>
      <div className="relative z-10">
        <h4 className="text-3xl font-bold text-textMain mb-1">{value}</h4>
        <p className={`text-xs font-semibold ${positive ? 'text-accentGreen' : 'text-accentRed'}`}>
          {trend} <span className="text-textMuted font-normal ml-1">vs last month</span>
        </p>
      </div>
    </div>
  );
}
