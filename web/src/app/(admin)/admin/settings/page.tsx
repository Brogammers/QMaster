"use client";

import { useState, useEffect } from "react";
import { FaCog, FaBell, FaLock, FaGlobe, FaFingerprint } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  email: string;
}

export default function SettingsPage() {
  const [isDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isComingSoonEnabled, setIsComingSoonEnabled] = useState(false);
  const [isMaintenanceEnabled, setIsMaintenanceEnabled] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
  });
  const [deviceLanguage, setDeviceLanguage] = useState("");
  const [deviceTimezone, setDeviceTimezone] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
    if (pendingAction) {
      if (pendingAction.type === "maintenance") {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS || "";
        axios
          .put(url, {
            isMaintenanceMode: pendingAction.value,
            isComingSoonMode: isComingSoonEnabled,
          })
          .then((response) => {
            if (response.status === 200) {
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
          });
      } else {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS || "";
        axios
          .put(url, {
            isMaintenanceMode: isMaintenanceEnabled,
            isComingSoonMode: pendingAction.value,
          })
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw new Error("Failed to update maintenance mode");
            }
          })
          .then((data) => {
            setIsComingSoonEnabled(data.isComingSoonMode);
          })
          .catch((error) => {
            console.error("Failed to update maintenance mode:", error);
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
    setPendingAction({ type, value });
    setIsAuthModalOpen(true);
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
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-blue focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Enable coming soon mode</span>
                    <span
                      className={`${
                        isComingSoonEnabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform`}
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
                  <Switch
                    checked={isMaintenanceEnabled}
                    onChange={(checked) => handleToggle("maintenance", checked)}
                    className={`${
                      isMaintenanceEnabled ? "bg-crystal-blue" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        isMaintenanceEnabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
