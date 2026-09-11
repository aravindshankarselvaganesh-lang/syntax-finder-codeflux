import React, { useState } from 'react';
import { FileText, Download, Search, Database, Plus, X, CheckCircle2 } from 'lucide-react';

const INITIAL_REPORTS = [
  { id: 1, name: 'Assam_Tripura_Rajasthan_Simplified_Risk_Report.pdf', size: '1.2 MB', date: '10 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { id: 2, name: 'Failed_Oil_Drilling_Cases_Assam_Gujarat.pdf', size: '3.4 MB', date: '08 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { id: 3, name: 'Mevad_Field_Operations_Report.pdf', size: '850 KB', date: '05 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { id: 4, name: 'Nandej_Field_Status_Presentation.pdf', size: '4.1 MB', date: '01 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { id: 5, name: 'oil limited 3rd onshore.pdf', size: '2.2 MB', date: '28 Aug 2026', type: 'PDF', status: 'Indexed in Vector DB' },
];

export default function Reports() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newReportName, setNewReportName] = useState('');
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState('');

  const filteredReports = reports.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newReportName) return;
    const newDoc = {
      id: Date.now(),
      name: newReportName.endsWith('.pdf') ? newReportName : `${newReportName}.pdf`,
      size: '1.8 MB',
      date: 'Just now',
      type: 'PDF',
      status: 'Indexed in Vector DB'
    };
    setReports([newDoc, ...reports]);
    setShowUploadModal(false);
    setNewReportName('');
  };

  const triggerDownload = (reportName) => {
    setDownloadSuccessMsg(`Downloading "${reportName}"...`);
    setTimeout(() => {
      setDownloadSuccessMsg('');
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Database className="text-brandBlue"/> Document Repository</h2>
          <p className="text-textMuted text-sm">Manage historical drilling logs powering the RAG pipeline.</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-brandBlue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-brandBlue/20"
        >
          <Plus size={16} /> Upload Report
        </button>
      </div>

      {downloadSuccessMsg && (
        <div className="bg-accentGreen/20 border border-accentGreen/30 text-accentGreen px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 size={16}/> {downloadSuccessMsg}
        </div>
      )}

      <div className="bg-bgCard border border-borderC rounded-xl flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-borderC flex justify-between items-center bg-bgPanel">
          <div className="relative w-96">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search reports by filename..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-bgMain border border-borderC rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-brandBlue transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-textMuted uppercase bg-bgPanel sticky top-0 border-b border-borderC">
              <tr>
                <th className="px-6 py-4 font-medium">Document Name</th>
                <th className="px-6 py-4 font-medium">Upload Date</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">AI Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderC">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <FileText size={16} className="text-brandBlue"/>
                    {report.name}
                  </td>
                  <td className="px-6 py-4 text-textMuted">{report.date}</td>
                  <td className="px-6 py-4 text-textMuted">{report.size}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-brandBlue/10 text-brandBlue border border-brandBlue/20 text-xs font-semibold">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => triggerDownload(report.name)}
                      className="p-2 rounded hover:bg-brandBlue/20 text-textMuted hover:text-brandBlue transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-textMuted">
                    No documents match "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleUpload} className="bg-bgCard border border-borderC rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 p-6">
            <div className="flex justify-between items-center mb-4 border-b border-borderC pb-3">
              <h3 className="font-bold text-xl">Upload Document to RAG Pipeline</h3>
              <button type="button" onClick={() => setShowUploadModal(false)} className="text-textMuted hover:text-white"><X size={18}/></button>
            </div>
            <div className="space-y-4 mb-6 text-sm">
              <div>
                <label className="block text-xs font-medium text-textMuted mb-1">Document Title / File Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Naga_Thrust_Geomechanics_Analysis.pdf" 
                  value={newReportName} 
                  onChange={e => setNewReportName(e.target.value)}
                  className="w-full bg-bgPanel border border-borderC rounded-lg p-2.5 text-sm focus:outline-none focus:border-brandBlue" 
                />
              </div>
              <div className="border-2 border-dashed border-borderC hover:border-brandBlue rounded-xl p-8 text-center transition-colors cursor-pointer bg-bgPanel">
                <FileText className="mx-auto text-brandBlue mb-2" size={32} />
                <p className="text-xs text-textMuted">Click or drag PDF/CSV files to simulate ingestion.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 border border-borderC rounded-lg text-sm text-textMuted hover:text-white">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 bg-brandBlue hover:bg-blue-600 text-white font-bold rounded-lg text-sm transition-colors">Upload & Ingest</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
