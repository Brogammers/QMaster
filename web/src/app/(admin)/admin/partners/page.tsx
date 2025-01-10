'use client'

import { useState } from 'react';
import { FaBuilding, FaPlus, FaSearch } from 'react-icons/fa';

interface Partner {
  id: number;
  name: string;
  category: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
}

export default function PartnersPage() {
  const [partners] = useState<Partner[]>([
    {
      id: 1,
      name: 'City Hospital',
      category: 'Healthcare',
      location: 'New York',
      status: 'active',
      joinedDate: '2024-01-15',
    },
    // Add more partner data
  ]);
  const [isDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Partners</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90">
          <FaPlus /> Add Partner
        </button>
      </div>

      <div className={`${isDarkMode ? 'border-y border-white/[0.05]' : 'border-y border-slate-300'} overflow-hidden backdrop-blur-sm`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-white/[0.05]' : 'border-slate-300'}`}>
          <div className="relative">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search partners..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors duration-300
                ${isDarkMode 
                  ? 'border-white/10 bg-white/[0.09] text-white focus:border-crystal-blue' 
                  : 'border-slate-300 bg-white/[0.04] text-slate-900 focus:border-crystal-blue'} 
                border focus:outline-none focus:ring-2 focus:ring-crystal-blue`}
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-slate-300'}`}>
              <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Partner</th>
              <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Category</th>
              <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Location</th>
              <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Status</th>
              <th className={`px-6 py-3 text-left text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className={`border-b last:border-b-0 ${isDarkMode ? 'border-white/10 hover:bg-white/[0.02]' : 'border-slate-300 hover:bg-slate-50/50'}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-crystal-blue/20' : 'bg-crystal-blue/10'} flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <FaBuilding className="w-4 h-4" />
                    </div>
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{partner.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm 
                    ${partner.category === 'Healthcare' 
                      ? isDarkMode ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-500/20 text-emerald-700'
                      : isDarkMode ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-500/20 text-amber-700'}`}>
                    {partner.category}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{partner.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    partner.status === 'active' 
                      ? isDarkMode ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-500/20 text-emerald-700'
                      : partner.status === 'pending'
                      ? isDarkMode ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-500/20 text-amber-700'
                      : isDarkMode ? 'bg-rose-500/10 text-rose-300' : 'bg-rose-500/20 text-rose-700'
                  }`}>
                    {partner.status}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{partner.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 