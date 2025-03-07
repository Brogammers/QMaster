package com.que.que.Partner.PartnerChangeRequest;

import java.sql.Date;

import com.que.que.Partner.Partner;

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
public class PartnerChangeRequest {

    @Id
    @SequenceGenerator(name = "partner_request_sequence", sequenceName = "partner_request_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "partner_request_sequence")
    private Long id;

    @Column(nullable = false)
    private PartnerChangeRequestType type;

    @Column(nullable = false)
    private boolean approved;
    private String reason;

    @Column(nullable = false)
    private Date createdAt;
    private Date actionTakenAt;

    @ManyToOne
    @JoinColumn(name = "partner_id", nullable = false)
    private Partner partner;

    public PartnerChangeRequest(PartnerChangeRequestType type, Partner partner) {
        this.type = type;
        this.partner = partner;
        this.approved = false;
        this.createdAt = new Date(System.currentTimeMillis());
        this.actionTakenAt = null;
    }
}