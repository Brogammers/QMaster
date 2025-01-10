'use client'

import { useState } from 'react';
import { FaCog, FaBell, FaLock, FaGlobe, FaUser } from 'react-icons/fa';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="flex space-x-1 bg-white/[0.02] rounded-lg p-1 w-fit">
        {['general', 'notifications', 'security', 'integrations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-crystal-blue' 
                : 'hover:bg-white/[0.05]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/[0.35] focus:outline-none focus:ring-2 focus:ring-crystal-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/[0.35] focus:outline-none focus:ring-2 focus:ring-crystal-blue"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Language</h4>
                    <p className="text-sm text-slate-700">Select your preferred language</p>
                  </div>
                  <select className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02]">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Time Zone</h4>
                    <p className="text-sm text-slate-700">Set your local time zone</p>
                  </div>
                  <select className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02]">
                    <option value="utc">UTC</option>
                    <option value="est">EST</option>
                    <option value="pst">PST</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button className="px-4 py-2 bg-crystal-blue text-black rounded-lg hover:bg-opacity-90">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 