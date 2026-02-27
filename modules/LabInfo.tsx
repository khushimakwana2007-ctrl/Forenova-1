
import React, { useState, useEffect } from 'react';
import { 
  Beaker, 
  Map as MapIcon, 
  ChevronRight, 
  Search,
  Crosshair,
  Fingerprint,
  Activity,
  Globe,
  Settings,
  Microscope,
  ClipboardList,
  Play,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Cpu,
  Thermometer,
  CloudLightning,
  Monitor,
  LayoutDashboard,
  FileText,
  Target,
  FlaskRound as Flask
} from 'lucide-react';
import { LAB_DIVISIONS } from '../constants';
import { LabDivision, QuizQuestion } from '../types';

const FSL_LOCATIONS = [
  { name: "DFS Gandhinagar", type: "Main State HQ", distance: "0.8 km" },
  { name: "RFSL Ahmedabad", type: "Regional Lab", distance: "28.5 km" },
  { name: "RFSL Vadodara", type: "Regional Lab", distance: "115.2 km" },
  { name: "RFSL Surat", type: "Regional Lab", distance: "264.0 km" },
  { name: "RFSL Rajkot", type: "Regional Lab", distance: "224.5 km" }
];

const LabInfo: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState<LabDivision>(LAB_DIVISIONS[0]);
  const [mode, setMode] = useState<'summary' | 'info' | 'simulation' | 'quiz'>('summary');
  const [quizState, setQuizState] = useState({
    idx: 0,
    score: 0,
    finished: false,
    selected: null as number | null,
    answered: false
  });
  const [simStep, setSimStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([]);

  const resetQuiz = () => {
    setQuizState({ idx: 0, score: 0, finished: false, selected: null, answered: false });
  };

  const handleAnswer = (idx: number) => {
    if (quizState.answered) return;
    const isCorrect = idx === activeDivision.quiz[quizState.idx].correctAnswer;
    setQuizState(prev => ({
      ...prev,
      selected: idx,
      answered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextQuestion = () => {
    if (quizState.idx < activeDivision.quiz.length - 1) {
      setQuizState(prev => ({ ...prev, idx: prev.idx + 1, selected: null, answered: false }));
    } else {
      setQuizState(prev => ({ ...prev, finished: true }));
    }
  };

  const executeSimStep = () => {
    setIsSimulating(true);
    const stepName = activeDivision.procedure[simStep - 1].title;
    setSimLog(prev => [`[${new Date().toLocaleTimeString()}] Executing: ${stepName}...`, ...prev].slice(0, 5));
    
    setTimeout(() => {
      setIsSimulating(false);
      if (simStep < activeDivision.procedure.length) {
        setSimStep(prev => prev + 1);
        setSimLog(prev => [`[${new Date().toLocaleTimeString()}] Completed: ${stepName}`, ...prev].slice(0, 5));
      } else {
        setSimLog(prev => [`[${new Date().toLocaleTimeString()}] PROTOCOL FINALIZED`, ...prev].slice(0, 5));
      }
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Lab Header & Stats Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
              <Beaker className="text-blue-500" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">ForeNova Analytical Hub</h2>
              <div className="flex items-center gap-3 mt-1">
                 <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                    <CloudLightning size={10} /> System Online
                 </span>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">v4.2.0-Production</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 lg:max-w-2xl">
            <StatBox icon={Cpu} label="Server Load" value="24%" color="text-blue-400" />
            <StatBox icon={Thermometer} label="Ambient Temp" value="21.5°C" color="text-emerald-400" />
            <StatBox icon={Activity} label="Active Samples" value="12" color="text-amber-400" />
            <StatBox icon={Monitor} label="FSL Sync" value="Verified" color="text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 w-fit mx-auto lg:mx-0">
        <button 
          onClick={() => setMode('summary')} 
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === 'summary' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
        >
          <LayoutDashboard size={14} /> Division Summary
        </button>
        <button 
          onClick={() => setMode('info')} 
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === 'info' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
        >
          <Info size={14} /> Technical Reference
        </button>
        <button 
          onClick={() => { setMode('simulation'); setSimStep(1); setSimLog([]); }} 
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === 'simulation' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
        >
          <Play size={14} /> Procedure Simulation
        </button>
        <button 
          onClick={() => { setMode('quiz'); resetQuiz(); }} 
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === 'quiz' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
        >
          <ShieldCheck size={14} /> Proficiency Test
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar: Lab Selection (Visible in non-summary modes) */}
        {mode !== 'summary' && (
          <div className="col-span-12 lg:col-span-3 space-y-4 animate-in slide-in-from-left-4 duration-300">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 px-2">Laboratory Divisions</h3>
            <div className="space-y-2">
              {LAB_DIVISIONS.map(div => (
                <button 
                  key={div.id}
                  onClick={() => { setActiveDivision(div); resetQuiz(); setSimStep(1); setSimLog([]); }}
                  className={`w-full p-5 rounded-2xl border transition-all text-left relative group overflow-hidden ${
                    activeDivision.id === div.id 
                      ? 'bg-blue-600/10 border-blue-500/50 shadow-xl shadow-blue-500/5' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${activeDivision.id === div.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-500'}`}>
                      {div.id === 'bio' ? <Activity size={18} /> : div.id === 'tox' ? <Beaker size={18} /> : div.id === 'digital' ? <Monitor size={18} /> : <Crosshair size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white">{div.name}</h4>
                        <span className="text-[9px] font-mono text-slate-600 font-bold">{div.id.toUpperCase()}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{div.subFields[0]}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-[10px] font-bold flex items-center gap-2 text-emerald-400 uppercase tracking-widest mb-4">
                <MapIcon size={12} /> Nearby Facilities
              </h3>
              <div className="space-y-3">
                {FSL_LOCATIONS.map((loc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all">
                    <div>
                      <h4 className="text-[10px] font-bold text-white">{loc.name}</h4>
                      <p className="text-[9px] text-slate-500">{loc.type}</p>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-500">{loc.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Content Area */}
        <div className={`${mode === 'summary' ? 'col-span-12' : 'col-span-12 lg:col-span-9'}`}>
          {mode === 'summary' && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Forensic Knowledge Library</h3>
                    <p className="text-sm text-slate-500 mt-1">Welcome, Investigator. Explore the core pillars of forensic science below.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <FileText size={14} className="text-blue-500" /> Database Modules: {LAB_DIVISIONS.length}
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {LAB_DIVISIONS.map(div => (
                    <div key={div.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all group hover:bg-slate-900/80 shadow-sm hover:shadow-2xl">
                       <div className="space-y-6">
                          <div className="flex items-center justify-between">
                             <div className={`p-4 rounded-2xl shadow-lg ${
                                div.id === 'bio' ? 'bg-emerald-600/10 text-emerald-400' : 
                                div.id === 'tox' ? 'bg-amber-600/10 text-amber-400' : 
                                div.id === 'ball' ? 'bg-blue-600/10 text-blue-400' :
                                div.id === 'digital' ? 'bg-indigo-600/10 text-indigo-400' :
                                'bg-violet-600/10 text-violet-400'
                             }`}>
                                {div.id === 'bio' ? <Activity size={24} /> : 
                                 div.id === 'tox' ? <Beaker size={24} /> : 
                                 div.id === 'digital' ? <Monitor size={24} /> :
                                 div.id === 'ball' ? <Crosshair size={24} /> :
                                 <Fingerprint size={24} />}
                             </div>
                             <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest font-mono">CODE: {div.id.toUpperCase()}</span>
                                <div className="flex gap-1 mt-1">
                                   <div className={`w-1 h-1 rounded-full ${div.id === 'bio' ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                                   <div className={`w-1 h-1 rounded-full ${div.id === 'tox' ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
                                   <div className={`w-1 h-1 rounded-full ${div.id === 'ball' ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
                                </div>
                             </div>
                          </div>
                          
                          <div className="space-y-4">
                             <h4 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{div.name}</h4>
                             <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                {div.description}
                             </p>
                          </div>

                          <div className="pt-4 border-t border-slate-800">
                             <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                                <Target size={12} className="text-indigo-500" /> Specialized Topics
                             </h5>
                             <div className="flex flex-wrap gap-2">
                                {div.subFields.map(field => (
                                   <span key={field} className="px-3 py-1 bg-black/30 border border-white/5 rounded-lg text-[9px] font-bold text-slate-500 uppercase">
                                      {field}
                                   </span>
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="mt-8 pt-6 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="flex flex-col">
                                <span className="text-[9px] text-slate-600 uppercase font-bold tracking-widest">Interactive</span>
                                <span className="text-xs font-bold text-white">{div.procedure.length} Lab Phases</span>
                             </div>
                          </div>
                          <button 
                            onClick={() => { setActiveDivision(div); setMode('info'); }}
                            className="group/btn px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 active:scale-95"
                          >
                             Study Detailed Reference
                             <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {mode === 'info' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-white">{activeDivision.name} Reference</h3>
                            <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-mono font-bold text-slate-400 border border-white/5">{activeDivision.id.toUpperCase()}</span>
                          </div>
                          <p className="text-slate-400 text-sm leading-relaxed">{activeDivision.description}</p>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Core Disciplines</h4>
                          <div className="flex flex-wrap gap-2">
                             {activeDivision.subFields.map(sub => (
                               <span key={sub} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-medium">
                                  {sub}
                               </span>
                             ))}
                          </div>
                       </div>
                    </div>
                    <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-center">
                       <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                          <ShieldCheck size={14} /> Procedural Guidelines
                       </h4>
                       <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-xs text-slate-400">
                             <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                             <span>Maintain Chain of Custody for all {activeDivision.name} evidence.</span>
                          </li>
                          <li className="flex items-start gap-2 text-xs text-slate-400">
                             <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                             <span>Wear appropriate PPE to prevent cross-contamination.</span>
                          </li>
                       </ul>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeDivision.equipment.map(eq => (
                  <div key={eq.name} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/20 transition-all group">
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-800 rounded-xl text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-600/10 transition-all">
                           <Settings size={20} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="font-bold text-white text-sm">{eq.name}</h4>
                           <p className="text-xs text-slate-400 leading-relaxed">{eq.description}</p>
                           <p className="text-[10px] text-blue-300 font-medium italic mt-2 flex items-center gap-1">
                              <Search size={10} /> {eq.useCase}
                           </p>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'simulation' && (
            <div className="grid grid-cols-12 gap-6 h-full animate-in zoom-in duration-300">
               <div className="col-span-12 md:col-span-8 bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden min-h-[500px]">
                  <div className="bg-slate-900 p-6 border-b border-slate-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">Scientific Workflow Simulator</h3>
                      <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{activeDivision.name}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {activeDivision.procedure.map(p => (
                        <div key={p.step} className={`w-10 h-1.5 rounded-full transition-all duration-500 ${p.step < simStep ? 'bg-emerald-500' : p.step === simStep ? 'bg-blue-500 animate-pulse' : 'bg-slate-800'}`}></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 p-10 flex flex-col items-center justify-center text-center space-y-8 relative">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isSimulating ? 'bg-blue-600/20 scale-110' : 'bg-slate-900 border border-white/5 shadow-xl'}`}>
                       {isSimulating ? <Activity size={48} className="text-blue-500 animate-spin" /> : <Play size={48} className="text-slate-700 ml-2" />}
                    </div>
                    <div className="max-w-md space-y-4">
                       <h4 className="text-xl font-bold text-white">{activeDivision.procedure[simStep - 1]?.title}</h4>
                       <p className="text-slate-400 leading-relaxed">
                          {activeDivision.procedure[simStep - 1]?.action}
                       </p>
                    </div>

                    <div className="w-full max-w-sm flex items-center gap-4 mt-8">
                       <button 
                          disabled={simStep === 1 || isSimulating}
                          onClick={() => setSimStep(prev => prev - 1)}
                          className="flex-1 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-30 rounded-2xl text-xs font-bold transition-all text-slate-400"
                       >
                          Previous
                       </button>
                       <button 
                          disabled={isSimulating}
                          onClick={executeSimStep}
                          className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-2xl text-xs font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                       >
                          {simStep === activeDivision.procedure.length && !isSimulating ? 'Restart Workflow' : isSimulating ? 'Executing...' : 'Run Lab Phase'} <ChevronRight size={14} />
                       </button>
                    </div>
                  </div>
               </div>

               <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex-1 flex flex-col">
                     <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Monitor size={12} /> Analytical Data Stream
                     </h3>
                     <div className="flex-1 font-mono text-[10px] space-y-3">
                        {simLog.length === 0 ? (
                           <p className="text-slate-600 italic">Awaiting phase initialization...</p>
                        ) : (
                           simLog.map((log, i) => (
                              <p key={i} className={`${log.includes('FINALIZED') ? 'text-emerald-500 font-bold' : log.includes('Executing') ? 'text-blue-400' : 'text-slate-500'}`}>{log}</p>
                           ))
                        )}
                     </div>
                  </div>
                  <div className="bg-amber-600/10 border border-amber-600/20 rounded-3xl p-6">
                     <div className="flex items-center gap-2 text-amber-500 mb-2">
                        <AlertTriangle size={16} />
                        <h4 className="text-[10px] font-bold uppercase tracking-widest">Training Notice</h4>
                     </div>
                     <p className="text-[11px] text-slate-400 leading-relaxed">Ensure all digital markers are recorded in the chain of custody before finalizing analysis.</p>
                  </div>
               </div>
            </div>
          )}

          {mode === 'quiz' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 min-h-[500px] flex flex-col animate-in slide-in-from-bottom-6 duration-500">
               {!quizState.finished ? (
                 <div className="space-y-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-500 shadow-inner">
                             <ClipboardList size={22} />
                          </div>
                          <div>
                            <h3 className="font-bold text-white leading-tight">Proficiency Test</h3>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest">{activeDivision.name}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-mono text-blue-500 font-bold">QUESTION {quizState.idx + 1} OF {activeDivision.quiz.length}</p>
                          <div className="w-24 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                             <div className="h-full bg-blue-500" style={{ width: `${((quizState.idx + 1)/activeDivision.quiz.length)*100}%` }}></div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6 flex-1">
                       <h4 className="text-xl md:text-2xl font-bold leading-snug text-slate-100">{activeDivision.quiz[quizState.idx].question}</h4>
                       
                       <div className="grid grid-cols-1 gap-4">
                          {activeDivision.quiz[quizState.idx].options.map((opt, i) => (
                             <button 
                                key={i}
                                disabled={quizState.answered}
                                onClick={() => handleAnswer(i)}
                                className={`p-5 rounded-2xl border-2 text-left transition-all flex justify-between items-center group relative overflow-hidden ${
                                   quizState.answered
                                   ? i === activeDivision.quiz[quizState.idx].correctAnswer
                                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                                      : i === quizState.selected
                                         ? 'bg-rose-500/10 border-rose-500/50 text-rose-400'
                                         : 'bg-slate-800/40 border-slate-800 opacity-40'
                                   : 'bg-slate-800 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 active:scale-[0.99]'
                                }`}
                             >
                                <span className="font-bold text-sm z-10">{opt}</span>
                                {quizState.answered && i === activeDivision.quiz[quizState.idx].correctAnswer && <CheckCircle2 size={18} className="text-emerald-500 z-10" />}
                                {quizState.answered && i === quizState.selected && i !== activeDivision.quiz[quizState.idx].correctAnswer && <XCircle size={18} className="text-rose-500 z-10" />}
                             </button>
                          ))}
                       </div>

                       {quizState.answered && (
                         <div className="bg-blue-600/5 border border-blue-500/10 p-5 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-1">
                               <Info size={16} />
                            </div>
                            <div>
                               <h5 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Scientific Reasoning</h5>
                               <p className="text-xs text-slate-400 leading-relaxed italic">{activeDivision.quiz[quizState.idx].explanation}</p>
                            </div>
                         </div>
                       )}
                    </div>

                    <button 
                       disabled={!quizState.answered}
                       onClick={nextQuestion}
                       className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 rounded-2xl text-sm font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-8"
                    >
                       {quizState.idx === activeDivision.quiz.length - 1 ? 'Complete Assessment' : 'Proceed to Next Step'} <ArrowRight size={18} />
                    </button>
                 </div>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in">
                    <div className="relative">
                       <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center ring-8 ring-emerald-500/5">
                          <ShieldCheck size={64} className="text-emerald-500" />
                       </div>
                       <div className="absolute -top-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase">Passed</div>
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-3xl font-bold text-white">Assessment Successful</h3>
                       <p className="text-slate-400 max-w-sm">You have verified your technical competency in {activeDivision.name} with a final score of:</p>
                       <div className="text-5xl font-black text-white bg-white/5 py-4 rounded-3xl border border-white/5 tracking-tighter">
                          {Math.round((quizState.score / activeDivision.quiz.length) * 100)}%
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <button 
                          onClick={resetQuiz}
                          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-sm font-bold transition-all flex items-center gap-2"
                       >
                          <RotateCcw size={18} /> Retake Test
                       </button>
                       <button 
                          onClick={() => setMode('info')}
                          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-sm font-bold transition-all flex items-center gap-2"
                       >
                          Return to Reference
                       </button>
                    </div>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-black/30 border border-white/5 p-4 rounded-2xl flex flex-col gap-2">
    <div className="flex items-center gap-2 text-slate-500">
      <Icon size={12} />
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <span className={`text-lg font-bold ${color}`}>{value}</span>
  </div>
);

export default LabInfo;
