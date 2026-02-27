
import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Search, 
  Microscope, 
  UserPlus, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight,
  Fingerprint,
  Camera,
  Activity,
  AlertCircle,
  Gavel,
  Briefcase,
  ChevronLeft,
  Clock,
  Dna,
  Lock,
  Ghost,
  User,
  Info,
  PlayCircle,
  X,
  Target,
  ExternalLink
} from 'lucide-react';
import { PRACTICE_CASES } from '../constants';
import { CaseSimulation } from '../types';

const CasePractice: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseSimulation | null>(null);
  const [step, setStep] = useState<'profile' | 'briefing' | 'investigation' | 'lab' | 'verdict'>('profile');
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [analyzedClues, setAnalyzedClues] = useState<string[]>([]);
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const resetInvestigation = () => {
    setSelectedCase(null);
    setStep('profile');
    setFoundClues([]);
    setAnalyzedClues([]);
    setSelectedSuspect(null);
    setShowResult(null);
    setShowDemo(false);
  };

  const startCase = (c: CaseSimulation) => {
    setSelectedCase(c);
    setStep('profile');
  };

  const toggleClue = (id: string) => {
    if (foundClues.includes(id)) {
      setFoundClues(prev => prev.filter(c => c !== id));
    } else {
      setFoundClues(prev => [...prev, id]);
    }
  };

  const runAnalysis = (id: string) => {
    if (!analyzedClues.includes(id)) {
      setAnalyzedClues(prev => [...prev, id]);
    }
  };

  const checkVerdict = () => {
    const suspect = selectedCase?.suspects.find(s => s.id === selectedSuspect);
    setShowResult(suspect?.isGuilty || false);
  };

  const handleOpenReference = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!selectedCase) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Investigation Dossier</h1>
            <p className="text-slate-500 text-sm mt-1">Select an active file to begin your forensic proficiency training.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-xl border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            <ShieldAlert size={14} /> {PRACTICE_CASES.length} Active Simulations
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRACTICE_CASES.map((c) => (
            <div 
              key={c.id} 
              onClick={() => startCase(c)}
              className="group relative bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 hover:border-blue-500/40 transition-all cursor-pointer overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                {c.id === 'sim-1' ? <Ghost size={180} /> : <Lock size={180} />}
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    c.difficulty === 'Advanced' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {c.difficulty} Difficulty
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    <Clock size={12} /> ~20 MIN
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{c.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 italic">"Investigate the incident involving {c.victimInfo.name}..."</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {c.clues.slice(0, 2).map(cl => (
                    <span key={cl.id} className="px-3 py-1 bg-black/40 rounded-lg text-[9px] font-bold text-slate-500 uppercase border border-white/5">
                      {cl.labDivision.split(' ')[0]}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-black/40 rounded-lg text-[9px] font-bold text-slate-500 uppercase border border-white/5">+{c.clues.length - 2} Evidentiary Links</span>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={14} className="text-rose-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{c.location.split(',')[0]}</span>
                </div>
                <div className="flex items-center gap-4">
                  {c.externalReference && (
                    <button 
                      onClick={(e) => handleOpenReference(e, c.externalReference)}
                      className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-white/5"
                    >
                      <ExternalLink size={16} />
                    </button>
                  )}
                  <button className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    Access File <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-6 duration-500 relative">
      
      {/* Demo Overlay */}
      {showDemo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1a1c2e] border border-blue-500/30 w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowDemo(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-blue-600 text-white rounded-2xl">
                <PlayCircle size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight uppercase">Solution Walkthrough</h3>
                <p className="text-xs text-blue-400 font-black uppercase tracking-widest">Golden Path for {selectedCase.title}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {selectedCase.walkthroughSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all">
                  <span className="text-xs font-black text-blue-500 w-6 mt-1">0{i+1}</span>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setShowDemo(false)} className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
              Understood, Start Training
            </button>
          </div>
        </div>
      )}

      {/* Header with Step Navigation */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <button onClick={resetInvestigation} className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 hover:text-blue-300 transition-colors">
            <ChevronLeft size={14} /> Return to Archives
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Simulation Active</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{selectedCase.difficulty} Level</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight uppercase">{selectedCase.title}</h1>
        </div>
        <div className="flex gap-4 relative z-10">
          {selectedCase.externalReference && (
            <button 
              onClick={(e) => handleOpenReference(e, selectedCase.externalReference)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 border border-blue-600/30 text-blue-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/20 transition-all"
            >
              <ExternalLink size={18} /> Official Manual
            </button>
          )}
          <button onClick={() => setShowDemo(true)} className="flex items-center gap-2 px-6 py-3 bg-amber-600/10 border border-amber-600/30 text-amber-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600/20 transition-all">
            <PlayCircle size={18} /> View Demo
          </button>
        </div>
        <Briefcase className="absolute right-[-20px] top-[-20px] opacity-5 text-white" size={200} />
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 w-fit">
        <button onClick={() => setStep('profile')} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${step === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Case Profile</button>
        <button onClick={() => setStep('investigation')} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${step === 'investigation' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Scene Scan</button>
        <button onClick={() => setStep('lab')} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${step === 'lab' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Lab Results</button>
        <button onClick={() => setStep('verdict')} className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${step === 'verdict' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Final Verdict</button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {step === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-[#fdfaf1] border-2 border-[#e5e0d3] p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-slate-900">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5e0d3] rotate-45 translate-x-12 -translate-y-12"></div>
               <div className="absolute top-10 right-10 flex gap-1 opacity-20">
                  <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-900"></div>
               </div>

               <div className="border-b-2 border-slate-900/10 pb-8 mb-8 flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Forensic Case Profile</p>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Victim Identification File</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-rose-600 border border-rose-600/30 px-3 py-1 rounded bg-rose-600/5">Classified Material</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-slate-900 text-white rounded-lg">
                              <User size={18} />
                           </div>
                           <p className="text-xs font-black uppercase tracking-widest text-slate-500">Subject Information</p>
                        </div>
                        <div className="bg-slate-900/5 p-6 rounded-2xl space-y-3 font-mono">
                           <p className="text-sm">NAME: <span className="font-bold underline uppercase">{selectedCase.victimInfo.name}</span></p>
                           <p className="text-sm">AGE: <span className="font-bold uppercase">{selectedCase.victimInfo.age} YEARS</span></p>
                           <p className="text-sm">OCCUPATION: <span className="font-bold uppercase">{selectedCase.victimInfo.occupation}</span></p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-slate-900 text-white rounded-lg">
                              <Clock size={18} />
                           </div>
                           <p className="text-xs font-black uppercase tracking-widest text-slate-500">Incident Parameters</p>
                        </div>
                        <div className="bg-slate-900/5 p-6 rounded-2xl space-y-3 font-mono">
                           <p className="text-sm">LAST SEEN: <span className="font-bold uppercase">{selectedCase.victimInfo.estimatedTime}</span></p>
                           <p className="text-sm">CURRENT STATUS: <span className="font-bold uppercase text-rose-600">{selectedCase.victimInfo.status}</span></p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden border-2 border-slate-300 relative group grayscale hover:grayscale-0 transition-all">
                        <img 
                          src={selectedCase.id === 'sim-1' ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000" : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000"} 
                          className="w-full h-full object-cover" 
                          alt="Victim Mugshot"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">Case ID: {selectedCase.id}</span>
                        </div>
                     </div>
                     <p className="text-[10px] text-slate-400 font-medium italic text-center">Primary identification image captured during last facility badge sync.</p>
                  </div>
               </div>

               <div className="mt-12 pt-8 border-t-2 border-slate-900/10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                    <AlertCircle size={14} className="text-amber-600" /> Preliminary Briefing Notes
                  </h4>
                  <p className="text-sm leading-relaxed font-medium text-slate-700 italic border-l-4 border-slate-900/10 pl-6">
                    "{selectedCase.briefing}"
                  </p>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
               <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
                  <div className="flex items-center gap-3">
                     <Target className="text-blue-500" />
                     <h3 className="font-bold text-white uppercase tracking-tight text-lg">Mission Objectives</h3>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">Analyze the scene and secure all 4 items of high-value evidence.</p>
                     </div>
                     <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">Successfully match DNA or ballistic markers in the Lab division.</p>
                     </div>
                  </div>
                  <button onClick={() => setStep('investigation')} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2">
                    Accept Assignment <ArrowRight size={18} />
                  </button>
               </div>

               <div className="bg-amber-600/5 border border-amber-600/20 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-amber-500">
                     <Info size={16} />
                     <p className="text-[10px] font-black uppercase tracking-widest">Training Hint</p>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">"Always maintain the chain of custody. If you get stuck, use the <b>View Demo</b> feature in the top right to see the recommended investigative path."</p>
               </div>
            </div>
          </div>
        )}

        {step === 'investigation' && (
          <div className="space-y-6 animate-in slide-in-from-right-6 duration-500">
             <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex items-center gap-4">
                <AlertCircle className="text-amber-500 shrink-0" size={24} />
                <p className="text-xs text-amber-200 font-medium leading-relaxed">System Note: Collect items only once you are certain of the tool required. Incorrect tools contaminate evidence.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedCase.clues.map(clue => (
                  <div key={clue.id} className={`p-6 rounded-[2.5rem] border transition-all flex flex-col justify-between group ${foundClues.includes(clue.id) ? 'bg-blue-600/10 border-blue-500/50 shadow-2xl scale-105 z-10' : 'bg-slate-900 border-slate-800 opacity-60 hover:opacity-100'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <div className={`p-3.5 rounded-2xl transition-colors ${foundClues.includes(clue.id) ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                            {clue.name.includes('Blood') || clue.name.includes('Ledger') ? <Dna size={22} /> : clue.name.includes('Shell') || clue.name.includes('Casing') ? <Search size={22} /> : clue.name.includes('Print') ? <Fingerprint size={22} /> : <Camera size={22} />}
                         </div>
                         {foundClues.includes(clue.id) && <CheckCircle2 size={18} className="text-blue-500" />}
                      </div>
                      <h4 className="font-bold text-white text-lg tracking-tight leading-tight uppercase">{clue.name}</h4>
                      <p className="text-[11px] text-slate-500 italic leading-relaxed">{clue.description}</p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-slate-800/50">
                       <p className="text-[9px] font-black text-slate-600 uppercase mb-2 tracking-widest">Required Action</p>
                       <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/5 px-2 py-1 rounded w-fit border border-blue-400/20">{clue.requiredTool}</p>
                       <button onClick={() => toggleClue(clue.id)} className={`w-full mt-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${foundClues.includes(clue.id) ? 'bg-slate-800 text-slate-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}>
                          {foundClues.includes(clue.id) ? 'Duly Tagged' : 'Tag Item'}
                       </button>
                    </div>
                  </div>
                ))}
             </div>

             <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner">
                    <Search size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Active Scan Summary</h3>
                    <p className="text-sm text-slate-400 font-medium">Recovery Progress: {foundClues.length} / {selectedCase.clues.length} Objects Secured</p>
                  </div>
                </div>
                {foundClues.length === selectedCase.clues.length && (
                  <button onClick={() => setStep('lab')} className="w-full md:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                    Transfer to Lab Hub <Microscope size={20} />
                  </button>
                )}
             </div>
          </div>
        )}

        {step === 'lab' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {selectedCase.clues.map(clue => (
                  <div key={clue.id} className={`bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] transition-all shadow-lg ${!foundClues.includes(clue.id) ? 'opacity-30' : 'hover:border-indigo-500/30'}`}>
                    <div className="flex items-start justify-between mb-6">
                       <div className="flex items-center gap-4">
                          <div className={`p-4 rounded-2xl border shadow-inner ${analyzedClues.includes(clue.id) ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                             <Microscope size={26} />
                          </div>
                          <div>
                             <h4 className="font-bold text-white uppercase tracking-tight text-xl">{clue.labDivision}</h4>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Specimen: {clue.name}</p>
                          </div>
                       </div>
                       {analyzedClues.includes(clue.id) && <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-emerald-500/20">Analytical Match</span>}
                    </div>

                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 font-mono text-xs leading-relaxed min-h-[140px] flex flex-col justify-center relative group/log">
                       {analyzedClues.includes(clue.id) ? (
                         <div className="space-y-4">
                            <p className="text-blue-300 text-sm italic leading-relaxed">
                                {clue.id === 'c1' || clue.id === 'cl-1' ? "BALLISTICS: Striation match identified. Sample weapon Sig Sauer P226 (Owned by J. Thorne)." : ""}
                                {clue.id === 'cl-2' ? "DACTYLOSCOPY: 14 points of similarity match Julian Thorne's registered fingerprints." : ""}
                                {clue.id === 'c2' || clue.id === 'cl-3' ? "TOXICOLOGY: Sample matches forensic profile for Potassium Cyanide. High lethality index." : ""}
                                {clue.id === 'c3' ? "FINGERPRINTS: Matches database entry for Viktor Kraz. Record level 5 security risk." : ""}
                                {clue.id === 'c1' && selectedCase.id === 'sim-1' ? "BIOLOGY: DNA profile matches former employee Viktor Kraz." : ""}
                                {clue.id === 'c4' || clue.id === 'cl-4' ? "DIGITAL: Recovered deleted messages regarding illicit fund movement." : ""}
                            </p>
                            <div className="pt-3 border-t border-white/10">
                               <p className="text-[9px] font-bold text-slate-600 uppercase mb-1">Expert Insight</p>
                               <p className="text-[10px] text-emerald-500/70">{clue.scientificReasoning}</p>
                            </div>
                         </div>
                       ) : (
                         <div className="text-center space-y-2">
                           <Activity size={24} className="mx-auto text-slate-700 animate-pulse" />
                           <p className="text-slate-600 italic tracking-wide uppercase font-bold text-[9px]">Awaiting Signal Input...</p>
                         </div>
                       )}
                    </div>

                    <button 
                      disabled={!foundClues.includes(clue.id) || analyzedClues.includes(clue.id)}
                      onClick={() => runAnalysis(clue.id)}
                      className="w-full mt-6 py-4 bg-slate-800 hover:bg-indigo-600 disabled:opacity-20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg active:scale-95"
                    >
                      {analyzedClues.includes(clue.id) ? 'Analysis Logged' : 'Run Instrumentation'}
                    </button>
                  </div>
                ))}
             </div>

             {analyzedClues.length === selectedCase.clues.length && (
               <div className="bg-gradient-to-r from-indigo-700 to-blue-800 p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
                  <div className="text-white space-y-2">
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Case Solved - Scientific Verification</h3>
                    <p className="opacity-90 font-medium text-indigo-100">All evidence points to a definitive suspect. The prosecutor is ready for the verdict.</p>
                  </div>
                  <button onClick={() => setStep('verdict')} className="px-12 py-5 bg-white text-indigo-900 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95">
                    Present to Jury
                  </button>
               </div>
             )}
          </div>
        )}

        {step === 'verdict' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="text-center space-y-4">
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Identify the Perpetrator</h3>
                <p className="text-slate-500 max-w-xl mx-auto text-sm font-medium">Select a suspect to issue an arrest warrant. Review their links carefully.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {selectedCase.suspects.map(suspect => (
                  <button 
                    key={suspect.id}
                    onClick={() => { setSelectedSuspect(suspect.id); setShowResult(null); }}
                    className={`bg-slate-900 border-2 rounded-[3rem] p-10 text-left transition-all relative group overflow-hidden ${selectedSuspect === suspect.id ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-blue-500/5' : 'border-slate-800 hover:border-slate-700'}`}
                  >
                    <div className="w-24 h-24 bg-slate-800 rounded-[2rem] flex items-center justify-center mb-8 ring-8 ring-slate-800/50 group-hover:bg-slate-700 transition-colors">
                       <UserPlus size={40} className={selectedSuspect === suspect.id ? 'text-blue-400' : 'text-slate-600'} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-2xl font-bold text-white uppercase tracking-tight">{suspect.name}</h4>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{suspect.role}</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Alleged Motive</p>
                       <p className="text-xs text-slate-400 italic font-medium leading-relaxed">"{suspect.motive}"</p>
                    </div>
                    {selectedSuspect === suspect.id && <div className="absolute top-4 right-4 text-blue-500"><CheckCircle2 size={24} /></div>}
                  </button>
                ))}
             </div>

             {selectedSuspect && (
               <div className="flex flex-col items-center space-y-8 pt-10">
                  <button onClick={checkVerdict} className="px-16 py-7 bg-rose-600 hover:bg-rose-500 text-white rounded-[2rem] font-black text-2xl uppercase tracking-[0.3em] shadow-2xl shadow-rose-500/30 transition-all flex items-center gap-4 active:scale-95">
                    <Gavel size={32} /> Execute Warrant
                  </button>

                  {showResult !== null && (
                    <div className={`w-full max-w-4xl p-14 rounded-[4rem] border-4 animate-in zoom-in duration-500 ${showResult ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_80px_rgba(16,185,129,0.1)]' : 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-[0_0_80px_rgba(244,63,94,0.1)]'}`}>
                       <div className="flex flex-col md:flex-row items-center gap-10">
                          <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${showResult ? 'border-emerald-500 bg-emerald-500/20' : 'border-rose-500 bg-rose-500/20'}`}>
                             {showResult ? <CheckCircle2 size={64} /> : <AlertCircle size={64} />}
                          </div>
                          <div className="flex-1 text-center md:text-left space-y-4">
                             <h4 className="text-5xl font-black uppercase tracking-tighter">{showResult ? 'Conviction Secured' : 'Procedural Failure'}</h4>
                             <p className="text-lg font-bold opacity-80 leading-relaxed uppercase tracking-wider italic">
                                {selectedCase.suspects.find(s => s.id === selectedSuspect)?.evidenceLink}
                             </p>
                          </div>
                       </div>
                       
                       {showResult && (
                         <div className="mt-12 pt-10 border-t border-emerald-500/20">
                            <div className="flex flex-wrap justify-center gap-6">
                               <div className="px-8 py-4 bg-emerald-500/20 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-500/20">Lead Investigator</div>
                               <div className="px-8 py-4 bg-emerald-500/20 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-500/20">Forensic Excellence</div>
                               <button onClick={resetInvestigation} className="px-8 py-4 bg-white text-emerald-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 shadow-xl transition-all">Select New File</button>
                            </div>
                         </div>
                       )}
                    </div>
                  )}
               </div>
             )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CasePractice;
