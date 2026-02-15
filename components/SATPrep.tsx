import React, { useState } from 'react';
import { generateSATDrill } from '../geminiService.ts';
import { Question } from '../types.ts';

export const SATPrep: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [drill, setDrill] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startDrill = async (type: 'Math' | 'English') => {
    setLoading(true);
    setDrill(null);
    setSelected(null);
    setShowExplanation(false);
    try {
      const q = await generateSATDrill(type);
      setDrill(q);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">SAT Mastery</h2>
        <p className="text-white/40 text-sm">Boost your score with AI-powered drills.</p>
      </div>

      {!drill ? (
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => startDrill('Math')}
            className="glass p-8 rounded-[40px] text-center border-amber-500/20 hover:border-amber-500/50 transition-all group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧮</div>
            <h3 className="font-black">Math</h3>
            <p className="text-[10px] text-white/30 uppercase font-bold mt-1">Algebra & Geo</p>
          </button>
          <button 
            onClick={() => startDrill('English')}
            className="glass p-8 rounded-[40px] text-center border-violet-500/20 hover:border-violet-500/50 transition-all group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📚</div>
            <h3 className="font-black">Reading</h3>
            <p className="text-[10px] text-white/30 uppercase font-bold mt-1">Logic & Grammar</p>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass p-6 rounded-[32px] border-white/10">
            <h3 className="text-lg font-bold leading-tight">{drill.question}</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(drill.options).map(([k, v]) => (
              <button 
                key={k} 
                onClick={() => !showExplanation && setSelected(k)}
                className={`w-full p-5 rounded-3xl text-left border transition-all ${
                  selected === k ? 'border-sky-500 bg-sky-500/10' : 'border-white/5 glass'
                } ${showExplanation && k === drill.correctAnswer ? 'border-emerald-500 bg-emerald-500/10' : ''}`}
              >
                <span className="font-black mr-3">{k}</span> {v}
              </button>
            ))}
          </div>
          
          {!showExplanation ? (
            <button 
              disabled={!selected}
              onClick={() => setShowExplanation(true)}
              className="w-full bg-white text-black py-5 rounded-[32px] font-black uppercase tracking-widest disabled:opacity-30"
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
              <div className={`p-6 rounded-[32px] ${selected === drill.correctAnswer ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
                <p className="font-bold mb-2">{selected === drill.correctAnswer ? '✨ Correct!' : '❌ Not quite.'}</p>
                <p className="text-sm opacity-80">{drill.explanationExamReady}</p>
              </div>
              <button 
                onClick={() => setDrill(null)}
                className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-[32px] font-black uppercase tracking-widest"
              >
                Another Drill
              </button>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-black uppercase tracking-widest text-xs">Milo is thinking...</p>
          </div>
        </div>
      )}
    </div>
  );
};
