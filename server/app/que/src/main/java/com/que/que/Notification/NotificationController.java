package com.que.que.Notification;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Notification.AdminNotification.AdminNotificationService;
import com.que.que.Notification.UserNotification.UserNotificationService;
import com.que.que.Security.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/notification")
@AllArgsConstructor
public class NotificationController {
    private final AdminNotificationService adminNotificationService;
    private final UserNotificationService userNotificationService;
    private final JwtUtil jwtUtil;

    @GetMapping("/admin")
    @Secured("ADMIN")
    public ResponseEntity<Object> getAdminNotifications(@RequestParam("page") int page,
            @RequestParam("per-page") int size) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            body.put("notifications", adminNotificationService.getAdminNotifications(page - 1, size));
            body.put("message", "Admin notifications retrieved successfully");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping("/user")
    public ResponseEntity<Object> getUserNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam("page") int page,
            @RequestParam("per-page") int size) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            body.put("notifications", userNotificationService.getUserNotifications(page - 1, size, email));
            body.put("message", "User notifications retrieved successfully");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}