"use client";

import { useState, useMemo, useContext } from "react";
import { useAdminAuth } from "@/lib/auth/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { deleteUser, restoreUser } from "@/store/features/userSlice";
import { toast } from "react-hot-toast";
import AddUserModal from "@/components/admin/AddUserModal";
import type { RootState } from "@/store/store";
import { UsersContext } from "../../context";

interface User {
  id: number;
  name: string;
  email: string;
  role:
    | "Admin"
    | "Project Manager"
    | "Backend Developer"
    | "Frontend Developer"
    | "Full Stack Developer"
    | "PR Manager"
    | "UI/UX Designer"
    | "QA Engineer"
    | "DevOps Engineer"
    | "Marketing Manager";
  lastActive: string;
  status: "online" | "offline" | "away";
  permissions: {
    canAddUsers: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
  };
}

export default function UsersPage() {
  const { admin } = useAdminAuth();
  const { users: allUsers, setUsers } = useContext(UsersContext);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  const [isDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = admin?.email === "hatemthedev@gmail.com";

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase().trim();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

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
          background: isDarkMode ? "#1A1A1A" : "white",
          color: isDarkMode ? "white" : "black",
          border: isDarkMode
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
        },
      }
    );
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1
          className={`text-2xl lg:text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Users
        </h1>
        <div className="w-full sm:w-auto">
          <button
            onClick={handleAddUser}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${
                !isAdmin
                  ? "opacity-50 cursor-not-allowed bg-gray-500"
                  : "bg-crystal-blue hover:bg-opacity-90"
              } text-black`}
            disabled={!isAdmin}
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          className={`min-w-[800px] ${
            isDarkMode
              ? "border-y border-white/[0.05]"
              : "border-y border-slate-300"
          } overflow-hidden backdrop-blur-sm`}
        >
          <div
            className={`p-4 border-b ${
              isDarkMode ? "border-white/[0.05]" : "border-slate-300"
            }`}
          >
            <div className="relative">
              <FaSearch
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? "text-gray-400" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name, email, or role..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors duration-300
                ${
                  isDarkMode
                    ? "border-white/10 bg-white/[0.09] text-white focus:border-crystal-blue"
                    : "border-slate-300 bg-white/[0.04] text-slate-900 focus:border-crystal-blue"
                } 
                border focus:outline-none focus:ring-2 focus:ring-crystal-blue`}
              />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  isDarkMode ? "border-white/10" : "border-slate-300"
                }`}
              >
                <th
                  className={`px-6 py-3 text-left text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  User
                </th>
                <th
                  className={`px-6 py-3 text-left text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Role
                </th>
                <th
                  className={`px-6 py-3 text-left text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Last Active
                </th>
                <th
                  className={`px-6 py-3 text-left text-sm font-semibold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Status
                </th>
                {isAdmin && (
                  <th
                    className={`px-6 py-3 text-left text-sm font-semibold ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`border-b last:border-b-0 ${
                    isDarkMode
                      ? "border-white/10 hover:bg-white/[0.02]"
                      : "border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${
                          isDarkMode
                            ? "bg-crystal-blue/20"
                            : "bg-crystal-blue/10"
                        } flex items-center justify-center ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          className={`font-medium ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm 
                        ${
                          user.role === "Admin"
                            ? isDarkMode
                              ? "bg-crystal-blue/10 text-crystal-blue"
                              : "bg-crystal-blue/20 text-crystal-blue-700"
                            : user.role === "Project Manager"
                            ? isDarkMode
                              ? "bg-purple-500/10 text-purple-400"
                              : "bg-purple-500/20 text-purple-700"
                            : isDarkMode
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-amber-500/20 text-amber-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "online"
                          ? isDarkMode
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-emerald-500/20 text-emerald-700"
                          : user.status === "away"
                          ? isDarkMode
                            ? "bg-amber-500/10 text-amber-300"
                            : "bg-amber-500/20 text-amber-700"
                          : isDarkMode
                          ? "bg-rose-500/10 text-rose-300"
                          : "bg-rose-500/20 text-rose-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "hover:bg-white/[0.05]"
                              : "hover:bg-slate-100"
                          }`}
                        >
                          <FaEdit
                            className={`w-4 h-4 ${
                              isDarkMode
                                ? "text-crystal-blue"
                                : "text-crystal-blue-600"
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className={`p-2 rounded-lg ${
                            isDarkMode
                              ? "hover:bg-white/[0.05]"
                              : "hover:bg-slate-100"
                          }`}
                        >
                          <FaTrash
                            className={`w-4 h-4 ${
                              isDarkMode ? "text-rose-400" : "text-rose-600"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={isAdmin ? 5 : 4}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
