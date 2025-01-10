'use client'

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { FaUsers, FaSearch, FaFilter, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Project Manager' | 'Backend Lead';
  lastActive: string;
  status: 'online' | 'offline' | 'away';
  permissions: {
    canAddUsers: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
  };
}

export default function UsersPage() {
  const { admin } = useAuth();
  const [isDarkMode] = useState(() => localStorage.getItem('qmaster-dark-mode') === 'true');
  
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'Hatem',
      email: 'hatemthedev@gmail.com',
      role: 'Admin',
      lastActive: '2 minutes ago',
      status: 'online',
      permissions: {
        canAddUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
      }
    },
    {
      id: 2,
      name: 'Fam',
      email: 'fam@awadlouis.com',
      role: 'Backend Lead',
      lastActive: '5 minutes ago',
      status: 'online',
      permissions: {
        canAddUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
      }
    },
    {
      id: 3,
      name: 'Tony',
      email: 'tonymakaryousm@gmail.com',
      role: 'Project Manager',
      lastActive: '15 minutes ago',
      status: 'away',
      permissions: {
        canAddUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
      }
    },
  ]);

  const isAdmin = admin?.email === 'hatemthedev@gmail.com';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              const newMode = !isDarkMode;
              localStorage.setItem('qmaster-dark-mode', newMode.toString());
              window.location.reload(); // Simple way to apply the change
            }}
            className={`p-2 rounded-lg transition-all duration-300
              ${isDarkMode 
                ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' 
                : 'bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 hover:bg-gray-50'}`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>

          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${!isAdmin 
                ? 'opacity-50 cursor-not-allowed bg-gray-500' 
                : 'bg-crystal-blue hover:bg-opacity-90'} text-black`}
            disabled={!isAdmin}
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/[0.05]">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] focus:outline-none focus:ring-2 focus:ring-crystal-blue"
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Last Active</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              {isAdmin && <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/10 hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-crystal-blue/20 flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-white/50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm 
                    ${user.role === 'Admin' 
                      ? 'bg-crystal-blue/10 text-crystal-blue'
                      : user.role === 'Project Manager'
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'bg-amber-500/10 text-amber-400'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{user.lastActive}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    user.status === 'online' 
                      ? 'bg-emerald-500/10 text-emerald-300' 
                      : user.status === 'away'
                      ? 'bg-amber-500/10 text-amber-300'
                      : 'bg-rose-500/10 text-rose-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/[0.05] rounded-lg">
                        <FaEdit className="text-crystal-blue w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/[0.05] rounded-lg">
                        <FaTrash className="text-rose-400 w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 