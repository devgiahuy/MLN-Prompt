"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import {
  BrainCircuit,
  Database,
  Cpu,
  ChevronDown,
  Network,
  GitBranch,
  Zap,
  Sparkles,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Module1V2() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden selection:bg-cyan-500/30">
      <HeroSection opacity={heroOpacity} scale={heroScale} />
      <OppositionSection />
      <MindmapSection />
    </div>
  );
}

// Hero Section
function HeroSection({ opacity, scale }: { opacity: any; scale: any }) {
  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent rounded-full" />

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center mt-[-10vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium tracking-wide text-cyan-50">
            Module 1: Scroll-telling Infographic
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500"
        >
          Triết học & AI: <br className="hidden md:block" /> Từ Lý thuyết đến
          Prompting
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
        >
          Khám phá sự giao thoa giữa tư duy biện chứng và trí tuệ nhân tạo.
          <br className="hidden md:block" />
          Bạn hãy cuộn xuống để trực quan hóa triết lý thành dòng chảy dữ liệu.
        </motion.p>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs uppercase tracking-widest">
          Cuộn để bắt đầu
        </span>
        <ChevronDown className="w-5 h-5 text-cyan-500/70" />
      </motion.div>
    </motion.section>
  );
}

// Opposition Section: Vật chất vs Ý thức
function OppositionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // Connect when scrolled past 30% of the section
      setIsConnected((prev) => {
        const next = v > 0.3 && v < 0.9;
        return prev === next ? prev : next;
      });
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] py-24 px-4 sm:px-8 w-full flex flex-col items-center justify-start"
    >
      <div className="sticky top-1/4 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Sự đối lập cốt lõi
          </h2>
          <p className="text-slate-400 text-lg">
            Vật chất (Data) quyết định Ý thức (Prompt/AI Output)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-8 items-center">
          {/* Left: Vật Chất */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center lg:items-end text-center lg:text-right p-8 md:p-10 rounded-3xl bg-cyan-950/20 border border-cyan-500/20 relative overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.05)] will-change-transform"
          >
            <div className="absolute inset-0 bg-grid-cyan-500/[0.03] bg-[size:20px_20px]" />
            <div className="relative z-10 flex flex-col items-center lg:items-end">
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <Database className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold text-cyan-50 mb-2">Vật chất</h3>
              <p className="text-cyan-400/80 uppercase tracking-widest text-sm font-semibold mb-4">
                Dữ liệu & Bối cảnh
              </p>
              <p className="text-slate-400 max-w-sm">
                Thực tại khách quan, bối cảnh thực tế và nguồn dữ liệu đầu vào.
                Đây là nền tảng bắt buộc để AI có thể hiểu được bài toán.
              </p>
            </div>
          </motion.div>

          {/* Center Connection (Desktop Only) */}
          <div className="hidden lg:flex flex-col items-center justify-center relative w-40 h-64">
            <svg width="100%" height="100%" className="absolute inset-0 z-0">
              <motion.path
                d="M 10 128 L 150 128"
                stroke="url(#gradient-line)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="10 10"
                animate={{
                  strokeDashoffset: isConnected ? [0, -20] : 0,
                }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="0%"
                    stopColor="#06b6d4"
                    stopOpacity={isConnected ? "1" : "0.2"}
                  />
                  <stop
                    offset="100%"
                    stopColor="#d946ef"
                    stopOpacity={isConnected ? "1" : "0.2"}
                  />
                </linearGradient>
              </defs>
            </svg>
            {isConnected ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="z-10 bg-slate-900 border border-white/20 rounded-full p-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <ArrowRight className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="z-10 bg-red-950/80 border border-red-500/50 rounded-full p-3 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
              >
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </motion.div>
            )}
          </div>

          {/* Connection Indicator (Mobile Only) */}
          <div className="lg:hidden flex flex-col items-center justify-center h-20 relative">
            <div className="absolute w-1 h-full bg-slate-800" />
            {isConnected ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="z-10 bg-slate-900 border border-white/20 rounded-full p-2"
              >
                <ArrowRight className="w-6 h-6 text-white rotate-90" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="z-10 bg-red-950/50 border border-red-500/50 rounded-full p-2"
              >
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </motion.div>
            )}
          </div>

          {/* Right: Ý thức */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "flex flex-col items-center lg:items-start text-center lg:text-left p-8 md:p-10 rounded-3xl border relative overflow-hidden transition-colors duration-700 ease-out will-change-transform",
              isConnected
                ? "bg-fuchsia-950/20 border-fuchsia-500/20 shadow-[0_0_50px_rgba(217,70,239,0.1)]"
                : "bg-red-950/10 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)]",
            )}
          >
            <div
              className={cn(
                "absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] transition-colors duration-700",
                isConnected
                  ? "from-fuchsia-500/40 via-transparent to-transparent"
                  : "from-red-500/40 via-transparent to-transparent",
              )}
            />

            <div className="relative z-10 flex flex-col items-center lg:items-start">
              <div
                className={cn(
                  "w-20 h-20 rounded-2xl border flex items-center justify-center mb-6 transition-colors duration-700",
                  isConnected
                    ? "bg-fuchsia-500/10 border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.3)]"
                    : "bg-red-500/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]",
                )}
              >
                <BrainCircuit
                  className={cn(
                    "w-10 h-10 transition-colors duration-700",
                    isConnected ? "text-fuchsia-400" : "text-red-500",
                  )}
                />
              </div>
              <h3
                className={cn(
                  "text-3xl font-bold mb-2 transition-colors duration-700",
                  isConnected ? "text-fuchsia-50" : "text-red-50",
                )}
              >
                Ý thức
              </h3>
              <p
                className={cn(
                  "uppercase tracking-widest text-sm font-semibold mb-4 transition-colors duration-700",
                  isConnected ? "text-fuchsia-400/80" : "text-red-500/80",
                )}
              >
                Tư duy & Mục tiêu
              </p>

              <div className="h-32 flex items-center">
                {!isConnected ? (
                  <motion.div
                    animate={{ x: [-2, 2, -2, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.2,
                      repeatDelay: 3,
                    }}
                    className="text-red-400 font-mono text-sm leading-relaxed max-w-sm"
                  >
                    <span className="bg-red-500/20 px-1 font-bold">
                      WARNING:
                    </span>{" "}
                    Thiếu dữ liệu thực tế. <br />
                    Trạng thái: Tư duy rỗng. <br />
                    Nguy cơ sinh ra ảo giác (Hallucination) ở mức cao.
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-400 max-w-sm"
                  >
                    Câu hỏi, mục tiêu đầu ra (Prompt). Khi được nạp đủ dữ liệu
                    nền, Ý thức mới phản ánh đúng thực tại và định hướng AI
                    chính xác.
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator for the connection */}
        <div className="mt-16 text-center text-sm font-medium text-slate-500 tracking-wider">
          <p>CUỘN CHẬM ĐỂ QUAN SÁT SỰ CHUYỂN ĐỔI TRẠNG THÁI</p>
        </div>
      </div>
    </section>
  );
}

