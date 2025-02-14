package com.que.que.Settings;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class SettingsService {
    private boolean isMaintenanceMode = true;
    private boolean isComingSoonMode = false;

    public Map<String, Boolean> getSettings() {
        Map<String, Boolean> settings = Map.of(
                "isMaintenanceMode", isMaintenanceMode,
                "isComingSoonMode", isComingSoonMode);

        return settings;
    }

    public Map<String, Boolean> updateSettings(boolean isMaintenanceMode, boolean isComingSoonMode) {
        this.isMaintenanceMode = isMaintenanceMode;
        this.isComingSoonMode = isComingSoonMode;

        Map<String, Boolean> settings = Map.of(
                "isMaintenanceMode", isMaintenanceMode,
                "isComingSoonMode", isComingSoonMode);

        return settings;
    }
}
