package com.que.que.User.AdminUser;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Partner.Partner;
import com.que.que.Partner.PartnerRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/admin")
@AllArgsConstructor
public class AdminUserController {
    private final PartnerRepository partnerRepository;

    @GetMapping(path = "/businesses")
    @Secured("ADMIN")
    public ResponseEntity<Object> getBusinesses(@RequestParam("page") int page, @RequestParam("per-page") int perPage) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            Pageable pageable = PageRequest.of(page - 1, perPage);
            Page<Partner> partners = partnerRepository.findAll(pageable);
            body.put("partners", partners);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
