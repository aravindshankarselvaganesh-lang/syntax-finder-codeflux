import React, { useState } from 'react';
import { BookOpen, Database, AlertTriangle, Layers, FileText, ExternalLink, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { RESEARCH_REPORT, HISTORICAL_INCIDENTS, FAILURE_TAXONOMY, RAG_RECORDS, CANONICAL_SOURCES } from '../data/intelligenceData';

export default function IntelligenceHub() {
  const [activeTab, setActiveTab] = useState('report');

  return (
    <div className="h-full flex flex-col space-y-6 overflow-y-auto pb-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Database className="text-brandBlue"/> Global Intelligence Database</h2>
          <p className="text-textMuted text-sm mt-1">Access underlying engineering research, failure taxonomies, and historical case studies.</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b border-borderC pb-px">
        <TabButton id="report" label="Research Report" icon={<BookOpen size={16}/>} active={activeTab} set={setActiveTab} />
        <TabButton id="sources" label="Sources" icon={<FileText size={16}/>} active={activeTab} set={setActiveTab} />
        <TabButton id="incidents" label="Major Incidents" icon={<AlertTriangle size={16}/>} active={activeTab} set={setActiveTab} />
        <TabButton id="taxonomy" label="Failure Taxonomy" icon={<Layers size={16}/>} active={activeTab} set={setActiveTab} />
        <TabButton id="rag" label="RAG Knowledge Base" icon={<FileText size={16}/>} active={activeTab} set={setActiveTab} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-bgCard rounded-xl border border-borderC p-6 overflow-y-auto relative min-h-[500px]">
        
        {/* RESEARCH REPORT */}
        {activeTab === 'report' && (
          <div className="bg-bgCard border border-borderC rounded-xl p-8 max-w-4xl prose prose-invert prose-blue">
            <ReactMarkdown>{RESEARCH_REPORT}</ReactMarkdown>
          </div>
        )}

        {/* SOURCES */}
        {activeTab === 'sources' && (
          <div className="space-y-4 max-w-6xl">
            <div className="bg-brandBlue/10 border border-brandBlue/20 rounded-lg p-4 mb-6 flex gap-3 text-sm text-brandBlue">
              <Info className="shrink-0 mt-0.5" />
              <p><strong>Canonical Source Catalog:</strong> This table explicitly maps the exact provenance of all external constraints used by the AI engine. Every URL is verified. Tiers indicate data reliability and permissible AI use-cases.</p>
            </div>
            <div className="bg-bgCard border border-borderC rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-bgPanel text-textMuted text-xs uppercase tracking-wider border-b border-borderC">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Organisation</th>
                    <th className="px-4 py-3">Title / Link</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Reliability</th>
                    <th className="px-4 py-3">PSM Limitation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderC">
                  {CANONICAL_SOURCES.map(s => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{s.id}</td>
                      <td className="px-4 py-3 font-semibold">{s.organisation}</td>
                      <td className="px-4 py-3"><a href={s.url} target="_blank" rel="noreferrer" className="text-brandBlue hover:underline">{s.title}</a></td>
                      <td className="px-4 py-3 text-xs text-textMuted">{s.type}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${s.reliability === 'Tier 1' ? 'bg-accentGreen/10 text-accentGreen' : 'bg-accentYellow/10 text-accentYellow'}`}>
                          {s.reliability}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-textMuted max-w-xs truncate" title={s.limitation}>{s.limitation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-bgPanel text-textMuted border-b border-borderC">
                <tr>
                  <th className="px-4 py-3">Incident</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Outcome</th>
                  <th className="px-4 py-3">Root Cause</th>
                  <th className="px-4 py-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {HISTORICAL_INCIDENTS.map((inc, i) => (
                  <tr key={i} className="border-b border-borderC hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-textMain">{inc.incident_name}</td>
                    <td className="px-4 py-3">{inc.region}, {inc.country}</td>
                    <td className="px-4 py-3">{inc.year}</td>
                    <td className="px-4 py-3 text-accentRed font-medium">{inc.outcome}</td>
                    <td className="px-4 py-3 text-xs leading-relaxed max-w-xs">{inc.root_cause}</td>
                    <td className="px-4 py-3 text-brandBlue hover:underline">
                      <a href={inc.source_url} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                        Report <ExternalLink size={12}/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'taxonomy' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-bgPanel text-textMuted border-b border-borderC">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Subtype</th>
                  <th className="px-4 py-3">Definition</th>
                  <th className="px-4 py-3">Telemetry Indicators</th>
                </tr>
              </thead>
              <tbody>
                {FAILURE_TAXONOMY.map((tax, i) => (
                  <tr key={i} className="border-b border-borderC hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-accentYellow">{tax.category}</td>
                    <td className="px-4 py-3 font-semibold text-textMain">{tax.subtype}</td>
                    <td className="px-4 py-3 text-xs leading-relaxed max-w-xs">{tax.definition}</td>
                    <td className="px-4 py-3 text-xs font-mono text-textMuted">{tax.telemetry_indicators}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rag' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RAG_RECORDS.map((rec, i) => (
              <div key={i} className="bg-bgPanel border border-borderC rounded-lg p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="bg-brandBlue/10 text-brandBlue border border-brandBlue/20 px-2 py-0.5 rounded text-xs font-bold uppercase">{rec.incident_type}</span>
                  <span className="text-xs text-textMuted">Confidence: {rec.confidence}</span>
                </div>
                <h4 className="font-bold mt-1">{rec.failure_mode}</h4>
                <p className="text-xs text-textMuted leading-relaxed"><strong className="text-textMain">Context:</strong> {rec.formation_context}</p>
                <p className="text-xs text-textMuted leading-relaxed"><strong className="text-textMain">Root Cause:</strong> {rec.root_cause}</p>
                <p className="text-xs text-textMuted leading-relaxed"><strong className="text-textMain">Telemetry:</strong> {rec.telemetry_signals?.join(', ')}</p>
                <div className="mt-auto pt-3 border-t border-borderC">
                  <p className="text-[10px] uppercase tracking-wide text-textMuted">Lesson Learned</p>
                  <p className="text-xs italic text-accentYellow mt-1">"{rec.lesson_learned}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

function TabButton({ id, label, icon, active, set }) {
  const isActive = active === id;
  return (
    <button 
      onClick={() => set(id)}
      className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
        isActive ? 'border-brandBlue text-brandBlue' : 'border-transparent text-textMuted hover:text-textMain hover:border-borderC'
      }`}
    >
      {icon} {label}
    </button>
  );
}
