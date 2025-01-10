'use client'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-crystal-blue/20 border-t-crystal-blue rounded-full animate-spin" />
        <p className="text-white/70">Loading...</p>
      </div>
    </div>
  );
} 