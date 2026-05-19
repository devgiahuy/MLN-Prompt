'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import critiqueData from '@/data/critiqueData.json';
import { BrainCircuit, AlertTriangle, Sparkles, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Module3Critique() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="min-h-screen bg-slate-950 text-slate-100 py-24 px-6 relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium text-sm">
            <BrainCircuit size={16} className="text-emerald-400" /> Module 3
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">
            Live Critique Hub
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto text-pretty">
            Chạm vào thẻ để đối chiếu kết quả giữa tư duy <span className="text-red-400 font-semibold">Siêu hình</span> và tư duy <span className="text-emerald-400 font-semibold">Biện chứng</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {critiqueData.map((item) => (
            <div 
              key={item.id}
              className="relative h-[480px] w-full [perspective:1000px] cursor-pointer group"
              onClick={() => toggleFlip(item.id)}
            >
              {/* Inner Card wrapper for 3D flip */}
              <div 
                className={cn(
                  "w-full h-full transition-transform duration-700 [transform-style:preserve-3d]",
                  flippedCards[item.id] ? "[transform:rotateY(180deg)]" : ""
                )}
              >
                {/* FRONT FACE (Normal Prompt - Siêu hình) */}
                <Card className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-900/60 border-red-900/30 p-6 flex flex-col justify-between overflow-hidden group-hover:border-red-500/50 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <AlertTriangle size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs font-bold tracking-wider text-red-500 uppercase mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Lỗi Siêu hình
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-6 text-balance">{item.topic}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Prompt Thông Thường:</div>
                        <p className="text-sm text-slate-300 italic">"{item.normalPrompt.prompt}"</p>
                      </div>
                      
                      <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase font-semibold mb-1">AI Trả Về:</div>
                        <p className="text-sm text-slate-400">{item.normalPrompt.aiResult}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-6 pt-4 border-t border-red-900/30">
                    <p className="text-sm font-medium text-red-400">
                      <strong className="text-red-500 uppercase text-xs">Critique:</strong> {item.normalPrompt.critique}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
                      Nhấn để lật <MoveRight size={14} />
                    </div>
                  </div>
                </Card>

                {/* BACK FACE (Philo-Prompt - Biện chứng) */}
                <Card className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900/90 border-emerald-500/30 p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)] group-hover:border-emerald-400/60 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles size={120} className="text-emerald-500" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs font-bold tracking-wider text-emerald-400 uppercase mb-4 flex items-center gap-2">
                      <Sparkles size={14} />
                      Tư duy Biện chứng
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-6 text-balance">{item.topic}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-emerald-500/70 uppercase font-semibold mb-1">Philo-Prompt:</div>
                        <p className="text-sm text-emerald-100 font-medium leading-relaxed bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/50">"{item.philoPrompt.prompt}"</p>
                      </div>
                      
                      <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 shadow-inner">
                        <div className="text-xs text-emerald-500/70 uppercase font-semibold mb-2">Kết quả Tối ưu:</div>
                        <p className="text-sm text-slate-300 leading-relaxed">{item.philoPrompt.aiResult}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-6 pt-4 border-t border-emerald-900/30 flex justify-between items-center text-xs text-emerald-500/50 font-medium">
                    <span>Đã giải quyết mâu thuẫn</span>
                    <span>Nhấn để quay lại</span>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
