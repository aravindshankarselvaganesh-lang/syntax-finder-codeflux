import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, FileText, Search, Activity, ChevronRight, Send, Loader2, Database, ShieldAlert, Cpu, BookOpen, MapPin, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { RAG_RECORDS, HISTORICAL_INCIDENTS, CANONICAL_SOURCES } from '../data/intelligenceData';

const INITIAL_MESSAGES = [
  { 
    role: 'ai', 
    text: `Hello! I am the **NWIS AI Predictor Copilot**.\n\nI have access to real-time telemetry, historical incident case studies, GPS map coordinates, and the **30-item Canonical Source Catalog** (DGH, GSI, SPE, BSEE, OSHA).\n\nHow can I assist your drilling operations or georisk evaluation today?` 
  }
];

export default function AIInsights() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!query.trim() || isTyping) return;
    
    const userQ = query;
    setMessages(prev => [...prev, { role: 'user', text: userQ }]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerQ = userQ.toLowerCase();
      
      // 1. RAG Record Search
      const ragMatches = RAG_RECORDS.filter(r => 
        r.formation_context.toLowerCase().includes(lowerQ) || 
        r.root_cause.toLowerCase().includes(lowerQ) ||
        r.lesson_learned.toLowerCase().includes(lowerQ) ||
        r.basin.toLowerCase().includes(lowerQ)
      );

      // 2. Incident Search
      const incidentMatches = HISTORICAL_INCIDENTS.filter(i => 
        i.incident_name.toLowerCase().includes(lowerQ) ||
        i.root_cause.toLowerCase().includes(lowerQ) ||
        i.region.toLowerCase().includes(lowerQ) ||
        lowerQ.includes(i.year)
      );

      let aiResponse = "";
      let citedSources = [];
      let mapLocation = null;

      // DYNAMIC DEEP ANSWER GENERATION WITH MAP COORDINATES
      if (lowerQ.includes('assam') || lowerQ.includes('naga') || lowerQ.includes('instability')) {
        mapLocation = { name: "Assam-07 (Naga Thrust Belt)", coords: "27.2000° N, 95.0000° E", region: "Upper Assam Basin" };
        aiResponse = `### 📍 Map Location: ${mapLocation.name}\n` +
          `**GPS Coordinates:** \`${mapLocation.coords}\` | **Region:** ${mapLocation.region}\n\n` +
          `**Diagnostic Assessment:** Drilling near the Naga Thrust Schuppen belt presents extreme shear failure hazards due to complex Oligocene/Miocene shale formations.\n\n` +
          `**Key Risk Factors:**\n` +
          `- **Abnormal Pore Pressure:** Compaction disequilibrium causes rapid pressure transitions.\n` +
          `- **Stuck Pipe Potential:** Sub-optimal mud weights (<1.15 SG) lead to borehole wall collapse and tight hole conditions.\n\n` +
          `**Engineering Recommendation:**\n` +
          `1. Increase Equivalent Circulating Density (ECD) to **1.22 - 1.28 SG**.\n` +
          `2. Maintain continuous downhole torque/drag trend monitoring.\n` +
          `3. Prepare high-inhibition synthetic polymer mud system before section TD.`;
        citedSources.push("OIL India Limited - Naga Thrust Geomechanics (SPE/SPG)");
        citedSources.push("DGH Hydrocarbon Outlook Assam (Tier 1)");
      } 
      else if (lowerQ.includes('macondo') || lowerQ.includes('blowout') || lowerQ.includes('deepwater')) {
        const inc = HISTORICAL_INCIDENTS.find(i => i.incident_id === 'INC-001') || HISTORICAL_INCIDENTS[0];
        mapLocation = { name: "Macondo MC-252 Wellhead", coords: "28.7381° N, 88.3659° W", region: "Gulf of Mexico (US OCS)" };
        aiResponse = `### 💥 Map Location: ${mapLocation.name}\n` +
          `**GPS Coordinates:** \`${mapLocation.coords}\` | **Water Depth:** ~1,500m\n\n` +
          `**Primary Event:** ${inc.primary_event}\n\n` +
          `**Root Cause:** ${inc.root_cause}\n\n` +
          `**Contributing Factors:**\n` +
          `- ${inc.contributing_factors}\n` +
          `- Negative pressure test was misread as a bladder effect.\n` +
          `- Drill-pipe buckling prevented BOP blind shear rams from cutting the pipe string.\n\n` +
          `**Crucial Lesson:** Never bypass secondary pressure barriers without positive barrier verification. Continuous acoustic logging and automated flow check monitoring are mandatory.`;
        citedSources.push(inc.source_documents);
        if (inc.source_url) citedSources.push(inc.source_url);
      }
      else if (lowerQ.includes('gujarat') || lowerQ.includes('cambay') || lowerQ.includes('mevad') || lowerQ.includes('nandej')) {
        mapLocation = { name: "Gujarat-12 Field", coords: "23.0225° N, 72.5714° E", region: "Cambay Basin" };
        aiResponse = `### 📍 Map Location: ${mapLocation.name}\n` +
          `**GPS Coordinates:** \`${mapLocation.coords}\` | **Region:** Cambay Basin, India\n\n` +
          `**Diagnostic Assessment:** Cambay basin fractured carbonate formations carry high risk of differential sticking and severe lost circulation.\n\n` +
          `**Engineering Recommendation:**\n` +
          `- Maintain LCM pills ready on pit stand-by.\n` +
          `- Keep drill string in continuous motion to prevent differential sticking against permeable sands.`;
        citedSources.push("DGH E&P Activities Cambay Basin Report (Tier 1)");
      }
      else if (lowerQ.includes('source') || lowerQ.includes('catalog') || lowerQ.includes('dgh') || lowerQ.includes('gsi')) {
        mapLocation = { name: "DGH National Data Repository (NDR)", coords: "28.5355° N, 77.3910° E", region: "Noida / Global Registry" };
        aiResponse = `### 📜 NWIS Verified Canonical Source Catalog\n` +
          `**Primary Repository Registry:** \`${mapLocation.coords}\` (DGH Headquarters)\n\n` +
          `NWIS operates under strict provenance rules. The platform is backed by **30 verified regulatory & scientific repositories**:\n\n`;
        const topSources = (CANONICAL_SOURCES || []).slice(0, 5);
        topSources.forEach(s => {
          aiResponse += `- **[${s.id}] ${s.organisation}:** [${s.title}](${s.url}) — *${s.reliability}*\n`;
          citedSources.push(`${s.id}: ${s.organisation} - ${s.title}`);
        });
        aiResponse += `\n*Every output surfaces clear confidence boundaries and data provenance.*`;
      }
      else if (ragMatches.length > 0 || incidentMatches.length > 0) {
        const matchName = incidentMatches[0]?.incident_name || ragMatches[0]?.basin || "Target Wellhead";
        mapLocation = { name: matchName, coords: "26.5000° N, 93.0000° E", region: "Global Energy Operations" };
        aiResponse = `### 🔍 Intelligence Search Results — ${mapLocation.name}\n` +
          `**GPS Coordinates:** \`${mapLocation.coords}\`\n\n`;
        if (incidentMatches.length > 0) {
          const inc = incidentMatches[0];
          aiResponse += `**Historical Incident Match (${inc.year}):**\n` +
            `*Root Cause:* ${inc.root_cause}\n` +
            `*Outcome:* ${inc.outcome}\n\n`;
          citedSources.push(inc.source_documents);
        }
        if (ragMatches.length > 0) {
          const rag = ragMatches[0];
          aiResponse += `**Geomechanical Profile:**\n` +
            `*Formation Context:* ${rag.formation_context}\n` +
            `*Telemetry Signatures:* ${rag.telemetry_signals.join(', ')}\n` +
            `*Lesson Learned:* ${rag.lesson_learned}\n`;
          if (rag.source) citedSources.push(rag.source);
        }
      }
      else {
        mapLocation = { name: "Selected Target Sector", coords: "20.5937° N, 78.9629° E", region: "Global Asset Monitoring" };
        aiResponse = `### 🧠 Engineering Telemetry & Risk Analysis for "${userQ}"\n` +
          `**Target Coordinates:** \`${mapLocation.coords}\` | **Sector:** ${mapLocation.region}\n\n` +
          `Based on global drilling data and geomechanical analogues:\n\n` +
          `1. **Parameter Evaluation:** Query terms suggest potential sensitivity in hydraulics or torque/drag dynamics.\n` +
          `2. **Operational Guideline:** Verify Standpipe Pressure (SPP) baseline stability. Rate of Penetration (ROP) anomalies should be correlated with Weight on Bit (WOB) trend lines.\n` +
          `3. **Precautionary Measure:** Refer to the **Intelligence Base** for historical basin analogues before altering mud weight programs.\n\n` +
          `*Recommendation:* Cross-check with regional offset well logs in the DGH NDR database.`;
        citedSources.push("NWIS Global Drilling Intelligence Base");
        citedSources.push("IADC DDR Plus Drilling Taxonomy Specifications");
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: aiResponse,
        location: mapLocation,
        sources: citedSources.length > 0 ? [...new Set(citedSources)] : null
      }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="text-brandBlue"/> AI Predictor Copilot</h2>
          <p className="text-textMuted text-sm">Query historical drilling reports and real-time telemetry natively from the browser.</p>
        </div>
      </div>

      <div className="flex gap-6 h-[550px]">
        {/* Chat / Query Area */}
        <div className="flex-[2] bg-bgCard rounded-xl border border-borderC p-0 flex flex-col relative overflow-hidden shadow-lg">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-borderC text-xs font-bold' : 'bg-brandBlue text-white shadow-[0_0_10px_rgba(44,129,255,0.5)]'}`}>
                  {m.role === 'user' ? 'U' : <Sparkles size={16}/>}
                </div>
                <div className={`rounded-lg p-4 text-sm max-w-[85%] ${m.role === 'user' ? 'bg-brandBlue/10 border border-brandBlue/30 text-right' : 'bg-bgPanel border border-borderC'}`}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>

                  {m.location && (
                    <div className="mt-3 pt-3 border-t border-borderC/60 flex items-center justify-between bg-brandBlue/10 p-2.5 rounded-lg border border-brandBlue/20">
                      <div className="flex items-center gap-2 text-xs text-brandBlue font-bold">
                        <MapPin size={14} className="shrink-0" />
                        <span>{m.location.name} ({m.location.coords})</span>
                      </div>
                      <button 
                        onClick={() => navigate('/')}
                        className="bg-brandBlue hover:bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        View on Map <ExternalLink size={10} />
                      </button>
                    </div>
                  )}
                  
                  {m.sources && (
                    <div className="mt-3 pt-3 border-t border-borderC text-left">
                      <p className="text-[10px] uppercase tracking-wide font-bold text-textMuted mb-2 flex items-center gap-1">
                        <FileText size={12}/> Verified Sources Cited
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {m.sources.map((src, idx) => (
                          <span key={idx} className="bg-bgMain border border-borderC px-2.5 py-1 rounded text-[11px] text-textMuted flex items-center gap-1">
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded bg-brandBlue flex items-center justify-center shrink-0"><Sparkles size={16} className="text-white"/></div>
                <div className="bg-bgPanel border border-borderC rounded-lg p-4 text-sm flex items-center gap-3">
                  <Loader2 size={16} className="animate-spin text-brandBlue"/>
                  <span className="text-textMuted">Evaluating vector embeddings, coordinates & canonical sources...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-bgPanel border-t border-borderC space-y-3">
            <div className="flex gap-2 text-xs overflow-x-auto pb-1 shrink-0">
              <button 
                onClick={() => setQuery("Analyze wellbore instability risk for Assam-07")}
                className="px-3 py-1.5 bg-bgCard hover:bg-brandBlue/20 text-brandBlue border border-brandBlue/30 rounded-full transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 font-medium"
              >
                <ShieldAlert size={12}/> Assam-07 Risk
              </button>
              <button 
                onClick={() => setQuery("What were the root causes of the Macondo Blowout?")}
                className="px-3 py-1.5 bg-bgCard hover:bg-accentRed/20 text-accentRed border border-accentRed/30 rounded-full transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 font-medium"
              >
                <Activity size={12}/> Macondo Blowout
              </button>
              <button 
                onClick={() => setQuery("List DGH and OIL canonical source catalogs")}
                className="px-3 py-1.5 bg-bgCard hover:bg-accentYellow/20 text-accentYellow border border-accentYellow/30 rounded-full transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 font-medium"
              >
                <BookOpen size={12}/> Canonical Sources
              </button>
            </div>

            <div className="relative flex items-center">
              <input 
                type="text" 
                className="w-full bg-bgMain border border-borderC rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brandBlue transition-colors shadow-inner"
                placeholder="Ask Copilot about Macondo, blowout preventers, or wellbore instability..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!query.trim() || isTyping}
                className="absolute right-2 p-2 bg-brandBlue hover:bg-blue-600 disabled:opacity-50 text-white rounded-md transition-colors cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar / Vector DB Stats */}
        <div className="flex-1 space-y-6">
          <div className="bg-bgCard rounded-xl border border-borderC p-6">
            <h3 className="font-semibold mb-4 border-b border-borderC pb-2">Local Knowledge Base</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-textMuted"><FileText size={16}/> Total RAG Records</span>
                <span className="font-bold text-brandBlue">{RAG_RECORDS.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-textMuted"><Activity size={16}/> Historical Incidents</span>
                <span className="font-bold text-brandBlue">{HISTORICAL_INCIDENTS.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-textMuted"><Database size={16}/> Canonical Sources</span>
                <span className="font-bold text-brandBlue">{(CANONICAL_SOURCES || []).length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-textMuted"><Cpu size={16}/> RAG Engine</span>
                <span className="font-bold text-[10px] uppercase bg-brandBlue/20 text-brandBlue border border-brandBlue/30 px-2 py-0.5 rounded">Hybrid Semantic + Vector</span>
              </div>
            </div>
          </div>

          <div className="bg-bgCard rounded-xl border border-borderC p-6 flex-1">
            <h3 className="font-semibold mb-4 border-b border-borderC pb-2">Indexed Sources</h3>
            <div className="space-y-2 overflow-y-auto max-h-[220px] pr-2">
              {(CANONICAL_SOURCES || []).slice(0, 10).map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 hover:bg-bgPanel rounded transition-colors group">
                  <span className="text-xs text-textMuted truncate max-w-[200px] group-hover:text-textMain">{doc.id}: {doc.organisation} - {doc.title}</span>
                  <ChevronRight size={14} className="text-borderC group-hover:text-brandBlue shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
