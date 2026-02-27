
import React, { useState } from 'react';
import { 
  Library as LibraryIcon, 
  GraduationCap, 
  ChevronLeft, 
  FileSearch,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CASE_STUDIES } from '../constants';
import { CaseStudy } from '../types';

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'daily'>('books');
  const [selectedBook, setSelectedBook] = useState<CaseStudy | null>(null);

  const handleOpenSource = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (selectedBook) {
    return (
      <div className="fixed inset-0 lg:ml-64 bg-[#0a0e17] z-[60] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="h-16 px-6 lg:px-12 flex items-center justify-between border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <button onClick={() => setSelectedBook(null)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold">
            <ChevronLeft size={20} /> Back to Library
          </button>
          <div className="flex items-center gap-3">
            {selectedBook.sourceUrl && (
              <button 
                onClick={(e) => handleOpenSource(e, selectedBook.sourceUrl)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                <ExternalLink size={16} /> Read Full Case Record
              </button>
            )}
          </div>
        </div>

        <div className={`${selectedBook.color} p-8 lg:p-20 shadow-lg relative overflow-hidden flex flex-col items-center justify-center text-center`}>
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[10px] font-black text-white/50 tracking-[0.4em] uppercase mb-4 block">{selectedBook.category}</span>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-2xl">{selectedBook.title}</h1>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 pointer-events-none" />
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-16 bg-[#0a0e17]">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
            <div className="lg:col-span-7 space-y-10">
               <div className="space-y-4">
                  <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FileSearch size={16} /> Investigative Chronology
                  </h3>
                  <p className="text-slate-300 text-lg font-medium leading-relaxed italic border-l-4 border-blue-600/30 pl-6">
                    "{selectedBook.description}"
                  </p>
               </div>

               <div className="space-y-6">
                  <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ShieldCheck size={16} /> Key Forensic Breakthroughs
                  </h3>
                  <div className="space-y-4">
                    {selectedBook.findings.map((finding, idx) => (
                      <div key={idx} className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800/50 flex items-start gap-5 hover:border-blue-500/20 transition-all">
                        <div className="w-10 h-10 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 font-black text-xs border border-blue-500/10">{idx + 1}</div>
                        <p className="text-slate-200 text-base leading-relaxed">{finding}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
               <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-6 sticky top-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Archive Details</p>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">Case Summary</h4>
                  </div>
                  <div className="space-y-4">
                     <div className="flex flex-wrap gap-2">
                        {selectedBook.techniquesUsed.map(t => (
                           <span key={t} className="px-3 py-1.5 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl text-[10px] font-bold uppercase tracking-wider">{t}</span>
                        ))}
                     </div>
                     <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Historical Verdict</p>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed">{selectedBook.outcome}</p>
                     </div>
                  </div>
                  {selectedBook.sourceUrl && (
                    <button 
                       onClick={(e) => handleOpenSource(e, selectedBook.sourceUrl)}
                       className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3"
                    >
                       Open Full Reference <ArrowRight size={18} />
                    </button>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-8 border-b border-slate-800 pb-0">
        <button onClick={() => setActiveTab('books')} className={`flex items-center gap-2 pb-4 px-1 text-sm font-bold transition-all relative ${activeTab === 'books' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
          <LibraryIcon size={18} /> Historical Case Archives
          {activeTab === 'books' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />}
        </button>
        <button onClick={() => setActiveTab('daily')} className={`flex items-center gap-2 pb-4 px-1 text-sm font-bold transition-all relative ${activeTab === 'daily' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
          <GraduationCap size={18} /> AI Forensic Reports
          {activeTab === 'daily' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />}
        </button>
      </div>

      {activeTab === 'books' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pt-4">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="group cursor-pointer perspective-1000" onClick={() => setSelectedBook(study)}>
              <div className={`aspect-[3/4.5] rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-700 group-hover:rotate-y-12 group-hover:-translate-y-4 ${study.color} ring-1 ring-white/10`}>
                <div className="absolute left-0 inset-y-0 w-6 bg-black/20 border-r border-white/5 z-20"></div>
                <div className="p-8 pl-10 h-full flex flex-col justify-between relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="text-white/40" size={14} />
                       <span className="text-[9px] font-black tracking-[0.3em] text-white/50 uppercase">{study.category}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-tight drop-shadow-lg">{study.title}</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-5 border border-white/5 space-y-2">
                      <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest flex items-center gap-2">
                        <FileSearch size={12} /> Forensic Insight
                      </p>
                      <p className="text-xs text-white/90 font-medium leading-relaxed italic line-clamp-2">"{study.subtext}"</p>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                       <div className="flex items-center gap-2">
                          <BookOpen size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Read More</span>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-50">
           <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
              <Clock size={32} />
           </div>
           <p className="text-slate-400 font-medium italic">Synchronizing Daily AI Forensic Reports...</p>
        </div>
      )}

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-12 { transform: rotateY(-12deg); }
      `}</style>
    </div>
  );
};

export default Library;
