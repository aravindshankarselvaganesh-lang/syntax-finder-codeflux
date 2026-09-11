import React from 'react';
import { BookOpen, MapPin, Activity, BrainCircuit, Database, FileText } from 'lucide-react';

export default function Manual() {
  return (
    <div className="h-full flex flex-col overflow-y-auto pb-8 space-y-8 pr-4">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <BookOpen className="text-brandBlue" size={32}/> 
          User Manual
        </h2>
        <p className="text-textMuted mt-2 max-w-3xl leading-relaxed">
          Welcome to the Global Energy Operations Intelligence Platform. This manual explains the core modules, navigation, and features available to monitor drilling operations, predict risks, and analyze historical intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Live Operations */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-brandBlue/10 flex items-center justify-center text-brandBlue">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">1. Live Operations</h3>
              <p className="text-sm text-textMuted">Geospatial Dashboard</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Interactive Map:</strong> View all global drilling assets. The map has two view modes (Map / Satellite).</p>
            <p><strong>Custom Geofencing:</strong> Click anywhere on the map to drop a target coordinate. Use the "Analysis Radius" slider in the top left to expand the search radius from 10km up to 2000km.</p>
            <p><strong>Site Details & History:</strong> Clicking any active pin opens the Site Details card on the right. Navigate to the "History" tab to view a detailed, scrollable timeline of well events (Spud Date, Casing Sets, Anomalies).</p>
          </div>
        </div>

        {/* Global Assets */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-accentGreen/10 flex items-center justify-center text-accentGreen">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">2. Global Assets</h3>
              <p className="text-sm text-textMuted">Site Portfolio & Search</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Search & Filter:</strong> Use the search bar to locate specific wellbores (e.g., type "Assam" or "Macondo").</p>
            <p><strong>Status Indicators:</strong> Wells are color-coded based on their live risk status (Green = Active, Yellow = Warning, Red = High Risk/Suspended).</p>
            <p><strong>Data Grid:</strong> A comprehensive table layout showing Depth, Target Formations, and the Root Cause Analysis for ongoing issues.</p>
          </div>
        </div>

        {/* AI Predictor */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-accentYellow/10 flex items-center justify-center text-accentYellow">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">3. AI Predictor Copilot</h3>
              <p className="text-sm text-textMuted">Interactive Knowledge Assistant</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>RAG Engine:</strong> The Copilot is connected to a local vector database of historical drilling failures.</p>
            <p><strong>Chat Interface:</strong> Type any query into the prompt (e.g., "What caused the pressure anomalies at Gujarat-12?").</p>
            <p><strong>Citations:</strong> When the AI provides an answer based on historical intelligence, it will attach source badges indicating exactly which PDF or incident report the data originated from.</p>
          </div>
        </div>

        {/* Intelligence Base */}
        <div className="bg-bgCard rounded-xl border border-borderC p-6 flex flex-col shadow-lg">
          <div className="flex items-center gap-3 border-b border-borderC pb-4 mb-4">
            <div className="w-10 h-10 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">4. Intelligence Base</h3>
              <p className="text-sm text-textMuted">Raw Research & Taxonomies</p>
            </div>
          </div>
          <div className="text-sm text-textMuted space-y-3 leading-relaxed flex-1">
            <p><strong>Research Report:</strong> A natively rendered Markdown reader containing the full engineering analysis and research context of the platform.</p>
            <p><strong>Major Incidents:</strong> A table detailing global historical events (Macondo, Montara, etc.).</p>
            <p><strong>Failure Taxonomy:</strong> A structured categorization of wellbore failures, definitions, and their telemetry indicators.</p>
            <p><strong>RAG Knowledge Base:</strong> The raw underlying vectors that the AI Copilot uses to formulate its responses.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
