package com.que.que.Notification.AdminNotification;

import com.que.que.Notification.Notification;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AdminNotification extends Notification {

    public AdminNotification(String message, String title, String type) {
        super(message, title, type);
    }
}
