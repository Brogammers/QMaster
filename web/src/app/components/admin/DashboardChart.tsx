"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for demonstration
const generateWaitTimeData = () => {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Average Wait Time (minutes)",
        data: [12, 10, 14, 8, 9, 6, 7],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.3,
      },
    ],
  };
};

const generateQueueVolumeData = () => {
  return {
    labels: [
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
    ],
    datasets: [
      {
        label: "Queue Volume",
        data: [15, 30, 45, 60, 75, 80, 65, 55, 40, 35, 25, 10],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };
};

const generateServiceTypeData = () => {
  return {
    labels: [
      "Customer Service",
      "Technical Support",
      "Sales",
      "Returns",
      "Consultation",
    ],
    datasets: [
      {
        label: "Queue Distribution by Service Type",
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export default function DashboardChart({
  isDarkMode,
}: {
  isDarkMode?: boolean;
}) {
  const [chartType, setChartType] = useState<
    "waitTime" | "queueVolume" | "serviceType"
  >("waitTime");

  // Chart options
  const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        titleColor: isDarkMode
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(0, 0, 0, 0.9)",
        bodyColor: isDarkMode
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(0, 0, 0, 0.9)",
        borderColor: isDarkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  };

  // Doughnut chart options (no scales)
  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        titleColor: isDarkMode
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(0, 0, 0, 0.9)",
        bodyColor: isDarkMode
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(0, 0, 0, 0.9)",
        borderColor: isDarkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    },
  };

  return (
    <div
      className={`rounded-xl p-6 backdrop-blur-sm transition-all duration-300
      ${
        isDarkMode
          ? "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]"
          : "bg-white shadow-xl shadow-black/5 ring-1 ring-black/5"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3
          className={`text-lg font-semibold 
          ${isDarkMode ? "text-white/90" : "text-slate-900"}`}
        >
          Queue Analytics
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType("waitTime")}
            className={`px-3 py-1 text-sm rounded-md transition-all
            ${
              chartType === "waitTime"
                ? isDarkMode
                  ? "bg-baby-blue text-white"
                  : "bg-ocean-blue text-white"
                : isDarkMode
                ? "bg-white/10 text-white/70 hover:bg-white/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Wait Time
          </button>
          <button
            onClick={() => setChartType("queueVolume")}
            className={`px-3 py-1 text-sm rounded-md transition-all
            ${
              chartType === "queueVolume"
                ? isDarkMode
                  ? "bg-baby-blue text-white"
                  : "bg-ocean-blue text-white"
                : isDarkMode
                ? "bg-white/10 text-white/70 hover:bg-white/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Queue Volume
          </button>
          <button
            onClick={() => setChartType("serviceType")}
            className={`px-3 py-1 text-sm rounded-md transition-all
            ${
              chartType === "serviceType"
                ? isDarkMode
                  ? "bg-baby-blue text-white"
                  : "bg-ocean-blue text-white"
                : isDarkMode
                ? "bg-white/10 text-white/70 hover:bg-white/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Service Types
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        {chartType === "waitTime" ? (
          <Line options={chartOptions} data={generateWaitTimeData()} />
        ) : chartType === "queueVolume" ? (
          <Bar options={chartOptions} data={generateQueueVolumeData()} />
        ) : (
          <Doughnut
            options={doughnutOptions}
            data={generateServiceTypeData()}
          />
        )}
      </div>
    </div>
  );
}
