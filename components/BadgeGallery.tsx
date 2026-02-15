import React from 'react';
import { Badge } from '../types';

export const BadgeGallery: React.FC<{ badges: Badge[]; onBack: () => void }> = ({ badges, onBack }) => (
  <div className="space-y-8">
    <button onClick={onBack} className="text-white/50">← Back</button>
    <h2 className="text-2xl font-black">Awards Room</h2>
    <div className="grid grid-cols-2 gap-4">
      {badges.map(badge => (
        <div key={badge.id} className={`glass p-5 rounded-[32px] text-center ${badge.unlocked ? '' : 'opacity-40 grayscale'}`}>
          <div className="text-3xl mb-2">{badge.icon}</div>
          <h4 className="font-bold text-sm">{badge.title}</h4>
          <p className="text-[10px] text-white/40">{badge.description}</p>
        </div>
      ))}
    </div>
  </div>
);
