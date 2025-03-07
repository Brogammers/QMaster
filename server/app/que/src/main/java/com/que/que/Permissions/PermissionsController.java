package com.que.que.Permissions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.que.que.Security.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/permissions")
@AllArgsConstructor
public class PermissionsController {
    private final PermissionsService permissionsService;
    private final JwtUtil jwtUtil;

    @GetMapping("/business")
    public ResponseEntity<Object> getPermissionById(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String email = jwtUtil.getEmail(token.substring(7));
            Map<String, Object> permissions = permissionsService.getPermissionsOfBusinessUser(email);
            body.put("role", permissions);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}