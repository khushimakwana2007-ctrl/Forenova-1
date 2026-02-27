
import React, { useState, useCallback, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Archive, 
  MapPin, 
  ArrowRight,
  Info,
  Beaker,
  Thermometer,
  ShieldCheck,
  PackageCheck,
  Scale,
  RotateCcw,
  // Fix: Added missing Activity icon import from lucide-react
  Activity
} from 'lucide-react';
import { EVIDENCE_DATA } from '../constants';
import { EvidenceType } from '../types';

const STEPS = [
  'Tool Selection',
  'Collection Method',
  'Packaging & Labeling',
  'Chain of Custody'
];

const EvidenceSimulator: React.FC = () => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceType | null>(null);
  const [activeTab, setActiveTab] = useState<'collection' | 'preservation'>('collection');
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const playSound = useCallback((type: 'success' | 'error' | 'click') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type === 'success') {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
      } else {
        osc.frequency.setValueAtTime(1500, now);
        gain.gain.setValueAtTime(0.05, now);
        osc.start(now); osc.stop(now + 0.05);
      }
    } catch (e) {}
  }, []);

  const handleEvidenceSelect = (ev: EvidenceType) => {
    playSound('click');
    setSelectedEvidence(ev);
    setCurrentStep(0);
    setSelectedTools([]);
    setFeedback(null);
  };

  const nextStep = () => {
    if (!selectedEvidence) return;

    if (currentStep === 0) {
      const mandatory = selectedEvidence.toolsNeeded;
      const correctlySelected = mandatory.every(t => selectedTools.includes(t));
      const noExtraIncorrect = selectedTools.length === mandatory.length;

      if (!correctlySelected || !noExtraIncorrect) {
        playSound('error');
        setFeedback({ 
          type: 'error', 
          text: `Protocol Error: Required tools for this specimen are: ${mandatory.join(', ')}.` 
        });
        return;
      }
    }

    if (currentStep < STEPS.length - 1) {
      playSound('click');
      setCurrentStep(prev => prev + 1);
      setFeedback(null);
    } else {
      playSound('success');
      setFeedback({ type: 'success', text: 'Unit Training Complete: Chain of custody established and evidence archived.' });
    }
  };

  const resetModule = () => {
    playSound('click');
    setCurrentStep(0);
    setSelectedTools([]);
    setFeedback(null);
  };

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('blood')) return '🩸';
    if (n.includes('print')) return '🖐️';
    if (n.includes('dna') || n.includes('saliva')) return '🧪';
    if (n.includes('fiber') || n.includes('hair')) return '🧵';
    if (n.includes('firearm') || n.includes('handgun')) return '🔫';
    if (n.includes('cartridge') || n.includes('casing')) return '🐚';
    if (n.includes('narcotics') || n.includes('powder')) return '⚖️';
    if (n.includes('digital') || n.includes('usb')) return '💻';
    return '📦';
  };

  const getSpecificMethodology = useMemo(() => {
    if (!selectedEvidence) return "";
    const name = selectedEvidence.name.toLowerCase();
    if (name.includes('blood') || name.includes('dna')) return "Utilizing the sterile swab in a circular motion to absorb the maximum volume of biological material while avoiding surrounding contaminants.";
    if (name.includes('print')) return "Carefully applying powder in a light, rhythmic motion until the ridge detail becomes clear, then lifting the impression with forensic tape.";
    if (name.includes('fiber')) return "Using fine-tipped tweezers to secure the specimen and placing it into a primary paper bindle using the druggist-fold technique.";
    if (name.includes('firearm')) return "Securing the trigger guard with zip-ties to prevent accidental discharge and ensuring the barrel is clear of any obstructions.";
    if (name.includes('digital')) return "Immediately placing the device into a shielding Faraday bag to block remote signals that could compromise data integrity.";
    if (name.includes('narcotics')) return "Measuring the exact gross weight using a calibrated analytical scale before sealing in a tamper-evident narcotic-safe container.";
    return "Following standard operating procedures to isolate, collect, and document the evidentiary item for laboratory submission.";
  }, [selectedEvidence]);

  const getToolPool = useMemo(() => {
    if (!selectedEvidence) return [];
    const distractors = ['Generic Box', 'Hammer', 'Plastic Container', 'Masking Tape', 'Adhesive Tape', 'Kitchen Knife', 'Used Towel'];
    return Array.from(new Set([...selectedEvidence.toolsNeeded, ...distractors])).sort(() => Math.random() - 0.5);
  }, [selectedEvidence]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Evidence Handling Training</h1>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl">
          <button 
            onClick={() => { playSound('click'); setActiveTab('collection'); }}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'collection' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'
            }`}
          >
            Collection Phase
          </button>
          <button 
            onClick={() => { playSound('click'); setActiveTab('preservation'); }}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'preservation' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'
            }`}
          >
            Scientific Preservation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[700px]">
        {/* Sidebar: Evidence Selection */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 overflow-hidden flex flex-col shadow-2xl">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 px-4">Selection Inventory</h3>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
            {EVIDENCE_DATA.map(ev => (
              <button
                key={ev.id}
                onClick={() => handleEvidenceSelect(ev)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all text-left relative group overflow-hidden border ${
                  selectedEvidence?.id === ev.id 
                    ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                    : 'bg-black/20 border-transparent hover:bg-white/5 text-slate-300'
                }`}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-500 z-10">{getIcon(ev.name)}</span>
                <div className="z-10">
                   <p className="text-xs font-black uppercase tracking-tight line-clamp-1">{ev.name}</p>
                   <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{ev.category}</p>
                </div>
                {selectedEvidence?.id === ev.id && <div className="absolute inset-0 bg-blue-600/5 animate-pulse"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden shadow-2xl">
          {!selectedEvidence ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-30 grayscale transition-all">
              <div className="p-8 bg-slate-800 rounded-full ring-8 ring-slate-800/30">
                 <ShieldCheck size={80} className="text-slate-500" />
              </div>
              <div className="max-w-sm">
                 <p className="text-xl font-bold text-white uppercase tracking-tight">Access Restricted</p>
                 <p className="text-sm text-slate-500 mt-2 font-medium">Select a specimen from the inventory to initialize the collection protocol simulator.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
              {activeTab === 'collection' ? (
                <div className="space-y-10 flex-1 flex flex-col">
                  {/* Progress Header */}
                  <div className="flex justify-between items-start border-b border-slate-800 pb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                         <span className="text-[40px] leading-none">{getIcon(selectedEvidence.name)}</span>
                         <h2 className="text-3xl font-black text-white uppercase tracking-tight">{selectedEvidence.name}</h2>
                      </div>
                      <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] px-1">Forensic Class: {selectedEvidence.category}</p>
                    </div>
                    <button onClick={resetModule} className="p-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all border border-rose-500/20 group">
                      <RotateCcw size={18} className="group-hover:rotate-[-45deg] transition-transform" />
                    </button>
                  </div>

                  {/* Step Indicator */}
                  <div className="flex justify-between relative px-4">
                    <div className="absolute top-5 left-8 right-8 h-[2px] bg-slate-800 -z-0"></div>
                    {STEPS.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3 relative z-10">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-500 ${
                          idx < currentStep ? 'bg-emerald-500 text-white rotate-[360deg]' : idx === currentStep ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-800 text-slate-600'
                        }`}>
                          {idx < currentStep ? <CheckCircle2 size={18} /> : idx + 1}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${idx === currentStep ? 'text-blue-500' : 'text-slate-600'}`}>{step}</span>
                        {idx < currentStep && <div className="absolute top-5 -left-1/2 w-full h-[2px] bg-emerald-500 -z-0"></div>}
                      </div>
                    ))}
                  </div>

                  {/* Simulation Body */}
                  <div className="flex-1 bg-black/20 rounded-[2rem] border border-white/5 p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {currentStep === 0 && (
                      <div className="space-y-8 w-full max-w-2xl animate-in zoom-in-95 duration-300">
                        <div className="space-y-2">
                           <h4 className="text-xl font-bold text-white uppercase tracking-tight">Toolkit Verification</h4>
                           <p className="text-xs text-slate-500">Select the exact instrument combination required for <b>{selectedEvidence.name}</b>.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {getToolPool.map(tool => (
                            <button
                              key={tool}
                              onClick={() => { playSound('click'); setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]) }}
                              className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                selectedTools.includes(tool) ? 'bg-blue-600 border-blue-500 text-white shadow-xl scale-105' : 'bg-slate-800/40 border-white/5 text-slate-500 hover:border-white/20'
                              }`}
                            >
                              {tool}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-8 max-w-xl animate-in fade-in slide-in-from-bottom-4">
                         <div className="w-28 h-28 bg-blue-600/10 rounded-[2rem] flex items-center justify-center mx-auto border border-blue-500/20 shadow-inner relative">
                            {/* Fix: Using Activity icon which is now correctly imported */}
                            <Activity size={48} className="text-blue-500 animate-pulse" />
                            <div className="absolute -top-2 -right-2 bg-emerald-500 text-[8px] font-black text-white px-2 py-1 rounded-lg uppercase">Real-Time Processing</div>
                         </div>
                         <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white uppercase tracking-tight">ISO-Standard Extraction</h4>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium italic border-l-2 border-blue-500/30 pl-6">
                               "{getSpecificMethodology}"
                            </p>
                         </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-8 w-full max-w-lg animate-in fade-in duration-500">
                        <h4 className="text-xl font-bold text-white uppercase tracking-tight">Packaging Protocol</h4>
                        <div className="bg-slate-800/80 p-10 rounded-[3rem] border-2 border-dashed border-slate-700 text-left space-y-8 relative group">
                           <div className="flex items-center gap-4 text-emerald-500">
                              <PackageCheck size={32} />
                              <div className="space-y-0.5">
                                 <h5 className="text-[10px] font-black uppercase tracking-[0.3em]">Mandatory Shielding</h5>
                                 <p className="text-lg font-bold text-white uppercase">{selectedEvidence.packaging}</p>
                              </div>
                           </div>
                           <div className="p-5 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                              <div className="flex items-center gap-2 text-amber-500">
                                 <AlertCircle size={14} />
                                 <span className="text-[9px] font-black uppercase tracking-widest">Procedural Warning</span>
                              </div>
                              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                                 Verify all seals are airtight and the label includes the initials of the recovering agent. Incorrect packaging leads to evidence dismissal in court.
                              </p>
                           </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-8 w-full max-w-lg animate-in zoom-in duration-500">
                         <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] relative overflow-hidden shadow-2xl backdrop-blur-md">
                            <div className="absolute top-0 right-0 p-4 bg-emerald-600 text-[10px] font-black uppercase rotate-45 translate-x-10 -translate-y-2 shadow-2xl">SECURED</div>
                            <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                               <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/20"><ShieldCheck size={26}/></div>
                               <div className="text-left">
                                  <h4 className="font-serif text-2xl italic text-white leading-none">Custody Ledger</h4>
                                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">Digital Authentication Active</p>
                               </div>
                            </div>
                            <div className="space-y-5 font-mono text-xs text-left opacity-90">
                               <div className="flex justify-between items-center"><span className="text-slate-500">EXHIBIT CODE:</span> <span className="text-blue-400 font-bold">#EV-{selectedEvidence.id}-{Math.random().toString(36).substr(2, 4).toUpperCase()}</span></div>
                               <div className="flex justify-between items-center"><span className="text-slate-500">NOMENCLATURE:</span> <span className="text-white uppercase">{selectedEvidence.name}</span></div>
                               <div className="flex justify-between items-center"><span className="text-slate-500">OFFICER:</span> <span className="text-white uppercase font-black tracking-tighter">FN-INVESTIGATOR-TRAINEE</span></div>
                               <div className="flex justify-between items-center border-t border-white/5 pt-4"><span className="text-slate-500">LOGGED AT:</span> <span className="text-emerald-400">{new Date().toLocaleTimeString()} (UTC)</span></div>
                            </div>
                         </div>
                      </div>
                    )}

                    {feedback && (
                      <div className={`mt-8 w-full p-6 rounded-2xl flex items-center gap-4 border animate-in slide-in-from-bottom-4 ${
                        feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                      }`}>
                        {feedback.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        <p className="text-xs font-black uppercase tracking-wide leading-relaxed">{feedback.text}</p>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={nextStep}
                    className="mt-auto w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-blue-500/20 active:scale-[0.98]"
                  >
                    {currentStep === STEPS.length - 1 ? 'Archive into Repository' : 'Proceed to Next Phase'}
                    <ArrowRight size={24} />
                  </button>
                </div>
              ) : (
                <div className="space-y-12 animate-in fade-in duration-700">
                  <div className="flex justify-between items-end border-b border-slate-800 pb-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{selectedEvidence.name}</h2>
                        <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg border border-blue-500/20">Ref: {selectedEvidence.id}</span>
                      </div>
                      <p className="text-sm text-slate-500 uppercase font-black tracking-[0.3em] flex items-center gap-2">
                         <ShieldCheck size={14} className="text-emerald-500" /> Archival Integrity Protocol
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-slate-800/40 p-10 rounded-[3rem] border border-white/5 space-y-6 hover:border-blue-500/20 transition-all group relative overflow-hidden">
                        <div className="flex items-center gap-4 text-blue-500">
                           <div className="p-3 bg-blue-600/10 rounded-2xl"><Thermometer size={28} /></div>
                           <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Thermal Threshold</h4>
                        </div>
                        <p className="text-6xl font-black text-white group-hover:scale-110 origin-left transition-transform tracking-tighter">{selectedEvidence.temperature}</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Critical range required to mitigate enzymatic degradation or volatile loss.</p>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                     </div>

                     <div className="bg-slate-800/40 p-10 rounded-[3rem] border border-white/5 space-y-6 hover:border-emerald-500/20 transition-all group relative overflow-hidden">
                        <div className="flex items-center gap-4 text-emerald-500">
                           <div className="p-3 bg-emerald-600/10 rounded-2xl"><Archive size={28} /></div>
                           <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Storage Environment</h4>
                        </div>
                        <p className="text-2xl font-black text-white group-hover:translate-x-2 transition-transform uppercase tracking-tighter">{selectedEvidence.storage}</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Placement in certified high-security zones with dual-factor authentication.</p>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                     </div>
                  </div>

                  <div className="p-12 bg-white/5 border border-white/10 rounded-[4rem] space-y-6 relative group hover:bg-white/[0.07] transition-all">
                     <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] flex items-center gap-2">
                        <Info size={16} /> Forensic Expert's Directive
                     </h3>
                     <p className="text-white text-2xl font-serif leading-relaxed italic border-l-4 border-blue-500/30 pl-10 py-2">
                        "{selectedEvidence.description}"
                     </p>
                  </div>

                  <div className="flex items-center gap-6 bg-rose-500/10 p-8 rounded-[2rem] border border-rose-500/20">
                     <div className="p-4 bg-rose-600/20 rounded-full text-rose-500"><AlertCircle size={32} /></div>
                     <div className="space-y-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-400">Biological & Physical Hazard Warning</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">Always utilize Level 2 PPE (Gloves, Mask, Shield) when handling items in the {selectedEvidence.category} category.</p>
                     </div>
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

export default EvidenceSimulator;
