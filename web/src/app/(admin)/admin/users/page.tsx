'use client'

import { useState } from 'react';
import { FaUsers, FaSearch, FaFilter } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'online' | 'offline' | 'away';
}

export default function UsersPage() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      lastActive: '2 minutes ago',
      status: 'online',
    },
    // Add more users
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-lg hover:bg-white/[0.04]">
            <FaFilter /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90">
            Export
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
                <td className="px-6 py-4">{user.role}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 