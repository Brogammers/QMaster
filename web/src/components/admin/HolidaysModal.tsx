"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface HolidaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  branchName: string;
}

const HOLIDAYS = [
  { name: "New Year's Day", date: "January 1" },
  { name: "Good Friday", date: "Variable" },
  { name: "Victoria Day", date: "Third Monday in May" },
  { name: "Canada Day", date: "July 1" },
  { name: "Labor Day", date: "First Monday in September" },
  { name: "Thanksgiving Day", date: "Second Monday in October" },
  { name: "Christmas Day", date: "December 25" },
  { name: "Boxing Day", date: "December 26" },
];

export default function HolidaysModal({
  isOpen,
  onClose,
  isDarkMode,
  branchName,
}: HolidaysModalProps) {
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
            Holidays - {branchName}
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

        <div className="space-y-4">
          <p
            className={`text-sm ${
              isDarkMode ? "text-white/70" : "text-slate-600"
            }`}
          >
            This branch observes the following holidays:
          </p>
          <div
            className={`rounded-lg border ${
              isDarkMode ? "border-white/10" : "border-slate-200"
            }`}
          >
            <table className="w-full">
              <thead>
                <tr
                  className={
                    isDarkMode
                      ? "border-b border-white/10"
                      : "border-b border-slate-200"
                  }
                >
                  <th
                    className={`px-4 py-2 text-left text-sm font-medium ${
                      isDarkMode ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Holiday
                  </th>
                  <th
                    className={`px-4 py-2 text-left text-sm font-medium ${
                      isDarkMode ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {HOLIDAYS.map((holiday, index) => (
                  <tr
                    key={holiday.name}
                    className={
                      index !== 0
                        ? isDarkMode
                          ? "border-t border-white/10"
                          : "border-t border-slate-200"
                        : ""
                    }
                  >
                    <td
                      className={`px-4 py-2 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {holiday.name}
                    </td>
                    <td
                      className={`px-4 py-2 ${
                        isDarkMode ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      {holiday.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
