'use client'

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FaUsers, FaSearch, FaFilter, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { deleteUser, restoreUser } from '@/store/features/userSlice';
import { toast } from 'react-hot-toast';
import AddUserModal from '@/components/admin/AddUserModal';
import type { RootState } from '@/store/store';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Project Manager' | 'Backend Developer' | 'Frontend Developer' | 'Full Stack Developer' | 'PR Manager' | 'UI/UX Designer' | 'QA Engineer' | 'DevOps Engineer' | 'Marketing Manager';
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
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  const [isDarkMode] = useState(() => localStorage.getItem('qmaster-dark-mode') === 'true');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  
  const isAdmin = admin?.email === 'hatemthedev@gmail.com';

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
    toast.success(
      (t) => (
        <div className="flex items-center gap-2">
          <span>User deleted successfully</span>
          <button
            onClick={() => {
              dispatch(restoreUser());
              toast.dismiss(t.id);
            }}
            className="px-2 py-1 bg-white/10 rounded-lg hover:bg-white/20"
          >
            Undo
          </button>
        </div>
      ),
      {
        duration: 5000,
        style: {
          background: isDarkMode ? '#1A1A1A' : 'white',
          color: isDarkMode ? 'white' : 'black',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleAddUser}
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
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 hover:bg-white/[0.05] rounded-lg"
                      >
                        <FaEdit className="text-crystal-blue w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-white/[0.05] rounded-lg"
                      >
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

      <AddUserModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isDarkMode={isDarkMode}
        editUser={editingUser}
      />
    </div>
  );
} 