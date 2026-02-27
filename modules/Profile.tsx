
import React from 'react';
import { 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  ChevronRight, 
  Award, 
  UserCircle,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { UserSession } from '../types';

interface ProfileProps {
  session: UserSession;
  onLogout: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Profile: React.FC<ProfileProps> = ({ session, onLogout, toggleTheme, isDarkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-xl">
            <UserCircle size={60} className="text-white" />
          </div>
          <div className="absolute bottom-0 right-0 bg-emerald-500 w-6 h-6 rounded-full border-4 border-slate-900"></div>
        </div>
        <h2 className="text-2xl font-bold mt-4">{session.username}</h2>
        <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-1">Certified Investigator</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center">
          <Award className="text-amber-500 mb-2" size={24} />
          <span className="text-xl font-bold">{session.quizScores.length}</span>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Quizzes Taken</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center">
          <ShieldAlert className="text-blue-500 mb-2" size={24} />
          <span className="text-xl font-bold">Junior</span>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Rank Level</span>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">App Settings</h3>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800/50">
          <button onClick={toggleTheme} className="w-full p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors first:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-500'}`}>
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <span className="text-sm font-medium">Appearance</span>
            </div>
            <span className="text-xs text-slate-500">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <Settings size={18} />
              </div>
              <span className="text-sm font-medium">Preferences</span>
            </div>
            <ChevronRight size={16} className="text-slate-600" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <FileText size={18} />
              </div>
              <span className="text-sm font-medium">Account Data</span>
            </div>
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full p-4 bg-rose-500/10 border border-rose-500/30 text-rose-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all group"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        Log Out Session
      </button>

      <div className="text-center pb-6">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">ForeNova v1.0.4 PRO</p>
      </div>
    </div>
  );
};

export default Profile;
