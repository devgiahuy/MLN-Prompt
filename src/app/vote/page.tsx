'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

function VoteContent() {
  const searchParams = useSearchParams();
  const slotParam = searchParams.get('slot');
  const initialSlotId = slotParam ? parseInt(slotParam) : 1;

  const [currentSlotId, setCurrentSlotId] = useState(initialSlotId);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Sync with URL parameters if they change externally (e.g. scanning a new QR code)
  useEffect(() => {
    if (slotParam) {
      const paramSlot = parseInt(slotParam);
      if (paramSlot !== currentSlotId) {
        const timer = setTimeout(() => {
          setCurrentSlotId(paramSlot);
          setHasVoted(false);
          setIsSuccess(false);
          setIsGlitching(false);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [slotParam, currentSlotId]);

  // Subscribe to game-control broadcast channel
  useEffect(() => {
    const channel = supabase.channel('game-control');

    channel
      .on('broadcast', { event: 'answer-locked' }, ({ payload }) => {
        console.log('Received game-control broadcast on client:', payload);
        const { slotId, correct, nextSlot } = payload;

        // Only react if the broadcast corresponds to the client's current slot
        if (Number(slotId) === Number(currentSlotId)) {
          if (correct) {
            // Trigger success animation
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
              setHasVoted(false);
              setCurrentSlotId(nextSlot);

              // Update URL search parameters without triggering a full page reload
              const url = new URL(window.location.href);
              url.searchParams.set('slot', nextSlot.toString());
              window.history.pushState({}, '', url.toString());
            }, 1500);
          } else {
            // Trigger glitch/error animation
            setIsGlitching(true);
            setTimeout(() => {
              setIsGlitching(false);
              setHasVoted(false);
            }, 2500);
          }
        }
      })
      .subscribe((status) => {
        console.log(`Subscribed to game-control broadcast for Slot ${currentSlotId}:`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentSlotId]);

  const handleVote = async (option: string) => {
    if (isSubmitting || hasVoted || isGlitching || isSuccess) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('votes')
        .insert([{ slot_id: currentSlotId, option_selected: option }]);

      if (error) throw error;
      setHasVoted(true);
    } catch (err) {
      console.error('Error voting:', err);
      const error = err as { message?: string };
      alert('Có lỗi xảy ra: ' + (error.message || JSON.stringify(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rendering Success Overlay Screen
  if (isSuccess) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-950 text-green-400 p-6 text-center overflow-hidden font-mono select-none">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
            <ShieldCheck size={80} className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" strokeWidth={1.5} />
          </motion.div>

          <h1 className="text-xl md:text-2xl font-black mb-4 tracking-widest uppercase text-green-400">
            [ GIẢI MÃ THÀNH CÔNG ]
          </h1>

          <p className="text-green-300 text-sm md:text-base font-semibold mb-2">
            Nguyên lý được chấp nhận!
          </p>
          <p className="text-green-500 text-xs font-mono uppercase">
            Đang tải dữ liệu khe cắm tiếp theo...
          </p>

          <div className="mt-12 w-full max-w-[200px]">
            <div className="h-1 w-full bg-green-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-400 rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
            </div>
            <p className="text-[10px] text-green-700 mt-2 tracking-widest text-center uppercase">SYNCHRONIZING...</p>
          </div>
        </div>
      </div>
    );
  }

  // Rendering Error Glitch Overlay Screen
  if (isGlitching) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-red-950 text-red-500 p-6 text-center overflow-hidden font-mono select-none animate-pulse">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-ping" />
            <ShieldAlert size={80} className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" strokeWidth={1.5} />
          </motion.div>

          <h1 className="text-xl md:text-2xl font-black mb-4 tracking-widest uppercase text-red-500">
            [ THẤT BẠI ]
          </h1>

          <p className="text-red-400 text-sm md:text-base font-semibold mb-2">
            Ý thức lệch lạc so với thực tiễn khách quan!
          </p>
          <p className="text-red-600 text-xs font-mono uppercase">
            Hệ thống tự động thiết lập lại liên kết...
          </p>

          <div className="mt-12 w-full max-w-[200px]">
            <div className="h-1 w-full bg-red-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </div>
            <p className="text-[10px] text-red-800 mt-2 tracking-widest text-center uppercase">RECONNECTING...</p>
          </div>
        </div>
      </div>
    );
  }

  // Rendering Game Completed Screen
  if (currentSlotId > 4) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-green-400 p-6 text-center overflow-hidden font-mono select-none">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full animate-pulse" />
            <div className="w-24 h-24 rounded-full border-2 border-green-400 flex items-center justify-center bg-neutral-900/90 shadow-[0_0_20px_rgba(74,222,128,0.4)]">
              <ShieldCheck size={56} className="text-green-400 animate-[pulse_2s_infinite]" strokeWidth={1.5} />
            </div>
          </motion.div>

          <h1 className="text-xl font-black mb-4 tracking-widest uppercase text-green-400 text-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
            [ THÀNH CÔNG ]
          </h1>

          <p className="text-green-300 text-sm md:text-base font-semibold mb-6 max-w-xs leading-relaxed">
            Hệ thống trung tâm đã được đồng bộ hóa hoàn toàn. Robot đã thoát khỏi ảo giác của lập luận sai lệch.
          </p>

          <div className="p-4 bg-green-950/40 border border-green-500/35 rounded-2xl w-full text-left">
            <div className="text-xs text-green-500 font-bold uppercase mb-2 border-b border-green-900/60 pb-1">System Log:</div>
            <div className="text-[11px] text-green-400 space-y-1 font-mono">
              <div>&gt; slots_overridden: 4/4 [100%]</div>
              <div>&gt; quantum_state: STABLE</div>
              <div>&gt; prompt_injection: COMPLETE</div>
              <div className="text-green-300 font-bold mt-2 text-center">&gt;&gt; TERMINAL SECURED &lt;&lt;</div>
            </div>
          </div>

          <div className="mt-8 text-[10px] text-green-600 uppercase tracking-widest opacity-60">
            Cảm ơn bạn đã tham gia cứu hộ AI
          </div>
        </div>
      </div>
    );
  }

  // Rendering Waiting Screen after user voted
  if (hasVoted) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-green-500 p-6 text-center overflow-hidden font-mono">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Radar Ping Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/30 rounded-full animate-[ping_3s_ease-out_infinite] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-green-500/10 rounded-full animate-[ping_4s_ease-out_infinite] z-0" />

        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-8 relative"
          >
            {/* Hexagon / Shield Shape glow */}
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
            <ShieldCheck size={80} className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl font-black mb-4 tracking-widest uppercase"
          >
            [ Dữ liệu đã mã hóa ]
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-green-700 text-sm md:text-base font-medium"
          >
            Đang chờ tín hiệu đồng bộ từ hệ thống trung tâm... Hãy quan sát màn hình chính.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 w-full max-w-[200px]"
          >
            <div className="h-1 w-full bg-green-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500 rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
            <p className="text-[10px] text-green-800 mt-2 tracking-widest text-center uppercase">Awaiting Protocol...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const options = ['A', 'B', 'C', 'D'];

  // Rendering Options Selection (Voting Screen)
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white p-4">
      <div className="py-6 text-center border-b border-neutral-900 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-950/50 border border-green-800/40 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-3">
          Module 4: Game Giải Cứu AI
        </div>
        <h1 className="text-xl font-black text-green-400 tracking-widest uppercase">PhiloPrompt Vote</h1>
        <p className="text-xs text-neutral-400 max-w-xs mx-auto mt-2 leading-relaxed">
          Chủ đề: Khắc phục tư duy siêu hình, áp dụng Biện chứng và Thực tiễn vào Prompt Engineering
        </p>
        <p className="text-sm text-green-500 font-bold mt-4 font-mono">
          &gt;&gt; Đang mở khóa: Khe {currentSlotId}/4
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 pb-8">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleVote(opt)}
            disabled={isSubmitting || isGlitching || isSuccess}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl text-6xl font-black shadow-lg active:scale-95 active:bg-neutral-800 transition-all flex items-center justify-center relative overflow-hidden"
          >
            {isSubmitting ? <Loader2 className="animate-spin text-neutral-500" size={48} /> : opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function VotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
      <VoteContent />
    </Suspense>
  );
}
