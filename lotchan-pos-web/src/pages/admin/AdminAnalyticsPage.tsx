import { Link } from 'react-router-dom';
import './AdminPage.css';

export const AdminAnalyticsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-tight font-bold text-[#d2e4ff] uppercase">Analytics</h1>
          <p className="text-[#7892b7] text-[14px] font-light">Deep dive into performance metrics and trends</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-[#aec8f0] text-sm hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="admin-glass-panel p-12 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
        <span className="material-symbols-outlined text-6xl text-[#aec8f0]/50">monitoring</span>
        <h2 className="text-2xl font-semibold text-[#d2e4ff]">Analytics Engine Initializing</h2>
        <p className="text-[#7892b7] max-w-md">The comprehensive analytics dashboard is currently under construction. Check back later for detailed branch and product performance reports.</p>
      </div>
    </div>
  );
};
