'use client'

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
  isDarkMode?: boolean;
}

export default function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  isDarkMode
}: DashboardCardProps) {
  return (
    <div className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300
      ${isDarkMode 
        ? 'bg-slate-800/50 shadow-xl shadow-black/10 ring-1 ring-white/10 hover:ring-white/20' 
        : 'bg-white shadow-xl shadow-black/5 ring-1 ring-black/5 hover:ring-black/10'}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {title}
          </p>
          <h3 className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-full 
          ${trend === 'up' 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : 'bg-rose-500/10 text-rose-400'}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className={`mt-2 text-sm font-medium ${
        trend === 'up' 
          ? 'text-emerald-400' 
          : 'text-rose-400'
      }`}>
        {change} from last month
      </p>
    </div>
  );
} 