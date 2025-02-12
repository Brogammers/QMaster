"use client";

export default function DashboardChart({
  isDarkMode,
}: {
  isDarkMode?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300
      ${
        isDarkMode
          ? "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]"
          : "bg-white shadow-xl shadow-black/5 ring-1 ring-black/5"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 
        ${isDarkMode ? "text-white/90" : "text-slate-900"}`}
      >
        Queue Analytics
      </h3>
      <div
        className={`h-[300px] flex items-center justify-center 
        ${isDarkMode ? "text-white/50" : "text-slate-600"}`}
      >
        Chart placeholder - Add your preferred chart library
      </div>
    </div>
  );
}
