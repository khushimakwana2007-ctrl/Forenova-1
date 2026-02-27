
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Download, 
  ChevronRight, 
  Clock,
  BookOpenCheck,
  Trophy,
  ExternalLink
} from 'lucide-react';
import { EXAM_SYLLABUS } from '../constants';
import QuizEngine from './QuizEngine';
import { UserSession } from '../types';

interface ExamSectionProps {
  session: UserSession;
  setSession: (session: UserSession) => void;
}

const ExamSection: React.FC<ExamSectionProps> = ({ session, setSession }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (showQuiz) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setShowQuiz(false)}
          className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-2 mb-4"
        >
          ← Back to Exams
        </button>
        <QuizEngine session={session} setSession={setSession} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <FileText className="text-blue-500" />
        Exam Preparation
      </h2>

      {/* Quick Quiz / Mock Test Option */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => setShowQuiz(true)}
          className="bg-indigo-600 hover:bg-indigo-700 p-6 rounded-2xl text-white shadow-xl transition-all group flex flex-col items-start gap-3"
        >
          <div className="p-3 bg-white/20 rounded-xl">
            <Trophy size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">Mock Quiz Series</h3>
            <p className="text-xs text-indigo-100 opacity-80">Test your knowledge with 100+ MCQs</p>
          </div>
        </button>
        
        <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-xl flex flex-col items-start gap-3">
          <div className="p-3 bg-white/20 rounded-xl">
            <BookOpenCheck size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">Daily Study Plan</h3>
            <p className="text-xs text-emerald-100 opacity-80">Personalized AI roadmap for exams</p>
          </div>
        </div>
      </div>

      {/* Upcoming Exams Notification */}
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="text-rose-500" size={20} />
          <h3 className="font-bold text-sm text-rose-500">Critical Alerts</h3>
        </div>
        <button 
          onClick={() => openExternalLink('https://ugcnet.nta.ac.in/')}
          className="w-full flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-rose-500/20 hover:border-rose-500/50 transition-all text-left group"
        >
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-rose-400">UGC NET Forensic Science - June 2025</h4>
            <p className="text-[10px] text-slate-400">Application Portal Opening Soon (Official Website)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">View Notification</span>
            <ExternalLink size={14} className="text-rose-400" />
          </div>
        </button>
      </div>

      {/* Syllabus Overview */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h3 className="text-sm font-bold">Standard Syllabus</h3>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{EXAM_SYLLABUS.length} Core Modules</span>
        </div>
        <div className="divide-y divide-slate-800/50">
          {EXAM_SYLLABUS.map((item, idx) => (
            <div key={idx} className="p-3 px-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500 font-bold">0{idx + 1}</span>
                <span className="text-xs font-medium text-slate-300">{item}</span>
              </div>
              <ChevronRight size={14} className="text-slate-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Previous Year Papers */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider px-1 flex items-center gap-2">
          <Download size={16} className="text-blue-500" />
          Previous Year Papers (Download)
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { year: 2024, url: 'https://ugcnet.nta.ac.in/archive/' },
            { year: 2023, url: 'https://www.nta.ac.in/Download/QuestionPaper' },
            { year: 2022, url: 'https://www.shiksha.com/science/ugc-net-exam-question-papers' },
            { year: 2021, url: 'https://exam-mate.com/' }
          ].map(item => (
            <div 
              key={item.year} 
              onClick={() => openExternalLink(item.url)}
              className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Forensic Science Paper II</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">UGC NET {item.year} | Official Archive</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 group-hover:text-blue-500 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-widest">Get PDF</span>
                <Download size={18} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-600 italic px-2">Note: Links lead to the official NTA download portals and trusted educational repositories.</p>
      </div>
    </div>
  );
};

export default ExamSection;
