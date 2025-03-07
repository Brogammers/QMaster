package com.que.que.Partner;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Partner.PartnerChangeRequest.PartnerChangeRequestRequest;
import com.que.que.Partner.PartnerChangeRequest.PartnerChangeRequestService;
import com.que.que.Security.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/partner")
@AllArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;
    private final PartnerChangeRequestService partnerChangeRequestService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<Object> createPartner(@RequestBody PartnerRequest partnerRequest) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            Partner partner = partnerService.createPartner(partnerRequest.getName(),
                    partnerRequest.getBusinessCategoryName());
            body.put("partner", partner);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @PostMapping("/change-request")
    public ResponseEntity<Object> createPartnerChangeRequest(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody PartnerChangeRequestRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            if (request.getPartnerId().isPresent())
                body.put("changeRequest", partnerChangeRequestService.createPartnerChangeRequest(request.getType(),
                        request.getPartnerId().get()));
            else
                body.put("changeRequest",
                        partnerChangeRequestService.createPartnerChangeRequest(request.getType(), email));
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

}
