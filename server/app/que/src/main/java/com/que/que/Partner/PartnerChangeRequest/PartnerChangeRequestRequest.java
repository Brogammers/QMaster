package com.que.que.Partner.PartnerChangeRequest;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PartnerChangeRequestRequest {
    private String type;
    private Optional<Long> partnerId;
}
