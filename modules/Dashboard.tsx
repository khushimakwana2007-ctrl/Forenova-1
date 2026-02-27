
import React from 'react';
import { 
  Trophy, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  BookOpen, 
  FileCheck,
  Search,
  PenTool,
  Briefcase
} from 'lucide-react';
import { UserSession, TabType } from '../types';

interface DashboardProps {
  session: UserSession;
  setActiveTab: (tab: TabType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ session, setActiveTab }) => {
  return (
    <div className="space-y-6 pb-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-500/20">
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium">Investigator Active</p>
          <h2 className="text-2xl font-bold mt-1">Hello, {session.username}</h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>Learning Progress</span>
                <span>{session.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${session.progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Trophy size={100} />
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Quick Modules</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <QuickCard 
            icon={Search} 
            title="Evidence" 
            desc="Interactive Sim" 
            color="bg-amber-500" 
            onClick={() => setActiveTab('evidence')}
          />
          <QuickCard 
            icon={Briefcase} 
            title="Case Files" 
            desc="Practice Cases" 
            color="bg-indigo-500" 
            onClick={() => setActiveTab('cases')}
          />
          <QuickCard 
            icon={PenTool} 
            title="3D Sketch" 
            desc="Scene Design" 
            color="bg-emerald-500" 
            onClick={() => setActiveTab('sketch')}
          />
          <QuickCard 
            icon={Zap} 
            title="Quick Quiz" 
            desc="Test Knowledge" 
            color="bg-purple-500" 
            onClick={() => setActiveTab('library')}
          />
          <QuickCard 
            icon={FileCheck} 
            title="Exams" 
            desc="Papers & More" 
            color="bg-rose-500" 
            onClick={() => setActiveTab('exams')}
          />
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Clock size={16} className="text-blue-400" />
            Alerts & Notifications
          </h3>
          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">Live</span>
        </div>
        <div className="space-y-3">
          <NotificationItem 
            title="UGC NET Forensic Exam" 
            time="Upcoming: 15 Oct 2024" 
            tag="Exam"
          />
          <NotificationItem 
            title="New Case Study: DNA Profiling" 
            time="Added 2 hours ago" 
            tag="Content"
          />
          <NotificationItem 
            title="Lab Update: Toxicology Techniques" 
            time="Check new modules" 
            tag="Update"
          />
        </div>
      </div>

      {/* Knowledge Base Teaser */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <BookOpen size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Forensic Knowledge Base</h4>
              <p className="text-xs text-slate-400">200+ Case studies & Techniques</p>
            </div>
          </div>
          <button onClick={() => setActiveTab('lab')} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickCard = ({ icon: Icon, title, desc, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex flex-col items-start gap-3 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all text-left group"
  >
    <div className={`p-2 rounded-xl ${color} text-white shadow-lg`}>
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors">{title}</h4>
      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{desc}</p>
    </div>
  </button>
);

const NotificationItem = ({ title, time, tag }: any) => (
  <div className="flex items-start gap-3 py-2 border-b border-slate-800/50 last:border-0">
    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h5 className="text-xs font-semibold">{title}</h5>
        <span className="text-[9px] uppercase tracking-tighter opacity-50">{tag}</span>
      </div>
      <p className="text-[10px] text-slate-400 mt-0.5">{time}</p>
    </div>
  </div>
);

export default Dashboard;
