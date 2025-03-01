package com.que.que.Settings;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class SettingsService {
    private boolean isMaintenanceMode = false;
    private boolean isComingSoonMode = false;
    private long maintenanceDuration = 10; // in minutes

    public Map<String, Object> getSettings() {
        Map<String, Object> settings = Map.of(
                "isMaintenanceMode", isMaintenanceMode,
                "isComingSoonMode", isComingSoonMode,
                "maintenanceDuration", maintenanceDuration);

        return settings;
    }

    public Map<String, Object> updateSettings(boolean isMaintenanceMode, boolean isComingSoonMode,
            long maintenanceDuration) {
        this.isMaintenanceMode = isMaintenanceMode;
        this.isComingSoonMode = isComingSoonMode;
        this.maintenanceDuration = maintenanceDuration;

        Map<String, Object> settings = Map.of(
                "isMaintenanceMode", isMaintenanceMode,
                "isComingSoonMode", isComingSoonMode,
                "maintenanceDuration", maintenanceDuration);

        return settings;
    }
}
