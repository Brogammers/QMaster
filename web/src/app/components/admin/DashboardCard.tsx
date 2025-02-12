"use client";

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: "up" | "down";
  isDarkMode?: boolean;
}

export default function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  isDarkMode,
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300
      ${
        isDarkMode
          ? "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]"
          : "bg-white shadow-xl shadow-black/5 ring-1 ring-black/5 hover:ring-black/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-sm font-medium ${
              isDarkMode ? "text-white/70" : "text-slate-600"
            }`}
          >
            {title}
          </p>
          <h3
            className={`text-2xl font-bold mt-1 ${
              isDarkMode ? "text-white/90" : "text-slate-900"
            }`}
          >
            {value}
          </h3>
        </div>
        <div
          className={`p-3 rounded-full transition-colors
          ${
            trend === "up"
              ? isDarkMode
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-emerald-500/10 text-emerald-600"
              : isDarkMode
              ? "bg-rose-500/10 text-rose-300"
              : "bg-rose-500/10 text-rose-600"
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p
        className={`mt-2 text-sm font-medium ${
          trend === "up"
            ? isDarkMode
              ? "text-emerald-300"
              : "text-emerald-600"
            : isDarkMode
            ? "text-rose-300"
            : "text-rose-600"
        }`}
      >
        {change} from last month
      </p>
    </div>
  );
}
