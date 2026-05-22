'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Terminal, Code2, Server } from 'lucide-react';

export default function Module2Builder() {
   const [state, setState] = useState({
      persona: 'Chuyên gia Triết học',
      context: 'Trong bối cảnh giảng dạy sinh viên Đại học năm 1',
      task: 'Giải thích khái niệm Vật chất quyết định Ý thức',
      constraintFormat: 'Markdown',
      constraintLength: 'Ngắn gọn, khoảng 300 từ',
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
      let prompt = `Bạn là một chuyên gia trong vai trò: ${state.persona}. \n`;
      if (state.context) prompt += `Trong bối cảnh: ${state.context}. \n`;
      if (state.task) prompt += `Hãy thực hiện nhiệm vụ: ${state.task}. \n`;
      
      prompt += '\n';

      if (state.isComprehensive || state.isDevelopment || state.isHistorical || state.isPractical) {
         prompt += "Triết lý tiếp cận:\n";
         if (state.isComprehensive) prompt += "- Phân tích vấn đề đa chiều: đánh giá cả mặt tích cực lẫn tiêu cực, yếu tố bên trong lẫn bên ngoài, cơ hội và rủi ro.\n";
         if (state.isDevelopment) prompt += "- Không chỉ đưa ra thực trạng hiện tại, mà phải dự báo xu hướng biến đổi và đề xuất lộ trình phát triển trong tương lai.\n";
         if (state.isHistorical) prompt += "- Đặt toàn bộ giải pháp vào đúng không gian, thời gian và điều kiện nguồn lực cụ thể của bối cảnh đã nêu, loại bỏ các giả định lý tưởng hóa.\n";
         if (state.isPractical) prompt += "- Đề cao tính thực tiễn: Lọc bỏ các giả định lý tưởng hóa và lý thuyết suông. Bắt buộc mọi giải pháp/đề xuất phải khả thi, bị ràng buộc bởi giới hạn của nguồn lực thực tế (ngân sách, thời gian, rào cản công nghệ, hoặc giới hạn thể chất con người). Yêu cầu cung cấp các bước hành động cụ thể (actionable steps) và tiêu chí kiểm chứng kết quả.\n";
         prompt += "\n";
      }
      
      const constraints = [];
      if (state.constraintFormat) constraints.push(`Định dạng đầu ra phải là: ${state.constraintFormat}`);
      if (state.constraintLength) constraints.push(`Độ dài văn bản: ${state.constraintLength}`);
      if (state.customConstraint) constraints.push(`${state.customConstraint}`);
      
      if (constraints.length > 0) {
         prompt += `\n[TUÂN THỦ CÁC RÀNG BUỘC SAU]:\n- ${constraints.join('\n- ')}\n`;
      }
      
      return prompt;
   };

   const generatedPrompt = generatePrompt();

   return (
      <section className="min-h-screen bg-slate-900 py-24 px-6 relative border-t border-slate-800">
         {/* Background Effect */}
         <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-800/50 text-blue-400 font-medium text-sm">
                  <Code2 size={16} /> Module 2
               </div>
               <h2 className="text-4xl font-bold tracking-tight text-white">Interactive Prompt Builder</h2>
               <p className="text-xl text-slate-400">Thực hành nguyên lý "Ý thức tác động ngược lại Vật chất"</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
               {/* Controls - Left Panel */}
               <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                  
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-slate-100">
                     <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-sm font-bold">1</span>
                     Cấu hình Prompt
                  </h3>
                  
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <Label className="text-slate-300 font-semibold text-sm">Vai trò (Persona)</Label>
                        <Select value={state.persona} onValueChange={(val: string | null) => { if (val) handleChange('persona', val); }}>
                           <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-slate-100 h-12 rounded-xl focus:ring-blue-500/50 focus:border-blue-500 transition-colors">
                              <SelectValue placeholder="Chọn vai trò" />
                           </SelectTrigger>
                           <SelectContent className="bg-slate-900/95 backdrop-blur-md border border-slate-800 text-slate-200 rounded-2xl shadow-xl min-w-[240px]">
                              <SelectItem value="Chuyên gia Triết học">Chuyên gia Triết học</SelectItem>
                              <SelectItem value="Sinh viên Gen Z">Sinh viên Gen Z</SelectItem>
                              <SelectItem value="Nhà phê bình công nghệ">Nhà phê bình công nghệ</SelectItem>
                              <SelectItem value="Kỹ sư Trí tuệ nhân tạo">Kỹ sư Trí tuệ nhân tạo</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="space-y-3">
                        <Label className="text-slate-300 font-semibold text-sm">Bối cảnh (Context)</Label>
                        <Textarea 
                           value={state.context}
                           onChange={(e) => handleChange('context', e.target.value)}
                           rows={2}
                           className="w-full bg-slate-900 border-slate-700 text-slate-100 rounded-xl px-4 py-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-colors resize-none leading-relaxed"
                        />
                     </div>

                     <div className="space-y-3">
                        <Label className="text-slate-300 font-semibold text-sm">Nhiệm vụ (Task)</Label>
                        <Textarea 
                           value={state.task}
                           onChange={(e) => handleChange('task', e.target.value)}
                           rows={2}
                           className="w-full bg-slate-900 border-slate-700 text-slate-100 rounded-xl px-4 py-3 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-colors resize-none leading-relaxed"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                           <Label className="text-slate-300 font-semibold text-sm">Định dạng (Format)</Label>
                           <Input 
                              value={state.constraintFormat}
                              onChange={(e) => handleChange('constraintFormat', e.target.value)}
                              className="bg-slate-900 border-slate-700 text-slate-100 h-11 rounded-lg focus:ring-blue-500/50 focus:border-blue-500"
                           />
                        </div>
                        <div className="space-y-3">
                           <Label className="text-slate-300 font-semibold text-sm">Độ dài (Length)</Label>
                           <Input 
                              value={state.constraintLength}
                              onChange={(e) => handleChange('constraintLength', e.target.value)}
                              className="bg-slate-900 border-slate-700 text-slate-100 h-11 rounded-lg focus:ring-blue-500/50 focus:border-blue-500"
                           />
                        </div>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-slate-800">
                        <Label className="text-slate-300 font-semibold text-sm">Cấu hình Tối ưu (Philo-Modifiers)</Label>
                        
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors rounded-xl">
                           <div className="space-y-1">
                              <div className="font-medium text-slate-200">Quan điểm Toàn diện</div>
                              <div className="text-xs text-slate-500">Tránh nhìn nhận phiến diện</div>
                           </div>
                           <Switch checked={state.isComprehensive} onCheckedChange={(val) => handleChange('isComprehensive', val)} />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors rounded-xl">
                           <div className="space-y-1">
                              <div className="font-medium text-slate-200">Quan điểm Phát triển</div>
                              <div className="text-xs text-slate-500">Nhìn nhận sự vật trong vận động</div>
                           </div>
                           <Switch checked={state.isDevelopment} onCheckedChange={(val) => handleChange('isDevelopment', val)} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors rounded-xl">
                           <div className="space-y-1">
                              <div className="font-medium text-slate-200">Quan điểm Lịch sử - Cụ thể</div>
                              <div className="text-xs text-slate-500">Bám sát hoàn cảnh thực tế</div>
                           </div>
                           <Switch checked={state.isHistorical} onCheckedChange={(val) => handleChange('isHistorical', val)} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors rounded-xl">
                           <div className="space-y-1">
                              <div className="font-medium text-slate-200">Quan điểm Thực tiễn</div>
                              <div className="text-xs text-slate-500">Gắn liền lý luận với thực tế</div>
                           </div>
                           <Switch checked={state.isPractical} onCheckedChange={(val) => handleChange('isPractical', val)} />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Live Preview - Right Panel */}
               <div className="sticky top-24 bg-[#0d1117] text-slate-300 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 relative min-h-[600px] flex flex-col">
                  {/* Decorative terminal header */}
                  <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
                        <Server size={14} /> philo_engine_v2
                     </div>
                  </div>
                  
                  <h3 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4 flex items-center gap-2">
                     <Terminal size={16} /> Live Preview
                  </h3>
                  
                  <div className="font-mono text-sm sm:text-[15px] leading-relaxed text-emerald-400/90 flex-1 whitespace-pre-wrap break-words">
                     {generatedPrompt}
                     <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="inline-block w-2.5 h-4 bg-emerald-400/80 ml-1 align-middle"
                     />
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 font-mono">
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> status: compiling
                     </div>
                     <span>sys.mem: 42MB</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
