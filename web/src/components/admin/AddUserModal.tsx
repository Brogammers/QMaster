"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { addUser, updateUser } from "@/store/features/userSlice";
import { FaTimes } from "react-icons/fa";

const ROLES = [
  "Project Manager",
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "PR Manager",
  "UI/UX Designer",
  "QA Engineer",
  "DevOps Engineer",
  "Marketing Manager",
] as const;

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

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  editUser?: User;
}

export default function AddUserModal({
  isOpen,
  onClose,
  isDarkMode,
  editUser,
}: AddUserModalProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Project Manager" as User["role"],
  });

  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name,
        email: editUser.email,
        role: editUser.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Project Manager",
      });
    }
  }, [editUser, isOpen]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const names = e.target.value.split(" ");
    const capitalizedNames = names.map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    );
    setFormData({ ...formData, name: capitalizedNames.join(" ") });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      dispatch(
        updateUser({
          id: editUser.id,
          ...formData,
        })
      );
    } else {
      dispatch(
        addUser({
          ...formData,
          permissions: {
            canAddUsers: false,
            canEditUsers: false,
            canDeleteUsers: false,
          },
        })
      );
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 mx-4 flex items-center justify-center z-50">
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
          isDarkMode
            ? "bg-slate-900 border-white/[0.1]"
            : "bg-white border-slate-200"
        } relative w-full max-w-2xl p-6 rounded-xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {editUser ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 hover:bg-white/[0.05] rounded-lg ${
              isDarkMode ? "text-white/70" : "text-slate-600"
            }`}
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 
              ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
            >
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="First Last (e.g. John Doe)"
              className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                ${
                  isDarkMode
                    ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue placeholder:text-white/30"
                    : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue placeholder:text-slate-400"
                }`}
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 
              ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                ${
                  isDarkMode
                    ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue"
                    : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue"
                }`}
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 
              ${isDarkMode ? "text-white/70" : "text-slate-600"}`}
            >
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as User["role"],
                })
              }
              className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                ${
                  isDarkMode
                    ? "bg-black/20 border border-white/10 text-white focus:border-crystal-blue"
                    : "border border-slate-200 bg-white text-slate-900 focus:border-crystal-blue"
                }`}
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
              {editUser?.role === "Admin" && (
                <option value="Admin">Admin</option>
              )}
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors duration-300
                ${
                  isDarkMode
                    ? "bg-white/[0.02] hover:bg-white/[0.05] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-slate-900"
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              {editUser ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
