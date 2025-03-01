package com.que.que.Settings;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/settings")
@AllArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;

    @GetMapping
    public ResponseEntity<Object> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    @PutMapping
    public ResponseEntity<Object> updateSettings(@RequestBody SettingsRequest settingsRequest) {
        return ResponseEntity.ok(settingsService.updateSettings(settingsRequest.isMaintenanceMode(),
                settingsRequest.isComingSoonMode(), settingsRequest.getMaintenanceDuration()));
    }
}