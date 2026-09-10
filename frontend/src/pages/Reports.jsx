import React from 'react';
import { FileText, Download, Search, Database } from 'lucide-react';

const REPORTS = [
  { name: 'Assam_Tripura_Rajasthan_Simplified_Risk_Report.pdf', size: '1.2 MB', date: '10 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { name: 'Failed_Oil_Drilling_Cases_Assam_Gujarat.pdf', size: '3.4 MB', date: '08 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { name: 'Mevad_Field_Operations_Report.pdf', size: '850 KB', date: '05 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { name: 'Nandej_Field_Status_Presentation.pdf', size: '4.1 MB', date: '01 Sep 2026', type: 'PDF', status: 'Indexed in Vector DB' },
  { name: 'oil limited 3rd onshore.pdf', size: '2.2 MB', date: '28 Aug 2026', type: 'PDF', status: 'Indexed in Vector DB' },
];

export default function Reports() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Database className="text-brandBlue"/> Document Repository</h2>
          <p className="text-textMuted text-sm">Manage historical drilling logs powering the RAG pipeline.</p>
        </div>
        <button className="bg-brandBlue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Upload Report
        </button>
      </div>

      <div className="bg-bgCard border border-borderC rounded-xl flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-borderC flex justify-between items-center bg-bgPanel">
          <div className="relative w-96">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search reports..." 
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
              {REPORTS.map((report, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <FileText size={16} className="text-textMuted"/>
                    {report.name}
                  </td>
                  <td className="px-6 py-4 text-textMuted">{report.date}</td>
                  <td className="px-6 py-4 text-textMuted">{report.size}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-brandBlue/10 text-brandBlue border border-brandBlue/20 text-xs">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded hover:bg-bgPanel text-textMuted hover:text-textMain transition-colors">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
