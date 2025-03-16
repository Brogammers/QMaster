package com.que.que.Notification;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notification {

    @Id
    @SequenceGenerator(name = "notification_generator_sequence", sequenceName = "notification_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_generator_sequence")
    private Long id;

    private final Date date = new Date(System.currentTimeMillis());

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private NotificationType type;

    public Notification(String message, String title, String type) {
        this.message = message;
        this.title = title;

        switch (type) {
            case "INFO":
                this.type = NotificationType.INFO;
                break;
            case "WARNING":
                this.type = NotificationType.WARNING;
                break;
            case "ERROR":
                this.type = NotificationType.ERROR;
                break;
            case "REQUEST":
                this.type = NotificationType.REQUEST;
                break;
            default:
                this.title += " (Type not recognized)";
                this.type = NotificationType.INFO;
                break;
        }
    }
}