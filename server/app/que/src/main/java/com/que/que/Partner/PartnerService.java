package com.que.que.Partner;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;

    public Partner createPartner(String name) {
        Partner partner = new Partner(name);

        partnerRepository.save(partner);
        return partner;
    }
}
