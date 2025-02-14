"use client";

import React, { useState } from "react";
import {
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import HolidaysModal from "@/components/admin/HolidaysModal";
import AddScheduleModal from "@/components/admin/AddScheduleModal";

interface OpenHours {
  day: string;
  open: string;
  close: string;
}

interface Branch {
  id: number;
  city: string;
  state: string;
  country: string;
  openHours: OpenHours[];
  takesHolidays: boolean;
}

interface Company {
  id: number;
  name: string;
  branches: Branch[];
}

interface EditingSchedule {
  companyId: number;
  branchId: number;
  dayIndex: number;
  openTime: string;
  closeTime: string;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function SchedulesPage() {
  const [isDarkMode] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);
  const [isHolidaysModalOpen, setIsHolidaysModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<{
    name: string;
    city: string;
  }>({ name: "", city: "" });
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "Healthcare Center",
      branches: [
        {
          id: 1,
          city: "Toronto",
          state: "Ontario",
          country: "Canada",
          openHours: DAYS.map((day) => ({
            day,
            open: "09:00",
            close: day === "Sunday" ? "13:00" : "17:00",
          })),
          takesHolidays: true,
        },
        {
          id: 2,
          city: "Vancouver",
          state: "British Columbia",
          country: "Canada",
          openHours: DAYS.map((day) => ({
            day,
            open: "08:30",
            close: day === "Sunday" ? "14:00" : "18:00",
          })),
          takesHolidays: true,
        },
      ],
    },
    {
      id: 2,
      name: "Tech Solutions Inc",
      branches: [
        {
          id: 3,
          city: "San Francisco",
          state: "California",
          country: "USA",
          openHours: DAYS.map((day) => ({
            day,
            open: day === "Saturday" || day === "Sunday" ? "Closed" : "08:00",
            close: day === "Saturday" || day === "Sunday" ? "Closed" : "16:30",
          })),
          takesHolidays: true,
        },
      ],
    },
  ]);
  const [editingSchedule, setEditingSchedule] =
    useState<EditingSchedule | null>(null);

  const handleAddSchedule = (data: {
    companyId: number;
    branchId: number;
    holidays: { name: string; date: string }[];
  }) => {
    const company = companies.find((c) => c.id === data.companyId);
    const branch = company?.branches.find((b) => b.id === data.branchId);

    if (company && branch) {
      // Update the branch's holidays
      const updatedBranches = company.branches.map((b) => {
        if (b.id === branch.id) {
          return {
            ...b,
            takesHolidays: data.holidays.length > 0,
          };
        }
        return b;
      });

      // Update the company
      const updatedCompanies = companies.map((c) => {
        if (c.id === company.id) {
          return {
            ...c,
            branches: updatedBranches,
          };
        }
        return c;
      });

      setCompanies(updatedCompanies);
    }
  };

  const handleSaveSchedule = () => {
    if (!editingSchedule) return;

    const { companyId, branchId, dayIndex, openTime, closeTime } =
      editingSchedule;

    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            branches: company.branches.map((branch) => {
              if (branch.id === branchId) {
                return {
                  ...branch,
                  openHours: branch.openHours.map((hour, index) => {
                    if (index === dayIndex) {
                      return {
                        ...hour,
                        open: openTime,
                        close: closeTime,
                      };
                    }
                    return hour;
                  }),
                };
              }
              return branch;
            }),
          };
        }
        return company;
      })
    );

    setEditingSchedule(null);
  };

  const handleCancelEdit = () => {
    setEditingSchedule(null);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Schedules
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90"
        >
          <FaPlus /> Add Schedule
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    className={`whitespace-nowrap px-6 py-4 text-left text-sm font-medium ${
                      isDarkMode ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Company
                  </th>
                  <th
                    className={`whitespace-nowrap px-6 py-4 text-left text-sm font-medium ${
                      isDarkMode ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Branches
                  </th>
                  <th
                    className={`whitespace-nowrap px-6 py-4 text-right text-sm font-medium ${
                      isDarkMode ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <React.Fragment key={company.id}>
                    <tr
                      onClick={() =>
                        setExpandedCompany(
                          expandedCompany === company.id ? null : company.id
                        )
                      }
                      className={`cursor-pointer transition-colors ${
                        isDarkMode ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"
                      } ${
                        index !== 0
                          ? isDarkMode
                            ? "border-t border-white/10"
                            : "border-t border-slate-200"
                          : ""
                      }`}
                    >
                      <td
                        className={`whitespace-nowrap px-6 py-4 ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FaClock className="text-crystal-blue" />
                          <span>{company.name}</span>
                        </div>
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 ${
                          isDarkMode ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        {company.branches.length}{" "}
                        {company.branches.length === 1 ? "branch" : "branches"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        {expandedCompany === company.id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </td>
                    </tr>
                    {expandedCompany === company.id && (
                      <tr
                        className={
                          isDarkMode
                            ? "border-t border-white/10"
                            : "border-t border-slate-200"
                        }
                      >
                        <td colSpan={3} className="px-6 py-4">
                          <div className="space-y-6">
                            {company.branches.map((branch, branchIndex) => (
                              <div
                                key={branch.id}
                                className={`space-y-4 ${
                                  branchIndex !== 0
                                    ? "pt-6 border-t border-dashed " +
                                      (isDarkMode
                                        ? "border-white/10"
                                        : "border-slate-200")
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <h3
                                    className={`font-medium ${
                                      isDarkMode ? "text-white" : "text-slate-900"
                                    }`}
                                  >
                                    {branch.city}, {branch.state}, {branch.country}
                                  </h3>
                                  <span
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedBranch({
                                        name: company.name,
                                        city: branch.city,
                                      });
                                      setIsHolidaysModalOpen(true);
                                    }}
                                    className={`whitespace-nowrap px-3 py-1 rounded-full text-sm cursor-pointer ${
                                      branch.takesHolidays
                                        ? isDarkMode
                                          ? "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                                          : "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30"
                                        : isDarkMode
                                        ? "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                                        : "bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30"
                                    }`}
                                  >
                                    {branch.takesHolidays
                                      ? "Takes Holidays"
                                      : "Open on Holidays"}
                                  </span>
                                </div>
                                <div
                                  className={`rounded-lg border ${
                                    isDarkMode
                                      ? "border-white/10"
                                      : "border-slate-200"
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
                                            isDarkMode
                                              ? "text-white/70"
                                              : "text-slate-600"
                                          }`}
                                        >
                                          Day
                                        </th>
                                        <th
                                          className={`px-4 py-2 text-left text-sm font-medium ${
                                            isDarkMode
                                              ? "text-white/70"
                                              : "text-slate-600"
                                          }`}
                                        >
                                          Open
                                        </th>
                                        <th
                                          className={`px-4 py-2 text-left text-sm font-medium ${
                                            isDarkMode
                                              ? "text-white/70"
                                              : "text-slate-600"
                                          }`}
                                        >
                                          Close
                                        </th>
                                        <th
                                          className={`px-4 py-2 text-right text-sm font-medium ${
                                            isDarkMode
                                              ? "text-white/70"
                                              : "text-slate-600"
                                          }`}
                                        >
                                          Actions
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {branch.openHours.map((hours, hourIndex) => {
                                        const isEditing =
                                          editingSchedule?.companyId ===
                                            company.id &&
                                          editingSchedule?.branchId === branch.id &&
                                          editingSchedule?.dayIndex === hourIndex;

                                        return (
                                          <tr
                                            key={hours.day}
                                            className={
                                              hourIndex !== 0
                                                ? isDarkMode
                                                  ? "border-t border-white/10"
                                                  : "border-t border-slate-200"
                                                : ""
                                            }
                                          >
                                            <td
                                              className={`px-4 py-2 ${
                                                isDarkMode
                                                  ? "text-white"
                                                  : "text-slate-900"
                                              }`}
                                            >
                                              {hours.day}
                                            </td>
                                            <td
                                              className={`px-4 py-2 ${
                                                isDarkMode
                                                  ? "text-white/70"
                                                  : "text-slate-600"
                                              }`}
                                            >
                                              {isEditing ? (
                                                <input
                                                  type="time"
                                                  value={editingSchedule.openTime}
                                                  onChange={(e) =>
                                                    setEditingSchedule((prev) =>
                                                      prev
                                                        ? {
                                                            ...prev,
                                                            openTime:
                                                              e.target.value,
                                                          }
                                                        : null
                                                    )
                                                  }
                                                  className={`px-2 py-1 rounded border ${
                                                    isDarkMode
                                                      ? "bg-white/[0.02] border-white/[0.1] text-white"
                                                      : "border-slate-200 text-slate-900"
                                                  }`}
                                                />
                                              ) : (
                                                hours.open
                                              )}
                                            </td>
                                            <td
                                              className={`px-4 py-2 ${
                                                isDarkMode
                                                  ? "text-white/70"
                                                  : "text-slate-600"
                                              }`}
                                            >
                                              {isEditing ? (
                                                <input
                                                  type="time"
                                                  value={editingSchedule.closeTime}
                                                  onChange={(e) =>
                                                    setEditingSchedule((prev) =>
                                                      prev
                                                        ? {
                                                            ...prev,
                                                            closeTime:
                                                              e.target.value,
                                                          }
                                                        : null
                                                    )
                                                  }
                                                  className={`px-2 py-1 rounded border ${
                                                    isDarkMode
                                                      ? "bg-white/[0.02] border-white/[0.1] text-white"
                                                      : "border-slate-200 text-slate-900"
                                                  }`}
                                                />
                                              ) : (
                                                hours.close
                                              )}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                              {isEditing ? (
                                                <div className="flex justify-end gap-2">
                                                  <button
                                                    onClick={handleSaveSchedule}
                                                    className={`p-1 rounded hover:bg-white/[0.05] text-emerald-400`}
                                                    title="Save"
                                                  >
                                                    <FaSave />
                                                  </button>
                                                  <button
                                                    onClick={handleCancelEdit}
                                                    className={`p-1 rounded hover:bg-white/[0.05] text-rose-400`}
                                                    title="Cancel"
                                                  >
                                                    <FaTimes />
                                                  </button>
                                                </div>
                                              ) : (
                                                <button
                                                  onClick={() =>
                                                    setEditingSchedule({
                                                      companyId: company.id,
                                                      branchId: branch.id,
                                                      dayIndex: hourIndex,
                                                      openTime:
                                                        hours.open === "Closed"
                                                          ? "09:00"
                                                          : hours.open,
                                                      closeTime:
                                                        hours.close === "Closed"
                                                          ? "17:00"
                                                          : hours.close,
                                                    })
                                                  }
                                                  className={`p-1 rounded hover:bg-white/[0.05] ${
                                                    isDarkMode
                                                      ? "text-white/50"
                                                      : "text-slate-400"
                                                  }`}
                                                  title="Edit"
                                                >
                                                  <FaEdit />
                                                </button>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <HolidaysModal
        isOpen={isHolidaysModalOpen}
        onClose={() => setIsHolidaysModalOpen(false)}
        isDarkMode={isDarkMode}
        branchName={`${selectedBranch.name} - ${selectedBranch.city}`}
      />

      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        isDarkMode={isDarkMode}
        companies={companies}
        onSubmit={handleAddSchedule}
      />
    </div>
  );
}
