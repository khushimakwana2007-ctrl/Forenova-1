
import React, { useEffect, useState, useRef } from 'react';

interface WelcomeProps {
  username: string;
  onComplete: () => void;
}

const WelcomeAnimation: React.FC<WelcomeProps> = ({ username, onComplete }) => {
  const [dots, setDots] = useState('');
  const audioPlayed = useRef(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    // Play a short "bit" sound (8-bit style beep)
    const playBitSound = () => {
      if (audioPlayed.current) return;
      audioPlayed.current = true;

      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square'; // 8-bit style
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.05); // Rapid sweep up
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } catch (err) {
        console.error("Audio playback failed", err);
      }
    };

    playBitSound();

    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Reduced wait time since voice is gone

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [username, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center animate-in zoom-in duration-700">
        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8 mx-auto shadow-[0_0_50px_rgba(59,130,246,0.3)]"></div>
        <h2 className="text-4xl font-bold tracking-tighter mb-2">
          Welcome <span className="text-blue-500">{username}</span>
        </h2>
        <p className="text-slate-400 font-mono tracking-widest uppercase text-[10px] font-bold">
          Initializing Forensic Terminal{dots}
        </p>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center px-10">
        <div className="w-full max-w-xs h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-blue-500 w-full animate-[loading_2.5s_ease-in-out]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeAnimation;
