import React from 'react';
import { View } from '../App';

export const BottomNav: React.FC<{ activeView: View; onViewChange: (v: View) => void }> = ({ activeView, onViewChange }) => {
  const tabs: { id: View; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'quiz', label: 'Quiz', icon: '✍️' },
    { id: 'sat', label: 'SAT', icon: '🎓' },
    { id: 'profile', label: 'Me', icon: '👤' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0B0E1E] border-t border-white/5 flex justify-around py-3 z-30">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onViewChange(tab.id)} className={`flex flex-col items-center opacity-${activeView === tab.id ? '100' : '40'}`}>
          <span className="text-xl">{tab.icon}</span>
          <span className="text-[10px] font-bold uppercase">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
