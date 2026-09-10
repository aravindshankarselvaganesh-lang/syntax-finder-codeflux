import React, { useState } from 'react';
import { Sparkles, FileText, Search, Activity, ChevronRight } from 'lucide-react';

export default function AIInsights() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="text-brandBlue"/> AI Intelligence Hub</h2>
          <p className="text-textMuted text-sm">Query historical drilling reports and real-time telemetry.</p>
        </div>
      </div>

      <div className="flex gap-6 h-full min-h-[500px]">
        {/* Chat / Query Area */}
        <div className="flex-[2] bg-bgCard rounded-xl border border-borderC p-6 flex flex-col relative">
          
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-brandBlue flex items-center justify-center shrink-0"><Sparkles size={16} className="text-white"/></div>
              <div className="bg-bgPanel border border-borderC rounded-lg p-4 text-sm">
                <p className="font-semibold mb-2">Welcome to the NWIS Copilot.</p>
                <p className="text-textMuted leading-relaxed">I am monitoring 9 active drilling sites. The vector database contains 7 historical drilling reports. How can I assist you today?</p>
              </div>
            </div>
            
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded bg-borderC flex items-center justify-center shrink-0 text-xs font-bold">A</div>
              <div className="bg-brandBlue/10 border border-brandBlue/30 rounded-lg p-4 text-sm text-right">
                <p>What caused the pressure anomalies at Gujarat-12 last year?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-brandBlue flex items-center justify-center shrink-0"><Sparkles size={16} className="text-white"/></div>
              <div className="bg-bgPanel border border-borderC rounded-lg p-4 text-sm w-full">
                <p className="text-textMuted leading-relaxed mb-3">Searching vector database for <span className="text-brandBlue">"pressure anomalies Gujarat-12"</span>...</p>
                <div className="bg-bgMain p-3 rounded border border-borderC mb-3">
                  <p className="font-semibold text-accentYellow mb-1">Root Cause Identified</p>
                  <p className="text-textMuted">Based on <span className="underline">Mevad_Field_Operations_Report.pdf</span>, the pressure anomalies at Gujarat-12 were caused by sudden formation fluid influx due to inadequate mud weight optimization during the drilling of the intermediate section.</p>
                </div>
                <p className="font-medium">Recommended Action for current wells:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-textMuted">
                  <li>Maintain mud weight at 1.25 SG while drilling through analogous formations.</li>
                  <li>Increase frequency of flow checks.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              className="w-full bg-bgPanel border border-borderC rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brandBlue transition-colors"
              placeholder="Ask Copilot about risk factors, historical reports, or live telemetry..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 bottom-2 w-8 bg-brandBlue rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Search size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Sidebar / Vector DB Stats */}
        <div className="flex-1 space-y-6">
          <div className="bg-bgCard rounded-xl border border-borderC p-6">
            <h3 className="font-semibold mb-4 border-b border-borderC pb-2">Knowledge Base</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-textMuted"><FileText size={16}/> Total Documents</span>
                <span className="font-bold">7</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-textMuted"><Activity size={16}/> Vector Chunks</span>
                <span className="font-bold">41</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-textMuted"><Search size={16}/> Embedding Model</span>
                <span className="font-bold text-xs bg-bgPanel px-2 py-1 rounded">all-MiniLM-L6-v2</span>
              </div>
            </div>
          </div>

          <div className="bg-bgCard rounded-xl border border-borderC p-6">
            <h3 className="font-semibold mb-4 border-b border-borderC pb-2">Indexed Reports</h3>
            <div className="space-y-2">
              {[
                "Assam_Tripura_Rajasthan_Simplified_Risk_Report.pdf",
                "Failed_Oil_Drilling_Cases_Assam_Gujarat.pdf",
                "Mevad_Field_Operations_Report.pdf",
                "Nandej_Field_Status_Presentation.pdf"
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-bgPanel rounded cursor-pointer transition-colors group">
                  <span className="text-xs text-textMuted truncate max-w-[200px]">{doc}</span>
                  <ChevronRight size={14} className="text-borderC group-hover:text-brandBlue" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
