
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FlaskConical, 
  PenTool, 
  MessageSquare, 
  ShieldCheck, 
  Moon, 
  Sun, 
  GraduationCap,
  LogOut,
  Library as LibraryIcon,
  User,
  Briefcase
} from 'lucide-react';
import { UserSession, TabType } from './types';
import Login from './components/Login';
import WelcomeAnimation from './components/WelcomeAnimation';
import Dashboard from './modules/Dashboard';
import EvidenceSimulator from './modules/EvidenceSimulator';
import LabInfo from './modules/LabInfo';
import SketchTool from './modules/SketchTool';
import ExamSection from './modules/ExamSection';
import Profile from './modules/Profile';
import ExpertChat from './modules/ExpertChat';
import Library from './modules/Library';
import CasePractice from './modules/CasePractice';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('forenova_session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
    const savedTheme = localStorage.getItem('forenova_theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  const handleLogin = (username: string) => {
    const newSession: UserSession = {
      username,
      isLoggedIn: true,
      progress: 25,
      quizScores: [],
      joinedAt: new Date().toISOString()
    };
    localStorage.setItem('forenova_session', JSON.stringify(newSession));
    setSession(newSession);
    setShowWelcome(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('forenova_session');
    setSession(null);
    setActiveTab('home');
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('forenova_theme', newMode ? 'dark' : 'light');
  };

  if (!session) {
    return <Login onLogin={handleLogin} darkMode={isDarkMode} />;
  }

  if (showWelcome) {
    return <WelcomeAnimation username={session.username} onComplete={() => setShowWelcome(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard session={session} setActiveTab={setActiveTab} />;
      case 'evidence': return <EvidenceSimulator />;
      case 'lab': return <LabInfo />;
      case 'sketch': return <SketchTool />;
      case 'library': return <Library />;
      case 'exams': return <ExamSection session={session} setSession={setSession} />;
      case 'profile': return <Profile session={session} onLogout={handleLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      case 'expert': return <ExpertChat />;
      case 'cases': return <CasePractice />;
      default: return <Dashboard session={session} setActiveTab={setActiveTab} />;
    }
  };

  const NavItem = ({ icon: Icon, label, tab }: { icon: any, label: string, tab: TabType }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg transition-all ${
        activeTab === tab 
          ? 'bg-blue-600/10 text-blue-500 border-r-4 border-blue-500 rounded-r-none' 
          : isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-800 hover:bg-black/5'
      }`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0e17] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Professional Sidebar Navigation */}
      <aside className={`w-64 flex flex-col fixed inset-y-0 z-50 border-r ${isDarkMode ? 'bg-[#0d121f] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-blue-500">FORENOVA</h1>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          <NavItem icon={Home} label="Home" tab="home" />
          <NavItem icon={Briefcase} label="Cases" tab="cases" />
          <NavItem icon={ShieldCheck} label="Evidence" tab="evidence" />
          <NavItem icon={PenTool} label="Sketch" tab="sketch" />
          <NavItem icon={FlaskConical} label="Lab" tab="lab" />
          <NavItem icon={LibraryIcon} label="Library" tab="library" />
          <NavItem icon={GraduationCap} label="Exams" tab="exams" />
        </nav>

        <div className={`mt-auto p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[120px]">{session.username}</p>
              <p className="text-[10px] text-slate-500 uppercase">Forensic Trainee</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-rose-500 hover:text-rose-400 text-sm font-medium px-2 py-2 w-full rounded-lg hover:bg-rose-500/5 transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-64 min-h-screen">
        <header className={`px-8 py-4 flex justify-end items-center border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'}`}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <main className="p-8 animate-in fade-in duration-500">
          {renderContent()}
        </main>
      </div>

      <button 
        onClick={() => setActiveTab('expert')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform z-[100]"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default App;
