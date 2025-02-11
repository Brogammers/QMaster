package com.que.que.User.BusinessUser;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Partner.Partner;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/business")
@AllArgsConstructor
public class BusinessUserController {

    private final BusinessUserService businessUserService;

    @GetMapping
    public ResponseEntity<Object> getBusinessesWithCategory(@RequestParam("category") String category,
            @RequestParam("page") int page, @RequestParam("per-page") int perPage) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            Page<Partner> businesses = businessUserService.getBusinessesWithCategory(category, page, perPage);
            body.put("businesses", businesses);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
