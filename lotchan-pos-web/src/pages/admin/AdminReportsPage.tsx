import { Link } from 'react-router-dom';
import './AdminPage.css';

export const AdminReportsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">Generated Reports</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Access and export system data</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-[#aec8f0] text-sm hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="admin-glass-panel p-12 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
        <span className="material-symbols-outlined text-6xl text-[#aec8f0]/50">description</span>
        <h2 className="text-2xl font-semibold text-[#d2e4ff]">Report Generator Idle</h2>
        <p className="text-[#7892b7] max-w-md">No reports have been generated recently. This module is undergoing an upgrade to support advanced PDF and Excel exports.</p>
        <button className="admin-signature-gradient text-[#153152] font-semibold px-6 py-2 rounded-lg mt-4 cursor-not-allowed opacity-50">
          Generate New Report
        </button>
      </div>
    </div>
  );
};
