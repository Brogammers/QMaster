'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface Company {
  id: number;
  name: string;
  branches: Branch[];
}

interface Branch {
  id: number;
  city: string;
  state: string;
  country: string;
  openHours: {
    day: string;
    open: string;
    close: string;
  }[];
  takesHolidays: boolean;
}

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  companies: Company[];
  onSubmit: (data: {
    companyId: number;
    branchId: number;
    holidays: { name: string; date: string }[];
  }) => void;
}

const HOLIDAYS = [
  { name: "New Year's Day", date: "January 1" },
  { name: "Good Friday", date: "Variable" },
  { name: "Victoria Day", date: "Third Monday in May" },
  { name: "Canada Day", date: "July 1" },
  { name: "Labor Day", date: "First Monday in September" },
  { name: "Thanksgiving Day", date: "Second Monday in October" },
  { name: "Christmas Day", date: "December 25" },
  { name: "Boxing Day", date: "December 26" }
];

export default function AddScheduleModal({ isOpen, onClose, isDarkMode, companies, onSubmit }: AddScheduleModalProps) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | ''>('');
  const [selectedBranchId, setSelectedBranchId] = useState<number | ''>('');
  const [selectedHolidays, setSelectedHolidays] = useState<{ name: string; date: string }[]>([]);

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCompanyId && selectedBranchId) {
      onSubmit({
        companyId: selectedCompanyId,
        branchId: selectedBranchId,
        holidays: selectedHolidays
      });
      onClose();
      // Reset form
      setSelectedCompanyId('');
      setSelectedBranchId('');
      setSelectedHolidays([]);
    }
  };

  const toggleHoliday = (holiday: { name: string; date: string }) => {
    setSelectedHolidays(prev => {
      const exists = prev.some(h => h.name === holiday.name);
      if (exists) {
        return prev.filter(h => h.name !== holiday.name);
      } else {
        return [...prev, holiday];
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`${
          isDarkMode ? 'bg-slate-900 border-white/[0.1]' : 'bg-white border-slate-200'
        } relative w-full max-w-2xl p-6 rounded-xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Add Schedule
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 hover:bg-white/[0.05] rounded-lg ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
              Select Company
            </label>
            <select
              value={selectedCompanyId}
              onChange={(e) => {
                setSelectedCompanyId(Number(e.target.value) || '');
                setSelectedBranchId('');
              }}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              } focus:outline-none focus:border-crystal-blue`}
              required
            >
              <option value="">Select a company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCompany && (
            <div>
              <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                Select Branch
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(Number(e.target.value) || '')}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                    : 'bg-white border-slate-200 text-slate-900'
                } focus:outline-none focus:border-crystal-blue`}
                required
              >
                <option value="">Select a branch</option>
                {selectedCompany.branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.city}, {branch.state}, {branch.country}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedBranchId && (
            <div>
              <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                Select Holidays
              </label>
              <div className={`rounded-lg border ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                <table className="w-full">
                  <thead>
                    <tr className={isDarkMode ? 'border-b border-white/10' : 'border-b border-slate-200'}>
                      <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Holiday</th>
                      <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Date</th>
                      <th className={`px-4 py-2 text-center text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOLIDAYS.map((holiday, index) => (
                      <tr 
                        key={holiday.name}
                        className={index !== 0 ? isDarkMode ? 'border-t border-white/10' : 'border-t border-slate-200' : ''}
                      >
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{holiday.name}</td>
                        <td className={`px-4 py-2 ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>{holiday.date}</td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedHolidays.some(h => h.name === holiday.name)}
                            onChange={() => toggleHoliday(holiday)}
                            className="rounded border-gray-300 text-crystal-blue focus:ring-crystal-blue"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'border-white/[0.1] text-white/70 hover:bg-white/[0.05]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
            >
              Add Schedule
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 