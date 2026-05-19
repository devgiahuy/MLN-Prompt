'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import critiqueData from '@/data/critiqueData.json';
import { Layers, Lightbulb, ArrowRight, Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Module3V2() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="min-h-screen bg-[#f8fafc] text-slate-800 py-24 px-6 relative overflow-hidden">
      {/* Background Spatial Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-200/30 blur-[120px] mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-200/40 blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[50%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-indigo-200/20 blur-[100px] mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-teal-600 font-semibold text-sm shadow-sm">
            <Layers size={16} /> Module 3
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 text-balance">
            Live Critique Hub
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto text-pretty font-medium">
            Lật thẻ để bước qua lăng kính <span className="text-rose-500 font-semibold">Siêu hình</span> và khai mở góc nhìn <span className="text-teal-600 font-semibold">Biện chứng</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {critiqueData.map((item) => (
            <div 
              key={item.id}
              className="relative h-[520px] w-full [perspective:1200px] cursor-pointer group"
              onClick={() => toggleFlip(item.id)}
            >
              {/* Inner Card wrapper for 3D flip */}
              <div 
                className={cn(
                  "w-full h-full transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d]",
                  flippedCards[item.id] ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]"
                )}
              >
                {/* FRONT FACE (Normal Prompt - Siêu hình / Rose Theme) */}
                <Card className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white/50 backdrop-blur-2xl border-white/60 p-8 flex flex-col justify-between overflow-hidden rounded-[2rem] shadow-[0_15px_35px_rgba(244,63,94,0.08)]">
                  <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-gradient-to-br from-rose-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/50 text-rose-600 text-xs font-bold uppercase tracking-widest mb-6">
                      Siêu hình
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 text-balance leading-tight">{item.topic}</h3>
                    
                    <div className="space-y-5">
                      <div>
                        <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-2">Prompt Thông Thường</div>
                        <p className="text-[15px] text-slate-600 italic font-serif leading-relaxed">"{item.normalPrompt.prompt}"</p>
                      </div>
                      
                      <div className="p-4 bg-white/60 rounded-2xl border border-white/80 shadow-sm">
                        <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-2">Kết quả</div>
                        <p className="text-[14px] text-slate-600 leading-relaxed">{item.normalPrompt.aiResult}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-6 pt-5 border-t border-slate-200/50">
                    <p className="text-[14px] font-medium text-rose-500 leading-relaxed">
                      <strong className="text-rose-600 font-bold">Critique:</strong> {item.normalPrompt.critique}
                    </p>
                    <div className="mt-5 flex items-center justify-end gap-2 text-sm text-indigo-500 font-semibold transition-transform group-hover:translate-x-1">
                      Phân tích <ArrowRight size={16} />
                    </div>
                  </div>
                </Card>

                {/* BACK FACE (Philo-Prompt - Biện chứng / Teal Theme) */}
                <Card className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white/60 backdrop-blur-3xl border-white/80 p-8 flex flex-col justify-between overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(13,148,136,0.12)]">
                  <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-gradient-to-tr from-teal-200/50 to-transparent rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/60 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6">
                      <Sparkle size={12} className="text-teal-500" /> Biện chứng
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 text-balance leading-tight">{item.topic}</h3>
                    
                    <div className="space-y-5">
                      <div>
                        <div className="text-[11px] text-teal-600/70 uppercase font-bold tracking-wider mb-2">Philo-Prompt</div>
                        <p className="text-[15px] text-teal-900 font-medium leading-relaxed bg-teal-50/50 p-4 rounded-2xl border border-teal-100 shadow-inner italic font-serif">
                          "{item.philoPrompt.prompt}"
                        </p>
                      </div>
                      
                      <div className="p-5 bg-white/80 rounded-2xl border border-teal-100/50 shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-3 opacity-10"><Lightbulb size={40} className="text-teal-500" /></div>
                        <div className="text-[11px] text-teal-600/70 uppercase font-bold tracking-wider mb-2 relative z-10">Kết quả Tối ưu</div>
                        <p className="text-[14px] text-slate-700 leading-relaxed relative z-10">{item.philoPrompt.aiResult}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-6 pt-5 border-t border-slate-200/50 flex justify-between items-center text-sm font-semibold text-teal-600">
                    <span>Đã giải quyết mâu thuẫn</span>
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
