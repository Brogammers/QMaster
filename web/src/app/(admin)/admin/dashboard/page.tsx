"use client";

import { useState } from "react";
import { FaUsers, FaBuilding, FaChartLine, FaClock } from "react-icons/fa";
import DashboardCard from "@/app/components/admin/DashboardCard";
import DashboardChart from "@/app/components/admin/DashboardChart";
import RecentPartners from "@/app/components/admin/RecentPartners";

export default function AdminDashboard() {
  // You can implement actual dark mode detection or toggle here
  // For now, we'll use a state variable
  const [isDarkMode] = useState(false);

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="w-full overflow-x-auto">
          <DashboardChart isDarkMode={isDarkMode} />
        </div>
        <div className="w-full overflow-x-auto">
          <RecentPartners />
        </div>
      </div>
    </div>
  );
}
