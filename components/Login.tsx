
import React, { useState } from 'react';
import { Fingerprint, Shield, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
  darkMode: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, darkMode }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 rotate-3 shadow-xl shadow-blue-500/30">
            <Fingerprint size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter">FORENOVA</h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Forensic Intelligence Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Investigator Username
            </label>
            <input
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 focus:border-blue-500' 
                  : 'bg-slate-100 border-slate-200 focus:border-blue-500'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            <span>Initialize Access</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Shield size={14} className="text-blue-500" />
          <span className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Secure Forensic Protocol Enabled</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
