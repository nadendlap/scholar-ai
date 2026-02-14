import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';
import { MiloChat } from './components/MiloChat';
import { BottomNav } from './components/BottomNav';
import { CourseDetails } from './components/CourseDetails';
import { ExamTracker } from './components/ExamTracker';
import { BadgeGallery } from './components/BadgeGallery';
import { Profile } from './components/Profile';
import { Onboarding } from './components/Onboarding';
import { Course, UserStats, Exam, Badge, Reminder } from './types';

export type View = 'onboarding' | 'dashboard' | 'courses' | 'quiz' | 'sat' | 'more' | 'course-details' | 'lesson' | 'exams' | 'badges' | 'profile';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('onboarding');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState<UserStats>({
    xp: 1240,
    streak: 6,
    level: 12,
    completedLessons: 42
  });

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'r1', targetId: '2', targetName: 'AP Biology', message: 'Review Cell Transport steps', time: 'Today, 6:00 PM', type: 'course' },
    { id: 'r2', targetId: 'e1', targetName: 'Unit 2 Assessment', message: 'Final biology push!', time: 'Tomorrow, 4:00 PM', type: 'exam' }
  ]);

  const courses: Course[] = [
    { 
      id: '1', name: 'NC Math 3', code: 'NC_MATH3', subject: 'Mathematics', level: 'Standard', color: 'sky', icon: '📐', mastery: 62,
      units: [
        { id: 'm1', title: 'Polynomial Functions', mastery: 90, completed: true },
        { id: 'm2', title: 'Circles & Trig', mastery: 45, completed: false },
        { id: 'm3', title: 'Rational Functions', mastery: 10, completed: false }
      ]
    },
    { 
      id: '2', name: 'AP Biology', code: 'AP_BIO', subject: 'Science', level: 'AP', color: 'emerald', icon: '🌿', mastery: 45,
      units: [
        { id: 'b1', title: 'Cell Structure', mastery: 85, completed: true },
        { id: 'b2', title: 'Cell Transport', mastery: 30, completed: false },
        { id: 'b3', title: 'Cell Respiration', mastery: 0, completed: false }
      ]
    },
    { 
      id: '3', name: 'Honors English III', code: 'ENG_3H', subject: 'English', level: 'Honors', color: 'violet', icon: '✍️', mastery: 88,
      units: [
        { id: 'c1', title: 'American Literature', mastery: 95, completed: true },
        { id: 'c2', title: 'Rhetorical Analysis', mastery: 80, completed: true },
        { id: 'c3', title: 'Research & Synthesis', mastery: 50, completed: false }
      ]
    },
    { 
      id: '4', name: 'AP World History', code: 'AP_WORLD', subject: 'History', level: 'AP', color: 'rose', icon: '🌍', mastery: 15,
      units: [
        { id: 'h1', title: 'Modern Era (1200-1450)', mastery: 60, completed: true },
        { id: 'h2', title: 'Land-Based Empires', mastery: 10, completed: false }
      ]
    }
  ];

  const exams: Exam[] = [
    { id: 'e1', title: 'Polynomial Check-in', courseId: '1', courseName: 'NC Math 3', date: '2025-05-18', weight: 15, importance: 'Medium' },
    { id: 'e2', title: 'Unit 2 Assessment', courseId: '2', courseName: 'AP Biology', date: '2025-05-15', weight: 15, importance: 'High' },
    { id: 'e3', title: 'AP World Mid-term', courseId: '4', courseName: 'AP World History', date: '2025-05-22', weight: 20, importance: 'High' }
  ];

  const badges: Badge[] = [
    { id: 'b1', title: 'Early Bird', description: 'Complete a lesson before 8 AM', icon: '☀️', unlocked: true, category: 'Milestone' },
    { id: 'b3', title: '7 Day Streak', description: 'Learn 7 days in a row', icon: '🔥', unlocked: true, category: 'Milestone' },
    { id: 'b5', title: 'Quiz King', description: 'Answer 50 questions correctly', icon: '👑', unlocked: true, category: 'Milestone' }
  ];

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveView('course-details');
  };

  const handleCompleteLesson = (xp: number) => {
    setStats(prev => ({ ...prev, xp: prev.xp + xp, completedLessons: prev.completedLessons + 1 }));
    setActiveView('quiz');
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden bg-[#0B0E1E]">
      {activeView === 'onboarding' ? (
        <Onboarding onFinish={() => setActiveView('dashboard')} />
      ) : (
        <>
          <div className="flex-1 pb-24 overflow-y-auto px-4 pt-4 no-scrollbar">
            {activeView === 'dashboard' && (
              <Dashboard 
                stats={stats} 
                courses={courses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))} 
                exams={exams}
                reminders={reminders}
                searchQuery={searchTerm}
                onSearchChange={setSearchTerm}
                onOpenCourse={handleOpenCourse} 
                onOpenExams={() => setActiveView('exams')}
                onAddReminder={(r) => setReminders([...reminders, r])}
                onRemoveReminder={(id) => setReminders(reminders.filter(r => r.id !== id))}
              />
            )}
            {activeView === 'course-details' && selectedCourse && (
              <CourseDetails 
                course={selectedCourse} 
                onBack={() => setActiveView('dashboard')} 
                onStartLesson={() => setActiveView('lesson')}
              />
            )}
            {activeView === 'lesson' && selectedCourse && (
              <LessonView 
                course={selectedCourse} 
                onComplete={handleCompleteLesson} 
                onBack={() => setActiveView('course-details')} 
              />
            )}
            {activeView === 'quiz' && selectedCourse && (
              <QuizView 
                course={selectedCourse} 
                onFinish={() => setActiveView('dashboard')} 
              />
            )}
            {activeView === 'exams' && (
              <ExamTracker exams={exams} onBack={() => setActiveView('dashboard')} />
            )}
            {activeView === 'badges' && (
              <BadgeGallery badges={badges} onBack={() => setActiveView('dashboard')} />
            )}
            {(activeView === 'profile' || activeView === 'more' || activeView === 'sat' || activeView === 'courses') && (
              <Profile 
                stats={stats}
                badges={badges}
                courses={courses}
                onViewBadges={() => setActiveView('badges')}
                onBack={() => setActiveView('dashboard')}
              />
            )}
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-tr from-violet-600 to-sky-400 rounded-2xl shadow-xl flex items-center justify-center floaty z-40 ring-2 ring-white/20"
          >
            <span className="text-2xl">🤖</span>
          </button>
          {isChatOpen && <MiloChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} context={selectedCourse?.name || "General Learning"} />}
          <BottomNav activeView={activeView} onViewChange={setActiveView} />
        </>
      )}
    </div>
  );
};

export default App;