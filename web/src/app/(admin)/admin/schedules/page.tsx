'use client'

import React, { useState } from 'react';
import { FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface OpenHours {
  day: string;
  open: string;
  close: string;
}

interface Branch {
  id: number;
  city: string;
  state: string;
  country: string;
  openHours: OpenHours[];
  takesHolidays: boolean;
}

interface Company {
  id: number;
  name: string;
  branches: Branch[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SchedulesPage() {
  const [isDarkMode] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);
  const [companies] = useState<Company[]>([
    {
      id: 1,
      name: 'Healthcare Center',
      branches: [
        {
          id: 1,
          city: 'Toronto',
          state: 'Ontario',
          country: 'Canada',
          openHours: DAYS.map(day => ({
            day,
            open: '09:00',
            close: day === 'Sunday' ? '13:00' : '17:00'
          })),
          takesHolidays: true
        },
        {
          id: 2,
          city: 'Vancouver',
          state: 'British Columbia',
          country: 'Canada',
          openHours: DAYS.map(day => ({
            day,
            open: '08:30',
            close: day === 'Sunday' ? '14:00' : '18:00'
          })),
          takesHolidays: true
        }
      ]
    },
    {
      id: 2,
      name: 'Tech Solutions Inc',
      branches: [
        {
          id: 3,
          city: 'San Francisco',
          state: 'California',
          country: 'USA',
          openHours: DAYS.map(day => ({
            day,
            open: day === 'Saturday' || day === 'Sunday' ? 'Closed' : '08:00',
            close: day === 'Saturday' || day === 'Sunday' ? 'Closed' : '16:30'
          })),
          takesHolidays: true
        }
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Schedules</h1>
      </div>

      <div className={`rounded-lg ${isDarkMode ? 'border-t border-b border-white/10' : 'border-t border-b border-slate-200'}`}>
        <table className="w-full">
          <thead>
            <tr>
              <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Company</th>
              <th className={`px-6 py-4 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Branches</th>
              <th className={`px-6 py-4 text-right text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <React.Fragment key={company.id}>
                <tr 
                  onClick={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
                  className={`cursor-pointer transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-white/[0.02]' 
                      : 'hover:bg-slate-50'
                  } ${index !== 0 ? isDarkMode ? 'border-t border-white/10' : 'border-t border-slate-200' : ''}`}
                >
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-crystal-blue" />
                      <span>{company.name}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                    {company.branches.length} {company.branches.length === 1 ? 'branch' : 'branches'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {expandedCompany === company.id ? <FaChevronUp /> : <FaChevronDown />}
                  </td>
                </tr>
                {expandedCompany === company.id && (
                  <tr className={isDarkMode ? 'border-t border-white/10' : 'border-t border-slate-200'}>
                    <td colSpan={3} className="px-6 py-4">
                      <div className="space-y-6">
                        {company.branches.map((branch, branchIndex) => (
                          <div key={branch.id} className={`space-y-4 ${
                            branchIndex !== 0 ? 'pt-6 border-t border-dashed ' + (isDarkMode ? 'border-white/10' : 'border-slate-200') : ''
                          }`}>
                            <div className="flex justify-between items-center">
                              <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {branch.city}, {branch.state}, {branch.country}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                branch.takesHolidays
                                  ? isDarkMode 
                                    ? 'bg-amber-500/10 text-amber-300' 
                                    : 'bg-amber-500/20 text-amber-700'
                                  : isDarkMode
                                    ? 'bg-emerald-500/10 text-emerald-300'
                                    : 'bg-emerald-500/20 text-emerald-700'
                              }`}>
                                {branch.takesHolidays ? 'Takes Holidays' : 'Open on Holidays'}
                              </span>
                            </div>
                            <div className={`rounded-lg ${isDarkMode ? 'border border-white/10' : 'border border-slate-200'}`}>
                              <table className="w-full">
                                <thead>
                                  <tr className={isDarkMode ? 'border-b border-white/10' : 'border-b border-slate-200'}>
                                    <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Day</th>
                                    <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Open</th>
                                    <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Close</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {branch.openHours.map((hours, hourIndex) => (
                                    <tr 
                                      key={hours.day}
                                      className={hourIndex !== 0 ? isDarkMode ? 'border-t border-white/10' : 'border-t border-slate-200' : ''}
                                    >
                                      <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{hours.day}</td>
                                      <td className={`px-4 py-2 ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                                        {hours.open}
                                      </td>
                                      <td className={`px-4 py-2 ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                                        {hours.close}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 