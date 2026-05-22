'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Wand2, Layers, Sparkles } from 'lucide-react';

export default function Module2V2() {
   const [state, setState] = useState({
      persona: 'Chuyên gia cố vấn Khởi nghiệp',
      context: 'Dự án phát triển nền tảng e-commerce thực phẩm healthy có tính toán dinh dưỡng. Nguồn lực chỉ là một nhóm sinh viên, thời gian triển khai giới hạn trong 3 tháng. Ngân sách marketing hiện tại bằng 0.',
      task: 'Lập kế hoạch ra mắt một nền tảng thương mại điện tử',
      constraintFormat: 'Kế hoạch hành động',
      constraintLength: 'Ngắn gọn, súc tích',
      customConstraint: '',
      isComprehensive: false,
      isDevelopment: false,
      isHistorical: false,
      isPractical: false
   });

   const handleChange = (key: string, value: string | boolean) => {
      setState(prev => ({ ...prev, [key]: value }));
   };

   const generatePrompt = () => {
      let prompt = `Đóng vai trò: ${state.persona}. \n\n`;
      if (state.context) prompt += `Bối cảnh: ${state.context}. \n`;
      if (state.task) prompt += `Nhiệm vụ: ${state.task}. \n\n`;

      if (state.isComprehensive || state.isDevelopment || state.isHistorical || state.isPractical) {
         prompt += "Triết lý tiếp cận:\n";
         if (state.isComprehensive) prompt += "- Phân tích vấn đề đa chiều: đánh giá cả mặt tích cực lẫn tiêu cực, yếu tố bên trong lẫn bên ngoài, cơ hội và rủi ro.\n";
         if (state.isDevelopment) prompt += "- Không chỉ đưa ra thực trạng hiện tại, mà phải dự báo xu hướng biến đổi và đề xuất lộ trình phát triển trong tương lai.\n";
         if (state.isHistorical) prompt += "- Đặt toàn bộ giải pháp vào đúng không gian, thời gian và điều kiện nguồn lực cụ thể của bối cảnh đã nêu, loại bỏ các giả định lý tưởng hóa.\n";
         if (state.isPractical) prompt += "- Đề cao tính thực tiễn: Lọc bỏ các giả định lý tưởng hóa và lý thuyết suông. Bắt buộc mọi giải pháp/đề xuất phải khả thi, bị ràng buộc bởi giới hạn của nguồn lực thực tế (ngân sách, thời gian, rào cản công nghệ, hoặc giới hạn thể chất con người). Yêu cầu cung cấp các bước hành động cụ thể (actionable steps) và tiêu chí kiểm chứng kết quả.\n";
         prompt += "\n";
      }

      const constraints = [];
      if (state.constraintFormat) constraints.push(`Định dạng: ${state.constraintFormat}`);
      if (state.constraintLength) constraints.push(`Độ dài: ${state.constraintLength}`);
      if (state.customConstraint) constraints.push(`${state.customConstraint}`);

      if (constraints.length > 0) {
         prompt += `Điều kiện:\n- ${constraints.join('\n- ')}\n`;
      }

      return prompt;
   };

   const generatedPrompt = generatePrompt();

   return (
      <section className="min-h-screen bg-[#f8fafc] py-24 px-6 relative overflow-hidden font-mono">
         {/* Ethereal Background Glows */}
         <div className="absolute top-0 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-200/40 via-transparent to-transparent pointer-events-none" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent pointer-events-none" />

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
               <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border border-white/50 text-indigo-500 font-semibold text-sm shadow-sm">
                  <Layers size={16} /> Module 2
               </div>
               <h2 className="text-4xl font-bold tracking-tight text-slate-800">Interactive Prompt Builder</h2>
               <p className="text-xl text-slate-500">Nhào nặn ngôn từ thông qua <span className="font-semibold text-indigo-600">Gương Ma Thuật</span></p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
               {/* Controls - Left Panel (Frosted Glass) */}
               <div className="bg-white/95 p-8 rounded-[2.5rem] border border-white/60 space-y-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">

                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-700">
                     <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold shadow-sm">1</span>
                     Cấu hình Logic
                  </h3>

                  <div className="space-y-6">
                     <div className="space-y-3">
                        <Label className="text-slate-600 font-semibold text-sm">Vai trò (Persona)</Label>
                        <Select value={state.persona} onValueChange={(val: string | null) => { if (val) handleChange('persona', val); }}>
                           <SelectTrigger className="w-full bg-white/90 border-white/60 text-slate-800 h-12 rounded-2xl focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors shadow-sm">
                              <SelectValue placeholder="Chọn vai trò" />
                           </SelectTrigger>
                           <SelectContent className="bg-white/95 backdrop-blur-md border border-slate-200/80 text-slate-700 rounded-2xl shadow-xl min-w-[240px]">
                              <SelectItem value="Chuyên gia cố vấn Khởi nghiệp">Chuyên gia cố vấn Khởi nghiệp</SelectItem>
                              <SelectItem value="Chuyên gia Triết học">Chuyên gia Triết học</SelectItem>
                              <SelectItem value="Sinh viên Gen Z">Sinh viên Gen Z</SelectItem>
                              <SelectItem value="Nhà phê bình công nghệ">Nhà phê bình công nghệ</SelectItem>
                              <SelectItem value="Nhà thiết kế Không gian">Nhà thiết kế Không gian</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-3">
                        <Label className="text-slate-600 font-semibold text-sm">Bối cảnh (Context)</Label>
                        <Textarea
                           value={state.context}
                           onChange={(e) => handleChange('context', e.target.value)}
                           rows={2}
                           className="w-full bg-white/90 border-white/60 text-slate-800 rounded-2xl px-4 py-3 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors resize-none leading-relaxed shadow-sm"
                        />
                     </div>

                     <div className="space-y-3">
                        <Label className="text-slate-600 font-semibold text-sm">Nhiệm vụ (Task)</Label>
                        <Textarea
                           value={state.task}
                           onChange={(e) => handleChange('task', e.target.value)}
                           rows={2}
                           className="w-full bg-white/90 border-white/60 text-slate-800 rounded-2xl px-4 py-3 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-colors resize-none leading-relaxed shadow-sm"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                           <Label className="text-slate-600 font-semibold text-sm">Định dạng</Label>
                           <Input
                              value={state.constraintFormat}
                              onChange={(e) => handleChange('constraintFormat', e.target.value)}
                              className="bg-white/90 border-white/60 text-slate-800 h-11 rounded-2xl focus:ring-indigo-500/50 focus:border-indigo-500 shadow-sm"
                           />
                        </div>
                        <div className="space-y-3">
                           <Label className="text-slate-600 font-semibold text-sm">Độ dài</Label>
                           <Input
                              value={state.constraintLength}
                              onChange={(e) => handleChange('constraintLength', e.target.value)}
                              className="bg-white/90 border-white/60 text-slate-800 h-11 rounded-2xl focus:ring-indigo-500/50 focus:border-indigo-500 shadow-sm"
                           />
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-slate-200/50">
                        <Label className="text-slate-600 font-semibold text-sm">Triết lý Thiết kế (Modifiers)</Label>

                        <div className="flex items-center justify-between p-4 bg-white/80 border border-white/50 rounded-2xl shadow-sm">
                           <div className="space-y-1">
                              <div className="font-semibold text-slate-700">Quan điểm Toàn diện</div>
                              <div className="text-xs text-slate-500 font-medium">Tránh nhìn nhận phiến diện</div>
                           </div>
                           <Switch checked={state.isComprehensive} onCheckedChange={(val) => handleChange('isComprehensive', val)} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/80 border border-white/50 rounded-2xl shadow-sm">
                           <div className="space-y-1">
                              <div className="font-semibold text-slate-700">Quan điểm Phát triển</div>
                              <div className="text-xs text-slate-500 font-medium">Nhìn nhận sự vật trong vận động</div>
                           </div>
                           <Switch checked={state.isDevelopment} onCheckedChange={(val) => handleChange('isDevelopment', val)} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/80 border border-white/50 rounded-2xl shadow-sm">
                           <div className="space-y-1">
                              <div className="font-semibold text-slate-700">Quan điểm Lịch sử - Cụ thể</div>
                              <div className="text-xs text-slate-500 font-medium">Bám sát hoàn cảnh thực tế</div>
                           </div>
                           <Switch checked={state.isHistorical} onCheckedChange={(val) => handleChange('isHistorical', val)} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/80 border border-white/50 rounded-2xl shadow-sm">
                           <div className="space-y-1">
                              <div className="font-semibold text-slate-700">Quan điểm Thực tiễn</div>
                              <div className="text-xs text-slate-500 font-medium">Gắn liền lý luận với thực tế</div>
                           </div>
                           <Switch checked={state.isPractical} onCheckedChange={(val) => handleChange('isPractical', val)} />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Live Preview - Magic Mirror (Right Panel) */}
               <div className="sticky top-24 bg-white/90 p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/80 relative min-h-[600px] flex flex-col overflow-hidden will-change-transform">

                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-white/10 to-rose-100/30 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                     <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/50">
                        <h3 className="text-sm font-bold tracking-widest text-indigo-500 uppercase flex items-center gap-2">
                           <Wand2 size={16} /> Magic Mirror
                        </h3>
                        <Sparkles size={16} className="text-rose-400 opacity-70 animate-pulse" />
                     </div>

                     {/* The Magic Text */}
                     <div className="font-mono text-base sm:text-lg leading-relaxed text-slate-700 flex-1 whitespace-pre-wrap break-words tracking-wide">
                        {generatedPrompt}
                        <motion.span
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                           className="inline-block w-[2px] h-5 bg-indigo-400 ml-1 align-middle rounded-full"
                        />
                     </div>

                     <div className="mt-8 pt-6 border-t border-slate-200/50 flex justify-between items-center text-xs text-slate-400 font-medium tracking-wide">
                        <span>Awaiting input...</span>
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> Syncing</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
