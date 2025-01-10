'use client'

import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaBuilding } from 'react-icons/fa';

interface Schedule {
  id: number;
  partnerName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

export default function SchedulesPage() {
  const [schedules] = useState<Schedule[]>([
    {
      id: 1,
      partnerName: 'City Hospital',
      date: '2024-02-20',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      status: 'upcoming',
    },
    // Add more schedules
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schedules</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90">
            <FaCalendarAlt /> Add Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-crystal-blue/10 text-crystal-blue">
                  <FaBuilding />
                </div>
                <div>
                  <h3 className="font-semibold">{schedule.partnerName}</h3>
                  <p className="text-sm text-white/50">{schedule.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                schedule.status === 'upcoming' 
                  ? 'bg-amber-500/10 text-amber-300'
                  : schedule.status === 'in-progress'
                  ? 'bg-crystal-blue/10 text-crystal-blue'
                  : 'bg-emerald-500/10 text-emerald-300'
              }`}>
                {schedule.status}
              </span>
            </div>
            <div className="flex items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{schedule.startTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>{schedule.endTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 