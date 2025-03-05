package com.que.que.Notification.AdminNotification;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@AllArgsConstructor
public class AdminNotificationService {
    private final AdminNotificationRepository adminNotificationRepository;

    public AdminNotification createAdminNotification(String title, String message, String type) {
        // Check if the type is one of the NotificationTypes
        switch (type) {
            case "INFO":
            case "WARNING":
            case "ERROR":
            case "REQUEST":
                break;
            default:
                throw new IllegalArgumentException("Invalid notification type: " + type);
        }

        AdminNotification adminNotification = new AdminNotification(message, title, type);
        return adminNotificationRepository.save(adminNotification);
    }

    public Page<AdminNotification> getAdminNotifications(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return adminNotificationRepository.findAll(pageable);
    }
}
