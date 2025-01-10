'use client'

export default function DashboardChart({ isDarkMode }: { isDarkMode?: boolean }) {
  return (
    <div className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300
      ${isDarkMode 
        ? 'bg-slate-800/50 shadow-xl shadow-black/10 ring-1 ring-white/10' 
        : 'bg-white shadow-xl shadow-black/5 ring-1 ring-black/5'}`}
    >
      <h3 className={`text-lg font-semibold mb-4 
        ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Queue Analytics
      </h3>
      <div className={`h-[300px] flex items-center justify-center 
        ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        Chart placeholder - Add your preferred chart library
      </div>
    </div>
  );
} 