import React, { useRef, useState, useEffect } from 'react';
import { analyzeImage } from '../geminiService.ts';
import { LessonContent } from '../types.ts';

interface Props { onResult: (content: LessonContent) => void; onBack: () => void; }

export const SmartScan: React.FC<Props> = ({ onResult, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  };

  const capture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setLoading(true);
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0);
    
    const base64 = canvasRef.current.toDataURL('image/jpeg', 0.8).split(',')[1];
    
    try {
      const content = await analyzeImage(base64);
      onResult(content);
    } catch (err) {
      setError("Failed to analyze image. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="absolute top-6 left-6 z-10">
        <button onClick={onBack} className="h-12 w-12 glass rounded-2xl flex items-center justify-center text-white text-xl">✕</button>
      </div>

      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[80%] h-[60%] border-2 border-white/20 rounded-3xl relative">
            <div className="absolute inset-0 border-2 border-sky-500/50 rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>

      <div className="p-8 bg-black flex flex-col items-center gap-6">
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest text-center">Point camera at your notes or textbook</p>
        <button 
          onClick={capture}
          disabled={loading}
          className="h-20 w-20 rounded-full border-4 border-white flex items-center justify-center group active:scale-90 transition-all"
        >
          <div className="h-16 w-16 bg-white rounded-full group-hove
