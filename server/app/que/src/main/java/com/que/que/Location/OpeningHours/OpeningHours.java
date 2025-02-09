package com.que.que.Location.OpeningHours;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.que.que.Location.Location;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@JsonSerialize(using = OpeningHoursSerializer.class)
public class OpeningHours {

    @Id
    @SequenceGenerator(name = "opening_hours_generator_sequence", sequenceName = "opening_hours_generator_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "opening_hours_generator_sequence")
    private Long id;

    @Column(nullable = false)
    private String day;

    @Column(nullable = false)
    private String openTime;

    @Column(nullable = false)
    private String closeTime;

    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;

    @Column(nullable = false)
    private boolean isOpen;

    public OpeningHours(String day, String openTime, String closeTime, Location location, boolean isOpen) {
        this.day = day;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.location = location;
        this.isOpen = isOpen;
    }

}
