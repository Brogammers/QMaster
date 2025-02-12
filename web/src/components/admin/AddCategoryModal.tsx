"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStore,
  FaHospital,
  FaUniversity,
  FaLandmark,
  FaShoppingBag,
  FaCode,
  FaIndustry,
  FaPlane,
  FaHotel,
  FaUtensils,
  FaCar,
  FaGraduationCap,
  FaFootballBall,
  FaPaintBrush,
  FaMusic,
  FaTimes,
} from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  partnersCount: number;
  status: "active" | "inactive";
}

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSubmit: (categoryData: {
    name: string;
    description: string;
    icon: string;
    status: "active" | "inactive";
  }) => void;
  initialData?: Category | null;
}

const ICONS = [
  { name: "store", icon: FaStore, label: "Store" },
  { name: "hospital", icon: FaHospital, label: "Hospital" },
  { name: "university", icon: FaUniversity, label: "University" },
  { name: "landmark", icon: FaLandmark, label: "Landmark" },
  { name: "shopping", icon: FaShoppingBag, label: "Shopping" },
  { name: "code", icon: FaCode, label: "Code" },
  { name: "industry", icon: FaIndustry, label: "Industry" },
  { name: "travel", icon: FaPlane, label: "Travel" },
  { name: "hotel", icon: FaHotel, label: "Hotel" },
  { name: "restaurant", icon: FaUtensils, label: "Restaurant" },
  { name: "automotive", icon: FaCar, label: "Automotive" },
  { name: "education", icon: FaGraduationCap, label: "Education" },
  { name: "sports", icon: FaFootballBall, label: "Sports" },
  { name: "arts", icon: FaPaintBrush, label: "Arts" },
  { name: "entertainment", icon: FaMusic, label: "Entertainment" },
];

export default function AddCategoryModal({
  isOpen,
  onClose,
  isDarkMode,
  onSubmit,
  initialData,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  // Populate form with initial data when editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setSelectedIcon(initialData.icon);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      icon: selectedIcon,
      status,
    });
    onClose();
    // Reset form
    setName("");
    setDescription("");
    setSelectedIcon("");
    setStatus("active");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const words = e.target.value.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    setName(capitalizedWords.join(" "));
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
          isDarkMode
            ? "bg-slate-900 border-white/[0.1]"
            : "bg-white border-slate-200"
        } relative w-full max-w-lg p-6 rounded-xl border shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {initialData ? "Edit Category" : "Add Category"}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-white/70" : "text-slate-600"
              }`}
            >
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-white/[0.02] border-white/[0.1] text-white"
                  : "bg-white border-slate-200 text-slate-900"
              } focus:outline-none focus:border-crystal-blue`}
              required
            />
          </div>

          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-white/70" : "text-slate-600"
              }`}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-white/[0.02] border-white/[0.1] text-white"
                  : "bg-white border-slate-200 text-slate-900"
              } focus:outline-none focus:border-crystal-blue`}
              rows={3}
              required
            />
          </div>

          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-white/70" : "text-slate-600"
              }`}
            >
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {ICONS.map(({ name, icon: Icon, label }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedIcon(name)}
                  className={`p-3 rounded-lg border ${
                    selectedIcon === name
                      ? "bg-crystal-blue/20 border-crystal-blue text-crystal-blue"
                      : isDarkMode
                      ? "bg-white/[0.02] border-white/[0.1] text-white/70 hover:bg-white/[0.05]"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                  title={label}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                isDarkMode ? "text-white/70" : "text-slate-600"
              }`}
            >
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "active" | "inactive")
              }
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "bg-white/[0.02] border-white/[0.1] text-white"
                  : "bg-white border-slate-200 text-slate-900"
              } focus:outline-none focus:border-crystal-blue`}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? "border-white/[0.1] text-white/70 hover:bg-white/[0.05]"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
            >
              {initialData ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
