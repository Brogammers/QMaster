package com.que.que.User;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/v1/user/reset-password")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Object> resetPassword(@RequestBody ResetPasswordRequest request) {
        Map<String, Object> body = new HashMap<>();
        HttpStatusCode statusCode = HttpStatusCode.valueOf(200);
        try {
            String res = userService.resetPassword(request.getId(), request.getOldPassword(), request.getNewPassword(),
                    request.getConfirmPassword());
            body.put("message", res);
        } catch (IllegalStateException e) {
            body.put("message", e.getMessage());
            statusCode = HttpStatusCode.valueOf(500);
        }
        return new ResponseEntity<Object>(body, statusCode);
    }
}
