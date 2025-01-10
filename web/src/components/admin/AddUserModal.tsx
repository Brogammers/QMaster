'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addUser } from '@/store/features/userSlice';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function AddUserModal({ isOpen, onClose, isDarkMode }: AddUserModalProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Project Manager' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser({
      ...formData,
      permissions: {
        canAddUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
      },
    }));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50
              ${isDarkMode 
                ? 'bg-[#1A1A1A] border border-white/10' 
                : 'bg-white'} rounded-xl p-6 shadow-xl`}
          >
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Add New User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 
                  ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                    ${isDarkMode 
                      ? 'border border-white/10 bg-white/[0.02] text-white' 
                      : 'border border-slate-200 bg-white text-slate-900'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 
                  ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                    ${isDarkMode 
                      ? 'border border-white/10 bg-white/[0.02] text-white' 
                      : 'border border-slate-200 bg-white text-slate-900'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 
                  ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                    ${isDarkMode 
                      ? 'border border-white/10 bg-white/[0.02] text-white' 
                      : 'border border-slate-200 bg-white text-slate-900'}`}
                >
                  <option value="Project Manager">Project Manager</option>
                  <option value="Backend Lead">Backend Lead</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-lg 
                    ${isDarkMode 
                      ? 'bg-white/[0.02] hover:bg-white/[0.05] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-slate-900'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
                >
                  Add User
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 