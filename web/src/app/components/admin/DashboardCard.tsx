'use client'

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
}

export default function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  trend
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
      <p className={`mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </p>
    </div>
  );
} 