import React from 'react';
import { Course, UserStats, Exam, Reminder } from '../types';

interface Props {
  stats: UserStats;
  courses: Course[];
  exams: Exam[];
  reminders: Reminder[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCourse: (course: Course) => void;
  onOpenExams: () => void;
  onAddReminder: (reminder: Reminder) => void;
  onRemoveReminder: (id: string) => void;
}

export const Dashboard: React.FC<Props> = ({ stats, courses, searchQuery, onSearchChange, onOpenCourse }) => (
  <div className="space-y-8 pb-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 gap-2">
         <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
         <span className="text-[11px] font-bold text-white/70">Wake County HS</span>
      </div>
    </div>
    <div className="space-y-1">
      <h1 className="text-4xl font-black tracking-tight">Hi, Jordan</h1>
      <p className="text-white/50">Let's focus on your AP Prep today.</p>
    </div>
    <div className="relative">
      <input 
        type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search courses..." className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm font-bold"
      />
    </div>
    <div className="space-y-4">
      <h3 className="text-xl font-black px-1">Your curriculum</h3>
      <div className="space-y-3">
        {courses.map(course => (
          <div key={course.id} onClick={() => onOpenCourse(course)} className="glass p-4 rounded-[28px] flex items-center gap-4 cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">{course.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-sm">{course.name}</h4>
                <span className="text-[10px] font-bold text-white/30">{course.mastery}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-sky-400" style={{ width: `${course.mastery}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
