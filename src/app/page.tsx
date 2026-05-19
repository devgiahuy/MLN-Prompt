import Module1V2 from "@/components/module1-v2";
import Module2V2 from "@/components/module2-v2";
import Module3V2 from "@/components/module3-v2";
import Module4Game from "@/components/module4-game";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-blue-200">
      <Module1V2 />
      <Module2V2 />
      <Module3V2 />
      <Module4Game />
    </main>
  );
}
