import React from 'react';
import { Exam } from '../types';

export const ExamTracker: React.FC<{ exams: Exam[]; onBack: () => void }> = ({ exams, onBack }) => (
  <div className="space-y-8">
    <button onClick={onBack} className="text-white/50">← Back</button>
    <h2 className="text-2xl font-black">Exam Tracker</h2>
    <div className="space-y-4">
      {exams.map(exam => (
        <div key={exam.id} className="glass p-5 rounded-[28px] flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-sky-400 uppercase">{exam.courseName}</p>
            <h4 className="text-lg font-bold">{exam.title}</h4>
            <p className="text-xs text-white/40">{exam.date}</p>
          </div>
          <div className="text-2xl font-black">{exam.weight}%</div>
        </div>
      ))}
    </div>
  </div>
);
