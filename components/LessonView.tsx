import React, { useState, useEffect } from 'react';
import { Course, LessonContent } from '../types';
import { generateLessonContent } from '../geminiService';

interface Props { course: Course; onComplete: (xp: number) => void; onBack: () => void; }

export const LessonView: React.FC<Props> = ({ course, onComplete, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<LessonContent | null>(null);
  const [mode, setMode] = useState<'eli5' | 'exam'>('eli5');
  const [page, setPage] = useState(0);

  useEffect(() => {
    generateLessonContent(course.name, course.level).then(setContent).finally(() => setLoading(false));
  }, [course]);

  if (loading || !content) return <div className="pt-20 text-center">Loading Lesson...</div>;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="text-white/50">← Back</button>
        <span className="text-xs font-bold uppercase tracking-widest">{course.name}</span>
      </header>
      <div className="flex p-1 bg-white/5 rounded-2xl">
        <button onClick={() => setMode('eli5')} className={`flex-1 py-2 rounded-xl text-xs font-bold ${mode === 'eli5' ? 'bg-white text-black' : 'text-white/50'}`}>ELI5</button>
        <button onClick={() => setMode('exam')} className={`flex-1 py-2 rounded-xl text-xs font-bold ${mode === 'exam' ? 'bg-white text-black' : 'text-white/50'}`}>EXAM READY</button>
      </div>
      <div className="glass p-8 rounded-[40px] text-center min-h-[300px] flex flex-col justify-center">
        {page === 0 && (mode === 'eli5' ? content.eli5.introduction : content.examReady.definition)}
        {page === 1 && (mode === 'eli5' ? content.eli5.keyPoints[0] : content.examReady.examTips)}
      </div>
      <div className="flex gap-4">
        {page > 0 && <button onClick={() => setPage(page-1)} className="flex-1 glass py-4 rounded-3xl">Previous</button>}
        {page < 1 ? <button onClick={() => setPage(page+1)} className="flex-1 bg-white text-black py-4 rounded-3xl font-black">Next</button> : 
        <button onClick={() => onComplete(20)} className="flex-1 bg-sky-500 text-white py-4 rounded-3xl font-black">Finish Lesson</button>}
      </div>
    </div>
  );
};
