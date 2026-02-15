import React from 'react';
import { Course } from '../types';

export const CourseDetails: React.FC<{ course: Course; onBack: () => void; onStartLesson: () => void }> = ({ course, onBack, onStartLesson }) => (
  <div className="space-y-8">
    <button onClick={onBack} className="text-white/50">← Back</button>
    <div className="text-center space-y-2">
      <div className="h-20 w-20 bg-white/5 rounded-[32px] mx-auto flex items-center justify-center text-4xl">{course.icon}</div>
      <h1 className="text-2xl font-black">{course.name}</h1>
      <p className="text-xs text-white/30 uppercase tracking-widest">{course.code} • {course.level}</p>
    </div>
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-white/30">Curriculum Units</h3>
      {course.units.map((unit, i) => (
        <div key={unit.id} className="glass p-5 rounded-[28px] flex items-center gap-4">
          <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center text-xs font-bold">{i + 1}</div>
          <div className="flex-1">
            <h4 className="text-sm font-bold">{unit.title}</h4>
            <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-emerald-400" style={{ width: `${unit.mastery}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
    <button onClick={onStartLesson} className="w-full bg-white text-black py-5 rounded-[32px] font-black uppercase tracking-widest">Start Mastery Session</button>
  </div>
);
