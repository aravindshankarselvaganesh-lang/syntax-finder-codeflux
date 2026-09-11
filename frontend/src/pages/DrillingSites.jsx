import React, { useState } from 'react';
import { Search, Filter, MoreVertical, MapPin, Activity, X, Plus } from 'lucide-react';
import { MOCK_SITES } from '../data/mockSites';

export default function DrillingSites() {
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem('nwis_sites');
    return saved ? JSON.parse(saved) : MOCK_SITES;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSiteModal, setSelectedSiteModal] = useState(null);

  // New site form state
  const [newSite, setNewSite] = useState({ id: '', name: '', state: '', td: '', status: 'green', rca: 'Optimal Operations' });

  const handleAddSite = (e) => {
    e.preventDefault();
    if (!newSite.name || !newSite.state) return;
    const siteObj = {
      id: newSite.id || `SITE-${Date.now().toString().slice(-4)}`,
      name: newSite.name,
      state: newSite.state,
      pos: [20.0, 78.0],
      status: newSite.status,
      operator: 'Oil India Ltd',
      spud: 'Just now',
      td: newSite.td || '2,500 m',
      formation: 'Upper Formation',
      rca: newSite.rca
    };
    const updated = [siteObj, ...sites];
    setSites(updated);
    localStorage.setItem('nwis_sites', JSON.stringify(updated));
    setShowAddModal(false);
    setNewSite({ id: '', name: '', state: '', td: '', status: 'green', rca: 'Optimal Operations' });
  };

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          site.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || 
                          (statusFilter === 'green' && site.status === 'green') ||
                          (statusFilter === 'yellow' && site.status === 'yellow') ||
                          (statusFilter === 'red' && site.status === 'red');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Drilling Sites Portfolio</h2>
          <p className="text-textMuted text-sm">Manage and monitor all active and historical wellbores.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brandBlue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-brandBlue/20"
        >
          <Plus size={16} /> Add New Site
        </button>
      </div>

      <div className="bg-bgCard border border-borderC rounded-xl flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-borderC flex justify-between items-center bg-bgPanel relative">
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

          <div className="relative">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`flex items-center gap-2 text-sm border px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                statusFilter !== 'ALL' ? 'bg-brandBlue/10 border-brandBlue text-brandBlue font-bold' : 'text-textMuted hover:text-textMain border-borderC'
              }`}
            >
              <Filter size={16} /> {statusFilter === 'ALL' ? 'Filter' : `Status: ${statusFilter}`}
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-bgCard border border-borderC rounded-xl shadow-xl z-20 py-2">
                <button onClick={() => { setStatusFilter('ALL'); setShowFilterDropdown(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 text-textMain">All Sites</button>
                <button onClick={() => { setStatusFilter('green'); setShowFilterDropdown(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 text-accentGreen">Active (Green)</button>
                <button onClick={() => { setStatusFilter('yellow'); setShowFilterDropdown(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 text-accentYellow">Warning (Yellow)</button>
                <button onClick={() => { setStatusFilter('red'); setShowFilterDropdown(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 text-accentRed">High Risk (Red)</button>
              </div>
            )}
          </div>
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
                    <button 
                      onClick={() => setSelectedSiteModal(site)}
                      className="p-1.5 rounded hover:bg-brandBlue/20 text-textMuted hover:text-brandBlue transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSites.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-textMuted">
                    No drilling sites found matching search/filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SITE DETAILS MODAL */}
      {selectedSiteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-bgCard border border-borderC rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6">
            <div className="flex justify-between items-start mb-4 border-b border-borderC pb-3">
              <div>
                <h3 className="font-bold text-xl">{selectedSiteModal.name}</h3>
                <p className="text-xs text-textMuted">{selectedSiteModal.state}</p>
              </div>
              <button onClick={() => setSelectedSiteModal(null)} className="text-textMuted hover:text-white"><X size={18}/></button>
            </div>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between py-1 border-b border-borderC/50">
                <span className="text-textMuted">Operator</span>
                <span className="font-semibold">{selectedSiteModal.operator || 'ONGC / OIL'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-borderC/50">
                <span className="text-textMuted">Spud Date</span>
                <span className="font-semibold">{selectedSiteModal.spud}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-borderC/50">
                <span className="text-textMuted">Total Depth (TD)</span>
                <span className="font-semibold text-brandBlue">{selectedSiteModal.td}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-borderC/50">
                <span className="text-textMuted">Target Formation</span>
                <span className="font-semibold">{selectedSiteModal.formation || 'Generic Reservoir'}</span>
              </div>
              <div className="pt-2">
                <span className="text-xs text-textMuted block mb-1">Diagnostic Status</span>
                <p className="p-3 bg-bgPanel border border-borderC rounded-lg text-xs font-semibold">{selectedSiteModal.rca}</p>
              </div>
            </div>
            <button onClick={() => setSelectedSiteModal(null)} className="w-full py-2 bg-brandBlue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
              Close Site Overview
            </button>
          </div>
        </div>
      )}

      {/* ADD NEW SITE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddSite} className="bg-bgCard border border-borderC rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6">
            <div className="flex justify-between items-center mb-4 border-b border-borderC pb-3">
              <h3 className="font-bold text-xl">Register New Drilling Site</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-textMuted hover:text-white"><X size={18}/></button>
            </div>
            <div className="space-y-4 mb-6 text-sm">
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Site / Well Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Assam-14" 
                  value={newSite.name} 
                  onChange={e => setNewSite({ ...newSite, name: e.target.value })}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Basin / Region</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Upper Assam Basin" 
                  value={newSite.state} 
                  onChange={e => setNewSite({ ...newSite, state: e.target.value })}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Target Depth</label>
                <input 
                  type="text" 
                  placeholder="e.g. 3,400 m" 
                  value={newSite.td} 
                  onChange={e => setNewSite({ ...newSite, td: e.target.value })}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Initial Status</label>
                <select 
                  value={newSite.status} 
                  onChange={e => setNewSite({ ...newSite, status: e.target.value })}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue"
                >
                  <option value="green">Active (Normal Operations)</option>
                  <option value="yellow">Warning (Telemetry Spike)</option>
                  <option value="red">High Risk (Pre-Blowout Anomaly)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-borderC rounded-lg text-sm text-textMuted hover:text-white">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 bg-brandBlue hover:bg-blue-600 text-white font-bold rounded-lg text-sm transition-colors">Register Site</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
