package com.que.que.Location;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Security.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/location")
@AllArgsConstructor
public class LocationController {

    private final LocationService locationService;
    private final JwtUtil jwtUtil;

    @PostMapping()
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> createLocation(@RequestBody LocationCreationRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            locationService.createLocation(request.getId(), request.getName(), request.getDescription(),
                    request.getAddress(), request.getLatitude(), request.getLongitude());
            body.put("message", "Location creation was successful");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping
    public ResponseEntity<Object> getLocationsByBusinessName(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam(value = "businessName", required = false) String businessName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String email = token.length() > 7 ? jwtUtil.getEmail(token.substring(7)) : token;
            body.put("locations", locationService.getLocationsByBusinessName(businessName, email));
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
