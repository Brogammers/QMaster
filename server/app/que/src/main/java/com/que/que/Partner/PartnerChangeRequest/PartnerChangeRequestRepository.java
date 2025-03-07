package com.que.que.Partner.PartnerChangeRequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.que.que.Partner.Partner;

public interface PartnerChangeRequestRepository extends JpaRepository<PartnerChangeRequest, Long> {

    List<PartnerChangeRequest> findByPartnerAndTypeAndAccepted(Partner partner, PartnerChangeRequestType type,
            boolean accepted);
}
