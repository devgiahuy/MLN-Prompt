'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

function VoteContent() {
  const searchParams = useSearchParams();
  const slotParam = searchParams.get('slot');
  const slot_id = slotParam ? parseInt(slotParam) : 1;

  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async (option: string) => {
    if (isSubmitting || hasVoted) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('votes')
        .insert([{ slot_id, option_selected: option }]);

      if (error) throw error;
      setHasVoted(true);
    } catch (error: any) {
      console.error('Error voting:', error);
      alert('Có lỗi xảy ra: ' + (error.message || JSON.stringify(error)));
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white p-4">
      <div className="py-6 text-center">
        <h1 className="text-xl font-bold text-neutral-400 tracking-widest uppercase">PhiloPrompt</h1>
        <p className="text-sm text-neutral-500 mt-2">Đang mở khóa Khe cắm số {slot_id}</p>
      </div>

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 pb-8">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleVote(opt)}
            disabled={isSubmitting}
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
