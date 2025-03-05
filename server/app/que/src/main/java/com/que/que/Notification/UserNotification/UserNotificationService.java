package com.que.que.Notification.UserNotification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.que.que.User.User;
import com.que.que.User.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserNotificationService {
    private final UserNotificationRepository userNotificationRepository;
    private final UserRepository userRepository;

    public UserNotification createAdminNotification(String title, String message, String type, Long userId) {
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

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserNotification userNotification = new UserNotification(message, title, type, user);
        return userNotificationRepository.save(userNotification);
    }

    public Page<UserNotification> getUserNotifications(int pageNumber, int pageSize, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return userNotificationRepository.findByUser(user, pageable);
    }

    public Page<UserNotification> getUserNotifications(int pageNumber, int pageSize, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return userNotificationRepository.findByUser(user, pageable);
    }
}
