'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSubmit: (data: {
    name: string;
    branches: {
      city: string;
      state: string;
      country: string;
      openHours: {
        day: string;
        open: string;
        close: string;
      }[];
      takesHolidays: boolean;
    }[];
  }) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function AddScheduleModal({ isOpen, onClose, isDarkMode, onSubmit }: AddScheduleModalProps) {
  const [name, setName] = useState('');
  const [branches, setBranches] = useState([{
    city: '',
    state: '',
    country: '',
    openHours: DAYS.map(day => ({ day, open: '09:00', close: '17:00' })),
    takesHolidays: true
  }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      branches
    });
    onClose();
    // Reset form
    setName('');
    setBranches([{
      city: '',
      state: '',
      country: '',
      openHours: DAYS.map(day => ({ day, open: '09:00', close: '17:00' })),
      takesHolidays: true
    }]);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value.split(' ');
    const capitalizedWords = words.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    setName(capitalizedWords.join(' '));
  };

  const addBranch = () => {
    setBranches([...branches, {
      city: '',
      state: '',
      country: '',
      openHours: DAYS.map(day => ({ day, open: '09:00', close: '17:00' })),
      takesHolidays: true
    }]);
  };

  const removeBranch = (index: number) => {
    setBranches(branches.filter((_, i) => i !== index));
  };

  const updateBranch = (index: number, field: string, value: string | boolean) => {
    const newBranches = [...branches];
    newBranches[index] = { ...newBranches[index], [field]: value };
    setBranches(newBranches);
  };

  const updateHours = (branchIndex: number, dayIndex: number, field: 'open' | 'close', value: string) => {
    const newBranches = [...branches];
    newBranches[branchIndex].openHours[dayIndex][field] = value;
    setBranches(newBranches);
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
              Company Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              } focus:outline-none focus:border-crystal-blue`}
              required
            />
          </div>

          <div className="space-y-6">
            {branches.map((branch, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Branch {index + 1}
                  </h3>
                  {branches.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBranch(index)}
                      className="text-rose-400 hover:text-rose-500"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                      City
                    </label>
                    <input
                      type="text"
                      value={branch.city}
                      onChange={(e) => updateBranch(index, 'city', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                          : 'bg-white border-slate-200 text-slate-900'
                      } focus:outline-none focus:border-crystal-blue`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={branch.state}
                      onChange={(e) => updateBranch(index, 'state', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                          : 'bg-white border-slate-200 text-slate-900'
                      } focus:outline-none focus:border-crystal-blue`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                      Country
                    </label>
                    <input
                      type="text"
                      value={branch.country}
                      onChange={(e) => updateBranch(index, 'country', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                          : 'bg-white border-slate-200 text-slate-900'
                      } focus:outline-none focus:border-crystal-blue`}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                    Operating Hours
                  </label>
                  <div className={`rounded-lg border ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                    <table className="w-full">
                      <thead>
                        <tr className={isDarkMode ? 'border-b border-white/10' : 'border-b border-slate-200'}>
                          <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Day</th>
                          <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Open</th>
                          <th className={`px-4 py-2 text-left text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Close</th>
                        </tr>
                      </thead>
                      <tbody>
                        {branch.openHours.map((hours, dayIndex) => (
                          <tr 
                            key={hours.day}
                            className={dayIndex !== 0 ? isDarkMode ? 'border-t border-white/10' : 'border-t border-slate-200' : ''}
                          >
                            <td className={`px-4 py-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{hours.day}</td>
                            <td className="px-4 py-2">
                              <input
                                type="time"
                                value={hours.open}
                                onChange={(e) => updateHours(index, dayIndex, 'open', e.target.value)}
                                className={`px-2 py-1 rounded border ${
                                  isDarkMode 
                                    ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                                    : 'bg-white border-slate-200 text-slate-900'
                                } focus:outline-none focus:border-crystal-blue`}
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="time"
                                value={hours.close}
                                onChange={(e) => updateHours(index, dayIndex, 'close', e.target.value)}
                                className={`px-2 py-1 rounded border ${
                                  isDarkMode 
                                    ? 'bg-white/[0.02] border-white/[0.1] text-white' 
                                    : 'bg-white border-slate-200 text-slate-900'
                                } focus:outline-none focus:border-crystal-blue`}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={branch.takesHolidays}
                      onChange={(e) => updateBranch(index, 'takesHolidays', e.target.checked)}
                      className="rounded border-gray-300 text-crystal-blue focus:ring-crystal-blue"
                    />
                    <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                      Takes Holidays
                    </span>
                  </label>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addBranch}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'border-white/[0.1] text-white/70 hover:bg-white/[0.05]'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              } flex items-center justify-center gap-2`}
            >
              <FaPlus />
              <span>Add Branch</span>
            </button>
          </div>

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