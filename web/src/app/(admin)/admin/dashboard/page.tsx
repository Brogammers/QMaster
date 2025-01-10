'use client'

import { FaUsers, FaBuilding, FaChartLine, FaClock } from 'react-icons/fa';
import DashboardCard from '@/app/components/admin/DashboardCard';
import DashboardChart from '@/app/components/admin/DashboardChart';
import RecentPartners from '@/app/components/admin/RecentPartners';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Partners"
          value="1,234"
          change="+12%"
          icon={FaBuilding}
          trend="up"
        />
        <DashboardCard
          title="Active Users"
          value="45.2K"
          change="+23%"
          icon={FaUsers}
          trend="up"
        />
        <DashboardCard
          title="Avg. Wait Time"
          value="8.5 min"
          change="-5%"
          icon={FaClock}
          trend="down"
        />
        <DashboardCard
          title="Queue Efficiency"
          value="94%"
          change="+3%"
          icon={FaChartLine}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart />
        <RecentPartners />
      </div>
    </div>
  );
} 