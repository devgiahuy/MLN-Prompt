'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-6 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
           <div className="w-10 h-10 bg-green-500 rounded-full animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Đã ghi nhận!</h1>
        <p className="text-neutral-400 text-lg">Hãy nhìn lên màn hình máy chiếu để xem kết quả của cả lớp.</p>
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
