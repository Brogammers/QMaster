package com.que.que.Store;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/store")
@AllArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @PostMapping()
    @Secured("BUSINESS_OWNER")
    public ResponseEntity<Object> createStore(@RequestBody StoreCreationRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(201);
        try {
            storeService.createStore(request.getId(), request.getName(), request.getDescription(),
                    request.getAddress(), request.getLatitude(), request.getLongitude());
            body.put("message", "Store was successful");
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping
    public ResponseEntity<Object> getStoresByBusinessName(@RequestParam("businessName") String businessName) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            body.put("stores", storeService.getStoresByBusinessName(businessName));
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
