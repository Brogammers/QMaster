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

    public PartnerChangeRequest createPartnerChangeRequest(String type, Long partnerId) {

        Partner partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new IllegalStateException("Partner not found"));

        PartnerChangeRequest checkRequest = partnerChangeRequestRepository.findByPartnerAndTypeAndAccepted(
                partner, PartnerChangeRequestType.valueOf(type), false).stream().findFirst().orElse(null);

        if (checkRequest != null) {
            throw new IllegalStateException("Partner change request already exists");
        }

        PartnerChangeRequest partnerChangeRequest = new PartnerChangeRequest(
                PartnerChangeRequestType.valueOf(type),
                partner);
        partnerChangeRequestRepository.save(partnerChangeRequest);

        // Create notification for admin
        AdminNotification notification = new AdminNotification(
                "Partner " + partner.getName() + " has requested a change in " + type.toLowerCase(),
                "Partner Change Request", "REQUEST");
        adminNotificationRepository.save(notification);
        return partnerChangeRequest;
    }

    public PartnerChangeRequest createPartnerChangeRequest(String type, String email) {
        BusinessUser businessUser = businessUserRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Business User not found"));
        Partner partner = businessUser.getPartner();
        PartnerChangeRequest partnerChangeRequest = new PartnerChangeRequest(
                PartnerChangeRequestType.valueOf(type),
                partner);
        partnerChangeRequestRepository.save(partnerChangeRequest);

        PartnerChangeRequest checkRequest = partnerChangeRequestRepository.findByPartnerAndTypeAndAccepted(
                partner, PartnerChangeRequestType.valueOf(type), false).stream().findFirst().orElse(null);

        if (checkRequest != null) {
            throw new IllegalStateException("Partner change request already exists");
        }

        AdminNotification notification = new AdminNotification(
                "Partner " + partner.getName() + " has requested a change in " + type.toLowerCase(),
                "Partner Change Request", "REQUEST");
        adminNotificationRepository.save(notification);
        return partnerChangeRequest;
    }
}
