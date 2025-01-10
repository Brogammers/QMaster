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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partners</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90">
          <FaPlus /> Add Partner
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search partners..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] focus:outline-none focus:ring-2 focus:ring-crystal-blue"
          />
        </div>
        <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
          <option value="">All Categories</option>
          <option value="healthcare">Healthcare</option>
          <option value="banking">Banking</option>
          <option value="education">Education</option>
        </select>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FaBuilding className="text-gray-400" />
                    <span>{partner.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{partner.category}</td>
                <td className="px-6 py-4">{partner.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    partner.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-300' 
                      : partner.status === 'pending'
                      ? 'bg-amber-500/10 text-amber-300'
                      : 'bg-rose-500/10 text-rose-300'
                  }`}>
                    {partner.status}
                  </span>
                </td>
                <td className="px-6 py-4">{partner.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 