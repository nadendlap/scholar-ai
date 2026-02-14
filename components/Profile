import React, { useState } from 'react';
import { UserStats, Badge, Course } from '../types';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

interface Props { stats: UserStats; badges: Badge[]; courses: Course[]; onViewBadges: () => void; onBack: () => void; }

const activityData = [{ day: 'Mon', xp: 120 }, { day: 'Tue', xp: 250 }, { day: 'Wed', xp: 180 }, { day: 'Thu', xp: 400 }, { day: 'Fri', xp: 320 }, { day: 'Sat', xp: 500 }, { day: 'Sun', xp: 420 }];

export const Profile: React.FC<Props> = ({ stats, badges, onViewBadges, onBack }) => {
  const [showGuide, setShowGuide] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const files = [
    { name: 'index.html', folder: 'root' }, { name: 'index.tsx', folder: 'root' }, { name: 'App.tsx', folder: 'root' },
    { name: 'types.ts', folder: 'root' }, { name: 'geminiService.ts', folder: 'root' }, { name: 'metadata.json', folder: 'root' },
    { name: 'Dashboard.tsx', folder: 'components' }, { name: 'LessonView.tsx', folder: 'components' },
    { name: 'QuizView.tsx', folder: 'components' }, { name: 'MiloChat.tsx', folder: 'components' },
    { name: 'BottomNav.tsx', folder: 'components' }, { name: 'CourseDetails.tsx', folder: 'components' },
    { name: 'ExamTracker.tsx', folder: 'components' }, { name: 'BadgeGallery.tsx', folder: 'components' },
    { name: 'Onboarding.tsx', folder: 'components' },
  ];

  if (showGuide) return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center gap-4"><button onClick={() => setShowGuide(false)}>←</button><h2 className="font-bold">Preparation Guide</h2></header>
      <div className="glass p-5 rounded-3xl space-y-4">
        <h3 className="text-emerald-400 font-black text-xs uppercase">Deployment Costs</h3>
        <div className="flex justify-between text-sm"><span>Web App Hosting</span><span className="text-emerald-400">$0 / Free</span></div>
        <div className="flex justify-between text-sm"><span>App Stores</span><span>$124 Registration</span></div>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-black text-white/30 uppercase">File Checklist</p>
        {files.map(f => (
          <button key={f.name} onClick={() => setChecklist({...checklist, [f.name]: !checklist[f.name]})} className={`w-full p-4 glass rounded-2xl flex gap-3 ${checklist[f.name] ? 'bg-emerald-500/10' : ''}`}>
             <span>{checklist[f.name] ? '✅' : '📄'}</span><span className="text-sm font-bold">{f.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <header className="flex justify-between"><button onClick={onBack}>←</button><h2 className="font-bold">My Profile</h2><div className="w-10" /></header>
      <div className="glass p-8 rounded-[40px] text-center border-sky-500/10">
        <div className="h-24 w-24 rounded-[32px] bg-sky-500 mx-auto mb-4 flex items-center justify-center text-4xl">🎓</div>
        <h1 className="text-2xl font-black">Alex Thompson</h1>
        <p className="text-xs text-white/40 uppercase font-bold mt-1">Grade 11 • WCPSS</p>
        <div className="mt-8 h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-sky-500 rounded-full" style={{width: '65%'}} /></div>
      </div>
      <button onClick={() => setShowGuide(true)} className="w-full glass p-5 rounded-[28px] border-emerald-500/20 bg-emerald-500/5 flex items-center gap-4">
        <div className="text-2xl">💾</div><div className="text-left"><p className="text-sm font-black text-emerald-400">Launch Preparation</p><p className="text-[10px] text-white/40 uppercase">Files & Cost Checklist</p></div>
      </button>
      <div className="grid grid-cols-3 gap-3">
        {[{l: 'Streak', v: stats.streak}, {l: 'Lessons', v: stats.completedLessons}, {l: 'Level', v: stats.level}].map(i => (
          <div key={i.l} className="glass p-4 rounded-3xl text-center"><p className="text-lg font-black">{i.v}</p><p className="text-[8px] uppercase text-white/30">{i.l}</p></div>
        ))}
      </div>
    </div>
  );
};