// Mindmap Section: Dialectical Mindmap
const nodes = [
  {
    id: "comprehensive",
    title: "Toàn diện",
    icon: Network,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "rgba(96,165,250,0.5)",
    content:
      "Sự vật luôn tồn tại trong các mối liên hệ. Khi viết Prompt, không cung cấp dữ liệu một chiều. Hãy cung cấp bức tranh toàn cảnh: ưu - nhược điểm, yếu tố chủ quan - khách quan để AI không bị ảo giác (hallucination) hoặc thiên kiến.",
  },
  {
    id: "historical",
    title: "Lịch sử - Cụ thể",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "rgba(251,191,36,0.5)",
    content:
      "Không có chân lý trừu tượng. Một Prompt xuất sắc phải được neo chặt vào một không gian, thời gian và đối tượng cụ thể. 'Viết kịch bản sales năm 2024 tại thị trường Việt Nam' sẽ cho ra kết quả hoàn toàn khác với 'Viết kịch bản sales chung chung'.",
  },
  {
    id: "development",
    title: "Phát triển",
    icon: GitBranch,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "rgba(52,211,153,0.5)",
    content:
      "Mọi sự vật đều vận động. Đừng yêu cầu AI giải quyết vấn đề ở trạng thái tĩnh. Hãy thêm tham số thời gian vào Prompt: 'Xu hướng biến đổi của vấn đề này trong 3 năm tới là gì?', 'Giải pháp này có bền vững không?'.",
  },
  {
    id: "practice",
    title: "Thực tiễn",
    icon: Network,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    glow: "rgba(251,146,60,0.5)",
    content:
      "Thực tiễn là cơ sở, động lực và tiêu chuẩn của chân lý. Mọi câu lệnh cuối cùng phải hướng tới việc giải quyết bài toán thực tế. Hãy luôn yêu cầu AI: 'Đánh giá tính khả thi', 'Đưa ra giới hạn tài nguyên' hoặc 'Cung cấp ví dụ có thể áp dụng ngay lập tức'.",
  },
];

