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
import toast, { Toaster } from "react-hot-toast";

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

        axios
          .put(url, {
            isMaintenanceMode: pendingAction.value,
            isComingSoonMode: pendingAction.value ? false : isComingSoonEnabled, // Disable coming soon mode if enabling maintenance
            maintenanceDuration: maintenanceDuration, // Always send duration regardless of mode
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success(
                `Maintenance mode ${
                  pendingAction.value ? "enabled" : "disabled"
                } successfully!`,
                {
                  duration: 5000,
                  style: {
                    background: "#17222D",
                    color: "#FFF",
                  },
                }
              );

              // If we're enabling maintenance mode, make sure coming soon is disabled
              if (pendingAction.value && isComingSoonEnabled) {
                setIsComingSoonEnabled(false);
                toast.success("Coming soon mode has been disabled", {
                  duration: 5000,
                  style: {
                    background: "#17222D",
                    color: "#FFF",
                  },
                });
              }

              return response.data;
            } else {
              throw new Error("Failed to update maintenance mode");
            }
          })
          .then((data) => {
            setIsMaintenanceEnabled(data.isMaintenanceMode);
          })
          .catch((error) => {
            console.error("Failed to update maintenance mode:", error);
            toast.error(
              "Failed to update maintenance mode. Please try again.",
              {
                duration: 5000,
                style: {
                  background: "#17222D",
                  color: "#FFF",
                },
              }
            );
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
              toast.success(
                `Coming soon mode ${
                  pendingAction.value ? "enabled" : "disabled"
                } successfully!`,
                {
                  duration: 5000,
                  style: {
                    background: "#17222D",
                    color: "#FFF",
                  },
                }
              );

              // If we're enabling coming soon mode, make sure maintenance is disabled
              if (pendingAction.value && isMaintenanceEnabled) {
                setIsMaintenanceEnabled(false);
                toast.success("Maintenance mode has been disabled", {
                  duration: 5000,
                  style: {
                    background: "#17222D",
                    color: "#FFF",
                  },
                });
              }

              return response.data;
            } else {
              throw new Error("Failed to update coming soon mode");
            }
          })
          .then((data) => {
            setIsComingSoonEnabled(data.isComingSoonMode);
          })
          .catch((error) => {
            console.error("Failed to update coming soon mode:", error);
            toast.error(
              "Failed to update coming soon mode. Please try again.",
              {
                duration: 5000,
                style: {
                  background: "#17222D",
                  color: "#FFF",
                },
              }
            );
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
      toast.error("Please set a maintenance duration greater than zero.", {
        duration: 5000,
        style: {
          background: "#17222D",
          color: "#FFF",
        },
      });
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
          toast.success("Maintenance duration updated successfully!", {
            duration: 5000,
            style: {
              background: "#17222D",
              color: "#FFF",
            },
          });
        } else {
          throw new Error("Failed to update maintenance duration");
        }
      })
      .catch((error) => {
        console.error("Failed to update maintenance duration:", error);
        toast.error(
          "Failed to update maintenance duration. Please try again.",
          {
            duration: 5000,
            style: {
              background: "#17222D",
              color: "#FFF",
            },
          }
        );
      });
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <Toaster position="top-right" />
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
          {["general", "notifications", "security", "integrations"].map(
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
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                    <p className="text-sm text-gray-500 mt-2">
                      Would you like to disable{" "}
                      {pendingAction?.type === "maintenance"
                        ? "Coming Soon"
                        : "Maintenance"}{" "}
                      mode and enable{" "}
                      {pendingAction?.type === "maintenance"
                        ? "Maintenance"
                        : "Coming Soon"}{" "}
                      mode instead?
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
