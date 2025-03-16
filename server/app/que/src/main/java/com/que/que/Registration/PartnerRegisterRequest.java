package com.que.que.Registration;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PartnerRegisterRequest {
    private String name;
    private String category;
    private List<PartnerLocationCreationRequest> locations;
}
