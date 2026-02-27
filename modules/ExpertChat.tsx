
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Message } from '../types';
import { getExpertResponse } from '../services/geminiService';

const ExpertChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I am the ForeNova Forensic Expert. I'm here to help with your criminology and investigation queries. What's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getExpertResponse(input);

    const modelMsg: Message = {
      role: 'model',
      text: aiResponse || "I apologize, but I encountered a network error. Could you repeat that?",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-blue-500" />
          <div>
            <h2 className="text-sm font-bold">Ask the Expert</h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
          <ShieldCheck size={12} className="text-blue-500" />
          <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Verified Expert</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 px-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-800' : 'bg-blue-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="flex gap-1 p-3 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none">
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="mt-4 bg-amber-500/5 border border-amber-500/20 p-2 rounded-xl flex items-center gap-2 mb-4">
        <AlertTriangle size={14} className="text-amber-500 shrink-0" />
        <p className="text-[9px] text-amber-200 leading-tight">Expert mode active: Questions unrelated to Forensic Science will be filtered.</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about ballistics, DNA, or crime scenes..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-4 pr-14 text-sm focus:outline-none focus:border-blue-500 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="absolute right-2 top-2 bottom-2 w-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/20"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ExpertChat;
