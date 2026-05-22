import Module1V2 from "@/components/module1-v2";
import Module2V2 from "@/components/module2-v2";
import Module3V2 from "@/components/module3-v2";
import Module4Game from "@/components/module4-game";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-blue-200 relative">
      {/* Floating Button for AI Report */}
      <Link 
        href="/ai-report" 
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md text-slate-100 hover:bg-slate-800 transition-all shadow-xl hover:scale-105 active:scale-95 text-xs sm:text-sm font-semibold font-sans"
      >
        <FileText size={16} className="text-cyan-400" />
        <span>Báo cáo AI Usage</span>
      </Link>

      <Module1V2 />
      <Module2V2 />
      <Module3V2 />
      <Module4Game />
    </main>
  );
}
