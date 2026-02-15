import React, { useState } from 'react';

export const Onboarding: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const slides = [
    { t: "ScholarAI", d: "Your personalized high school curriculum.", i: "🎓" },
    { t: "ELI5 Mode", d: "Turn complex topics into simple stories.", i: "💡" },
    { t: "AI Drawing", d: "Custom diagrams drawn just for you.", i: "🎨" }
  ];
  return (
    <div className="fixed inset-0 z-[200] bg-[#0B0E1E] p-8 flex flex-col text-center">
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="h-32 w-32 rounded-[48px] bg-sky-500 mx-auto flex items-center justify-center text-6xl shadow-2xl">{slides[step].i}</div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black">{slides[step].t}</h1>
          <p className="text-white/50">{slides[step].d}</p>
        </div>
      </div>
      <button onClick={() => step < 2 ? setStep(step+1) : onFinish()} className="w-full bg-white text-black py-5 rounded-[32px] font-black uppercase tracking-widest">
        {step === 2 ? 'Get Started' : 'Next'}
      </button>
    </div>
  );
};
