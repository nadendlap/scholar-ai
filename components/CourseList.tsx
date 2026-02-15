import React from 'react';
import { Course } from '../types.ts';

interface Props {
  courses: Course[];
  onOpenCourse: (course: Course) => void;
}

export const CourseList: React.FC<Props> = ({ courses, onOpenCourse }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-black">All Courses</h2>
        <p className="text-white/40 text-sm">WCPSS Academic Year 2024-25</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {courses.map(course => (
          <div 
            key={course.id}
            onClick={() => onOpenCourse(course)}
            className="glass p-6 rounded-[32px] border-white/5 flex items-center gap-5 cursor-pointer active:scale-95 transition-all"
          >
            <div className="h-16 w-16 rounded-[24px] bg-white/5 flex items-center justify-center text-3xl">{course.icon}</div>
            <div className="flex-1">
              <h4 className="font-black text-lg leading-tight">{course.name}</h4>
              <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-0.5">{course.level} • {course.code}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${course.mastery}%` }} />
                </div>
                <span className="text-[10px] font-black text-white/40">{course.mastery}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
