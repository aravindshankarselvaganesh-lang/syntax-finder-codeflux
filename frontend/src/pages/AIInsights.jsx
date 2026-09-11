import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, FileText, Search, Activity, ChevronRight, Send, Loader2 } from 'lucide-react';
import { RAG_RECORDS, HISTORICAL_INCIDENTS, SOURCES, CANONICAL_SOURCES } from '../data/intelligenceData';

export default function AIInsights() {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Welcome to the Energy Operations Copilot. I am monitoring global drilling sites and have access to the full RAG intelligence database (including major incidents like Macondo, Montara, and Ekofisk). How can I assist you today?"
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!query.trim()) return;
    
    const userQ = query;
    setMessages(prev => [...prev, { role: 'user', text: userQ }]);
    setQuery('');
    setIsTyping(true);

    // Simulate RAG Search and AI response
    setTimeout(() => {
      const lowerQ = userQ.toLowerCase();
      
      // Look for matches in the RAG DB
      const matches = RAG_RECORDS.filter(r => 
        r.formation_context.toLowerCase().includes(lowerQ) || 
        r.root_cause.toLowerCase().includes(lowerQ) ||
        r.lesson_learned.toLowerCase().includes(lowerQ)
      );

      const incidentMatches = HISTORICAL_INCIDENTS.filter(i => 
        i.incident_name.toLowerCase().includes(lowerQ) ||
        i.root_cause.toLowerCase().includes(lowerQ)
      );

      const sourceMatches = typeof CANONICAL_SOURCES !== 'undefined' ? CANONICAL_SOURCES.filter(s =>
        s.organisation.toLowerCase().includes(lowerQ) ||
        s.title.toLowerCase().includes(lowerQ) ||
        lowerQ.includes('source') || lowerQ.includes('catalog')
      ) : [];

      let aiResponse = "";
      let citedSources = [];

      if (matches.length > 0 || incidentMatches.length > 0 || sourceMatches.length > 0) {
        aiResponse = "I found relevant historical intelligence in the vector database.\n\n";
        
        if (sourceMatches.length > 0) {
          aiResponse += "**Verified Canonical Sources:**\n";
          sourceMatches.slice(0, 3).forEach(s => {
            aiResponse += `- [${s.id}] ${s.organisation}: [${s.title}](${s.url}) (Tier: ${s.reliability})\n`;
          });
          aiResponse += "\n";
        }

        if (incidentMatches.length > 0) {
          const inc = incidentMatches[0];
          aiResponse += `**Incident Match: ${inc.incident_name} (${inc.year})**\n`;
          aiResponse += `*Root Cause:* ${inc.root_cause}\n`;
          aiResponse += `*Outcome:* ${inc.outcome}\n\n`;
          citedSources.push(inc.source_documents);
        }

        if (matches.length > 0) {
          const rag = matches[0];
          aiResponse += `**Engineering Analysis:**\n`;
          aiResponse += `*Context:* ${rag.formation_context}\n`;
          aiResponse += `*Telemetry Signatures:* ${rag.telemetry_signals.join(', ')}\n`;
          aiResponse += `*Crucial Lesson:* ${rag.lesson_learned}\n`;
          if (rag.source) citedSources.push(rag.source);
        }
      } else {
        // Generic fallback for simulation
        aiResponse = `Based on global drilling data, "${userQ}" requires careful attention to mud weights and torque/drag analysis. I recommend reviewing the latest Daily Reports for active sites that might be encountering similar parameters.`;
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: aiResponse,
        sources: citedSources.length > 0 ? [...new Set(citedSources)] : null
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
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
                <div className={`rounded-lg p-4 text-sm max-w-[80%] ${m.role === 'user' ? 'bg-brandBlue/10 border border-brandBlue/30 text-right' : 'bg-bgPanel border border-borderC'}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  
                  {m.sources && (
                    <div className="mt-4 pt-3 border-t border-borderC">
                      <p className="text-[10px] uppercase tracking-wide text-textMuted mb-2">Sources Cited</p>
                      {m.sources.map((src, idx) => (
                        <div key={idx} className="bg-bgMain border border-borderC px-3 py-2 rounded text-xs text-textMuted mb-1 flex items-center gap-2">
                          <FileText size={12} className="text-brandBlue"/>
                          {src}
                        </div>
                      ))}
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
                  <span className="text-textMuted">Querying vector database...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-bgPanel border-t border-borderC space-y-3">
            <div className="flex gap-2 text-xs overflow-x-auto pb-1 shrink-0">
              <button 
                onClick={() => setQuery("Analyze wellbore instability risk for Assam-07")}
                className="px-2.5 py-1 bg-bgCard hover:bg-brandBlue/20 text-brandBlue border border-brandBlue/30 rounded-full transition-colors whitespace-nowrap cursor-pointer"
              >
                ⚡ Assam-07 Risk
              </button>
              <button 
                onClick={() => setQuery("What were the root causes of the Macondo Blowout?")}
                className="px-2.5 py-1 bg-bgCard hover:bg-accentRed/20 text-accentRed border border-accentRed/30 rounded-full transition-colors whitespace-nowrap cursor-pointer"
              >
                💥 Macondo Blowout
              </button>
              <button 
                onClick={() => setQuery("List DGH and OIL canonical source catalogs")}
                className="px-2.5 py-1 bg-bgCard hover:bg-accentYellow/20 text-accentYellow border border-accentYellow/30 rounded-full transition-colors whitespace-nowrap cursor-pointer"
              >
                📜 Canonical Sources
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
                <span className="flex items-center gap-2 text-textMuted"><Search size={16}/> Engine</span>
                <span className="font-bold text-[10px] uppercase bg-brandBlue/20 text-brandBlue border border-brandBlue/30 px-2 py-0.5 rounded">Client-Side Search</span>
              </div>
            </div>
          </div>

          <div className="bg-bgCard rounded-xl border border-borderC p-6 flex-1">
            <h3 className="font-semibold mb-4 border-b border-borderC pb-2">Indexed Sources</h3>
            <div className="space-y-2 overflow-y-auto max-h-[250px] pr-2">
              {SOURCES.map((doc, i) => (
                <a key={i} href={doc.source_url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 hover:bg-bgPanel rounded transition-colors group">
                  <span className="text-xs text-textMuted truncate max-w-[200px] group-hover:text-textMain">{doc.document_title}</span>
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
