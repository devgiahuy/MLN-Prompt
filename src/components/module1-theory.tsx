'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Brain, Sparkles, Activity } from 'lucide-react';

export default function Module1Theory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  // ========== ANIMATION MAPPING (0 to 1) ==========
  
  // 1. Intro (0.0 to 0.3)
  const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, -40]);
  const introPE = useTransform(scrollYProgress, [0, 0.24, 0.25], ["auto", "auto", "none"]);

  // 2. Vật chất / Database (0.3 to 0.6)
  const matOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const matY = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [40, 0, 0, -40]);
  const matPE = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], ["none", "auto", "auto", "none"]);

  // 3. Ý thức / Prompt (0.65 to 1.0)
  const conOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);
  const conY = useTransform(scrollYProgress, [0.65, 0.75, 1], [40, 0, 0]);
  const conPE = useTransform(scrollYProgress, [0.65, 0.75], ["none", "auto"]);

  // Visuals Animation (Right Column)
  const dbScale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);
  const dbOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  const brainScale = useTransform(scrollYProgress, [0.65, 0.75], [0.8, 1]);
  const brainOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  
  const linePathLength = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[180vh] lg:h-[300vh] bg-slate-950">
      {/* STICKY CONTAINER: Locks to viewport while scrolling */}
      <div className="sticky top-0 h-dvh flex items-center overflow-hidden">
        
        {/* Background Grid Pattern - Cyber Vibe */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full max-w-6xl">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="relative h-[400px] lg:h-[450px] flex flex-col justify-center">
            
            {/* SCENE 1: INTRO */}
            <motion.div 
              style={{ opacity: introOpacity, y: introY, pointerEvents: introPE }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 font-medium text-sm w-fit mb-6 shadow-sm">
                <Sparkles size={16} /> Triết học x Trí tuệ nhân tạo
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-slate-100 leading-tight text-balance">
                Philo<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Prompt</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-lg text-pretty">
                Bản chất của AI không phải là phép thuật. Nó là sự phản ánh tư duy của chính bạn thông qua lăng kính <strong className="text-slate-200 font-bold">Triết học Mác-Lênin</strong>.
              </p>
            </motion.div>

            {/* SCENE 2: VẬT CHẤT */}
            <motion.div 
              style={{ opacity: matOpacity, y: matY, pointerEvents: matPE }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                 <span className="text-5xl font-black text-slate-800">01</span>
                 <h2 className="text-4xl font-bold text-slate-100 tracking-tight text-balance">Vật chất</h2>
              </div>
              <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg text-pretty">
                Là tồn tại khách quan. Trong thế giới AI, vật chất chính là <strong className="text-blue-400 font-bold">Cơ sở dữ liệu khổng lồ (Training Data)</strong>.
              </p>
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl border-l-4 border-l-blue-500 shadow-xl max-w-lg">
                <p className="text-lg font-medium text-slate-300 leading-relaxed">
                  "Không có dữ liệu thô, AI không thể sinh câu trả lời."
                </p>
              </div>
            </motion.div>

            {/* SCENE 3: Ý THỨC */}
            <motion.div 
              style={{ opacity: conOpacity, y: conY, pointerEvents: conPE }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6">
                 <span className="text-5xl font-black text-slate-800">02</span>
                 <h2 className="text-4xl font-bold text-slate-100 tracking-tight text-balance">Ý thức</h2>
              </div>
              <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg text-pretty">
                Là sự chủ động của con người. <strong className="text-purple-400 font-bold">Prompt</strong> chính là Ý thức tác động ngược lại Vật chất để định hướng AI trích xuất thông tin có ý nghĩa.
              </p>
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl border-l-4 border-l-purple-500 shadow-xl max-w-lg">
                <p className="text-lg font-medium text-slate-300 leading-relaxed">
                  "Ý thức logic tốt sẽ điều khiển và khai thác tối đa sức mạnh AI."
                </p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Infographic Visuals */}
          <div className="relative h-[450px] items-center justify-end hidden lg:flex">
            <div className="relative w-full max-w-[400px] aspect-square">
               
               {/* SVG Connecting Lines */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="purpleBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                  
                  <motion.path 
                    d="M 140 140 Q 280 140, 280 280" 
                    fill="transparent"
                    stroke="url(#purpleBlueGradient)"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    style={{ pathLength: linePathLength }}
                  />
                  <motion.path 
                    d="M 140 140 Q 280 140, 280 280" 
                    fill="transparent"
                    stroke="rgba(192,132,252,0.3)"
                    strokeWidth="16"
                    style={{ pathLength: linePathLength, filter: "blur(8px)" }}
                  />
               </svg>

               {/* BLOCK 1: Database / Material */}
               <motion.div 
                 style={{ opacity: dbOpacity, scale: dbScale }}
                 className="absolute bottom-0 right-0 w-44 h-44 bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_20px_50px_-10px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center z-10 overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-50" />
                 <Database size={56} className="text-blue-400 mb-3" strokeWidth={1.5} />
                 <span className="font-bold text-blue-300 font-mono tracking-widest text-sm">DATA.RAW</span>
                 <div className="absolute top-4 right-4 flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                 </div>
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />
               </motion.div>

               {/* BLOCK 2: Brain / Consciousness */}
               <motion.div 
                 style={{ opacity: brainOpacity, scale: brainScale }}
                 className="absolute top-0 left-0 w-44 h-44 bg-slate-900 border border-purple-500/50 rounded-3xl shadow-[0_20px_50px_-10px_rgba(168,85,247,0.2)] flex flex-col items-center justify-center z-20 overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-80" />
                 <Brain size={56} className="text-purple-400 mb-3" strokeWidth={1.5} />
                 <span className="font-bold text-purple-300 font-mono tracking-widest text-sm">PROMPT</span>
                 <Activity className="absolute bottom-4 left-4 text-purple-500 opacity-70" size={20} />
               </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}