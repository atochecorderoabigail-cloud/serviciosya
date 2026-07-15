import { ReactNode } from "react";

export default function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center p-2 sm:p-4 md:p-6 font-sans">
      <div className="relative w-full max-w-[400px] h-[860px] max-h-[100vh] bg-black rounded-[2.5rem] shadow-2xl p-2.5 sm:p-3 animate-[fadeIn_0.4s_ease]">
        <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50" />
          <div className="w-full h-full overflow-y-auto custom-scrollbar">{children}</div>
        </div>
      </div>
    </div>
  );
}