function MindmapSection() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [radius, setRadius] = useState(220);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateRadius = () => {
      setRadius(window.innerWidth < 768 ? 140 : 250);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <section className="relative min-h-[120vh] py-24 px-4 sm:px-8 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Bản đồ tư duy Biện chứng
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Click vào từng nguyên lý để khám phá cách áp dụng triết lý biện
            chứng vào kỹ thuật Prompting AI.
          </p>
        </motion.div>

        <div className="relative w-full aspect-square md:aspect-[21/10] max-w-4xl mx-auto flex items-center justify-center">
          {/* Core Node */}
          {isMounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-36 h-36 md:w-48 md:h-48 rounded-full bg-slate-900 border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.1)]"
            >
              <Cpu className="w-12 h-12 text-white mb-2" />
              <span className="font-bold text-sm md:text-lg text-center leading-tight">
                Vấn đề
                <br />
                Cốt lõi
              </span>
            </motion.div>
          )}

          {/* Satellite Nodes */}
          {isMounted && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {nodes.map((node, index) => {
                const angle = index * (360 / nodes.length) - 90; // Start from top
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={node.id}
                    className="absolute z-30 flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.button
                      variants={itemVariants}
                      layoutId={`node-container-${node.id}`}
                      onClick={() => setSelectedNode(node.id)}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0px 0px 30px ${node.glow}`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full border cursor-pointer transition-colors",
                        node.bg,
                        node.border,
                      )}
                    >
                      <motion.div layoutId={`node-icon-${node.id}`}>
                        <node.icon
                          className={cn(
                            "w-8 h-8 md:w-10 md:h-10 mb-2",
                            node.color,
                          )}
                        />
                      </motion.div>
                      <motion.span
                        layoutId={`node-title-${node.id}`}
                        className="text-sm md:text-base font-bold text-white px-2 text-center leading-tight"
                      >
                        {node.title}
                      </motion.span>
                    </motion.button>
                  </div>
                );
              })}

              {/* Connecting Lines */}
              <svg
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                style={{ overflow: "visible" }}
              >
                {nodes.map((node, index) => {
                  const angle = index * (360 / nodes.length) - 90;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  return (
                    <motion.line
                      key={`line-${index}`}
                      variants={itemVariants}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                  );
                })}
              </svg>
            </motion.div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90"
            >
              {nodes
                .filter((n) => n.id === selectedNode)
                .map((node) => (
                  <motion.div
                    key="modal"
                    layoutId={`node-container-${node.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "relative w-full max-w-xl p-8 md:p-10 rounded-3xl border shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden",
                      "bg-slate-900/95",
                      node.border,
                    )}
                  >
                    <div
                      className={cn("absolute inset-0 opacity-10", node.bg)}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-5 mb-8">
                        <motion.div
                          layoutId={`node-icon-${node.id}`}
                          className={cn(
                            "p-4 rounded-2xl border",
                            node.bg,
                            node.border,
                          )}
                        >
                          <node.icon className={cn("w-10 h-10", node.color)} />
                        </motion.div>
                        <motion.h3
                          layoutId={`node-title-${node.id}`}
                          className="text-3xl font-bold text-white"
                        >
                          {node.title}
                        </motion.h3>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-slate-300 leading-relaxed text-lg md:text-xl mb-10">
                          {node.content}
                        </p>

                        <button
                          onClick={() => setSelectedNode(null)}
                          className={cn(
                            "w-full py-4 rounded-2xl font-semibold text-lg transition-all",
                            node.bg,
                            node.color,
                            node.border,
                            "border hover:bg-opacity-20",
                          )}
                        >
                          Đã hiểu nguyên lý
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
