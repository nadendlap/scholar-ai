import React, { useState } from 'react';
import { Message } from '../types';
import { getTutorResponse } from '../geminiService';

export const MiloChat: React.FC<{ isOpen: boolean; onClose: () => void; context: string }> = ({ isOpen, onClose, context }) => {
  const [msgs, setMsgs] = useState<Message[]>([{ role: 'assistant', content: `Hi! I'm Milo. Learning ${context} today?`, timestamp: Date.now() }]);
  const [input, setInput] = useState('');

  const send = async () => {
    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMsgs([...msgs, userMsg]);
    setInput('');
    const res = await getTutorResponse([], input, context);
    setMsgs(prev => [...prev, { role: 'assistant', content: res, timestamp: Date.now() }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070A1A]">
      <div className="p-4 border-b border-white/10 flex justify-between glass">
        <h3 className="font-bold">Milo Tutor</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-3xl max-w-[80%] ${m.role === 'user' ? 'bg-sky-500' : 'glass border-white/10'}`}>{m.content}</div>
          </div>
        ))}
      </div>
      <div className="p-4 glass border-t border-white/10 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-white/5 rounded-xl px-4 text-sm" placeholder="Ask anything..." />
        <button onClick={send} className="bg-sky-500 px-4 py-2 rounded-xl font-bold">Send</button>
      </div>
    </div>
  );
};
