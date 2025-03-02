"use client";

import { useState, useEffect } from "react";
import {
  FaCog,
  FaBell,
  FaLock,
  FaGlobe,
  FaFingerprint,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface UserProfile {
  name: string;
  email: string;
}

export default function SettingsPage() {
  const [isDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isComingSoonEnabled, setIsComingSoonEnabled] = useState(false);
  const [isMaintenanceEnabled, setIsMaintenanceEnabled] = useState(false);
  const [maintenanceHours, setMaintenanceHours] = useState(2);
  const [maintenanceMinutes, setMaintenanceMinutes] = useState(0);
  const [isDurationChanged, setIsDurationChanged] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
  });
  const [deviceLanguage, setDeviceLanguage] = useState("");
  const [deviceTimezone, setDeviceTimezone] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState("");
  const [pendingAction, setPendingAction] = useState<{
    type: "maintenance" | "comingSoon";
    value: boolean;
  } | null>(null);

  // Check if biometric auth is available
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  // Fetch user profile and device settings on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/admin/profile");
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    // Get device language
    const language = navigator.language || "en";
    const displayLanguage =
      new Intl.DisplayNames([language], { type: "language" }).of(
        language.split("-")[0]
      ) || "English";
    setDeviceLanguage(displayLanguage);

    // Get device timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setDeviceTimezone(timezone);

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const checkBiometricAvailability = async () => {
      try {
        if (window.PublicKeyCredential) {
          const available =
            await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setIsBiometricAvailable(available);
        }
      } catch (error) {
        console.error("Biometric check failed:", error);
        setIsBiometricAvailable(false);
      }
    };

    checkBiometricAvailability();
  }, []);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS || "";
    axios
      .get(url)
      .then((response) => {
        setIsMaintenanceEnabled(response.data.isMaintenanceMode);
        setIsComingSoonEnabled(response.data.isComingSoonMode);

        // Set maintenance duration if available
        if (response.data.maintenanceDuration) {
          const totalMinutes = response.data.maintenanceDuration;
          setMaintenanceHours(Math.floor(totalMinutes / 60));
          setMaintenanceMinutes(totalMinutes % 60);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch settings:", error);
      });
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: window.location.hostname,
          userVerification: "required",
        },
      });

      if (credential) {
        // Authentication successful
        handleSuccessfulAuth();
      }
    } catch (error) {
      console.error("Biometric auth failed:", error);
      setAuthError("Biometric authentication failed. Please try password.");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_LOGIN || "";
      const response = await axios.post(url, {
        email,
        password,
      });

      if (response.status === 200) {
        handleSuccessfulAuth();
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      } else {
        setAuthError("Incorrect password");
      }
    } catch (error) {
      setAuthError("Authentication failed");
    }
  };

  const handleSuccessfulAuth = () => {
    // Calculate total minutes from hours and minutes
    const maintenanceDuration = maintenanceHours * 60 + maintenanceMinutes;

    if (pendingAction) {
      if (pendingAction.type === "maintenance") {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS || "";

        // Don't allow enabling maintenance mode with zero duration
        if (pendingAction.value && maintenanceDuration === 0) {
          setPendingAction(null);
          setIsAuthModalOpen(false);
          setPassword("");
          setAuthError("");
          setEmail("");
          toast.error(
            "Please set a maintenance duration before enabling maintenance mode."
          );
          return;
        }

        axios
          .put(url, {
            isMaintenanceMode: pendingAction.value,
            isComingSoonMode: pendingAction.value ? false : isComingSoonEnabled, // Disable coming soon mode if enabling maintenance
            maintenanceDuration: maintenanceDuration, // Always send duration regardless of mode
          })
          .then((response) => {
            if (response.status === 200) {
              // Update state first
              setIsMaintenanceEnabled(response.data.isMaintenanceMode);

              // If we're enabling maintenance mode and coming soon was enabled, update that state too
              if (pendingAction.value && isComingSoonEnabled) {
                setIsComingSoonEnabled(false);
              }

              // Show a single toast with the complete message
              if (pendingAction.value && isComingSoonEnabled) {
                toast.success(
                  "Maintenance mode enabled and Coming soon mode has been disabled"
                );
              } else {
                toast.success(
                  `Maintenance mode ${
                    pendingAction.value ? "enabled" : "disabled"
                  } successfully!`
                );
              }

              return response.data;
            } else {
              throw new Error("Failed to update maintenance mode");
            }
          })
          .catch((error) => {
            console.error("Failed to update maintenance mode:", error);
            toast.error("Failed to update maintenance mode. Please try again.");
          });
      } else {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS || "";
        axios
          .put(url, {
            isMaintenanceMode: pendingAction.value
              ? false
              : isMaintenanceEnabled, // Disable maintenance mode if enabling coming soon
            isComingSoonMode: pendingAction.value,
            maintenanceDuration: maintenanceDuration,
          })
          .then((response) => {
            if (response.status === 200) {
              // Update state first
              setIsComingSoonEnabled(response.data.isComingSoonMode);

              // If we're enabling coming soon mode and maintenance was enabled, update that state too
              if (pendingAction.value && isMaintenanceEnabled) {
                setIsMaintenanceEnabled(false);
              }

              // Show a single toast with the complete message
              if (pendingAction.value && isMaintenanceEnabled) {
                toast.success(
                  "Coming soon mode enabled and Maintenance mode has been disabled"
                );
              } else {
                toast.success(
                  `Coming soon mode ${
                    pendingAction.value ? "enabled" : "disabled"
                  } successfully!`
                );
              }

              return response.data;
            } else {
              throw new Error("Failed to update coming soon mode");
            }
          })
          .catch((error) => {
            console.error("Failed to update coming soon mode:", error);
            toast.error("Failed to update coming soon mode. Please try again.");
          });
      }
      setPendingAction(null);
      setIsAuthModalOpen(false);
      setPassword("");
      setAuthError("");
      setEmail("");
    }
  };

  const handleToggle = (type: "maintenance" | "comingSoon", value: boolean) => {
    // Check if trying to enable a mode while the other is already enabled
    if (value) {
      if (type === "maintenance" && isComingSoonEnabled) {
        // User is trying to enable maintenance mode while coming soon mode is active
        setPendingAction({ type, value });
        setIsConflictModalOpen(true);
        return;
      } else if (type === "comingSoon" && isMaintenanceEnabled) {
        // User is trying to enable coming soon mode while maintenance mode is active
        setPendingAction({ type, value });
        setIsConflictModalOpen(true);
        return;
      }
    }

    // If no conflict or disabling a mode, proceed to authentication
    setPendingAction({ type, value });
    setIsAuthModalOpen(true);
  };

  const handleConflictResolution = (shouldDisableOther: boolean) => {
    setIsConflictModalOpen(false);

    if (shouldDisableOther) {
      // User chose to disable the other mode
      if (pendingAction?.type === "maintenance") {
        // Disable coming soon mode first, then proceed with enabling maintenance mode
        setIsAuthModalOpen(true);
      } else if (pendingAction?.type === "comingSoon") {
        // Disable maintenance mode first, then proceed with enabling coming soon mode
        setIsAuthModalOpen(true);
      }
    } else {
      // User chose not to proceed
      setPendingAction(null);
    }
  };

  const handleMaintenanceHoursChange = (value: number) => {
    setMaintenanceHours(value);
    setIsDurationChanged(true);
  };

  const handleMaintenanceMinutesChange = (value: number) => {
    setMaintenanceMinutes(value);
    setIsDurationChanged(true);
  };

  const handleSaveDuration = () => {
    const maintenanceDuration = maintenanceHours * 60 + maintenanceMinutes;

    // Don't allow saving zero duration if maintenance mode is enabled
    if (isMaintenanceEnabled && maintenanceDuration === 0) {
      toast.error("Please set a maintenance duration greater than zero.");
      return;
    }

    const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS || "";
    axios
      .put(url, {
        isMaintenanceMode: isMaintenanceEnabled,
        isComingSoonMode: isComingSoonEnabled,
        maintenanceDuration: maintenanceDuration,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsDurationChanged(false);
          toast.success("Maintenance duration updated successfully!");
        } else {
          throw new Error("Failed to update maintenance duration");
        }
      })
      .catch((error) => {
        console.error("Failed to update maintenance duration:", error);
        toast.error("Failed to update maintenance duration. Please try again.");
      });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Settings
        </h1>
      </div>

      {/* Tabs Container */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex space-x-1 bg-white/[0.02] rounded-lg p-1 w-fit min-w-full sm:min-w-0">
          {["general", "notifications", "security", "integrations", "api"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-black px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${
                    activeTab === tab
                      ? "bg-crystal-blue text-black"
                      : "hover:bg-white/[0.05]"
                  }`}
              >
                {tab === "api"
                  ? "API & Integrations"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-transparent border border-white/[0.05] rounded-xl p-4 sm:p-6">
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none cursor-not-allowed text-coal-black font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none cursor-not-allowed text-coal-black font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between opacity-75">
                  <div>
                    <h4 className="font-medium">Language</h4>
                    <p className="text-sm text-slate-700">
                      Using device language settings
                    </p>
                  </div>
                  <select
                    disabled
                    className="px-4 py-2 rounded-lg border border-white/10 bg-white/20 cursor-not-allowed text-coal-black font-medium"
                    value={deviceLanguage.toLowerCase()}
                  >
                    <option
                      value={deviceLanguage.toLowerCase()}
                      className="text-coal-black"
                    >
                      {deviceLanguage}
                    </option>
                  </select>
                </div>
                <div className="flex items-center justify-between opacity-75">
                  <div>
                    <h4 className="font-medium">Time Zone</h4>
                    <p className="text-sm text-slate-700">
                      Using device time zone
                    </p>
                  </div>
                  <select
                    disabled
                    className="px-4 py-2 rounded-lg border border-white/10 bg-white/20 cursor-not-allowed text-coal-black font-medium"
                    value={deviceTimezone}
                  >
                    <option value={deviceTimezone} className="text-coal-black">
                      {deviceTimezone.replace("_", " ")}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            {/* Notification Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-1 md:p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-slate-700">
                      Receive important alerts and updates via email
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable email notifications</span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-1 md:p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">In-App Notifications</h4>
                    <p className="text-sm text-slate-700">
                      Receive notifications within the QMaster portal
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable in-app notifications</span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-1 md:p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-slate-700">
                      Receive push notifications on your mobile device
                    </p>
                  </div>
                  <Switch
                    checked={false}
                    onChange={() => {}}
                    className={`bg-gray-200 relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable push notifications</span>
                    <span
                      className={`translate-x-[2px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
              </div>
            </div>

            {/* Notification Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Notification Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Queue Alerts</h4>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">Enable queue alerts</span>
                      <span
                        className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="queue-threshold"
                        checked={true}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="queue-threshold"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Queue threshold exceeded
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="wait-time"
                        checked={true}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="wait-time"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Wait time above average
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="queue-empty"
                        checked={false}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="queue-empty"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Queue empty for extended period
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">System Notifications</h4>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">
                        Enable system notifications
                      </span>
                      <span
                        className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="maintenance"
                        checked={true}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="maintenance"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Scheduled maintenance
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="system-updates"
                        checked={true}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="system-updates"
                        className="ml-2 text-sm text-slate-700"
                      >
                        System updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="security-alerts"
                        checked={true}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="security-alerts"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Security alerts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Partner Activity</h4>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">
                        Enable partner activity notifications
                      </span>
                      <span
                        className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="new-partner"
                        checked={true}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="new-partner"
                        className="ml-2 text-sm text-slate-700"
                      >
                        New partner registration
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="partner-settings"
                        checked={true}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="partner-settings"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Partner settings changes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="partner-inactivity"
                        checked={false}
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="partner-inactivity"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Partner inactivity alerts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Analytics & Reports</h4>
                    <Switch
                      checked={false}
                      onChange={() => {}}
                      className={`bg-gray-200 relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">
                        Enable analytics notifications
                      </span>
                      <span
                        className={`translate-x-[2px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="space-y-2 opacity-50">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="weekly-report"
                        checked={false}
                        disabled
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="weekly-report"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Weekly performance reports
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="monthly-summary"
                        checked={false}
                        disabled
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="monthly-summary"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Monthly summary
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="custom-metrics"
                        checked={false}
                        disabled
                        className="h-4 w-4 text-crystal-blue rounded border-gray-300 focus:ring-crystal-blue"
                      />
                      <label
                        htmlFor="custom-metrics"
                        className="ml-2 text-sm text-slate-700"
                      >
                        Custom metrics alerts
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Alert Thresholds */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Custom Alert Thresholds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <h4 className="font-medium mb-3">Queue Length Threshold</h4>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-slate-700">
                      Alert when queue exceeds
                    </p>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      defaultValue={25}
                      className="w-20 px-2 py-1 rounded-md border-none bg-white text-coal-black font-medium text-center focus:outline-none focus:ring-1 focus:ring-baby-blue"
                    />
                    <p className="text-sm text-slate-700">customers</p>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <h4 className="font-medium mb-3">Wait Time Threshold</h4>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-slate-700">
                      Alert when wait time exceeds
                    </p>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      defaultValue={15}
                      className="w-20 px-2 py-1 rounded-md border-none bg-white text-coal-black font-medium text-center focus:outline-none focus:ring-1 focus:ring-baby-blue"
                    />
                    <p className="text-sm text-slate-700">minutes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Notifications</h3>
                <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                  Mark all as read
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                <div className="p-3 bg-white/[0.02] rounded-lg border-l-4 border-crystal-blue">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">System Update Scheduled</h4>
                    <span className="text-xs text-slate-700">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">
                    A system update is scheduled for tomorrow at 2:00 AM UTC.
                    Expected downtime: 30 minutes.
                  </p>
                </div>

                <div className="p-3 bg-white/[0.02] rounded-lg border-l-4 border-amber-500">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Queue Threshold Exceeded</h4>
                    <span className="text-xs text-slate-700">5 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">
                    Partner &quot;City Cafe&quot; has exceeded the queue
                    threshold with 32 customers in line.
                  </p>
                </div>

                <div className="p-3 bg-white/[0.02] rounded-lg border-l-4 border-green-500 opacity-70">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">New Partner Registration</h4>
                    <span className="text-xs text-slate-700">Yesterday</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">
                    &quot;Urban Bistro&quot; has completed registration and is
                    awaiting approval.
                  </p>
                </div>

                <div className="p-3 bg-white/[0.02] rounded-lg border-l-4 border-red-500 opacity-70">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Security Alert</h4>
                    <span className="text-xs text-slate-700">2 days ago</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">
                    Multiple failed login attempts detected for admin account.
                    IP: 192.168.1.254
                  </p>
                </div>

                <div className="p-3 bg-white/[0.02] rounded-lg border-l-4 border-purple-500 opacity-70">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Partner Settings Changed</h4>
                    <span className="text-xs text-slate-700">3 days ago</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">
                    &quot;Downtown Deli&quot; has updated their operating hours
                    and service categories.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                  View all notifications
                </button>
              </div>
            </div>

            {/* Notification Delivery Schedule */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Notification Delivery Schedule
              </h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Quiet Hours</h4>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable quiet hours</span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none text-coal-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none text-coal-black font-medium"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-slate-700">
                    During quiet hours, only critical notifications will be
                    delivered.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all">
                Save Notification Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Password Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Password Management</h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your current password"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none text-coal-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none text-coal-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none text-coal-black font-medium"
                    />
                  </div>
                  <div className="pt-2">
                    <button className="px-4 py-2 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all">
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%]"></div>
                    </div>
                    <span className="text-sm text-slate-700 whitespace-nowrap">
                      Strong Password
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-2">
                    Your password should be at least 12 characters long and
                    include uppercase letters, lowercase letters, numbers, and
                    special characters.
                  </p>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Two-Factor Authentication
              </h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Enable 2FA</h4>
                    <p className="text-sm text-slate-700">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">
                      Enable two-factor authentication
                    </span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        QR Code Placeholder
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-700">
                        1. Scan this QR code with your authenticator app (Google
                        Authenticator, Authy, etc.)
                      </p>
                      <p className="text-sm text-slate-700">
                        2. Enter the 6-digit code from your app below to verify
                        setup
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter 6-digit code"
                          className="px-4 py-2 rounded-lg border border-white/10 bg-white/20 focus:outline-none text-coal-black font-medium"
                        />
                        <button className="px-4 py-2 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all">
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Recovery Codes</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Save these recovery codes in a secure place. You can use
                      them to access your account if you lose your authenticator
                      device.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/10 p-2 rounded text-sm font-mono">
                        ABCD-1234-EFGH
                      </div>
                      <div className="bg-white/10 p-2 rounded text-sm font-mono">
                        IJKL-5678-MNOP
                      </div>
                      <div className="bg-white/10 p-2 rounded text-sm font-mono">
                        QRST-9012-UVWX
                      </div>
                      <div className="bg-white/10 p-2 rounded text-sm font-mono">
                        YZ12-3456-7890
                      </div>
                    </div>
                    <button className="mt-3 text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                      Download recovery codes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Biometric Authentication */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Biometric Authentication
              </h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Enable Biometric Login</h4>
                    <p className="text-sm text-slate-700">
                      Use fingerprint, face recognition, or other biometric
                      methods to log in
                    </p>
                  </div>
                  <Switch
                    checked={isBiometricAvailable}
                    onChange={() => {}}
                    className={`${
                      isBiometricAvailable ? "bg-crystal-blue" : "bg-gray-200"
                    } relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      !isBiometricAvailable && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span className="sr-only">
                      Enable biometric authentication
                    </span>
                    <span
                      className={`${
                        isBiometricAvailable
                          ? "translate-x-[16px]"
                          : "translate-x-[2px]"
                      } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                {!isBiometricAvailable && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mt-2">
                    <p className="text-sm text-amber-600">
                      Biometric authentication is not available on this device
                      or browser. Please ensure your device supports biometric
                      authentication and you&apos;re using a compatible browser.
                    </p>
                  </div>
                )}
                {isBiometricAvailable && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-crystal-blue/20 flex items-center justify-center">
                        <FaFingerprint className="w-5 h-5 text-crystal-blue" />
                      </div>
                      <div>
                        <h5 className="font-medium">Fingerprint</h5>
                        <p className="text-xs text-slate-700">
                          Registered on this device
                        </p>
                      </div>
                    </div>
                    <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                      Manage registered biometrics
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Session Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Session Management</h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <h4 className="font-medium mb-3">Active Sessions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/[0.05] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <FaLock className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <h5 className="font-medium">Current Session</h5>
                        <p className="text-xs text-slate-700">
                          MacOS • Chrome • Last active: Just now
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/[0.05] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FaLock className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <h5 className="font-medium">Mobile Session</h5>
                        <p className="text-xs text-slate-700">
                          iOS • Safari • Last active: 2 hours ago
                        </p>
                      </div>
                    </div>
                    <button className="text-xs text-red-500 hover:text-red-600 transition-colors">
                      Revoke
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/[0.05] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FaLock className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <h5 className="font-medium">Desktop Session</h5>
                        <p className="text-xs text-slate-700">
                          Windows • Firefox • Last active: Yesterday
                        </p>
                      </div>
                    </div>
                    <button className="text-xs text-red-500 hover:text-red-600 transition-colors">
                      Revoke
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-md text-sm font-medium hover:bg-red-500/20 transition-all">
                    Revoke All Other Sessions
                  </button>
                </div>
              </div>
            </div>

            {/* Security Logs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Security Logs</h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3 text-sm font-medium">
                          Event
                        </th>
                        <th className="text-left py-2 px-3 text-sm font-medium">
                          IP Address
                        </th>
                        <th className="text-left py-2 px-3 text-sm font-medium">
                          Location
                        </th>
                        <th className="text-left py-2 px-3 text-sm font-medium">
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3 text-sm">Successful login</td>
                        <td className="py-2 px-3 text-sm">192.168.1.1</td>
                        <td className="py-2 px-3 text-sm">
                          San Francisco, USA
                        </td>
                        <td className="py-2 px-3 text-sm">Today, 10:23 AM</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3 text-sm">Password changed</td>
                        <td className="py-2 px-3 text-sm">192.168.1.1</td>
                        <td className="py-2 px-3 text-sm">
                          San Francisco, USA
                        </td>
                        <td className="py-2 px-3 text-sm">
                          Yesterday, 3:45 PM
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3 text-sm">
                          Failed login attempt
                        </td>
                        <td className="py-2 px-3 text-sm">203.0.113.42</td>
                        <td className="py-2 px-3 text-sm">Unknown</td>
                        <td className="py-2 px-3 text-sm">
                          3 days ago, 11:52 PM
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-3 text-sm">2FA enabled</td>
                        <td className="py-2 px-3 text-sm">192.168.1.1</td>
                        <td className="py-2 px-3 text-sm">
                          San Francisco, USA
                        </td>
                        <td className="py-2 px-3 text-sm">
                          Last week, 2:30 PM
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                    View full security log
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Security Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Advanced Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Login Notifications</h4>
                    <p className="text-sm text-slate-700">
                      Receive email alerts for new login attempts
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable login notifications</span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      Suspicious Activity Detection
                    </h4>
                    <p className="text-sm text-slate-700">
                      Automatically detect and block suspicious login attempts
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">
                      Enable suspicious activity detection
                    </span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">IP Restrictions</h4>
                    <p className="text-sm text-slate-700">
                      Limit access to specific IP addresses or ranges
                    </p>
                  </div>
                  <Switch
                    checked={false}
                    onChange={() => {}}
                    className={`bg-gray-200 relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable IP restrictions</span>
                    <span
                      className={`translate-x-[2px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Auto-Logout</h4>
                    <p className="text-sm text-slate-700">
                      Automatically log out after period of inactivity
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-1 rounded-lg border border-white/10 bg-white/20 focus:outline-none text-coal-black font-medium">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60" selected>
                        1 hour
                      </option>
                      <option value="120">2 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all">
                Save Security Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Site Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-1 md:p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Coming Soon Mode</h4>
                    <p className="text-sm text-slate-700">
                      Enable to show a coming soon page instead of the full
                      landing page
                    </p>
                  </div>
                  <Switch
                    checked={isComingSoonEnabled}
                    onChange={(checked) => handleToggle("comingSoon", checked)}
                    className={`${
                      isComingSoonEnabled ? "bg-crystal-blue" : "bg-gray-200"
                    } relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable coming soon mode</span>
                    <span
                      className={`${
                        isComingSoonEnabled
                          ? "translate-x-[16px]"
                          : "translate-x-[2px]"
                      } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between p-1 md:p-4 bg-white/[0.02] rounded-lg">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-slate-700">
                      Enable when performing system maintenance or updates
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                      {isDurationChanged && (
                        <button
                          onClick={handleSaveDuration}
                          className="px-3 py-1 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all"
                        >
                          Save
                        </button>
                      )}
                      <input
                        type="number"
                        min="0"
                        max="99"
                        value={maintenanceHours}
                        onChange={(e) =>
                          handleMaintenanceHoursChange(
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="appearance-none m-0 w-24 px-2 py-1 rounded-md border-none bg-white text-coal-black font-medium text-center focus:outline-none focus:ring-1 focus:ring-baby-blue"
                      />
                      <span className="text-sm text-slate-700 font-medium whitespace-nowrap">
                        hrs
                      </span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={maintenanceMinutes}
                        onChange={(e) =>
                          handleMaintenanceMinutesChange(
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="appearance-none m-0 w-24 px-2 py-1 rounded-md border-none bg-white text-coal-black font-medium text-center focus:outline-none focus:ring-1 focus:ring-baby-blue"
                      />
                      <span className="text-sm text-slate-700 font-medium whitespace-nowrap">
                        min
                      </span>
                    </div>
                    <Switch
                      checked={isMaintenanceEnabled}
                      onChange={(checked) => {
                        // Validate that duration is set before enabling
                        if (
                          checked &&
                          maintenanceHours === 0 &&
                          maintenanceMinutes === 0
                        ) {
                          toast.error(
                            "Please set a maintenance duration before enabling maintenance mode.",
                            {
                              duration: 5000,
                              style: {
                                background: "#17222D",
                                color: "#FFF",
                              },
                            }
                          );
                          return;
                        }
                        handleToggle("maintenance", checked);
                      }}
                      className={`${
                        isMaintenanceEnabled ? "bg-crystal-blue" : "bg-gray-200"
                      } relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">Enable maintenance mode</span>
                      <span
                        className={`${
                          isMaintenanceEnabled
                            ? "translate-x-[16px]"
                            : "translate-x-[2px]"
                        } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-6">
            {/* API Keys */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">API Keys</h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">API Access</h4>
                    <p className="text-sm text-slate-700">
                      Enable API access to integrate QMaster with your systems
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">Enable API access</span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <div className="bg-white/[0.05] p-3 flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Production API Key</h5>
                        <p className="text-xs text-slate-700">
                          Created on Jan 15, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                          Active
                        </span>
                        <button className="text-xs text-red-500 hover:text-red-600 transition-colors">
                          Revoke
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-white/10 p-2 rounded font-mono text-sm flex-grow overflow-x-auto whitespace-nowrap">
                          qm_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
                        </div>
                        <button className="p-2 bg-white/10 rounded hover:bg-white/20 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-slate-700">
                        This key has full access to your account. Keep it secure
                        and never share it publicly.
                      </p>
                    </div>
                  </div>

                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <div className="bg-white/[0.05] p-3 flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Development API Key</h5>
                        <p className="text-xs text-slate-700">
                          Created on Mar 22, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">
                          Limited
                        </span>
                        <button className="text-xs text-red-500 hover:text-red-600 transition-colors">
                          Revoke
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-white/10 p-2 rounded font-mono text-sm flex-grow overflow-x-auto whitespace-nowrap">
                          qm_test_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3h2g1f0
                        </div>
                        <button className="p-2 bg-white/10 rounded hover:bg-white/20 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-xs text-slate-700">
                        This key has read-only access and rate limits for
                        development and testing purposes.
                      </p>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Generate New API Key
                  </button>
                </div>
              </div>
            </div>

            {/* Webhooks */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Webhooks</h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Webhook Notifications</h4>
                    <p className="text-sm text-slate-700">
                      Receive real-time notifications about events in your
                      QMaster account
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span className="sr-only">
                      Enable webhook notifications
                    </span>
                    <span
                      className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <div className="bg-white/[0.05] p-3 flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Queue Events Webhook</h5>
                        <p className="text-xs text-slate-700">
                          Last triggered 5 minutes ago
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                          Active
                        </span>
                        <button className="text-xs text-slate-500 hover:text-slate-600 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Endpoint URL
                          </label>
                          <input
                            type="text"
                            value="https://api.yourcompany.com/webhooks/qmaster"
                            readOnly
                            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/10 focus:outline-none text-sm font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Events
                          </label>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                              queue.created
                            </span>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                              queue.updated
                            </span>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                              customer.added
                            </span>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                              customer.served
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add New Webhook
                  </button>
                </div>
              </div>
            </div>

            {/* Third-Party Integrations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Third-Party Integrations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#4285F4]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.976-1.846-1.54-2.941-1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"
                            fill="#4285F4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium">Google Calendar</h5>
                        <p className="text-xs text-slate-700">
                          Sync appointments with Google Calendar
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">
                        Enable Google Calendar integration
                      </span>
                      <span
                        className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="mt-2">
                    <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                      Configure settings
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#00B2FF]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M22.675 0h-21.35c-.732 0-1.325.593-1.325v21.351c0 .731.593 1.324 1.325 1.324h21.351c.731 0 1.324-.593 1.324-1.324v-21.351c0-.732-.593-1.325-1.325-1.325zm-11.676 9.303c0-.608.492-1.1 1.1-1.1.608 0 1.1.492 1.1 1.1v2.203h2.202c.608 0 1.1.492 1.1 1.1 0 .608-.492 1.1-1.1 1.1h-2.202v2.202c0 .608-.492 1.1-1.1 1.1-.608 0-1.1-.492-1.1-1.1v-2.202h-2.203c-.608 0-1.1-.492-1.1-1.1 0-.608.492-1.1 1.1-1.1h2.203v-2.203z"
                            fill="#00B2FF"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium">Slack</h5>
                        <p className="text-xs text-slate-700">
                          Receive notifications in your Slack channels
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={false}
                      onChange={() => {}}
                      className={`bg-gray-200 relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">Enable Slack integration</span>
                      <span
                        className={`translate-x-[2px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="mt-2">
                    <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                      Connect account
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#FF9900]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M18.75 9v.75H13.5v4.5h5.25V15H13.5v4.5h5.25v.75H12V9h6.75z"
                            fill="#FF9900"
                          />
                          <path
                            d="M6.25 19.5v-9.75H8V15h2.25v-5.25h1.75v9.75h-1.75V16.5H8v3h-1.75z"
                            fill="#FF9900"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium">Twilio SMS</h5>
                        <p className="text-xs text-slate-700">
                          Send SMS notifications to customers
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      className={`bg-crystal-blue relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">
                        Enable Twilio SMS integration
                      </span>
                      <span
                        className={`translate-x-[16px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="mt-2">
                    <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                      Configure settings
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#7AB55C]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.153-.242-1.725-.788-.368-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.563.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882z"
                            fill="#7AB55C"
                          />
                          <path
                            d="M15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.54-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"
                            fill="#7AB55C"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium">Apple Business Chat</h5>
                        <p className="text-xs text-slate-700">
                          Chat with customers via iMessage
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={false}
                      onChange={() => {}}
                      className={`bg-gray-200 relative inline-flex w-[36px] h-[22px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span className="sr-only">
                        Enable Apple Business Chat integration
                      </span>
                      <span
                        className={`translate-x-[2px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                  <div className="mt-2">
                    <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                      Connect account
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                  Browse integration marketplace
                </button>
              </div>
            </div>

            {/* API Usage Statistics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">API Usage Statistics</h3>
              <div className="p-4 bg-white/[0.02] rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <h5 className="text-sm font-medium text-slate-700">
                      API Calls (Last 30 days)
                    </h5>
                    <p className="text-2xl font-semibold mt-1">24,856</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-green-500">+12.4%</span>
                      <span className="text-xs text-slate-700">
                        vs. previous period
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <h5 className="text-sm font-medium text-slate-700">
                      Average Response Time
                    </h5>
                    <p className="text-2xl font-semibold mt-1">187ms</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-green-500">-23ms</span>
                      <span className="text-xs text-slate-700">
                        vs. previous period
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.05] rounded-lg">
                    <h5 className="text-sm font-medium text-slate-700">
                      Error Rate
                    </h5>
                    <p className="text-2xl font-semibold mt-1">0.42%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-green-500">-0.15%</span>
                      <span className="text-xs text-slate-700">
                        vs. previous period
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[200px] bg-white/[0.05] rounded-lg flex items-center justify-center">
                  <p className="text-sm text-slate-700">
                    API usage chart will be displayed here
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <button className="text-sm text-baby-blue hover:text-ocean-blue transition-colors">
                    View detailed API analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-crystal-blue text-black rounded-md text-sm font-medium hover:bg-opacity-90 transition-all">
                Save API & Integration Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conflict Modal */}
      <Transition appear show={isConflictModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsConflictModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <FaExclamationTriangle className="text-amber-500 w-6 h-6" />
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Mode Conflict
                    </Dialog.Title>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {pendingAction?.type === "maintenance"
                        ? "Coming Soon mode is currently active. You cannot enable Maintenance mode while Coming Soon mode is active."
                        : "Maintenance mode is currently active. You cannot enable Coming Soon mode while Maintenance mode is active."}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => handleConflictResolution(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors"
                      onClick={() => handleConflictResolution(true)}
                    >
                      Proceed
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Authentication Modal */}
      <Transition appear show={isAuthModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsAuthModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Authentication Required
                  </Dialog.Title>

                  {isBiometricAvailable && (
                    <button
                      onClick={handleBiometricAuth}
                      className="w-full flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      <FaFingerprint className="w-5 h-5" />
                      <span>Use Biometric Authentication</span>
                    </button>
                  )}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative bg-white px-4 text-sm text-gray-500">
                      or
                    </div>
                  </div>
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-coal-black px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                          placeholder="Enter your password"
                        />
                      </div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-coal-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue"
                        placeholder="Enter your password"
                      />
                    </div>

                    {authError && (
                      <p className="text-red-500 text-sm">{authError}</p>
                    )}

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAuthModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-ocean-blue rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        Authenticate
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
