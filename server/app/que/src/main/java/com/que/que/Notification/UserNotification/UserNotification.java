package com.que.que.Notification.UserNotification;

import com.que.que.Notification.Notification;
import com.que.que.User.User;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserNotification extends Notification {

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public UserNotification(String message, String title, String type, User user) {
        super(message, title, type);
        this.user = user;
    }
}
