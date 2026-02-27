
import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import { UserSession } from '../types';

interface QuizProps {
  session: UserSession;
  setSession: (session: UserSession) => void;
}

const QuizEngine: React.FC<QuizProps> = ({ session, setSession }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const newScores = [...session.quizScores, score];
      setSession({
        ...session,
        quizScores: newScores,
        progress: Math.min(100, session.progress + 10)
      });
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 py-10 animate-in zoom-in duration-500">
        <div className="relative">
          <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
            <Trophy size={60} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-sm">
            {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold">Training Complete!</h2>
          <p className="text-slate-400 mt-2">You scored {score} out of {QUIZ_QUESTIONS.length}</p>
        </div>

        <div className="w-full space-y-3">
          <button 
            onClick={restart}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw size={20} /> Try Again
          </button>
          <button className="w-full py-4 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-2xl">
            Review Answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Knowledge Quiz</h2>
        <span className="text-xs font-mono text-blue-500">QUESTION {currentIdx + 1}/{QUIZ_QUESTIONS.length}</span>
      </div>

      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500" 
          style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-semibold leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleAnswer(idx)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative flex items-center justify-between group ${
                isAnswered 
                  ? idx === currentQuestion.correctAnswer 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' 
                    : idx === selectedAnswer 
                      ? 'bg-rose-500/10 border-rose-500 text-rose-300' 
                      : 'bg-slate-900 border-slate-800 opacity-50'
                  : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800'
              }`}
            >
              <span className="font-medium text-sm">{opt}</span>
              {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircle2 size={18} className="text-emerald-500" />}
              {isAnswered && idx === selectedAnswer && idx !== currentQuestion.correctAnswer && <XCircle size={18} className="text-rose-500" />}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="bg-blue-600/10 p-4 rounded-2xl border border-blue-500/20 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
              <Lightbulb size={14} /> Explanation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <button
          disabled={!isAnswered}
          onClick={handleNext}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
        >
          {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizEngine;
