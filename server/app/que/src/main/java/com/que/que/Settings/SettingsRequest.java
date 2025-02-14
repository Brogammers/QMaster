package com.que.que.Settings;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SettingsRequest {
    private final boolean isMaintenanceMode;
    private final boolean isComingSoonMode;
}
