import React, { useState } from 'react';
import { Search, Filter, MoreVertical, MapPin, Activity } from 'lucide-react';

import { MOCK_SITES } from '../data/mockSites';

export default function DrillingSites() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSites = MOCK_SITES.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    site.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Drilling Sites Portfolio</h2>
          <p className="text-textMuted text-sm">Manage and monitor all active and historical wellbores.</p>
        </div>
        <button className="bg-brandBlue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Add New Site
        </button>
      </div>

      <div className="bg-bgCard border border-borderC rounded-xl flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-borderC flex justify-between items-center bg-bgPanel">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search by site or region..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-bgMain border border-borderC rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-brandBlue transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-textMuted hover:text-textMain border border-borderC px-3 py-2 rounded-lg transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-textMuted uppercase bg-bgPanel sticky top-0 border-b border-borderC">
              <tr>
                <th className="px-6 py-4 font-medium">Site ID</th>
                <th className="px-6 py-4 font-medium">Region</th>
                <th className="px-6 py-4 font-medium">Current Depth</th>
                <th className="px-6 py-4 font-medium">Target Depth</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">AI Diagnosis</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderC">
              {filteredSites.map((site) => (
                <tr key={site.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-bgPanel border border-borderC flex items-center justify-center"><MapPin size={14} className="text-brandBlue"/></div>
                    {site.name}
                  </td>
                  <td className="px-6 py-4 text-textMuted">{site.state}</td>
                  <td className="px-6 py-4 font-mono">{site.td}</td>
                  <td className="px-6 py-4 font-mono text-textMuted">{site.td}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      site.status === 'green' ? 'bg-accentGreen/10 text-accentGreen border-accentGreen/20' :
                      site.status === 'red' ? 'bg-accentRed/10 text-accentRed border-accentRed/20' :
                      site.status === 'yellow' ? 'bg-accentYellow/10 text-accentYellow border-accentYellow/20' :
                      'bg-bgPanel text-textMuted border-borderC'
                    }`}>
                      {site.status === 'green' ? 'Active' : site.status === 'yellow' ? 'Warning' : 'High Risk'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Activity size={14} className={site.status === 'red' ? 'text-accentRed' : 'text-textMuted'} />
                    {site.rca}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded hover:bg-bgPanel text-textMuted transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSites.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-textMuted">
                    No drilling sites found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
