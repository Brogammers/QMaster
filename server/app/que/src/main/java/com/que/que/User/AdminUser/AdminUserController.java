package com.que.que.User.AdminUser;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/admin")
@AllArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;

    @GetMapping(path = "/businesses")
    @Secured("ADMIN")
    public ResponseEntity<Object> getBusinesses(@RequestParam("page") int page, @RequestParam("per-page") int perPage) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            body.put("partners", adminUserService.getBusinesses(page, perPage));
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }

    @GetMapping(path = "/users")
    @Secured("ADMIN")
    public ResponseEntity<Object> getUsers() {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            body.put("users", adminUserService.getAdminUsers());
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
