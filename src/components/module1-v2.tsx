'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Sparkles, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Module1V2() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  // ========== Ethereal Animations ==========
  
  // 1. Intro (0.0 to 0.3)
  const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, -60]);
  const introScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
  const introPE = useTransform(scrollYProgress, [0, 0.24, 0.25], ["auto", "auto", "none"]);

  // 2. Vật chất / Database (0.3 to 0.6) - Float up from bottom
  const matOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const matY = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [80, 0, 0, -80]);
  const matScale = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0.95, 1, 1, 0.95]);
  const matPE = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], ["none", "auto", "auto", "none"]);

  // 3. Ý thức / Prompt (0.65 to 1.0) - Float up from bottom
  const conOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);
  const conY = useTransform(scrollYProgress, [0.65, 0.75, 1], [80, 0, 0]);
  const conScale = useTransform(scrollYProgress, [0.65, 0.75, 1], [0.95, 1, 1]);
  const conPE = useTransform(scrollYProgress, [0.65, 0.75], ["none", "auto"]);

  // Visuals Animation (Right Column)
  const dbY = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);
  const dbOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  const brainY = useTransform(scrollYProgress, [0.65, 0.75], [50, 0]);
  const brainOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  
  const linePathLength = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  
  // Background Orbs Parallax
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section ref={containerRef} className="relative h-[180vh] lg:h-[300vh] bg-[#f8fafc] selection:bg-rose-200">
      <div className="sticky top-0 h-dvh flex items-center overflow-hidden">
        
        {/* Ethereal Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div 
              style={{ y: orb1Y }}
              className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-300/30 blur-[120px] mix-blend-multiply" 
           />
           <motion.div 
              style={{ y: orb2Y }}
              className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-300/30 blur-[120px] mix-blend-multiply" 
           />
           <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-teal-200/20 blur-[100px] mix-blend-multiply animate-pulse" />
           <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full max-w-6xl">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="relative h-[400px] lg:h-[500px] flex flex-col justify-center">
            
            {/* SCENE 1: INTRO */}
            <motion.div 
              style={{ opacity: introOpacity, y: introY, scale: introScale, pointerEvents: introPE }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-indigo-500 font-semibold text-sm w-fit mb-8 shadow-sm">
                <Sparkles size={16} className="text-rose-400" /> Kỷ nguyên Không gian Mới
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-slate-800 leading-tight text-balance">
                Philo<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-rose-400">Prompt</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-lg text-pretty font-medium">
                Vẻ đẹp của AI nằm ở cách con người chạm vào nó. Khám phá triết học thông qua giao diện <strong className="text-indigo-600">thanh khiết và tinh tế</strong>.
              </p>
            </motion.div>

            {/* SCENE 2: VẬT CHẤT */}
            <motion.div 
              style={{ opacity: matOpacity, y: matY, scale: matScale, pointerEvents: matPE }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                 <span className="text-6xl font-light text-slate-300">01</span>
                 <h2 className="text-5xl font-bold text-slate-800 tracking-tight text-balance">Vật chất</h2>
              </div>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg text-pretty">
                Nền tảng tĩnh lặng. Mọi dải dữ liệu thô (Data) đang chờ đợi được đánh thức bởi một tư duy sắc bén.
              </p>
              <div className="p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-lg">
                <p className="text-lg font-medium text-slate-600 leading-relaxed italic">
                  "Không có khối dữ liệu khổng lồ, AI tựa như một tấm gương mờ không thể phản chiếu ánh sáng."
                </p>
              </div>
            </motion.div>

            {/* SCENE 3: Ý THỨC */}
            <motion.div 
              style={{ opacity: conOpacity, y: conY, scale: conScale, pointerEvents: conPE }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                 <span className="text-6xl font-light text-rose-200">02</span>
                 <h2 className="text-5xl font-bold text-slate-800 tracking-tight text-balance">Ý thức</h2>
              </div>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg text-pretty">
                Tia sáng của con người. <strong className="text-rose-500 font-semibold">Prompt</strong> thổi hồn vào vật chất, nhào nặn hàng tỷ tham số thành tri thức hữu hình.
              </p>
              <div className="p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                   <Wand2 size={80} className="text-rose-400" />
                </div>
                <p className="text-lg font-medium text-slate-600 leading-relaxed italic relative z-10">
                  "Chính chiều sâu của câu hỏi sẽ quyết định sự rực rỡ của câu trả lời."
                </p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Infographic Visuals */}
          <div className="relative h-[500px] items-center justify-end hidden lg:flex">
            <div className="relative w-full max-w-[450px] aspect-square">
               
               {/* Soft Curved Connecting Line */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 450 450" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="etherealLine" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#fb7185" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <motion.path 
                    d="M 120 330 C 250 330, 200 120, 330 120" 
                    fill="transparent"
                    stroke="url(#etherealLine)"
                    strokeWidth="3"
                    filter="url(#glow)"
                    strokeLinecap="round"
                    style={{ pathLength: linePathLength }}
                  />
               </svg>

               {/* BLOCK 1: Database Glass Card */}
               <motion.div 
                 style={{ opacity: dbOpacity, y: dbY }}
                 className="absolute bottom-8 left-0 w-48 h-56 bg-white/20 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center z-10 overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/50 to-transparent" />
                 <div className="w-16 h-16 rounded-2xl bg-white/50 shadow-inner flex items-center justify-center mb-4">
                    <Database size={32} className="text-indigo-400" strokeWidth={1.5} />
                 </div>
                 <span className="font-medium text-indigo-900 tracking-wide">Data Matrix</span>
                 <span className="text-xs text-indigo-400/80 mt-1">RAW</span>
               </motion.div>

               {/* BLOCK 2: Brain Glass Card */}
               <motion.div 
                 style={{ opacity: brainOpacity, y: brainY }}
                 className="absolute top-8 right-0 w-48 h-56 bg-white/30 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(251,113,133,0.15)] flex flex-col items-center justify-center z-20 overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 to-transparent" />
                 <div className="w-16 h-16 rounded-2xl bg-white/60 shadow-inner flex items-center justify-center mb-4">
                    <Wand2 size={32} className="text-rose-500" strokeWidth={1.5} />
                 </div>
                 <span className="font-medium text-rose-900 tracking-wide">Human Prompt</span>
                 <span className="text-xs text-rose-400/80 mt-1">INTENT</span>
               </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
