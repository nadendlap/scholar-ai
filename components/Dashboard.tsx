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
        placeholder="Search courses..." className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr
