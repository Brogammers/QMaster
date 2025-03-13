package com.que.que.Partner.PartnerChangeRequest;

import org.springframework.stereotype.Service;

import com.que.que.Notification.AdminNotification.AdminNotification;
import com.que.que.Notification.AdminNotification.AdminNotificationRepository;
import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;
import com.que.que.User.BusinessUser.BusinessUser;
import com.que.que.User.BusinessUser.BusinessUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PartnerChangeRequestService {
    private final PartnerChangeRequestRepository partnerChangeRequestRepository;
    private final AdminNotificationRepository adminNotificationRepository;
    private final PartnerRepository partnerRepository;
    private final BusinessUserRepository businessUserRepository;
    private final String PARTNER_CHANGE_REQUEST_TITLE = "Partner change request";
    private final String PARTNER_CHANGE_REQUEST_APPROVED = "Partner change request approved";
    private final String PARTNER_CHANGE_REQUEST_REJECTED = "Partner change request rejected";
    private final String PARTNER_CHANGE_REQUEST_MESSAGE = "Partner %s has requested a change for %s";

    public PartnerChangeRequest createPartnerChangeRequest(String type, Long partnerId) {

        Partner partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new IllegalStateException("Partner not found"));

        boolean checkRequest = partnerChangeRequestRepository.findByPartner(
                partner).stream()
                .anyMatch(request -> !request.isApproved()
                        && request.getType() == PartnerChangeRequestType.valueOf(type));

        if (checkRequest) {
            throw new IllegalStateException("Partner change request already exists");
        }

        PartnerChangeRequest partnerChangeRequest = new PartnerChangeRequest(
                PartnerChangeRequestType.valueOf(type),
                partner);
        partnerChangeRequestRepository.save(partnerChangeRequest);

        // Create notification for admin
        AdminNotification notification = new AdminNotification(
                String.format(PARTNER_CHANGE_REQUEST_MESSAGE, partner.getName(), type.toLowerCase()),
                PARTNER_CHANGE_REQUEST_TITLE, "REQUEST");
        adminNotificationRepository.save(notification);
        return partnerChangeRequest;
    }

    public PartnerChangeRequest createPartnerChangeRequest(String type, String email) {
        BusinessUser businessUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business User not found"));
        Partner partner = businessUser.getPartner();

        boolean checkRequest = partnerChangeRequestRepository.findByPartner(
                partner).stream()
                .anyMatch(request -> !request.isApproved()
                        && request.getType() == PartnerChangeRequestType.valueOf(type));

        if (checkRequest) {
            throw new IllegalStateException("Partner change request already exists");
        }

        PartnerChangeRequest partnerChangeRequest = new PartnerChangeRequest(
                PartnerChangeRequestType.valueOf(type),
                partner);
        partnerChangeRequestRepository.save(partnerChangeRequest);

        AdminNotification notification = new AdminNotification(
                String.format(PARTNER_CHANGE_REQUEST_MESSAGE, partner.getName(), type.toLowerCase()),
                PARTNER_CHANGE_REQUEST_TITLE, "REQUEST");
        adminNotificationRepository.save(notification);
        return partnerChangeRequest;
    }
}
