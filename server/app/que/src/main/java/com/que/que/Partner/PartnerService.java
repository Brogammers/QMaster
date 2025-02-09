package com.que.que.Partner;

import org.springframework.stereotype.Service;

import com.que.que.QRcode.QRCodeService;
import com.que.que.User.BusinessUser.BusinessCategory;
import com.que.que.User.BusinessUser.BusinessCategoryRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;
    private final BusinessCategoryRepository businessCategoryRepository;
    private final QRCodeService qrCodeService;

    public Partner createPartner(String name, String businessCategoryName) {
        BusinessCategory businessCategory = businessCategoryRepository.findByName(businessCategoryName)
                .orElseThrow(() -> new IllegalStateException(
                        "Business category with name " + businessCategoryName + " not found"));

        Partner partner = new Partner(name, businessCategory);

        partnerRepository.save(partner);

        try {
            qrCodeService.createQRCode(partner.getId(), String.format(
                    "api/v1/queue/user?partnerId=%d",
                    partner.getId()));
        } catch (Exception e) {
            throw new IllegalStateException("Failed to create QR code for partner");
        }

        return partner;
    }
}
