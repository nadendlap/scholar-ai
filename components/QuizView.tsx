import React, { useState, useEffect } from 'react';
import { Course, Question } from '../types';
import { generateQuizQuestions } from '../geminiService';

export const QuizView: React.FC<{ course: Course; onFinish: () => void }> = ({ course, onFinish }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    generateQuizQuestions(course.name, course.level).then(setQuestions).finally(() => setLoading(false));
  }, [course]);

  if (loading || !questions.length) return <div className="pt-20 text-center">Preparing Quiz...</div>;

  const handleNext = () => {
    if (selected === questions[index].correctAnswer) setScore(score + 1);
    if (index < questions.length - 1) { setIndex(index + 1); setSelected(null); }
    else onFinish();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">{questions[index].question}</h2>
      <div className="space-y-3">
        {Object.entries(questions[index].options).map(([k, v]) => (
          <button key={k} onClick={() => setSelected(k)} className={`w-full p-5 rounded-3xl text-left border ${selected === k ? 'border-sky-500 bg-sky-500/10' : 'border-white/5 glass'}`}>
            {k}: {v}
          </button>
        ))}
      </div>
      <button disabled={!selected} onClick={handleNext} className="w-full bg-white text-black py-4 rounded-2xl font-black disabled:opacity-50">
        {index === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};
